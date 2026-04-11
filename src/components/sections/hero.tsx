import theme from "@/theme/theme";
import { Box, Stack, Typography, Button, Link } from "@mui/material";
import Image from "next/image";

import arb from "@/assets/images/poweredByArbitrumLogos/Secondary-OneLine_BlueIcon.png";
import uniswapLogo from "@/assets/images/logos/uniswap-logo.png";
import SouthEastIcon from '@mui/icons-material/SouthEast';

const Hero = () => {
    return (
        <Stack
            component="section"
            width="100%"
            minHeight="100dvh"
            sx={{
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* video bg */}
            <Box
                component="video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/video/hero-poster.webp"
                aria-hidden="true"
                sx={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            >
                <source src="/video/hero-720.webm" type="video/webm" />
                <source src="/video/hero-720.mp4" type="video/mp4" />
            </Box>

            {/* Shadows*/}
            <Box
                sx={{
                    background: "linear-gradient(180deg, rgba(19, 19, 19, 0.00) 0%, rgba(15, 15, 15, 0.64) 100%)",
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                }}
            />
            <Box
                sx={{
                    background: "linear-gradient(180deg, rgba(19, 19, 19, 0.00) 0%, rgba(15, 15, 15, 0.64) 100%)",
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 2,
                }}
            />
            <Box
                sx={{
                    background: "linear-gradient(180deg, rgba(19, 19, 19, 0.00) 0%, rgba(15, 15, 15, 0.64) 100%)",
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 3,
                }}
            />
            <Box
                sx={{
                    background: "linear-gradient(180deg, rgba(19, 19, 19, 0.00) 0%, #0F0F0F 100%)",
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "20%",
                    zIndex: 4,
                }}
            />
            <Box
                sx={{
                    background: "linear-gradient(180deg, rgba(19, 19, 19, 0.00) 0%, #0F0F0F 100%)",
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "20%",
                    zIndex: 5,
                }}
            />
            <Box
                sx={{
                    background: "linear-gradient(180deg, rgba(19, 19, 19, 0.00) 0%, #0F0F0F 100%)",
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "20%",
                    zIndex: 6,
                }}
            />

            {/* Hero content */}
            <Box
                sx={{
                    position: "absolute",
                    zIndex: 10,
                    width: "70%",
                    minHeight: "100dvh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "start",
                    left: 0,
                    right: 0,
                    mx: "auto",
                    gap: "0.75rem"
                }}
            >
                <Typography
                    className="conthrax"
                    variant="h3"
                    sx={{
                        fontSize: { xs: "1.4rem", lg: "2.75rem" },
                        fontWeight: 700,
                        background: theme.palette.uranoGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Unlocking the<br /> power of on-chain<br />tokenization
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: { xs: "1rem", lg: "1rem" },
                        fontWeight: { xs: 400, lg: 300 },
                        color: theme.palette.text.primary,
                        width: "37%",
                    }}
                >
                    Urano Ecosystem is a full-stack platform powering secure and scalable tokenization of Real-World Assets
                </Typography>
                <Stack direction="row" alignItems="center" gap={2} mt={2} flexWrap="wrap">
                    <Link href="https://arbitrum.io/" target="_blank" rel="noopener noreferrer">
                        <Image src={arb} alt="ArbDAO" width={180} height={38} />
                    </Link>
                    <Box
                        sx={{
                            width: "1px",
                            height: "24px",
                            background: "rgba(255,255,255,0.18)",
                        }}
                    />
                    <Link
                        href="https://app.uniswap.org/swap?outputCurrency=0x5AF01e4d2bEFf2b01A8F3992e875EDd8d67469D2&chain=arbitrum"
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="none"
                        sx={{ width: "fit-content", display: "inline-flex" }}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            gap={1.25}
                            sx={{
                                transition: "opacity 0.3s ease-in-out",
                                "&:hover": {
                                    ".uniswap-cta-text": {
                                        background: "linear-gradient(90deg, #5EBBC3 0%, #6DE7C2 100%)",
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    },
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    position: "relative",
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    background: "#6DE7C2",
                                    boxShadow: "0 0 8px rgba(109, 231, 194, 0.8)",
                                    "&::after": {
                                        content: '""',
                                        position: "absolute",
                                        inset: 0,
                                        borderRadius: "50%",
                                        background: "#6DE7C2",
                                        animation: "uranoPulse 1.8s ease-out infinite",
                                    },
                                    "@keyframes uranoPulse": {
                                        "0%": { transform: "scale(1)", opacity: 0.7 },
                                        "100%": { transform: "scale(2.8)", opacity: 0 },
                                    },
                                }}
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    lineHeight: 0,
                                    marginTop: -1
                                }}
                            >
                                <Image
                                    src={uniswapLogo}
                                    alt="Uniswap"
                                    width={44}
                                    height={44}
                                    style={{ objectFit: "contain", display: "block" }}
                                />
                            </Box>
                            <Typography
                                className="uniswap-cta-text"
                                sx={{
                                    fontSize: { xs: "0.95rem", lg: "1.05rem" },
                                    fontWeight: 500,
                                    color: theme.palette.text.primary,
                                    letterSpacing: "0.02em",
                                    lineHeight: 1,
                                    transition: "color 0.3s ease-in-out",
                                }}
                            >
                                Live on Uniswap
                            </Typography>
                        </Stack>
                    </Link>
                </Stack>
                <Stack direction="row" alignItems="center" gap={5} mt={2}>
                    <Link href="/#explore-the-ecosystem" underline="none">
                        <Button sx={{
                            backgroundColor: "transparent",
                            borderRadius: 0,
                            borderBottom: `2px solid ${theme.palette.text.primary}`,
                            borderTop: "none",
                            borderLeft: "none",
                            borderRight: "none",
                            paddingX: 0.5,
                            paddingY: 0.75,
                            margin: 0,
                            height: "fit-content",
                            width: "fit-content",
                            transition: "background 0.3s ease-in-out, border-bottom 0.3s ease-in-out, color 0.3s ease-in-out, filter 0.3s ease-in-out",
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
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Stack direction="row" alignItems="center" gap={5}>
                                <Typography
                                    className="button-text"
                                    variant="h6"
                                    sx={{
                                        fontSize: { xs: "1rem", lg: "1.125rem" },
                                        fontWeight: { xs: 400, lg: 400 },
                                        color: theme.palette.text.primary,
                                    }}
                                >
                                    EXPLORE
                                </Typography>
                                <SouthEastIcon className="button-icon" sx={{ fontSize: 20, color: theme.palette.text.primary }} />
                            </Stack>
                        </Button>
                    </Link>
                    <Link href="https://docs.uranoecosystem.com/ecosystem/ustation" target="_blank" rel="noopener noreferrer" underline="none">
                        <Button sx={{
                            backgroundColor: "transparent",
                            borderRadius: 0,
                            borderBottom: `2px solid ${theme.palette.text.primary}`,
                            borderTop: "none",
                            borderLeft: "none",
                            borderRight: "none",
                            paddingX: 0.75,
                            paddingY: 0.75,
                            margin: 0,
                            height: "fit-content",
                            width: "fit-content",
                            transition: "background 0.3s ease-in-out, border-bottom 0.3s ease-in-out, color 0.3s ease-in-out, filter 0.3s ease-in-out",
                            "&:hover": {
                                background: "linear-gradient(90deg, #5EBBC3 0%, #6DE7C2 100%)",
                                borderBottom: `2px solid transparent`,
                                ".button-text": {
                                    color: "#0E0E0E",
                                },
                                ".button-icon": {
                                    filter: "invert(1)",
                                },
                            },
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Stack direction="row" alignItems="center" gap={5}>
                                <Typography
                                    className="button-text"
                                    variant="h6"
                                    sx={{
                                        fontSize: { xs: "1rem", lg: "1.125rem" },
                                        fontWeight: { xs: 400, lg: 400 },
                                        color: theme.palette.text.primary,
                                    }}
                                >
                                    TOKENIZE
                                </Typography>
                                <SouthEastIcon className="button-icon" sx={{ fontSize: 20, color: theme.palette.text.primary }} />
                            </Stack>
                        </Button>
                    </Link>
                </Stack>
            </Box>
        </Stack>
    );
};

export default Hero;
