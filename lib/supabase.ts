import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// These env vars must exist in your Vercel project settings
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// ----------  SINGLETON (CLIENT-SIDE) ----------
let supabaseClient: SupabaseClient | undefined

/**
 * getClientSide()
 * Always returns the same Supabase instance in the browser.
 * Only use this for non-auth features like blob storage.
 */
export function getClientSide(): SupabaseClient {
  if (typeof window === "undefined") {
    throw new Error("getClientSide should only be called in the browser")
  }
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseClient
}

// Export the singleton client instance for non-auth features
export const supabase = typeof window !== "undefined" ? getClientSide() : ({} as SupabaseClient)

// ----------  SERVER-SIDE ADMIN (SERVICE ROLE) ----------
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

let _supabaseAdmin: SupabaseClient | undefined
export function getAdminClient(): SupabaseClient {
  if (typeof window !== "undefined") {
    throw new Error("getAdminClient should only be used on the server")
  }
  if (!_supabaseAdmin) {
    if (!supabaseServiceRoleKey) {
      throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY env var")
    }
    _supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)
  }
  return _supabaseAdmin
}

/** Re-usable, singleton Supabase Admin client (server-only) */
export const supabaseAdmin = typeof window === "undefined" ? getAdminClient() : ({} as SupabaseClient)
