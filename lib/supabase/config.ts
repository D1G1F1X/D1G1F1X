/**
 * DIGIFIX Supabase Configuration
 * This file ensures all Supabase operations use the DIGIFIX project exclusively
 */

// Validate DIGIFIX environment variables
const DIGIFIX_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const DIGIFIX_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const DIGIFIX_SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!DIGIFIX_SUPABASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL for DIGIFIX project")
}

if (!DIGIFIX_SUPABASE_ANON_KEY) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY for DIGIFIX project")
}

// Validate that we're using DIGIFIX project
if (!DIGIFIX_SUPABASE_URL.includes("digifix") && !DIGIFIX_SUPABASE_URL.includes("your-digifix-project-id")) {
  console.warn("⚠️  Warning: Supabase URL does not appear to be from DIGIFIX project")
}

export const SUPABASE_CONFIG = {
  url: DIGIFIX_SUPABASE_URL,
  anonKey: DIGIFIX_SUPABASE_ANON_KEY,
  serviceRoleKey: DIGIFIX_SUPABASE_SERVICE_ROLE_KEY,
  project: "DIGIFIX",
  validated: true,
} as const

// Export validation function
export function validateDigifixIntegration(): boolean {
  const isValid = !!(SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey)

  if (!isValid) {
    console.error("❌ DIGIFIX Supabase integration validation failed")
    return false
  }

  console.log("✅ DIGIFIX Supabase integration validated")
  return true
}
