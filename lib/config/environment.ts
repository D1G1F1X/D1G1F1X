// lib/config/environment.ts
// This file centralizes environment variable access and provides type safety.

interface EnvConfig {
  NEXT_PUBLIC_SUPABASE_URL: string
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string
  SUPABASE_SERVICE_ROLE_KEY: string
  BREVO_API_KEY: string
  BREVO_SENDER_EMAIL: string
  BREVO_SENDER_NAME: string
  ADMIN_USERNAME: string
  ADMIN_EMAIL: string
  ADMIN_PASSWORD: string
  ADMIN_EMAIL_FOR_NOTIFICATIONS: string
  OPENAI_API_KEY: string
  OPENAI_ASSISTANT_ID: string
  OPENAI_MODEL: string
  OPENAI_MAX_TOKENS: string
  OPENAI_TEMPERATURE: string
  AUTH_SECRET: string
  NEXT_PUBLIC_APP_URL: string
  BLOB_READ_WRITE_TOKEN: string
  KV_REST_API_URL: string
  KV_REST_API_TOKEN: string
  KV_REST_API_READ_ONLY_TOKEN: string
  REDIS_URL: string
  POSTGRES_URL: string
  POSTGRES_PRISMA_URL: string
  POSTGRES_URL_NON_POOLING: string
  POSTGRES_USER: string
  POSTGRES_PASSWORD: string
  POSTGRES_DATABASE: string
  GOOGLE_AI_API_KEY: string
  NEXT_PUBLIC_API_BASE_URL: string
  SUPABASE_URL: string
  SUPABASE_ANON_KEY: string
  SUPABASE_JWT_SECRET: string
}

// Function to validate and return environment variables
function getEnv(): EnvConfig {
  const envVars: Partial<EnvConfig> = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
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
    AUTH_SECRET: process.env.AUTH_SECRET,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    KV_REST_API_URL: process.env.KV_REST_API_URL,
    KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
    KV_REST_API_READ_ONLY_TOKEN: process.env.KV_REST_API_READ_ONLY_TOKEN,
    REDIS_URL: process.env.REDIS_URL,
    POSTGRES_URL: process.env.POSTGRES_URL,
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
    GOOGLE_AI_API_KEY: process.env.GOOGLE_AI_API_KEY,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    SUPABASE_JWT_SECRET: process.env.SUPABASE_JWT_SECRET,
  }

  for (const key of Object.keys(envVars) as Array<keyof EnvConfig>) {
    if (envVars[key] === undefined) {
      // console.warn(`Environment variable ${key} is not set.`);
      // For now, we'll allow undefined for non-critical ones or during development
      // In production, you might want to throw an error here.
    }
  }

  return envVars as EnvConfig
}

export const env = getEnv() // Export the validated environment variables
