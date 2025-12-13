"use client";

import type { ReactElement } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Image, { type StaticImageData } from "next/image";
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
  imageAlt = "",
}: ServiceCardProps): ReactElement {
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
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1",
          backgroundColor: "rgba(255,255,255,0.06)",
          flex: "0 0 auto",
        }}
      >
        {image ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 900px) 100vw, 420px"
            style={{ objectFit: "cover" }}
            priority={false}
          />
        ) : null}
      </Box>

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
