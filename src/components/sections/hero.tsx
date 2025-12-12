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
