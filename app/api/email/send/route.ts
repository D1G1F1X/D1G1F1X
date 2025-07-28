import type { NextRequest } from "next/server"
import { brevoEmailService } from "@/lib/services/brevo-email-service"
import { createErrorResponse, createSuccessResponse, validateRequiredFields } from "@/lib/api-utils"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { type, ...emailData } = data

    // Validate required fields based on email type
    let requiredFields: string[] = []

    switch (type) {
      case "welcome":
        requiredFields = ["email", "userName"]
        break
      case "password-reset":
        requiredFields = ["email", "userName", "resetToken"]
        break
      case "contact-form":
        requiredFields = ["name", "email", "subject", "message"]
        break
      default:
        return createErrorResponse("Invalid email type", 400)
    }

    const missingFields = validateRequiredFields(emailData, requiredFields)
    if (missingFields.length > 0) {
      return createErrorResponse(`Missing required fields: ${missingFields.join(", ")}`, 400)
    }

    let result: { success: boolean; error?: string }

    switch (type) {
      case "welcome":
        result = await brevoEmailService.sendWelcomeEmail(emailData.email, emailData.userName)
        break
      case "password-reset":
        result = await brevoEmailService.sendPasswordResetEmail(
          emailData.email,
          emailData.userName,
          emailData.resetToken,
        )
        break
      case "contact-form":
        result = await brevoEmailService.sendContactFormNotification(emailData)
        break
      default:
        return createErrorResponse("Invalid email type", 400)
    }

    if (!result.success) {
      return createErrorResponse(result.error || "Failed to send email", 500)
    }

    return createSuccessResponse({ message: "Email sent successfully" })
  } catch (error) {
    console.error("Email API error:", error)
    return createErrorResponse("Internal server error", 500)
  }
}
