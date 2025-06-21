import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// Environment variables - only access what's safe for each context
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing required Supabase environment variables")
}

// ----------  SINGLETON (CLIENT-SIDE) ----------
let supabaseClient: SupabaseClient | undefined

/**
 * Supabase Client - Browser Only
 * Singleton pattern to prevent multiple client instances
 */
export function getClientSide(): SupabaseClient {
  if (typeof window === "undefined") {
    throw new Error("getClientSide should only be called in the browser")
  }

  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: "numoracle-supabase-auth", // Unique storage key
        flowType: "pkce",
      },
    })
  }
  return supabaseClient
}

// ----------  SERVER-SIDE ADMIN (SERVICE ROLE) ----------
let _supabaseAdmin: SupabaseClient | undefined

/**
 * Supabase Admin Client - Server Only
 */
export function getAdminClient(): SupabaseClient {
  if (typeof window !== "undefined") {
    throw new Error("getAdminClient should only be used on the server")
  }

  if (!_supabaseAdmin) {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceRoleKey) {
      throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable")
    }

    _supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  }
  return _supabaseAdmin
}

// Export safe client references
export const supabase = typeof window !== "undefined" ? getClientSide() : null
export const supabaseAdmin = typeof window === "undefined" ? getAdminClient() : null
