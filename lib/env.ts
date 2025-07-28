import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

interface Env {
  OPENAI_API_KEY: string | undefined
  OPENAI_ASSISTANT_ID: string | undefined
  ANTHROPIC_API_KEY: string | undefined
  MISTRAL_API_KEY: string | undefined
  COHERE_API_KEY: string | undefined
  PERPLEXITY_API_KEY: string | undefined
  GROQ_API_KEY: string | undefined
  XAI_API_KEY: string | undefined
  DEEPINFRA_API_KEY: string | undefined
  FAL_KEY: string | undefined
}

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    AUTH_SECRET: process.env.NODE_ENV === "production" ? z.string() : z.string().optional(),
    AUTH_URL: z.preprocess(
      // This makes sure that a non-empty string is a URL
      // and then validates it.
      (str) => process.env.VERCEL_URL ?? str,
      process.env.VERCEL_URL ? z.string() : z.string().url(),
    ),
    POSTGRES_URL: z.string().url(),
    POSTGRES_PRISMA_URL: z.string().url(),
    POSTGRES_URL_NON_POOLING: z.string().url(),
    POSTGRES_USER: z.string(),
    POSTGRES_HOST: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_DATABASE: z.string(),
    SUPABASE_URL: z.string().url(),
    SUPABASE_SERVICE_ROLE_KEY: z.string(),
    SUPABASE_JWT_SECRET: z.string(),
    KV_REST_API_URL: z.string().url(),
    KV_REST_API_TOKEN: z.string(),
    KV_REST_API_READ_ONLY_TOKEN: z.string(),
    REDIS_URL: z.string().url(),
    BLOB_READ_WRITE_TOKEN: z.string(),
    BREVO_API_KEY: z.string(),
    BREVO_SENDER_EMAIL: z.string().email(),
    BREVO_SENDER_NAME: z.string(),
    ADMIN_USERNAME: z.string(),
    ADMIN_EMAIL: z.string().email(),
    ADMIN_PASSWORD: z.string(),
    ADMIN_EMAIL_FOR_NOTIFICATIONS: z.string().email(),
    OPENAI_API_KEY: z.string().optional(),
    OPENAI_ASSISTANT_ID: z.string().optional(),
    OPENAI_MODEL: z.string().optional(),
    OPENAI_MAX_TOKENS: z.string().optional(),
    OPENAI_TEMPERATURE: z.string().optional(),
    GOOGLE_AI_API_KEY: z.string().optional(),
    UPLOAD_SECRET: z.string(),
    ANTHROPIC_API_KEY: z.string().optional(),
    MISTRAL_API_KEY: z.string().optional(),
    COHERE_API_KEY: z.string().optional(),
    PERPLEXITY_API_KEY: z.string().optional(),
    GROQ_API_KEY: z.string().optional(),
    XAI_API_KEY: z.string().optional(),
    DEEPINFRA_API_KEY: z.string().optional(),
    FAL_KEY: z.string().optional(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtime, so the env
   * vars has to be accessed with `process.env.VAR_NAME`.
   * @link https://nextjs.org/docs/messages/edge-env-unbundled
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_URL: process.env.AUTH_URL,
    POSTGRES_URL: process.env.POSTGRES_URL,
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_JWT_SECRET: process.env.SUPABASE_JWT_SECRET,
    KV_REST_API_URL: process.env.KV_REST_API_URL,
    KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
    KV_REST_API_READ_ONLY_TOKEN: process.env.KV_REST_API_READ_ONLY_TOKEN,
    REDIS_URL: process.env.REDIS_URL,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    BREVO_API_KEY: process.env.BREVO_API_KEY,
    BREVO_SENDER_EMAIL: process.env.BREVO_SENDER_EMAIL,
    BREVO_SENDER_NAME: process.env.BREVO_SENDER_NAME,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    ADMIN_EMAIL_FOR_NOTIFICATIONS: process.env.ADMIN_EMAIL_FOR_NOTIFICATIONS,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_ASSISTANT_ID: process.env.OPENAI_ASSISTANT_ID,
    OPENAI_MODEL: process.env.OPENAI_MODEL,
    OPENAI_MAX_TOKENS: process.env.OPENAI_MAX_TOKENS,
    OPENAI_TEMPERATURE: process.env.OPENAI_TEMPERATURE,
    GOOGLE_AI_API_KEY: process.env.GOOGLE_AI_API_KEY,
    UPLOAD_SECRET: process.env.UPLOAD_SECRET,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY,
    COHERE_API_KEY: process.env.COHERE_API_KEY,
    PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    XAI_API_KEY: process.env.XAI_API_KEY,
    DEEPINFRA_API_KEY: process.env.DEEPINFRA_API_KEY,
    FAL_KEY: process.env.FAL_KEY,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that `process.env` is typed.
   */
  emptyStringAsUndefined: true,
})
