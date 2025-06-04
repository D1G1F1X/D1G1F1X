"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createServerSupabaseClient() {
  const cookieStore = cookies()

  // Check if environment variables are available
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn("Supabase environment variables are missing. Using mock auth instead.")
    return null
  }

  try {
    return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name, options) {
          cookieStore.delete({ name, ...options })
        },
      },
    })
  } catch (error) {
    console.error("Failed to create Supabase server client:", error)
    return null
  }
}

// This function will be used to gradually migrate from mock auth to Supabase auth
export async function getAuthUser() {
  const supabase = await createServerSupabaseClient()

  if (!supabase) {
    // Fall back to mock auth if Supabase is not available
    const { getCurrentUser } = await import("./auth")
    return getCurrentUser()
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}
