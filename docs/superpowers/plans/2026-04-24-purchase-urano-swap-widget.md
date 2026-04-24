# Purchase URANO Swap Widget Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Purchase URANO" section after the "Powered by Urano" section on the landing page with a USDC/ETH → URANO swap widget using Uniswap V2 on Arbitrum One via thirdweb v5.

**Architecture:** New MUI-based section component (matching existing `PoweredByUranoSection` title/layout conventions) containing a stateful swap card. Web3 layer uses thirdweb v5 client + viem for bigint math, calling Uniswap V2 Router 02 directly (no `@uniswap/*` SDK). ThirdwebProvider wraps the app inside the existing `Providers` component.

**Tech Stack:** Next.js 15 App Router, React 19, MUI 7 (existing convention — no Tailwind), `@t3-oss/env-nextjs` (existing, extended with web3 vars), new deps: `thirdweb`, `viem`.

**Reference spec:** `URANO_SWAP_WIDGET_SPEC.md` — single source of truth for addresses, call shapes, edge cases. This plan maps that spec onto this repo's conventions.

**Convention deltas from spec:**
- Env: extend existing `src/env.js` (t3-oss) instead of creating `src/lib/env.ts`. t3-oss already provides runtime validation via zod.
- Styling: MUI `sx` props + existing theme (`theme.palette.uranoGradient`, `conthrax` class) instead of Tailwind.
- Provider: integrate into existing `src/components/layout/providers.tsx` instead of a new `src/providers/` folder.
- Component placement: `src/components/sections/PurchaseUranoSection.tsx` + `src/components/sections/purchaseUrano/*` (matches existing section layout).

---

## File Structure

**Create:**
- `src/lib/thirdweb.ts` — thirdweb client + `arbitrum` chain export.
- `src/lib/contracts.ts` — `getContract()` helpers for USDC, URANO, V2 Router; path builders `usdcPath()` / `ethPath()`; exports the minimal ABIs inline.
- `src/components/sections/PurchaseUranoSection.tsx` — the section wrapper (title + card), pattern-matched to `PoweredByUranoSection`.
- `src/components/sections/purchaseUrano/SwapWidget.tsx` — `"use client"` main swap card (state machine + quote + swap).
- `src/components/sections/purchaseUrano/SlippageDropdown.tsx` — MUI Select with 0.5% / 1% / 2%.
- `src/components/sections/purchaseUrano/PayTokenDropdown.tsx` — MUI Select with USDC (default) / ETH.

**Modify:**
- `src/env.js` — add `NEXT_PUBLIC_*` client vars (thirdweb client id, token addresses, router, direct-pair flags).
- `.env.example` — add the same vars with the values from spec §3.
- `src/components/layout/providers.tsx` — wrap children with `ThirdwebProvider` from `thirdweb/react`.
- `src/app/page.tsx` — import and render `<PurchaseUranoSection />` immediately after `<PoweredByUranoSection />`.

**No test files.** The logic that can be unit-tested (path builders, slippage math) is <10 lines total and more reliably verified inline; the rest (wallet connection, real approve/swap flow) can only be verified in a browser against Arbitrum mainnet with a funded wallet. Manual verification steps are at the end of the plan.

---

## Task 1: Install dependencies

**Files:**
- Modify: `package.json` (via npm)

- [ ] **Step 1:** Install runtime deps.

```bash
npm install thirdweb viem
```

Expected: `thirdweb@^5.x` and `viem@^2.x` added to `dependencies`. No peer-dep warnings that break the install.

- [ ] **Step 2:** Verify versions meet spec minimums (thirdweb ≥ 5.118.0, viem ≥ 2.23.6).

```bash
npm ls thirdweb viem
```

If either is below the minimum, run `npm install thirdweb@latest viem@latest`.

- [ ] **Step 3:** Confirm the app still builds before touching any code.

```bash
npm run build
```

Expected: build passes. If it fails for a reason unrelated to the install, STOP and fix before continuing.

- [ ] **Step 4:** Commit.

```bash
git add package.json package-lock.json
git commit -m "chore: add thirdweb and viem for swap widget"
```

---

## Task 2: Env vars (extend t3-oss schema + .env.example)

**Files:**
- Modify: `src/env.js`
- Modify: `.env.example`

- [ ] **Step 1:** Add client vars to the `client` block and `runtimeEnv` in `src/env.js`.

Replace the existing `client: { ... }` and `runtimeEnv: { ... }` blocks with:

