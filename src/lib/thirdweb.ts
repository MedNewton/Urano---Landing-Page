import { createThirdwebClient } from "thirdweb";
import { arbitrum } from "thirdweb/chains";
import { env } from "@/env";

export const client = createThirdwebClient({
  clientId: env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
});

export const chain = arbitrum;
