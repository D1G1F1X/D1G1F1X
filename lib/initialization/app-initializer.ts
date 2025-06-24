// Application initialization and health checks
import { environmentManager } from "@/lib/config/environment"
import { supabaseManager } from "@/lib/database/supabase-manager"
import { aiServiceManager } from "@/lib/ai/ai-service-manager"

interface SystemHealth {
  environment: "healthy" | "warning" | "error"
  database: "healthy" | "warning" | "error"
  ai: "healthy" | "warning" | "error"
  overall: "healthy" | "warning" | "error"
  details: {
    environment: string[]
    database: string[]
    ai: string[]
  }
}

class AppInitializer {
  private static instance: AppInitializer
  private initialized = false

  private constructor() {}

  public static getInstance(): AppInitializer {
    if (!AppInitializer.instance) {
      AppInitializer.instance = new AppInitializer()
    }
    return AppInitializer.instance
  }

  public async initialize(): Promise<void> {
    if (this.initialized) return

    console.log("🚀 Initializing Numoracle application...")

    // Initialize core services
    const config = environmentManager.getConfig()
    console.log(`📍 Environment: ${config.app.environment}`)
    console.log(`🌐 App URL: ${config.app.url}`)

    // Check system health
    const health = await this.checkSystemHealth()
    this.logSystemHealth(health)

    this.initialized = true
    console.log("✅ Application initialization complete")
  }

  public async checkSystemHealth(): Promise<SystemHealth> {
    const details = {
      environment: [] as string[],
      database: [] as string[],
      ai: [] as string[],
    }

    // Check environment
    const envStatus = this.checkEnvironmentHealth(details.environment)

    // Check database
    const dbStatus = this.checkDatabaseHealth(details.database)

    // Check AI
    const aiStatus = this.checkAIHealth(details.ai)

    // Determine overall health
    const statuses = [envStatus, dbStatus, aiStatus]
    const overall = statuses.includes("error") ? "error" : statuses.includes("warning") ? "warning" : "healthy"

    return {
      environment: envStatus,
      database: dbStatus,
      ai: aiStatus,
      overall,
      details,
    }
  }

  private checkEnvironmentHealth(details: string[]): "healthy" | "warning" | "error" {
    const config = environmentManager.getConfig()

    if (!config.supabase.url || !config.supabase.anonKey) {
      details.push("Supabase configuration incomplete")
    }

    if (!config.email.brevoApiKey) {
      details.push("Email service not configured")
    }

    return details.length === 0 ? "healthy" : "warning"
  }

  private checkDatabaseHealth(details: string[]): "healthy" | "warning" | "error" {
    if (!supabaseManager.isClientConfigured()) {
      details.push("Database client not configured - using mock")
      return "warning"
    }

    details.push("Database client configured and ready")
    return "healthy"
  }

  private checkAIHealth(details: string[]): "healthy" | "warning" | "error" {
    if (!aiServiceManager.isAIConfigured()) {
      details.push("AI service not configured - using fallback responses")
      return "warning"
    }

    details.push("AI service configured and ready")
    return "healthy"
  }

  private logSystemHealth(health: SystemHealth): void {
    const emoji = {
      healthy: "✅",
      warning: "⚠️",
      error: "❌",
    }

    console.log(`\n📊 System Health Check:`)
    console.log(`${emoji[health.environment]} Environment: ${health.environment}`)
    console.log(`${emoji[health.database]} Database: ${health.database}`)
    console.log(`${emoji[health.ai]} AI Service: ${health.ai}`)
    console.log(`${emoji[health.overall]} Overall: ${health.overall}\n`)

    // Log details if there are issues
    if (health.overall !== "healthy") {
      console.log("📋 Health Details:")
      Object.entries(health.details).forEach(([service, issues]) => {
        if (issues.length > 0) {
          console.log(`  ${service}:`)
          issues.forEach((issue) => console.log(`    • ${issue}`))
        }
      })
      console.log("")
    }
  }
}

export const appInitializer = AppInitializer.getInstance()
export type { SystemHealth }