```js
  client: {
    NEXT_PUBLIC_THIRDWEB_CLIENT_ID: z.string().min(1),
    NEXT_PUBLIC_URANO_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
    NEXT_PUBLIC_USDC_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
    NEXT_PUBLIC_WETH_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
    NEXT_PUBLIC_UNISWAP_V2_ROUTER: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
    NEXT_PUBLIC_URANO_USDC_DIRECT_PAIR: z.enum(["true", "false"]).transform((v) => v === "true"),
    NEXT_PUBLIC_URANO_WETH_DIRECT_PAIR: z.enum(["true", "false"]).transform((v) => v === "true"),
  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_THIRDWEB_CLIENT_ID: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
    NEXT_PUBLIC_URANO_ADDRESS: process.env.NEXT_PUBLIC_URANO_ADDRESS,
    NEXT_PUBLIC_USDC_ADDRESS: process.env.NEXT_PUBLIC_USDC_ADDRESS,
    NEXT_PUBLIC_WETH_ADDRESS: process.env.NEXT_PUBLIC_WETH_ADDRESS,
    NEXT_PUBLIC_UNISWAP_V2_ROUTER: process.env.NEXT_PUBLIC_UNISWAP_V2_ROUTER,
    NEXT_PUBLIC_URANO_USDC_DIRECT_PAIR: process.env.NEXT_PUBLIC_URANO_USDC_DIRECT_PAIR,
    NEXT_PUBLIC_URANO_WETH_DIRECT_PAIR: process.env.NEXT_PUBLIC_URANO_WETH_DIRECT_PAIR,
  },
```

- [ ] **Step 2:** Append the same vars to `.env.example` (do NOT add real client id into the example — use a placeholder for CI, but include the canonical hard-coded values from spec §3 as these are public on-chain constants). Actually, per spec §3 the dev client id is explicitly safe to commit — use the value below verbatim so local dev works after `cp .env.example .env.local`.

Append to `.env.example`:

```env

# --- Swap widget (Uniswap V2 on Arbitrum One) ---
# thirdweb client id (public, safe to expose; replace for prod)
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=fc538ab6f7e81a2016e5b0f1b76b6608

# Arbitrum One token addresses
NEXT_PUBLIC_URANO_ADDRESS=0x5AF01e4d2bEFf2b01A8F3992e875EDd8d67469D2
NEXT_PUBLIC_USDC_ADDRESS=0xaf88d065e77c8cC2239327C5EDb3A432268e5831
NEXT_PUBLIC_WETH_ADDRESS=0x82aF49447D8a07e3bd95BD0d56f35241523fBab1

# Uniswap V2 Router 02 on Arbitrum
NEXT_PUBLIC_UNISWAP_V2_ROUTER=0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24

# Routing flags (flip if Uniswap UI shows a different route)
NEXT_PUBLIC_URANO_USDC_DIRECT_PAIR=true
NEXT_PUBLIC_URANO_WETH_DIRECT_PAIR=false
```

- [ ] **Step 3:** Create `.env.local` locally with the same values so dev/build don't fail validation. Do NOT commit `.env.local`.

```bash
cp .env.example .env.local
```

- [ ] **Step 4:** Verify env validation passes.

```bash
npm run typecheck && npm run build
```

Expected: both commands pass. If build complains about invalid env, re-check the enum transform (it runs zod on the string, so unknown values throw before reaching the app).

- [ ] **Step 5:** Commit.

```bash
git add src/env.js .env.example
git commit -m "feat: add swap widget env vars to t3-oss schema"
```

---

## Task 3: thirdweb client + chain

**Files:**
- Create: `src/lib/thirdweb.ts`

- [ ] **Step 1:** Create the file with exactly this content.

```ts
import { createThirdwebClient } from "thirdweb";
import { arbitrum } from "thirdweb/chains";
import { env } from "@/env";

export const client = createThirdwebClient({
  clientId: env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
});

export const chain = arbitrum;
```

- [ ] **Step 2:** Typecheck.

```bash
npm run typecheck
```

Expected: passes.

- [ ] **Step 3:** Commit.

```bash
git add src/lib/thirdweb.ts
git commit -m "feat: add thirdweb client and Arbitrum chain"
```

---

## Task 4: Contracts + ABIs + path builders

**Files:**
- Create: `src/lib/contracts.ts`

- [ ] **Step 1:** Create the file. Inline the three ABIs from spec §8.1–§8.3 and expose thirdweb `getContract` instances + path builders.

