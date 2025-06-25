// Environment variable utility to safely access and validate env vars

type EnvVar = {
  value: string | undefined
  required: boolean
  default?: string
}

// Environment variable configuration
const envConfig: Record<string, EnvVar> = {
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: { value: process.env.NEXT_PUBLIC_SUPABASE_URL, required: true },
  NEXT_PUBLIC_SUPABASE_ANON_KEY: { value: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, required: true },
  // SUPABASE_SERVICE_ROLE_KEY is server-only, handled by lib/config/environment.ts

  // Vercel KV
  KV_URL: { value: process.env.KV_URL, required: false },
  KV_REST_API_TOKEN: { value: process.env.KV_REST_API_TOKEN, required: false },

  // Google AI
  GOOGLE_AI_API_KEY: { value: process.env.GOOGLE_AI_API_KEY, required: false },

  // Vercel Blob
  BLOB_READ_WRITE_TOKEN: { value: process.env.BLOB_READ_WRITE_TOKEN, required: false },

  // Brevo Email Service (server-only, handled by lib/config/environment.ts)

  // Admin Email Configuration (server-only, handled by lib/config/environment.ts)

  // App URL
  NEXT_PUBLIC_APP_URL: {
    value: process.env.NEXT_PUBLIC_APP_URL,
    required: false,
    default: "http://localhost:3000",
  },

  // OpenAI (server-only, handled by lib/config/environment.ts)
}

// Validate all required environment variables on startup
export function validateEnv(): string[] {
  const missingVars: string[] = []

  Object.entries(envConfig).forEach(([key, config]) => {
    // Only validate NEXT_PUBLIC_ variables here if this file is used on client
    if (config.required && !config.value && key.startsWith("NEXT_PUBLIC_")) {
      missingVars.push(key)
    }
  })

  return missingVars
}

// Get an environment variable with type safety
export function getEnv(key: keyof typeof envConfig): string {
  const config = envConfig[key]

  if (!config) {
    throw new Error(`Environment variable ${key} is not configured in lib/env.ts`)
  }

  if (!config.value) {
    if (config.required) {
      throw new Error(`Required environment variable ${key} is not set`)
    }
    return config.default || ""
  }

  return config.value
}

// Check if we're running on the client side
export const isClient = typeof window !== "undefined"

// Safe environment variable getter for client-side code
export function getClientEnv(key: string): string | undefined {
  if (isClient) {
    // Only return NEXT_PUBLIC_ variables on client
    if (key.startsWith("NEXT_PUBLIC_")) {
      return process.env[key]
    }
    return undefined
  }
  // On server, allow access to all configured envs
  return getEnv(key as keyof typeof envConfig)
}

// Check if we're in development mode
export const isDev = process.env.NODE_ENV === "development"

// Check if we're in production mode
export const isProd = process.env.NODE_ENV === "production"

// Initialize and validate environment on startup
// This part will run on both client and server if imported universally
const missingVars = validateEnv()
if (missingVars.length > 0) {
  console.warn(`Missing required environment variables: ${missingVars.join(", ")}`)
}
