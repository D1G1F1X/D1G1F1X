// Environment variable utility to safely access and validate env vars

type EnvVar = {
  value: string | undefined
  required: boolean
  default?: string
  clientSafe?: boolean // Whether this can be accessed on client side
}

// Environment variable configuration
const envConfig: Record<string, EnvVar> = {
  // Supabase (client-safe)
  NEXT_PUBLIC_SUPABASE_URL: { value: process.env.NEXT_PUBLIC_SUPABASE_URL, required: true, clientSafe: true },
  NEXT_PUBLIC_SUPABASE_ANON_KEY: { value: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, required: true, clientSafe: true },

  // Server-only variables
  SUPABASE_SERVICE_ROLE_KEY: { value: process.env.SUPABASE_SERVICE_ROLE_KEY, required: false },
  KV_URL: { value: process.env.KV_URL, required: false },
  KV_REST_API_TOKEN: { value: process.env.KV_REST_API_TOKEN, required: false },
  GOOGLE_AI_API_KEY: { value: process.env.GOOGLE_AI_API_KEY, required: false },
  BLOB_READ_WRITE_TOKEN: { value: process.env.BLOB_READ_WRITE_TOKEN, required: false },
  BREVO_API_KEY: { value: process.env.BREVO_API_KEY, required: true }, // Made required
  BREVO_SENDER_EMAIL: { value: process.env.BREVO_SENDER_EMAIL, required: false, default: "noreply@numoracle.com" },
  BREVO_SENDER_NAME: { value: process.env.BREVO_SENDER_NAME, required: false, default: "Numoracle" },
  ADMIN_EMAIL_FOR_NOTIFICATIONS: {
    value: process.env.ADMIN_EMAIL_FOR_NOTIFICATIONS,
    required: true,
    default: "admin@numoracle.com",
  }, // Made required

  // Admin Credentials (Server-only) - Re-adding these as they might have been lost
  ADMIN_USERNAME: { value: process.env.ADMIN_USERNAME, required: true, default: "admin" },
  ADMIN_EMAIL: { value: process.env.ADMIN_EMAIL, required: true, default: "admin@numoracle.com" },
  ADMIN_PASSWORD: { value: process.env.ADMIN_PASSWORD, required: true, default: "numoracle" },

  // App URL (client-safe)
  NEXT_PUBLIC_APP_URL: {
    value: process.env.NEXT_PUBLIC_APP_URL,
    required: false,
    default: "http://localhost:3000",
    clientSafe: true,
  },
  // Explicitly mark NODE_ENV as client-safe if accessed via getEnv
  NODE_ENV: { value: process.env.NODE_ENV, required: true, clientSafe: true },
}

// Validate all required environment variables on startup
export function validateEnv(): string[] {
  const missingVars: string[] = []

  Object.entries(envConfig).forEach(([key, config]) => {
    if (config.required && !config.value) {
      missingVars.push(key)
    }
  })

  return missingVars
}

// Get an environment variable with type safety
export function getEnv(key: keyof typeof envConfig): string {
  const config = envConfig[key]

  if (!config) {
    throw new Error(`Environment variable ${key} is not configured`)
  }

  // Check if trying to access server-only variable on client
  if (typeof window !== "undefined" && !config.clientSafe) {
    throw new Error(`${key} cannot be accessed on the client.`)
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
  return getEnv(key as keyof typeof envConfig)
}

// Check if we're in development mode
export const isDev = process.env.NODE_ENV === "development"

// Check if we're in production mode
export const isProd = process.env.NODE_ENV === "production"

// Initialize and validate environment on startup (server-side only)
if (typeof window === "undefined") {
  const missingVars = validateEnv()
  if (missingVars.length > 0) {
    console.warn(`Missing required environment variables: ${missingVars.join(", ")}`)
  }
}
