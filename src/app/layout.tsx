import "@/styles/globals.css";

import { type Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import { Box, Container } from "@mui/material";
import AnimatedSVGPreloader from "@/components/layout/AnimatedSVGPreloader";
import { Providers } from "@/components/layout/providers";
import Header from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Urano - Presale",
  description: "Urano Ecosystem - $URANO Token Presale",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={hostGrotesk.className}>
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
          </Box>
        </Providers>
      </body>
    </html>
  );
}
