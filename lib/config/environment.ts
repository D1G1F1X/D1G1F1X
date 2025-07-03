/**
 * Environment Configuration Manager
 * Centralized environment variable management with validation
 */

interface EnvironmentConfig {
  // Public variables (client-safe)
  public: {
    supabaseUrl: string
    supabaseAnonKey: string
    appUrl: string
    nodeEnv: string
  }
  // Server-only variables (accessed only on server-side)
  server: {
    supabaseServiceRoleKey?: string
    openaiApiKey?: string
    openaiAssistantId?: string
    adminEmail?: string
    brevoApiKey?: string
  }
}

class EnvironmentManager {
  private static instance: EnvironmentManager
  private config: EnvironmentConfig | null = null

  private constructor() {}

  static getInstance(): EnvironmentManager {
    if (!EnvironmentManager.instance) {
      EnvironmentManager.instance = new EnvironmentManager()
    }
    return EnvironmentManager.instance
  }

  getPublicConfig(): EnvironmentConfig["public"] {
    if (!this.config) {
      this.config = this.loadConfig()
    }
    return this.config.public
  }

  // Server-side only method
  getServerConfig(): EnvironmentConfig["server"] {
    if (typeof window !== "undefined") {
      throw new Error("Server config cannot be accessed on the client side")
    }

    if (!this.config) {
      this.config = this.loadConfig()
    }
    return this.config.server
  }

  private loadConfig(): EnvironmentConfig {
    const publicConfig = {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
      appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      nodeEnv: process.env.NODE_ENV || "development",
    }

    // Server config - only load on server side
    const serverConfig =
      typeof window === "undefined"
        ? {
            supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
            openaiApiKey: process.env.OPENAI_API_KEY,
            openaiAssistantId: process.env.OPENAI_ASSISTANT_ID,
            adminEmail: process.env.ADMIN_EMAIL_FOR_NOTIFICATIONS || process.env.ADMIN_EMAIL,
            brevoApiKey: process.env.BREVO_API_KEY,
          }
        : {}

    return {
      public: publicConfig,
      server: serverConfig,
    }
  }

  validateConfig(): { isValid: boolean; errors: string[]; warnings: string[] } {
    const errors: string[] = []
    const warnings: string[] = []
    const config = this.getPublicConfig()

    // Validate required public variables
    if (!config.supabaseUrl) {
      errors.push("NEXT_PUBLIC_SUPABASE_URL is required")
    }

    if (!config.supabaseAnonKey) {
      errors.push("NEXT_PUBLIC_SUPABASE_ANON_KEY is required")
    }

    // Server-side validation (only run on server)
    if (typeof window === "undefined") {
      const serverConfig = this.getServerConfig()

      if (!serverConfig.supabaseServiceRoleKey) {
        warnings.push("SUPABASE_SERVICE_ROLE_KEY is missing - admin features may be limited")
      }

      if (!serverConfig.openaiApiKey) {
        warnings.push("OPENAI_API_KEY is missing - AI features will be disabled")
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    }
  }
}

// Export singleton instance
export const environmentManager = EnvironmentManager.getInstance()

// Export convenience functions
export const getPublicConfig = () => environmentManager.getPublicConfig()
export const getServerConfig = () => environmentManager.getServerConfig()
export const validateEnvironment = () => environmentManager.validateConfig()

// Export types
export type { EnvironmentConfig }
