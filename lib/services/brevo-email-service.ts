// Ensure this service only runs on the server
if (typeof window !== "undefined") {
  throw new Error("BrevoEmailService should only be used on the server side")
}

// Safe environment variable access for server-side only
const BREVO_API_KEY = process.env.BREVO_API_KEY
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || "noreply@numoracle.com"
const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME || "Numoracle"
const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
const ADMIN_EMAIL_FOR_NOTIFICATIONS = process.env.ADMIN_EMAIL_FOR_NOTIFICATIONS || "admin@numoracle.com" // Ensure this is defined

interface EmailResponse {
  success: boolean
  error?: string
}

interface OrderData {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string | null
  shipping_address_street: string
  shipping_address_city: string
  shipping_address_state: string
  shipping_address_zip: string
  shipping_address_country: string
  order_items: Array<{
    productId: string
    productName: string
    quantity: number
    price: number
    image: string | null
  }>
  notes: string | null
  status: string
  created_at: string
}

export class BrevoEmailService {
  private apiKey: string
  private senderEmail: string
  private senderName: string
  private apiUrl: string

  constructor() {
    if (!BREVO_API_KEY) {
      console.warn("BREVO_API_KEY is not set. Email service will not function.")
    }
    this.apiKey = BREVO_API_KEY || ""
    this.senderEmail = BREVO_SENDER_EMAIL
    this.senderName = BREVO_SENDER_NAME
    this.apiUrl = "https://api.brevo.com/v3/smtp/email"
  }

