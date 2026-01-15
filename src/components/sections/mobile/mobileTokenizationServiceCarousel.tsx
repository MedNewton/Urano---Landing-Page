"use client";

import type { ReactElement } from "react";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Box, Stack, Typography, Link } from "@mui/material";
import { motion, useDragControls, useMotionValue, animate } from "framer-motion";
import Image from "next/image";
import theme from "@/theme/theme"

import MobileServiceCard, {
  type MobileServiceCardProps,
} from "@/components/sections/tokenizationAsAService/mobileServiceCard";

import MobileSliderTopBorder from "@/assets/images/slider/mobileSliderTopBorder.svg?url";
import MobileSliderBottomBorder from "@/assets/images/slider/mobileSliderBottomBorder.svg?url";

export type MobileTokenizationServiceCarouselItem = MobileServiceCardProps & {
  id: string;
  href: string;
};

export type MobileTokenizationServiceCarouselProps = Readonly<{
  items: MobileTokenizationServiceCarouselItem[];
}>;

export default function MobileTokenizationServiceCarousel({
  items,
}: MobileTokenizationServiceCarouselProps): ReactElement {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Framer motion: make dragging start from anywhere (viewport), not only the track.
  const dragControls = useDragControls();

  // Keep current position stable (no snap-back on rerenders).
  const x = useMotionValue(0);

  const [dragLeft, setDragLeft] = useState(0);

  // Used to prevent accidental click navigation when user was dragging.
  const blockClickRef = useRef(false);
  const unblockTimerRef = useRef<number | null>(null);

  const clampX = (leftBound: number) => {
    const current = x.get();
    const next = Math.min(0, Math.max(leftBound, current));
    if (next !== current) x.set(next);
  };

  const recompute = () => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const viewportW = viewport.getBoundingClientRect().width;
    const trackW = track.scrollWidth;

    const maxDrag = Math.max(0, trackW - viewportW);
    const nextLeft = -maxDrag;

    setDragLeft(nextLeft);
    // Ensure current x is still inside constraints after resize/items changes.
    requestAnimationFrame(() => clampX(nextLeft));
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
    // Intentionally run once; ResizeObserver handles changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cards = useMemo(() => items, [items]);

  const trackPl = { xs: 2.5, md: 14 };

  const startDragFromAnywhere = (
    e: React.PointerEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    // Only left click / primary pointer.
    // (Touch has no button; PointerEvent sometimes does.)
    // @ts-expect-error - React unions differ slightly.
    if (typeof e.button === "number" && e.button !== 0) return;

    // This is the key: start track dragging using the native event.
    dragControls.start(e.nativeEvent as unknown as PointerEvent);
  };

  const onDragStart = () => {
    blockClickRef.current = true;
    if (unblockTimerRef.current) window.clearTimeout(unblockTimerRef.current);
  };

  const onDragEnd = () => {
    // Delay unblocking to prevent the "pointer up" that ends the drag from triggering a click.
    unblockTimerRef.current = window.setTimeout(() => {
      blockClickRef.current = false;
    }, 120);
  };

  // Optional helper if your arrow buttons need a stable API:
  // - right/end: animate(x, dragLeft, ...)
  // - left/start: animate(x, 0, ...)
  const scrollToStart = () => {
    animate(x, 0, { type: "spring", stiffness: 260, damping: 34 });
  };
  const scrollToEnd = () => {
    animate(x, dragLeft, { type: "spring", stiffness: 260, damping: 34 });
  };
  // Note: keep your existing arrow handlers as-is, but if they previously relied on animate={{x:0}}
  // or DOM transforms, switching them to scrollToStart/scrollToEnd will be the most robust.

  return (
    <Stack sx={{ width: "100%", pt: 14 }}>
      <Typography
            className="conthrax"
            sx={{
              pl: trackPl, 
              textAlign: "center",
              fontSize: { xs: 22, md: 30 },
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: theme.palette.uranoGreen1.main,
              mb: 8,
            }}
          >
            Tokenization as a service
          </Typography>
      <Box
        sx={{
          position: "relative",
          width: "105vw",
          ml: "calc(50% - 50vw)",
          overflow: "hidden",
          transform: "translateY(-35px)",
          zIndex: 12,
          backgroundColor: "transparent",
        }}
      >
        <Image
          src={MobileSliderTopBorder}
          alt="Mobile Slider Top Border"
          width={100}
          height={100}
          style={{
            position: "absolute",
            top: 0,
            left: -10,
            width: "100%",
            height: "auto",
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1, mt: 8 }}>
          {/* Viewport: dragging should start from ANY point in here */}
          <Box
            ref={viewportRef}
            onPointerDownCapture={startDragFromAnywhere}
            onMouseDownCapture={startDragFromAnywhere}
            onTouchStartCapture={startDragFromAnywhere}
            sx={{
              width: "100%",
              overflow: "hidden",
              mb: 6,

              // Critical UX improvements:
              touchAction: "pan-y",
              userSelect: "none",
              WebkitUserSelect: "none",
              WebkitTouchCallout: "none",
              cursor: "grab",
            }}
          >
            <Box
              component={motion.div}
              ref={trackRef}
              drag="x"
              dragControls={dragControls}
              dragListener={false} // we start drag from viewport instead
              dragConstraints={{ left: dragLeft, right: 0 }}
              dragElastic={0.06}
              dragMomentum
              style={{
                x, // stable position, no snap-back
                touchAction: "pan-y",
              }}
              whileTap={{ cursor: "grabbing" }}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              sx={{
                display: "flex",
                alignItems: "stretch",
                gap: { xs: 2.5, md: 4 },
                pl: trackPl,
                pb: 2,
                pr: { xs: 1.5, md: 2 },
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
                  // Prevent link navigation only when the user was dragging.
                  onClickCapture={(e) => {
                    if (!blockClickRef.current) return;
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  sx={{
                    flex: "0 0 auto",
                    width: { xs: 300, sm: 340, md: 420 },
                    height: { xs: 320, sm: 340, md: 535 },
                    display: "flex",
                  }}
                >
                  <MobileServiceCard
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    imageAlt={item.imageAlt}
                  />
                </Box>
              ))}

              <Box aria-hidden sx={{ flex: "0 0 auto", width: { xs: 16, md: 48 } }} />
            </Box>
          </Box>
        </Box>

        <Image
          src={MobileSliderBottomBorder}
          alt="Mobile Slider Bottom Border"
          width={100}
          height={100}
          style={{
            position: "absolute",
            bottom: 0,
            left: -10,
            width: "100%",
            height: "auto",
          }}
        />
      </Box>

      {/* If your arrows are currently inside this component, keep them.
          If they need to jump to ends reliably, call scrollToStart() / scrollToEnd(). */}
    </Stack>
  );
}