```ts
import { getContract, type ThirdwebContract } from "thirdweb";
import { client, chain } from "@/lib/thirdweb";
import { env } from "@/env";

const erc20Abi = [
  { type: "function", name: "allowance", stateMutability: "view",
    inputs: [{ name: "owner", type: "address" }, { name: "spender", type: "address" }],
    outputs: [{ type: "uint256" }] },
  { type: "function", name: "approve", stateMutability: "nonpayable",
    inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }],
    outputs: [{ type: "bool" }] },
  { type: "function", name: "balanceOf", stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ type: "uint256" }] },
  { type: "function", name: "decimals", stateMutability: "view",
    inputs: [], outputs: [{ type: "uint8" }] },
] as const;

const v2RouterAbi = [
  { type: "function", name: "getAmountsOut", stateMutability: "view",
    inputs: [
      { name: "amountIn", type: "uint256" },
      { name: "path", type: "address[]" },
    ],
    outputs: [{ name: "amounts", type: "uint256[]" }] },
  { type: "function", name: "swapExactTokensForTokens", stateMutability: "nonpayable",
    inputs: [
      { name: "amountIn", type: "uint256" },
      { name: "amountOutMin", type: "uint256" },
      { name: "path", type: "address[]" },
      { name: "to", type: "address" },
      { name: "deadline", type: "uint256" },
    ],
    outputs: [{ name: "amounts", type: "uint256[]" }] },
  { type: "function", name: "swapExactETHForTokens", stateMutability: "payable",
    inputs: [
      { name: "amountOutMin", type: "uint256" },
      { name: "path", type: "address[]" },
      { name: "to", type: "address" },
      { name: "deadline", type: "uint256" },
    ],
    outputs: [{ name: "amounts", type: "uint256[]" }] },
] as const;

export const usdcContract: ThirdwebContract = getContract({
  client, chain,
  address: env.NEXT_PUBLIC_USDC_ADDRESS,
  abi: erc20Abi,
});

export const uranoContract: ThirdwebContract = getContract({
  client, chain,
  address: env.NEXT_PUBLIC_URANO_ADDRESS,
  abi: erc20Abi,
});

export const v2RouterContract: ThirdwebContract = getContract({
  client, chain,
  address: env.NEXT_PUBLIC_UNISWAP_V2_ROUTER,
  abi: v2RouterAbi,
});

export const USDC_DECIMALS = 6;
export const URANO_DECIMALS = 18;
export const ETH_DECIMALS = 18;

export function usdcPath(): readonly `0x${string}`[] {
  const usdc = env.NEXT_PUBLIC_USDC_ADDRESS as `0x${string}`;
  const urano = env.NEXT_PUBLIC_URANO_ADDRESS as `0x${string}`;
  const weth = env.NEXT_PUBLIC_WETH_ADDRESS as `0x${string}`;
  return env.NEXT_PUBLIC_URANO_USDC_DIRECT_PAIR ? [usdc, urano] : [usdc, weth, urano];
}

export function ethPath(): readonly `0x${string}`[] {
  const usdc = env.NEXT_PUBLIC_USDC_ADDRESS as `0x${string}`;
  const urano = env.NEXT_PUBLIC_URANO_ADDRESS as `0x${string}`;
  const weth = env.NEXT_PUBLIC_WETH_ADDRESS as `0x${string}`;
  return env.NEXT_PUBLIC_URANO_WETH_DIRECT_PAIR ? [weth, urano] : [weth, usdc, urano];
}

// ETH gas buffer to keep out of swap amount (0.0005 ETH in wei).
export const ETH_GAS_BUFFER_WEI = 500_000_000_000_000n;
```

- [ ] **Step 2:** Typecheck.

```bash
npm run typecheck
```

Expected: passes. If `ThirdwebContract` import fails, check `thirdweb`'s actual type export (`node_modules/thirdweb/dist/types/contract/contract.d.ts`) and replace with the correct generic.

- [ ] **Step 3:** Commit.

```bash
git add src/lib/contracts.ts
git commit -m "feat: add Uniswap V2 Router and ERC20 contracts with path builders"
```

---

## Task 5: Wire ThirdwebProvider into existing Providers

**Files:**
- Modify: `src/components/layout/providers.tsx`

- [ ] **Step 1:** Wrap children with `<ThirdwebProvider>` imported from `thirdweb/react`. It has no props — just provides context.

Replace the file with:

```tsx
'use client';
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider, CssBaseline } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { ThirdwebProvider } from 'thirdweb/react';
import theme from '@/theme/theme';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme as Theme}>
        <CssBaseline />
        <ThirdwebProvider>{children}</ThirdwebProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
```

- [ ] **Step 2:** Verify the app still boots.

```bash
npm run dev
```

Expected: dev server starts on http://localhost:3000 and the existing landing page renders with no console errors. Ctrl+C to stop.

- [ ] **Step 3:** Commit.

```bash
git add src/components/layout/providers.tsx
git commit -m "feat: add ThirdwebProvider to app providers"
```

---

## Task 6: SlippageDropdown

**Files:**
- Create: `src/components/sections/purchaseUrano/SlippageDropdown.tsx`

- [ ] **Step 1:** Create the component — an MUI `Select` restricted to 0.5 / 1 / 2 (percent).

```tsx
"use client";

import { MenuItem, Select, type SelectChangeEvent } from "@mui/material";

export type SlippagePct = 0.5 | 1 | 2;

export function SlippageDropdown({
  value,
  onChange,
}: Readonly<{ value: SlippagePct; onChange: (v: SlippagePct) => void }>) {
  const handleChange = (e: SelectChangeEvent<number>) => {
    const next = Number(e.target.value) as SlippagePct;
    onChange(next);
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      size="small"
      variant="standard"
      disableUnderline
      sx={{
        color: "#fff",
        fontSize: 14,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 1.5,
        px: 1,
        py: 0.25,
        "& .MuiSelect-select": { py: 0.25, pr: "24px !important" },
        "& .MuiSvgIcon-root": { color: "rgba(255,255,255,0.7)" },
      }}
      MenuProps={{
        PaperProps: { sx: { bgcolor: "#151515", color: "#fff", border: "1px solid #242424" } },
      }}
    >
      <MenuItem value={0.5}>0.5%</MenuItem>
      <MenuItem value={1}>1%</MenuItem>
      <MenuItem value={2}>2%</MenuItem>
    </Select>
  );
}
```

