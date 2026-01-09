"use client";

import type { ReactElement } from "react";
import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Box, IconButton, Link, Stack, Typography } from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import {
  motion,
  animate,
  useMotionValue,
  useMotionValueEvent,
  useInView,
} from "framer-motion";
import Image from "next/image";

import theme from "@/theme/theme";
import ServiceCard, { type ServiceCardProps } from "@/components/sections/tokenizationAsAService/serviceCard";
import SliderBorderTop from "@/assets/images/sliderBorder.svg?url";
import SliderBorderBottom from "@/assets/images/sliderBorder2.svg?url";

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

  // ✅ observe a stable container (NOT the clipped border)
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.35 });

  const x = useMotionValue(0);
  const [dragLeft, setDragLeft] = useState(0);

  const [canGoLeft, setCanGoLeft] = useState(false);
  const [canGoRight, setCanGoRight] = useState(false);

  // ✅ distinguish click vs drag (so links remain clickable but never block dragging)
  const dragIntentRef = useRef<{
    startX: number;
    startY: number;
    moved: boolean;
  }>({ startX: 0, startY: 0, moved: false });


  const recompute = () => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const viewportW = viewport.getBoundingClientRect().width;
    const trackW = track.scrollWidth;

    const maxDrag = Math.max(0, trackW - viewportW);
    const nextLeftBound = -maxDrag;

    setDragLeft(nextLeftBound);

    const curr = x.get();
    const clamped = clamp(curr, nextLeftBound, 0);
    if (clamped !== curr) x.set(clamped);

    const EPS = 1;
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
    const EPS = 1;
    const hasOverflow = dragLeft < -EPS;

    if (!hasOverflow) {
      setCanGoLeft(false);
      setCanGoRight(false);
      return;
    }

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

  // ✅ framer mask reveal (left -> right)
  const borderReveal = {
    hidden: { clipPath: "inset(0 100% 0 0)" as const },
    show: {
      clipPath: "inset(0 0% 0 0)" as const,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <Stack sx={{ width: "100%", pt: 6 }}>
      <Box
        ref={sectionRef}
        sx={{
          position: "relative",
          width: "105vw",
          ml: "calc(50% - 50vw)",
          overflow: "hidden",
          transform: "translateY(-40px)",
          zIndex: 12,
          backgroundColor: "transparent",
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1, pb: 10 }}>
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

          {/* ✅ TOP border — SAME position/styles, just animated clipPath */}
          <Box
            component={motion.div}
            variants={borderReveal}
            initial="hidden"
            animate={sectionInView ? "show" : "hidden"}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "105vw",
              height: "auto",
              paddingTop: 4,
              overflow: "hidden",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            <Image
              src={SliderBorderTop}
              alt="Slider Border"
              width={100}
              height={100}
              style={{
                width: "100vw",
                height: "auto",
              }}
            />
          </Box>

          <Box
            ref={viewportRef}
            sx={{
              width: "100%",
              overflow: "hidden",
              mt: 8,
              position: "relative",
            }}
          >
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
                  right: { xs: 10, md: 18 },
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
              dragElastic={0.1}          // slightly easier to “grab”
              dragMomentum               // keep as you like
              style={{ x, touchAction: "pan-y" }}
              whileTap={{ cursor: "grabbing" }}
              // ✅ pointer intent tracking (capture phase so children can’t steal it)
              onPointerDownCapture={(e) => {
                dragIntentRef.current.startX = e.clientX;
                dragIntentRef.current.startY = e.clientY;
                dragIntentRef.current.moved = false;
              }}
              onPointerMoveCapture={(e) => {
                const dx = Math.abs(e.clientX - dragIntentRef.current.startX);
                const dy = Math.abs(e.clientY - dragIntentRef.current.startY);

                // small threshold; require mostly-horizontal movement
                if (dx > 6 && dx > dy) dragIntentRef.current.moved = true;
              }}
              onPointerUpCapture={() => {
                // let the click event happen first, then reset
                window.setTimeout(() => {
                  dragIntentRef.current.moved = false;
                }, 0);
              }}
              sx={{
                display: "flex",
                alignItems: "stretch",
                gap: { xs: 2, md: 3 },
                cursor: "grab",
                pl: trackPl,
                pb: 2,
                pr: { xs: 1.5, md: 2 },
                position: "relative",
                zIndex: 10,
              }}
            >

              {cards.map((item) => (
                <Box
                  key={item.id}
                  component={Link}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  // ✅ stop link navigation if the gesture was a drag
                  onClick={(e) => {
                    if (dragIntentRef.current.moved) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                  // ✅ prevent native “dragging a link/image” + text selection from stealing the gesture
                  onDragStart={(e) => e.preventDefault()}
                  onMouseDown={(e) => {
                    // prevents text selection on desktop while still allowing click
                    if (e.button === 0) e.preventDefault();
                  }}
                  sx={{
                    flex: "0 0 auto",
                    width: { xs: 270, sm: 310, md: 360 },
                    height: { xs: 320, sm: 340, md: 300 },
                    display: "flex",

                    userSelect: "none",
                    WebkitUserSelect: "none",
                    WebkitUserDrag: "none",

                    // ✅ critical: make images not capture pointer events so drag works from image areas
                    "& img": {
                      pointerEvents: "none",
                      userSelect: "none",
                      WebkitUserDrag: "none",
                    },
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
              <Box
                aria-hidden
                sx={{
                  flex: "0 0 auto",
                  width: { xs: 32, sm: 48, md: 80, lg: 250 },
                }}
              />

            </Box>
          </Box>

          {/* ✅ BOTTOM border — SAME position/styles, just animated clipPath */}
          <Box
            component={motion.div}
            variants={borderReveal}
            initial="hidden"
            animate={sectionInView ? "show" : "hidden"}
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "105vw",
              height: "auto",
              paddingTop: 20,
              overflow: "hidden",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            <Image
              src={SliderBorderBottom}
              alt="Slider Border"
              width={100}
              height={100}
              style={{
                width: "100vw",
                height: "auto",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
