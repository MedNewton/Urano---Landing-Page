"use client";

import type { ReactElement } from "react";
import Image, { type StaticImageData } from "next/image";
import { Box, Container, Grid, Typography } from "@mui/material";

import theme from "@/theme/theme";

export type TechIntegrationItem = Readonly<{
  id: string;
  image: StaticImageData | string;
  imageAlt?: string;
  caption: string;
}>;

export type TechIntegrationsSectionProps = Readonly<{
  title?: string;
  items: readonly TechIntegrationItem[]; // typically 2 items (left/right)
}>;

function TechCard({
  image,
  imageAlt = "",
  caption,
}: {
  image: StaticImageData | string;
  imageAlt?: string;
  caption: string;
}): ReactElement {
  return (
    <Box
      sx={{
        borderRadius: 3,
        px: 0.5,
        pt: 0.5,
        overflow: "hidden",
        border: `1px solid ${theme.palette.cardBorder1.main}`,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {/* Image area */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          borderRadius: 2,
          aspectRatio: "16 / 8",
          overflow: "hidden",
          backgroundColor: "rgba(255,255,255,0.04)",
          "& .tech-bg-img": {
            transform: "scale(1)",
            transition: "transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1)",
            willChange: "transform",
          },
          "&:hover .tech-bg-img": {
            transform: "scale(1.06)",
          },
        }}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 900px) 100vw, 900px"
          className="tech-bg-img"
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority={false}
        />
      </Box>

      {/* Caption bar */}
      <Box
        sx={{
          px: { xs: 2.25, md: 3 },
          py: { xs: 2, md: 0 },
          backgroundColor: "rgba(18,18,18,0.92)",
          borderTop: `1px solid ${theme.palette.cardBorder1.main}`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          minHeight: { xs: 72, md: 86 },
        }}
      >
        <Typography
          sx={{
            color: theme.palette.text.primary,
            fontSize: { xs: 18, md: "1.25rem" },
            fontWeight: 700,
          }}
        >
          {caption}
        </Typography>
      </Box>
    </Box>
  );
}

export default function TechIntegrationsSection({
  title = "TECH INTEGRATIONS",
  items,
}: TechIntegrationsSectionProps): ReactElement {
  return (
    <Box component="section" sx={{ width: "100%", pt: { xs: 6, md: 8 } }}>
      <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 16 } }}>
        <Typography
          className="conthrax"
          sx={{
            textAlign: "center",
            fontSize: { xs: 26, md: 44 },
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            background: theme.palette.uranoGradient,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: { xs: 3.5, md: 5 },
          }}
        >
          {title}
        </Typography>

        <Grid container spacing={{ xs: 2.5, md: 4 }}>
          {items.slice(0, 2).map((it) => (
            <Grid key={it.id} size={{ xs: 12, md: 6 }}>
              <TechCard image={it.image} imageAlt={it.imageAlt} caption={it.caption} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
