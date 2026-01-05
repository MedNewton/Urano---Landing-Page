"use client";

import type { ReactElement } from "react";
import { Box, Stack, Typography } from "@mui/material";
import type { StaticImageData } from "next/image";
import theme from "@/theme/theme";

export type MobileServiceCardProps = Readonly<{
  title: string;
  description: string;
  image?: StaticImageData | string;
  imageAlt?: string;
}>;

export default function MobileServiceCard({
  title,
  description,
  image,
}: MobileServiceCardProps): ReactElement {
  const bgUrl = image ? (typeof image === "string" ? image : image.src) : "";

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.cardBorder1.main}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Same media styling as ServiceCard (ratio adjusted for mobile) */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 10", // change to "16 / 8.5" to match desktop exactly
          overflow: "hidden",
          backgroundColor: "rgba(255,255,255,0.06)",
          flex: "0 0 auto",

          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundImage: bgUrl ? `url(${bgUrl})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transform: "scale(1)",
            transition: "transform 450ms ease",
            willChange: "transform",
          },

          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.32) 100%)",
            pointerEvents: "none",
          },

          "&:hover::before": {
            transform: "scale(1.06)",
          },
        }}
      />

      <Stack
        sx={{
          px: 3,
          pt: 2.25,
          pb: 2.5,
          gap: 1,
          flex: "1 1 auto",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 18, md: 18 },
            fontWeight: 800,
            letterSpacing: "0.01em",
            textTransform: "uppercase",
            color: theme.palette.text.primary,
            lineHeight: 1.08,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: 14, md: 16 },
            fontWeight: 400,
            color: theme.palette.text.secondary,
            lineHeight: 1.4,
          }}
        >
          {description}
        </Typography>
      </Stack>
    </Box>
  );
}
