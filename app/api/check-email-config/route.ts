import { NextResponse } from "next/server"
import { validateAdminEmail } from "@/lib/env"
import { brevoEmailService } from "@/lib/services/brevo-email-service"

export async function GET() {
  const adminEmailValidation = validateAdminEmail()
  const adminEmailConfig = brevoEmailService.getAdminEmailConfig()

  const config = {
    // Environment Variables Status
    environmentVariables: {
      BREVO_API_KEY: {
        configured: !!process.env.BREVO_API_KEY,
        value: process.env.BREVO_API_KEY ? "***configured***" : "Not set",
      },
      BREVO_SENDER_EMAIL: {
        configured: !!process.env.BREVO_SENDER_EMAIL,
        value: process.env.BREVO_SENDER_EMAIL || "Not set",
      },
      BREVO_SENDER_NAME: {
        configured: !!process.env.BREVO_SENDER_NAME,
        value: process.env.BREVO_SENDER_NAME || "Not set",
      },
      ADMIN_EMAIL_FOR_NOTIFICATIONS: {
        configured: !!process.env.ADMIN_EMAIL_FOR_NOTIFICATIONS,
        value: process.env.ADMIN_EMAIL_FOR_NOTIFICATIONS || "Not set",
        priority: 1,
      },
      ADMIN_EMAIL: {
        configured: !!process.env.ADMIN_EMAIL,
        value: process.env.ADMIN_EMAIL || "Not set",
        priority: 2,
      },
    },

    // Admin Email Configuration
    adminEmailConfig: {
      finalEmail: adminEmailConfig.email,
      source: adminEmailConfig.source,
      isValid: adminEmailConfig.isValid,
      shouldBe: "admin@numoracle.com",
    },

    // Validation Results
    validation: {
      adminEmailValid: adminEmailValidation.isValid,
      adminEmailSource: adminEmailValidation.source,
      needsCorrection: adminEmailValidation.email !== "admin@numoracle.com",
      recommendedAction:
        adminEmailValidation.email !== "admin@numoracle.com"
          ? "Set ADMIN_EMAIL_FOR_NOTIFICATIONS=admin@numoracle.com in your environment variables"
          : "Configuration is correct",
    },

    // Service Status
    serviceStatus: {
      brevoServiceInitialized: true,
      emailServiceReady: !!process.env.BREVO_API_KEY && adminEmailValidation.isValid,
    },
  }

  return NextResponse.json(config, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  })
}
