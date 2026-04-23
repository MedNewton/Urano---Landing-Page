import { NextResponse } from "next/server";
import { getPool } from "@/server/db";

export async function GET() {
  const sql = `
    SELECT
      wr.ref_code,
      COUNT(s.tx_hash) AS total_swaps,
      COUNT(DISTINCT s.wallet) AS unique_buyers
    FROM wallet_refs wr
    LEFT JOIN swaps s ON wr.wallet = s.wallet
    GROUP BY wr.ref_code
    ORDER BY total_swaps DESC
  `;

  try {
    const pool = await getPool();
    const { rows } = await pool.query(sql);
    return NextResponse.json(rows);
  } catch (err) {
    console.error("[stats] error:", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
