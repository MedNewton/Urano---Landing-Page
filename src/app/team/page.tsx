"use client";

import Image, { type StaticImageData } from "next/image";
import { Box, Stack, Typography } from "@mui/material";

import bgdark from "@/assets/images/bgdark.webp";
import ivonaImg from "@/assets/images/team/Ivona.png";
import erminioImg from "@/assets/images/team/Ermino.png";
import gjonImg from "@/assets/images/team/Gjon.png";
import ivanoImg from "@/assets/images/team/Ivano.png";

type TeamMember = {
  name: string;
  role: string;
  description: string;
  image: StaticImageData;
};

const TEAM: readonly TeamMember[] = [
  {
    name: "Iwona Matwiejew",
    role: "COO & CFO",
    description:
      "Over 20 years of experience in cross-border commodities investments in Europe and Asia. Financial expert in wealth funds, specializing in AML, blockchain, and cryptocurrency regulations.",
    image: ivonaImg,
  },
  {
    name: "Erminio Brambilla",
    role: "CEO",
    description:
      "Expert entrepreneur in real estate and finance, specializing in non-performing loans (NPL). 30+ years as CEO and CMO in financial leasing, corporate consulting, and real estate restructuring.",
    image: erminioImg,
  },
  {
    name: "Gjon Radovani",
    role: "CTO",
    description:
      "International architect and art curator, founder of architecture studios in Stuttgart and Tirana. Led major projects in Europe, Africa, and Latin America. Former Deputy Minister for Urban Development in Albania.",
    image: gjonImg,
  },
  {
    name: "Ivano Tonoli",
    role: "CBDO",
    description:
      "Entrepreneur with over 20 years in digital solutions for mobile, banking, and credit sectors, and founder of several financial associations.",
    image: ivanoImg,
  },
];

export default function TeamPage() {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Image
          src={bgdark}
          alt=""
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.7) 100%)",
          }}
        />
      </Box>

      {/* Content */}
      <Stack
        spacing={{ xs: 5, md: 7 }}
        alignItems="center"
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 900,
          px: { xs: 3, md: 6 },
          py: { xs: 14, md: 18 },
          textAlign: "center",
        }}
      >
        {/* Header */}
        <Stack spacing={2.5} alignItems="center" sx={{ maxWidth: 760 }}>
          <Typography
            className="conthrax"
            sx={{
              fontSize: { xs: 36, md: 56 },
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "0.03em",
              background: "linear-gradient(90deg, #5EBBC3 0%, #6DE7C2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            TradiFi team
          </Typography>

          <Typography
            className="conthrax"
            sx={{
              fontSize: { xs: 14, md: 16 },
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.7,
              letterSpacing: "0.02em",
            }}
          >
            Meet the team bridging traditional finance and Web3 — driving Urano&apos;s mission
            to bring real-world assets on-chain with compliance, transparency, and institutional
            rigor.
          </Typography>
        </Stack>

        {/* Grid */}
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            columnGap: { xs: 4, md: 6 },
            rowGap: { xs: 5, md: 7 },
            justifyItems: "center",
          }}
        >
          {TEAM.map((member) => (
            <Stack
              key={member.name}
              spacing={1.5}
              alignItems="center"
              sx={{ width: "100%", maxWidth: 260 }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1 / 1",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 600px) 90vw, 260px"
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
              </Box>

              <Stack spacing={0.75} alignItems="center" sx={{ pt: 0.5 }}>
                <Typography
                  className="conthrax"
                  sx={{
                    fontSize: { xs: 17, md: 19 },
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    background: "linear-gradient(90deg, #5EBBC3 0%, #6DE7C2 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {member.name}
                </Typography>

                <Typography
                  className="conthrax"
                  sx={{
                    fontSize: { xs: 12, md: 13 },
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#FFFFFF",
                  }}
                >
                  {member.role}
                </Typography>

                <Typography
                  sx={{
                    fontSize: { xs: 13.5, md: 14.5 },
                    color: "#FFFFFF",
                    lineHeight: 1.6,
                    pt: 0.5,
                  }}
                >
                  {member.description}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
