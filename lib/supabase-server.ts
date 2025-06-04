import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// Define a type for the mock client to ensure it matches SupabaseClient structure partially
type MockSupabaseClient = Partial<SupabaseClient>

// Create a mock Supabase client that won't throw errors
function createMockSupabaseClient(): MockSupabaseClient {
  const handler = {
    get(target: any, prop: string | symbol) {
      if (prop === "then" || prop === "catch" || prop === "finally") {
        // Allow promise-like behavior for functions returning promises
        return undefined
      }
      if (typeof target[prop] === "function") {
        return (...args: any[]) => {
          console.warn(`Mock Supabase client: ${String(prop)} called with`, args)
          // Return a resolved promise for async methods to avoid breaking chains
          if (
            String(prop).startsWith("get") ||
            String(prop).startsWith("select") ||
            String(prop).startsWith("insert") ||
            String(prop).startsWith("update") ||
            String(prop).startsWith("delete") ||
            String(prop).startsWith("rpc") ||
            String(prop).includes("User")
          ) {
            return Promise.resolve({ data: null, error: new Error("Mock Supabase: Operation not performed.") })
          }
          // For synchronous methods or methods where a specific return structure is critical
          if (prop === "from") return target // Allow chaining .from().select()
          if (prop === "select")
            return {
              eq: () => Promise.resolve({ data: [], error: null }),
              single: () => Promise.resolve({ data: null, error: null }),
            }
          if (prop === "getPublicUrl") return { data: { publicUrl: "" } }
          return createMockSupabaseClient() // Return a new mock for further chaining
        }
      }
      return target[prop]
    },
  }

  const mock = {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      admin: {
        createUser: async () => ({ data: { user: null }, error: new Error("Supabase not configured") }),
        deleteUser: async () => ({ data: {}, error: new Error("Supabase not configured") }),
      } as any, // Use 'as any' for simplicity if admin methods are complex to mock fully
    },
    from: function () {
      return this
    } as any, // Return 'this' to allow chaining like .from().select()
    storage: {
      from: function () {
        return this
      } as any,
      upload: async () => ({ data: null, error: new Error("Supabase not configured") }),
      getPublicUrl: () => ({ data: { publicUrl: "" } }),
    },
    rpc: async () => ({ data: null, error: new Error("Supabase not configured") }),
    // Add other common methods if needed by your specific mock usage
    select: () => ({
      eq: () => Promise.resolve({ data: [], error: null }),
      single: () => Promise.resolve({ data: null, error: null }),
    }),
    insert: async () => ({ data: null, error: new Error("Supabase not configured") }),
    update: async () => ({ data: null, error: new Error("Supabase not configured") }),
    delete: async () => ({ data: null, error: new Error("Supabase not configured") }),
  }

  return new Proxy(mock, handler) as MockSupabaseClient
}

// This file should only be imported in server components or server actions
// It uses the service role key which has admin privileges
export const createSupabaseAdminClient = (): SupabaseClient | MockSupabaseClient => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn("Supabase server client (admin) configuration is incomplete. Using mock client.")
    return createMockSupabaseClient()
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

// Alias for other modules expecting this name
export const createServerClient = createSupabaseAdminClient

// Create a singleton instance for server-side operations
let serverInstance: SupabaseClient | MockSupabaseClient | null = null

export const getServerClient = (): SupabaseClient | MockSupabaseClient => {
  if (typeof window !== "undefined") {
    // This case should ideally not happen if used correctly, but good for safety.
    console.warn("getServerClient was called on the client side. This is not recommended. Using mock client.")
    return createMockSupabaseClient()
  }

  if (!serverInstance) {
    serverInstance = createSupabaseAdminClient() // Use the primary name here
  }

  return serverInstance
}
