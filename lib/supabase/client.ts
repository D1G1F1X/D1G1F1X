// DIGIFIX Project Client - Browser Side
import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "./types"
import { SUPABASE_CONFIG } from "./config"

let client: ReturnType<typeof createBrowserClient<Database>> | undefined

export function createClient() {
  if (client) return client

  client = createBrowserClient<Database>(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey)

  return client
}
