import { brevoEmailService } from "@/lib/services/brevo-email-service"
import { createErrorResponse, createSuccessResponse } from "@/lib/api-utils"

export async function GET() {
  try {
    const healthCheck = await brevoEmailService.healthCheck()

    if (!healthCheck.success) {
      return createErrorResponse(healthCheck.error || "Email service unhealthy", 503)
    }

    return createSuccessResponse({
      status: "healthy",
      service: "Brevo Email Service",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Email health check error:", error)
    return createErrorResponse("Health check failed", 503)
  }
}
