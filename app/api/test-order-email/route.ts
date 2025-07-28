import { type NextRequest, NextResponse } from "next/server"
import { sendOrderConfirmationEmail, sendOrderNotificationEmail } from "@/lib/services/brevo-email-service"

export async function POST(request: NextRequest) {
  try {
    const { type, to, orderDetails } = await request.json()

    if (!to || !orderDetails) {
      return NextResponse.json({ error: "Recipient and order details are required" }, { status: 400 })
    }

    let result: { success: boolean; error?: string; data?: any }

    switch (type) {
      case "customer-confirmation":
        result = await sendOrderConfirmationEmail(to, orderDetails)
        break
      case "admin-notification":
        result = await sendOrderNotificationEmail(orderDetails)
        break
      default:
        return NextResponse.json({ error: "Invalid email type" }, { status: 400 })
    }

    if (result.success) {
      return NextResponse.json({ message: "Test email sent successfully", data: result.data })
    } else {
      return NextResponse.json({ error: result.error || "Failed to send test email" }, { status: 500 })
    }
  } catch (error) {
    console.error("Test email error:", error)
    return NextResponse.json({ error: "Failed to send order confirmation email" }, { status: 500 })
  }
}
