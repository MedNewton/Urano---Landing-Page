"use client";

import type { ReactElement } from "react";
import Image, { type StaticImageData } from "next/image";
import { Box, Stack, Typography } from "@mui/material";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import poweredUranoCoin from "@/assets/images/poweredUranoCoin.webp";
import theme from "@/theme/theme";

export type PoweredByUranoItem = Readonly<{
  id: string;
  title: string;
  description: string;
  side: "left" | "right";
  bgImage: StaticImageData | string;
  hoverBgImage?: StaticImageData | string; // ✅ add this
}>;

export type PoweredByUranoSectionProps = Readonly<{
  title?: string;
  items: PoweredByUranoItem[];
}>;

function resolveSrc(img: StaticImageData | string): string {
  return typeof img === "string" ? img : img.src;
}

function PoweredCard({ item }: { item: PoweredByUranoItem }): ReactElement {
    const isRight = item.side === "right";
    const baseSrc = resolveSrc(item.bgImage);
    const hoverSrc = item.hoverBgImage ? resolveSrc(item.hoverBgImage) : null;
  
    return (
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: 6,
  
          // hover crossfade triggers
          "& .bgBase": {
            opacity: 1,
            transform: "scale(1)",
            transition: "opacity 260ms ease, transform 520ms ease",
          },
          "& .bgHover": {
            opacity: 0,
            transform: "scale(1.03)",
            transition: "opacity 260ms ease, transform 520ms ease",
          },
          "&:hover .bgBase": {
            opacity: hoverSrc ? 0 : 1,
            transform: hoverSrc ? "scale(1.02)" : "scale(1)",
          },
          "&:hover .bgHover": {
            opacity: hoverSrc ? 1 : 0,
            transform: "scale(1)",
          },
  
          // ✅ content filter on hover (only meaningful when hoverSrc exists)
          "& .contentWrap": {
            filter: "none",
            transition: "filter 260ms ease",
          },
          "&:hover .contentWrap": {
            filter: hoverSrc ? "brightness(0)" : "none",
          },
        }}
      >
        {/* Base background */}
        <Box className="bgBase" sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src={baseSrc}
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            priority={false}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              pointerEvents: "none",
              userSelect: "none",
            }}
          />
        </Box>
  
        {/* Hover background (crossfades in) */}
        {hoverSrc ? (
          <Box className="bgHover" sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <Image
              src={hoverSrc}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              priority={false}
              style={{
                objectFit: "cover",
                objectPosition: "center",
                pointerEvents: "none",
                userSelect: "none",
              }}
            />
          </Box>
        ) : null}
  
        {/* Content */}
        <Stack
          className="contentWrap"
          sx={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            px: { xs: 3, md: 5 },
            py: { xs: 3, md: 0 },
            justifyContent: "center",
            alignItems: isRight ? "flex-end" : "flex-start",
            textAlign: isRight ? "right" : "left",
            gap: 1.75,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: { xs: 18, md: 32 },
              left: isRight ? "auto" : { xs: 18, md: 36 },
              right: isRight ? { xs: 18, md: 32 } : "auto",
              color: "#fff",
              opacity: 0.9,
            }}
          >
            <NorthEastIcon sx={{ fontSize: 26 }} />
          </Box>
  
          <Typography
            sx={{
              mt: { xs: 3.5, md: 4 },
              fontSize: { xs: 26, md: "1.75rem" },
              fontWeight: 700,
              background: theme.palette.uranoGradient,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {item.title}
          </Typography>
  
          <Typography
            sx={{
              fontSize: { xs: 14.5, md: "1rem" },
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.70)",
              maxWidth: { xs: 250, md: 300, lg: 400, xl: 420 },
            }}
          >
            {item.description}
          </Typography>
        </Stack>
      </Box>
    );
  }
  

export default function PoweredByUranoSection({
  title = "POWERED BY URANO",
  items,
}: PoweredByUranoSectionProps): ReactElement {
  const [a, b, c, d] = items;

  return (
    <Box
      component="section"
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

      <Box sx={{ position: "relative", width: "100%" }}>
        <Box
          sx={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gridAutoRows: { xs: 280, sm: 320, md: 276, lg: 276, xl: 300 },
            gap: { xs: 2, md: 3 },
          }}
        >
          {a ? <PoweredCard item={a} /> : null}
          {b ? <PoweredCard item={b} /> : null}
          {c ? <PoweredCard item={c} /> : null}
          {d ? <PoweredCard item={d} /> : null}

          <Box
            aria-hidden
            sx={{
              display: { xs: "none", md: "block" },
              "@media (max-width: 1100px)": { display: "none" },
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: { md: 220, lg: 340 },
              height: { md: 220, lg: 340 },
              borderRadius: "999px",
              zIndex: 5,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            <Image src={poweredUranoCoin} alt="Powered by Urano" fill sizes="100%" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
