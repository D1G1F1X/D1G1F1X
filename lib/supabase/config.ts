import { createClient, type SupabaseClient } from "@supabase/supabase-js"

interface PublicSupabaseConfig {
  url: string
  anonKey: string
}

const publicSupabaseConfig: PublicSupabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
}

// Validate public config on load (client-side safe)
if (!publicSupabaseConfig.url) {
  console.warn("⚠️ NEXT_PUBLIC_SUPABASE_URL is not set. Supabase client features may not work.")
}
if (!publicSupabaseConfig.anonKey) {
  console.warn("⚠️ NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. Supabase client features may not work.")
}

export { publicSupabaseConfig }

// ------------------------------------------------------------------
//  Private (server-side only) config for admin operations
// ------------------------------------------------------------------
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

/**
 * Validates the Supabase integration configuration.
 * Returns true if valid, false otherwise. Logs warnings instead of throwing during build.
 */
function validateDigifixIntegration(): boolean {
  if (
    !publicSupabaseConfig.url ||
    (!publicSupabaseConfig.url.includes("digifix") && !publicSupabaseConfig.url.includes("your-digifix-project-id"))
  ) {
    console.warn("⚠️  Invalid Supabase integration - DIGIFIX project URL not found. Some features may not work.")
    return false
  }
  if (!SUPABASE_SERVICE_ROLE_KEY) {
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
  return createClient(publicSupabaseConfig.url, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
