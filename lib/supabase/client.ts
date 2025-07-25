import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "./types"

let supabase: ReturnType<typeof createBrowserClient> | undefined

export function createClient() {
  if (!supabase) {
    supabase = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  }
  return supabase
}
