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
