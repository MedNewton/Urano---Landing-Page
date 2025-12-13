"use client";

import { useEffect, useId, useRef, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import {
  Box,
  ButtonBase,
  Divider,
  Fade,
  Link,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import GitHubIcon from "@mui/icons-material/GitHub";

import {
  Monitor,
  Share,
  Triangle,
  I3Dcube,
  MessageText1,
  Notepad2,
  MessageQuestion,
  ShieldSearch,
  ClipboardText,
  Gift,
} from "iconsax-reactjs";

import { RiTelegram2Fill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";

import theme from "@/theme/theme";
import logo from "@/assets/images/logos/logo-turquoise-1.webp";
import rocketIcon from "@/assets/images/icons/rocket.svg?url";
import uranoIcon from "@/assets/images/icons/uranoIcon.svg?url";
import RocketButton from "../ui/rocketButton";

type MenuKey = "products" | "learn" | "community";

const GLASS_BG = "rgba(21, 21, 21, 0.75)";
const GLASS_BORDER = "1px solid rgba(85, 85, 85, 0.30)";
const GLASS_BLUR = "blur(14px)";

const CLOSE_DELAY_MS = 320;

function sanitizeSvgId(id: string): string {
  return id.replace(/[^a-zA-Z0-9\-_]/g, "");
}

function UranoGradientIcon({
  icon,
  size = 22,
}: {
  icon: React.ReactElement;
  size?: number;
}): React.ReactElement {
  const reactId = useId();
  const safe = sanitizeSvgId(reactId);
  const gradIdRef = useRef<string>(`urano-grad-${safe}`);
  const hostRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const raf = window.requestAnimationFrame(() => {
      const svg = host.querySelector("svg");
      if (!svg) return;

      const ns = "http://www.w3.org/2000/svg";
      const gradId = gradIdRef.current;

      let defs = svg.querySelector("defs");
      if (!defs) {
        defs = document.createElementNS(ns, "defs");
        svg.insertBefore(defs, svg.firstChild);
      }

      let lg = svg.querySelector(`#${gradId}`);
      if (!lg) {
        lg = document.createElementNS(ns, "linearGradient");
        lg.setAttribute("id", gradId);
        lg.setAttribute("x1", "0%");
        lg.setAttribute("y1", "0%");
        lg.setAttribute("x2", "100%");
        lg.setAttribute("y2", "0%");

        const stop1 = document.createElementNS(ns, "stop");
        stop1.setAttribute("offset", "0%");
        stop1.setAttribute("stop-color", theme.palette.uranoGreen1.main);

        const stop2 = document.createElementNS(ns, "stop");
        stop2.setAttribute("offset", "100%");
        stop2.setAttribute("stop-color", theme.palette.uranoGreen2.main);

        lg.appendChild(stop1);
        lg.appendChild(stop2);
        defs.appendChild(lg);
      }

      const paint = `url(#${gradId})`;

      svg
        .querySelectorAll<SVGElement>(
          "path, circle, rect, polygon, polyline, line, ellipse"
        )
        .forEach((el) => {
          el.setAttribute("fill", paint);
          el.setAttribute("stroke", paint);
        });

      svg.setAttribute("width", String(size));
      svg.setAttribute("height", String(size));
      (svg as unknown as SVGElement).style.display = "block";
    });

    return () => window.cancelAnimationFrame(raf);
  }, [size]);

  return (
    <Box
      component="span"
      ref={hostRef}
      sx={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </Box>
  );
}

function MenuRow({
  href,
  icon,
  label,
  external,
}: {
  href: string;
  icon: React.ReactElement;
  label: string;
  external?: boolean;
}): React.ReactElement {
  return (
    <ButtonBase
      component={external ? "a" : NextLink}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      sx={{
        width: "100%",
        justifyContent: "flex-start",
        gap: 0.75,
        px: 1.25,
        py: 1,
        borderRadius: 1.5,
        color: theme.palette.text.primary,
        transition: "background-color 150ms ease",
        "& .menu-item-icon": {
          filter: "grayscale(100%)",
        },
        "& .menu-item-label": {
          color: theme.palette.text.secondary,
        },
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          "& .menu-item-icon": {
            filter: "grayscale(0%)",
          },
          "& .menu-item-label": {
            color: theme.palette.text.primary,
          },
        },
      }}
    >
      <Box
        className="menu-item-icon"
        sx={{
          width: 28,
          height: 28,
          display: "grid",
          placeItems: "center",
        }}
      >
        {icon}
      </Box>
      <Typography className="menu-item-label" sx={{ fontSize: "1.1rem" }}>
        {label}
      </Typography>
    </ButtonBase>
  );
}

function ProductsMenu(): React.ReactElement {
  const iconProps = {
    size: 22,
    color: "#ffffff",
    variant: "Bold" as const,
  };

  return (
    <Box sx={{ p: 2.25, width: "max-content" }}>
      <Stack direction="row" alignItems="stretch" gap={2.25}>
        <Stack sx={{ minWidth: 240 }} gap={1.25}>
          <Typography
            sx={{
              fontSize: 16,
              letterSpacing: "0.12em",
              color: theme.palette.text.primary,
              px: 1.75,
            }}
          >
            FOR USERS
          </Typography>

          <MenuRow
            href="/uapp"
            icon={<UranoGradientIcon icon={<Monitor {...iconProps} />} size={22} />}
            label="uApp"
          />
          <MenuRow
            href="/ushares"
            icon={<UranoGradientIcon icon={<Share {...iconProps} />} size={22} />}
            label="uShares"
          />
          <MenuRow
            href="/uassistant"
            icon={<UranoGradientIcon icon={<Triangle {...iconProps} />} size={22} />}
            label="uAssistant"
          />
        </Stack>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "rgba(255,255,255,0.10)" }}
        />

        <Stack sx={{ minWidth: 240 }} gap={1.25}>
          <Typography
            sx={{
              fontSize: 16,
              letterSpacing: "0.12em",
              color: theme.palette.text.primary,
              px: 1.75,
            }}
          >
            FOR ISSUERS &amp; BUILDERS
          </Typography>

          <MenuRow
            href="/ustation"
            icon={<UranoGradientIcon icon={<I3Dcube {...iconProps} />} size={22} />}
            label="uStation"
          />
          <MenuRow
            href="/contact"
            icon={<UranoGradientIcon icon={<MessageText1 {...iconProps} />} size={22} />}
            label="Contact us"
          />
        </Stack>
      </Stack>
    </Box>
  );
}