- [ ] **Step 2:** Typecheck.

```bash
npm run typecheck
```

Expected: passes.

- [ ] **Step 3:** Commit.

```bash
git add src/components/sections/purchaseUrano/SlippageDropdown.tsx
git commit -m "feat: add slippage dropdown"
```

---

## Task 7: PayTokenDropdown

**Files:**
- Create: `src/components/sections/purchaseUrano/PayTokenDropdown.tsx`

- [ ] **Step 1:** Create the component — MUI `Select` with USDC (default) / ETH.

```tsx
"use client";

import { MenuItem, Select, type SelectChangeEvent } from "@mui/material";

export type PayToken = "USDC" | "ETH";

export function PayTokenDropdown({
  value,
  onChange,
}: Readonly<{ value: PayToken; onChange: (v: PayToken) => void }>) {
  const handleChange = (e: SelectChangeEvent<PayToken>) => {
    onChange(e.target.value as PayToken);
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      size="small"
      variant="standard"
      disableUnderline
      sx={{
        color: "#fff",
        fontWeight: 600,
        fontSize: 15,
        minWidth: 84,
        "& .MuiSelect-select": { py: 0.5, pr: "24px !important" },
        "& .MuiSvgIcon-root": { color: "rgba(255,255,255,0.7)" },
      }}
      MenuProps={{
        PaperProps: { sx: { bgcolor: "#151515", color: "#fff", border: "1px solid #242424" } },
      }}
    >
      <MenuItem value="USDC">USDC</MenuItem>
      <MenuItem value="ETH">ETH</MenuItem>
    </Select>
  );
}
```

- [ ] **Step 2:** Typecheck.

```bash
npm run typecheck
```

Expected: passes.

- [ ] **Step 3:** Commit.

```bash
git add src/components/sections/purchaseUrano/PayTokenDropdown.tsx
git commit -m "feat: add pay token dropdown"
```

---

## Task 8: SwapWidget — scaffold & layout (no logic yet)

**Files:**
- Create: `src/components/sections/purchaseUrano/SwapWidget.tsx`

Goal: produce the visual card exactly as the mockup, with state only for `payToken`, `slippage`, and `amountIn` string. No web3 calls yet. This lets us verify the layout before piling on logic.

- [ ] **Step 1:** Create the scaffold.

```tsx
"use client";

import { useState } from "react";
import { Box, Button, InputBase, Stack, Typography } from "@mui/material";
import { SlippageDropdown, type SlippagePct } from "./SlippageDropdown";
import { PayTokenDropdown, type PayToken } from "./PayTokenDropdown";

export default function SwapWidget() {
  const [payToken, setPayToken] = useState<PayToken>("USDC");
  const [slippage, setSlippage] = useState<SlippagePct>(0.5);
  const [amountIn, setAmountIn] = useState<string>("");

  const handlePayTokenChange = (next: PayToken) => {
    setPayToken(next);
    setAmountIn("");
  };

  const maxDecimals = payToken === "USDC" ? 6 : 18;

  const handleAmountChange = (raw: string) => {
    if (raw === "") { setAmountIn(""); return; }
    // allow digits + single dot, enforce max decimals
    if (!/^\d*\.?\d*$/.test(raw)) return;
    const [, frac] = raw.split(".");
    if (frac !== undefined && frac.length > maxDecimals) return;
    setAmountIn(raw);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 460,
        mx: "auto",
        bgcolor: "#151515",
        border: "1px solid #242424",
        borderRadius: 4,
        p: { xs: 2.5, md: 3 },
      }}
    >
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Swap</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>Slippage</Typography>
          <SlippageDropdown value={slippage} onChange={setSlippage} />
        </Stack>
      </Stack>

      {/* You pay */}
      <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 13, mb: 0.75 }}>You pay</Typography>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          bgcolor: "#1c1c1c",
          border: "1px solid #242424",
          borderRadius: 2,
          px: 2,
          py: 1.25,
          mb: 2,
        }}
      >
        <InputBase
          fullWidth
          value={amountIn}
          onChange={(e) => handleAmountChange(e.target.value)}
          placeholder="0.0"
          inputProps={{ inputMode: "decimal" }}
          sx={{ color: "#fff", fontSize: 20, "& input::placeholder": { color: "rgba(255,255,255,0.35)", opacity: 1 } }}
        />
        <PayTokenDropdown value={payToken} onChange={handlePayTokenChange} />
      </Stack>

      {/* You receive */}
      <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 13, mb: 0.75 }}>You receive (estimated)</Typography>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          bgcolor: "#1c1c1c",
          border: "1px solid #242424",
          borderRadius: 2,
          px: 2,
          py: 1.25,
          mb: 3,
        }}
      >
        <InputBase
          fullWidth
          readOnly
          value=""
          placeholder="0.0"
          sx={{ color: "#fff", fontSize: 20, "& input::placeholder": { color: "rgba(255,255,255,0.35)", opacity: 1 } }}
        />
        <Typography sx={{ color: "rgba(255,255,255,0.75)", fontWeight: 600, fontSize: 15, pr: 0.5 }}>URANO</Typography>
      </Stack>

      {/* CTA */}
      <Button
        fullWidth
        disableElevation
        sx={{
          py: 1.5,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 700,
          fontSize: 16,
          color: "#0c1b1e",
          background: "linear-gradient(90deg, #5EBBC3 0%, #6DE7C2 100%)",
          "&:hover": { background: "linear-gradient(90deg, #5EBBC3 0%, #6DE7C2 100%)", filter: "brightness(1.05)" },
          "&.Mui-disabled": { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" },
        }}
      >
        Connect Wallet
      </Button>
    </Box>
  );
}
```

