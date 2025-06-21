"use server"

import { z } from "zod"
import { createServerClient } from "@/lib/supabase-server"
import { brevoEmailService } from "@/lib/services/brevo-email-service"

// Define the schema for a single item in the order
const OrderItemSchema = z.object({
  id: z.string().uuid(),
  productId: z.string().optional(),
  name: z.string().min(1, "Item name cannot be empty.").max(100, "Item name too long."),
  quantity: z.coerce.number().int().positive("Quantity must be a positive integer.").max(99, "Quantity too high."),
  price: z.coerce.number().nonnegative("Price must be a non-negative number.").max(9999.99, "Price too high."),
  description: z.string().optional(),
})

// Define the main schema for the manual order
const ManualOrderSchema = z.object({
  customerName: z.string().min(2, "Full name must be at least 2 characters.").max(100, "Name too long."),
  customerEmail: z.string().email("Invalid email address.").max(255, "Email too long."),
  customerPhone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[+]?[1-9][\d\s\-()]{7,15}$/.test(val.replace(/[\s\-()]/g, "")),
      "Invalid phone number format",
    ),
  shippingAddressStreet: z.string().min(3, "Street address is required.").max(200, "Address too long."),
  shippingAddressCity: z.string().min(2, "City is required.").max(100, "City name too long."),
  shippingAddressState: z.string().min(2, "State/Province is required.").max(100, "State name too long."),
  shippingAddressZip: z.string().min(3, "ZIP/Postal code is required.").max(20, "ZIP code too long."),
  shippingAddressCountry: z.string().min(2, "Country is required.").max(100, "Country name too long."),
  orderItems: z.string().refine(
    (val) => {
      try {
        const parsed = JSON.parse(val)
        return (
          Array.isArray(parsed) &&
          parsed.length > 0 &&
          parsed.length <= 20 &&
          parsed.every((item) => OrderItemSchema.safeParse(item).success)
        )
      } catch {
        return false
      }
    },
    { message: "Order items are invalid, empty, or exceed maximum limit (20 items)." },
  ),
  notes: z.string().max(1000, "Notes too long.").optional(),
  website: z.string().max(0, "Spam detected.").optional(),
})

export type OrderItem = z.infer<typeof OrderItemSchema>

interface OrderSubmissionResult {
  message: string
  success: boolean
  errors?: Record<string, string[] | undefined> | null
  fieldErrors?: Record<string, string[] | undefined> | null
  itemErrors?: { index: number; field: keyof OrderItem; message: string }[] | null
  orderId?: string | null
  emailStatus?: {
    customerEmailSent: boolean
    adminEmailSent: boolean
    emailErrors?: string[]
  }
}

