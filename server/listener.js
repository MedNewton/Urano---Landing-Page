const { ethers } = require("ethers");
const { pool } = require("./db");

const SWAP_ABI = [
  "event Swap(address indexed sender, uint amount0In, uint amount1In, uint amount0Out, uint amount1Out, address indexed to)",
];

let provider = null;
let contract = null;
let reconnectTimer = null;
let reconnectDelay = 1000;
const MAX_RECONNECT_DELAY = 30000;

async function handleSwap(sender, amount0In, amount1In, amount0Out, amount1Out, to, event) {
  const wallet = to.toLowerCase();
  const txHash = event.log.transactionHash;
  const blockNumber = event.log.blockNumber;

  const amountIn = amount0In > 0n ? amount0In.toString() : amount1In.toString();
  const amountOut = amount0Out > 0n ? amount0Out.toString() : amount1Out.toString();

  try {
    const { rows } = await pool.query(
      "SELECT ref_code FROM wallet_refs WHERE wallet = $1",
      [wallet]
    );
    const refCode = rows[0] ? rows[0].ref_code : null;

    await pool.query(
      `INSERT INTO swaps (tx_hash, wallet, ref_code, amount_in, amount_out, block_number)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (tx_hash) DO NOTHING`,
      [txHash, wallet, refCode, amountIn, amountOut, blockNumber]
    );

    const attribution = refCode ? `ref=${refCode}` : "unattributed";
    console.log(`[listener] Swap detected: tx=${txHash} wallet=${wallet} ${attribution}`);
  } catch (err) {
    console.error(`[listener] Failed to persist swap ${txHash}:`, err.message);
  }
}

async function connect() {
  const wsUrl = process.env.WS_RPC_URL;
  const pairAddress = process.env.PAIR_CONTRACT_ADDRESS;

  if (!wsUrl || !pairAddress) {
    console.warn("[listener] WS_RPC_URL or PAIR_CONTRACT_ADDRESS not set, listener disabled");
    return;
  }

  cleanup();

  try {
    provider = new ethers.WebSocketProvider(wsUrl);
    contract = new ethers.Contract(pairAddress, SWAP_ABI, provider);

    provider.websocket.on("close", () => {
      console.warn("[listener] WebSocket disconnected, scheduling reconnect...");
      scheduleReconnect();
    });

    provider.websocket.on("error", (err) => {
      console.error("[listener] WebSocket error:", err.message);
    });

    await contract.on("Swap", handleSwap);

    reconnectDelay = 1000;
    console.log(`[listener] Connected, listening for Swap events on ${pairAddress}`);
  } catch (err) {
    console.error("[listener] Connection failed:", err.message);
    scheduleReconnect();
  }
}

function scheduleReconnect() {
  if (reconnectTimer) return;
  console.log(`[listener] Reconnecting in ${reconnectDelay / 1000}s...`);
  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    reconnectDelay = Math.min(reconnectDelay * 2, MAX_RECONNECT_DELAY);
    connect();
  }, reconnectDelay);
}

function cleanup() {
  if (contract) {
    contract.removeAllListeners();
    contract = null;
  }
  if (provider) {
    provider.destroy();
    provider = null;
  }
}

function shutdown() {
  console.log("[listener] Shutting down...");
  clearTimeout(reconnectTimer);
  reconnectTimer = null;
  cleanup();
}

function start() {
  connect();

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

module.exports = { start };
