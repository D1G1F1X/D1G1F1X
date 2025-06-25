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
    isServer: boolean // This will always be true for this module now
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
    // Ensure this constructor is only called on the server
    if (typeof window !== "undefined") {
      throw new Error("EnvironmentManager can only be initialized on the server side.")
    }
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
    // All process.env access here is guaranteed to be server-side
    return {
      openai: {
        apiKey: process.env.OPENAI_API_KEY || null,
        assistantApiKey: process.env.OPENAI_ASSISTANT_API_KEY || null,
        assistantId: process.env.OPENAI_ASSISTANT_ID || null,
        model: process.env.OPENAI_MODEL || "gpt-4o",
        maxTokens: Number.parseInt(process.env.OPENAI_MAX_TOKENS || "2048"),
        temperature: Number.parseFloat(process.env.OPENAI_TEMPERATURE || "0.7"),
      },
      supabase: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL || null, // NEXT_PUBLIC_ is fine here, but it's still server-side access
        anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || null, // NEXT_PUBLIC_ is fine here
        serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || null,
        isConfigured: !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      },
      app: {
        url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000", // NEXT_PUBLIC_ is fine here
        environment: (process.env.NODE_ENV as any) || "development",
        isServer: true, // Always true for this module
      },
      email: {
        brevoApiKey: process.env.BREVO_API_KEY || null,
        senderEmail: process.env.BREVO_SENDER_EMAIL || "admin@numoracle.com",
        senderName: process.env.BREVO_SENDER_NAME || "Numo Admin",
        adminEmail: process.env.ADMIN_EMAIL_FOR_NOTIFICATIONS || process.env.ADMIN_EMAIL || "admin@numoracle.com",
      },
    }
  }

  private validateCriticalConfig(): void {
    const warnings: string[] = []
    const errors: string[] = []

    // OpenAI validation
    if (!this.config.openai.assistantApiKey && !this.config.openai.apiKey) {
      warnings.push("Neither OPENAI_ASSISTANT_API_KEY nor OPENAI_API_KEY is configured - AI features will be disabled")
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