- [ ] **Step 2:** Typecheck.

```bash
npm run typecheck
```

Expected: passes.

- [ ] **Step 3:** Commit.

```bash
git add src/components/sections/purchaseUrano/SwapWidget.tsx
git commit -m "feat: scaffold swap widget UI"
```

---

## Task 9: PurchaseUranoSection + wire into page

**Files:**
- Create: `src/components/sections/PurchaseUranoSection.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1:** Create the section wrapper. Mirror `PoweredByUranoSection`'s title styling (`className="conthrax"`, uranoGradient text).

```tsx
import type { ReactElement } from "react";
import { Box, Typography } from "@mui/material";
import theme from "@/theme/theme";
import SwapWidget from "./purchaseUrano/SwapWidget";

export default function PurchaseUranoSection({
  title = "PURCHASE URANO",
}: Readonly<{ title?: string }>): ReactElement {
  return (
    <Box
      component="section"
      id="purchase-urano"
      sx={{
        width: "100%",
        maxWidth: 1180,
        mx: "auto",
        pt: { xs: 6, md: 8 },
        px: { xs: 2.5, md: 3 },
      }}
    >
      <Typography
        className="conthrax"
        sx={{
          textAlign: "center",
          fontSize: { xs: 26, md: 44 },
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          background: theme.palette.uranoGradient,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: { xs: 4, md: 6 },
          px: 2,
        }}
      >
        {title}
      </Typography>

      <SwapWidget />
    </Box>
  );
}
```

- [ ] **Step 2:** Insert the section into `src/app/page.tsx` immediately after `<PoweredByUranoSection ... />`.

Add the import near the other section imports:

```tsx
import PurchaseUranoSection from "@/components/sections/PurchaseUranoSection";
```

And in the render, between the `PoweredByUranoSection` line and `TechIntegrationsSection` line:

```tsx
<PoweredByUranoSection title="Powered by Urano" items={poweredItems} />
<PurchaseUranoSection />
<TechIntegrationsSection title="Tech Integrations" items={techItems} />
```

- [ ] **Step 3:** Run dev server and eyeball the layout.

```bash
npm run dev
```

Open http://localhost:3000, scroll past "Powered by Urano". The card should appear with the heading, the 0.5% slippage pill, the "You pay" input with a USDC dropdown, the "You receive" row pinned with "URANO", and the gradient "Connect Wallet" button. If it doesn't match the mockup, pause and fix the layout before continuing.

- [ ] **Step 4:** Commit.

```bash
git add src/components/sections/PurchaseUranoSection.tsx src/app/page.tsx
git commit -m "feat: add Purchase URANO section to landing page"
```

---

## Task 10: Connect button + wrong-network state

**Files:**
- Modify: `src/components/sections/purchaseUrano/SwapWidget.tsx`

Goal: wire the CTA to thirdweb. When disconnected, clicking opens the thirdweb modal. When connected but on wrong chain, button flips to "Switch to Arbitrum" and calls `useSwitchActiveWalletChain`.

- [ ] **Step 1:** Add the wallet hooks and `ConnectButton` fallback. Import at top:

```tsx
import { ConnectButton, useActiveAccount, useActiveWalletChain, useSwitchActiveWalletChain } from "thirdweb/react";
import { client, chain } from "@/lib/thirdweb";
```

Inside the component, above `return`:

```tsx
const account = useActiveAccount();
const activeChain = useActiveWalletChain();
const switchChain = useSwitchActiveWalletChain();
const isWrongChain = !!account && activeChain?.id !== chain.id;
```

- [ ] **Step 2:** Replace the hardcoded "Connect Wallet" `Button` with branching logic:

```tsx
{!account ? (
  <ConnectButton
    client={client}
    chain={chain}
    theme="dark"
    connectButton={{
      label: "Connect Wallet",
      style: {
        width: "100%",
        padding: "12px 0",
        borderRadius: 8,
        fontWeight: 700,
        fontSize: 16,
        color: "#0c1b1e",
        background: "linear-gradient(90deg, #5EBBC3 0%, #6DE7C2 100%)",
      },
    }}
    connectModal={{ size: "compact", title: "Connect to Urano", showThirdwebBranding: false }}
  />
) : isWrongChain ? (
  <Button
    fullWidth
    onClick={() => switchChain(chain)}
    sx={ctaSx}
  >
    Switch to Arbitrum
  </Button>
) : (
  <Button fullWidth disabled sx={ctaSx}>
    Enter an amount
  </Button>
)}
```

Extract the repeated button styles to a `const ctaSx = { ... }` at module scope, using the same values from Task 8's CTA.

- [ ] **Step 3:** Dev-server eyeball test.

```bash
npm run dev
```

- Before connecting: gradient "Connect Wallet" button. Click → thirdweb modal opens.
- After connecting on a non-Arbitrum network (e.g. Ethereum): button text = "Switch to Arbitrum". Click → wallet prompts network switch.
- After switching: button text = "Enter an amount" and is disabled.

- [ ] **Step 4:** Commit.

```bash
git add src/components/sections/purchaseUrano/SwapWidget.tsx
git commit -m "feat: wire wallet connect and network switch"
```

---

## Task 11: Live quote (debounced getAmountsOut)

**Files:**
- Modify: `src/components/sections/purchaseUrano/SwapWidget.tsx`

Goal: when the user types a valid amount, call `v2Router.getAmountsOut(amountIn, path)` with 300ms debounce and display the last element as the URANO receive amount (to 4 decimals). Show "No route" on revert.

- [ ] **Step 1:** Add a debounce hook (inline, no lib). At the top of the file:

```tsx
import { useEffect, useMemo, useState } from "react";
import { parseUnits, formatUnits } from "viem";
import { readContract } from "thirdweb";
import { usdcPath, ethPath, v2RouterContract, USDC_DECIMALS, URANO_DECIMALS, ETH_DECIMALS } from "@/lib/contracts";
```

And inside the component:

```tsx
const [debouncedAmount, setDebouncedAmount] = useState<string>("");
useEffect(() => {
  const t = setTimeout(() => setDebouncedAmount(amountIn), 300);
  return () => clearTimeout(t);
}, [amountIn]);