  private async sendTransactionalEmail(
    toEmail: string,
    toName: string,
    subject: string,
    htmlContent: string,
    textContent: string,
  ): Promise<EmailResponse> {
    if (!this.apiKey) {
      console.error("Brevo API key is not configured. Cannot send email.")
      return { success: false, error: "Brevo API key is not configured." }
    }
    if (!toEmail || !toEmail.includes("@")) {
      // Basic validation for recipient email
      console.error("Invalid recipient email address provided:", toEmail)
      return { success: false, error: "Invalid recipient email address." }
    }

    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "api-key": this.apiKey,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          sender: { email: this.senderEmail, name: this.senderName },
          to: [{ email: toEmail, name: toName }],
          subject: subject,
          htmlContent: htmlContent,
          textContent: textContent,
        }),
      })

      if (!response.ok) {
        let errorDetails = `Status: ${response.status} ${response.statusText}`
        let errorData: any = null
        try {
          errorData = await response.json()
          errorDetails += `, Details: ${JSON.stringify(errorData)}`
        } catch (jsonError) {
          // If response is not JSON, try to get raw text
          const textError = await response.text()
          errorDetails += `, Raw Response: ${textError.substring(0, 200)}...`
          console.warn("Brevo API response was not JSON:", textError) // Log the non-JSON response
        }
        console.error("Brevo API error:", errorDetails)
        return { success: false, error: `Failed to send email via Brevo API. ${errorDetails}` }
      }

      return { success: true }
    } catch (error: any) {
      console.error("Error sending email (network/fetch issue):", error)
      return { success: false, error: error.message || "Network error or unexpected issue." }
    }
  }

  public async sendWelcomeEmail(email: string, userName: string): Promise<EmailResponse> {
    const subject = "Welcome to Numoracle!"
    const htmlContent = `
      <p>Dear ${userName},</p>
      <p>Welcome to Numoracle! We're thrilled to have you join our community.</p>
      <p>Explore the mystical world of numbers and discover insights into your life's journey.</p>
      <p>Get started by visiting your dashboard: <a href="${NEXT_PUBLIC_APP_URL}/dashboard">${NEXT_PUBLIC_APP_URL}/dashboard</a></p>
      <p>If you have any questions, feel free to contact us.</p>
      <p>Sincerely,<br/>The Numoracle Team</p>
    `
    const textContent = `
      Dear ${userName},

      Welcome to Numoracle! We're thrilled to have you join our community.

      Explore the mystical world of numbers and discover insights into your life's journey.

      Get started by visiting your dashboard: ${NEXT_PUBLIC_APP_URL}/dashboard

      If you have any questions, feel free to contact us.

      Sincerely,
      The Numoracle Team
    `
    return this.sendTransactionalEmail(email, userName, subject, htmlContent, textContent)
  }

  public async sendPasswordResetEmail(email: string, userName: string, resetToken: string): Promise<EmailResponse> {
    const subject = "Numoracle Password Reset Request"
    const resetLink = `${NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`
    const htmlContent = `
      <p>Dear ${userName},</p>
      <p>You have requested to reset your password for your Numoracle account.</p>
      <p>Please click on the link below to reset your password:</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
      <p>This link will expire in 1 hour for security reasons.</p>
      <p>If you did not request a password reset, please ignore this email.</p>
      <p>Sincerely,<br/>The Numoracle Team</p>
    `
    const textContent = `
      Dear ${userName},

      You have requested to reset your password for your Numoracle account.

      Please click on the link below to reset your password:
      ${resetLink}

      This link will expire in 1 hour for security reasons.

      If you did not request a password reset, please ignore this email.

      Sincerely,
      The Numoracle Team
    `
    return this.sendTransactionalEmail(email, userName, subject, htmlContent, textContent)
  }

  public async sendContactFormEmail(formData: {
    name: string
    email: string
    subject: string
    message: string
  }): Promise<EmailResponse> {
    const subject = `New Contact Form Submission: ${formData.subject}`
    const htmlContent = `
      <p>You have received a new message from the Numoracle contact form:</p>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Subject:</strong> ${formData.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message.replace(/\n/g, "<br/>")}</p>
      <p>Please respond to this inquiry as soon as possible.</p>
    `
    const textContent = `
      You have received a new message from the Numoracle contact form:

      Name: ${formData.name}
      Email: ${formData.email}
      Subject: ${formData.subject}
      Message:
      ${formData.message}

      Please respond to this inquiry as soon as possible.
    `
    // Send to admin email for contact forms
    return this.sendTransactionalEmail(
      ADMIN_EMAIL_FOR_NOTIFICATIONS,
      this.senderName,
      subject,
      htmlContent,
      textContent,
    )
  }

  public async sendOrderConfirmationEmail(
    customerEmail: string,
    customerName: string,
    order: OrderData,
  ): Promise<EmailResponse> {
    const subject = `Your Numoracle Order Confirmation #${order.id}`
    const orderItemsHtml = order.order_items
      .map(
        (item) => `
      <li>
        ${item.productName} (x${item.quantity}) - $${item.price.toFixed(2)} each
      </li>
    `,
      )
      .join("")

    const total = order.order_items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)

    const htmlContent = `
      <p>Dear ${order.customer_name},</p>
      <p>Thank you for your order from Numoracle! Your order #${order.id} has been received and is being processed.</p>
      
      <h3>Order Details:</h3>
      <ul>
        ${orderItemsHtml}
      </ul>
      <p><strong>Total: $${total}</strong></p>

      <h3>Shipping Address:</h3>
      <p>
        ${order.shipping_address_street}<br/>
        ${order.shipping_address_city}, ${order.shipping_address_state} ${order.shipping_address_zip}<br/>
        ${order.shipping_address_country}
      </p>
      ${order.notes ? `<p><strong>Notes:</strong> ${order.notes}</p>` : ""}
      <p>We will send you another email when your order ships.</p>
      <p>Sincerely,<br/>The Numoracle Team</p>
    `
    const textContent = `
      Dear ${order.customer_name},

      Thank you for your order from Numoracle! Your order #${order.id} has been received and is being processed.

      Order Details:
      ${order.order_items.map((item) => `${item.productName} (x${item.quantity}) - $${item.price.toFixed(2)} each`).join("\n")}
      Total: $${total}

      Shipping Address:
      ${order.shipping_address_street}
      ${order.shipping_address_city}, ${order.shipping_address_state} ${order.shipping_address_zip}
      ${order.shipping_address_country}
      ${order.notes ? `Notes: ${order.notes}` : ""}

      We will send you another email when your order ships.

      Sincerely,
      The Numoracle Team
    `

    return this.sendTransactionalEmail(customerEmail, customerName, subject, htmlContent, textContent)
  }

  public async sendAdminOrderNotification(order: OrderData): Promise<EmailResponse> {
    const subject = `NEW Numoracle Order Received: #${order.id}`
    const orderItemsHtml = order.order_items
      .map(
        (item) => `
      <li>
        ${item.productName} (x${item.quantity}) - $${item.price.toFixed(2)} each
      </li>
    `,
      )
      .join("")

    const total = order.order_items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)

    const htmlContent = `
      <p>A new order has been placed on Numoracle!</p>
      
      <h3>Order #${order.id} Details:</h3>
      <p><strong>Customer Name:</strong> ${order.customer_name}</p>
      <p><strong>Customer Email:</strong> ${order.customer_email}</p>
      ${order.customer_phone ? `<p><strong>Customer Phone:</strong> ${order.customer_phone}</p>` : ""}

      <h4>Items:</h4>
      <ul>
        ${orderItemsHtml}
      </ul>
      <p><strong>Order Total: $${total}</strong></p>

      <h4>Shipping Address:</h4>
      <p>
        ${order.shipping_address_street}<br/>
        ${order.shipping_address_city}, ${order.shipping_address_state} ${order.shipping_address_zip}<br/>
        ${order.shipping_address_country}
      </p>
      ${order.notes ? `<p><strong>Customer Notes:</strong> ${order.notes}</p>` : ""}
      <p><strong>Order Status:</strong> ${order.status}</p>
      <p>Please log into the admin dashboard to process this order.</p>
    `
    const textContent = `
      A new order has been placed on Numoracle!

      Order #${order.id} Details:
      Customer Name: ${order.customer_name}
      Customer Email: ${order.customer_email}
      ${order.customer_phone ? `Customer Phone: ${order.customer_phone}` : ""}

      Items:
      ${order.order_items.map((item) => `${item.productName} (x${item.quantity}) - $${item.price.toFixed(2)} each`).join("\n")}
      Order Total: $${total}

      Shipping Address:
      ${order.shipping_address_street}
      ${order.shipping_address_city}, ${order.shipping_address_state} ${order.shipping_address_zip}
      ${order.shipping_address_country}
      ${order.notes ? `Customer Notes: ${order.notes}` : ""}
      Order Status: ${order.status}

      Please log into the admin dashboard to process this order.
    `

    return this.sendTransactionalEmail(ADMIN_EMAIL_FOR_NOTIFICATIONS, "Admin", subject, htmlContent, textContent)
  }
}

// --- singleton instance ----------------------------------------------------
export const brevoEmailService = new BrevoEmailService()
