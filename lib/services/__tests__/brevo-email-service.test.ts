import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { brevoEmailService } from "../brevo-email-service"

// Mock fetch globally
global.fetch = vi.fn()

describe("BrevoEmailService", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset rate limiting
    brevoEmailService["requestCount"] = 0
    brevoEmailService["windowStart"] = Date.now()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe("Configuration Tests", () => {
    it("should initialize with environment variables", () => {
      expect(brevoEmailService["apiKey"]).toBeDefined()
      expect(brevoEmailService["senderEmail"]).toBeDefined()
      expect(brevoEmailService["senderName"]).toBeDefined()
    })

    it("should handle missing API key gracefully", () => {
      const originalApiKey = brevoEmailService["apiKey"]
      brevoEmailService["apiKey"] = ""

      expect(async () => {
        await brevoEmailService.sendWelcomeEmail("test@example.com", "Test User")
      }).rejects.toThrow("Brevo API key not configured")

      brevoEmailService["apiKey"] = originalApiKey
    })
  })

  describe("Rate Limiting Tests", () => {
    it("should track request count correctly", async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({ messageId: "test-123" }),
      }
      ;(global.fetch as any).mockResolvedValue(mockResponse)

      await brevoEmailService.sendWelcomeEmail("test@example.com", "Test User")
      expect(brevoEmailService["requestCount"]).toBe(1)
    })

    it("should enforce rate limits", async () => {
      // Set request count to maximum
      brevoEmailService["requestCount"] = 300

      const result = await brevoEmailService.sendWelcomeEmail("test@example.com", "Test User")
      expect(result.success).toBe(false)
      expect(result.error).toContain("Rate limit exceeded")
    })

    it("should reset rate limit window", () => {
      // Set window start to 25 hours ago
      brevoEmailService["windowStart"] = Date.now() - 25 * 60 * 60 * 1000
      brevoEmailService["requestCount"] = 300

      expect(brevoEmailService["isRateLimited"]()).toBe(false)
      expect(brevoEmailService["requestCount"]).toBe(0)
    })
  })

  describe("Email Sending Tests", () => {
    it("should send welcome email successfully", async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({ messageId: "welcome-123" }),
      }
      ;(global.fetch as any).mockResolvedValue(mockResponse)

      const result = await brevoEmailService.sendWelcomeEmail("test@example.com", "John Doe")

      expect(result.success).toBe(true)
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.brevo.com/v3/smtp/email",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
            "api-key": expect.any(String),
          }),
        }),
      )
    })

    it("should handle API errors gracefully", async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        statusText: "Bad Request",
        json: () => Promise.resolve({ message: "Invalid email address" }),
      }
      ;(global.fetch as any).mockResolvedValue(mockResponse)

      const result = await brevoEmailService.sendWelcomeEmail("invalid-email", "Test User")

      expect(result.success).toBe(false)
      expect(result.error).toContain("Invalid email address")
    })

    it("should handle network errors", async () => {
      ;(global.fetch as any).mockRejectedValue(new Error("Network error"))

      const result = await brevoEmailService.sendWelcomeEmail("test@example.com", "Test User")

      expect(result.success).toBe(false)
      expect(result.error).toContain("Network error")
    })
  })

  describe("Order Email Tests", () => {
    const mockOrderDetails = {
      orderNumber: "ORD-123456",
      orderId: "uuid-123",
      customerName: "John Doe",
      customerEmail: "john@example.com",
      customerPhone: "+1234567890",
      shippingAddress: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        country: "USA",
      },
      items: [
        {
          name: "Oracle Card Deck",
          quantity: 1,
          price: 29.99,
          description: "Complete oracle card set",
        },
      ],
      totalAmount: 29.99,
      notes: "Please handle with care",
      submittedAt: new Date(),
    }

    it("should send order confirmation email successfully", async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({ messageId: "order-conf-123" }),
      }
      ;(global.fetch as any).mockResolvedValue(mockResponse)

      const result = await brevoEmailService.sendOrderConfirmationEmail(
        "john@example.com",
        "John Doe",
        mockOrderDetails,
      )

      expect(result.success).toBe(true)

      const fetchCall = (global.fetch as any).mock.calls[0]
      const requestBody = JSON.parse(fetchCall[1].body)

      expect(requestBody.subject).toContain("ORD-123456")
      expect(requestBody.to[0].email).toBe("john@example.com")
      expect(requestBody.htmlContent).toContain("Oracle Card Deck")
      expect(requestBody.htmlContent).toContain("$29.99")
    })

    it("should send admin notification email successfully", async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({ messageId: "admin-notif-123" }),
      }
      ;(global.fetch as any).mockResolvedValue(mockResponse)

      const result = await brevoEmailService.sendOrderNotificationEmail(mockOrderDetails)

      expect(result.success).toBe(true)

      const fetchCall = (global.fetch as any).mock.calls[0]
      const requestBody = JSON.parse(fetchCall[1].body)

      expect(requestBody.subject).toContain("New Manual Order")
      expect(requestBody.subject).toContain("ORD-123456")
      expect(requestBody.to[0].email).toBe("admin@numoracle.com")
      expect(requestBody.htmlContent).toContain("ACTION REQUIRED")
    })
  })

  describe("Health Check Tests", () => {
    it("should pass health check with valid API key", async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({ email: "test@example.com" }),
      }
      ;(global.fetch as any).mockResolvedValue(mockResponse)

      const result = await brevoEmailService.healthCheck()

      expect(result.success).toBe(true)
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.brevo.com/v3/account",
        expect.objectContaining({
          headers: expect.objectContaining({
            "api-key": expect.any(String),
          }),
        }),
      )
    })

    it("should fail health check with invalid API key", async () => {
      const mockResponse = {
        ok: false,
        status: 401,
      }
      ;(global.fetch as any).mockResolvedValue(mockResponse)

      const result = await brevoEmailService.healthCheck()

      expect(result.success).toBe(false)
      expect(result.error).toContain("API health check failed: 401")
    })
  })
})
