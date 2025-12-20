"use client";

import type { ReactElement } from "react";
import { Box, Stack, Typography } from "@mui/material";
import type { StaticImageData } from "next/image";
import theme from "@/theme/theme";

export type ServiceCardProps = Readonly<{
  title: string;
  description: string;
  image?: StaticImageData | string;
  imageAlt?: string;
}>;

export default function ServiceCard({
  title,
  description,
  image,
}: ServiceCardProps): ReactElement {
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
      {/* Taller media (slightly higher than 16:9) */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 8.5", // was 16/9 → a bit taller
          overflow: "hidden",
          backgroundColor: "rgba(255,255,255,0.06)",

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

      {/* More compact content */}
      <Stack
        sx={{
          px: 2.25,
          pt: 1.6,
          pb: 1.6, // reduce bottom padding
          gap: 0.75, // tighter spacing between title/desc
          flex: "0 0 auto", // don't stretch; prevents “dead space”
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: "0.01em",
            textTransform: "uppercase",
            color: theme.palette.text.primary,
            lineHeight: 1.1,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: 13.5, md: 14.5 },
            fontWeight: 400,
            color: theme.palette.text.secondary,
            lineHeight: 1.45,
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </Typography>
      </Stack>
    </Box>
  );
}
