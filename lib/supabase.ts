import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { SUPABASE_CONFIG, validateDigifixIntegration } from "./supabase/config"

// DIGIFIX Supabase Configuration - Validated
const supabaseServiceRoleKey = SUPABASE_CONFIG.serviceRoleKey

// Validate DIGIFIX integration on initialization
if (typeof window === "undefined") {
  validateDigifixIntegration()
}

// ----------  SERVER-SIDE ADMIN (SERVICE ROLE) ----------

let _supabaseAdmin: SupabaseClient | undefined

/**
 * DIGIFIX Supabase Admin Client - Server Only
 * Uses DIGIFIX service role key for admin operations
 */
export function getAdminClient(): SupabaseClient {
  if (typeof window !== "undefined") {
    throw new Error("getAdminClient should only be used on the server")
  }
  if (!_supabaseAdmin) {
    if (!supabaseServiceRoleKey) {
      throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY env var")
    }
    _supabaseAdmin = createClient(SUPABASE_CONFIG.url, supabaseServiceRoleKey)
  }
  return _supabaseAdmin
}

/** Re-usable, singleton Supabase Admin client (server-only) */
export const supabaseAdmin = typeof window === "undefined" ? getAdminClient() : ({} as SupabaseClient)
