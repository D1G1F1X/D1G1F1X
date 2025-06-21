// Numoracle Project Client - Server Side
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "./types"

export async function createServerSupabaseClient() {
  const cookieStore = cookies()

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY // Directly access here

  if (!SUPABASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL for server-side Supabase client.")
  }
  if (!SUPABASE_ANON_KEY) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY for server-side Supabase client.")
  }
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY for server-side Supabase client.")
  }

  return createServerClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    // Use service role key here
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
