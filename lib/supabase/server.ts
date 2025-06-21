// DIGIFIX Project Client - Server Side
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "./types"
import { SUPABASE_CONFIG } from "./config"

export async function createServerSupabaseClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(SUPABASE_CONFIG.url, SUPABASE_CONFIG.serviceRoleKey!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: any) {
        cookieStore.delete({ name, ...options })
      },
    },
  })
}
