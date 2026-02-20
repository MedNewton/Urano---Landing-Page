"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

import bgdark from "@/assets/images/bgdark.webp";
import logo from "@/assets/images/logos/logo-turquoise-1.webp";

const TOKEN_ADDRESS = "0x5AF01e4d2bEFf2b01A8F3992e875EDd8d67469D2";
const PRESALE_URL = "https://www.presale.uranoecosystem.com";
const LAUNCH_DATE = "March 20, 2025";

export default function LaunchPage() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    void navigator.clipboard.writeText(TOKEN_ADDRESS).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Image
          src={bgdark}
          alt=""
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.7) 100%)",
          }}
        />
      </Box>

      {/* Content */}
      <Stack
        spacing={{ xs: 5, md: 6 }}
        alignItems="center"
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 680,
          px: { xs: 3, md: 4 },
          py: { xs: 14, md: 16 },
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <Box sx={{ position: "relative", width: { xs: 160, md: 210 }, height: { xs: 52, md: 68 } }}>
          <Image
            src={logo}
            alt="Urano"
            fill
            priority
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        </Box>

        {/* Headline */}
        <Stack spacing={2} alignItems="center">
          <Chip
            label="Token Generation Event"
            size="small"
            sx={{
              background: "linear-gradient(90deg, rgba(94,187,195,0.15) 0%, rgba(109,231,194,0.15) 100%)",
              border: "1px solid rgba(94,187,195,0.35)",
              color: "#6DE7C2",
              fontWeight: 600,
              letterSpacing: "0.06em",
              fontSize: 11,
              textTransform: "uppercase",
              height: 26,
            }}
          />

          <Typography
            className="conthrax"
            sx={{
              fontSize: { xs: 32, md: 48 },
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "0.03em",
              background: "linear-gradient(90deg, #5EBBC3 0%, #6DE7C2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            $URANO
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 15, md: 17 },
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.01em",
            }}
          >
            Listing on{" "}
            <Box component="span" sx={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>
              {LAUNCH_DATE}
            </Box>
          </Typography>
        </Stack>

        {/* Token Address */}
        <Box
          sx={{
            width: "100%",
            borderRadius: 3,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(20,20,20,0.7)",
            backdropFilter: "blur(12px)",
            px: { xs: 2.5, md: 3 },
            py: 2.5,
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              mb: 1.5,
            }}
          >
            Contract Address · Arbitrum
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            <Typography
              sx={{
                fontSize: { xs: 11, sm: 13, md: 14 },
                fontFamily: "monospace",
                color: "rgba(255,255,255,0.85)",
                wordBreak: "break-all",
                textAlign: "center",
              }}
            >
              {TOKEN_ADDRESS}
            </Typography>

            <Tooltip title={copied ? "Copied!" : "Copy address"} placement="top">
              <IconButton
                size="small"
                onClick={handleCopy}
                sx={{
                  flexShrink: 0,
                  color: copied ? "#6DE7C2" : "rgba(255,255,255,0.45)",
                  "&:hover": { color: "#6DE7C2", background: "rgba(109,231,194,0.08)" },
                  transition: "color 0.2s",
                }}
              >
                {copied ? (
                  <CheckRoundedIcon sx={{ fontSize: 18 }} />
                ) : (
                  <ContentCopyRoundedIcon sx={{ fontSize: 18 }} />
                )}
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        {/* Presale CTA */}
        <Stack spacing={2} alignItems="center" sx={{ width: "100%" }}>
          <Button
            component="a"
            href={PRESALE_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            size="large"
            endIcon={<OpenInNewRoundedIcon />}
            sx={{
              background: "linear-gradient(90deg, #5EBBC3 0%, #6DE7C2 100%)",
              color: "#0A0A0A",
              fontWeight: 700,
              fontSize: { xs: 15, md: 16 },
              letterSpacing: "0.02em",
              px: 5,
              py: 1.75,
              borderRadius: 2.5,
              textTransform: "none",
              boxShadow: "0 0 32px rgba(94,187,195,0.25)",
              "&:hover": {
                background: "linear-gradient(90deg, #6DE7C2 0%, #5EBBC3 100%)",
                boxShadow: "0 0 48px rgba(94,187,195,0.4)",
              },
            }}
          >
            Join the Presale
          </Button>

          <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
            Pre-TGE investment opportunity — invest before listing
          </Typography>
        </Stack>

        {/* Disclaimer */}
        <Box sx={{ width: "100%" }}>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", mb: 3.5 }} />

          <Box
            sx={{
              borderRadius: 2.5,
              border: "1px solid rgba(255,180,0,0.18)",
              background: "rgba(255,160,0,0.05)",
              px: { xs: 2.5, md: 3 },
              py: 2.5,
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,180,0,0.7)",
                mb: 1.25,
              }}
            >
              Disclaimer
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 12.5, md: 13 },
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.7,
                textAlign: "left",
              }}
            >
              Please note that the claim of $URANO tokens is not yet enabled. Do not click on any
              external links outside the official platform. The official token listing details
              (including timing and trading venue) will be communicated at a later stage through
              Urano&apos;s verified channels. Always ensure that you interact exclusively with
              official communications and interfaces.
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
