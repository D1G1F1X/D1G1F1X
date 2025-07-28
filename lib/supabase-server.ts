// Legacy shim: forward every export to the new tolerant client in lib/supabase/server.ts
export * from "./supabase/server"

// This file now forwards `createServerClient`, `getServerClient`, `createServerSupabaseClient`, and `supabaseServerClient` (plus any future helpers) so all existing imports keep working without the build-time env-var crash.
