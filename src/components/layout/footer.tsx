"use client";

import type { ReactElement } from "react";
import NextLink from "next/link";
import Image, { type StaticImageData } from "next/image";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import theme from "@/theme/theme";

import { Sms } from "iconsax-reactjs";
import { RiTelegram2Fill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";

type FooterLink = Readonly<{ label: string; href: string }>;
type FooterColumn = Readonly<{ title: string; links: readonly FooterLink[] }>;

export type UranoFooterProps = Readonly<{
  logoImage: StaticImageData | string;
  arbitrumImage: StaticImageData | string;
}>;

function FooterColumnList({
  col,
  allowWrapLinks = false,
}: {
  col: FooterColumn;
  allowWrapLinks?: boolean;
}): ReactElement {
  return (
    <Stack spacing={1.6} sx={{ minWidth: 0 }}>
      <Typography
        sx={{
          color: "#EDEDED",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          fontSize: 13,
          whiteSpace: "nowrap",
          px: 1.5,
        }}
      >
        {col.title}
      </Typography>

      <Stack spacing={1.15} sx={{ minWidth: 0 }}>
        {col.links.map((l) => (
          <MuiLink
            key={l.label}
            component={NextLink}
            href={l.href}
            underline="none"
            sx={{
              pl: 1.5,
              pr: 2,
              py: 1,
              display: "block",
              minWidth: 0,
              width: "fit-content",
              color: "rgba(255,255,255,0.55)",
              fontSize: 16,
              borderRadius: 2,
              lineHeight: 1.25,
              whiteSpace: allowWrapLinks ? "normal" : "nowrap",
              overflow: "visible",
              textOverflow: "clip",

              "&:hover": {
                color: "rgba(255,255,255,0.85)",
                backgroundColor: "#1A1A1A",
                "& .footer-link-text": {
                    background: theme.palette.uranoGradient,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                },
              },
            }}
          >
            <Typography className="footer-link-text" sx={{ fontSize: 16 }}>
              {l.label}
            </Typography>
          </MuiLink>
        ))}
      </Stack>
    </Stack>
  );
}

export default function UranoFooter({
  logoImage,
  arbitrumImage,
}: UranoFooterProps): ReactElement {
  const columns: readonly FooterColumn[] = [
    {
      title: "PRODUCTS",
      links: [
        { label: "uApp", href: "/uapp" },
        { label: "uShares", href: "/ushares" },
        { label: "uAssistant", href: "/uassistant" },
        { label: "uStation", href: "/ustation" },
      ],
    },
    {
      title: "LEARN",
      links: [
        { label: "Docs", href: "/docs" },
        { label: "FAQ", href: "/faq" },
        { label: "Github", href: "/github" },
        { label: "Audit", href: "/audit" },
        { label: "uPaper", href: "/upaper" },
      ],
    },
    {
      title: "COMMUNITY",
      links: [
        { label: "$URANO", href: "/urano" },
        { label: "Airdrop", href: "/airdrop" },
      ],
    },
    {
      title: "LEGAL",
      links: [
        { label: "Terms and Conditions", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Cookie Policy", href: "/cookies" },
      ],
    },
  ];

  const surfaceBtnSx = {
    height: 44,
    borderRadius: 2,
    textTransform: "none",
    fontWeight: 500,
    backgroundColor: "#2A2A2A",
    color: "#EDEDED",
    boxShadow: "none",
    "&:hover": { backgroundColor: "#343434", boxShadow: "none" },
  } as const;

  const hoverGradient = {
    background: "linear-gradient(90deg, #5EBBC3 0%, #6DE7C2 100%)",
    color: "#0E0E0E",
    "& .icon": {
      filter: "invert(1)",
    },
  } as const;

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        width: "100vw",
        ml: "calc(50% - 50vw)",
        backgroundColor: "#141414",
        overflowX: "clip",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: { xs: 120, md: 20 },
          transform: "translateX(-50%)",
          width: "100%",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        <Typography
          aria-hidden
          className="conthrax"
          sx={{
            textAlign: "center",
            fontSize: { xs: 160, md: "15.52425rem" },
            fontWeight: 800,
            letterSpacing: "0.08em",
            lineHeight: "120%",
            background:
              "linear-gradient(180deg, #262626 0%, rgba(20, 20, 20, 0) 77%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            whiteSpace: "nowrap",
          }}
        >
          URANO
        </Typography>
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          px: { xs: 3, md: 16 },
          pt: { xs: 10, md: 12 },
          pb: { xs: 6, md: 7 },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="flex-start"
          spacing={{ xs: 5, md: 6 }}
          sx={{ mt: 16, mb: 4, minWidth: 0, width: "100%" }}
        >
          <Stack
            spacing={0}
            sx={{
              minWidth: 0,
              flex: { md: "0 0 260px" },
              width: { xs: "100%", md: 260 },
            }}
          >
            <Box sx={{ position: "relative", width: "100%", height: 84 }}>
              <Image
                src={logoImage}
                alt="Urano"
                fill
                sizes="260px"
                style={{ objectFit: "contain", objectPosition: "left top" }}
              />
            </Box>

            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{ flexWrap: "nowrap" }}
            >
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: 16,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                Powered by
              </Typography>

              <Box
                sx={{
                  position: "relative",
                  width: 140,
                  height: 32,
                  flexShrink: 0,
                }}
              >
                <Image
                  src={arbitrumImage}
                  alt="Arbitrum"
                  fill
                  sizes="140px"
                  style={{ objectFit: "contain", objectPosition: "left center" }}
                />
              </Box>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            useFlexGap
            sx={{
              flex: { md: "1 1 auto" },
              minWidth: 0,
              pt: { md: 2.5 },
              flexWrap: { xs: "wrap", md: "nowrap" },
              justifyContent: "center",
              alignItems: "flex-start",
              gap: { xs: 4, md: 0 },
            }}
          >
            {columns.map((c) => {
              const isLegal = c.title === "LEGAL";

              return (
                <Box
                  key={c.title}
                  sx={{
                    flex: {
                      xs: "1 1 45%",
                      md: "0 0 auto",
                    },
                    width: {
                      xs: "45%",
                      md: isLegal ? 220 : 170,
                    },
                    minWidth: { xs: "45%", md: isLegal ? 220 : 100 },
                    maxWidth: { md: isLegal ? 240 : 160 },
                  }}
                >
                  <FooterColumnList col={c} allowWrapLinks={isLegal} />
                </Box>
              );
            })}
          </Stack>

          <Box
            sx={{
              pt: { md: 2.5 },
              flex: { md: "0 0 auto" },
              width: { xs: "100%", md: "fit-content" },
              ml: { md: "auto" },
            }}
          >
            <Stack
              spacing={2}
              sx={{
                width: { xs: "100%", md: "fit-content" },
                alignItems: { xs: "stretch", md: "flex-end" },
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  gap: 1.5,
                  alignItems: "center",
                  justifyContent: "flex-end",
                  width: "fit-content",
                  maxWidth: "100%",
                }}
              >
                <IconButton
                  aria-label="X"
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    backgroundColor: "#2A2A2A",
                    "&:hover": hoverGradient,
                  }}
                >
                  <FaXTwitter className="icon" size={24} color="#EDEDED" />
                </IconButton>

                <IconButton
                  aria-label="Telegram"
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    backgroundColor: "#2A2A2A",
                    "&:hover": hoverGradient,
                  }}
                >
                  <RiTelegram2Fill className="icon" size={24} color="#EDEDED" />
                </IconButton>

                <Button
                  variant="contained"
                  sx={{
                    ...surfaceBtnSx,
                    px: 2.25,
                    minWidth: 170,
                    whiteSpace: "nowrap",
                    "&:hover": hoverGradient,
                  }}
                >
                  Compliance Note
                </Button>
              </Box>

              <Button
                variant="contained"
                startIcon={<Sms className="icon" size={24} color="#EDEDED" />}
                sx={{
                  ...surfaceBtnSx,
                  width: "100%",
                  minWidth: "unset",
                  justifyContent: "center",
                  "&:hover": hoverGradient,
                }}
              >
                Contact us
              </Button>
            </Stack>
          </Box>
        </Stack>

        <Box sx={{ flex: 1 }} />

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

        <Box sx={{ pt: { xs: 4, md: 5 } }}>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 12.5,
              lineHeight: 1.6,
              textAlign: "center",
              maxWidth: 980,
              mx: "auto",
            }}
          >
            The content of this page is provided for informational purposes only and does not constitute an offer or
            solicitation to sell, or a recommendation to purchase, any financial instrument, security, or digital asset
            within the meaning of applicable laws and regulations, including Regulation (EU) 2023/1114 on Markets in
            Crypto-assets (MiCA).{" "}
            <Box
              component="span"
              sx={{
                color: "rgba(255,255,255,0.75)",
                cursor: "pointer",
                "&:hover": { color: "rgba(255,255,255,0.9)" },
              }}
            >
              Show more
            </Box>
          </Typography>
        </Box>

        <Divider
          sx={{
            mt: { xs: 4, md: 5 },
            borderColor: "rgba(255,255,255,0.08)",
          }}
        />

        <Typography
          sx={{
            mt: { xs: 3, md: 3 },
            color: "rgba(255,255,255,0.45)",
            fontSize: 13,
            textAlign: "center",
          }}
        >
          Urano Ecosystem Sp. Z o.o. © 2025 Urano Ecosystem, All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