const [quotedOut, setQuotedOut] = useState<bigint | null>(null);
const [quoteError, setQuoteError] = useState<string | null>(null);
const [quoteLoading, setQuoteLoading] = useState<boolean>(false);

const payDecimals = payToken === "USDC" ? USDC_DECIMALS : ETH_DECIMALS;
const path = useMemo(() => (payToken === "USDC" ? usdcPath() : ethPath()), [payToken]);

useEffect(() => {
  setQuoteError(null);
  if (!debouncedAmount || debouncedAmount === "0" || debouncedAmount === ".") {
    setQuotedOut(null);
    return;
  }
  let cancelled = false;
  const run = async () => {
    setQuoteLoading(true);
    try {
      const amountIn = parseUnits(debouncedAmount, payDecimals);
      const amounts = (await readContract({
        contract: v2RouterContract,
        method: "getAmountsOut",
        params: [amountIn, path as `0x${string}`[]],
      })) as readonly bigint[];
      if (cancelled) return;
      setQuotedOut(amounts[amounts.length - 1] ?? null);
    } catch {
      if (cancelled) return;
      setQuotedOut(null);
      setQuoteError("No route");
    } finally {
      if (!cancelled) setQuoteLoading(false);
    }
  };
  void run();
  return () => { cancelled = true; };
}, [debouncedAmount, payDecimals, path]);

const receiveDisplay =
  quotedOut === null ? "" : Number(formatUnits(quotedOut, URANO_DECIMALS)).toFixed(4);
