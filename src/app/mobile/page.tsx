import { Stack } from "@mui/material";

import MobileHero from "@/components/sections/mobile/mobileHero";
import MobileTokenizationServiceCarousel from "@/components/sections/mobile/mobileTokenizationServiceCarousel";
import MobileExploreEcosystemSection, { type MobileExploreEcosystemItem } from "@/components/sections/mobile/mobileExploreEcosystemSection";
import MobileTechIntegrationsSection, { type MobileTechIntegrationItem } from "@/components/sections/mobile/mobileTechIntegrationsSection";
import MobilePartnersAndAdvisorsSection from "@/components/sections/mobile/mobilePartnersAndAdvisorsSection";
import MobileFaqSection, { type MobileFaqItem } from "@/components/sections/mobile/mobileFaqSection";
import MobilePoweredByUranoSection, { type MobilePoweredByUranoItem } from "@/components/sections/mobile/MobilePoweredByUranoSection";

import slider1 from "@/assets/images/slider/IB.webp";
import slider2 from "@/assets/images/slider/Notarization.webp";
import slider3 from "@/assets/images/slider/Compliance.webp";
import slider4 from "@/assets/images/slider/RE.webp";
import slider5 from "@/assets/images/slider/IP.webp";
import slider6 from "@/assets/images/slider/Art.webp";


import ecosystemImage1 from "@/assets/images/ecosystem1.webp";
import ecosystemImage2 from "@/assets/images/ushares.webp";
import ecosystemImage3 from "@/assets/images/ecosystem3.webp";
import ecosystemImage4 from "@/assets/images/ecosystem4 -1.webp";

import tech1Image from "@/assets/images/tech1.webp";
import tech2Image from "@/assets/images/tech2.webp";

import Subtract1 from "@/assets/images/Subtract1.webp";
import Subtract2 from "@/assets/images/Subtract2.webp";
import Subtract3 from "@/assets/images/Subtract3.webp";
import Subtract4 from "@/assets/images/Subtract4.webp";
import hoverSubtract1 from "@/assets/images/hoverSubstract1.webp";
import hoverSubtract2 from "@/assets/images/hoverSubstract2.webp";
import hoverSubtract3 from "@/assets/images/hoverSubstract3.webp";
import hoverSubtract4 from "@/assets/images/hoverSubstract4.webp";