export async function submitManualOrder(
  prevState: OrderSubmissionResult,
  formData: FormData,
): Promise<OrderSubmissionResult> {
  const supabase = createServerClient()

  // Check honeypot field for spam protection
  const honeypot = formData.get("website") as string
  if (honeypot && honeypot.length > 0) {
    return {
      message: "Submission rejected. Please try again.",
      success: false,
      errors: { general: ["Invalid submission detected."] },
      fieldErrors: null,
      itemErrors: null,
      orderId: null,
    }
  }

  const rawOrderItems = formData.get("orderItems") as string
  let parsedOrderItems: OrderItem[] = []

  try {
    parsedOrderItems = JSON.parse(rawOrderItems)
    if (!Array.isArray(parsedOrderItems) || parsedOrderItems.length === 0) {
      throw new Error("No items in order.")
    }

    // Validate each item
    const itemValidationResults = parsedOrderItems.map((item, index) => ({
      index,
      result: OrderItemSchema.safeParse(item),
    }))
    const failedItems = itemValidationResults.filter((r) => !r.result.success)

    if (failedItems.length > 0) {
      const itemErrors: { index: number; field: keyof OrderItem; message: string }[] = []
      failedItems.forEach((failure) => {
        if (failure.result.success === false) {
          const fieldErrors = failure.result.error.flatten().fieldErrors
          for (const key in fieldErrors) {
            if (fieldErrors[key as keyof OrderItem]) {
              itemErrors.push({
                index: failure.index,
                field: key as keyof OrderItem,
                message: fieldErrors[key as keyof OrderItem]![0],
              })
            }
          }
        }
      })
      return {
        message: "Validation failed for some order items. Please check your input.",
        success: false,
        itemErrors,
        fieldErrors: null,
        orderId: null,
      }
    }
  } catch (e) {
    return {
      message: "Invalid order items format or no items provided.",
      success: false,
      errors: { orderItems: ["Order items are required and must be in valid format."] },
      fieldErrors: null,
      itemErrors: null,
      orderId: null,
    }
  }

  const validatedFields = ManualOrderSchema.safeParse({
    customerName: formData.get("customerName"),
    customerEmail: formData.get("customerEmail"),
    customerPhone: formData.get("customerPhone"),
    shippingAddressStreet: formData.get("shippingAddressStreet"),
    shippingAddressCity: formData.get("shippingAddressCity"),
    shippingAddressState: formData.get("shippingAddressState"),
    shippingAddressZip: formData.get("shippingAddressZip"),
    shippingAddressCountry: formData.get("shippingAddressCountry"),
    orderItems: rawOrderItems,
    notes: formData.get("notes"),
    website: formData.get("website"),
  })

  if (!validatedFields.success) {
    console.error("Overall validation errors:", validatedFields.error.flatten().fieldErrors)
    return {
      message: "Validation failed. Please check your input.",
      success: false,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      itemErrors: null,
      orderId: null,
    }
  }

  const {
    customerName,
    customerEmail,
    customerPhone,
    shippingAddressStreet,
    shippingAddressCity,
    shippingAddressState,
    shippingAddressZip,
    shippingAddressCountry,
    notes,
  } = validatedFields.data

  const totalAmount = parsedOrderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

  // Insert order into database
  const { data: orderData, error: supabaseError } = await supabase
    .from("manual_orders")
    .insert([
      {
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        shipping_address_street: shippingAddressStreet,
        shipping_address_city: shippingAddressCity,
        shipping_address_state: shippingAddressState,
        shipping_address_zip: shippingAddressZip,
        shipping_address_country: shippingAddressCountry,
        order_items: parsedOrderItems,
        total_amount: totalAmount,
        notes: notes,
        status: "pending_payment",
        created_at: new Date().toISOString(),
      },
    ])
    .select("id")
    .single()

  if (supabaseError) {
    console.error("Supabase error inserting manual order:", supabaseError)
    return {
      message: `Failed to submit order: Database error occurred. Please try again.`,
      success: false,
      fieldErrors: null,
      itemErrors: null,
      orderId: null,
    }
  }

  // Prepare order data for emails
  const orderDetails = {
    orderNumber,
    orderId: orderData.id,
    customerName,
    customerEmail,
    customerPhone,
    shippingAddress: {
      street: shippingAddressStreet,
      city: shippingAddressCity,
      state: shippingAddressState,
      zip: shippingAddressZip,
      country: shippingAddressCountry,
    },
    items: parsedOrderItems,
    totalAmount,
    notes,
    submittedAt: new Date(),
  }

  // Send emails using Brevo
  const emailResults = await sendOrderEmails(orderDetails)

  console.log("Manual order submitted successfully, Order ID:", orderData?.id, "Email Status:", emailResults)

  return {
    message: emailResults.bothSent
      ? "Order submitted successfully! Confirmation emails have been sent."
      : emailResults.customerSent
        ? "Order submitted successfully! Confirmation email sent to you. Admin notification may be delayed."
        : "Order submitted successfully! Email notifications may be delayed, but we have received your order.",
    success: true,
    fieldErrors: null,
    itemErrors: null,
    orderId: orderNumber,
    emailStatus: {
      customerEmailSent: emailResults.customerSent,
      adminEmailSent: emailResults.adminSent,
      emailErrors: emailResults.errors.length > 0 ? emailResults.errors : undefined,
    },
  }
}

async function sendOrderEmails(orderDetails: {
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
}) {
  const results = {
    customerSent: false,
    adminSent: false,
    bothSent: false,
    errors: [] as string[],
  }

  console.log("Starting email sending process for order:", orderDetails.orderNumber)

  try {
    // Send customer confirmation email
    console.log("Sending customer confirmation email to:", orderDetails.customerEmail)
    const customerEmailResult = await brevoEmailService.sendOrderConfirmationEmail(
      orderDetails.customerEmail,
      orderDetails.customerName,
      orderDetails,
    )

    console.log("Customer email result:", customerEmailResult)

    if (customerEmailResult.success) {
      results.customerSent = true
      console.log("✅ Customer email sent successfully")
    } else {
      const errorMsg = `Customer email failed: ${customerEmailResult.error}`
      results.errors.push(errorMsg)
      console.error("❌ Customer email failed:", customerEmailResult.error)
    }

    // Send admin notification email
    console.log("Sending admin notification email...")
    const adminEmailResult = await brevoEmailService.sendOrderNotificationEmail(orderDetails)

    console.log("Admin email result:", adminEmailResult)

    if (adminEmailResult.success) {
      results.adminSent = true
      console.log("✅ Admin email sent successfully")
    } else {
      const errorMsg = `Admin email failed: ${adminEmailResult.error}`
      results.errors.push(errorMsg)
      console.error("❌ Admin email failed:", adminEmailResult.error)
    }

    results.bothSent = results.customerSent && results.adminSent

    console.log("Email sending summary:", {
      customerSent: results.customerSent,
      adminSent: results.adminSent,
      bothSent: results.bothSent,
      errors: results.errors,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown email error"
    results.errors.push(`Email service error: ${errorMessage}`)
    console.error("Email sending error:", error)
  }

  return results
}