```

- [ ] **Step 2:** Swap the "You receive" `InputBase` `value=""` for `value={receiveDisplay}`. Under the CTA, show the quote error inline if set.

Near the bottom of the card, right above the CTA block:

```tsx
{quoteError ? (
  <Typography sx={{ color: "#ff6b6b", fontSize: 12, mb: 1 }}>{quoteError}</Typography>
) : null}
```

- [ ] **Step 3:** Dev test.

```bash
npm run dev
```

Type `1` into "You pay" with USDC selected. Within ~500ms the URANO receive field should populate. Type a huge number (e.g. `1000000000`) — expect "No route" (or a real quote if liquidity is that deep; either is acceptable). Switch to ETH — the input clears; type `0.001`, quote should populate. `quoteLoading` isn't surfaced in the UI yet; that's fine — it's internal state used in later tasks.

- [ ] **Step 4:** Commit.

```bash
git add src/components/sections/purchaseUrano/SwapWidget.tsx
git commit -m "feat: live Uniswap V2 quote with 300ms debounce"
```

---

## Task 12: Balance + allowance + insufficient-balance state

**Files:**
- Modify: `src/components/sections/purchaseUrano/SwapWidget.tsx`

Goal: read USDC balance + allowance and native ETH balance via thirdweb hooks; flip the CTA text based on balance vs. input.

- [ ] **Step 1:** Import the read hooks.

```tsx
import { useReadContract, useWalletBalance } from "thirdweb/react";
import { usdcContract, ETH_GAS_BUFFER_WEI } from "@/lib/contracts";
import { env } from "@/env";
```

Inside the component, add:

```tsx
const usdcBalanceQuery = useReadContract({
  contract: usdcContract,
  method: "balanceOf",
  params: [account?.address ?? "0x0000000000000000000000000000000000000000"],
  queryOptions: { enabled: !!account && payToken === "USDC" },
});

const allowanceQuery = useReadContract({
  contract: usdcContract,
  method: "allowance",
  params: [
    account?.address ?? "0x0000000000000000000000000000000000000000",
    env.NEXT_PUBLIC_UNISWAP_V2_ROUTER,
  ],
  queryOptions: { enabled: !!account && payToken === "USDC" },
});

const ethBalanceQuery = useWalletBalance({
  client,
  chain,
  address: account?.address,
  // native ETH: omit tokenAddress
});

const amountInBigInt: bigint | null = (() => {
  if (!debouncedAmount) return null;
  try { return parseUnits(debouncedAmount, payDecimals); } catch { return null; }
})();

const insufficient = (() => {
  if (!account || amountInBigInt === null) return false;
  if (payToken === "USDC") {
    const bal = usdcBalanceQuery.data as bigint | undefined;
    if (bal === undefined) return false;
    return amountInBigInt > bal;
  }
  const bal = ethBalanceQuery.data?.value;
  if (bal === undefined) return false;
  return amountInBigInt + ETH_GAS_BUFFER_WEI > bal;
})();

const needsApproval = (() => {
  if (payToken !== "USDC" || !account || amountInBigInt === null) return false;
  const allowance = allowanceQuery.data as bigint | undefined;
  if (allowance === undefined) return false;
  return allowance < amountInBigInt;
})();
```

- [ ] **Step 2:** Expand the button branch to pick the first applicable state from this ordered list:
  1. `!account` → `<ConnectButton ... />`
  2. `isWrongChain` → "Switch to Arbitrum"
  3. `amountInBigInt === null || amountInBigInt === 0n` → "Enter an amount" (disabled)
  4. `insufficient` → "Insufficient USDC" / "Insufficient ETH" (disabled)
  5. `quoteError` → "No route" (disabled)
  6. `needsApproval` → "Approve USDC" (active; wired in Task 13)
  7. otherwise → "Swap" (active; wired in Task 13)

Sketch:

```tsx
const ctaLabel = (() => {
  if (amountInBigInt === null || amountInBigInt === 0n) return "Enter an amount";
  if (insufficient) return payToken === "USDC" ? "Insufficient USDC" : "Insufficient ETH";
  if (quoteError) return "No route";
  if (needsApproval) return "Approve USDC";
  return "Swap";
})();

const ctaDisabled = ctaLabel === "Enter an amount"
  || ctaLabel.startsWith("Insufficient")
  || ctaLabel === "No route";
```

Use `ctaLabel` + `ctaDisabled` as the text/state of the MUI button (inside the connected-and-correct-chain branch). Leave the click handler as a TODO comment — wired next task.

- [ ] **Step 3:** Dev test with a connected wallet on Arbitrum. Type a small amount of USDC you don't have → "Insufficient USDC". Type 0 → "Enter an amount". Confirm the button is disabled in those states.

- [ ] **Step 4:** Commit.

```bash
git add src/components/sections/purchaseUrano/SwapWidget.tsx
git commit -m "feat: balance and allowance checks for CTA state"
```

---

## Task 13: Approve + swap transactions

**Files:**
- Modify: `src/components/sections/purchaseUrano/SwapWidget.tsx`

Goal: wire `Approve USDC` and `Swap` actions using `useSendTransaction`. After a successful swap, clear input and refetch balance/allowance. Surface revert reasons.

- [ ] **Step 1:** Import tx helpers.

```tsx
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
```

Inside component:

```tsx
const { mutateAsync: sendTx, isPending: txPending } = useSendTransaction();
const [txError, setTxError] = useState<string | null>(null);
const [txSuccess, setTxSuccess] = useState<boolean>(false);

const slippageBps = BigInt(Math.round(slippage * 100)); // 0.5 -> 50

