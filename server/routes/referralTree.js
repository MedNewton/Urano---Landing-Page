const { Router } = require('express');
const { pool } = require('../db.js');

const router = Router();

const MAX_DEPTH = 6;

async function getSwapsForWallet(wallet) {
  const { rows } = await pool.query(
    `SELECT tx_hash, amount_in, amount_out, block_number, created_at
     FROM swaps
     WHERE LOWER(wallet) = $1
     ORDER BY block_number DESC`,
    [wallet]
  );
  return rows;
}

async function getDirectReferrals(wallet) {
  const { rows } = await pool.query(
    `SELECT wallet, created_at
     FROM wallet_refs
     WHERE LOWER(ref_code) = $1`,
    [wallet]
  );
  return rows;
}

async function buildNode(wallet, depth) {
  const normalized = wallet.toLowerCase();
  const swaps = await getSwapsForWallet(normalized);
  const totalBought = swaps.reduce((acc, s) => {
    const v = parseFloat(s.amount_out);
    return acc + (isNaN(v) ? 0 : v);
  }, 0);

  const node = {
    wallet: normalized,
    depth,
    swaps,
    total_swaps: swaps.length,
    total_bought: totalBought,
    referrals: [],
  };

  if (depth < MAX_DEPTH) {
    const children = await getDirectReferrals(normalized);
    node.referrals = await Promise.all(
      children.map((c) => buildNode(c.wallet, depth + 1))
    );
  }

  return node;
}

router.get('/', async (req, res) => {
  const raw = req.query.wallet;
  if (!raw || typeof raw !== 'string') {
    return res.status(400).json({ error: 'wallet query param is required' });
  }
  const wallet = raw.toLowerCase();
  try {
    const tree = await buildNode(wallet, 0);
    res.json(tree);
  } catch (err) {
    console.error('[referral-tree] error:', err.message);
    res.status(500).json({ error: 'internal error' });
  }
});

module.exports = router;
