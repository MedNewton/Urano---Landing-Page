import { Box, Stack } from "@mui/material";

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
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    minHeight: "100dvh",
                }}
            >
                {/* hero content */}
            </Box>
        </Stack>
    );
};

export default Hero;
