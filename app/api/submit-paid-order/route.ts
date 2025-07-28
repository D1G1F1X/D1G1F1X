import { NextResponse } from "next/server"
import { z } from "zod"
import { submitPaidOrder } from "@/lib/actions/order.actions"

// Schemas for validation
const productInfoSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  quantity: z.number().min(1),
  price: z.number(),
  image: z.string().nullable().optional(),
})

const customerInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  addressStreet: z.string().min(1, "Street address is required"),
  addressCity: z.string().min(1, "City is required"),
  addressState: z.string().min(1, "State/Province is required"),
  addressZip: z.string().min(1, "Zip/Postal code is required"),
  addressCountry: z.string().min(1, "Country is required"),
})

const paymentDetailsSchema = z.object({
  paypalTransactionId: z.string(),
  paypalPayerId: z.string().optional(),
  paypalEmail: z.string().email().optional(),
  status: z.string(), // e.g., "COMPLETED"
  amount: z.string(), // amount as string from PayPal
  currency: z.string(),
})

const paidOrderPayloadSchema = z.object({
  customerInfo: customerInfoSchema,
  cartItems: z.array(productInfoSchema).min(1, "Cart cannot be empty"),
  paymentDetails: paymentDetailsSchema,
})

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function POST(request: Request) {
  try {
    const orderData = await request.json()
    const result = await submitPaidOrder(orderData)

    if (result.success) {
      return NextResponse.json({ message: result.message, orderId: result.orderId })
    } else {
      return NextResponse.json({ error: result.message }, { status: 400 })
    }
  } catch (error) {
    console.error("Error submitting paid order:", error)
    return NextResponse.json({ error: "Failed to submit paid order" }, { status: 500 })
  }
}
