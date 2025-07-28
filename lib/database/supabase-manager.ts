import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { environmentManager } from "@/lib/config/environment"
import type { Database } from "@/lib/supabase/types"

// Mock client interface that matches Supabase client structure
interface MockSupabaseClient {
  from: (table: string) => MockQueryBuilder
  auth: MockAuth
  storage: MockStorage
  rpc: (fn: string, params?: any) => Promise<{ data: null; error: Error }>
}

interface MockQueryBuilder {
  select: (columns?: string) => MockQueryBuilder
  insert: (data: any) => MockQueryBuilder
  update: (data: any) => MockQueryBuilder
  delete: () => MockQueryBuilder
  eq: (column: string, value: any) => MockQueryBuilder
  single: () => Promise<{ data: null; error: Error }>
  then: (callback: (result: { data: null; error: Error }) => any) => Promise<any>
}

interface MockAuth {
  getUser: () => Promise<{ data: { user: null }; error: null }>
  admin: {
    createUser: () => Promise<{ data: { user: null }; error: Error }>
    deleteUser: () => Promise<{ data: {}; error: Error }>
  }
}

interface MockStorage {
  from: (bucket: string) => {
    upload: () => Promise<{ data: null; error: Error }>
    getPublicUrl: () => { data: { publicUrl: string } }
  }
}

class SupabaseManager {
  private static instance: SupabaseManager
  private client: SupabaseClient<Database> | MockSupabaseClient | null = null
  private isConfigured = false

  private constructor() {
    this.initializeClient()
  }

  public static getInstance(): SupabaseManager {
    if (!SupabaseManager.instance) {
      SupabaseManager.instance = new SupabaseManager()
    }
    return SupabaseManager.instance
  }

  private initializeClient(): void {
    const config = environmentManager.getConfig()

    if (config.supabase.url && config.supabase.serviceRoleKey) {
      try {
        this.client = createClient<Database>(config.supabase.url, config.supabase.serviceRoleKey, {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
        })
        this.isConfigured = true
        console.log("✅ Supabase client initialized successfully")
      } catch (error) {
        console.warn("⚠️ Failed to initialize Supabase client, using mock:", error)
        this.client = this.createMockClient()
        this.isConfigured = false
      }
    } else {
      console.warn("⚠️ Supabase configuration incomplete, using mock client")
      this.client = this.createMockClient()
      this.isConfigured = false
    }
  }

  private createMockClient(): MockSupabaseClient {
    const mockError = new Error("Supabase not configured - using mock client")

    const createMockQueryBuilder = (): MockQueryBuilder => ({
      select: () => createMockQueryBuilder(),
      insert: () => createMockQueryBuilder(),
      update: () => createMockQueryBuilder(),
      delete: () => createMockQueryBuilder(),
      eq: () => createMockQueryBuilder(),
      single: async () => ({ data: null, error: mockError }),
      then: async (callback) => callback({ data: null, error: mockError }),
    })

    return {
      from: () => createMockQueryBuilder(),
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        admin: {
          createUser: async () => ({ data: { user: null }, error: mockError }),
          deleteUser: async () => ({ data: {}, error: mockError }),
        },
      },
      storage: {
        from: () => ({
          upload: async () => ({ data: null, error: mockError }),
          getPublicUrl: () => ({ data: { publicUrl: "" } }),
        }),
      },
      rpc: async () => ({ data: null, error: mockError }),
    }
  }

  public getClient(): SupabaseClient<Database> | MockSupabaseClient {
    if (!this.client) {
      this.initializeClient()
    }
    return this.client!
  }

  public isClientConfigured(): boolean {
    return this.isConfigured
  }

  public async executeQuery<T>(operation: (client: SupabaseClient<Database>) => Promise<T>, fallback: T): Promise<T> {
    if (!this.isConfigured) {
      console.warn("Supabase not configured, returning fallback value")
      return fallback
    }

    try {
      return await operation(this.client as SupabaseClient<Database>)
    } catch (error) {
      console.error("Supabase operation failed:", error)
      return fallback
    }
  }
}

export const supabaseManager = SupabaseManager.getInstance()
export type { MockSupabaseClient }
