"use client";

import type { ReactElement } from "react";
import { useMemo, useState } from "react";
import {
  Box,
  Collapse,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

import theme from "@/theme/theme";

export type FaqItem = Readonly<{
  id: string;
  question: string;
  answer: string;
}>;

export type FaqSectionProps = Readonly<{
  title?: string;
  items: FaqItem[];
  defaultOpenId?: string;
}>;

function FaqCard({
  item,
  open,
  onToggle,
}: {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
}): ReactElement {
  const headerMinH = { xs: 96, md: 110 };

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 2.5,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.10)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        boxShadow: "0px 18px 60px rgba(0,0,0,0.35)",
      }}
    >
      <Box
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onToggle();
        }}
        sx={{
          cursor: "pointer",
          px: { xs: 2.25, md: 3 },
          minHeight: headerMinH,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          outline: "none",
          userSelect: "none",
        }}
      >
        <Typography
          className="conthrax"
          sx={{
            fontSize: { xs: 18, md: 22 },
            lineHeight: 1.2,
            letterSpacing: "0.02em",
            color: theme.palette.uranoGreen1.main,

            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
          }}
        >
          {item.question}
        </Typography>

        <IconButton
          aria-label={open ? "Collapse" : "Expand"}
          disableRipple
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          sx={{
            color: "rgba(255,255,255,0.85)",
            borderRadius: 2,
            width: 44,
            height: 44,
            backgroundColor: "transparent",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.06)" },
            flex: "0 0 auto",
          }}
        >
          <ExpandMoreRoundedIcon
            sx={{
              fontSize: 34,
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 180ms ease",
            }}
          />
        </IconButton>
      </Box>

      <Collapse in={open} timeout={200} unmountOnExit>
        <Box
          sx={{
            px: { xs: 2.25, md: 3 },
            pb: { xs: 2.25, md: 2.6 },
            mt: -1,
          }}
        >
          <Typography
            sx={{
              color: "rgba(255,255,255,0.72)",
              fontSize: { xs: 13.5, md: 14.5 },
              lineHeight: 1.65,
              maxWidth: 760,
            }}
          >
            {item.answer}
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
}

export default function FaqSection({
  title = "FAQ",
  items,
  defaultOpenId,
}: FaqSectionProps): ReactElement {
  const firstId = items[0]?.id;
  const initial = defaultOpenId ?? firstId ?? "";
  const [openId, setOpenId] = useState<string>(initial);

  const list = useMemo(() => items, [items]);

  return (
    <Box component="section" sx={{ width: "100%", pt: { xs: 7, md: 9 } }}>
      <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 14 } }}>
        <Typography
          className="conthrax"
          sx={{
            textAlign: "center",
            fontSize: { xs: 30, md: 44 },
            letterSpacing: "0.08em",
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

        <Stack
          spacing={{ xs: 2.5, md: 3 }}
          sx={{
            width: "100%",
            maxWidth: 980, // keeps it looking premium on large screens
            mx: "auto",
          }}
        >
          {list.map((it) => (
            <FaqCard
              key={it.id}
              item={it}
              open={openId === it.id}
              onToggle={() => setOpenId((prev) => (prev === it.id ? "" : it.id))}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
