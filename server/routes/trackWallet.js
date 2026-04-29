const { Router } = require('express');
const { pool } = require('../db.js');

const router = Router();

router.post('/', async (req, res) => {
  let { wallet, ref } = req.body;

  if (!wallet || !ref) {
    return res.status(400).json({ error: 'wallet and ref are required' });
  }

  wallet = wallet.toLowerCase();
  ref = ref.toLowerCase();

  if (wallet === ref) {
    return res.status(400).json({ error: 'wallet cannot refer itself' });
  }

  try {
    // Cycle detection: walk up the referral chain from ref.
    // If we ever reach wallet, inserting would create a cycle.
    let current = ref;
    const visited = new Set([wallet]);
    while (current) {
      if (visited.has(current)) {
        return res.status(400).json({ error: 'circular referral not allowed' });
      }
      visited.add(current);
      const { rows } = await pool.query(
        'SELECT ref_code FROM wallet_refs WHERE wallet = $1',
        [current]
      );
      current = rows[0]?.ref_code?.toLowerCase() ?? '';
    }

    // First write wins: once a wallet is linked to a referral, never overwrite it.
    await pool.query(
      'INSERT INTO wallet_refs (wallet, ref_code) VALUES ($1, $2) ON CONFLICT (wallet) DO NOTHING',
      [wallet, ref]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('[track-wallet] error:', err.message);
    res.status(500).json({ error: 'internal error' });
  }
});

module.exports = router;
