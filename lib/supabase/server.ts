import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// Declare global variable for the singleton instance on the server
declare global {
  var __numoracle_supabase_server_client_instance: SupabaseClient | undefined
}

/**
 * Internal helper to create a tolerant Supabase client that does **not**
 * throw during the build if SUPABASE_SERVICE_ROLE_KEY is missing.
 * This function is designed to be called only once to create the singleton.
 */
function _createAndCacheServerClient(): SupabaseClient {
  if (globalThis.__numoracle_supabase_server_client_instance) {
    return globalThis.__numoracle_supabase_server_client_instance
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) {
    console.warn("⚠️  NEXT_PUBLIC_SUPABASE_URL is not set - returning mock Supabase client.")
    // @ts-ignore – very minimal mock for build-time/static generation
    const mockClient = { from: () => ({ select: () => ({ data: null, error: new Error("Supabase URL missing") }) }) }
    globalThis.__numoracle_supabase_server_client_instance = mockClient
    return mockClient
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
  const newClient = createClient(url, key, {
    auth: {
      persistSession: false,
    },
  })
  globalThis.__numoracle_supabase_server_client_instance = newClient
  return newClient
}

// Eagerly initialize the server client once when the module is loaded
export const supabaseServerClient = _createAndCacheServerClient()

/**
 * Creates a fresh server-side Supabase client. Falls back to a mocked client
 * in build/preview if env vars are missing so the app never crashes.
 * This function now returns the singleton instance.
 */
export function createServerClient(): SupabaseClient {
  return supabaseServerClient // Always return the cached singleton
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
