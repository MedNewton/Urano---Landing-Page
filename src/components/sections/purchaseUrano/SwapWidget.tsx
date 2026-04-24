"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, Button, InputBase, Stack, Typography } from "@mui/material";
import { prepareContractCall, readContract } from "thirdweb";
import {
  ConnectButton,
  useActiveAccount,
  useActiveWalletChain,
  useReadContract,
  useSendTransaction,
  useSwitchActiveWalletChain,
  useWalletBalance,
} from "thirdweb/react";
import { formatUnits, parseUnits } from "viem";
import { env } from "@/env";
import { client, chain } from "@/lib/thirdweb";
import {
  ETH_DECIMALS,
  ETH_GAS_BUFFER_WEI,
  URANO_DECIMALS,
  USDC_DECIMALS,
  ethPath,
  usdcPath,
  usdcContract,
  v2RouterContract,
} from "@/lib/contracts";
import { SlippageDropdown, type SlippagePct } from "./SlippageDropdown";
import { PayTokenDropdown, type PayToken } from "./PayTokenDropdown";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000" as const;

const ctaSx = {
  py: 1.5,
  borderRadius: 2,
  textTransform: "none" as const,
  fontWeight: 700,
  fontSize: 16,
  color: "#0c1b1e",
  background: "linear-gradient(90deg, #5EBBC3 0%, #6DE7C2 100%)",
  "&:hover": {
    background: "linear-gradient(90deg, #5EBBC3 0%, #6DE7C2 100%)",
    filter: "brightness(1.05)",
  },
  "&.Mui-disabled": {
    background: "rgba(255,255,255,0.08)",
    color: "rgba(255,255,255,0.4)",
  },
};

