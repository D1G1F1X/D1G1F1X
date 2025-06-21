import { getEnv, getAdminEmail, validateAdminEmail } from "@/lib/env"

// Brevo API types
interface BrevoSender {
  name: string
  email: string
}

interface BrevoRecipient {
  email: string
  name?: string
}

interface BrevoEmailRequest {
  sender: BrevoSender
  to: BrevoRecipient[]
  subject: string
  htmlContent?: string
  textContent?: string
  templateId?: number
  params?: Record<string, any>
  tags?: string[]
}

interface BrevoResponse {
  messageId: string
}

interface BrevoError {
  code: string
  message: string
}

// Order types for email templates
interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  description?: string
}

interface OrderDetails {
  orderNumber: string
  orderId: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  shippingAddress: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  items: OrderItem[]
  totalAmount: number
  notes?: string
  submittedAt: Date
}

// Rate limiting configuration
interface RateLimitConfig {
  maxRequests: number
  windowMs: number
  retryAfter?: number
}

class BrevoEmailService {
  private apiKey: string
  private senderEmail: string
  private senderName: string
  private adminEmail: string
  private baseUrl = "https://api.brevo.com/v3"
  private rateLimitConfig: RateLimitConfig = {
    maxRequests: 300, // Brevo allows 300 emails per day on free plan
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
  }
  private requestCount = 0
  private windowStart = Date.now()

  constructor() {
    this.apiKey = getEnv("BREVO_API_KEY")
    this.senderEmail = getEnv("BREVO_SENDER_EMAIL")
    this.senderName = getEnv("BREVO_SENDER_NAME")

    // Use the improved admin email getter
    this.adminEmail = getAdminEmail()

    if (!this.apiKey) {
      console.warn("Brevo API key not configured. Email service will be disabled.")
    }

    // Validate admin email configuration
    const adminEmailValidation = validateAdminEmail()
    if (!adminEmailValidation.isValid) {
      console.error(`❌ Invalid admin email format: ${adminEmailValidation.email}`)
      console.error(`   Source: ${adminEmailValidation.source}`)
      console.error(`   Please update ADMIN_EMAIL_FOR_NOTIFICATIONS to admin@numoracle.com`)
    }

    console.log("Brevo Email Service initialized:", {
      senderEmail: this.senderEmail,
      senderName: this.senderName,
      adminEmail: this.adminEmail,
      adminEmailSource: adminEmailValidation.source,
      adminEmailValid: adminEmailValidation.isValid,
      hasApiKey: !!this.apiKey,
    })
  }

  private isRateLimited(): boolean {
    const now = Date.now()

    // Reset window if expired
    if (now - this.windowStart > this.rateLimitConfig.windowMs) {
      this.requestCount = 0
      this.windowStart = now
    }

    return this.requestCount >= this.rateLimitConfig.maxRequests
  }

  private incrementRequestCount(): void {
    this.requestCount++
  }

