import { createClient, type SupabaseClient } from "@supabase/supabase-js"

import type { Database } from "@/types/supabase"
import { environmentManager } from "@/lib/environment"

/**
 * SupabaseManager
 *
 * A singleton class for managing the Supabase client.
 */
class SupabaseManager {
  private static instance: SupabaseManager
  private client: SupabaseClient<Database>
  private isConfigured = false

  private constructor() {
    this.client = this.createMockClient()
    this.initializeClient()
  }

  public static getInstance(): SupabaseManager {
    if (!SupabaseManager.instance) {
      SupabaseManager.instance = new SupabaseManager()
    }
    return SupabaseManager.instance
  }

  public getClient(): SupabaseClient<Database> {
    return this.client
  }

  public getIsConfigured(): boolean {
    return this.isConfigured
  }

  private initializeClient(): void {
    // Separate public vs. server configs to avoid undefined look-ups
    const publicConfig = environmentManager.getPublicConfig()
    let serverConfig: ReturnType<typeof environmentManager.getServerConfig>

    // `getServerConfig()` throws on the client – wrap defensively
    try {
      serverConfig = environmentManager.getServerConfig()
    } catch {
      // When called client-side or if server vars are missing
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      serverConfig = {} as any
    }

    const url = publicConfig.supabaseUrl
    const serviceRoleKey = serverConfig.supabaseServiceRoleKey
    const anonKey = publicConfig.supabaseAnonKey

    // We allow either a service-role key (preferred) or anon key (fallback)
    if (url && (serviceRoleKey || anonKey)) {
      try {
        const key = serviceRoleKey ?? anonKey
        this.client = createClient<Database>(url, key, {
          auth: { persistSession: false, autoRefreshToken: false },
        })
        this.isConfigured = true
        console.log("✅ Supabase client initialized successfully")
        return
      } catch (error) {
        console.warn("⚠️ Failed to initialise Supabase client, using mock:", error)
      }
    } else {
      console.warn("⚠️ Supabase configuration incomplete, falling back to mock client")
    }

    // If we reach here, fall back to mock
    this.client = this.createMockClient()
    this.isConfigured = false
  }

  // Mock client for development and testing
  private createMockClient(): SupabaseClient<Database> {
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        getUser: async () => ({ data: { user: null }, error: null }),
        signInWithOAuth: async () => ({ data: { session: null, user: null }, error: null }),
        signOut: async () => ({ data: { session: null, user: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } }, error: null }),
      },
      from: () => {
        return {
          select: () => ({ data: [], error: null, count: null, status: 200, statusText: "OK" }),
          insert: () => ({ data: [], error: null, count: null, status: 200, statusText: "OK" }),
          update: () => ({ data: [], error: null, count: null, status: 200, statusText: "OK" }),
          delete: () => ({ data: [], error: null, count: null, status: 200, statusText: "OK" }),
        } as any
      },
      storage: {
        from: () => {
          return {
            upload: async () => ({ data: { path: "" }, error: null }),
            getPublicUrl: () => ({ data: { publicUrl: "" }, error: null }),
            delete: async () => ({ data: [], error: null }),
          } as any
        },
      },
    } as any
  }
}

export const supabaseManager = SupabaseManager.getInstance()
