import { SUPABASE_CONFIG, validateDigifixIntegration } from "../supabase/config"

/**
 * Middleware to validate DIGIFIX Supabase integration
 */
export function validateSupabaseIntegration() {
  const isValid = validateDigifixIntegration()

  if (!isValid) {
    throw new Error("Invalid Supabase integration - DIGIFIX project required")
  }

  // Additional runtime checks
  if (typeof window === "undefined") {
    // Server-side validation
    const url = SUPABASE_CONFIG.url
    if (!url || (!url.includes("digifix") && !url.includes("your-digifix-project-id"))) {
      console.warn("⚠️  Supabase URL validation warning - ensure DIGIFIX project is configured")
    }
  }

  return true
}

/**
 * Runtime check for unauthorized Supabase usage
 */
export function checkSupabaseUsage(context: string) {
  console.log(`🔍 Supabase usage check: ${context} - DIGIFIX integration`)
  return validateSupabaseIntegration()
}
