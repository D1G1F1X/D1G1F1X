// lib/supabase-server.ts
// This file provides a server-side Supabase client instance.
// It's a common pattern to centralize client creation for server components/actions.

import { createServerClient as createClient } from "@supabase/ssr"
import type { cookies } from "next/headers"
import { env } from "@/lib/config/environment" // Assuming env is exported from here

export function createServerClient(cookieStore: ReturnType<typeof cookies>) {
  return createClient({
    supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // The `cookies().set()` method can only be called in a Server Context.
          // We're only concerned about this error when we're on the client.
          // console.warn("Failed to set cookie in server client:", error);
        }
      },
      remove(name: string, options: any) {
        try {
          cookieStore.set({ name, value: "", ...options })
        } catch (error) {
          // The `cookies().set()` method can only be called in a Server Context.
          // We're only concerned about this error when we're on the client.
          // console.warn("Failed to remove cookie in server client:", error);
        }
      },
    },
  })
}
