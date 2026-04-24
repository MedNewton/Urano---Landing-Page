# URANO Swap Widget — Landing Page Spec

**For:** Building a **USDC or ETH → URANO** swap widget on the Urano **landing page** (Next.js + TypeScript repo, currently has no web3 dependencies).
**Source of truth:** The existing dapp at `/home/mohamedbenmoussa/Desktop/Web/UranoUDapp` (Vite + React + thirdweb v5). This document extracts every piece the landing page needs so Claude Code can build the widget on a clean repo without access to the dapp.

**Confirmed target:** URANO is live on **Arbitrum One** at `0x5AF01e4d2bEFf2b01A8F3992e875EDd8d67469D2`, tradable against USDC via **Uniswap V2** (confirmed by MetaMask: the spender on a real swap is the Uniswap V2 Router 02 at `0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24`, and the Uniswap UI shows a flat fee with no V3 fee-tier picker). The widget is a custom-UI **Uniswap V2** swap on Arbitrum that accepts **USDC or ETH** on the input side.

---

## 0. READ THIS FIRST — Facts to confirm on Uniswap before pasting the prompt

The route and chain are settled: **Uniswap V2 on Arbitrum One**. Uniswap V2 has **no fee tiers** (always 0.30% baked into the pool), so there is nothing to "pick". One fact to verify on `app.uniswap.org`:

- **Does a direct URANO/WETH V2 pair exist?** Set "You pay" to ETH on Uniswap and look at the route in the swap details.
  - If the route is **WETH → URANO directly** (one hop) → use single-hop ETH path `[WETH, URANO]`.
  - If the route is **WETH → USDC → URANO** (two hops) → use multi-hop ETH path `[WETH, USDC, URANO]`. This is the more likely scenario for a newly listed token.

Everything else (client ID, token addresses, router address) is hard-coded below and ready to copy-paste.

**The dapp's `Presale` contract is NOT used by this widget.** That contract is a fixed-price allocation mechanism internal to the dapp. URANO already trades on a live Uniswap V2 pair on Arbitrum, so the landing-page widget is a pure DEX swap. Nothing from `src/abi/Presale.json`, `src/hooks/usePresale.js`, or the presale-related env vars needs to be copied.

---

## 1. What you're building (visual spec)

Card component, dark background, rounded corners:

```
┌──────────────────────────────────────────────┐
│  Swap                     Slippage  [0.5% ▾] │
│                                              │
│  You pay                                     │
│  ┌──────────────────────────────── USDC ▾ ┐ │
│  │ 0.0                                    │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  You receive (estimated)                     │
│  ┌──────────────────────────────── URANO   ┐ │
│  │ 0.0                                    │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │        Connect Wallet                  │ │   ← cyan→teal gradient
│  └────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

Behavior:

1. **Disconnected:** button reads "Connect Wallet" → opens thirdweb modal.
2. **Connected:** button reads "Enter an amount" / "Approve USDC" (if paying with USDC) / "Swap", depending on state.
3. "You pay" input accepts decimals up to the payment token's decimals (6 for USDC, 18 for ETH).
4. "You receive (estimated)" is read-only, updates live as you type (debounced ~300ms), computed from the Uniswap quoter.
5. Slippage dropdown: 0.5% / 1% / 2% (default 0.5%). Applied as `amountOutMinimum`.
6. Token dropdown on "You pay" side is **functional**. Options: **USDC** (default) and **ETH**. Switching clears the amount.
7. URANO side is always URANO, no dropdown.

Payment-token specifics (Uniswap V2):

- **USDC path:** approve the V2 Router for USDC, then call `swapExactTokensForTokens(amountIn, amountOutMin, [USDC, URANO], to, deadline)`. If no direct USDC/URANO pair exists, route through WETH with `[USDC, WETH, URANO]`.
- **ETH path:** no approval step (ETH is native). Call `swapExactETHForTokens(amountOutMin, path, to, deadline)` with `value: ethAmount`. The Router wraps ETH to WETH internally. `path = [WETH, URANO]` if a direct pair exists, otherwise `[WETH, USDC, URANO]`. See §8.3 for the call shape.

Brand color (from dapp Connect button): `#2dbdc5` (cyan/teal). Gradient from mockup: `from-cyan-400 to-teal-400` (`#22d3ee` → `#2dd4bf`) works.

---

