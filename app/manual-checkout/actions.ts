"use server"

import { z } from "zod"
import { createServerClient } from "@/lib/supabase-server"

// Define the schema for a single item in the order
const OrderItemSchema = z.object({
  id: z.string().uuid(), // For client-side keying, can be generated on client
  productId: z.string().optional(), // ID of the selected product from predefined list
  name: z.string().min(1, "Item name cannot be empty."),
  quantity: z.coerce.number().int().positive("Quantity must be a positive integer."),
  price: z.coerce.number().nonnegative("Price must be a non-negative number."), // Allow 0 for free items if needed
})

// Define the main schema for the manual order
const ManualOrderSchema = z.object({
  customerName: z.string().min(2, "Full name must be at least 2 characters."),
  customerEmail: z.string().email("Invalid email address."),
  customerPhone: z.string().optional(),
  shippingAddressStreet: z.string().min(3, "Street address is required."),
  shippingAddressCity: z.string().min(2, "City is required."),
  shippingAddressState: z.string().min(2, "State/Province is required."),
  shippingAddressZip: z.string().min(3, "ZIP/Postal code is required."),
  shippingAddressCountry: z.string().min(2, "Country is required."),
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
  notes: z.string().optional(),
})

export type OrderItem = z.infer<typeof OrderItemSchema>

export async function submitManualOrder(
  prevState: {
    message: string
    success: boolean
    errors?: Record<string, string[] | undefined> | null
    fieldErrors?: Record<string, string[] | undefined> | null
    itemErrors?: { index: number; field: keyof OrderItem; message: string }[] | null
    orderId?: string | null
  },
  formData: FormData,
) {
  const supabase = createServerClient()

  const rawOrderItems = formData.get("orderItems") as string
  let parsedOrderItems: OrderItem[] = []

  try {
    parsedOrderItems = JSON.parse(rawOrderItems)
    if (!Array.isArray(parsedOrderItems) || parsedOrderItems.length === 0) {
      throw new Error("No items in order.")
    }
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
      },
    ])
    .select("id")
    .single()

  if (supabaseError) {
    console.error("Supabase error inserting manual order:", supabaseError)
    return {
      message: `Failed to submit order: ${supabaseError.message}`,
      success: false,
      fieldErrors: null,
      itemErrors: null,
      orderId: null,
    }
  }

  console.log("Manual order submitted successfully, Order ID:", orderData?.id)
  return {
    message: "Order submitted successfully! We will contact you shortly.",
    success: true,
    fieldErrors: null,
    itemErrors: null,
    orderId: orderData?.id,
  }
}
