"use client";

import type { ReactElement } from "react";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Box, Stack } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";

import theme from "@/theme/theme";
import MobileServiceCard, {
    type MobileServiceCardProps,
} from "@/components/sections/tokenizationAsAService/mobileServiceCard";

import MobileSliderTopBorder from "@/assets/images/slider/mobileSliderTopBorder.svg?url";
import MobileSliderBottomBorder from "@/assets/images/slider/mobileSliderBottomBorder.svg?url";

export type MobileTokenizationServiceCarouselItem = MobileServiceCardProps & {
    id: string;
};

export type MobileTokenizationServiceCarouselProps = Readonly<{
    title: string;
    items: MobileTokenizationServiceCarouselItem[];
}>;

export default function MobileTokenizationServiceCarousel({
    title,
    items,
}: MobileTokenizationServiceCarouselProps): ReactElement {
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);

    const [dragLeft, setDragLeft] = useState(0);

    const recompute = () => {
        const viewport = viewportRef.current;
        const track = trackRef.current;
        if (!viewport || !track) return;

        const viewportW = viewport.getBoundingClientRect().width;
        const trackW = track.scrollWidth;

        const maxDrag = Math.max(0, trackW - viewportW);
        setDragLeft(-maxDrag);
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
    }, []);

    const cards = useMemo(() => items, [items]);

    const trackPl = { xs: 2.5, md: 14 };

    return (
        <Stack sx={{ width: "100%", pt: 14 }}>
            <Box
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

                <Image src={MobileSliderTopBorder} alt="Mobile Slider Top Border" width={100} height={100}
                    style={{
                        position: "absolute",
                        top: 0, 
                        left: -10,
                        width: "100%",
                        height: "auto", 
                    }}
                />
                <Box sx={{ position: "relative", zIndex: 1, mt: 8 }}>
                    <Box ref={viewportRef} sx={{ width: "100%", overflow: "hidden", mb: 6 }}>
                        <Box
                            component={motion.div}
                            ref={trackRef}
                            drag="x"
                            dragConstraints={{ left: dragLeft, right: 0 }}
                            dragElastic={0.06}
                            dragMomentum
                            style={{ touchAction: "pan-y" }}
                            whileTap={{ cursor: "grabbing" }}
                            initial={false}
                            animate={{ x: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 34 }}
                            sx={{
                                display: "flex",
                                alignItems: "stretch",
                                gap: { xs: 2.5, md: 4 },
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
                                        width: { xs: 300, sm: 340, md: 420 },
                                        height: { xs: 445, sm: 480, md: 535 },
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
                <Image src={MobileSliderBottomBorder} alt="Mobile Slider Bottom Border" width={100} height={100}
                    style={{
                        position: "absolute",
                        bottom: 0, 
                        left: -10,
                        width: "100%",
                        height: "auto", 
                    }}
                />
            </Box>
        </Stack>
    );
}
