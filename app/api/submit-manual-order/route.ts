import { NextResponse } from "next/server"
import { z } from "zod"
import { submitManualOrder } from "@/lib/actions/order.actions"

// Define the schema for cart items, ensure it matches what you send from the client
// And what you expect in your ManualCartItem context
const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  image: z.string().optional(),
  // Add any other product fields you store in the cart and want in the order
})

const cartItemSchema = z.object({
  product: productSchema,
  quantity: z.number().min(1),
})

const orderPayloadSchema = z.object({
  customerInfo: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    addressStreet: z.string().min(1, "Street address is required"),
    addressCity: z.string().min(1, "City is required"),
    addressState: z.string().min(1, "State/Province is required"),
    addressZip: z.string().min(1, "Zip/Postal code is required"),
    addressCountry: z.string().min(1, "Country is required"),
  }),
  cartItems: z.array(cartItemSchema).min(1, "Cart cannot be empty"),
})

// Initialize Supabase client
// Ensure these environment variables are set in your Vercel project
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("Supabase URL or Service Role Key is not defined.")
  // In a real app, you might not want to expose this error detail to the client
  // For now, this helps in debugging.
}

// It's better to have a singleton instance for the Supabase client,
// typically in a separate file (e.g., lib/supabase-server.ts)
// For simplicity here, we're creating it directly.
// const supabase = createClient(supabaseUrl!, supabaseServiceRoleKey!);
// Let's assume you have a server client utility like in your project:
// import { createSupabaseServerClient } from '@/lib/supabase-server'; // Adjust path if needed

export async function POST(request: Request) {
  try {
    const orderData = await request.json()
    const result = await submitManualOrder(orderData)

    if (result.success) {
      return NextResponse.json({ message: result.message, orderId: result.orderId })
    } else {
      return NextResponse.json({ error: result.message }, { status: 400 })
    }
  } catch (error) {
    console.error("Error submitting manual order:", error)
    return NextResponse.json({ error: "Failed to submit manual order" }, { status: 500 })
  }
}
