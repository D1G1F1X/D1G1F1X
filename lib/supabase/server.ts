import { createClient } from "@supabase/supabase-js"

const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!serviceRoleKey) {
  console.warn("⚠️  SUPABASE_SERVICE_ROLE_KEY not set. Using anon key for build-time operations only.")
}

/** use service role when available, otherwise fall back to anon for static build */
const supabaseKey = serviceRoleKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
export const supabaseServerClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, supabaseKey)
