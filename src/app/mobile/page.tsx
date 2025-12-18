import { Stack } from "@mui/material";

import MobileHero from "@/components/sections/mobile/mobileHero";
import MobileTokenizationServiceCarousel from "@/components/sections/mobile/mobileTokenizationServiceCarousel";
import MobileExploreEcosystemSection, { type MobileExploreEcosystemItem } from "@/components/sections/mobile/mobileExploreEcosystemSection";
import MobileTechIntegrationsSection, { type MobileTechIntegrationItem } from "@/components/sections/mobile/mobileTechIntegrationsSection";
import MobilePartnersAndAdvisorsSection from "@/components/sections/mobile/mobilePartnersAndAdvisorsSection";
import MobileFaqSection, { type MobileFaqItem } from "@/components/sections/mobile/mobileFaqSection";

import slider1 from "@/assets/images/slider/1.webp";
import slider2 from "@/assets/images/slider/2.webp";
import slider3 from "@/assets/images/slider/3.webp";
import slider4 from "@/assets/images/slider/4.webp";
import slider5 from "@/assets/images/slider/5.webp";
import slider6 from "@/assets/images/slider/6.webp";

import ecosystemImage1 from "@/assets/images/ecosystem1.webp";
import ecosystemImage2 from "@/assets/images/ecosystem2.webp";
import ecosystemImage4 from "@/assets/images/mobileEcosystem4.webp";

import tech1Image from "@/assets/images/tech1.webp";
import tech2Image from "@/assets/images/tech2.webp";



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
                "Our Web3-native platform designed to let users access and manage real-world asset representations, stake URANO, and participate in decentralized governance within a single, seamless ecosystem.",
            primaryCtaLabel: "LAUNCH",
            primaryCtaHref: "/uapp",
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
            primaryCtaHref: "/ushares",
            secondaryCtaLabel: "DISCOVER",
            secondaryCtaHref: "https://docs.uranoecosystem.com/ecosystem/ushares",
            imageSide: "right",
            backdropWord: "uShares",
            image: ecosystemImage2.src,
            imageAlt: "uShares preview",
        },
        {
            id: "uassistant",
            title: "uAssistant",
            description:
                "An AI agent built to guide you through Real World Assets, automate complex operations, and enhance your user experience.",
            primaryCtaLabel: "LAUNCH",
            primaryCtaHref: "/uassistant",
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
        },
        {
            id: "thirdweb",
            image: tech2Image.src,
            imageAlt: "Thirdweb",
            caption: "Onboarding everyone seamlessly with Thirdweb",
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
            id: "secure-compliant",
            question: "Is Urano secure and compliant with regulations?",
            answer:
                "Urano is designed with security-first principles and compliance tooling. Specific requirements may vary by jurisdiction and product.",
        },
        {
            id: "which-chain",
            question: "On which blockchain is Urano built?",
            answer:
                "Urano is deployed on an EVM-compatible stack. Network availability depends on the product you are accessing.",
        },
        {
            id: "who-usestation",
            question: "Who can use uStation to tokenize real-world assets?",
            answer:
                "Businesses and individuals can use uStation, subject to eligibility checks and jurisdictional constraints where applicable.",
        },
        {
            id: "what-are-ushares",
            question: "What are uShares?",
            answer:
                "uShares are fractionalized representations of tokenized assets, enabling broader access to investment opportunities.",
        },
        {
            id: "need-kyc",
            question: "Do I need to complete KYC to use Urano?",
            answer:
                "Some features may require KYC/verification depending on the asset type, region, and compliance requirements.",
        },
        {
            id: "what-uapp",
            question: "What can I do with the uApp?",
            answer:
                "Use the uApp to explore the ecosystem, manage assets, stake $URANO, and access governance features in one place.",
        },
        {
            id: "who-can-access",
            question: "Who can access and use the Urano platform?",
            answer:
                "Access depends on region and product availability. Some modules may have eligibility and verification requirements.",
        },
    ];

    return (
        <Stack component="main" width="100%" height="100%" minHeight="100dvh">
            <MobileHero />
            <MobileTokenizationServiceCarousel items={servicesItems} />
            <MobileExploreEcosystemSection items={ecosystemItems} />
            <MobileTechIntegrationsSection items={techIntegrationsItems} />
            <MobilePartnersAndAdvisorsSection />
            <MobileFaqSection items={faqItems} />
        </Stack>
    );
}
