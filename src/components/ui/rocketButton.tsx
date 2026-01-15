"use client";

import type { CSSProperties, MouseEvent, ReactElement } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { Box, Link, Stack, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";

import theme from "@/theme/theme";
import rocketIcon from "@/assets/images/icons/rocket.svg?url";

const rocketFly = keyframes`
  0%   { transform: translate(0px, 0px) scale(var(--rocketScale)); opacity: 1; }
  35%  { transform: translate(16px, -16px) scale(var(--rocketScale)); opacity: 0; }
  36%  { transform: translate(-16px, 16px) scale(var(--rocketScale)); opacity: 0; }
  60%  { transform: translate(0px, 0px) scale(var(--rocketScale)); opacity: 1; }
  100% { transform: translate(0px, 0px) scale(var(--rocketScale)); opacity: 1; }
`;

type LaunchUAppButtonProps = Readonly<{
  onPress?: (event: MouseEvent<HTMLAnchorElement>) => void;
  href?: string; // optional, defaults to /profile
}>;

export default function LaunchUAppButton({
  onPress,
  href = "/profile",
}: LaunchUAppButtonProps): ReactElement {
  return (
    <Link
      component={NextLink}
      href={"#"}
      underline="none"
      onClick={(e) => {
        onPress?.(e);
      }}
      sx={{ display: "inline-flex" }}
    >
      <Box
        sx={{
          background: theme.palette.uranoGradient,
          border: `1px solid ${theme.palette.headerBorder.main}`,
          borderRadius: 2,
          px: { xs: 1.5, lg: 2 },
          py: { xs: 1.5, lg: 1 },
          mr: 1,
          gap: 1,
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          "&:hover .rocketImg": {
            animation: `${rocketFly} 1500ms ease-in-out infinite`,
          },
          "&:active": {
            border: "1px solid rgba(0, 105, 111, 0.28)",
            background: "linear-gradient(90deg, #5EBBC3 0%, #6DE7C2 100%)",
            boxShadow: "0 0 12.2px 0 #006650 inset",
          },

          // optional: keeps it looking “pressed” while keyboard focused
          "&:focus-visible": {
            outline: "none",
            border: "1px solid rgba(0, 105, 111, 0.28)",
            boxShadow: "0 0 0 3px rgba(94, 187, 195, 0.25)",
          },
        }}
      >
        <Typography
          variant="body1"
          fontWeight={400}
          sx={{
            color: theme.palette.background.default,
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          Launch uApp
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          width={20}
          height={20}
          component="div"
          sx={{
            overflow: "hidden",
            position: "relative",
            "& img.rocketImg": {
              width: "16px !important",
              height: "16px !important",
              display: "block",
              transformOrigin: "center",
              transform: "translate(0px, 0px) scale(var(--rocketScale))",
            },
          }}
        >
          <Image
            src={rocketIcon}
            alt="Rocket Icon"
            width={10}
            height={10}
            className="rocketImg"
            draggable={false}
            style={{ ["--rocketScale" as keyof CSSProperties]: 1 }}
          />
        </Stack>
      </Box>
    </Link>
  );
}
