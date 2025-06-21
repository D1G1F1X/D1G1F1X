import { describe, it, expect, beforeEach, vi } from "vitest"
import { submitManualOrder } from "../actions"

// Mock dependencies
vi.mock("@/lib/supabase-server", () => ({
  createServerClient: () => ({
    from: () => ({
      insert: () => ({
        select: () => ({
          single: () =>
            Promise.resolve({
              data: { id: "test-id", order_number: "ORD-TEST-123" },
              error: null,
            }),
        }),
      }),
    }),
  }),
}))

vi.mock("@/lib/services/brevo-email-service", () => ({
  brevoEmailService: {
    sendOrderConfirmationEmail: vi.fn(),
    sendOrderNotificationEmail: vi.fn(),
  },
}))

describe("Manual Checkout Actions", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("Form Validation Tests", () => {
    it("should validate required customer information", async () => {
      const formData = new FormData()
      // Missing required fields

      const result = await submitManualOrder(
        {
          message: "",
          success: false,
          errors: null,
          fieldErrors: null,
          itemErrors: null,
          orderId: null,
        },
        formData,
      )

      expect(result.success).toBe(false)
      expect(result.fieldErrors).toBeDefined()
    })

    it("should validate email format", async () => {
      const formData = new FormData()
      formData.append("customerName", "John Doe")
      formData.append("customerEmail", "invalid-email")
      formData.append("shippingAddressStreet", "123 Main St")
      formData.append("shippingAddressCity", "Anytown")
      formData.append("shippingAddressState", "CA")
      formData.append("shippingAddressZip", "12345")
      formData.append("shippingAddressCountry", "USA")
      formData.append(
        "orderItems",
        JSON.stringify([
          {
            id: "item-1",
            name: "Test Item",
            quantity: 1,
            price: 10.0,
          },
        ]),
      )

      const result = await submitManualOrder(
        {
          message: "",
          success: false,
          errors: null,
          fieldErrors: null,
          itemErrors: null,
          orderId: null,
        },
        formData,
      )

      expect(result.success).toBe(false)
      expect(result.fieldErrors?.customerEmail).toContain("Invalid email address")
    })

    it("should validate order items", async () => {
      const formData = new FormData()
      formData.append("customerName", "John Doe")
      formData.append("customerEmail", "john@example.com")
      formData.append("shippingAddressStreet", "123 Main St")
      formData.append("shippingAddressCity", "Anytown")
      formData.append("shippingAddressState", "CA")
      formData.append("shippingAddressZip", "12345")
      formData.append("shippingAddressCountry", "USA")
      formData.append(
        "orderItems",
        JSON.stringify([
          {
            id: "item-1",
            name: "", // Invalid: empty name
            quantity: 1,
            price: 10.0,
          },
        ]),
      )

      const result = await submitManualOrder(
        {
          message: "",
          success: false,
          errors: null,
          fieldErrors: null,
          itemErrors: null,
          orderId: null,
        },
        formData,
      )

      expect(result.success).toBe(false)
      expect(result.itemErrors).toBeDefined()
    })

    it("should detect honeypot spam protection", async () => {
      const formData = new FormData()
      formData.append("website", "spam-content") // Honeypot field

      const result = await submitManualOrder(
        {
          message: "",
          success: false,
          errors: null,
          fieldErrors: null,
          itemErrors: null,
          orderId: null,
        },
        formData,
      )

      expect(result.success).toBe(false)
      expect(result.message).toContain("Submission rejected")
    })
  })

  describe("Successful Order Submission Tests", () => {
    it("should process valid order successfully", async () => {
      const { brevoEmailService } = await import("@/lib/services/brevo-email-service")

      // Mock successful email sending
      ;(brevoEmailService.sendOrderConfirmationEmail as any).mockResolvedValue({ success: true })
      ;(brevoEmailService.sendOrderNotificationEmail as any).mockResolvedValue({ success: true })

      const formData = new FormData()
      formData.append("customerName", "John Doe")
      formData.append("customerEmail", "john@example.com")
      formData.append("customerPhone", "+1234567890")
      formData.append("shippingAddressStreet", "123 Main St")
      formData.append("shippingAddressCity", "Anytown")
      formData.append("shippingAddressState", "CA")
      formData.append("shippingAddressZip", "12345")
      formData.append("shippingAddressCountry", "USA")
      formData.append(
        "orderItems",
        JSON.stringify([
          {
            id: "item-1",
            name: "Oracle Card Deck",
            quantity: 1,
            price: 29.99,
            description: "Complete oracle card set",
          },
        ]),
      )
      formData.append("notes", "Please handle with care")

      const result = await submitManualOrder(
        {
          message: "",
          success: false,
          errors: null,
          fieldErrors: null,
          itemErrors: null,
          orderId: null,
        },
        formData,
      )

      expect(result.success).toBe(true)
      expect(result.orderId).toBe("test-id")
      expect(result.emailStatus?.customerEmailSent).toBe(true)
      expect(result.emailStatus?.adminEmailSent).toBe(true)
    })
  })
})
