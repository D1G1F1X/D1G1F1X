"use server"

import { z } from "zod"
import { createServerClient } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"

// Enhanced validation schemas
const OrderItemSchema = z.object({
  id: z.string().uuid().optional(), // For client-side keying
  productId: z.string().min(1, "Product ID is required"),
  name: z.string().min(1, "Item name cannot be empty"),
  description: z.string().optional(),
  quantity: z.coerce.number().int().positive("Quantity must be a positive integer"),
  price: z.coerce.number().nonnegative("Price must be non-negative"),
  image: z.string().url().optional(),
})

const CustomerInfoSchema = z.object({
  customerName: z.string().min(2, "Full name must be at least 2 characters"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z
    .string()
    .regex(/^[+]?[1-9][\d]{0,15}$/, "Invalid phone number")
    .optional(),
})

const ShippingAddressSchema = z.object({
  street: z.string().min(3, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State/Province is required"),
  zipCode: z.string().min(3, "ZIP/Postal code is required"),
  country: z.string().min(2, "Country is required"),
})

const PaymentInfoSchema = z.object({
  paymentMethod: z.enum(["credit_card", "paypal", "bank_transfer", "cash_on_delivery"], {
    errorMap: () => ({ message: "Please select a valid payment method" }),
  }),
  paymentStatus: z.enum(["pending", "processing", "completed", "failed"]).default("pending"),
})

const ManualOrderSchema = z.object({
  ...CustomerInfoSchema.shape,
  ...ShippingAddressSchema.shape,
  ...PaymentInfoSchema.shape,
  orderItems: z.string().refine(
    (val) => {
      try {
        const parsed = JSON.parse(val)
        return (
          Array.isArray(parsed) && parsed.length > 0 && parsed.every((item) => OrderItemSchema.safeParse(item).success)
        )
      } catch {
        return false
      }
    },
    { message: "Order items are invalid or empty. Please add at least one item." },
  ),
  notes: z.string().max(500, "Notes cannot exceed 500 characters").optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  privacyAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy",
  }),
})

export type OrderItem = z.infer<typeof OrderItemSchema>
export type ManualOrderFormData = z.infer<typeof ManualOrderSchema>

interface OrderSubmissionState {
  message: string
  success: boolean
  errors?: Record<string, string[] | undefined> | null
  fieldErrors?: Record<string, string[] | undefined> | null
  itemErrors?: { index: number; field: keyof OrderItem; message: string }[] | null
  orderId?: string | null
  orderNumber?: string | null
}

