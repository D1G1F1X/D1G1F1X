/**
 * Numoracle Supabase Configuration
 * This file provides public (client-side) Supabase configuration.
 * Server-side configuration, including sensitive keys, is handled directly in server-side files.
 */

// Public (client-side safe) environment variables
const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable.")
}

if (!NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable.")
}

// Configuration for client-side Supabase instance
export const publicSupabaseConfig = {
  url: NEXT_PUBLIC_SUPABASE_URL,
  anonKey: NEXT_PUBLIC_SUPABASE_ANON_KEY,
} as const

// Optional: A simple validation function for general Supabase setup
export function validateSupabaseIntegration(): boolean {
  const isValid = !!(NEXT_PUBLIC_SUPABASE_URL && NEXT_PUBLIC_SUPABASE_ANON_KEY)

  if (!isValid) {
    console.error("❌ Supabase integration validation failed: Missing URL or Anon Key.")
    return false
  }

  console.log("✅ Numoracle Supabase integration validated.")
  return true
}
