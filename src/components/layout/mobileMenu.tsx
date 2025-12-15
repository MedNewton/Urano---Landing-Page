"use client";

import type { ReactElement } from "react";
import React from "react";
import NextLink from "next/link";
import Image, { type StaticImageData } from "next/image";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    ButtonBase,
    Drawer,
    IconButton,
    Link as MuiLink,
    Stack,
    Typography,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { Sms } from "iconsax-reactjs";
import { RiTelegram2Fill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";

import theme from "@/theme/theme";

export type MobileMenuLink = Readonly<{
    label: string;
    href: string;
    external?: boolean;
}>;

export type MobileMenuSection = Readonly<{
    title: string;
    links: readonly MobileMenuLink[];
}>;

export type MobileMenuProps = Readonly<{
    open: boolean;
    onClose: () => void;

    logoSrc: StaticImageData | string;
    logoAlt?: string;
    brandHref?: string;
    uAppHref?: string;
    rocketIconSrc: StaticImageData | string;
    sections?: readonly MobileMenuSection[];
    complianceHref?: string;
    contactHref?: string;
    telegramHref?: string;
    xHref?: string;
    copyrightText?: string;
}>;

const DEFAULT_SECTIONS: readonly MobileMenuSection[] = [
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
            { label: "Audit", href: "/audit" },
            { label: "FAQ", href: "/faq" },
            { label: "uPaper", href: "/upaper" },
            { label: "Github", href: "https://github.com", external: true },
        ],
    },
    {
        title: "COMMUNITY",
        links: [
            { label: "$URANO", href: "/urano" },
            { label: "Airdrop", href: "/airdrop" },
            { label: "Telegram", href: "https://t.me/", external: true },
            { label: "X (Twitter)", href: "https://x.com/", external: true },
        ],
    },
];

function MenuLinkRow({
    link,
    onNavigate,
}: {
    link: MobileMenuLink;
    onNavigate: () => void;
}): ReactElement {
    return (
        <ButtonBase
            component={link.external ? "a" : NextLink}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noreferrer" : undefined}
            onClick={onNavigate}
            sx={{
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                px: 2,
                py: 1.35,
                borderRadius: 2,
                transition: "background-color 150ms ease",
                "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.06)",
                },
            }}
        >
            <Typography sx={{ color: "rgba(255,255,255,0.78)", fontSize: 18 }}>
                {link.label}
            </Typography>
            <Box
                aria-hidden
                sx={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: "rgba(109,231,194,0.55)",
                    opacity: 0.25,
                }}
            />
        </ButtonBase>
    );
}

