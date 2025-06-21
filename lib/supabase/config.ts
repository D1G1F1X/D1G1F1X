/**
 * Centralised Supabase configuration.
 *
 * • Client components / browser code should ONLY ever use the
 *   NEXT_PUBLIC variables (they are injected at build-time).
 * • Server code can also access the Service-Role key directly
 *   via `process.env.SUPABASE_SERVICE_ROLE_KEY`.
 *
 * Keeping everything here prevents “file-not-found” errors while
 * ensuring the secret key is never shipped to the browser.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""

// Never expose the service-role key from a module that might be bundled
// for the browser.  Instead, server files should read it directly from
// process.env.  We keep a typed property here so server code that
// `import { SUPABASE_CONFIG }` still works, but the value will be
// `undefined` in any client bundle.
const serviceRoleKey: string | undefined =
  typeof window === "undefined" ? process.env.SUPABASE_SERVICE_ROLE_KEY : undefined

export const SUPABASE_CONFIG = {
  url,
  anonKey,
  serviceRoleKey,
} as const

// Guard against mis-configuration early so we fail loudly in dev.
if (process.env.NODE_ENV !== "production" && (!url || !anonKey)) {
  // eslint-disable-next-line no-console
  console.warn(
    "[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
      "Check your environment variables.",
  )
}

/**
 * Legacy helper kept for backward-compatibility with older code that still
 * imports { validateDigifixIntegration } from "lib/supabase/config".
 * The new configuration is project-agnostic, so this simply returns true.
 */
export function validateDigifixIntegration(): boolean {
  // We no longer couple to a specific Supabase project; always succeed.
  return true
}
