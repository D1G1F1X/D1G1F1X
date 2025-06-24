// DIGIFIX Project Client - Browser Side
import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "./types"
import { publicSupabaseConfig } from "./config"

// Use a more specific global key to avoid conflicts
declare global {
  var __numoracle_supabase_client: ReturnType<typeof createBrowserClient<Database>> | undefined
}

export function createClient() {
  if (typeof window === "undefined") {
    // This client is for the browser, return undefined for server-side calls
    return undefined
  }

  // Use a singleton pattern with a specific key
  if (!globalThis.__numoracle_supabase_client) {
    globalThis.__numoracle_supabase_client = createBrowserClient<Database>(
      publicSupabaseConfig.url,
      publicSupabaseConfig.anonKey,
      {
        // Add options to prevent multiple instances
        auth: {
          persistSession: true,
          detectSessionInUrl: true,
          flowType: "pkce",
        },
      },
    )
  }

  return globalThis.__numoracle_supabase_client
}

// Export a singleton instance for consistent usage
export const supabaseClient = typeof window !== "undefined" ? createClient() : null
