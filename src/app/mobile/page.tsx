import { Stack } from "@mui/material";

import MobileHero from "@/components/sections/mobile/mobileHero";

export default function Home() {

  return (
    <Stack component="main" width="100%" height="100%" minHeight="100dvh">
        <MobileHero />
        <Stack width="100%" height="100%" minHeight="100dvh">

        </Stack>
    </Stack>
  );
}
