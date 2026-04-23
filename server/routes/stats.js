const { Router } = require('express');
const { pool } = require('../db.js');

const router = Router();

router.get('/', async (_req, res) => {
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
    const { rows } = await pool.query(sql);
    res.status(200).json(rows);
  } catch (err) {
    console.error('[stats] error:', err.message);
    res.status(500).json({ error: 'internal error' });
  }
});

module.exports = router;
