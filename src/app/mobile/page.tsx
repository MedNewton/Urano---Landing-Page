import { Stack } from "@mui/material";

import MobileHero from "@/components/sections/mobile/mobileHero";
import MobileTokenizationServiceCarousel from "@/components/sections/mobile/mobileTokenizationServiceCarousel";

import slider1 from "@/assets/images/slider/1.webp";
import slider2 from "@/assets/images/slider/2.webp";
import slider3 from "@/assets/images/slider/3.webp";
import slider4 from "@/assets/images/slider/4.webp";
import slider5 from "@/assets/images/slider/5.webp";
import slider6 from "@/assets/images/slider/6.webp";

export default function Home() {

    const items = [
        {
            id: "backing",
            title: "INSTITUTIONAL BACKING",
            description:
                "Supported and trusted by BlockSuisse AG a SPV Holding serving as an anchor investor.",
            image: slider1.src,
            imageAlt: "Slider 1",
        },
        {
            id: "notarization",
            title: "DIGITAL NOTARIZATION",
            description:
                "Tamper-proof certification for digital and tokenized assets with instant on-chain verification.",
            image: slider2.src,
            imageAlt: "Slider 2",
        },
        {
            id: "compliance",
            title: "COMPLIANCE",
            description:
                "Full regulatory transparency and security, ensuring all tokenized assets meet compliance standards.",
            image: slider3.src,
            imageAlt: "Slider 3",
        },
        {
            id: "real-estate",
            title: "REAL ESTATE",
            description:
                "From bricks to tokens: access institutional-grade fractional real estate.",
            image: slider4.src,
            imageAlt: "Slider 4",
        },
        {
            id: "intellectual-properties",
            title: "INTELLECTUAL PROPERTIES",
            description:
                "Early access to tomorrow’s unicorns: IP, patents, and emerging startups.",
            image: slider5.src,
            imageAlt: "Slider 5",
        },
        {
            id: "art",
            title: "ART",
            description:
                "Tokenize fine Arts, track provenance on-chain and open new opportunities for creators.",
            image: slider6.src,
            imageAlt: "Slider 6",
        },
    ];

    return (
        <Stack component="main" width="100%" height="100%" minHeight="100dvh">
            <MobileHero />
            <MobileTokenizationServiceCarousel items={items} />
            <Stack width="100%" height="100%" minHeight="100dvh">

            </Stack>
        </Stack>
    );
}
