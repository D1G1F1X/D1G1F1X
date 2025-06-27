"use client" // Explicitly mark as client-only

// DIGIFIX Project Client - Browser Side
import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "./types"
import { publicSupabaseConfig } from "./config"

// Declare global variable for the singleton instance
declare global {
  var __numoracle_supabase_client_instance: ReturnType<typeof createBrowserClient<Database>> | undefined
}

// Eagerly initialize the client once when the module is loaded in the browser.
// This ensures createBrowserClient is called only once per module evaluation.
const browserSupabaseClient = (() => {
  if (typeof window === "undefined") {
    // Return undefined for server-side calls, as this client is for the browser
    return undefined
  }

  // If an instance already exists globally (e.g., due to HMR), reuse it.
  // In development, HMR might cause this module to be re-evaluated,
  // leading to "Multiple GoTrueClient instances" warnings. This is generally
  // harmless in development and the singleton ensures only one client is active
  // per browser session.
  if (globalThis.__numoracle_supabase_client_instance) {
    return globalThis.__numoracle_supabase_client_instance
  }

  // Otherwise, create a new instance and store it globally.
  const newClient = createBrowserClient<Database>(publicSupabaseConfig.url, publicSupabaseConfig.anonKey, {
    auth: {
      persistSession: true,
      detectSessionInUrl: true,
      flowType: "pkce",
    },
  })
  globalThis.__numoracle_supabase_client_instance = newClient
  return newClient
})()

// -----------------------------------------------------------------------------
// Public API ------------------------------------------------------------------
// -----------------------------------------------------------------------------

/**
 * Returns the singleton Supabase browser client.
 * This function always returns the same instance.
 */
export function createClient() {
  return browserSupabaseClient
}

/**
 * Eagerly-initialised singleton instance.
 * Import this when you just need the shared client and don’t care about lazy
 * creation timing.
 */
export const supabaseClient = browserSupabaseClient
