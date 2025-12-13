"use client";

import type { ReactElement } from "react";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";

import theme from "@/theme/theme";
import ServiceCard, {
    type ServiceCardProps,
} from "@/components/sections/tokenizationAsAService/serviceCard";

import backingImage from "@/assets/images/bg1.webp";

export type TokenizationAsAServiceCarouselItem = ServiceCardProps & {
    id: string;
};

export type TokenizationAsAServiceCarouselProps = Readonly<{
    title: string;
    items: TokenizationAsAServiceCarouselItem[];
}>;

export default function TokenizationAsAServiceCarousel({
    title,
    items,
}: TokenizationAsAServiceCarouselProps): ReactElement {
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

                    <Box ref={viewportRef} sx={{ width: "100%", overflow: "hidden", mb: 8 }}>
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
                                    <ServiceCard
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
            </Box>
        </Stack>
    );
}
