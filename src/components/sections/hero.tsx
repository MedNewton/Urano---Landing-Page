import theme from "@/theme/theme";
import { Box, Stack, Typography, Button } from "@mui/material";
import Image from "next/image";

import arb from "@/assets/images/arbdao.webp";
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
                <Stack direction="row" alignItems="center" gap={1} mt={2}>
                    <Typography
                        className="conthrax"
                        variant="h6"
                        sx={{
                            fontSize: { xs: "1rem", lg: "1.125rem" },
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                        }}
                    >
                        Powered by
                    </Typography>
                    <Image src={arb} alt="ArbDAO" width={150} height={48} />
                </Stack>
                <Stack direction="row" alignItems="center" gap={5} mt={2}>
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
                        "&:hover": {
                            backgroundColor: "transparent",
                        },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Stack direction="row" alignItems="center" gap={5}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: { xs: "1rem", lg: "1.125rem" },
                                    fontWeight: { xs: 400, lg: 400 },
                                    color: theme.palette.text.primary,
                                }}
                            >
                                EXPLORE
                            </Typography>
                            <SouthEastIcon  sx={{ fontSize: 20, color: theme.palette.text.primary }} />
                        </Stack>
                    </Button>
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
                        "&:hover": {
                            backgroundColor: "transparent",
                        },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Stack direction="row" alignItems="center" gap={5}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: { xs: "1rem", lg: "1.125rem" },
                                    fontWeight: { xs: 400, lg: 400 },
                                    color: theme.palette.text.primary,
                                }}
                            >
                                TOKENIZE
                            </Typography>
                            <SouthEastIcon  sx={{ fontSize: 20, color: theme.palette.text.primary }} />
                        </Stack>
                    </Button>
                </Stack>
            </Box>
        </Stack>
    );
};

export default Hero;