export default function SwapWidget() {
  const [payToken, setPayToken] = useState<PayToken>("USDC");
  const [slippage, setSlippage] = useState<SlippagePct>(0.5);
  const [amountIn, setAmountIn] = useState<string>("");

  const account = useActiveAccount();
  const activeChain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();
  const isWrongChain = !!account && activeChain?.id !== chain.id;

  const handlePayTokenChange = (next: PayToken) => {
    setPayToken(next);
    setAmountIn("");
  };

  const maxDecimals = payToken === "USDC" ? 6 : 18;

  const handleAmountChange = (raw: string) => {
    if (raw === "") {
      setAmountIn("");
      return;
    }
    if (!/^\d*\.?\d*$/.test(raw)) return;
    const parts = raw.split(".");
    const frac = parts[1];
    if (frac !== undefined && frac.length > maxDecimals) return;
    setAmountIn(raw);
  };

  const [debouncedAmount, setDebouncedAmount] = useState<string>("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedAmount(amountIn), 300);
    return () => clearTimeout(t);
  }, [amountIn]);

  const [quotedOut, setQuotedOut] = useState<bigint | null>(null);
  const [quoteError, setQuoteError] = useState<string | null>(null);

  const payDecimals = payToken === "USDC" ? USDC_DECIMALS : ETH_DECIMALS;
  const path = useMemo(
    () => (payToken === "USDC" ? usdcPath() : ethPath()),
    [payToken],
  );

  useEffect(() => {
    setQuoteError(null);
    if (
      !debouncedAmount ||
      debouncedAmount === "0" ||
      debouncedAmount === "."
    ) {
      setQuotedOut(null);
      return;
    }
    let cancelled = false;
    const run = async () => {
      try {
        const amountInWei = parseUnits(debouncedAmount, payDecimals);
        if (amountInWei === 0n) {
          if (!cancelled) setQuotedOut(null);
          return;
        }
        const amounts = await readContract({
          contract: v2RouterContract,
          method: "getAmountsOut",
          params: [amountInWei, path],
        });
        if (cancelled) return;
        setQuotedOut(amounts[amounts.length - 1] ?? null);
      } catch {
        if (cancelled) return;
        setQuotedOut(null);
        setQuoteError("No route");
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [debouncedAmount, payDecimals, path]);

  const receiveDisplay =
    quotedOut === null
      ? ""
      : Number(formatUnits(quotedOut, URANO_DECIMALS)).toFixed(4);

  const usdcBalanceQuery = useReadContract({
    contract: usdcContract,
    method: "balanceOf",
    params: [account?.address ?? ZERO_ADDRESS],
    queryOptions: { enabled: !!account && payToken === "USDC" },
  });

  const allowanceQuery = useReadContract({
    contract: usdcContract,
    method: "allowance",
    params: [
      account?.address ?? ZERO_ADDRESS,
      env.NEXT_PUBLIC_UNISWAP_V2_ROUTER,
    ],
    queryOptions: { enabled: !!account && payToken === "USDC" },
  });

  const ethBalanceQuery = useWalletBalance({
    client,
    chain,
    address: account?.address,
  });

  const amountInBigInt: bigint | null = (() => {
    if (!debouncedAmount) return null;
    try {
      return parseUnits(debouncedAmount, payDecimals);
    } catch {
      return null;
    }
  })();

  const insufficient = (() => {
    if (!account || amountInBigInt === null) return false;
    if (payToken === "USDC") {
      const bal = usdcBalanceQuery.data;
      if (bal === undefined) return false;
      return amountInBigInt > bal;
    }
    const bal = ethBalanceQuery.data?.value;
    if (bal === undefined) return false;
    return amountInBigInt + ETH_GAS_BUFFER_WEI > bal;
  })();

  const needsApproval = (() => {
    if (payToken !== "USDC" || !account || amountInBigInt === null) return false;
    const allowance = allowanceQuery.data;
    if (allowance === undefined) return false;
    return allowance < amountInBigInt;
  })();

  const { mutateAsync: sendTx, isPending: txPending } = useSendTransaction();
  const [txError, setTxError] = useState<string | null>(null);
  const [txSuccess, setTxSuccess] = useState<boolean>(false);

  const slippageBps = BigInt(Math.round(slippage * 100));

  const baseCtaLabel: string = (() => {
    if (amountInBigInt === null || amountInBigInt === 0n)
      return "Enter an amount";
    if (insufficient) return payToken === "USDC" ? "Insufficient USDC" : "Insufficient ETH";
    if (quoteError) return "No route";
    if (needsApproval) return "Approve USDC";
    return "Swap";
  })();

  const ctaLabel = txPending ? "Confirming…" : baseCtaLabel;

  const ctaDisabled =
    txPending ||
    baseCtaLabel === "Enter an amount" ||
    baseCtaLabel.startsWith("Insufficient") ||
    baseCtaLabel === "No route";

  async function handleApprove() {
    if (!account || amountInBigInt === null) return;
    setTxError(null);
    setTxSuccess(false);
    try {
      const tx = prepareContractCall({
        contract: usdcContract,
        method: "approve",
        params: [env.NEXT_PUBLIC_UNISWAP_V2_ROUTER, amountInBigInt],
      });
      await sendTx(tx);
      await allowanceQuery.refetch();
    } catch (err) {
      const e = err as { shortMessage?: string; message?: string };
      setTxError(e.shortMessage ?? e.message ?? "Approval failed");
    }
  }

  async function handleSwap() {
    if (!account || amountInBigInt === null || quotedOut === null) return;
    setTxError(null);
    setTxSuccess(false);
    const amountOutMin = (quotedOut * (10000n - slippageBps)) / 10000n;
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 600);
    try {
      const tx =
        payToken === "USDC"
          ? prepareContractCall({
              contract: v2RouterContract,
              method: "swapExactTokensForTokens",
              params: [
                amountInBigInt,
                amountOutMin,
                usdcPath(),
                account.address,
                deadline,
              ],
            })
          : prepareContractCall({
              contract: v2RouterContract,
              method: "swapExactETHForTokens",
              params: [
                amountOutMin,
                ethPath(),
                account.address,
                deadline,
              ],
              value: amountInBigInt,
            });
      await sendTx(tx);
      setAmountIn("");
      setQuotedOut(null);
      setTxSuccess(true);
      if (payToken === "USDC") {
        await Promise.all([
          usdcBalanceQuery.refetch(),
          allowanceQuery.refetch(),
        ]);
      }
    } catch (err) {
      const e = err as { shortMessage?: string; message?: string };
      setTxError(e.shortMessage ?? e.message ?? "Swap failed");
    }
  }

  const handleCtaClick =
    baseCtaLabel === "Approve USDC"
      ? handleApprove
      : baseCtaLabel === "Swap"
        ? handleSwap
        : undefined;

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
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>
          Swap
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
            Slippage
          </Typography>
          <SlippageDropdown value={slippage} onChange={setSlippage} />
        </Stack>
      </Stack>

      <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 13, mb: 0.75 }}>
        You pay
      </Typography>
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
          sx={{
            color: "#fff",
            fontSize: 20,
            "& input::placeholder": {
              color: "rgba(255,255,255,0.35)",
              opacity: 1,
            },
          }}
        />
        <PayTokenDropdown value={payToken} onChange={handlePayTokenChange} />
      </Stack>

      <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 13, mb: 0.75 }}>
        You receive (estimated)
      </Typography>
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
          value={receiveDisplay}
          placeholder="0.0"
          sx={{
            color: "#fff",
            fontSize: 20,
            "& input::placeholder": {
              color: "rgba(255,255,255,0.35)",
              opacity: 1,
            },
          }}
        />
        <Typography
          sx={{
            color: "rgba(255,255,255,0.75)",
            fontWeight: 600,
            fontSize: 15,
            pr: 0.5,
          }}
        >
          URANO
        </Typography>
      </Stack>

      {quoteError ? (
        <Typography
          sx={{ color: "#ff6b6b", fontSize: 12, mb: 1, textAlign: "center" }}
        >
          {quoteError}
        </Typography>
      ) : null}

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
          connectModal={{
            size: "compact",
            title: "Connect to Urano",
            showThirdwebBranding: false,
          }}
        />
      ) : isWrongChain ? (
        <Button fullWidth onClick={() => switchChain(chain)} sx={ctaSx}>
          Switch to Arbitrum
        </Button>
      ) : (
        <Button
          fullWidth
          disabled={ctaDisabled}
          onClick={handleCtaClick}
          sx={ctaSx}
        >
          {ctaLabel}
        </Button>
      )}

      {txError ? (
        <Typography
          sx={{
            color: "#ff6b6b",
            fontSize: 12,
            mt: 1.5,
            textAlign: "center",
            wordBreak: "break-word",
          }}
        >
          {txError}
        </Typography>
      ) : null}
      {txSuccess ? (
        <Typography
          sx={{
            color: "#6DE7C2",
            fontSize: 12,
            mt: 1.5,
            textAlign: "center",
          }}
        >
          Swap confirmed.
        </Typography>
      ) : null}
    </Box>
  );
}
