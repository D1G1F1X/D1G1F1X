import { createClient, type SupabaseClient } from "@supabase/supabase-js"

export const SUPABASE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
}

// ------------------------------------------------------------------
//  Public (client-side safe) config expected by client helpers
// ------------------------------------------------------------------
export const publicSupabaseConfig = {
  url: SUPABASE_CONFIG.url,
  anonKey: SUPABASE_CONFIG.anonKey,
} as const

/**
 * Validates the Supabase integration configuration.
 * Returns true if valid, false otherwise. Logs warnings instead of throwing during build.
 */
export function validateDigifixIntegration(): boolean {
  if (
    !SUPABASE_CONFIG.url ||
    (!SUPABASE_CONFIG.url.includes("digifix") && !SUPABASE_CONFIG.url.includes("your-digifix-project-id"))
  ) {
    console.warn("⚠️  Invalid Supabase integration - DIGIFIX project URL not found. Some features may not work.")
    return false
  }
  if (!SUPABASE_CONFIG.serviceRoleKey) {
    console.warn(
      "⚠️  Missing SUPABASE_SERVICE_ROLE_KEY env var. Admin operations will be disabled or mocked during build/preview.",
    )
    return false
  }
  return true
}

/**
 * Returns a Supabase admin client. If SUPABASE_SERVICE_ROLE_KEY is missing,
 * it returns a mock client during build/preview to prevent crashes.
 */
export function getSupabaseAdminClient(): SupabaseClient {
  if (!validateDigifixIntegration()) {
    // Return a mock client if the service role key is missing, to prevent build failures.
    // @ts-ignore - This is a mock for build-time tolerance.
    return {
      from: () => ({
        select: () => ({
          data: null,
          error: new Error("Supabase Admin Client not fully configured (missing service role key)"),
        }),
        insert: () => ({
          data: null,
          error: new Error("Supabase Admin Client not fully configured (missing service role key)"),
        }),
        update: () => ({
          data: null,
          error: new Error("Supabase Admin Client not fully configured (missing service role key)"),
        }),
        delete: () => ({
          data: null,
          error: new Error("Supabase Admin Client not fully configured (missing service role key)"),
        }),
      }),
      auth: {
        admin: {
          createUser: () =>
            Promise.resolve({ data: null, error: new Error("Supabase Admin Client not fully configured") }),
          deleteUser: () =>
            Promise.resolve({ data: null, error: new Error("Supabase Admin Client not fully configured") }),
        },
      },
    }
  }
  return createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
