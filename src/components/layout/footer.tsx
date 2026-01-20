"use client";

import type { ReactElement } from "react";
import { useMemo, useState } from "react";
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

function ComingSoonPill(): ReactElement {
  return (
    <Box
      component="span"
      sx={{
        px: 1.1,
        py: 0.45,
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        lineHeight: 1,
        color: "rgba(255,255,255,0.78)",
        border: "1px solid rgba(255,255,255,0.16)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
        whiteSpace: "nowrap",
        flex: "0 0 auto",
      }}
    >
      Coming soon
    </Box>
  );
}

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
          fontSize: { xs: 10, md: 13 },
          whiteSpace: "nowrap",
          px: 1.5,
        }}
      >
        {col.title}
      </Typography>

      <Stack spacing={1.15} sx={{ minWidth: 0 }}>
        {col.links.map((l) => {
          const isAirdrop = l.label.toLowerCase() === "airdrop";

          return (
            <MuiLink
              key={l.label}
              component={NextLink}
              href={l.href}
              underline="none"
              onClick={(e) => {
                if (isAirdrop) e.preventDefault();
              }}
              sx={{
                pl: 1.5,
                pr: 2,
                py: 1,
                display: "block",
                minWidth: 0,
                maxWidth: "100%",
                width: "100%",
                color: "rgba(255,255,255,0.55)",
                fontSize: 16,
                borderRadius: 2,
                lineHeight: 1.25,
                whiteSpace: allowWrapLinks ? "normal" : "nowrap",
                overflow: "hidden",
                textOverflow: allowWrapLinks ? "clip" : "ellipsis",

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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 0.8,
                  minWidth: 0,
                }}
              >
                <Typography
                  className="footer-link-text"
                  sx={{
                    fontSize: 16,
                    minWidth: 0,
                    maxWidth: "100%",
                    overflow: "hidden",
                    textOverflow: allowWrapLinks ? "clip" : "ellipsis",
                    whiteSpace: allowWrapLinks ? "normal" : "nowrap",
                  }}
                >
                  {l.label}
                </Typography>

                {isAirdrop ? <ComingSoonPill /> : null}
              </Box>
            </MuiLink>
          );
        })}
      </Stack>
    </Stack>
  );
}

