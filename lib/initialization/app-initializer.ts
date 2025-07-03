/**
 * Application Initialization Manager
 * Handles startup tasks, environment validation, and service initialization
 */

import { validatePublicEnv } from "@/lib/env"
import { publicSupabaseConfig } from "@/lib/supabase/config"

interface InitializationResult {
  success: boolean
  errors: string[]
  warnings: string[]
  services: {
    supabase: boolean
    environment: boolean
  }
}

class AppInitializer {
  private static instance: AppInitializer
  private initialized = false
  private initResult: InitializationResult | null = null

  private constructor() {}

  static getInstance(): AppInitializer {
    if (!AppInitializer.instance) {
      AppInitializer.instance = new AppInitializer()
    }
    return AppInitializer.instance
  }

  async initialize(): Promise<InitializationResult> {
    if (this.initialized && this.initResult) {
      return this.initResult
    }

    const errors: string[] = []
    const warnings: string[] = []
    const services = {
      supabase: false,
      environment: false,
    }

    try {
      // Validate public environment variables
      const envValid = validatePublicEnv()
      services.environment = envValid

      if (!envValid) {
        warnings.push("Some public environment variables are missing")
      }

      // Validate Supabase configuration (client-safe)
      if (publicSupabaseConfig.url && publicSupabaseConfig.anonKey) {
        services.supabase = true
      } else {
        warnings.push("Supabase configuration incomplete")
      }

      this.initResult = {
        success: errors.length === 0,
        errors,
        warnings,
        services,
      }

      this.initialized = true
      return this.initResult
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown initialization error"
      errors.push(errorMessage)

      this.initResult = {
        success: false,
        errors,
        warnings,
        services,
      }

      return this.initResult
    }
  }

  getInitializationStatus(): InitializationResult | null {
    return this.initResult
  }

  isInitialized(): boolean {
    return this.initialized
  }
}

// Export singleton instance
export const appInitializer = AppInitializer.getInstance()

// Export initialization function for convenience
export const initializeApp = () => appInitializer.initialize()

// Export types
export type { InitializationResult }
