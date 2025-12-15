import { Stack } from "@mui/material";

import MobileHero from "@/components/sections/mobile/mobileHero";
import MobileTokenizationServiceCarousel from "@/components/sections/mobile/mobileTokenizationServiceCarousel";
import MobileExploreEcosystemSection, { type MobileExploreEcosystemItem } from "@/components/sections/mobile/mobileExploreEcosystemSection";

import slider1 from "@/assets/images/slider/1.webp";
import slider2 from "@/assets/images/slider/2.webp";
import slider3 from "@/assets/images/slider/3.webp";
import slider4 from "@/assets/images/slider/4.webp";
import slider5 from "@/assets/images/slider/5.webp";
import slider6 from "@/assets/images/slider/6.webp";

import ecosystemImage1 from "@/assets/images/ecosystem1.webp";
import ecosystemImage2 from "@/assets/images/ecosystem2.webp";
import ecosystemImage3 from "@/assets/images/ecosystem3.webp";
import ecosystemImage4 from "@/assets/images/mobileEcosystem4.webp";

export default function Home() {

    const servicesItems = [
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

    const ecosystemItems: MobileExploreEcosystemItem[] = [
        {
          id: "uapp",
          title: "uApp",
          description:
            "Our Web 3.0-native platform, designed to let users buy and manage real-world assets, stake $URANO, and participate in decentralized governance, all within a single, seamless ecosystem.",
          primaryCtaLabel: "LAUNCH",
          primaryCtaHref: "/uapp",
          secondaryCtaLabel: "DISCOVER",
          secondaryCtaHref: "/uapp",
          imageSide: "left",
          backdropWord: "uApp",
          image: ecosystemImage1.src,
          imageAlt: "uApp preview",
        },
        {
          id: "ushares",
          title: "uShares",
          description:
            "From art and real estate to private equity — uShares transform these assets into fractionalized investment opportunities, accessible to everyone.",
          primaryCtaLabel: "BUY",
          primaryCtaHref: "/ushares",
          secondaryCtaLabel: "DISCOVER",
          secondaryCtaHref: "/ushares",
          imageSide: "right",
          backdropWord: "uShares",
          image: ecosystemImage2.src,
          imageAlt: "uShares preview",
        },
        {
          id: "ustation",
          title: "uStation",
          description:
            "Guiding business and individuals to bring real-world assets on-chain.",
          primaryCtaLabel: "TOKENIZE NOW",
          primaryCtaHref: "/ustation",
          secondaryCtaLabel: "DISCOVER",
          secondaryCtaHref: "/ustation",
          imageSide: "left",
          backdropWord: "uStation",
          image: ecosystemImage3.src,
          imageAlt: "uStation preview",
        },
        {
          id: "uassistant",
          title: "uAssistant",
          description:
            "An AI agent built to guide you through Real World Assets, automate complex operations, and enhance your user experience.",
          primaryCtaLabel: "LAUNCH",
          primaryCtaHref: "/uassistant",
          secondaryCtaLabel: "DISCOVER",
          secondaryCtaHref: "/uassistant",
          imageSide: "right",
          backdropWord: "uAssistant",
          image: ecosystemImage4.src,
          imageAlt: "uAssistant preview",
        },
      ];

    return (
        <Stack component="main" width="100%" height="100%" minHeight="100dvh">
            <MobileHero />
            <MobileTokenizationServiceCarousel items={servicesItems} />
            <MobileExploreEcosystemSection items={ecosystemItems} />
            <Stack width="100%" height="100%" minHeight="100dvh">

            </Stack>
        </Stack>
    );
}
