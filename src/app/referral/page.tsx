"use client";

import { Box } from "@mui/material";
import { ReferralStats } from "@/domains/referral";

export default function ReferralPage() {
  return (
    <Box
      sx={{
        width: { xs: "100%", lg: "70%" },
        mx: "auto",
        px: { xs: 2, md: 3 },
        pt: { xs: 12, md: 16 },
        pb: { xs: 6, md: 10 },
      }}
    >
      <ReferralStats />
    </Box>
  );
}
