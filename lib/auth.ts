"use server"

/**
 * Minimal auth helpers required by admin pages.
 * If you later need richer behaviour, expand these functions.
 */
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/* ---------- Lazy (per-request) server client ---------- */
function createServerClient(): SupabaseClient {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Cookie: cookies().toString() } },
  })
}

/* ---------- PUBLIC HELPERS ---------- */

/**
 * Returns the current authenticated user object or `null` if nobody is signed in.
 */
export async function getCurrentUser() {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session?.user ?? null
}

/**
 * Enforces that a user is authenticated.
 * If not, either throws or redirects to the provided path (default “/login”).
 */
export async function requireAuth(redirectTo: string | URL = "/login") {
  const user = await getCurrentUser()
  if (!user) {
    redirect(redirectTo.toString())
  }
  return user
}
