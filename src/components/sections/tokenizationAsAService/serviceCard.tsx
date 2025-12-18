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
  const bgUrl =
    image ? (typeof image === "string" ? image : image.src) : "";

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
      {/* 16:9 media */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          overflow: "hidden",
          borderRadius: 3, // keep if you need rounded corners
          backgroundColor: "rgba(255,255,255,0.06)",

          // image layer
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

          // optional subtle dark overlay (remove if not needed)
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.35) 100%)",
            pointerEvents: "none",
          },

          "&:hover::before": {
            transform: "scale(1.06)",
          },
        }}
      />


      <Stack
        sx={{
          px: 2.5,
          pt: 2,
          pb: 2.25,
          gap: 1,
          flex: "1 1 auto",
          justifyContent: "flex-start",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 16, md: 16 },
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