function LearnMenu(): React.ReactElement {
  const iconProps = {
    size: 22,
    color: "#ffffff",
    variant: "Bold" as const,
  };

  return (
    <Box sx={{ p: 2.25, width: "max-content" }}>
      <Stack direction="row" alignItems="stretch" gap={2.25}>
        <Stack sx={{ minWidth: 240 }} gap={1.25}>
          <MenuRow
            href="/docs"
            icon={<UranoGradientIcon icon={<Notepad2 {...iconProps} />} size={22} />}
            label="Docs"
          />
          <MenuRow
            href="/faq"
            icon={<UranoGradientIcon icon={<MessageQuestion {...iconProps} />} size={22} />}
            label="FAQ"
          />
          <MenuRow
            href="https://github.com"
            icon={<UranoGradientIcon icon={<GitHubIcon />} size={22} />}
            label="Github"
            external
          />
        </Stack>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "rgba(255,255,255,0.10)" }}
        />

        <Stack sx={{ minWidth: 240 }} gap={1.25}>
          <MenuRow
            href="/audit"
            icon={<UranoGradientIcon icon={<ShieldSearch {...iconProps} />} size={22} />}
            label="Audit"
          />
          <MenuRow
            href="/upaper"
            icon={<UranoGradientIcon icon={<ClipboardText {...iconProps} />} size={22} />}
            label="uPaper"
          />
        </Stack>
      </Stack>
    </Box>
  );
}

function CommunityMenu(): React.ReactElement {
  const iconProps = {
    size: 22,
    color: "#ffffff",
    variant: "Bold" as const,
  };

  return (
    <Box sx={{ p: 2.25, width: "max-content", minWidth: 320 }}>
      <Stack gap={0.75}>
        <MenuRow
          href="/"
          icon={
            <Image src={uranoIcon} alt="Urano" width={22} height={22} />
          }
          label="$URANO"
        />

        <MenuRow
          href="/airdrop"
          icon={<UranoGradientIcon icon={<Gift {...iconProps} />} size={22} />}
          label="Airdrop"
        />

        <MenuRow
          href="https://t.me/"
          icon={<UranoGradientIcon icon={<RiTelegram2Fill size={22} />} size={22} />}
          label="Telegram"
          external
        />

        <MenuRow
          href="https://x.com/"
          icon={<UranoGradientIcon icon={<FaXTwitter size={22} />} size={22} />}
          label="X (Twitter)"
          external
        />
      </Stack>
    </Box>
  );
}

