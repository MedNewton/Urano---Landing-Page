"use client";

import { useState } from "react";
import { Box, Button, InputBase, Stack, Typography } from "@mui/material";
import {
  ConnectButton,
  useActiveAccount,
  useActiveWalletChain,
  useSwitchActiveWalletChain,
} from "thirdweb/react";
import { client, chain } from "@/lib/thirdweb";
import { SlippageDropdown, type SlippagePct } from "./SlippageDropdown";
import { PayTokenDropdown, type PayToken } from "./PayTokenDropdown";

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
          value=""
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
        <Button fullWidth disabled sx={ctaSx}>
          Enter an amount
        </Button>
      )}
    </Box>
  );
}
