import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "./types"

export function createClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role key for server-side operations
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `cookies().set()` method can only be called from a Server Component or Server Action.
            // This error is typically ignored if we're only reading cookies on a Server Component.
            // console.warn("Could not set cookie from server component:", error);
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options })
          } catch (error) {
            // console.warn("Could not remove cookie from server component:", error);
          }
        },
      },
    },
  )
}

// Export getServerClient for compatibility
export const getServerClient = createClient

// Export createServerClient directly as requested
export { createServerClient }
