import "@/styles/globals.css";

import { type Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import { Box } from "@mui/material";
import AnimatedSVGPreloader from "@/components/layout/AnimatedSVGPreloader";
import { Providers } from "@/components/layout/providers";
import Header from "@/components/layout/header";
import UranoFooter from "@/components/layout/footer";

import logo from "@/assets/images/logos/logo-turquoise-1.webp";
import arbitrum from "@/assets/images/poweredByArbitrumLogos/Secondary-OneLine_AllWhite.png";

export const metadata: Metadata = {
  title: "Urano - Ecosystem",
  description: "Urano Ecosystem - Urano Ecosystem is a blockchain-based tokenization platform, serving as a safe path for off-chain and Real World Asset (RWA) opportunities.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const conthrax = localFont({
  src: "../assets/fonts/Conthrax-SemiBold.otf",
  display: "swap",
  variable: "--font-conthrax",
});

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${hostGrotesk.className} ${conthrax.variable}`}>
        <Providers>
          <Box component="main" sx={{ position: "relative", minHeight: "100dvh" }}>
            <Header />
            {children}
            <AnimatedSVGPreloader
              scale={0.6}
              textSrc="/urano-text.svg"
              textScale={0.4}
              textGapPx={20}
              textFadeMs={800}
            />
            <UranoFooter logoImage={logo} arbitrumImage={arbitrum} />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
