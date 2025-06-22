// DIGIFIX Project Client - Browser Side
import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "./types"
import { publicSupabaseConfig } from "./config"

// Use globalThis to ensure the client is truly a singleton across HMR updates
declare global {
  var supabaseBrowserClient: ReturnType<typeof createBrowserClient<Database>> | undefined
}

export function createClient() {
  if (typeof window === "undefined") {
    // This client is for the browser, return undefined or throw an error if called on server
    // For Next.js App Router, server components should use createServerClient
    return undefined
  }

  if (!globalThis.supabaseBrowserClient) {
    globalThis.supabaseBrowserClient = createBrowserClient<Database>(
      publicSupabaseConfig.url,
      publicSupabaseConfig.anonKey,
    )
  }

  return globalThis.supabaseBrowserClient
}
