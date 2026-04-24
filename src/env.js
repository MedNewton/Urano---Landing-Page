import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_THIRDWEB_CLIENT_ID: z.string().min(1),
    NEXT_PUBLIC_URANO_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
    NEXT_PUBLIC_USDC_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
    NEXT_PUBLIC_WETH_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
    NEXT_PUBLIC_UNISWAP_V2_ROUTER: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
    NEXT_PUBLIC_URANO_USDC_DIRECT_PAIR: z
      .enum(["true", "false"])
      .transform((v) => v === "true"),
    NEXT_PUBLIC_URANO_WETH_DIRECT_PAIR: z
      .enum(["true", "false"])
      .transform((v) => v === "true"),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_THIRDWEB_CLIENT_ID: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
    NEXT_PUBLIC_URANO_ADDRESS: process.env.NEXT_PUBLIC_URANO_ADDRESS,
    NEXT_PUBLIC_USDC_ADDRESS: process.env.NEXT_PUBLIC_USDC_ADDRESS,
    NEXT_PUBLIC_WETH_ADDRESS: process.env.NEXT_PUBLIC_WETH_ADDRESS,
    NEXT_PUBLIC_UNISWAP_V2_ROUTER: process.env.NEXT_PUBLIC_UNISWAP_V2_ROUTER,
    NEXT_PUBLIC_URANO_USDC_DIRECT_PAIR: process.env.NEXT_PUBLIC_URANO_USDC_DIRECT_PAIR,
    NEXT_PUBLIC_URANO_WETH_DIRECT_PAIR: process.env.NEXT_PUBLIC_URANO_WETH_DIRECT_PAIR,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
