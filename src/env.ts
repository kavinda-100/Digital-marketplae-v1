import { z } from "zod";

const envSchema = z.object({
  //server side
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
  STRIPE_SECRET_KEY: z.string().min(2),
  STRIPE_WEBHOOK_SECRET_KEY: z.string().min(2),
  //client size
  NEXT_PUBLIC_STRIPE_MONTHLY_PRO_LINK: z.string().url(),
  NEXT_PUBLIC_STRIPE_MONTHLY_PRO_PRICE_ID: z.string().min(2),
  NEXT_PUBLIC_STRIPE_MONTHLY_ENTERPRISE_LINK: z.string().url(),
  NEXT_PUBLIC_STRIPE_MONTHLY_ENTERPRICE_PRICE_ID: z.string().min(2),
});

const env = envSchema.safeParse(process.env);

if (env.success === false) {
  console.error(env.error.errors);
  throw new Error("Environment validation failed:");
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}

export default env;
