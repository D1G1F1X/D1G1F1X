/**
 * Previously this file threw when the SUPABASE_SERVICE_ROLE_KEY
 * environment variable was missing, which caused build failures on
 * preview deployments.  We now log a warning instead so the app still
 * works with the public anon key while clearly indicating that the
 * service-role key is recommended for production.
 */

export function validateSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const role = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url) {
    console.warn(
      "[supabase] NEXT_PUBLIC_SUPABASE_URL is not set – certain features " +
        "that require server-side Supabase will be disabled.",
    )
  }

  if (!role) {
    console.warn(
      "[supabase] SUPABASE_SERVICE_ROLE_KEY is not set – falling back to " +
        "the public anon key for build/preview.  Provide the service-role " +
        "key in the Vercel env vars for full database privileges.",
    )
  }

  // Return a boolean so callers can decide what to do at runtime.
  return Boolean(url && (role || anon))
}