function PlaceholderMenu({ label }: { label: string }): React.ReactElement {
  return (
    <Box sx={{ p: 2.25, width: "max-content" }}>
      <Typography sx={{ color: theme.palette.text.secondary }}>
        {label} menu content goes here.
      </Typography>
    </Box>
  );
}

function NavTrigger({
  label,
  onMouseEnter,
  onMouseLeave,
}: {
  label: string;
  onMouseEnter: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
}) {
  return (
    <ButtonBase
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        px: 1.5,
        py: 1,
        borderRadius: 1.5,
        color: theme.palette.text.secondary,
        transition: "color 150ms ease, background-color 150ms ease",
        "&:hover": {
          color: theme.palette.text.primary,
          backgroundColor: "rgba(0,0,0,0.25)",
        },
      }}
    >
      <Typography sx={{ fontSize: 14, letterSpacing: "0.10em" }}>
        {label}
      </Typography>
      <KeyboardArrowDownRoundedIcon sx={{ fontSize: 20, opacity: 0.9 }} />
    </ButtonBase>
  );
}

export default function Header() {
  const [openKey, setOpenKey] = useState<MenuKey | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const closeTimerRef = useRef<number | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenKey(null);
      setAnchorEl(null);
    }, CLOSE_DELAY_MS);
  };

  const openMenu = (key: MenuKey) => (e: React.MouseEvent<HTMLElement>) => {
    clearCloseTimer();
    setOpenKey(key);
    setAnchorEl(e.currentTarget);
  };

  const isOpen = Boolean(openKey && anchorEl);

  const menuContent =
    openKey === "products" ? (
      <ProductsMenu />
    ) : openKey === "learn" ? (
      <LearnMenu />
    ) : openKey === "community" ? (
      <CommunityMenu />
    ) : (
      <PlaceholderMenu label="MENU" />
    );

  return (
    <>
      <Stack
        component="header"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          mx: "auto",
          zIndex: 1000,
          width: "70%",
          mt: 2,
          borderRadius: "0.5rem",
          border: GLASS_BORDER,
          background: GLASS_BG,
          backdropFilter: GLASS_BLUR,
          minHeight: "4.3125rem",
          px: "0.8125rem",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="https://www.uranoecosystem.com/"
          target="_blank"
          rel="noreferrer"
          sx={{ display: "inline-flex", alignItems: "center" }}
        >
          <Image src={logo} alt="Logo" width={120} height={70} fetchPriority="high" loading="eager" />
        </Link>

        <Stack direction="row" alignItems="center" gap={2}>
          <Stack direction="row" alignItems="center" gap={3} sx={{ pr: 0.5 }}>
            <NavTrigger
              label="PRODUCTS"
              onMouseEnter={openMenu("products")}
              onMouseLeave={scheduleClose}
            />
            <NavTrigger
              label="LEARN"
              onMouseEnter={openMenu("learn")}
              onMouseLeave={scheduleClose}
            />
            <NavTrigger
              label="COMMUNITY"
              onMouseEnter={openMenu("community")}
              onMouseLeave={scheduleClose}
            />
          </Stack>

          <RocketButton />
        </Stack>
      </Stack>

      <Popper
        open={isOpen}
        anchorEl={anchorEl}
        placement="bottom"
        transition
        modifiers={[
          { name: "offset", options: { offset: [0, 10] } },
          { name: "preventOverflow", options: { padding: 12 } },
        ]}
        sx={{ zIndex: 1300 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={{ enter: 120, exit: 200 }}>
            <Paper
              onMouseEnter={clearCloseTimer}
              onMouseLeave={scheduleClose}
              sx={{
                width: "fit-content",
                borderRadius: 2,
                border: GLASS_BORDER,
                background: GLASS_BG,
                backdropFilter: GLASS_BLUR,
                color: theme.palette.text.primary,
                overflow: "hidden",
                boxShadow: "0px 18px 60px rgba(0,0,0,0.45)",
              }}
            >
              {menuContent}
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
}
