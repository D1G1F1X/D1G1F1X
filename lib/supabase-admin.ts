import { createClient } from "@supabase/supabase-js"

// Server-side admin client factory
export function createAdminClient() {
  if (typeof window !== "undefined") {
    throw new Error("Admin client should only be used on the server")
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing required Supabase environment variables for admin client")
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