function MobileFooterColumn({
  title,
  links,
  allowWrapLinks = false,
  twoColLinks = false,
}: {
  title: string;
  links: readonly FooterLink[];
  allowWrapLinks?: boolean;
  twoColLinks?: boolean;
}): ReactElement {
  return (
    <Stack spacing={2} sx={{ minWidth: 0 }}>
      <Typography
        sx={{
          color: "#EDEDED",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          fontSize: 16,
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </Typography>

      <Box
        sx={
          twoColLinks
            ? {
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: 4,
                rowGap: 3.25,
                minWidth: 0,
              }
            : {
                display: "flex",
                flexDirection: "column",
                gap: 3.25,
                minWidth: 0,
              }
        }
      >
        {links.map((l, idx) => {
          const isAirdrop = l.label.toLowerCase() === "airdrop";
          const shouldSpan =
            twoColLinks && idx === links.length - 1 && links.length % 2 === 1;

          return (
            <MuiLink
              key={l.label}
              component={NextLink}
              href={l.href}
              underline="none"
              onClick={(e) => {
                if (isAirdrop) e.preventDefault();
              }}
              sx={{
                color: "rgba(255,255,255,0.55)",
                fontSize: 16,
                lineHeight: 1.15,
                minWidth: 0,
                width: "fit-content",
                whiteSpace: allowWrapLinks ? "normal" : "nowrap",
                ...(shouldSpan ? { gridColumn: "1 / -1" } : null),
                "&:hover": {
                  "& .mobile-footer-link-text": {
                    background: theme.palette.uranoGradient,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  },
                },
              }}
            >
              <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
                <Typography className="mobile-footer-link-text" sx={{ fontSize: 16 }}>
                  {l.label}
                </Typography>
                {isAirdrop ? <ComingSoonPill /> : null}
              </Box>
            </MuiLink>
          );
        })}
      </Box>
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
        { label: "uApp", href: "https://docs.uranoecosystem.com/ecosystem/uapp" },
        { label: "uShares", href: "https://docs.uranoecosystem.com/ecosystem/ushares" },
        { label: "uAssistant", href: "https://docs.uranoecosystem.com/ecosystem/uassistant" },
        { label: "uStation", href: "https://docs.uranoecosystem.com/ecosystem/ustation" },
      ],
    },
    {
      title: "LEARN",
      links: [
        { label: "Docs", href: "https://docs.uranoecosystem.com/" },
        { label: "FAQ", href: "https://docs.uranoecosystem.com/more/faqs" },
        { label: "Github", href: "https://github.com/uranoecosystem2024" },
        { label: "Audit", href: "https://docs.uranoecosystem.com/more/audit" },
        { label: "uPaper", href: "https://docs.uranoecosystem.com/more/upaper" },
      ],
    },
    {
      title: "COMMUNITY",
      links: [
        { label: "$URANO", href: "https://docs.uranoecosystem.com/ecosystem/uranotoken" },
        { label: "Airdrop", href: "/airdrop" },
      ],
    },
    {
      title: "LEGAL",
      links: [
        { label: "Terms and Conditions", href: "/terms-conditions" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Cookie Policy", href: "/cookie-policy" },
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
    "& .icon": { filter: "invert(1)" },
  } as const;

  const mobileIconBtn = {
    width: 56,
    height: 56,
    borderRadius: "0.4375rem",
    backgroundColor: "#2A2A2A",
    "&:hover": hoverGradient,
  } as const;

  const mobilePillBtn = {
    height: 56,
    borderRadius: "0.4375rem",
    textTransform: "none",
    fontWeight: 500,
    backgroundColor: "#2A2A2A",
    color: "#EDEDED",
    boxShadow: "none",
    "&:hover": hoverGradient,
  } as const;

  const fullDisclaimer =
    "The content of this page is provided for informational purposes only and does not constitute an offer or solicitation to sell, or a recommendation to purchase, any financial instrument, security, or digital asset within the meaning of applicable laws and regulations, including Regulation (EU) 2023/1114 on Markets in Crypto-assets (MiCA).";

  const previewDisclaimer = useMemo(() => {
    const maxChars = 180;
    if (fullDisclaimer.length <= maxChars) return fullDisclaimer;
    const slice = fullDisclaimer.slice(0, maxChars);
    const lastSpace = slice.lastIndexOf(" ");
    return `${slice.slice(0, Math.max(0, lastSpace))}…`;
  }, [fullDisclaimer]);

  const [showMore, setShowMore] = useState(false);

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        width: "100vw",
        ml: "calc(50% - 50vw)",
        backgroundColor: "#141414",
        overflowX: "clip",
        minHeight: { xs: "100vh", md: "80vh" },
        mt: { xs: 10, md: 0 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: { xs: 10, md: 20 },
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
            fontSize: { xs: 80, md: "15.52425rem" },
            fontWeight: 800,
            letterSpacing: "0.08em",
            lineHeight: "120%",
            background: "linear-gradient(180deg, #262626 0%, rgba(20, 20, 20, 0) 77%)",
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
          minHeight: { xs: "100vh", md: "80vh" },
          display: "flex",
          flexDirection: "column",
          px: { xs: 3, md: 16 },
          pt: { xs: 0, md: 12 },
          pb: { xs: 6, md: 10 },
        }}
      >
        {/* MOBILE */}
        <Box width="100%" sx={{ display: { xs: "block", md: "none" }, mt: 4 }}>
          <Stack spacing={3} direction={"row"} alignItems="end">
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: 320,
                height: 120,
                display: { xs: "block", md: "none" },
              }}
            >
              <MuiLink href="/" target="_blank" rel="noopener noreferrer" underline="none">
                <Image
                  src={logoImage}
                  alt="Urano"
                  fill
                  sizes="50vw"
                  style={{ objectFit: "contain", objectPosition: "center top", marginTop: 8 }}
                />
              </MuiLink>
            </Box>

            <Stack
              width="100%"
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="center"
              sx={{
                flexWrap: "nowrap",
                transform: "translateY(-50%)",
              }}
            >
              <Box sx={{ position: "relative", width: 160, height: 56, flexShrink: 0 }}>
                <MuiLink href="https://arbitrum.io/" target="_blank" rel="noopener noreferrer" underline="none">
                  <Image
                    src={arbitrumImage}
                    alt="Arbitrum"
                    fill
                    sizes="100%"
                    style={{ objectFit: "contain", objectPosition: "left center" }}
                  />
                </MuiLink>
              </Box>
            </Stack>
          </Stack>

          <Stack spacing={2.5} sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", width: "100%" }}>
              <IconButton aria-label="X" sx={mobileIconBtn}>
                <MuiLink href="https://x.com/uranoecosystem" target="_blank" rel="noopener noreferrer" underline="none">
                  <FaXTwitter className="icon" size={26} color="#EDEDED" style={{ marginTop: 5 }} />
                </MuiLink>
              </IconButton>

              <IconButton aria-label="Telegram" sx={mobileIconBtn}>
                <MuiLink href="https://t.me/uranoecosystem" target="_blank" rel="noopener noreferrer" underline="none">
                  <RiTelegram2Fill className="icon" size={28} color="#EDEDED" style={{ marginTop: 5 }} />
                </MuiLink>
              </IconButton>

              <Button
                component="a"
                href="https://docs.uranoecosystem.com/the-legal-structure-of-urano"
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                sx={{
                  ...mobilePillBtn,
                  flex: "1 1 auto",
                  minWidth: 0,
                  justifyContent: "center",
                  fontSize: 18,
                  whiteSpace: "nowrap",
                }}
              >
                Compliance Note
              </Button>
            </Box>

            <Button
              component="a"
              href="mailto:info@uranoecosystem.com"
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<Sms className="icon" size={26} color="#EDEDED" />}
              sx={{
                ...mobilePillBtn,
                gap: 0.5,
                width: "100%",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              Contact us
            </Button>
          </Stack>

          <Box
            sx={{
              mt: 6,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: 4,
              rowGap: 6,
            }}
          >
            <MobileFooterColumn title="PRODUCTS" links={columns[0]?.links ?? []} />
            <MobileFooterColumn
              title="LEARN"
              links={[
                { label: "Docs", href: "https://docs.uranoecosystem.com/" },
                { label: "Audit", href: "https://docs.uranoecosystem.com/more/audit" },
                { label: "FAQ", href: "https://docs.uranoecosystem.com/more/faqs" },
                { label: "uPaper", href: "https://docs.uranoecosystem.com/more/upaper" },
                { label: "Github", href: "https://github.com/uranoecosystem2024" },
              ]}
              twoColLinks
            />
            <MobileFooterColumn title="COMMUNITY" links={columns[2]?.links ?? []} />
            <MobileFooterColumn title="LEGAL" links={columns[3]?.links ?? []} allowWrapLinks />
          </Box>

          <Box sx={{ mt: 7 }}>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.45)",
                fontSize: 15,
                lineHeight: 1.6,
                textAlign: "left",
              }}
            >
              {showMore ? fullDisclaimer : previewDisclaimer}{" "}
              <Box
                component="button"
                type="button"
                onClick={() => setShowMore((v) => !v)}
                sx={{
                  border: "none",
                  background: "transparent",
                  p: 0,
                  m: 0,
                  color: "rgba(255,255,255,0.75)",
                  cursor: "pointer",
                  font: "inherit",
                  "&:hover": { color: "rgba(255,255,255,0.9)" },
                }}
              >
                {showMore ? "Show less" : "Show more"}
              </Box>
            </Typography>

            <Divider sx={{ mt: 4, borderColor: "rgba(255,255,255,0.08)" }} />

            <Typography
              sx={{
                mt: 3,
                color: "rgba(255,255,255,0.45)",
                fontSize: 15,
                textAlign: "center",
              }}
            >
              Urano Ecosystem Sp. z o.o. © 2026
              <br />
              Urano Ecosystem. All rights reserved.
            </Typography>
          </Box>
        </Box>

        {/* DESKTOP */}
        <Box sx={{ display: { xs: "none", md: "flex" }, width: "100%", flexDirection: "column", minWidth: 0 }}>
          {/* ===========================
              DESKTOP (md+)
              Logos | 4 Columns in a row | Buttons
             =========================== */}
          <Box sx={{ display: "block", width: "100%", minWidth: 0 }}>
            <Stack
              direction="row"
              alignItems="flex-start"
              spacing={0}
              sx={{ mt: 16, mb: 0, minWidth: 0, width: "100%" }}
            >
              {/* LEFT LOGO BLOCK */}
              <Stack
                spacing={0}
                sx={{
                  minWidth: 0,
                  flex: "0 0 auto",
                  width: "fit-content",
                  marginTop: -2
                }}
              >
                <Box sx={{ position: "relative", width: { md: 200, lg: 260, xl: 320 }, height: 84, maxWidth: "100%" }}>
                  <MuiLink href="/" target="_blank" rel="noopener noreferrer" underline="none">
                    <Image
                      src={logoImage}
                      alt="Urano"
                      fill
                      sizes="(max-width: 1200px) 200px, (max-width: 1536px) 260px, 320px"
                      style={{ objectFit: "contain", objectPosition: "left top" }}
                    />
                  </MuiLink>
                </Box>

                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flexWrap: "nowrap" }}>
                  <Box sx={{ position: "relative", width: { md: 120, lg: 150, xl: 180 }, height: 36, flexShrink: 0 }}>
                    <MuiLink href="https://arbitrum.io/" target="_blank" rel="noopener noreferrer" underline="none">
                      <Image
                        src={arbitrumImage}
                        alt="Arbitrum"
                        fill
                        sizes="(max-width: 1200px) 120px, (max-width: 1536px) 150px, 180px"
                        style={{ objectFit: "contain", objectPosition: "left center", marginLeft: 14 }}
                      />
                    </MuiLink>
                  </Box>
                </Stack>
              </Stack>

              {/* COLUMNS - 4 columns in a row */}
              <Box
                sx={{
                  flex: "1 1 auto",
                  minWidth: 0,
                  pt: 2.5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: { md: 2, lg: 3, xl: 4 },
                }}
              >
                {columns.map((c) => {
                  const isLegal = c.title === "LEGAL";

                  return (
                    <Box
                      key={c.title}
                      sx={{
                        minWidth: 0,
                        width: isLegal
                          ? { md: 160, lg: 190, xl: 220 }
                          : { md: 120, lg: 150, xl: 170 },
                        maxWidth: isLegal
                          ? { md: 180, lg: 210, xl: 240 }
                          : { md: 140, lg: 170, xl: 200 },
                      }}
                    >
                      <FooterColumnList col={c} allowWrapLinks={isLegal} />
                    </Box>
                  );
                })}
              </Box>

              {/* RIGHT CTA CLUSTER */}
              <Box
                sx={{
                  pt: 2.5,
                  flex: "0 0 auto",
                  width: "fit-content",
                  ml: "auto",
                }}
              >
                <Stack spacing={{ md: 1.5, xl: 2 }} sx={{ width: "fit-content", alignItems: "flex-end" }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      gap: { md: 1, lg: 1.25, xl: 1.5 },
                      alignItems: "center",
                      justifyContent: "flex-end",
                      width: "fit-content",
                      maxWidth: "100%",
                    }}
                  >
                    <IconButton
                      aria-label="X"
                      sx={{
                        width: { md: 38, lg: 40, xl: 44 },
                        height: { md: 38, lg: 40, xl: 44 },
                        borderRadius: 2,
                        backgroundColor: "#2A2A2A",
                        "&:hover": hoverGradient,
                      }}
                    >
                      <MuiLink href="https://x.com/uranoecosystem" target="_blank" rel="noopener noreferrer" underline="none">
                        <FaXTwitter className="icon" size={22} color="#EDEDED" style={{ marginTop: 5 }} />
                      </MuiLink>
                    </IconButton>

                    <IconButton
                      aria-label="Telegram"
                      sx={{
                        width: { md: 38, lg: 40, xl: 44 },
                        height: { md: 38, lg: 40, xl: 44 },
                        borderRadius: 2,
                        backgroundColor: "#2A2A2A",
                        "&:hover": hoverGradient,
                      }}
                    >
                      <MuiLink href="https://t.me/uranoecosystem" target="_blank" rel="noopener noreferrer" underline="none">
                        <RiTelegram2Fill className="icon" size={22} color="#EDEDED" style={{ marginTop: 5 }} />
                      </MuiLink>
                    </IconButton>

                    <MuiLink
                      href="https://docs.uranoecosystem.com/the-legal-structure-of-urano"
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="none"
                      sx={{ display: "inline-block", minWidth: 0 }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          ...surfaceBtnSx,
                          px: { md: 1.5, lg: 2, xl: 2.25 },
                          minWidth: { md: 120, lg: 145, xl: 170 },
                          height: { md: 38, lg: 40, xl: 44 },
                          fontSize: { md: 13, lg: 14, xl: 14 },
                          whiteSpace: "nowrap",
                          "&:hover": hoverGradient,
                        }}
                      >
                        Compliance Note
                      </Button>
                    </MuiLink>
                  </Box>

                  <MuiLink
                    href="mailto:info@uranoecosystem.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="none"
                    sx={{ width: "100%" }}
                  >
                    <Button
                      variant="contained"
                      startIcon={<Sms className="icon" size={22} color="#EDEDED" />}
                      sx={{
                        ...surfaceBtnSx,
                        width: "100%",
                        minWidth: "unset",
                        height: { md: 38, lg: 40, xl: 44 },
                        fontSize: { md: 13, lg: 14, xl: 14 },
                        justifyContent: "center",
                        "&:hover": hoverGradient,
                      }}
                    >
                      Contact us
                    </Button>
                  </MuiLink>
                </Stack>
              </Box>
            </Stack>
          </Box>

          <Box sx={{ flex: 1 }} />

          <Divider sx={{ mt: 6, borderColor: "rgba(255,255,255,0.08)" }} />

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
              {fullDisclaimer}
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
            Urano Ecosystem Sp. z o.o. © 2026 Urano Ecosystem. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
