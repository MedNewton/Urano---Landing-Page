"use client";

import type { ReactElement, ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { Box, Button, Container, Stack, Typography, Grid } from "@mui/material";
import SouthEastIcon from "@mui/icons-material/SouthEast";

import theme from "@/theme/theme";

export type ExploreEcosystemItem = Readonly<{
  id: string;

  title: string;
  description: string;

  primaryCtaLabel: string;
  primaryCtaHref: string;

  secondaryCtaLabel: string;
  secondaryCtaHref: string;

  imageSide: "left" | "right";
  image?: StaticImageData | string;
  imageAlt?: string;

  backdropWord?: string;
}>;

export type ExploreEcosystemSectionProps = Readonly<{
  title?: string;
  items: ExploreEcosystemItem[];
}>;

function ActionLink({ label }: { label: string; href: string }): ReactElement {
  return (
    <Button
      sx={{
        backgroundColor: "transparent",
        borderRadius: 0,
        borderBottom: `2px solid ${theme.palette.text.primary}`,
        px: 0.5,
        py: 0.75,
        height: "fit-content",
        width: "fit-content",
        "&:hover": { backgroundColor: "transparent" },
      }}
    >
      <Stack direction="row" alignItems="center" gap={5}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "1rem",
            fontWeight: 400,
            color: theme.palette.text.primary,
          }}
        >
          {label}
        </Typography>
        <SouthEastIcon sx={{ fontSize: 20, color: theme.palette.text.primary }} />
      </Stack>
    </Button>
  );
}

function CellShell({
  children,
  bg,
}: {
  children: ReactNode;
  bg?: string;
}): ReactElement {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: 0,
        overflow: "hidden",
        backgroundColor: bg ?? theme.palette.background.default,
      }}
    >
      {children}
    </Box>
  );
}

function ImageBottomGlow(): ReactElement {
  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        left: "50%",
        bottom: { xs: -90, md: -110 },
        transform: "translateX(-50%)",
        width: { xs: "140%", md: "115%" },
        height: "auto",
        pointerEvents: "none",
      }}
    >
      <svg
        width="721"
        height="260"
        viewBox="0 0 721 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <g opacity="0.66" filter="url(#filter0_f_512_855)">
          <ellipse
            cx="343.5"
            cy="336.9"
            rx="354.5"
            ry="120"
            fill="url(#paint0_linear_512_855)"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_512_855"
            x="-227.9"
            y="3.05176e-05"
            width="1142.8"
            height="673.8"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="108.45"
              result="effect1_foregroundBlur_512_855"
            />
          </filter>
          <linearGradient
            id="paint0_linear_512_855"
            x1="-11"
            y1="336.9"
            x2="698"
            y2="336.9"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#5EBBC3" />
            <stop offset="1" stopColor="#6DE7C2" />
          </linearGradient>
        </defs>
      </svg>
    </Box>
  );
}

function ImageCell({
  image,
  imageAlt = "",
  fit = "contain",
  scale = 1,
}: {
  image?: StaticImageData | string;
  imageAlt?: string;
  fit?: "contain" | "cover";
  /** For contain mode: scales the rendered image box (e.g. 0.5 = 50%). Ignored for cover. */
  scale?: number;
}): ReactElement {
  const shouldScale = fit === "contain" && scale !== 1;

  return (
    <CellShell>
      {!image ? (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.06)",
          }}
        />
      ) : shouldScale ? (
        <>
          {/* keep Image optimized and still enforce 50% visual size */}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: `${Math.round(scale * 100)}%`,
              height: `${Math.round(scale * 100)}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "contain", objectPosition: "center" }}
              priority={false}
            />
          </Box>
        </>
      ) : (
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          style={{
            objectFit: fit,
            objectPosition: "center",
          }}
          priority={false}
        />
      )}

      <ImageBottomGlow />
    </CellShell>
  );
}

function ContentCell({
  title,
  description,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
}: {
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}): ReactElement {
  return (
    <CellShell bg="#191919">
      <Stack
        sx={{
          height: "100%",
          px: { xs: 3, md: 7 },
          py: { xs: 4, md: 5 },
          justifyContent: "center",
          gap: 2.25,
        }}
      >
        <Typography
          className="conthrax"
          sx={{
            fontSize: { xs: 18, md: 22 },
            background: theme.palette.uranoGradient,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: 13.5, md: 14.5 },
            lineHeight: 1.5,
            color: theme.palette.text.secondary,
            maxWidth: 560,
          }}
        >
          {description}
        </Typography>

        <Stack direction="row" spacing={3} sx={{ pt: 0.5 }}>
          <ActionLink label={primaryCtaLabel} href={primaryCtaHref} />
          <ActionLink label={secondaryCtaLabel} href={secondaryCtaHref} />
        </Stack>
      </Stack>
    </CellShell>
  );
}

export default function ExploreEcosystemSection({
  title = "EXPLORE THE ECOSYSTEM",
  items,
}: ExploreEcosystemSectionProps): ReactElement {
  return (
    <Box component="section" sx={{ width: "100%", pt: { xs: 4, md: 6 } }}>
      <Box sx={{ width: "100vw", ml: "calc(50% - 50vw)" }}>
        <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 16 } }}>
          <Typography
            className="conthrax"
            sx={{
              textAlign: "center",
              fontSize: { xs: 22, md: 30 },
              textTransform: "uppercase",
              background: theme.palette.uranoGradient,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: { xs: 4, md: 6 },
            }}
          >
            {title}
          </Typography>
        </Container>

        <Grid container spacing={0} sx={{ width: "100%", m: 0 }}>
          {items.map((it, idx) => {
            const isLast = idx === items.length - 1;

            const imageBlock = (
              <Grid key={`${it.id}-img`} size={{ xs: 12, md: 6 }} sx={{ p: 0 }}>
                <Box sx={{ height: { xs: 360, sm: 420, md: 520 } }}>
                  <ImageCell
                    image={it.image}
                    imageAlt={it.imageAlt ?? ""}
                    fit={isLast ? "cover" : "contain"}
                    scale={isLast ? 1 : 0.75} // ✅ first 3 at 50%, last is cover (no scaling)
                  />
                </Box>
              </Grid>
            );

            const contentBlock = (
              <Grid
                key={`${it.id}-content`}
                size={{ xs: 12, md: 6 }}
                sx={{ p: 0 }}
              >
                <Box sx={{ height: { xs: 360, sm: 420, md: 520 } }}>
                  <ContentCell
                    title={it.title}
                    description={it.description}
                    primaryCtaLabel={it.primaryCtaLabel}
                    primaryCtaHref={it.primaryCtaHref}
                    secondaryCtaLabel={it.secondaryCtaLabel}
                    secondaryCtaHref={it.secondaryCtaHref}
                  />
                </Box>
              </Grid>
            );

            return it.imageSide === "left" ? (
              <Box key={it.id} sx={{ display: "contents" }}>
                {imageBlock}
                {contentBlock}
              </Box>
            ) : (
              <Box key={it.id} sx={{ display: "contents" }}>
                {contentBlock}
                {imageBlock}
              </Box>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
