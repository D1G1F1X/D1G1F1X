import { getEnv } from "@/lib/env"

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

    if (!this.apiKey) {
      console.warn("Brevo API key not configured. Email service will be disabled.")
    }
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
    // Send notification to admin
    const adminEmailData: BrevoEmailRequest = {
      sender: {
        name: this.senderName,
        email: this.senderEmail,
      },
      to: [{ email: "admin@numoracle.com", name: "Numoracle Admin" }],
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

  async sendOrderConfirmationEmail(
    to: string,
    customerName: string,
    orderDetails: {
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
      items: Array<{
        name: string
        quantity: number
        price: number
        description?: string
      }>
      totalAmount: number
      notes?: string
      submittedAt: Date
    },
  ): Promise<{ success: boolean; error?: string }> {
    const emailData: BrevoEmailRequest = {
      sender: {
        name: this.senderName,
        email: this.senderEmail,
      },
      to: [{ email: to, name: customerName }],
      subject: `Order Confirmation - ${orderDetails.orderNumber}`,
      htmlContent: this.getOrderConfirmationEmailTemplate(orderDetails),
      textContent: this.getOrderConfirmationEmailTextTemplate(orderDetails),
      tags: ["order-confirmation", "manual-checkout"],
    }

    const result = await this.sendTransactionalEmail(emailData)
    return {
      success: result.success,
      error: result.error,
    }
  }

  async sendOrderNotificationEmail(orderDetails: {
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
    items: Array<{
      name: string
      quantity: number
      price: number
      description?: string
    }>
    totalAmount: number
    notes?: string
    submittedAt: Date
  }): Promise<{ success: boolean; error?: string }> {
    const emailData: BrevoEmailRequest = {
      sender: {
        name: this.senderName,
        email: this.senderEmail,
      },
      to: [{ email: "admin@numoracle.com", name: "Numoracle Admin" }],
      subject: `New Manual Order - ${orderDetails.orderNumber} - $${orderDetails.totalAmount.toFixed(2)}`,
      htmlContent: this.getOrderNotificationEmailTemplate(orderDetails),
      textContent: this.getOrderNotificationEmailTextTemplate(orderDetails),
      tags: ["order-notification", "admin-alert", "manual-checkout"],
    }

    const result = await this.sendTransactionalEmail(emailData)
    return {
      success: result.success,
      error: result.error,
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

  // Order confirmation email template for customers
  private getOrderConfirmationEmailTemplate(orderDetails: {
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
    items: Array<{
      name: string
      quantity: number
      price: number
      description?: string
    }>
    totalAmount: number
    notes?: string
    submittedAt: Date
  }): string {
    const itemsHtml = orderDetails.items
      .map(
        (item) => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; text-align: left;">${item.name}</td>
        <td style="padding: 12px; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; text-align: right;">$${item.price.toFixed(2)}</td>
        <td style="padding: 12px; text-align: right; font-weight: bold;">$${(item.quantity * item.price).toFixed(2)}</td>
      </tr>
      ${item.description ? `<tr><td colspan="4" style="padding: 0 12px 12px 12px; font-size: 14px; color: #666; font-style: italic;">${item.description}</td></tr>` : ""}
    `,
      )
      .join("")

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation - ${orderDetails.orderNumber}</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 700px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 300; }
        .header p { margin: 10px 0 0 0; opacity: 0.9; }
        .content { padding: 40px 30px; }
        .order-info { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .order-info h3 { margin: 0 0 15px 0; color: #495057; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
        .info-section h4 { margin: 0 0 10px 0; color: #6c757d; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
        .info-section p { margin: 5px 0; }
        .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #dee2e6; border-radius: 8px; overflow: hidden; }
        .items-table th { background: #495057; color: white; padding: 15px 12px; text-align: left; font-weight: 500; }
        .items-table th:nth-child(2), .items-table th:nth-child(3), .items-table th:nth-child(4) { text-align: center; }
        .items-table th:nth-child(3), .items-table th:nth-child(4) { text-align: right; }
        .total-row { background: #e9ecef; font-weight: bold; font-size: 18px; }
        .total-row td { padding: 20px 12px; }
        .next-steps { background: #d1ecf1; border: 1px solid #bee5eb; padding: 20px; border-radius: 8px; margin: 30px 0; }
        .next-steps h3 { color: #0c5460; margin: 0 0 15px 0; }
        .next-steps ul { margin: 10px 0; padding-left: 20px; }
        .next-steps li { margin: 8px 0; }
        .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 500; }
        .footer { background: #f8f9fa; padding: 30px; text-align: center; color: #6c757d; border-top: 1px solid #dee2e6; }
        .footer p { margin: 5px 0; }
        @media (max-width: 600px) {
          .info-grid { grid-template-columns: 1fr; }
          .container { margin: 0; }
          .content { padding: 20px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Order Confirmation</h1>
          <p>Thank you for your order with Numoracle</p>
        </div>
        
        <div class="content">
          <div class="order-info">
            <h3>📋 Order Details</h3>
            <p><strong>Order Number:</strong> ${orderDetails.orderNumber}</p>
            <p><strong>Order Date:</strong> ${orderDetails.submittedAt.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}</p>
            <p><strong>Status:</strong> <span style="color: #ffc107; font-weight: bold;">Pending Payment</span></p>
          </div>

          <div class="info-grid">
            <div class="info-section">
              <h4>👤 Customer Information</h4>
              <p><strong>${orderDetails.customerName}</strong></p>
              <p>${orderDetails.customerEmail}</p>
              ${orderDetails.customerPhone ? `<p>${orderDetails.customerPhone}</p>` : ""}
            </div>
            
            <div class="info-section">
              <h4>🚚 Shipping Address</h4>
              <p>${orderDetails.shippingAddress.street}</p>
              <p>${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state} ${orderDetails.shippingAddress.zip}</p>
              <p>${orderDetails.shippingAddress.country}</p>
            </div>
          </div>

          <h3>🛍️ Order Items</h3>
          <table class="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
              <tr class="total-row">
                <td colspan="3" style="text-align: right;">Total Amount:</td>
                <td style="text-align: right;">$${orderDetails.totalAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          ${
            orderDetails.notes
              ? `
          <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <h4 style="margin: 0 0 10px 0; color: #856404;">📝 Order Notes</h4>
            <p style="margin: 0; color: #856404;">${orderDetails.notes}</p>
          </div>
          `
              : ""
          }

          <div class="next-steps">
            <h3>🎯 What Happens Next?</h3>
            <ul>
              <li><strong>Payment Processing:</strong> We'll contact you within 24 hours with payment instructions</li>
              <li><strong>Order Preparation:</strong> Once payment is received, we'll prepare your mystical items</li>
              <li><strong>Shipping:</strong> Your order will be carefully packaged and shipped to your address</li>
              <li><strong>Tracking:</strong> You'll receive tracking information once your order ships</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${getEnv("NEXT_PUBLIC_APP_URL")}/order-status?order=${orderDetails.orderNumber}" class="button">Track Your Order</a>
          </div>

          <p>If you have any questions about your order, please don't hesitate to contact us. We're here to help you on your mystical journey!</p>
          
          <p style="margin-top: 30px;">Blessed be,<br><strong>The Numoracle Team</strong></p>
        </div>
        
        <div class="footer">
          <p><strong>Numoracle</strong> - Your Gateway to Mystical Wisdom</p>
          <p>© 2024 Numoracle. All rights reserved.</p>
          <p>Visit us at <a href="${getEnv("NEXT_PUBLIC_APP_URL")}" style="color: #667eea;">${getEnv("NEXT_PUBLIC_APP_URL")}</a></p>
        </div>
      </div>
    </body>
    </html>
  `
  }

  // Order confirmation text template for customers
  private getOrderConfirmationEmailTextTemplate(orderDetails: {
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
    items: Array<{
      name: string
      quantity: number
      price: number
      description?: string
    }>
    totalAmount: number
    notes?: string
    submittedAt: Date
  }): string {
    const itemsList = orderDetails.items
      .map(
        (item) =>
          `- ${item.name} (Qty: ${item.quantity}) - $${item.price.toFixed(2)} each = $${(item.quantity * item.price).toFixed(2)}${item.description ? `\n  Description: ${item.description}` : ""}`,
      )
      .join("\n")

    return `
ORDER CONFIRMATION - ${orderDetails.orderNumber}

Thank you for your order with Numoracle!

ORDER DETAILS:
Order Number: ${orderDetails.orderNumber}
Order Date: ${orderDetails.submittedAt.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}
Status: Pending Payment

CUSTOMER INFORMATION:
Name: ${orderDetails.customerName}
Email: ${orderDetails.customerEmail}
${orderDetails.customerPhone ? `Phone: ${orderDetails.customerPhone}` : ""}

SHIPPING ADDRESS:
${orderDetails.shippingAddress.street}
${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state} ${orderDetails.shippingAddress.zip}
${orderDetails.shippingAddress.country}

ORDER ITEMS:
${itemsList}

TOTAL AMOUNT: $${orderDetails.totalAmount.toFixed(2)}

${orderDetails.notes ? `ORDER NOTES:\n${orderDetails.notes}\n` : ""}

WHAT HAPPENS NEXT?
1. Payment Processing: We'll contact you within 24 hours with payment instructions
2. Order Preparation: Once payment is received, we'll prepare your mystical items
3. Shipping: Your order will be carefully packaged and shipped to your address
4. Tracking: You'll receive tracking information once your order ships

Track your order: ${getEnv("NEXT_PUBLIC_APP_URL")}/order-status?order=${orderDetails.orderNumber}

If you have any questions about your order, please don't hesitate to contact us. We're here to help you on your mystical journey!

Blessed be,
The Numoracle Team

Numoracle - Your Gateway to Mystical Wisdom
© 2024 Numoracle. All rights reserved.
Visit us at ${getEnv("NEXT_PUBLIC_APP_URL")}
  `
  }

  // Order notification email template for admin
  private getOrderNotificationEmailTemplate(orderDetails: {
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
    items: Array<{
      name: string
      quantity: number
      price: number
      description?: string
    }>
    totalAmount: number
    notes?: string
    submittedAt: Date
  }): string {
    const itemsHtml = orderDetails.items
      .map(
        (item) => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 10px; border: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">$${item.price.toFixed(2)}</td>
        <td style="padding: 10px; border: 1px solid #ddd; text-align: right; font-weight: bold;">$${(item.quantity * item.price).toFixed(2)}</td>
      </tr>
      ${item.description ? `<tr><td colspan="4" style="padding: 5px 10px; border: 1px solid #ddd; background: #f9f9f9; font-size: 12px; color: #666;">${item.description}</td></tr>` : ""}
    `,
      )
      .join("")

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Manual Order - ${orderDetails.orderNumber}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: #dc3545; color: white; padding: 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .urgent { background: #fff3cd; border: 2px solid #ffc107; padding: 15px; margin: 20px; border-radius: 6px; text-align: center; }
        .content { padding: 30px; }
        .section { margin: 25px 0; padding: 20px; background: #f8f9fa; border-radius: 6px; }
        .section h3 { margin: 0 0 15px 0; color: #495057; border-bottom: 2px solid #dee2e6; padding-bottom: 8px; }
        .customer-info, .shipping-info { display: inline-block; width: 48%; vertical-align: top; }
        .items-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        .items-table th { background: #495057; color: white; padding: 12px; text-align: left; }
        .items-table th:nth-child(2), .items-table th:nth-child(3), .items-table th:nth-child(4) { text-align: center; }
        .items-table th:nth-child(3), .items-table th:nth-child(4) { text-align: right; }
        .total-row { background: #28a745; color: white; font-weight: bold; font-size: 16px; }
        .action-buttons { text-align: center; margin: 30px 0; }
        .button { display: inline-block; background: #007bff; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin: 0 10px; font-weight: bold; }
        .button.success { background: #28a745; }
        .button.warning { background: #ffc107; color: #212529; }
        .footer { background: #6c757d; color: white; padding: 20px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚨 NEW MANUAL ORDER RECEIVED</h1>
          <p>Order #${orderDetails.orderNumber} - $${orderDetails.totalAmount.toFixed(2)}</p>
        </div>
        
        <div class="urgent">
          <strong>⏰ ACTION REQUIRED:</strong> New manual order needs payment processing and fulfillment
        </div>
        
        <div class="content">
          <div class="section">
            <h3>📋 Order Information</h3>
            <p><strong>Order Number:</strong> ${orderDetails.orderNumber}</p>
            <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
            <p><strong>Submitted:</strong> ${orderDetails.submittedAt.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              timeZoneName: "short",
            })}</p>
            <p><strong>Status:</strong> <span style="color: #ffc107; font-weight: bold;">PENDING PAYMENT</span></p>
          </div>

          <div class="section">
            <h3>👤 Customer Details</h3>
            <div class="customer-info">
              <p><strong>Name:</strong> ${orderDetails.customerName}</p>
              <p><strong>Email:</strong> <a href="mailto:${orderDetails.customerEmail}">${orderDetails.customerEmail}</a></p>
              ${orderDetails.customerPhone ? `<p><strong>Phone:</strong> <a href="tel:${orderDetails.customerPhone}">${orderDetails.customerPhone}</a></p>` : ""}
            </div>
            <div class="shipping-info">
              <p><strong>Shipping Address:</strong></p>
              <p>${orderDetails.shippingAddress.street}<br>
              ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state} ${orderDetails.shippingAddress.zip}<br>
              ${orderDetails.shippingAddress.country}</p>
            </div>
          </div>

          <div class="section">
            <h3>🛍️ Order Items</h3>
            <table class="items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
                <tr class="total-row">
                  <td colspan="3" style="text-align: right; padding: 15px;">TOTAL AMOUNT:</td>
                  <td style="text-align: right; padding: 15px;">$${orderDetails.totalAmount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          ${
            orderDetails.notes
              ? `
          <div class="section">
            <h3>📝 Customer Notes</h3>
            <div style="background: white; padding: 15px; border-left: 4px solid #007bff; font-style: italic;">
              "${orderDetails.notes}"
            </div>
          </div>
          `
              : ""
          }

          <div class="action-buttons">
            <a href="${getEnv("NEXT_PUBLIC_APP_URL")}/admin/orders/${orderDetails.orderId}" class="button">View Order Details</a>
            <a href="mailto:${orderDetails.customerEmail}?subject=Payment Instructions - Order ${orderDetails.orderNumber}" class="button success">Send Payment Instructions</a>
            <a href="${getEnv("NEXT_PUBLIC_APP_URL")}/admin/orders" class="button warning">Manage All Orders</a>
          </div>

          <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <h4 style="color: #155724; margin: 0 0 10px 0;">📋 Next Steps:</h4>
            <ol style="color: #155724; margin: 0;">
              <li>Contact customer within 24 hours with payment instructions</li>
              <li>Update order status once payment is received</li>
              <li>Prepare and ship items according to fulfillment process</li>
              <li>Send tracking information to customer</li>
            </ol>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>Numoracle Admin System</strong></p>
          <p>Order received at ${orderDetails.submittedAt.toLocaleString()}</p>
        </div>
      </div>
    </body>
    </html>
  `
  }

  // Order notification text template for admin
  private getOrderNotificationEmailTextTemplate(orderDetails: {
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
    items: Array<{
      name: string
      quantity: number
      price: number
      description?: string
    }>
    totalAmount: number
    notes?: string
    submittedAt: Date
  }): string {
    const itemsList = orderDetails.items
      .map(
        (item) =>
          `- ${item.name} (Qty: ${item.quantity}) - $${item.price.toFixed(2)} each = $${(item.quantity * item.price).toFixed(2)}${item.description ? `\n  Description: ${item.description}` : ""}`,
      )
      .join("\n")

    return `
🚨 NEW MANUAL ORDER RECEIVED 🚨

Order #${orderDetails.orderNumber} - $${orderDetails.totalAmount.toFixed(2)}

⏰ ACTION REQUIRED: New manual order needs payment processing and fulfillment

ORDER INFORMATION:
Order Number: ${orderDetails.orderNumber}
Order ID: ${orderDetails.orderId}
Submitted: ${orderDetails.submittedAt.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    })}
Status: PENDING PAYMENT

CUSTOMER DETAILS:
Name: ${orderDetails.customerName}
Email: ${orderDetails.customerEmail}
${orderDetails.customerPhone ? `Phone: ${orderDetails.customerPhone}` : ""}

SHIPPING ADDRESS:
${orderDetails.shippingAddress.street}
${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state} ${orderDetails.shippingAddress.zip}
${orderDetails.shippingAddress.country}

ORDER ITEMS:
${itemsList}

TOTAL AMOUNT: $${orderDetails.totalAmount.toFixed(2)}

${orderDetails.notes ? `CUSTOMER NOTES:\n"${orderDetails.notes}"\n` : ""}

NEXT STEPS:
1. Contact customer within 24 hours with payment instructions
2. Update order status once payment is received
3. Prepare and ship items according to fulfillment process
4. Send tracking information to customer

ADMIN ACTIONS:
- View Order Details: ${getEnv("NEXT_PUBLIC_APP_URL")}/admin/orders/${orderDetails.orderId}
- Send Payment Instructions: Reply to ${orderDetails.customerEmail}
- Manage All Orders: ${getEnv("NEXT_PUBLIC_APP_URL")}/admin/orders

Numoracle Admin System
Order received at ${orderDetails.submittedAt.toLocaleString()}
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
}

// Export singleton instance
export const brevoEmailService = new BrevoEmailService()
