import { type NextRequest, NextResponse } from "next/server"
import { brevoEmailService } from "@/lib/services/brevo-email-service"

export async function POST(request: NextRequest) {
  try {
    const { orderDetails, adminEmail } = await request.json()

    console.log("Testing admin email with data:", {
      orderNumber: orderDetails.orderNumber,
      adminEmail: adminEmail || "default",
      hasOrderDetails: !!orderDetails,
    })

    // If a custom admin email is provided, temporarily override it
    let result
    if (adminEmail) {
      // Create a temporary instance with custom admin email
      const customEmailData = {
        sender: {
          name: process.env.BREVO_SENDER_NAME || "Numoracle",
          email: process.env.BREVO_SENDER_EMAIL || "noreply@numoracle.com",
        },
        to: [{ email: adminEmail, name: "Test Admin" }],
        subject: `TEST: New Order Received #${orderDetails.orderNumber} - $${orderDetails.totalAmount.toFixed(2)}`,
        htmlContent: getTestOrderNotificationEmailTemplate(orderDetails),
        textContent: getTestOrderNotificationEmailTextTemplate(orderDetails),
        tags: ["test", "order-notification", "admin"],
      }

      result = await brevoEmailService.sendTransactionalEmail(customEmailData)
    } else {
      // Use the default admin email service
      result = await brevoEmailService.sendOrderNotificationEmail(orderDetails)
    }

    console.log("Admin email test result:", result)

    return NextResponse.json({
      success: result.success,
      error: result.error,
      messageId: result.messageId,
      adminEmail:
        adminEmail || process.env.ADMIN_EMAIL_FOR_NOTIFICATIONS || process.env.ADMIN_EMAIL || "admin@numoracle.com",
      details: {
        timestamp: new Date().toISOString(),
        orderNumber: orderDetails.orderNumber,
        totalAmount: orderDetails.totalAmount,
      },
    })
  } catch (error) {
    console.error("Admin email test error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        details: {
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 },
    )
  }
}

function getTestOrderNotificationEmailTemplate(orderDetails: any): string {
  const itemsHtml = orderDetails.items
    .map(
      (item: any) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `,
    )
    .join("")

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>TEST: New Order Notification - Numoracle Admin</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 700px; margin: 0 auto; padding: 20px; }
        .header { background: #dc3545; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .test-banner { background: #ff6b35; color: white; padding: 10px; text-align: center; font-weight: bold; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .order-table { width: 100%; border-collapse: collapse; margin: 15px 0; background: white; }
        .order-table th { background: #e9ecef; padding: 10px; text-align: left; border-bottom: 2px solid #dee2e6; }
        .info-box { background: white; border: 1px solid #ddd; border-radius: 5px; padding: 15px; margin: 15px 0; }
        .urgent { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="test-banner">
          🧪 THIS IS A TEST EMAIL - Admin Email Functionality Test
        </div>
        <div class="header">
          <h1>🚨 New Order Alert (TEST)</h1>
          <p>Order #${orderDetails.orderNumber} - $${orderDetails.totalAmount.toFixed(2)}</p>
        </div>
        <div class="content">
          <div class="urgent">
            <h3 style="margin-top: 0; color: #856404;">🧪 Test Email Information</h3>
            <p>This is a test email to verify admin notification functionality. If you received this email, the admin notification system is working correctly.</p>
            <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <div class="info-box">
            <h3>👤 Customer Information (Test Data)</h3>
            <p><strong>Name:</strong> ${orderDetails.customerName}</p>
            <p><strong>Email:</strong> ${orderDetails.customerEmail}</p>
            ${orderDetails.customerPhone ? `<p><strong>Phone:</strong> ${orderDetails.customerPhone}</p>` : ""}
            <p><strong>Order Date:</strong> ${orderDetails.submittedAt.toLocaleString()}</p>
          </div>

          <div class="info-box">
            <h3>📦 Order Details (Test Data)</h3>
            <table class="order-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th style="text-align: center;">Qty</th>
                  <th style="text-align: right;">Price</th>
                  <th style="text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
                <tr style="background: #f8f9fa; font-weight: bold;">
                  <td colspan="3" style="padding: 12px; text-align: right;">Order Total:</td>
                  <td style="padding: 12px; text-align: right; font-size: 16px;">$${orderDetails.totalAmount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="urgent">
            <h3 style="margin-top: 0; color: #856404;">✅ Test Successful</h3>
            <p>If you're reading this email, the admin notification system is working correctly. You should receive similar emails for real orders.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

function getTestOrderNotificationEmailTextTemplate(orderDetails: any): string {
  const itemsText = orderDetails.items
    .map(
      (item: any) =>
        `${item.name} (x${item.quantity}) - $${item.price.toFixed(2)} = $${(item.price * item.quantity).toFixed(2)}`,
    )
    .join("\n")

  return `
TEST EMAIL - Admin Notification System Test

This is a test email to verify admin notification functionality.
Test Time: ${new Date().toLocaleString()}

Order #${orderDetails.orderNumber} - $${orderDetails.totalAmount.toFixed(2)}

CUSTOMER INFORMATION (Test Data):
Name: ${orderDetails.customerName}
Email: ${orderDetails.customerEmail}
${orderDetails.customerPhone ? `Phone: ${orderDetails.customerPhone}` : ""}
Order Date: ${orderDetails.submittedAt.toLocaleString()}

ORDER DETAILS (Test Data):
${itemsText}

Order Total: $${orderDetails.totalAmount.toFixed(2)}

TEST SUCCESSFUL: If you're reading this email, the admin notification system is working correctly.
  `
}
