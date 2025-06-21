import { type NextRequest, NextResponse } from "next/server"
import { brevoEmailService } from "@/lib/services/brevo-email-service"

export async function POST(request: NextRequest) {
  try {
    const { type, ...data } = await request.json()

    // Sample order data for testing
    const sampleOrderDetails = {
      orderNumber: "ORD-TEST-123456",
      orderId: "test-uuid-123",
      customerName: data.customerName || "Test Customer",
      customerEmail: data.customerEmail || "test@example.com",
      customerPhone: "+1 (555) 123-4567",
      shippingAddress: {
        street: "123 Test Street",
        city: "Test City",
        state: "TS",
        zip: "12345",
        country: "United States",
      },
      items: [
        {
          id: "1",
          name: "Standard Deck",
          quantity: 1,
          price: 49.99,
          description: "Complete oracle card set",
        },
        {
          id: "2",
          name: "Guidebook",
          quantity: 1,
          price: 19.99,
          description: "Comprehensive guide",
        },
      ],
      totalAmount: 69.98,
      notes: "Please handle with care - gift for a friend",
      submittedAt: new Date(),
    }

    let result: { success: boolean; error?: string }

    switch (type) {
      case "customer-confirmation":
        result = await brevoEmailService.sendOrderConfirmationEmail(
          sampleOrderDetails.customerEmail,
          sampleOrderDetails.customerName,
          sampleOrderDetails,
        )
        break
      case "admin-notification":
        result = await brevoEmailService.sendOrderNotificationEmail(sampleOrderDetails)
        break
      default:
        return NextResponse.json({ error: "Invalid email type" }, { status: 400 })
    }

    return NextResponse.json({
      success: result.success,
      message: result.success ? "Test email sent successfully" : "Failed to send test email",
      error: result.error,
    })
  } catch (error) {
    console.error("Test email error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
