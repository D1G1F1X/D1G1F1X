import { createClient } from "@supabase/supabase-js"
import type { SupabaseClient } from "@supabase/supabase-js"

/**
 * Creates a fresh server-side Supabase client. Falls back to a mocked client
 * in build/preview if env vars are missing so the app never crashes.
 */
export function createServerClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY
  if (!url || !key) {
    // eslint-disable-next-line no-console
    console.warn("[supabase] Missing env vars – returning mock client.")
    // @ts-expect-error – we only need the shape to satisfy TS, methods throw if used
    return new Proxy({}, { get: () => () => Promise.reject("Supabase unavailable") })
  }
  return createClient(url, key)
}

/**
 * Re-uses a singleton Supabase client per request to avoid multiple connections.
 */
export function getServerClient(): SupabaseClient {
  // @ts-ignore – stash on global for reuse between hot-reloads in dev
  if (!global.__SUPABASE_SERVER_CLIENT__) {
    // @ts-ignore
    global.__SUPABASE_SERVER_CLIENT__ = createServerClient()
  }
  // @ts-ignore
  return global.__SUPABASE_SERVER_CLIENT__ as SupabaseClient
}

/**
 * Alias kept for legacy imports.
 */
export const createServerSupabaseClient = createServerClient
