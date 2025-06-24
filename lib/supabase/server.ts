import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * Internal helper to create a tolerant Supabase client that does **not**
 * throw during the build if SUPABASE_SERVICE_ROLE_KEY is missing.
 */
function _makeClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) {
    console.warn("⚠️  NEXT_PUBLIC_SUPABASE_URL is not set - returning mock Supabase client.")
    // @ts-ignore – very minimal mock for build-time/static generation
    return { from: () => ({ select: () => ({ data: null, error: new Error("Supabase URL missing") }) }) }
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!serviceRoleKey) {
    console.warn(
      "⚠️  SUPABASE_SERVICE_ROLE_KEY is not set. " +
        "Falling back to NEXT_PUBLIC_SUPABASE_ANON_KEY for build-time operations.",
    )
  }

  const key = serviceRoleKey || anonKey || ""
  return createClient(url, key, {
    auth: {
      persistSession: false,
    },
  })
}

/**
 * A singleton Supabase client for server-side usage.
 * Falls back gracefully when env vars are missing so the build never fails.
 */
export const supabaseServerClient = _makeClient()

/**
 * Creates a fresh server-side Supabase client. Falls back to a mocked client
 * in build/preview if env vars are missing so the app never crashes.
 * This matches the original `createServerClient` export name.
 */
export function createServerClient(): SupabaseClient {
  return _makeClient()
}

/**
 * Re-uses a singleton Supabase client per request to avoid multiple connections.
 * This matches the original `getServerClient` export name.
 */
export function getServerClient(): SupabaseClient {
  return supabaseServerClient // Use the already created singleton
}

/**
 * Alias kept for legacy imports.
 */
export const createServerSupabaseClient = createServerClient
