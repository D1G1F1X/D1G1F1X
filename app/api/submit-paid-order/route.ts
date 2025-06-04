import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { z } from "zod"

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

export async function POST(req: NextRequest) {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return NextResponse.json({ error: "Server configuration error: Supabase credentials missing." }, { status: 500 })
  }
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

  try {
    const body = await req.json()
    const validation = paidOrderPayloadSchema.safeParse(body)

    if (!validation.success) {
      console.error("Invalid paid order data:", validation.error.flatten())
      return NextResponse.json({ error: "Invalid order data.", details: validation.error.flatten() }, { status: 400 })
    }

    const { customerInfo, cartItems, paymentDetails } = validation.data

    // Prepare data for the 'manual_orders' table (or a new 'paid_orders' table if you prefer)
    // We'll adapt it to fit the existing 'manual_orders' structure and add payment info.
    const { data, error } = await supabase
      .from("manual_orders") // Or your dedicated paid orders table
      .insert([
        {
          customer_name: customerInfo.name,
          customer_email: customerInfo.email,
          customer_phone: customerInfo.phone || null,
          address_street: customerInfo.addressStreet,
          address_city: customerInfo.addressCity,
          address_state: customerInfo.addressState,
          address_zip: customerInfo.addressZip,
          address_country: customerInfo.addressCountry,
          order_items: cartItems, // Already in the correct format from PayPalCheckoutButton
          status: `paid_${paymentDetails.status.toLowerCase()}`, // e.g., paid_completed
          // Add a new column to your 'manual_orders' table for payment_info or store separately
          // For simplicity, adding to admin_notes or a new JSONB column 'payment_info'
          admin_notes: `PayPal TXN ID: ${paymentDetails.paypalTransactionId}. Payer Email: ${paymentDetails.paypalEmail || "N/A"}.`,
          // If you add a 'payment_info' JSONB column to 'manual_orders':
          // payment_info: paymentDetails,
        },
      ])
      .select("id") // Select the ID of the newly created order
      .single()

    if (error) {
      console.error("Supabase error inserting paid order:", error)
      return NextResponse.json({ error: "Could not save paid order.", details: error.message }, { status: 500 })
    }

    // TODO: Implement admin email notification for the paid order
    // await sendAdminPaidOrderNotification(data, customerInfo, cartItems, paymentDetails);

    return NextResponse.json(
      { success: true, message: "Paid order submitted successfully!", orderId: data?.id },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error processing paid order submission:", error)
    let errorMessage = "An unexpected error occurred."
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
