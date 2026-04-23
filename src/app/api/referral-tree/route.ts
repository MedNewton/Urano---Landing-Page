import { NextResponse } from "next/server";
import type { Pool as PgPool } from "pg";
import { getPool } from "@/server/db";

const MAX_DEPTH = 6;

interface SwapRow {
  tx_hash: string;
  amount_in: string;
  amount_out: string;
  block_number: string;
  created_at: string;
}

interface ReferralNode {
  wallet: string;
  depth: number;
  swaps: SwapRow[];
  total_swaps: number;
  total_bought: number;
  referrals: ReferralNode[];
}

async function getSwapsForWallet(pool: PgPool, wallet: string) {
  const { rows } = await pool.query<SwapRow>(
    `SELECT tx_hash, amount_in, amount_out, block_number, created_at
     FROM swaps
     WHERE LOWER(wallet) = $1
     ORDER BY block_number DESC`,
    [wallet],
  );
  return rows;
}

async function getDirectReferrals(pool: PgPool, wallet: string) {
  const { rows } = await pool.query<{ wallet: string; created_at: string }>(
    `SELECT wallet, created_at
     FROM wallet_refs
     WHERE LOWER(ref_code) = $1`,
    [wallet],
  );
  return rows;
}

async function buildNode(
  pool: PgPool,
  wallet: string,
  depth: number,
): Promise<ReferralNode> {
  const normalized = wallet.toLowerCase();
  const swaps = await getSwapsForWallet(pool, normalized);
  const totalBought = swaps.reduce((acc, s) => {
    const v = parseFloat(s.amount_out);
    return acc + (isNaN(v) ? 0 : v);
  }, 0);

  const node: ReferralNode = {
    wallet: normalized,
    depth,
    swaps,
    total_swaps: swaps.length,
    total_bought: totalBought,
    referrals: [],
  };

  if (depth < MAX_DEPTH) {
    const children = await getDirectReferrals(pool, normalized);
    node.referrals = await Promise.all(
      children.map((c) => buildNode(pool, c.wallet, depth + 1)),
    );
  }

  return node;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get("wallet");

  if (!raw) {
    return NextResponse.json(
      { error: "wallet query param is required" },
      { status: 400 },
    );
  }

  const wallet = raw.toLowerCase();

  try {
    const pool = await getPool();
    const tree = await buildNode(pool, wallet, 0);
    return NextResponse.json(tree);
  } catch (err) {
    console.error("[referral-tree] error:", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
