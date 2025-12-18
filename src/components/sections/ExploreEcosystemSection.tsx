"use client";

import type { ReactElement, ReactNode } from "react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { Box, Button, Container, Stack, Typography, Grid } from "@mui/material";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import { motion } from "framer-motion";

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
        "&:hover": {
          background: "linear-gradient(90deg, #5EBBC3 0%, #6DE7C2 100%)",
          borderBottom: `2px solid transparent`,
          ".button-text": {
            color: "#0E0E0E",
          },
          ".button-icon": {
            filter: "invert(1)",
            trasform: "rotate(45deg)",
            transition: "transform 0.3s ease-in-out",
          },
        },
      }}
    >
      <Stack direction="row" alignItems="center" gap={5}>
        <Typography
          className="button-text"
          variant="h6"
          sx={{
            fontSize: "1rem",
            fontWeight: 400,
            color: theme.palette.text.primary,
          }}
        >
          {label}
        </Typography>
        <SouthEastIcon
          className="button-icon"
          sx={{ fontSize: 20, color: theme.palette.text.primary }}
        />
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

/** ✅ Animated “AI conversation” overlay (loops forever) */
function AssistantConversationOverlay(): ReactElement {
  const MSG1 = "Hi, I’m uAssistant! How can I help you?";
  const MSG2 = "Stake 1,000 $URANO!";

  const [step, setStep] = useState<0 | 1 | 2 | 3>(0); // 0 typing1, 1 pause1, 2 typing2, 3 pause2
  const [t1, setT1] = useState("");
  const [t2, setT2] = useState("");

  const timersRef = useRef<number[]>([]);

  const clearTimers = (): void => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  useEffect(() => {
    clearTimers();

    if (step === 0) {
      setT1("");
      setT2("");

      let i = 0;
      const tick = () => {
        i += 1;
        setT1(MSG1.slice(0, i));

        if (i < MSG1.length) {
          const id = window.setTimeout(tick, 26);
          timersRef.current.push(id);
        } else {
          const id = window.setTimeout(() => setStep(1), 650);
          timersRef.current.push(id);
        }
      };

      const id = window.setTimeout(tick, 220);
      timersRef.current.push(id);
      return () => clearTimers();
    }

    if (step === 1) {
      const id = window.setTimeout(() => setStep(2), 350);
      timersRef.current.push(id);
      return () => clearTimers();
    }

    if (step === 2) {
      let i = 0;
      const tick = () => {
        i += 1;
        setT2(MSG2.slice(0, i));

        if (i < MSG2.length) {
          const id = window.setTimeout(tick, 28);
          timersRef.current.push(id);
        } else {
          const id = window.setTimeout(() => setStep(3), 950);
          timersRef.current.push(id);
        }
      };

      const id = window.setTimeout(tick, 240);
      timersRef.current.push(id);
      return () => clearTimers();
    }

    const id = window.setTimeout(() => setStep(0), 800);
    timersRef.current.push(id);
    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const showSecond = step >= 2;

  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 3,
        pointerEvents: "none",
        userSelect: "none",

        // ✅ center messages vertically
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",

        // keep your left padding, remove the top padding so it can truly center
        pl: { xs: 10, sm: 10, md: 10 },
        pr: { xs: 10, sm: 10, md: 10 },
      }}
    >
      <Stack
        sx={{
          width: "75%",
          maxWidth: { xs: 320, md: 400 },
          gap: 1.25,
        }}
      >
        {/* Left bubble */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          sx={{
            alignSelf: "flex-start",
            width: "fit-content",
            maxWidth: "100%",
            px: 2,
            py: 1.35,
            borderRadius: 3,
            backgroundColor: "rgba(18,18,18,0.62)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0px 18px 60px rgba(0,0,0,0.35)",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 13.5, md: 14.5 },
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.92)",
              whiteSpace: "pre-wrap",
            }}
          >
            {t1}
            {step === 0 ? (
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  width: 8,
                  ml: 0.35,
                  color: "rgba(255,255,255,0.85)",
                  animation: "blink 1s step-end infinite",
                  "@keyframes blink": {
                    "0%, 50%": { opacity: 1 },
                    "50.01%, 100%": { opacity: 0 },
                  },
                }}
              >
                |
              </Box>
            ) : null}
          </Typography>
        </Box>

        {/* Right bubble */}
        <Box
          component={motion.div}
          initial={false}
          animate={
            showSecond
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 10, scale: 0.98 }
          }
          transition={{ duration: 0.28, ease: "easeOut" }}
          sx={{
            alignSelf: "flex-end",
            // ✅ pull it slightly away from the right edge
            mr: { xs: 1.5, md: 8 },

            width: "fit-content",
            maxWidth: "100%",
            px: 2,
            py: 1.35,
            borderRadius: 3,
            background:
              "linear-gradient(90deg, rgba(94,187,195,0.35) 0%, rgba(109,231,194,0.30) 100%)",
            border: "1px solid rgba(255,255,255,0.16)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0px 18px 60px rgba(0,0,0,0.35)",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 13.5, md: 14.5 },
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.95)",
              whiteSpace: "pre-wrap",
            }}
          >
            {t2}
            {step === 2 ? (
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  width: 8,
                  ml: 0.35,
                  color: "rgba(255,255,255,0.85)",
                  animation: "blink2 1s step-end infinite",
                  "@keyframes blink2": {
                    "0%, 50%": { opacity: 1 },
                    "50.01%, 100%": { opacity: 0 },
                  },
                }}
              >
                |
              </Box>
            ) : null}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}


function ImageCell({
  image,
  imageAlt = "",
  fit = "contain",
  scale = 1,
  overlay,
}: {
  image?: StaticImageData | string;
  imageAlt?: string;
  fit?: "contain" | "cover";
  scale?: number;
  overlay?: ReactNode;
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

      {/* ✅ overlay inside the image card */}
      {overlay ?? null}

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

            // ✅ “4th card (uAssistant)” detector:
            const isAssistantCard =
              idx === 3 ||
              it.id.toLowerCase().includes("assistant") ||
              it.title.toLowerCase().includes("assistant");

            const imageBlock = (
              <Grid key={`${it.id}-img`} size={{ xs: 12, md: 6 }} sx={{ p: 0 }}>
                <Box sx={{ height: { xs: 360, sm: 420, md: 520 } }}>
                  <ImageCell
                    image={it.image}
                    imageAlt={it.imageAlt ?? ""}
                    fit={isLast ? "cover" : "contain"}
                    scale={isLast ? 1 : 0.75}
                    overlay={isAssistantCard ? <AssistantConversationOverlay /> : undefined}
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
