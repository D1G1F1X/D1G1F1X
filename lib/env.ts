// Client-safe environment configuration
// Only NEXT_PUBLIC_ prefixed variables should be defined here

export const env = {
  // Public environment variables (safe for client-side)
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  NODE_ENV: process.env.NODE_ENV || "development",
} as const

// Validation for required public environment variables
export function validatePublicEnv() {
  const missing = []

  if (!env.NEXT_PUBLIC_SUPABASE_URL) {
    missing.push("NEXT_PUBLIC_SUPABASE_URL")
  }

  if (!env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY")
  }

  if (missing.length > 0) {
    console.warn("Missing required public environment variables:", missing)
    return false
  }

  return true
}

// Server-only environment variables should be accessed directly in server components/API routes
// or through the environmentManager in lib/config/environment.ts
