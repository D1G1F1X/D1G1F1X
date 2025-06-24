// Centralized environment configuration with validation and fallbacks
interface EnvironmentConfig {
  // OpenAI Configuration
  openai: {
    apiKey: string | null
    assistantApiKey: string | null
    assistantId: string | null
    model: string
    maxTokens: number
    temperature: number
  }

  // Supabase Configuration
  supabase: {
    url: string | null
    anonKey: string | null
    serviceRoleKey: string | null
    isConfigured: boolean
  }

  // Application Configuration
  app: {
    url: string
    environment: "development" | "production" | "test"
    isServer: boolean
  }

  // Email Configuration
  email: {
    brevoApiKey: string | null
    senderEmail: string
    senderName: string
    adminEmail: string
  }
}

class EnvironmentManager {
  private static instance: EnvironmentManager
  private config: EnvironmentConfig

  private constructor() {
    this.config = this.loadConfiguration()
    this.validateCriticalConfig()
  }

  public static getInstance(): EnvironmentManager {
    if (!EnvironmentManager.instance) {
      EnvironmentManager.instance = new EnvironmentManager()
    }
    return EnvironmentManager.instance
  }

  private loadConfiguration(): EnvironmentConfig {
    const isServer = typeof window === "undefined"

    return {
      openai: {
        apiKey: isServer ? process.env.OPENAI_API_KEY || null : null,
        assistantApiKey: isServer ? process.env.OPENAI_ASSISTANT_API_KEY || null : null,
        assistantId: isServer ? process.env.OPENAI_ASSISTANT_ID || null : null,
        model: isServer ? process.env.OPENAI_MODEL || "gpt-4o" : "gpt-4o",
        maxTokens: isServer ? Number.parseInt(process.env.OPENAI_MAX_TOKENS || "2048") : 2048,
        temperature: isServer ? Number.parseFloat(process.env.OPENAI_TEMPERATURE || "0.7") : 0.7,
      },
      supabase: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL || null,
        anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || null,
        serviceRoleKey: isServer ? process.env.SUPABASE_SERVICE_ROLE_KEY || null : null,
        isConfigured: !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      },
      app: {
        url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        environment: isServer ? (process.env.NODE_ENV as any) || "development" : "development",
        isServer,
      },
      email: {
        brevoApiKey: isServer ? process.env.BREVO_API_KEY || null : null,
        senderEmail: isServer ? process.env.BREVO_SENDER_EMAIL || "admin@numoracle.com" : "admin@numoracle.com",
        senderName: isServer ? process.env.BREVO_SENDER_NAME || "Numo Admin" : "Numo Admin",
        adminEmail: isServer
          ? process.env.ADMIN_EMAIL_FOR_NOTIFICATIONS || process.env.ADMIN_EMAIL || "admin@numoracle.com"
          : "admin@numoracle.com",
      },
    }
  }

  private validateCriticalConfig(): void {
    if (this.config.app.isServer) {
      const warnings: string[] = []
      const errors: string[] = []

      // OpenAI validation (server-side only)
      if (!this.config.openai.assistantApiKey && !this.config.openai.apiKey) {
        warnings.push(
          "Neither OPENAI_ASSISTANT_API_KEY nor OPENAI_API_KEY is configured - AI features will be disabled",
        )
      }
      if (!this.config.openai.assistantId) {
        warnings.push("OPENAI_ASSISTANT_ID is not configured - Assistant features will be disabled")
      }

      // Supabase validation
      if (!this.config.supabase.isConfigured) {
        warnings.push("Supabase is not fully configured - Database features will use mock client")
      }

      // Log warnings and errors
      if (warnings.length > 0) {
        console.warn("Environment Configuration Warnings:", warnings)
      }
      if (errors.length > 0) {
        console.error("Environment Configuration Errors:", errors)
      }
    }
  }

  public getConfig(): Readonly<EnvironmentConfig> {
    return Object.freeze({ ...this.config })
  }

  public isOpenAIConfigured(): boolean {
    return !!(this.config.openai.assistantApiKey || this.config.openai.apiKey) && !!this.config.openai.assistantId
  }

  public isSupabaseConfigured(): boolean {
    return this.config.supabase.isConfigured
  }

  public isEmailConfigured(): boolean {
    return !!this.config.email.brevoApiKey
  }
}

export const environmentManager = EnvironmentManager.getInstance()
export type { EnvironmentConfig }
