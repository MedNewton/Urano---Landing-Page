"use client";

import { usePathname } from "next/navigation";
import AnimatedSVGPreloader from "@/components/layout/AnimatedSVGPreloader";

const EXCLUDED_PATHS = ["/launch"];

export default function ConditionalPreloader() {
  const pathname = usePathname();

  if (EXCLUDED_PATHS.includes(pathname)) return null;

  return (
    <AnimatedSVGPreloader
      scale={0.6}
      textSrc="/urano-text.svg"
      textScale={0.4}
      textGapPx={20}
      textFadeMs={800}
    />
  );
}
