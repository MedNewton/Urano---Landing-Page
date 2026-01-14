import theme from "@/theme/theme";
import { Box, Stack, Typography, Button } from "@mui/material";
import Image from "next/image";

import arb from "@/assets/images/poweredByArbitrumLogos/Secondary-OneLine_BlueIcon.png";
import SouthEastIcon from '@mui/icons-material/SouthEast';

const Hero = () => {
    return (
        <Stack
            component="section"
            width="100%"
            height="80dvh"
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
                poster="/video/mobile-hero-poster.webp"
                aria-hidden="true"
                sx={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    mt: -13,
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
                    background: "linear-gradient(0deg, rgba(19, 19, 19, 0) 0%, #0F0F0F 100%)",
                    position: "absolute",
                    top: 0,
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
                    height: "70%",
                    zIndex: 6,
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
                    height: "70%",
                    zIndex: 7,
                }}
            />

            {/* Hero content */}
            <Box
                sx={{
                    position: "absolute",
                    zIndex: 10,
                    width: "100%",
                    minHeight: "83dvh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "end",
                    alignContent: "center",
                    left: 0,
                    right: 0,
                    pt: 24,
                    mx: "auto",
                    gap: "0.75rem"
                }}
            >
                <Stack direction="row" alignItems="center" justifyContent="center" gap={0.5} mt={2}>
                    <Image src={arb} alt="ArbDAO" width={180} height={38} />
                </Stack>
                <Stack alignItems="center" gap={2}>
                    <Typography
                        className="conthrax"
                        variant="h3"
                        sx={{
                            fontSize: { xs: "1.5rem", lg: "2.75rem" },
                            fontWeight: 600,
                            background: theme.palette.uranoGradient,
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            textAlign: "center",
                            px: 2,
                        }}
                    >
                        Unlocking the power<br />of on-chain tokenization
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: { xs: "1rem", lg: "1rem" },
                            fontWeight: { xs: 400, lg: 300 },
                            color: theme.palette.text.primary,
                            width: "100%",
                            textAlign: "center",
                            px: 2,
                        }}
                    >
                        Urano Ecosystem is a full-stack platform powering secure and scalable tokenization of Real-World Assets
                    </Typography>

                    <Stack width="100%" direction="row" alignItems="center" gap={5} mt={2} px={3}>
                        <Button sx={{
                            width: "45%",
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
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                            <Stack width="100%" direction="row" alignItems="center" gap={5} justifyContent="space-between">
                                <Typography
                                    className="button-text"
                                    variant="h6"
                                    sx={{
                                        fontSize: { xs: "1.2rem", lg: "1.125rem" },
                                        fontWeight: { xs: 400, lg: 400 },
                                        color: theme.palette.text.primary,
                                    }}
                                >
                                    EXPLORE
                                </Typography>
                                <SouthEastIcon className="button-icon" sx={{ fontSize: 20, color: theme.palette.text.primary, alignSelf: "flex-end" }} />
                            </Stack>
                        </Button>
                        <Button sx={{
                            width: "45%",
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
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                            <Stack width="100%" direction="row" alignItems="center" gap={5} justifyContent="space-between">
                                <Typography
                                    className="button-text"
                                    variant="h6"
                                    sx={{
                                        fontSize: { xs: "1.2rem", lg: "1.125rem" },
                                        fontWeight: { xs: 400, lg: 400 },
                                        color: theme.palette.text.primary,
                                    }}
                                >
                                    TOKENIZE
                                </Typography>
                                <SouthEastIcon className="button-icon" sx={{ fontSize: 20, color: theme.palette.text.primary }} />
                            </Stack>
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    );
};

export default Hero;