export async function submitManualOrder(
  prevState: OrderSubmissionState,
  formData: FormData,
): Promise<OrderSubmissionState> {
  try {
    const supabase = createServerClient()

    // Parse and validate order items
    const rawOrderItems = formData.get("orderItems") as string
    let parsedOrderItems: OrderItem[] = []

    try {
      parsedOrderItems = JSON.parse(rawOrderItems)
      if (!Array.isArray(parsedOrderItems) || parsedOrderItems.length === 0) {
        throw new Error("No items in order")
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
          if (!failure.result.success) {
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
          orderNumber: null,
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
        orderNumber: null,
      }
    }

    // Validate main form data
    const validatedFields = ManualOrderSchema.safeParse({
      customerName: formData.get("customerName"),
      customerEmail: formData.get("customerEmail"),
      customerPhone: formData.get("customerPhone"),
      street: formData.get("street"),
      city: formData.get("city"),
      state: formData.get("state"),
      zipCode: formData.get("zipCode"),
      country: formData.get("country"),
      paymentMethod: formData.get("paymentMethod"),
      paymentStatus: "pending",
      orderItems: rawOrderItems,
      notes: formData.get("notes"),
      termsAccepted: formData.get("termsAccepted") === "on",
      privacyAccepted: formData.get("privacyAccepted") === "on",
    })

    if (!validatedFields.success) {
      console.error("Validation errors:", validatedFields.error.flatten().fieldErrors)
      return {
        message: "Validation failed. Please check your input.",
        success: false,
        fieldErrors: validatedFields.error.flatten().fieldErrors,
        itemErrors: null,
        orderId: null,
        orderNumber: null,
      }
    }

    const validatedData = validatedFields.data

    // Calculate totals
    const subtotal = parsedOrderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const taxRate = 0.08 // 8% tax rate - should be configurable
    const taxAmount = subtotal * taxRate
    const shippingCost = subtotal > 100 ? 0 : 15 // Free shipping over $100
    const totalAmount = subtotal + taxAmount + shippingCost

    // Generate order number
    const orderNumber = `NUMO-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Insert order into database
    const { data: orderData, error: supabaseError } = await supabase
      .from("manual_orders")
      .insert([
        {
          order_number: orderNumber,
          customer_name: validatedData.customerName,
          customer_email: validatedData.customerEmail,
          customer_phone: validatedData.customerPhone,
          shipping_address: {
            street: validatedData.street,
            city: validatedData.city,
            state: validatedData.state,
            zipCode: validatedData.zipCode,
            country: validatedData.country,
          },
          order_items: parsedOrderItems,
          subtotal: subtotal,
          tax_amount: taxAmount,
          shipping_cost: shippingCost,
          total_amount: totalAmount,
          payment_method: validatedData.paymentMethod,
          payment_status: validatedData.paymentStatus,
          order_status: "pending_payment",
          notes: validatedData.notes,
          terms_accepted: validatedData.termsAccepted,
          privacy_accepted: validatedData.privacyAccepted,
          created_at: new Date().toISOString(),
        },
      ])
      .select("id, order_number")
      .single()

    if (supabaseError) {
      console.error("Supabase error inserting manual order:", supabaseError)
      return {
        message: `Failed to submit order: ${supabaseError.message}`,
        success: false,
        fieldErrors: null,
        itemErrors: null,
        orderId: null,
        orderNumber: null,
      }
    }

    // Send confirmation email (implement email service)
    try {
      await sendOrderConfirmationEmail({
        customerEmail: validatedData.customerEmail,
        customerName: validatedData.customerName,
        orderNumber: orderNumber,
        orderItems: parsedOrderItems,
        totalAmount: totalAmount,
      })
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError)
      // Don't fail the order if email fails
    }

    // Revalidate relevant paths
    revalidatePath("/admin/orders")
    revalidatePath("/order-confirmation")

    console.log("Manual order submitted successfully, Order ID:", orderData?.id)
    return {
      message: "Order submitted successfully! You will receive a confirmation email shortly.",
      success: true,
      fieldErrors: null,
      itemErrors: null,
      orderId: orderData?.id,
      orderNumber: orderNumber,
    }
  } catch (error) {
    console.error("Unexpected error in submitManualOrder:", error)
    return {
      message: "An unexpected error occurred. Please try again.",
      success: false,
      fieldErrors: null,
      itemErrors: null,
      orderId: null,
      orderNumber: null,
    }
  }
}

// Email service function (placeholder - implement with your email provider)
async function sendOrderConfirmationEmail(data: {
  customerEmail: string
  customerName: string
  orderNumber: string
  orderItems: OrderItem[]
  totalAmount: number
}) {
  // Implement email sending logic here
  // This could use services like SendGrid, Mailgun, or AWS SES
  console.log("Sending confirmation email to:", data.customerEmail)

  // Example implementation would go here
  // await emailService.send({
  //   to: data.customerEmail,
  //   subject: `Order Confirmation - ${data.orderNumber}`,
  //   template: 'order-confirmation',
  //   data: data
  // })
}

export async function validateOrderItems(items: OrderItem[]): Promise<{ valid: boolean; errors: string[] }> {
  const errors: string[] = []

  if (!Array.isArray(items) || items.length === 0) {
    errors.push("At least one item is required")
    return { valid: false, errors }
  }

  items.forEach((item, index) => {
    const result = OrderItemSchema.safeParse(item)
    if (!result.success) {
      result.error.errors.forEach((error) => {
        errors.push(`Item ${index + 1}: ${error.message}`)
      })
    }
  })

  return { valid: errors.length === 0, errors }
}
