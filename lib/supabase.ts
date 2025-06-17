// lib/supabase.ts
import { createBrowserClient, type SupabaseClient } from "@supabase/ssr"
import { createSupabaseAdminClient as createAdminClient, createMockSupabaseClient } from "./supabase-server" // Import createMockSupabaseClient

// Declare a global variable to hold the client instance.
// This helps in reusing the client across the application in a browser context.
declare global {
  var supabaseBrowserClientInstance: SupabaseClient | undefined
}

// Renamed to getClientSide and exported as named export
export function getClientSide(): SupabaseClient {
  // Check if the client is already initialized in the global scope
  if (globalThis.supabaseBrowserClientInstance) {
    return globalThis.supabaseBrowserClientInstance
  }

  // Check if environment variables are available
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn("Supabase client-side configuration is incomplete. Using mock client.")
    return createMockSupabaseClient() as SupabaseClient // Cast to SupabaseClient for type compatibility
  }

  // If not initialized, create a new client
  const client = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  // Store the newly created client in the global scope for reuse
  globalThis.supabaseBrowserClientInstance = client

  return client
}

// Export a singleton client instance
export const supabase: SupabaseClient = getClientSide()

// Export the admin client creator function
// This function, when called, will return a new admin client instance.
// If you need a singleton admin client, you would call it once and store the result.
// For typical use (e.g. in server actions/route handlers), creating it on demand is fine.
export const supabaseAdmin = createAdminClient

// Note: The original default export is removed as we are now using named exports
// for getClientSide, supabase, and supabaseAdmin.
// If a default export is still needed elsewhere for getSupabaseBrowserClient,
// we can add: export default getClientSide;
// However, the error message specifically asks for named exports.

// Note: For server-side operations (Server Components, Route Handlers, Server Actions),
// you should use a different way to create Supabase clients, typically involving
// createServerClient or createRouteHandlerClient from '@supabase/ssr'
// and passing cookie handling functions. This is usually handled in a separate
// file like 'lib/supabase-server.ts' or directly where needed.
// The "Multiple GoTrueClient instances" warning specifically refers to the browser context.
