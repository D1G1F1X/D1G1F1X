import { type NextRequest, NextResponse } from "next/server"
import { brevoEmailService } from "@/lib/services/brevo-email-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, to, userName, customerName, orderDetails } = body

    let result

    switch (type) {
      case "welcome":
        result = await brevoEmailService.sendWelcomeEmail(to, userName)
        break

      case "order-confirmation":
        result = await brevoEmailService.sendOrderConfirmationEmail(to, customerName, orderDetails)
        break

      case "order-notification":
        result = await brevoEmailService.sendOrderNotificationEmail(orderDetails)
        break

      default:
        return NextResponse.json({ success: false, error: "Invalid email type" }, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Email send error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
