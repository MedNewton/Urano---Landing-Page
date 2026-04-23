import { NextResponse } from "next/server";
import { getPool } from "@/server/db";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    wallet?: string;
    ref?: string;
  };

  if (!body.wallet || !body.ref) {
    return NextResponse.json(
      { error: "wallet and ref are required" },
      { status: 400 },
    );
  }

  const wallet = body.wallet.toLowerCase();
  const ref = body.ref.toLowerCase();

  if (wallet === ref) {
    return NextResponse.json({ error: "wallet cannot refer itself" }, { status: 400 });
  }

  try {
    const pool = await getPool();

    // Cycle detection: walk up the referral chain from ref.
    // If we ever reach wallet, inserting would create a cycle.
    let current = ref;
    const visited = new Set<string>([wallet]);
    while (current) {
      if (visited.has(current)) {
        return NextResponse.json({ error: "circular referral not allowed" }, { status: 400 });
      }
      visited.add(current);
      const { rows } = await pool.query<{ ref_code: string }>(
        "SELECT ref_code FROM wallet_refs WHERE wallet = $1",
        [current],
      );
      current = rows[0]?.ref_code?.toLowerCase() ?? "";
    }

    await pool.query(
      "INSERT INTO wallet_refs (wallet, ref_code) VALUES ($1, $2) ON CONFLICT (wallet) DO NOTHING",
      [wallet, ref],
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[track-wallet] error:", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