async function handleApprove() {
  if (!account || amountInBigInt === null) return;
  setTxError(null); setTxSuccess(false);
  try {
    const tx = prepareContractCall({
      contract: usdcContract,
      method: "approve",
      params: [env.NEXT_PUBLIC_UNISWAP_V2_ROUTER, amountInBigInt],
    });
    await sendTx(tx);
    await allowanceQuery.refetch();
  } catch (err) {
    setTxError((err as { shortMessage?: string; message?: string }).shortMessage
      ?? (err as Error).message
      ?? "Approval failed");
  }
}

async function handleSwap() {
  if (!account || amountInBigInt === null || quotedOut === null) return;
  setTxError(null); setTxSuccess(false);
  const amountOutMin = (quotedOut * (10000n - slippageBps)) / 10000n;
  const deadline = BigInt(Math.floor(Date.now() / 1000) + 600);
  try {
    const tx = payToken === "USDC"
      ? prepareContractCall({
          contract: v2RouterContract,
          method: "swapExactTokensForTokens",
          params: [amountInBigInt, amountOutMin, usdcPath() as `0x${string}`[], account.address, deadline],
        })
      : prepareContractCall({
          contract: v2RouterContract,
          method: "swapExactETHForTokens",
          params: [amountOutMin, ethPath() as `0x${string}`[], account.address, deadline],
          value: amountInBigInt,
        });
    await sendTx(tx);
    setAmountIn("");
    setQuotedOut(null);
    setTxSuccess(true);
    if (payToken === "USDC") {
      await Promise.all([usdcBalanceQuery.refetch(), allowanceQuery.refetch()]);
    }
  } catch (err) {
    setTxError((err as { shortMessage?: string; message?: string }).shortMessage
      ?? (err as Error).message
      ?? "Swap failed");
  }
}
```

- [ ] **Step 2:** Wire the button `onClick`:

```tsx
onClick={ctaLabel === "Approve USDC" ? handleApprove : ctaLabel === "Swap" ? handleSwap : undefined}
disabled={ctaDisabled || txPending}
```

Extend `ctaLabel` logic: if `txPending` → render `"Confirming…"`.

- [ ] **Step 3:** Add the error + success message under the button:

```tsx
{txError ? (
  <Typography sx={{ color: "#ff6b6b", fontSize: 12, mt: 1.5, textAlign: "center" }}>{txError}</Typography>
) : null}
{txSuccess ? (
  <Typography sx={{ color: "#6DE7C2", fontSize: 12, mt: 1.5, textAlign: "center" }}>Swap confirmed.</Typography>
) : null}
```

- [ ] **Step 4:** Full manual verification (see "Verification" section below).

- [ ] **Step 5:** Commit.

```bash
git add src/components/sections/purchaseUrano/SwapWidget.tsx
git commit -m "feat: approve and swap transactions with error surfacing"
```

---

## Verification (run before declaring done)

- [ ] `npm run typecheck` — passes.
- [ ] `npm run lint` — passes (fix any new warnings introduced by this change; don't touch unrelated lint).
- [ ] `npm run build` — passes.
- [ ] `npm run dev` — loads, page renders, card appears directly after "Powered by Urano" matching the mockup.
- [ ] Browser test with a funded Arbitrum wallet (on mainnet; this spec is production-chain only):
  - Disconnected → "Connect Wallet" opens thirdweb modal.
  - Connected on Ethereum → "Switch to Arbitrum", click switches the wallet to Arbitrum.
  - Type `1` USDC → within 500ms URANO estimate appears.
  - Switch to ETH → input clears, type `0.001`, estimate appears.
  - With USDC balance < input → "Insufficient USDC" + disabled.
  - With ETH balance tight (vs. gas buffer) → "Insufficient ETH" + disabled.
  - USDC flow: "Approve USDC" → wallet prompt, spender = `0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24`. After approval, button flips to "Swap". Click → wallet prompts `swapExactTokensForTokens`.
  - ETH flow: skips approve entirely; "Swap" → wallet prompts `swapExactETHForTokens` with non-zero `value`.
  - On revert: the revert reason (or at least a `shortMessage`) appears under the button and is not swallowed.

**STOP conditions** (the spec calls these out — do not guess past them):
- Quote reverts on `USDC → URANO` direct path: try flipping `NEXT_PUBLIC_URANO_USDC_DIRECT_PAIR=false` (multi-hop via WETH). If it still reverts on Uniswap UI's route, STOP and ask.
- Pair uses USDC.e (`0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8`) instead of native USDC: STOP and ask before flipping the env var.
- Swap reverts on chain but Uniswap UI succeeds for the same inputs: likely fee-on-transfer → switch to `*SupportingFeeOnTransferTokens` variants. STOP and ask before doing so.

---

## Out of scope (do NOT add without asking)

- Presale contract, KYC flow, Persona, allocation logic — all belong to the dapp, not the landing page.
- Transaction history UI — deferred to Arbiscan.
- Server-only thirdweb secret key — this widget is 100% client-side.
- Multi-chain support — Arbitrum One only.
