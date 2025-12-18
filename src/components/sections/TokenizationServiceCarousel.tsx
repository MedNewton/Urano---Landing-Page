"use client";

import type { ReactElement } from "react";
import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { motion, animate, useMotionValue, useMotionValueEvent } from "framer-motion";

import theme from "@/theme/theme";
import ServiceCard, { type ServiceCardProps } from "@/components/sections/tokenizationAsAService/serviceCard";
import backingImage from "@/assets/images/bg1.webp";

export type TokenizationAsAServiceCarouselItem = ServiceCardProps & {
  id: string;
};

export type TokenizationAsAServiceCarouselProps = Readonly<{
  title: string;
  items: TokenizationAsAServiceCarouselItem[];
}>;

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export default function TokenizationAsAServiceCarousel({
  title,
  items,
}: TokenizationAsAServiceCarouselProps): ReactElement {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // x is the actual track position (0 = left edge)
  const x = useMotionValue(0);

  // dragLeft is the max negative value you can drag to (right edge)
  const [dragLeft, setDragLeft] = useState(0);

  const [canGoLeft, setCanGoLeft] = useState(false);  // show left arrow
  const [canGoRight, setCanGoRight] = useState(false); // show right arrow

  const recompute = () => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
  
    const viewportW = viewport.getBoundingClientRect().width;
    const trackW = track.scrollWidth;
  
    const maxDrag = Math.max(0, trackW - viewportW);
    const nextLeftBound = -maxDrag;
  
    // Update drag constraints
    setDragLeft(nextLeftBound);
  
    // Clamp x into new bounds
    const curr = x.get();
    const clamped = clamp(curr, nextLeftBound, 0);
    if (clamped !== curr) x.set(clamped);
  
    // IMPORTANT: decide arrow visibility from measurements (not from previous state)
    const EPS = 1; // px tolerance
    const hasOverflow = maxDrag > EPS;
  
    setCanGoLeft(hasOverflow && clamped < -EPS);
    setCanGoRight(hasOverflow && clamped > nextLeftBound + EPS);
  };
  

  useLayoutEffect(() => {
    recompute();

    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const ro = new ResizeObserver(() => recompute());
    ro.observe(viewport);
    ro.observe(track);

    window.addEventListener("resize", recompute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recompute);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateArrowState = (xVal: number) => {
    const EPS = 1; // px tolerance
    const hasOverflow = dragLeft < -EPS;

    if (!hasOverflow) {
      setCanGoLeft(false);
      setCanGoRight(false);
      return;
    }

    // left edge => x ~ 0
    // right edge => x ~ dragLeft (negative)
    setCanGoLeft(xVal < -EPS);
    setCanGoRight(xVal > dragLeft + EPS);
  };

  useMotionValueEvent(x, "change", (latest) => {
    updateArrowState(latest);
  });

  React.useEffect(() => {
    updateArrowState(x.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragLeft]);

  const cards = useMemo(() => items, [items]);

  const trackPl = { xs: 2.5, md: 14 };

  const pageStep = () => {
    const viewport = viewportRef.current;
    if (!viewport) return 320;
    return viewport.getBoundingClientRect().width * 0.85;
  };

  const handleLeft = () => {
    const curr = x.get();
    const target = clamp(curr + pageStep(), dragLeft, 0);
    animate(x, target, { type: "spring", stiffness: 260, damping: 34 });
  };

  const handleRight = () => {
    const curr = x.get();
    const target = clamp(curr - pageStep(), dragLeft, 0);
    animate(x, target, { type: "spring", stiffness: 260, damping: 34 });
  };

  const arrowBtnSx = {
    width: 44,
    height: 44,
    borderRadius: 2,
    backgroundColor: "rgba(20,20,20,0.72)",
    border: "1px solid rgba(85, 85, 85, 0.30)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    color: "#EDEDED",
    boxShadow: "0px 18px 60px rgba(0,0,0,0.35)",
    "&:hover": {
      background: theme.palette.uranoGradient,
      borderColor: "rgba(0,0,0,0)",
      color: "#0E0E0E",
    },
    "& .MuiSvgIcon-root": {
      fontSize: 28,
    },
  } as const;

  return (
    <Stack sx={{ width: "100%", pt: 6 }}>
      <Box
        sx={{
          position: "relative",
          width: "105vw",
          ml: "calc(50% - 50vw)",
          overflow: "hidden",
          transform: "translateY(-40px)",
          zIndex: 12,
          backgroundColor: "transparent",
          backgroundImage: `url(${backingImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "70% center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            className="conthrax"
            sx={{
              pl: trackPl,
              fontSize: { xs: 24, md: 28 },
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: theme.palette.uranoGreen1.main,
              mb: 4,
            }}
          >
            {title}
          </Typography>

          <Box
            ref={viewportRef}
            sx={{
              width: "100%",
              overflow: "hidden",
              mb: 8,
              position: "relative",
            }}
          >
            {/* Arrows (only when needed) */}
            {canGoLeft ? (
              <Box
                sx={{
                  position: "absolute",
                  left: { xs: 10, md: 18 },
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 20,
                }}
              >
                <IconButton
                  aria-label="Scroll left"
                  onClick={handleLeft}
                  onPointerDown={(e) => e.stopPropagation()}
                  sx={arrowBtnSx}
                >
                  <ChevronLeftRoundedIcon />
                </IconButton>
              </Box>
            ) : null}

            {canGoRight ? (
              <Box
              id="right-arrow"
                sx={{
                  position: "absolute",
                  right: { xs: 10, md: 18},
                  left: "91%",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 20,
                }}
              >
                <IconButton
                id="right-arrow-button"
                  aria-label="Scroll right"
                  onClick={handleRight}
                  onPointerDown={(e) => e.stopPropagation()}
                  sx={arrowBtnSx}
                >
                  <ChevronRightRoundedIcon />
                </IconButton>
              </Box>
            ) : null}

            <Box
              component={motion.div}
              ref={trackRef}
              drag="x"
              dragConstraints={{ left: dragLeft, right: 0 }}
              dragElastic={0.06}
              dragMomentum
              style={{ x, touchAction: "pan-y" }}
              whileTap={{ cursor: "grabbing" }}
              sx={{
                display: "flex",
                alignItems: "stretch",
                gap: { xs: 2, md: 3 }, // slightly tighter
                cursor: "grab",
                pl: trackPl,
                pb: 2,
                pr: { xs: 1.5, md: 2 },
              }}
            >
              {cards.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    flex: "0 0 auto",
                    // smaller + more landscape feel
                    width: { xs: 270, sm: 310, md: 360 },
                    height: { xs: 320, sm: 340, md: 390 },
                    display: "flex",
                  }}
                >
                  <ServiceCard
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    imageAlt={item.imageAlt}
                  />
                </Box>
              ))}

              <Box aria-hidden sx={{ flex: "0 0 auto", width: { xs: 14, md: 40 } }} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