export default function MobileMenu({
    open,
    onClose,
    logoSrc,
    logoAlt = "Urano",
    brandHref = "/",
    uAppHref = "/uapp",
    rocketIconSrc,
    sections = DEFAULT_SECTIONS,
    complianceHref = "/compliance",
    contactHref = "/contact",
    telegramHref = "https://t.me/",
    xHref = "https://x.com/",
    copyrightText = '"Urano Ecosystem Sp. Z o.o. © 2025 Urano Ecosystem, All rights reserved."',
}: MobileMenuProps): ReactElement {
    const [expanded, setExpanded] = React.useState<string | false>("PRODUCTS");

    const handleChange =
        (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const onNavigate = () => onClose();

    const cardSx = {
        borderRadius: "0.5rem",
        backgroundColor: "#1A1A1A",
        border: "1px solid #323232",
        overflow: "hidden",
    } as const;

    const surfaceBtnSx = {
        height: 52,
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

    return (
        <Drawer
            open={open}
            onClose={onClose}
            anchor="right"
            transitionDuration={{ enter: 260, exit: 220 }}
            ModalProps={{ keepMounted: true }}
            PaperProps={{
                sx: {
                    width: "100vw",
                    height: "100dvh",
                    maxWidth: "100vw",
                    backgroundColor: "rgba(19, 19, 19, 0.9)",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                },
            }}
        >
            <Box
                sx={{
                    px: 0,
                    pb: 1.25,
                }}
            >
                <Box sx={{
                    borderBottom: "1px solid rgba(85, 85, 85, 0.30)",
                    background: "rgba(21, 21, 21, 0.8)",
                    backdropFilter: "blur(11px)",
                    px: 2,
                    py: 1.25
                }}
                >
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <MuiLink
                            component={NextLink}
                            href={brandHref}
                            underline="none"
                            onClick={onNavigate}
                            sx={{ display: "inline-flex", alignItems: "center" }}
                        >
                            <Image src={logoSrc} alt={logoAlt} width={120} height={70} />
                        </MuiLink>

                        <Stack direction="row" alignItems="center" gap={1}>
                            <Button
                                component={NextLink}
                                href={uAppHref}
                                onClick={onNavigate}
                                variant="contained"
                                sx={{
                                    background: theme.palette.uranoGradient,
                                    border: `1px solid ${theme.palette.headerBorder.main}`,
                                    borderRadius: 3,
                                    px: { xs: 2, lg: 2 },
                                    py: 2,
                                    height: "fit-content",
                                    width: "fit-content",
                                    textTransform: "none",
                                }}
                            >
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <Typography
                                        variant="h6"
                                        fontWeight={500}
                                        sx={{
                                            color: theme.palette.background.default,
                                            fontSize: 18,
                                            lineHeight: 1,
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        uApp
                                    </Typography>
                                    <Image
                                        src={rocketIconSrc}
                                        alt="Rocket"
                                        width={18}
                                        height={18}
                                        style={{ transform: "translateY(1px)" }}
                                    />
                                </Stack>
                            </Button>

                            <IconButton
                                onClick={onClose}
                                aria-label="Close menu"
                                sx={{
                                    background: "#2D2D2D",
                                    borderRadius: 3,
                                    width: 52,
                                    height: 52,
                                    "&:hover": { background: "#2D2D2D" },
                                }}
                            >
                                <CloseRoundedIcon sx={{ fontSize: 28, color: theme.palette.text.primary }} />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Box>
            </Box>

            <Box
                sx={{
                    px: 2,
                    pt: 1.25,
                    pb: 2,
                    flex: "1 1 auto",
                    overflowY: "auto",
                    overscrollBehavior: "contain",
                }}
            >
                <Stack spacing={2}>
                    {sections.map((sec) => (
                        <Accordion
                            key={sec.title}
                            expanded={expanded === sec.title}
                            onChange={handleChange(sec.title)}
                            disableGutters
                            square
                            sx={{
                                ...cardSx,
                                backgroundColor: "#1A1A1A",
                                "&::before": { display: "none" },
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreRoundedIcon sx={{ color: "rgba(255,255,255,0.65)" }} />}
                                sx={{
                                    px: 2.25,
                                    minHeight: 84,
                                    "& .MuiAccordionSummary-content": { my: 0 },
                                }}
                            >
                                <Typography
                                    className="conthrax"
                                    sx={{
                                        color: "#EDEDED",
                                        fontSize: 16,
                                        letterSpacing: "0.08em",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    {sec.title}
                                </Typography>
                            </AccordionSummary>

                            <AccordionDetails sx={{ px: 1.25, pb: 1.5, pt: 0.25 }}>
                                <Stack spacing={0.5}>
                                    {sec.links.map((l) => (
                                        <MenuLinkRow key={`${sec.title}-${l.label}`} link={l} onNavigate={onNavigate} />
                                    ))}
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Stack>
            </Box>

            <Box
                sx={{
                    px: 2,
                    pb: "calc(14px + env(safe-area-inset-bottom))",
                    pt: 1.5,
                }}
            >
                <Stack spacing={1.6}>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1.25,
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Stack direction="row" spacing={1.25} sx={{ flex: "0 0 auto" }}>
                            <IconButton
                                component="a"
                                href={xHref}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="X"
                                sx={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 2,
                                    backgroundColor: "#2A2A2A",
                                    "&:hover": hoverGradient,
                                }}
                            >
                                <FaXTwitter className="icon" size={22} color="#EDEDED" />
                            </IconButton>

                            <IconButton
                                component="a"
                                href={telegramHref}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Telegram"
                                sx={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 2,
                                    backgroundColor: "#2A2A2A",
                                    "&:hover": hoverGradient,
                                }}
                            >
                                <RiTelegram2Fill className="icon" size={22} color="#EDEDED" />
                            </IconButton>
                        </Stack>

                        <Button
                            component={NextLink}
                            href={complianceHref}
                            onClick={onNavigate}
                            variant="contained"
                            sx={{
                                ...surfaceBtnSx,
                                flex: "1 1 auto",
                                minWidth: 0,
                                "&:hover": hoverGradient,
                            }}
                        >
                            Compliance Note
                        </Button>
                    </Box>

                    <Button
                        component={NextLink}
                        href={contactHref}
                        onClick={onNavigate}
                        variant="contained"
                        startIcon={<Sms className="icon" size={22} color="#EDEDED" />}
                        sx={{
                            ...surfaceBtnSx,
                            width: "100%",
                            justifyContent: "center",
                            "&:hover": hoverGradient,
                        }}
                    >
                        Contact us
                    </Button>

                    <Typography
                        sx={{
                            pt: 1,
                            color: "rgba(255,255,255,0.45)",
                            fontSize: 14,
                            textAlign: "center",
                        }}
                    >
                        {copyrightText}
                    </Typography>
                </Stack>
            </Box>
        </Drawer >
    );
}
