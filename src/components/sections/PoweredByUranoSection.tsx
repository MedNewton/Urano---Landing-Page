"use client";

import type { ReactElement } from "react";
import Image, { type StaticImageData } from "next/image";
import { Box, Stack, Typography } from "@mui/material";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import poweredUranoCoin from "@/assets/images/poweredUranoCoin.webp";

import theme from "@/theme/theme";

export type PoweredByUranoItem = Readonly<{
    id: string;
    title: string;
    description: string;
    side: "left" | "right";
    bgImage: StaticImageData | string;
}>;

export type PoweredByUranoSectionProps = Readonly<{
    title?: string;
    items: PoweredByUranoItem[];
}>;

function PoweredCard({ item }: { item: PoweredByUranoItem }): ReactElement {
    const isRight = item.side === "right";
    const bgSrc = typeof item.bgImage === "string" ? item.bgImage : item.bgImage.src;

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: 6,
            }}
        >
            <Image
                src={bgSrc}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                priority={false}
                style={{
                    objectFit: "fill",
                    objectPosition: "center",
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            />

            <Stack
                sx={{
                    position: "relative",
                    zIndex: 1,
                    height: "100%",
                    px: { xs: 3, md: 5 },
                    py: { xs: 3, md: 0 },
                    justifyContent: "center",
                    alignItems: isRight ? "flex-end" : "flex-start",
                    textAlign: isRight ? "right" : "left",
                    gap: 1.75,
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: { xs: 18, md: 32 },
                        left: isRight ? "auto" : { xs: 18, md: 36 },
                        right: isRight ? { xs: 18, md: 32 } : "auto",
                        color: "#fff",
                        opacity: 0.9,
                    }}
                >
                    <NorthEastIcon sx={{ fontSize: 26 }} />
                </Box>

                <Typography
                    sx={{
                        mt: { xs: 3.5, md: 4 },
                        fontSize: { xs: 26, md: "1.75rem" },
                        fontWeight: 700,
                        background: theme.palette.uranoGradient,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    {item.title}
                </Typography>

                <Typography
                    sx={{
                        fontSize: { xs: 14.5, md: "1rem" },
                        lineHeight: 1.55,
                        color: "rgba(255,255,255,0.70)",
                        maxWidth: { xs: 250, md: 300, lg: 400, xl: 420 },
                    }}
                >
                    {item.description}
                </Typography>
            </Stack>
        </Box>
    );
}

export default function PoweredByUranoSection({
    title = "POWERED BY URANO",
    items,
}: PoweredByUranoSectionProps): ReactElement {
    const [a, b, c, d] = items;

    return (
        <Box
            component="section"
            sx={{
                width: "75%",
                pt: { xs: 6, md: 8 },
                mx: "auto",
            }}
        >
            <Typography
                className="conthrax"
                sx={{
                    textAlign: "center",
                    fontSize: { xs: 26, md: 44 },
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    background: theme.palette.uranoGradient,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: { xs: 4, md: 6 },
                    px: 2,
                }}
            >
                {title}
            </Typography>

            <Box sx={{ position: "relative", width: "100%" }}>
                <Box
                    sx={{
                        position: "relative",
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        gridAutoRows: { xs: 280, sm: 320, md: 276, lg: 276, xl: 300 },
                        gap: { xs: 2, md: 3 },
                    }}
                >
                    {a ? <PoweredCard item={a} /> : null}
                    {b ? <PoweredCard item={b} /> : null}
                    {c ? <PoweredCard item={c} /> : null}
                    {d ? <PoweredCard item={d} /> : null}

                    <Box
                        aria-hidden
                        sx={{
                            display: { xs: "none", md: "block" },
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                            width: { md: 220, lg: 340 },
                            height: { md: 220, lg: 340 },
                            borderRadius: "999px",
                            zIndex: 5,
                            pointerEvents: "none",
                        }}
                    >
                        <Image src={poweredUranoCoin} alt="Powered by Urano" fill sizes="100%" />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
