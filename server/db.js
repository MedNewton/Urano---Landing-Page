const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
  console.warn('[db] DATABASE_URL is not set');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS wallet_refs (
      wallet TEXT PRIMARY KEY,
      ref_code TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS swaps (
      tx_hash TEXT PRIMARY KEY,
      wallet TEXT,
      ref_code TEXT,
      amount_in TEXT,
      amount_out TEXT,
      block_number BIGINT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`CREATE INDEX IF NOT EXISTS idx_swaps_wallet ON swaps (wallet);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_wallet_refs_ref_code ON wallet_refs (ref_code);`);
}

module.exports = { pool, init };
