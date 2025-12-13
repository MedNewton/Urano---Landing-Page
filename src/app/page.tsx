import { Stack } from "@mui/material";

import Hero from "@/components/sections/hero";
import TokenizationAsAServiceCarousel from "@/components/sections/TokenizationServiceCarousel";
import ExploreEcosystemSection, {
  type ExploreEcosystemItem,
} from "@/components/sections/ExploreEcosystemSection";
import type { TechIntegrationItem } from "@/components/sections/TechIntegrationsSection";
import TechIntegrationsSection from "@/components/sections/TechIntegrationsSection";
import type { PoweredByUranoItem } from "@/components/sections/PoweredByUranoSection";
import PoweredByUranoSection from "@/components/sections/PoweredByUranoSection";
import type { FaqItem } from "@/components/sections/FaqSection";
import FaqSection from "@/components/sections/FaqSection";

import ecosystemImage1 from "@/assets/images/ecosystem1.webp";
import ecosystemImage2 from "@/assets/images/ecosystem2.webp";
import ecosystemImage3 from "@/assets/images/ecosystem3.webp";
import ecosystemImage4 from "@/assets/images/ecosystem4.webp";

import tech1Image from "@/assets/images/tech1.webp";
import tech2Image from "@/assets/images/tech2.webp";


import Subtract1 from "@/assets/images/Subtract1.webp";
import Subtract2 from "@/assets/images/Subtract2.webp";
import Subtract3 from "@/assets/images/Subtract3.webp";
import Subtract4 from "@/assets/images/Subtract4.webp";

export default function Home() {
  const items = [
    {
      id: "backing",
      title: "INSTITUTIONAL BACKING",
      description:
        "Supported and trusted by BlockSuisse AG a SPV Holding serving as an anchor investor.",
    },
    {
      id: "notarization",
      title: "DIGITAL NOTARIZATION",
      description:
        "Tamper-proof certification for digital and tokenized assets with instant on-chain verification.",
    },
    {
      id: "compliance",
      title: "COMPLIANCE",
      description:
        "Full regulatory transparency and security, ensuring all tokenized assets meet compliance standards.",
    },
    {
      id: "real-estate",
      title: "REAL ESTATE",
      description:
        "From bricks to tokens: access institutional-grade fractional real estate.",
    },
    {
      id: "intellectual-properties",
      title: "INTELLECTUAL PROPERTIES",
      description:
        "Early access to tomorrow’s unicorns: IP, patents, and emerging startups.",
    },
    {
      id: "art",
      title: "ART",
      description:
        "Tokenize fine Arts, track provenance on-chain and open new opportunities for creators.",
    },
  ];

  const items2: ExploreEcosystemItem[] = [
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
      image: ecosystemImage1.src, // ✅ important
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
      image: ecosystemImage2.src, // ✅
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
      image: ecosystemImage3.src, // ✅
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
      image: ecosystemImage4.src, // ✅
      imageAlt: "uAssistant preview",
    },
  ];

  const techItems: TechIntegrationItem[] = [
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

  const poweredItems: PoweredByUranoItem[] = [
    {
      id: "governance",
      title: "Governance",
      description:
        "Shape the Urano ecosystem through on-chain governance. $URANO holders vote on proposals, protocol upgrades, and ecosystem allocations",
      side: "left",
      bgImage: Subtract1,
    },
    {
      id: "staking",
      title: "Staking Rewards",
      description:
        "Stake your $URANO to secure protocol integrity and earn sustainable yields – combining network security with real-asset performance",
      side: "right",
      bgImage: Subtract2,
    },
    {
      id: "priority",
      title: "Priority  Access",
      description:
        "Unlock early access to curated tokenizations, strategic launches, and ecosystem programs – exclusively available to verified $URANO holders.",
      side: "left",
      bgImage: Subtract3,
    },
    {
      id: "revenue",
      title: "Revenue Sharing",
      description:
        "Benefit from Urano’s growth. Holders receive dynamic revenue allocations tied to protocol fee performance, aligning community incentives with long-term value.",
      side: "right",
      bgImage: Subtract4,
    },
  ];

  const faqItems: FaqItem[] = [
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
      <Hero />
      <TokenizationAsAServiceCarousel title="Tokenization as a Service" items={items} />
      <ExploreEcosystemSection title="Explore the Urano Ecosystem" items={items2} />
      <PoweredByUranoSection title="Powered by Urano" items={poweredItems} />
      <TechIntegrationsSection title="Tech Integrations" items={techItems} />
      <FaqSection title="FAQ" items={faqItems} />
      <Stack width="100%" height="20vh" />
    </Stack>
  );
}