## 2. Install these dependencies in the landing-page repo

```bash
npm install thirdweb viem
# Optional UI helper (only if your landing repo doesn't already have it):
npm install clsx
```

You do **not** need any `@uniswap/*` SDK — the widget talks to the V2 Router contract directly via thirdweb. Uniswap V2 paths are just `address[]`, no `encodePacked` required.

Minimum versions that match the dapp's working setup:

- `thirdweb@^5.118.0`
- `viem@^2.23.6`
- React 18+ (Next.js 13.4+ App Router is fine; Pages Router also works)

**Note on Next.js App Router:** every file that imports from `thirdweb/react` or uses hooks must start with `"use client"`.

---

## 3. Environment variables

Add to the landing-page repo's `.env.local`. **Use the `NEXT_PUBLIC_` prefix for anything the browser needs** (Next.js convention — the Vite `VITE_` prefix from the dapp will not work).

```env
# thirdweb — client ID is public, safe to expose
# The dapp's dev client ID (reuse for dev, replace for prod):
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=fc538ab6f7e81a2016e5b0f1b76b6608

# Arbitrum One token addresses
NEXT_PUBLIC_URANO_ADDRESS=0x5AF01e4d2bEFf2b01A8F3992e875EDd8d67469D2
NEXT_PUBLIC_USDC_ADDRESS=0xaf88d065e77c8cC2239327C5EDb3A432268e5831
NEXT_PUBLIC_WETH_ADDRESS=0x82aF49447D8a07e3bd95BD0d56f35241523fBab1

# Uniswap V2 on Arbitrum One — Router 02 (confirmed by MetaMask spender on a real swap)
NEXT_PUBLIC_UNISWAP_V2_ROUTER=0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24

# ETH input path
# Set to "true" if a direct WETH/URANO V2 pair exists (single-hop). Otherwise multi-hop WETH→USDC→URANO.
NEXT_PUBLIC_URANO_WETH_DIRECT_PAIR=false

# USDC input path
# Set to "true" if a direct USDC/URANO V2 pair exists (single-hop). Otherwise multi-hop USDC→WETH→URANO.
# The current Uniswap UI shows USDC→URANO works directly, so default this to true and verify.
NEXT_PUBLIC_URANO_USDC_DIRECT_PAIR=true
```

Known Arbitrum One addresses (do not change):

- **URANO (ERC20):** `0x5AF01e4d2bEFf2b01A8F3992e875EDd8d67469D2` (18 decimals — verify via `decimals()` if uncertain)
- **USDC native (Circle):** `0xaf88d065e77c8cC2239327C5EDb3A432268e5831` (6 decimals). **Do not** use USDC.e `0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8` — that's the bridged legacy token and new pools trade against native USDC.
- **WETH:** `0x82aF49447D8a07e3bd95BD0d56f35241523fBab1` (18 decimals). Used in the path when the user pays with ETH — the V2 Router wraps ETH to WETH internally.
- **Uniswap V2 Router 02:** `0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24` (this is the spender MetaMask shows on a real URANO swap)
- **Arbitrum One chainId:** `42161`

> If the URANO/USDC pair on Uniswap turns out to use **USDC.e** instead of native USDC, switch `NEXT_PUBLIC_USDC_ADDRESS` to `0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8`. Confirm by opening the pair page from the Uniswap swap UI.

---

## 4. Files to copy from the dapp → landing page

**None.** The widget needs no files from the dapp. All ABIs it requires (ERC20, Uniswap V2 Router 02) are small and inlined in §8 of this doc. The dapp's `Presale.json`, `MockUSDC.json`, hooks, and contexts are not used.

---

## 5. New files the landing page will need

