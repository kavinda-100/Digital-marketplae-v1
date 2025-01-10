import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    KINDE_CLIENT_ID: z.string().min(2),
    KINDE_CLIENT_SECRET: z.string().min(2),
    KINDE_ISSUER_URL: z.string().url(),
    KINDE_SITE_URL: z.string().url(),
    KINDE_POST_LOGOUT_REDIRECT_URL: z.string().url(),
    KINDE_POST_LOGIN_REDIRECT_URL: z.string().url(),
    DOMAIN_NAME: z.string().min(2).url(),
    UPLOADTHING_TOKEN: z.string().min(2),
  },
  client: {
    NEXT_PUBLIC_STRIPE_MONTHLY_PRO_LINK: z.string().url(),
    NEXT_PUBLIC_STRIPE_MONTHLY_PRO_PRICE_ID: z.string().min(2),
    NEXT_PUBLIC_STRIPE_MONTHLY_ENTERPRISE_LINK: z.string().url(),
    NEXT_PUBLIC_STRIPE_MONTHLY_ENTERPRICE_PRICE_ID: z.string().min(2),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    KINDE_CLIENT_ID: process.env.KINDE_CLIENT_ID,
    KINDE_CLIENT_SECRET: process.env.KINDE_CLIENT_SECRET,
    KINDE_ISSUER_URL: process.env.KINDE_ISSUER_URL,
    KINDE_SITE_URL: process.env.KINDE_SITE_URL,
    KINDE_POST_LOGOUT_REDIRECT_URL: process.env.KINDE_POST_LOGOUT_REDIRECT_URL,
    KINDE_POST_LOGIN_REDIRECT_URL: process.env.KINDE_POST_LOGIN_REDIRECT_URL,
    DOMAIN_NAME: process.env.DOMAIN_NAME,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    NEXT_PUBLIC_STRIPE_MONTHLY_PRO_LINK:
      process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRO_LINK,
    NEXT_PUBLIC_STRIPE_MONTHLY_PRO_PRICE_ID:
      process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRO_PRICE_ID,
    NEXT_PUBLIC_STRIPE_MONTHLY_ENTERPRISE_LINK:
      process.env.NEXT_PUBLIC_STRIPE_MONTHLY_ENTERPRISE_LINK,
    NEXT_PUBLIC_STRIPE_MONTHLY_ENTERPRICE_PRICE_ID:
      process.env.NEXT_PUBLIC_STRIPE_MONTHLY_ENTERPRICE_PRICE_ID,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
