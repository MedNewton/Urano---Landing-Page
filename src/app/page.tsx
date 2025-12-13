import { Stack } from "@mui/material";

import Hero from "@/components/sections/hero";
import TokenizationAsAServiceCarousel from "@/components/sections/TokenizationServiceCarousel";
import ExploreEcosystemSection, {
  type ExploreEcosystemItem,
} from "@/components/sections/ExploreEcosystemSection";

import ecosystemImage1 from "@/assets/images/ecosystem1.webp";
import ecosystemImage2 from "@/assets/images/ecosystem2.webp";
import ecosystemImage3 from "@/assets/images/ecosystem3.webp";
import ecosystemImage4 from "@/assets/images/ecosystem4.webp";

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

  return (
    <Stack component="main" width="100%" height="100%" minHeight="100dvh">
      <Hero />
      <TokenizationAsAServiceCarousel title="Tokenization as a Service" items={items} />
      <ExploreEcosystemSection title="Explore the Urano Ecosystem" items={items2} />
      <Stack width="100%" height="100vh" />
    </Stack>
  );
}