Claude Code will create these (they do not exist in the dapp — they are Next.js-adapted equivalents of the dapp's thirdweb setup):

```
src/
  lib/
    env.ts               # reads + validates NEXT_PUBLIC_* vars
    thirdweb.ts          # client + Arbitrum chain
    contracts.ts         # getContract() calls for USDC, URANO, Uniswap V2 Router
  components/
    swap/
      SwapWidget.tsx     # the component in the mockup — "use client"
      SlippageDropdown.tsx
      PayTokenDropdown.tsx  # USDC | ETH selector
  providers/
    ThirdwebProvider.tsx # "use client" wrapper around thirdweb's provider
```

Wire the `ThirdwebProvider` into the root layout (`app/layout.tsx`) so the widget can be dropped anywhere on the landing page.

---

## 6. Reference code from the dapp (for Claude Code to adapt)

### 6.1 thirdweb client + chain (dapp version)

`src/lib/thirdweb.js` in the dapp:

```js
import { createThirdwebClient } from "thirdweb";
import { sepolia } from "thirdweb/chains";

export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
});

export const chain = sepolia;
```

**Adapt for landing page (Next.js + TS + Arbitrum):**

```ts
// src/lib/thirdweb.ts
import { createThirdwebClient } from "thirdweb";
import { arbitrum } from "thirdweb/chains";

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

export const chain = arbitrum;  // chainId 42161
```

### 6.2 ConnectButton usage (dapp version, `src/components/layout/Header.jsx`)

```jsx
import { ConnectButton } from "thirdweb/react";
import { client, chain } from "@/lib/thirdweb";

<ConnectButton
  client={client}
  chain={chain}
  theme="dark"
  connectButton={{ label: "Connect Wallet" }}
  connectModal={{ size: "compact", title: "Connect to Urano", showThirdwebBranding: false }}
/>
```

### 6.3 Approve + swap pattern (Uniswap V2 — USDC side)

```js
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

const { mutateAsync: sendTx } = useSendTransaction();

// Step 1: approve USDC for the V2 Router (skip if allowance already covers amountIn)
const approveTx = prepareContractCall({
  contract: usdc,
  method: "approve",
  params: [v2Router.address, usdcAmount],
});
await sendTx(approveTx);

// Step 2: execute the swap on Uniswap V2 Router 02
const swapTx = prepareContractCall({
  contract: v2Router,
  method: "swapExactTokensForTokens",
  params: [usdcAmount, amountOutMin, [USDC, URANO], account.address, deadline],
});
return sendTx(swapTx);
```

**ETH side:** skip the approve entirely; call `swapExactETHForTokens` with `value: ethAmount` (see §8.3 ETH call shape). Native ETH has no allowance.

Improvement: check `allowance()` first and skip approve if already sufficient — the dapp approves every time, which is wasteful.

### 6.4 Wallet state hooks (from the dapp's `WalletContext.jsx`)

```js
import { useActiveAccount, useActiveWalletChain, useSwitchActiveWalletChain } from "thirdweb/react";

const account = useActiveAccount();              // undefined if disconnected; has .address when connected
const activeChain = useActiveWalletChain();      // chain the wallet is on
const switchChain = useSwitchActiveWalletChain();
const isCorrectNetwork = !account || activeChain?.id === chain.id;
```

### 6.5 Decimal handling (from `src/utils/format.js` and `BuyModal.jsx`)

```js
import { parseUnits, formatUnits } from "viem";

// USDC has 6 decimals, URANO has 18
const usdcAmount = parseUnits(userInput || "0", 6);      // string → bigint
const display    = formatUnits(bigIntValue, 18);         // bigint → string
```

**Critical:** keep all math in `bigint`. Do not `Number()` a token amount.

### 6.6 Uniswap V2 call shape (standard pattern — not in dapp)

```ts
// Quote — pure view on the V2 Router. No gas, no approval.
router.getAmountsOut(amountIn, [USDC, URANO])
  → [amountIn, amountOut]                  // last element is the URANO output (18 decimals)

// Multi-hop quote
router.getAmountsOut(amountIn, [WETH, USDC, URANO])
  → [amountIn, intermediateUSDC, amountOut]

// Swap (USDC → URANO, single-hop):
router.swapExactTokensForTokens(
  usdcAmount,                                                  // 6 decimals
  amountOutMin,                                                // quoted * (10000n - slippageBps) / 10000n
  [USDC, URANO],                                               // path: address[]
  account.address,                                             // to
  BigInt(Math.floor(Date.now() / 1000) + 60 * 10),             // deadline (10 min)
)

// Swap (ETH → URANO, single-hop). msg.value carries the ETH; path STARTS with WETH.
router.swapExactETHForTokens(
  amountOutMin,
  [WETH, URANO],                                               // or [WETH, USDC, URANO] for multi-hop
  account.address,
  deadline,
)  // value: ethAmount   (18 decimals, native ETH)
```

`getAmountsOut` is a pure view (`stateMutability: "view"`) — call it via thirdweb's `useReadContract` / `readContract`. No gas, no approval needed.

Minimal V2 Router ABI is in §8.

---

## 7. Known keys & addresses (copy-paste ready)

```
# thirdweb (public, safe)
CLIENT_ID  = fc538ab6f7e81a2016e5b0f1b76b6608

# Arbitrum One (chainId 42161) — TARGET CHAIN
URANO        = 0x5AF01e4d2bEFf2b01A8F3992e875EDd8d67469D2  (18 decimals)
USDC         = 0xaf88d065e77c8cC2239327C5EDb3A432268e5831  (6 decimals, native Circle)
USDC.e       = 0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8  (6 decimals, legacy bridged — only if the pool uses this)
WETH         = 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1  (18 decimals — used when paying with ETH)
ETH native   = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE  (sentinel only — ETH is not an ERC20)

# Uniswap V2 on Arbitrum
V2 Router 02     = 0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24   (confirmed by MetaMask spender)
Pair fee         = 0.30% (fixed in V2 — there are no fee tiers)
URANO/USDC pair  = direct (current Uniswap UI swaps USDC → URANO without going through WETH)
URANO/WETH pair  = <CONFIRM on app.uniswap.org — set "You pay" to ETH and inspect the route>
                   if direct → ETH path is [WETH, URANO]
                   else      → ETH path is [WETH, USDC, URANO]

# The dapp chain (reference only — NOT what the widget uses)
# Sepolia chainId 11155111, URANO test token 0xFA226b5BE54ecb94848ac1dD29C0c29f6f1c240e
```

**Do NOT commit secrets.** The thirdweb secret key (`THIRDWEB_SECRET_KEY`) and Persona API key from the dapp's `.env` are server-side only and are not needed by the widget.

---

## 8. Contract ABIs — minimum you need

### 8.1 ERC20 (USDC + URANO)

```json
[
  {"type":"function","name":"allowance","stateMutability":"view",
   "inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],
   "outputs":[{"type":"uint256"}]},
  {"type":"function","name":"approve","stateMutability":"nonpayable",
   "inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],
   "outputs":[{"type":"bool"}]},
  {"type":"function","name":"balanceOf","stateMutability":"view",
   "inputs":[{"name":"account","type":"address"}],
   "outputs":[{"type":"uint256"}]},
  {"type":"function","name":"decimals","stateMutability":"view",
   "inputs":[],"outputs":[{"type":"uint8"}]}
]
```

### 8.2 Uniswap V2 Router 02 — quote (`getAmountsOut`)

```json
[
  {"type":"function","name":"getAmountsOut","stateMutability":"view",
   "inputs":[{"name":"amountIn","type":"uint256"},
             {"name":"path","type":"address[]"}],
   "outputs":[{"name":"amounts","type":"uint256[]"}]}
]
```

Pure view — call via thirdweb `useReadContract`. Returns the array of intermediate amounts; the **last element** is the final output. Reverts if any pair on the path doesn't exist or there's not enough liquidity.

### 8.3 Uniswap V2 Router 02 — swaps (`swapExactTokensForTokens` + `swapExactETHForTokens`)

```json
[
  {"type":"function","name":"swapExactTokensForTokens","stateMutability":"nonpayable",
   "inputs":[
     {"name":"amountIn","type":"uint256"},
     {"name":"amountOutMin","type":"uint256"},
     {"name":"path","type":"address[]"},
     {"name":"to","type":"address"},
     {"name":"deadline","type":"uint256"}
   ],
   "outputs":[{"name":"amounts","type":"uint256[]"}]},
  {"type":"function","name":"swapExactETHForTokens","stateMutability":"payable",
   "inputs":[
     {"name":"amountOutMin","type":"uint256"},
     {"name":"path","type":"address[]"},
     {"name":"to","type":"address"},
     {"name":"deadline","type":"uint256"}
   ],
   "outputs":[{"name":"amounts","type":"uint256[]"}]}
]
```

**Path is a plain `address[]`** — no `encodePacked`, no fee tiers.

- USDC single-hop: `[USDC, URANO]`
- USDC multi-hop:  `[USDC, WETH, URANO]`
- ETH  single-hop: `[WETH, URANO]`     ← path always starts with WETH for `swapExactETHForTokens`
- ETH  multi-hop:  `[WETH, USDC, URANO]`

**ETH-input call shape (no approve; send ETH as `value`):**

```ts
prepareContractCall({
  contract: v2Router,
  method: "swapExactETHForTokens",
  params: [
    amountOutMin,                                       // quotedOut * (10000n - slippageBps) / 10000n
    ethPath,                                            // [WETH, URANO] or [WETH, USDC, URANO]
    account.address,
    BigInt(Math.floor(Date.now()/1000) + 600),
  ],
  value: ethAmount,                                     // ← critical: sends native ETH
});
```

**USDC-input call shape (requires prior `approve(v2Router, amountIn)` on USDC):**

```ts
prepareContractCall({
  contract: v2Router,
  method: "swapExactTokensForTokens",
  params: [
    usdcAmount,                                         // 6 decimals
    amountOutMin,
    usdcPath,                                           // [USDC, URANO] or [USDC, WETH, URANO]
    account.address,
    BigInt(Math.floor(Date.now()/1000) + 600),
  ],
});
```

> If URANO turns out to be a fee-on-transfer token (the swap reverts with the standard call but works on the Uniswap UI), switch to the `*SupportingFeeOnTransferTokens` variants of both methods. Same parameters; the only difference is the Router doesn't enforce the exact `amounts` array. Don't switch preemptively — only if you observe the revert.

---

## 9. Edge cases the widget must handle

- **Wrong network:** if `activeChain?.id !== arbitrum.id` (42161), disable the swap button and show "Switch to Arbitrum".
- **Insufficient balance:**
  - USDC: compare input to ERC20 `balanceOf(account)`; if short, show "Insufficient USDC".
  - ETH: compare input to native balance; if short, show "Insufficient ETH". **Also** leave a small gas buffer (~0.0005 ETH) — if `amountIn + buffer > balance`, treat it as insufficient rather than letting the swap fail on gas.
- **Insufficient allowance (USDC only):** show "Approve USDC"; after approval succeeds, re-render as "Swap". ETH has no approval step. The spender for `approve` is the **V2 Router** `0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24`.
- **Quote fails** (`getAmountsOut` reverts: pair doesn't exist, amount too small, multi-hop path wrong): show "No route" and disable.
- **Pending tx:** disable the whole card, swap button shows a spinner + "Confirming…".
- **Tx reverted:** surface the revert reason from `error.shortMessage` — don't swallow.
- **Debounce** the quote fetch to ~300ms so every keystroke doesn't hit the RPC.
- **Decimal input guard:** reject more than the selected token's decimals (6 for USDC, 18 for ETH) — matches `parseUnits(val, decimals)`.
- **Switching payment token:** clear the input and re-fetch balance for the new token. Don't try to port the amount across (different decimals, different semantics).

---

## 10. THE PROMPT to paste into Claude Code on the landing-page repo

Copy everything inside the fence below and paste it as your first message in Claude Code on the landing-page repo. The only field you may need to flip is `NEXT_PUBLIC_URANO_WETH_DIRECT_PAIR` (see §0).

````
I'm adding a **USDC or ETH → URANO** swap widget to this Next.js + TypeScript landing page. The repo currently has zero web3 dependencies. Build it end-to-end.

## Chain & route
- Target chain: **Arbitrum One** (chainId 42161).
- Swap route: **Uniswap V2** on Arbitrum. The spender on a real swap (confirmed by MetaMask) is the V2 Router 02 at `0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24`. **Do NOT use Uniswap V3** — there are no fee tiers, no Quoter, no `exactInputSingle`.
  - USDC input → `swapExactTokensForTokens(amountIn, amountOutMin, [USDC, URANO], to, deadline)` after approving the V2 Router for USDC. If `NEXT_PUBLIC_URANO_USDC_DIRECT_PAIR=false`, route through WETH with `[USDC, WETH, URANO]`.
  - ETH input → `swapExactETHForTokens(amountOutMin, path, to, deadline)` with `value: ethAmount`. `path = [WETH, URANO]` if `NEXT_PUBLIC_URANO_WETH_DIRECT_PAIR=true`, otherwise `[WETH, USDC, URANO]`.
  - Reference: https://app.uniswap.org/swap?outputCurrency=0x5AF01e4d2bEFf2b01A8F3992e875EDd8d67469D2&chain=arbitrum
- Wallet connection via **thirdweb v5** (`thirdweb` package, NOT the deprecated `@thirdweb-dev/*` packages).
- Put all config behind `NEXT_PUBLIC_*` env vars, read them from a single `src/lib/env.ts` with runtime validation (throw early if any required one is missing), and create a `.env.local.example` listing them. The chain is the `arbitrum` export from `thirdweb/chains`.
- If the URANO/USDC pair turns out to trade against USDC.e `0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8` instead of native USDC, STOP and ask me before changing anything.

## Install
```
npm install thirdweb viem
```

## Addresses & keys (copy into .env.local)
```
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=fc538ab6f7e81a2016e5b0f1b76b6608

NEXT_PUBLIC_URANO_ADDRESS=0x5AF01e4d2bEFf2b01A8F3992e875EDd8d67469D2
NEXT_PUBLIC_USDC_ADDRESS=0xaf88d065e77c8cC2239327C5EDb3A432268e5831
NEXT_PUBLIC_WETH_ADDRESS=0x82aF49447D8a07e3bd95BD0d56f35241523fBab1

NEXT_PUBLIC_UNISWAP_V2_ROUTER=0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24

# Routing flags — flip if Uniswap UI shows a different route
NEXT_PUBLIC_URANO_USDC_DIRECT_PAIR=true
NEXT_PUBLIC_URANO_WETH_DIRECT_PAIR=false
```

## File layout to create
- `src/lib/env.ts` — reads + validates every `NEXT_PUBLIC_*` above. Throw a clear error at import time if any required one is missing. Boolean flags: parse `"true"`/`"false"` strictly.
- `src/lib/thirdweb.ts` — `createThirdwebClient` + `arbitrum` chain export (from `thirdweb/chains`).
- `src/lib/contracts.ts` — `getContract(...)` for USDC, URANO, **Uniswap V2 Router 02**. Inline the minimal ABIs (ERC20 `allowance`/`approve`/`balanceOf`/`decimals`; V2 Router with `getAmountsOut` + `swapExactTokensForTokens` + `swapExactETHForTokens`). Also export the route-builder helpers `usdcPath()` and `ethPath()` that return the `address[]` per the env flags.
- `src/providers/ThirdwebProvider.tsx` — `"use client"` wrapper that renders thirdweb's `<ThirdwebProvider>`. Wire it into `app/layout.tsx` so the whole app is inside it.
- `src/components/swap/SwapWidget.tsx` — `"use client"` main component.
- `src/components/swap/SlippageDropdown.tsx` — dropdown with exactly three options: **0.5% / 1% / 2%** (default 0.5%). No custom input.
- `src/components/swap/PayTokenDropdown.tsx` — dropdown on the "You pay" side: **USDC (default) | ETH**.

Keep existing styling conventions of this repo (Tailwind if present, CSS modules otherwise). Match the brand cyan `#2dbdc5` with a cyan-to-teal gradient for the CTA button.

## Component behavior
Card with:
1. Header: "Swap" (left) + "Slippage [dropdown]" (right, default 0.5%).
2. "You pay" input — number; max decimals depends on selected pay token (6 for USDC, 18 for ETH). On the right: the `PayTokenDropdown` (USDC | ETH). Switching the pay token **clears the input** and re-fetches balance.
3. "You receive (estimated)" — read-only URANO amount, "URANO" pill on the right (not a dropdown).
4. Big CTA button, full-width, cyan-to-teal gradient.

Button state machine (pick the FIRST applicable):
- Disconnected → "Connect Wallet" → opens thirdweb `<ConnectButton>` flow (use `ConnectButton` directly, styled to match).
- Wrong chain (activeChain.id !== 42161) → "Switch to Arbitrum" → calls `useSwitchActiveWalletChain()`.
- Empty / zero input → "Enter an amount", disabled.
- Input > balance (USDC: ERC20 balance; ETH: native balance minus ~0.0005 gas buffer) → "Insufficient USDC" / "Insufficient ETH", disabled.
- (USDC only) Allowance < input → "Approve USDC" → sends `USDC.approve(V2_ROUTER, amount)`; re-check allowance after. ETH has no approve step.
- Quote failed / no route → "No route", disabled.
- Otherwise → "Swap" → sends the Uniswap V2 call (see below).

## Quote logic
Debounce the "You pay" input by 300ms, then call `V2Router.getAmountsOut(amountIn, path)` via thirdweb's `useReadContract` (it's a pure `view`, no gas, no approval).

- **USDC input** → `path = usdcPath()` → either `[USDC, URANO]` or `[USDC, WETH, URANO]`.
- **ETH input** → `path = ethPath()` → either `[WETH, URANO]` or `[WETH, USDC, URANO]`.

`getAmountsOut` returns `uint256[]`; the **last element** is the URANO output (18 decimals). Display with `formatUnits(amountOut, 18)` to 4 decimal places. On revert, show "No route".

## Swap call shapes
**USDC:**
```ts
prepareContractCall({
  contract: v2Router,
  method: "swapExactTokensForTokens",
  params: [
    usdcAmount,                                                  // 6 decimals
    quotedOut * (10000n - slippageBps) / 10000n,                 // amountOutMin
    usdcPath(),                                                  // address[]
    account.address,
    BigInt(Math.floor(Date.now()/1000) + 600),
  ],
});
```

**ETH:**
```ts
prepareContractCall({
  contract: v2Router,
  method: "swapExactETHForTokens",
  params: [
    quotedOut * (10000n - slippageBps) / 10000n,                 // amountOutMin
    ethPath(),                                                   // address[] starting with WETH
    account.address,
    BigInt(Math.floor(Date.now()/1000) + 600),
  ],
  value: ethAmount,                                              // ← sends native ETH; router wraps to WETH
});
```

## Numeric & decimal rules
- All token math in `bigint`. Never convert to `Number` before division.
- Use viem's `parseUnits` / `formatUnits`.
- USDC = 6 decimals. ETH/WETH = 18 decimals. URANO = 18 decimals.

## Transaction flow
- `useSendTransaction` from `thirdweb/react` for both approve (USDC) and swap (both tokens).
- After a successful swap, clear the input, re-fetch balance (and allowance for USDC), and show a toast (use whatever toast lib this repo already has; if none, a simple inline success line under the button is fine).
- Surface `error.shortMessage` on failure; don't swallow errors.

## Code quality
- TypeScript strict — no `any` on public boundaries.
- No `useEffect` for things that should be derived or fetched. Fetch allowance and ERC20 balance with thirdweb's `useReadContract`. For native ETH balance, use thirdweb's `useWalletBalance` (or an equivalent hook; it lives in `thirdweb/react`).
- No client-side `process.env.*` reads outside `src/lib/env.ts`.
- Do not add unrelated dependencies. Do not refactor unrelated files.

## Verification before you tell me you're done
1. `npm run build` succeeds.
2. `npm run dev` boots and the widget renders on the target page.
3. Connect a wallet in the browser, confirm:
   - Wrong-chain detection works (switch the wallet to Ethereum or Base, button flips to "Switch to Arbitrum").
   - Typing an amount produces a live URANO estimate within ~500ms — test with BOTH "USDC" and "ETH" selected.
   - Switching pay token clears the input and updates the balance display.
   - **USDC path:** "Approve USDC" → wallet popup for approve on USDC (spender MUST be `0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24`, the V2 Router). Then "Swap" → wallet popup for `swapExactTokensForTokens`.
   - **ETH path:** "Swap" immediately (no approve) → wallet popup for `swapExactETHForTokens` with non-zero `value`.
4. Report what you actually tested vs. what you skipped. Do not claim it works if you didn't click through it.

If you hit a decision point that isn't covered here (e.g., `getAmountsOut` reverts for a valid amount, the pair uses USDC.e, the swap reverts with the standard call but works on the Uniswap UI — likely fee-on-transfer), STOP and ask — don't guess.
````

---

## 11. Things intentionally NOT included

- **The dapp's Presale contract.** Not needed — URANO already trades on a public Uniswap pool. Do not copy `Presale.json` or `usePresale.js` from the dapp.
- **KYC (Persona).** The dapp gates purchases with KYC. The landing-page widget should NOT — it's a marketing-funnel component. If legal requires KYC, add it as a follow-up.
- **Staking eligibility / presale rounds.** Irrelevant to a public swap.
- **Transaction history.** The widget is stateless beyond the current transaction. Use Arbiscan for history.
- **Secret keys.** `THIRDWEB_SECRET_KEY`, `PERSONA_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `DEPLOYER_PK`, `KYC_MANAGER_PRIVATE_KEY` from the dapp's `.env` are server-side and must **never** be shipped to the landing page.