  private async makeRequest(endpoint: string, data: any): Promise<BrevoResponse> {
    if (!this.apiKey) {
      throw new Error("Brevo API key not configured")
    }

    if (this.isRateLimited()) {
      throw new Error("Rate limit exceeded. Please try again later.")
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": this.apiKey,
      },
      body: JSON.stringify(data),
    })

    this.incrementRequestCount()

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const error: BrevoError = {
        code: response.status.toString(),
        message: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
      }
      throw error
    }

    return response.json()
  }

  async sendTransactionalEmail(
    emailData: BrevoEmailRequest,
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const response = await this.makeRequest("/smtp/email", emailData)
      return {
        success: true,
        messageId: response.messageId,
      }
    } catch (error) {
      console.error("Brevo email send error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }
    }
  }

  async sendOrderConfirmationEmail(
    customerEmail: string,
    customerName: string,
    orderDetails: OrderDetails,
  ): Promise<{ success: boolean; error?: string }> {
    const emailData: BrevoEmailRequest = {
      sender: {
        name: this.senderName,
        email: this.senderEmail,
      },
      to: [{ email: customerEmail, name: customerName }],
      subject: `Order Confirmation #${orderDetails.orderNumber} - Numoracle`,
      htmlContent: this.getOrderConfirmationEmailTemplate(orderDetails),
      textContent: this.getOrderConfirmationEmailTextTemplate(orderDetails),
      tags: ["order-confirmation", "customer"],
    }

    const result = await this.sendTransactionalEmail(emailData)
    return {
      success: result.success,
      error: result.error,
    }
  }

  async sendOrderNotificationEmail(orderDetails: OrderDetails): Promise<{ success: boolean; error?: string }> {
    console.log("Attempting to send admin notification email to:", this.adminEmail)

    // Validate admin email before sending
    const adminEmailValidation = validateAdminEmail()
    if (!adminEmailValidation.isValid) {
      const error = `Invalid admin email format: ${this.adminEmail}. Please set ADMIN_EMAIL_FOR_NOTIFICATIONS to admin@numoracle.com`
      console.error(error)
      return {
        success: false,
        error: error,
      }
    }

    const emailData: BrevoEmailRequest = {
      sender: {
        name: this.senderName,
        email: this.senderEmail,
      },
      to: [{ email: this.adminEmail, name: "Numoracle Admin" }],
      subject: `New Order Received #${orderDetails.orderNumber} - $${orderDetails.totalAmount.toFixed(2)}`,
      htmlContent: this.getOrderNotificationEmailTemplate(orderDetails),
      textContent: this.getOrderNotificationEmailTextTemplate(orderDetails),
      tags: ["order-notification", "admin"],
    }

    console.log("Admin email data:", {
      to: emailData.to,
      subject: emailData.subject,
      sender: emailData.sender,
      adminEmailSource: adminEmailValidation.source,
    })

    const result = await this.sendTransactionalEmail(emailData)

    console.log("Admin email result:", result)

    return {
      success: result.success,
      error: result.error,
    }
  }

  // Order confirmation email template for customers
  private getOrderConfirmationEmailTemplate(orderDetails: OrderDetails): string {
    const itemsHtml = orderDetails.items
      .map(
        (item) => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee;">
            <strong>${item.name}</strong>
            ${item.description ? `<br><small style="color: #666;">${item.description}</small>` : ""}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</td>
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
        <title>Order Confirmation - Numoracle</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .order-summary { background: white; border-radius: 8px; padding: 20px; margin: 20px 0; }
          .order-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          .order-table th { background: #f8f9fa; padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6; }
          .total-row { background: #f8f9fa; font-weight: bold; }
          .address-box { background: white; border: 1px solid #ddd; border-radius: 5px; padding: 15px; margin: 15px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Order Confirmed!</h1>
            <p>Thank you for your order, ${orderDetails.customerName}</p>
          </div>
          <div class="content">
            <div class="order-summary">
              <h2>Order #${orderDetails.orderNumber}</h2>
              <p><strong>Order Date:</strong> ${orderDetails.submittedAt.toLocaleDateString()}</p>
              <p><strong>Status:</strong> <span style="color: #28a745;">Pending Payment</span></p>
              
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
                  <tr class="total-row">
                    <td colspan="3" style="padding: 15px; text-align: right;">Order Total:</td>
                    <td style="padding: 15px; text-align: right; font-size: 18px;">$${orderDetails.totalAmount.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="address-box">
              <h3>📦 Shipping Address</h3>
              <p>
                ${orderDetails.shippingAddress.street}<br>
                ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state} ${orderDetails.shippingAddress.zip}<br>
                ${orderDetails.shippingAddress.country}
              </p>
            </div>

            ${
              orderDetails.notes
                ? `
            <div class="address-box">
              <h3>📝 Special Instructions</h3>
              <p>${orderDetails.notes}</p>
            </div>
            `
                : ""
            }

            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #856404;">⏰ What's Next?</h3>
              <ul style="margin-bottom: 0;">
                <li>We'll review your order within 24 hours</li>
                <li>You'll receive payment instructions via email</li>
                <li>Once payment is confirmed, we'll process and ship your order</li>
                <li>You'll receive tracking information when your order ships</li>
              </ul>
            </div>

            <div style="text-align: center;">
              <a href="${getEnv("NEXT_PUBLIC_APP_URL")}/user/orders" class="button">Track Your Order</a>
            </div>

            <p>If you have any questions about your order, please don't hesitate to contact us. We're here to help!</p>
            
            <p>Thank you for choosing Numoracle for your mystical journey.</p>
            
            <p>Blessed be,<br>The Numoracle Team</p>
          </div>
          <div class="footer">
            <p>© 2024 Numoracle. All rights reserved.</p>
            <p>Visit us at <a href="${getEnv("NEXT_PUBLIC_APP_URL")}">${getEnv("NEXT_PUBLIC_APP_URL")}</a></p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  private getOrderConfirmationEmailTextTemplate(orderDetails: OrderDetails): string {
    const itemsText = orderDetails.items
      .map(
        (item) =>
          `${item.name} (x${item.quantity}) - $${item.price.toFixed(2)} each = $${(item.price * item.quantity).toFixed(2)}`,
      )
      .join("\n")

    return `
Order Confirmation #${orderDetails.orderNumber}

Dear ${orderDetails.customerName},

Thank you for your order! We've received your order and will process it within 24 hours.

ORDER DETAILS:
Order Number: ${orderDetails.orderNumber}
Order Date: ${orderDetails.submittedAt.toLocaleDateString()}
Status: Pending Payment

ITEMS ORDERED:
${itemsText}

Order Total: $${orderDetails.totalAmount.toFixed(2)}

SHIPPING ADDRESS:
${orderDetails.shippingAddress.street}
${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state} ${orderDetails.shippingAddress.zip}
${orderDetails.shippingAddress.country}

${orderDetails.notes ? `SPECIAL INSTRUCTIONS:\n${orderDetails.notes}\n` : ""}

WHAT'S NEXT?
- We'll review your order within 24 hours
- You'll receive payment instructions via email
- Once payment is confirmed, we'll process and ship your order
- You'll receive tracking information when your order ships

Track your order: ${getEnv("NEXT_PUBLIC_APP_URL")}/user/orders

If you have any questions, please contact us.

Thank you for choosing Numoracle!

Blessed be,
The Numoracle Team

© 2024 Numoracle. All rights reserved.
Visit us at ${getEnv("NEXT_PUBLIC_APP_URL")}
    `
  }

  // Order notification email template for admin
  private getOrderNotificationEmailTemplate(orderDetails: OrderDetails): string {
    const itemsHtml = orderDetails.items
      .map(
        (item) => `
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
        <title>New Order Notification - Numoracle Admin</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 700px; margin: 0 auto; padding: 20px; }
          .header { background: #dc3545; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .order-table { width: 100%; border-collapse: collapse; margin: 15px 0; background: white; }
          .order-table th { background: #e9ecef; padding: 10px; text-align: left; border-bottom: 2px solid #dee2e6; }
          .info-box { background: white; border: 1px solid #ddd; border-radius: 5px; padding: 15px; margin: 15px 0; }
          .urgent { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚨 New Order Alert</h1>
            <p>Order #${orderDetails.orderNumber} - $${orderDetails.totalAmount.toFixed(2)}</p>
          </div>
          <div class="content">
            <div class="urgent">
              <h3 style="margin-top: 0; color: #856404;">⚡ Action Required</h3>
              <p style="margin-bottom: 0;">A new manual order has been submitted and requires your attention for payment processing.</p>
            </div>

            <div class="info-box">
              <h3>👤 Customer Information</h3>
              <p><strong>Name:</strong> ${orderDetails.customerName}</p>
              <p><strong>Email:</strong> ${orderDetails.customerEmail}</p>
              ${orderDetails.customerPhone ? `<p><strong>Phone:</strong> ${orderDetails.customerPhone}</p>` : ""}
              <p><strong>Order Date:</strong> ${orderDetails.submittedAt.toLocaleString()}</p>
            </div>

            <div class="info-box">
              <h3>📦 Order Details</h3>
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

            <div class="info-box">
              <h3>🏠 Shipping Address</h3>
              <p>
                ${orderDetails.shippingAddress.street}<br>
                ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state} ${orderDetails.shippingAddress.zip}<br>
                ${orderDetails.shippingAddress.country}
              </p>
            </div>

            ${
              orderDetails.notes
                ? `
            <div class="info-box">
              <h3>📝 Customer Notes</h3>
              <p style="font-style: italic;">"${orderDetails.notes}"</p>
            </div>
            `
                : ""
            }

            <div class="urgent">
              <h3 style="margin-top: 0; color: #856404;">📋 Next Steps</h3>
              <ol style="margin-bottom: 0;">
                <li>Review the order details above</li>
                <li>Contact the customer with payment instructions</li>
                <li>Update order status in the admin panel</li>
                <li>Process shipping once payment is confirmed</li>
              </ol>
            </div>

            <p style="text-align: center; margin-top: 30px;">
              <a href="${getEnv("NEXT_PUBLIC_APP_URL")}/admin/orders" 
                 style="display: inline-block; background: #dc3545; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px;">
                View in Admin Panel
              </a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  private getOrderNotificationEmailTextTemplate(orderDetails: OrderDetails): string {
    const itemsText = orderDetails.items
      .map(
        (item) =>
          `${item.name} (x${item.quantity}) - $${item.price.toFixed(2)} = $${(item.price * item.quantity).toFixed(2)}`,
      )
      .join("\n")

    return `
NEW ORDER ALERT - Numoracle Admin

Order #${orderDetails.orderNumber} - $${orderDetails.totalAmount.toFixed(2)}

ACTION REQUIRED: A new manual order has been submitted and requires payment processing.

CUSTOMER INFORMATION:
Name: ${orderDetails.customerName}
Email: ${orderDetails.customerEmail}
${orderDetails.customerPhone ? `Phone: ${orderDetails.customerPhone}` : ""}
Order Date: ${orderDetails.submittedAt.toLocaleString()}

ORDER DETAILS:
${itemsText}

Order Total: $${orderDetails.totalAmount.toFixed(2)}

SHIPPING ADDRESS:
${orderDetails.shippingAddress.street}
${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state} ${orderDetails.shippingAddress.zip}
${orderDetails.shippingAddress.country}

${orderDetails.notes ? `CUSTOMER NOTES:\n"${orderDetails.notes}"\n` : ""}

NEXT STEPS:
1. Review the order details above
2. Contact the customer with payment instructions
3. Update order status in the admin panel
4. Process shipping once payment is confirmed

View in Admin Panel: ${getEnv("NEXT_PUBLIC_APP_URL")}/admin/orders

This is an automated notification from the Numoracle order system.
    `
  }

  async sendWelcomeEmail(to: string, userName: string): Promise<{ success: boolean; error?: string }> {
    const emailData: BrevoEmailRequest = {
      sender: {
        name: this.senderName,
        email: this.senderEmail,
      },
      to: [{ email: to, name: userName }],
      subject: "Welcome to Numoracle - Your Journey Begins",
      htmlContent: this.getWelcomeEmailTemplate(userName),
      textContent: this.getWelcomeEmailTextTemplate(userName),
      tags: ["welcome", "registration"],
    }

    const result = await this.sendTransactionalEmail(emailData)
    return {
      success: result.success,
      error: result.error,
    }
  }

  async sendPasswordResetEmail(
    to: string,
    userName: string,
    resetToken: string,
  ): Promise<{ success: boolean; error?: string }> {
    const resetUrl = `${getEnv("NEXT_PUBLIC_APP_URL")}/reset-password?token=${resetToken}`

    const emailData: BrevoEmailRequest = {
      sender: {
        name: this.senderName,
        email: this.senderEmail,
      },
      to: [{ email: to, name: userName }],
      subject: "Reset Your Numoracle Password",
      htmlContent: this.getPasswordResetEmailTemplate(userName, resetUrl),
      textContent: this.getPasswordResetEmailTextTemplate(userName, resetUrl),
      tags: ["password-reset", "security"],
    }

    const result = await this.sendTransactionalEmail(emailData)
    return {
      success: result.success,
      error: result.error,
    }
  }

  async sendContactFormNotification(formData: {
    name: string
    email: string
    subject: string
    message: string
  }): Promise<{ success: boolean; error?: string }> {
    // Send notification to admin using the corrected admin email
    const adminEmailData: BrevoEmailRequest = {
      sender: {
        name: this.senderName,
        email: this.senderEmail,
      },
      to: [{ email: this.adminEmail, name: "Numoracle Admin" }],
      subject: `New Contact Form Submission: ${formData.subject}`,
      htmlContent: this.getContactFormNotificationTemplate(formData),
      textContent: this.getContactFormNotificationTextTemplate(formData),
      tags: ["contact-form", "admin-notification"],
    }

    // Send confirmation to user
    const userConfirmationData: BrevoEmailRequest = {
      sender: {
        name: this.senderName,
        email: this.senderEmail,
      },
      to: [{ email: formData.email, name: formData.name }],
      subject: "Thank you for contacting Numoracle",
      htmlContent: this.getContactConfirmationTemplate(formData.name),
      textContent: this.getContactConfirmationTextTemplate(formData.name),
      tags: ["contact-form", "user-confirmation"],
    }

    // Send both emails
    const [adminResult, userResult] = await Promise.all([
      this.sendTransactionalEmail(adminEmailData),
      this.sendTransactionalEmail(userConfirmationData),
    ])

    return {
      success: adminResult.success && userResult.success,
      error: adminResult.error || userResult.error,
    }
  }

  // Email Templates
  private getWelcomeEmailTemplate(userName: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Numoracle</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Numoracle</h1>
            <p>Your journey into the mystical world of numerology begins now</p>
          </div>
          <div class="content">
            <h2>Hello ${userName}!</h2>
            <p>Thank you for joining the Numoracle community. We're excited to have you on this mystical journey of self-discovery through the ancient art of numerology.</p>
            
            <p>Here's what you can explore:</p>
            <ul>
              <li>🔮 <strong>Oracle Card Readings</strong> - Draw cards for daily guidance</li>
              <li>🔢 <strong>Numerology Calculator</strong> - Discover your life path number</li>
              <li>🎲 <strong>Elemental Dice</strong> - Explore elemental influences</li>
              <li>📚 <strong>Knowledge Library</strong> - Learn about numerology and mysticism</li>
            </ul>
            
            <div style="text-align: center;">
              <a href="${getEnv("NEXT_PUBLIC_APP_URL")}/dashboard" class="button">Start Your Journey</a>
            </div>
            
            <p>If you have any questions, feel free to reach out to our support team.</p>
            
            <p>Blessed be,<br>The Numoracle Team</p>
          </div>
          <div class="footer">
            <p>© 2024 Numoracle. All rights reserved.</p>
            <p>Visit us at <a href="${getEnv("NEXT_PUBLIC_APP_URL")}">${getEnv("NEXT_PUBLIC_APP_URL")}</a></p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  private getWelcomeEmailTextTemplate(userName: string): string {
    return `
Welcome to Numoracle!

Hello ${userName}!

Thank you for joining the Numoracle community. We're excited to have you on this mystical journey of self-discovery through the ancient art of numerology.

Here's what you can explore:
- Oracle Card Readings - Draw cards for daily guidance
- Numerology Calculator - Discover your life path number
- Elemental Dice - Explore elemental influences
- Knowledge Library - Learn about numerology and mysticism

Start your journey: ${getEnv("NEXT_PUBLIC_APP_URL")}/dashboard

If you have any questions, feel free to reach out to our support team.

Blessed be,
The Numoracle Team

© 2024 Numoracle. All rights reserved.
Visit us at ${getEnv("NEXT_PUBLIC_APP_URL")}
    `
  }

  private getPasswordResetEmailTemplate(userName: string, resetUrl: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Numoracle Password</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #e74c3c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Request</h1>
            <p>Secure your Numoracle account</p>
          </div>
          <div class="content">
            <h2>Hello ${userName}!</h2>
            <p>We received a request to reset your password for your Numoracle account. If you made this request, click the button below to reset your password:</p>
            
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">Reset Password</a>
            </div>
            
            <div class="warning">
              <strong>⚠️ Security Notice:</strong>
              <ul>
                <li>This link will expire in 1 hour for security reasons</li>
                <li>If you didn't request this reset, please ignore this email</li>
                <li>Never share this link with anyone</li>
              </ul>
            </div>
            
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; background: #f0f0f0; padding: 10px; border-radius: 5px;">${resetUrl}</p>
            
            <p>If you didn't request this password reset, please contact our support team immediately.</p>
            
            <p>Stay secure,<br>The Numoracle Team</p>
          </div>
          <div class="footer">
            <p>© 2024 Numoracle. All rights reserved.</p>
            <p>Visit us at <a href="${getEnv("NEXT_PUBLIC_APP_URL")}">${getEnv("NEXT_PUBLIC_APP_URL")}</a></p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  private getPasswordResetEmailTextTemplate(userName: string, resetUrl: string): string {
    return `
Password Reset Request

Hello ${userName}!

We received a request to reset your password for your Numoracle account. If you made this request, use the link below to reset your password:

${resetUrl}

SECURITY NOTICE:
- This link will expire in 1 hour for security reasons
- If you didn't request this reset, please ignore this email
- Never share this link with anyone

If you didn't request this password reset, please contact our support team immediately.

Stay secure,
The Numoracle Team

© 2024 Numoracle. All rights reserved.
Visit us at ${getEnv("NEXT_PUBLIC_APP_URL")}
    `
  }

  private getContactFormNotificationTemplate(formData: {
    name: string
    email: string
    subject: string
    message: string
  }): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2c3e50; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .field { margin: 15px 0; padding: 10px; background: white; border-radius: 5px; border-left: 4px solid #3498db; }
          .field-label { font-weight: bold; color: #2c3e50; }
          .message-content { background: #ecf0f1; padding: 15px; border-radius: 5px; margin-top: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 New Contact Form Submission</h1>
            <p>Numoracle Admin Notification</p>
          </div>
          <div class="content">
            <h2>Contact Details</h2>
            
            <div class="field">
              <div class="field-label">Name:</div>
              <div>${formData.name}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Email:</div>
              <div>${formData.email}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Subject:</div>
              <div>${formData.subject}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Message:</div>
              <div class="message-content">${formData.message.replace(/\n/g, "<br>")}</div>
            </div>
            
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            
            <p>Please respond to this inquiry promptly.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  private getContactFormNotificationTextTemplate(formData: {
    name: string
    email: string
    subject: string
    message: string
  }): string {
    return `
New Contact Form Submission - Numoracle

Contact Details:
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

Submitted: ${new Date().toLocaleString()}

Please respond to this inquiry promptly.
    `
  }

  private getContactConfirmationTemplate(userName: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Contacting Numoracle</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You!</h1>
            <p>Your message has been received</p>
          </div>
          <div class="content">
            <h2>Hello ${userName}!</h2>
            <p>Thank you for reaching out to Numoracle. We have received your message and will respond within 24-48 hours.</p>
            
            <p>In the meantime, feel free to explore our mystical tools and resources:</p>
            <ul>
              <li>🔮 Try a free oracle card reading</li>
              <li>🔢 Calculate your numerology profile</li>
              <li>📚 Browse our knowledge library</li>
              <li>🎲 Roll the elemental dice</li>
            </ul>
            
            <div style="text-align: center;">
              <a href="${getEnv("NEXT_PUBLIC_APP_URL")}" class="button">Explore Numoracle</a>
            </div>
            
            <p>We appreciate your interest in Numoracle and look forward to assisting you on your mystical journey.</p>
            
            <p>Blessed be,<br>The Numoracle Team</p>
          </div>
          <div class="footer">
            <p>© 2024 Numoracle. All rights reserved.</p>
            <p>Visit us at <a href="${getEnv("NEXT_PUBLIC_APP_URL")}">${getEnv("NEXT_PUBLIC_APP_URL")}</a></p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  private getContactConfirmationTextTemplate(userName: string): string {
    return `
Thank You for Contacting Numoracle!

Hello ${userName}!

Thank you for reaching out to Numoracle. We have received your message and will respond within 24-48 hours.

In the meantime, feel free to explore our mystical tools and resources:
- Try a free oracle card reading
- Calculate your numerology profile
- Browse our knowledge library
- Roll the elemental dice

Explore Numoracle: ${getEnv("NEXT_PUBLIC_APP_URL")}

We appreciate your interest in Numoracle and look forward to assisting you on your mystical journey.

Blessed be,
The Numoracle Team

© 2024 Numoracle. All rights reserved.
Visit us at ${getEnv("NEXT_PUBLIC_APP_URL")}
    `
  }

  // Health check method
  async healthCheck(): Promise<{ success: boolean; error?: string }> {
    try {
      if (!this.apiKey) {
        return { success: false, error: "API key not configured" }
      }

      // Test API connectivity with account info endpoint
      const response = await fetch(`${this.baseUrl}/account`, {
        headers: {
          Accept: "application/json",
          "api-key": this.apiKey,
        },
      })

      if (!response.ok) {
        return { success: false, error: `API health check failed: ${response.status}` }
      }

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  // Get current admin email configuration for debugging
  getAdminEmailConfig(): { email: string; source: string; isValid: boolean } {
    const validation = validateAdminEmail()
    return {
      email: this.adminEmail,
      source: validation.source,
      isValid: validation.isValid,
    }
  }
}

// Export singleton instance
export const brevoEmailService = new BrevoEmailService()
