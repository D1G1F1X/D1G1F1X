"use client" // Explicitly mark as client-only

// DIGIFIX Project Client - Browser Side
import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "./types"
import { publicSupabaseConfig } from "./config"

// Singleton instance to prevent multiple GoTrueClient instances
let browserSupabaseClientInstance: ReturnType<typeof createBrowserClient<Database>> | null = null

/**
 * Returns the singleton Supabase browser client.
 * This function always returns the same instance to prevent multiple GoTrueClient warnings.
 */
export function createClient() {
  // Return null for server-side calls, as this client is for the browser only
  if (typeof window === "undefined") {
    return null
  }

  // If an instance already exists, reuse it to prevent multiple GoTrueClient instances
  if (browserSupabaseClientInstance) {
    return browserSupabaseClientInstance
  }

  // Create a new instance only if one doesn't exist
  browserSupabaseClientInstance = createBrowserClient<Database>(
    publicSupabaseConfig.url,
    publicSupabaseConfig.anonKey,
    {
      auth: {
        persistSession: true,
        detectSessionInUrl: true,
        flowType: "pkce",
      },
    },
  )

  return browserSupabaseClientInstance
}

/**
 * Eagerly-initialised singleton instance.
 * Import this when you just need the shared client and don't care about lazy
 * creation timing.
 */
export const supabaseClient = createClient()
