"use client";

import type { CSSProperties, ReactElement } from "react";
import { Box, Typography } from "@mui/material";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { keyframes } from "@emotion/react";

import theme from "@/theme/theme";

const arrowFly = keyframes`
  0%   { transform: translate(0px, 0px) scale(var(--arrowScale)); opacity: 1; }
  35%  { transform: translate(16px, -16px) scale(var(--arrowScale)); opacity: 0; }
  36%  { transform: translate(-16px, 16px) scale(var(--arrowScale)); opacity: 0; }
  60%  { transform: translate(0px, 0px) scale(var(--arrowScale)); opacity: 1; }
  100% { transform: translate(0px, 0px) scale(var(--arrowScale)); opacity: 1; }
`;

export type MobilePoweredByUranoItem = Readonly<{
  id: string;
  title: string;
  description: string;
}>;

export type MobilePoweredByUranoSectionProps = Readonly<{
  title?: string;
  items: MobilePoweredByUranoItem[]; // TL, TR, BL, BR
}>;

function PoweredCell({
  item,
  extraTopPad = 0,
}: {
  item?: MobilePoweredByUranoItem;
  extraTopPad?: number;
}): ReactElement {
  return (
    <Box
      sx={{
        height: "100%",
        minWidth: 0,
        borderRadius: 2,
        backgroundColor: "#151515",
        border: "1px solid rgba(86,86,86,0.3)",
        overflow: "hidden",

        p: 2,

        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 1,

        "@media (hover:hover)": {
          "&:hover .poweredArrow": {
            animation: `${arrowFly} 1500ms ease-in-out infinite`,
          },
        },
        "&:active .poweredArrow": {
          animation: `${arrowFly} 1500ms ease-in-out infinite`,
        },
      }}
    >
      <Box
        sx={{
          width: 22,
          height: 22,
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
          opacity: 0.9,
          mb: 2,
        }}
      >
        <NorthEastIcon
          className="poweredArrow"
          sx={{
            fontSize: 22,
            display: "block",
            transformOrigin: "center",
            transform: "translate(0px, 0px) scale(var(--arrowScale))",
            willChange: "transform, opacity",
            color: "#fff",
          }}
          style={{ ["--arrowScale" as keyof CSSProperties]: 1 }}
        />
      </Box>

      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 700,
          lineHeight: 1,
          background: theme.palette.uranoGradient,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          maxWidth: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {item?.title ?? ""}
      </Typography>

      <Typography
        sx={{
          fontSize: 13.25,
          lineHeight: 1.35,
          color: "rgba(255,255,255,0.70)",
          maxWidth: "100%",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 10,
          overflow: "hidden",
        }}
      >
        {item?.description ?? ""}
      </Typography>
    </Box>
  );
}

export default function MobilePoweredByUranoSection({
  title = "POWERED BY URANO",
  items,
}: MobilePoweredByUranoSectionProps): ReactElement {
  const a = items[0];
  const b = items[1];
  const c = items[2];
  const d = items[3];

  // If you still want the bottom row a bit lower, keep this.
  // Otherwise set to 0 to make all padding identical.
  const bottomRowExtraTopPadPx = 56;

  return (
    <Box component="section" id="powered-by-urano" sx={{ width: "100%", pt: 6, pb: 0 }}>
      <Typography
        className="conthrax"
        sx={{
          textAlign: "center",
          fontSize: 26,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          background: theme.palette.uranoGradient,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 3.5,
          px: 2.5,
        }}
      >
        {title}
      </Typography>

      <Box sx={{ px: 2, pt: 0.5 }}>
        <Box
          sx={{
            width: "100%",
            mx: "auto",
            maxWidth: 560,
          }}
        >
          <Box
            sx={{
              display: "grid",
              gap: 1,
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gridAutoRows: "1fr", // ✅ makes all rows the same height
              alignItems: "stretch",
            }}
          >
            <PoweredCell item={a} />
            <PoweredCell item={b} />
            <PoweredCell item={c} extraTopPad={bottomRowExtraTopPadPx} />
            <PoweredCell item={d} extraTopPad={bottomRowExtraTopPadPx} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