export default function Home() {

    const servicesItems = [
        {
            id: "backing",
            title: "INSTITUTIONAL BACKING",
            description:
                "Supported and trusted by BlockSuisse AG a SPV Holding serving as an anchor investor.",
            image: slider1.src,
            imageAlt: "Slider 1",
            href: "https://docs.uranoecosystem.com/the-legal-structure-of-urano/blocksuisse-ag",
        },
        {
            id: "notarization",
            title: "DIGITAL NOTARIZATION",
            description:
                "Tamper-proof certification for digital and tokenized assets with instant on-chain verification.",
            image: slider2.src,
            imageAlt: "Slider 2",
            href: "https://notarify.io/",
        },
        {
            id: "compliance",
            title: "COMPLIANCE",
            description:
                "Full regulatory transparency and security, ensuring all tokenized assets meet compliance standards.",
            image: slider3.src,
            imageAlt: "Slider 3",
            href: "https://withpersona.com/"
        },
        {
            id: "real-estate",
            title: "REAL ESTATE",
            description:
                "From bricks to tokens: access institutional-grade fractional real estate.",
            image: slider4.src,
            imageAlt: "Slider 4",
            href: "https://docs.uranoecosystem.com/core-concepts/use-cases-of-tokenization#real-estate"
        },
        {
            id: "intellectual-properties",
            title: "INTELLECTUAL PROPERTIES",
            description:
                "Early access to tomorrow’s unicorns: IP, patents, and emerging startups.",
            image: slider5.src,
            imageAlt: "Slider 5",
            href: "https://docs.uranoecosystem.com/core-concepts/use-cases-of-tokenization#intellectual-property-ip"
        },
        {
            id: "art",
            title: "ART",
            description:
                "Tokenize fine Arts, track provenance on-chain and open new opportunities for creators.",
            image: slider6.src,
            imageAlt: "Slider 6",
            href: "https://docs.uranoecosystem.com/core-concepts/use-cases-of-tokenization#art-and-collectibles"
        },
    ];

    const ecosystemItems: MobileExploreEcosystemItem[] = [
        {
            id: "uapp",
            title: "uApp",
            description:
                "Our Web3-native platform designed to let users access and manage real-world asset representations, stake $URANO, and participate in decentralized governance within a single, seamless ecosystem.",
            primaryCtaLabel: "LAUNCH",
            primaryCtaHref: "launch",
            secondaryCtaLabel: "DISCOVER",
            secondaryCtaHref: "https://docs.uranoecosystem.com/ecosystem/uapp",
            imageSide: "left",
            backdropWord: "uApp",
            image: ecosystemImage1.src,
            imageAlt: "uApp preview",
        },
        {
            id: "ushares",
            title: "uShares",
            description:
                "From art and real estate to private equity, uShares represent real-world assets in a fractionalized on-chain format, enabling broader access through compliant digital instruments.",
            primaryCtaLabel: "BUY",
            primaryCtaHref: "launch",
            secondaryCtaLabel: "DISCOVER",
            secondaryCtaHref: "https://docs.uranoecosystem.com/ecosystem/ushares",
            imageSide: "right",
            backdropWord: "uShares",
            image: ecosystemImage2.src,
            imageAlt: "uShares preview",
        },
        {
            id: "ustation",
            title: "uStation",
            description:
                "Supporting businesses and individuals throughout the process of bringing real-world assets on-chain.",
            primaryCtaLabel: "TOKENIZE",
            primaryCtaHref: "mailto:info@uranoecosystem.com",
            secondaryCtaLabel: "DISCOVER",
            secondaryCtaHref: "https://docs.uranoecosystem.com/ecosystem/ustation",
            imageSide: "left",
            backdropWord: "uStation",
            image: ecosystemImage3.src,
            imageAlt: "uStation preview",
        },
        {
            id: "uassistant",
            title: "uAssistant",
            description:
                "An AI agent designed to guide users through real-world assets, assist with complex operations, and enhance the overall platform experience.",
            primaryCtaLabel: "LAUNCH",
            primaryCtaHref: "launch",
            secondaryCtaLabel: "DISCOVER",
            secondaryCtaHref: "https://docs.uranoecosystem.com/ecosystem/uassistant",
            imageSide: "right",
            backdropWord: "uAssistant",
            image: ecosystemImage4.src,
            imageAlt: "uAssistant preview",
        },
    ];

    const techIntegrationsItems: MobileTechIntegrationItem[] = [
        {
            id: "arbifuel",
            image: tech1Image.src,
            imageAlt: "ArbiFuel",
            caption: "Gasless transactions powered by ArbiFuel",
            href: "https://docs.uranoecosystem.com/arbitrum/arbifuel-program",
        },
        {
            id: "thirdweb",
            image: tech2Image.src,
            imageAlt: "Thirdweb",
            caption: "Onboarding everyone seamlessly with Thirdweb",
            href: "https://thirdweb.com/",
        },
    ];

    const poweredItems: MobilePoweredByUranoItem[] = [
        {
            id: "governance",
            title: "Governance",
            href: "https://docs.uranoecosystem.com/ecosystem/uranotoken/governance",
            description:
                "Shape the Urano ecosystem through on-chain governance. $URANO holders vote on proposals, protocol upgrades and ecosystem allocations, contributing to the evolution of the protocol.",
        },
        {
            id: "staking",
            title: "Staking",
            href: "https://docs.uranoecosystem.com/ecosystem/uranotoken/staking",
            description:
                "Stake your $URANO to support protocol integrity, access participation-based benefits and receive protocol rewards.",

        },
        {
            id: "priority",
            title: "Priority  Access",
            href: "https://docs.uranoecosystem.com/ecosystem/uranotoken#strategic-benefits-of-holding-usdurano",
            description:
                "Access curated tokenizations, strategic launches and ecosystem programs, available to verified $URANO holders.",

        },
        {
            id: "revenue",
            title: "Ecosystem Rewards Pool",
            href: "https://docs.uranoecosystem.com/ecosystem/uranotoken/ecosystem-rewards-pool",
            description:
                "Benefit from Urano’s ecosystem activity through a shared rewards pool that supports active participation across the network.",

        },
    ];


    const faqItems: MobileFaqItem[] = [
        {
            id: "what-is-urano",
            question: "What is Urano Ecosystem?",
            answer:
                "Urano is a Web3-native ecosystem that connects real-world assets to on-chain infrastructure through compliant tokenization and modular products.",
        },
        {
            id: "what-are-ushares",
            question: "What are uShares?",
            answer:
                "uShares are fractional digital units representing the economic structure of tokenized assets, enabling broader access to real-world opportunities. ",
        },
        {
            id: "who-can-access",
            question: "Who can access and use the Urano platform?",
            answer:
                "Access depends on jurisdiction and product availability. Some modules require eligibility checks and identity verification.",
        },
    ];

    return (
        <Stack component="main" width="100%" height="100%" minHeight="100dvh">
            <MobileHero />
            <MobileTokenizationServiceCarousel items={servicesItems} />
            <MobileExploreEcosystemSection items={ecosystemItems} />
            <MobilePoweredByUranoSection items={poweredItems} />
            <MobileTechIntegrationsSection items={techIntegrationsItems} />
            <MobilePartnersAndAdvisorsSection />
            <MobileFaqSection items={faqItems} />
        </Stack>
    );
}
