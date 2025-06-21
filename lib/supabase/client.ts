// DIGIFIX Project Client - Browser Side
import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "./types"
import { publicSupabaseConfig } from "./config"

let client: ReturnType<typeof createBrowserClient<Database>> | undefined

export function createClient() {
  if (client) return client

  client = createBrowserClient<Database>(publicSupabaseConfig.url, publicSupabaseConfig.anonKey)

  return client
}
