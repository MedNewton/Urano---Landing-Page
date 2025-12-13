import { Stack } from "@mui/material";

import Hero from "@/components/sections/hero";
import TokenizationAsAServiceCarousel from "@/components/sections/TokenizationServiceCarousel";


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

  return (
    <Stack component="main" width="100%" height="100%" minHeight="100dvh">
      <Hero />
      <TokenizationAsAServiceCarousel
        title="Tokenization as a Service"
        items={items}
      />
      <Stack width="100%" height="100vh">
        
      </Stack>
    </Stack>
  );
}
