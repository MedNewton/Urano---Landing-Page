"use client";

import { Box, Stack, Typography } from "@mui/material";

import theme from "@/theme/theme";
import { ConnectWalletButton, SwapWidget, useWalletConnect, useUranoBalance } from "@/shared/wallet";
import { useErrorModal } from "@/components/ui/useErrorModal";
import ErrorModal from "@/components/ui/ErrorModal";
import WalletReferralCard from "./WalletReferralCard";

export default function MobilePurchaseUranoSection() {
  const { errorModalOpen, errorModalTitle, errorModalMessage, showError, closeError } = useErrorModal();
  const { address } = useWalletConnect();
  const { balanceInUsdc, refetch: refetchUranoBalance } = useUranoBalance(address);
  const hasUrano = balanceInUsdc >= 200;

  return (
    <Box
      component="section"
      id="purchase-urano"
      sx={{
        width: "100%",
        pt: 6,
        px: 2.5,
        scrollMarginTop: 80,
      }}
    >
      <Typography
        className="conthrax"
        sx={{
          textAlign: "center",
          fontSize: 26,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          background: theme.palette.uranoGradient,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 4,
          px: 2,
        }}
      >
        Purchase Urano
      </Typography>

      <Stack gap={2} alignItems="stretch">
        <Box width="100%">
          <ConnectWalletButton showError={showError} />
        </Box>
        <Box width="100%">
          <SwapWidget showError={showError} onSwapSuccess={refetchUranoBalance} />
        </Box>
        {hasUrano && address && (
          <Box width="100%">
            <WalletReferralCard address={address} />
          </Box>
        )}
      </Stack>

      <ErrorModal
        open={errorModalOpen}
        onClose={closeError}
        errorTitle={errorModalTitle}
        errorMessage={errorModalMessage}
      />
    </Box>
  );
}
