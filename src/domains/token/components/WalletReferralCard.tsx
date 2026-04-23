"use client";

import { useMemo, useState } from "react";
import { Box, Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import XIcon from "@mui/icons-material/X";
import TelegramIcon from "@mui/icons-material/Telegram";

import theme from "@/theme/theme";

interface WalletReferralCardProps {
  address: string;
}

function truncate(addr: string): string {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export default function WalletReferralCard({ address }: WalletReferralCardProps) {
  const [copied, setCopied] = useState(false);

  const referralUrl = useMemo(() => {
    if (typeof window === "undefined") return `/?ref=${address.toLowerCase()}`;
    return `${window.location.origin}/?ref=${address.toLowerCase()}`;
  }, [address]);

  const shareMessage = "Join me on Urano Ecosystem — on-chain tokenization powered by Arbitrum.";

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // fall through to legacy path
    }
    if (typeof document === "undefined") return false;
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  };

  const handleCopy = () => {
    void copyToClipboard(referralUrl).then((ok) => {
      if (!ok) return;
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const xUrl = `https://x.com/intent/post?text=${encodeURIComponent(`${shareMessage} ${referralUrl}`)}`;
  const tgUrl = "https://t.me/UranoEcosystem";

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        borderRadius: 3,
        p: "1px",
        background: theme.palette.uranoGradient,
        boxShadow: "0 18px 48px rgba(109,231,194,0.12)",
      }}
    >
      <Box
        sx={{
          borderRadius: 3,
          p: { xs: 2.5, md: 3 },
          background:
            "radial-gradient(120% 120% at 0% 0%, rgba(109,231,194,0.08) 0%, rgba(21,21,21,0.95) 55%), #131313",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
          <Stack gap={0.25}>
            <Typography
              className="conthrax"
              sx={{
                fontSize: { xs: 14, md: 15 },
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              Your Referral
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 20, md: 22 },
                fontWeight: 700,
                background: theme.palette.uranoGradient,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Share & earn together
            </Typography>
          </Stack>
          <Box
            sx={{
              px: 1.25,
              py: 0.5,
              borderRadius: 999,
              border: "1px solid rgba(109,231,194,0.45)",
              background: "rgba(109,231,194,0.08)",
            }}
          >
            <Typography sx={{ fontSize: 12, fontFamily: "monospace", color: "#6DE7C2" }}>
              {truncate(address)}
            </Typography>
          </Box>
        </Stack>

        <Typography sx={{ fontSize: { xs: 13, md: 14 }, color: "rgba(255,255,255,0.65)", lineHeight: 1.55 }}>
          Your link is tied to this wallet — anyone who buys $URANO through it is credited to you. Copy it and send to a friend.
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            p: 1.25,
            borderRadius: 2,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          <Typography
            sx={{
              flex: 1,
              fontFamily: "monospace",
              fontSize: { xs: 12.5, md: 13.5 },
              color: "#6DE7C2",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {referralUrl}
          </Typography>
          <Tooltip title={copied ? "Copied!" : "Copy"} placement="top">
            <IconButton
              size="small"
              onClick={handleCopy}
              sx={{
                color: copied ? "#6DE7C2" : "rgba(255,255,255,0.55)",
                "&:hover": { color: "#6DE7C2", background: "rgba(109,231,194,0.08)" },
                transition: "color 0.2s",
              }}
            >
              {copied ? <CheckRoundedIcon sx={{ fontSize: 18 }} /> : <ContentCopyRoundedIcon sx={{ fontSize: 18 }} />}
            </IconButton>
          </Tooltip>
        </Box>

        <Stack direction="row" gap={1} flexWrap="wrap">
          <Button
            onClick={handleCopy}
            startIcon={copied ? <CheckRoundedIcon /> : <ContentCopyRoundedIcon />}
            sx={{
              flex: "1 1 140px",
              background: theme.palette.uranoGradient,
              color: "#000",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 2,
              py: 1,
              "&:hover": { background: theme.palette.uranoGradient, opacity: 0.92 },
            }}
          >
            {copied ? "Copied!" : "Copy link"}
          </Button>
          <Button
            component="a"
            href={xUrl}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<XIcon sx={{ fontSize: 16 }} />}
            sx={{
              flex: "0 1 auto",
              color: "#fff",
              borderRadius: 2,
              textTransform: "none",
              border: "1px solid rgba(255,255,255,0.14)",
              px: 2,
              "&:hover": { borderColor: "rgba(109,231,194,0.55)", background: "rgba(109,231,194,0.06)" },
            }}
          >
            Post
          </Button>
          <Button
            component="a"
            href={tgUrl}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<TelegramIcon sx={{ fontSize: 18 }} />}
            sx={{
              flex: "0 1 auto",
              color: "#fff",
              borderRadius: 2,
              textTransform: "none",
              border: "1px solid rgba(255,255,255,0.14)",
              px: 2,
              "&:hover": { borderColor: "rgba(109,231,194,0.55)", background: "rgba(109,231,194,0.06)" },
            }}
          >
            Telegram
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
