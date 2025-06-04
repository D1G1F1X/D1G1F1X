import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { z } from "zod"

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

export async function POST(req: NextRequest) {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return NextResponse.json({ error: "Server configuration error: Supabase credentials missing." }, { status: 500 })
  }
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

  try {
    const body = await req.json()
    const validation = orderPayloadSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json({ error: "Invalid order data.", details: validation.error.flatten() }, { status: 400 })
    }

    const { customerInfo, cartItems } = validation.data

    const orderItemsForDb = cartItems.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      quantity: item.quantity,
      price: item.product.price, // Assuming price is per unit
      image: item.product.image || null,
    }))

    const { data, error } = await supabase
      .from("manual_orders")
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
          order_items: orderItemsForDb,
          status: "pending_processing", // Default status
        },
      ])
      .select() // Optionally select the inserted row
      .single() // Assuming you insert one order at a time and want it back

    if (error) {
      console.error("Supabase error inserting order:", error)
      return NextResponse.json({ error: "Could not save order.", details: error.message }, { status: 500 })
    }

    // TODO: Implement admin email notification logic here
    // Example: await sendAdminOrderNotification(data); // data contains the saved order

    return NextResponse.json(
      { success: true, message: "Order submitted successfully!", orderId: data?.id },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error processing order submission:", error)
    let errorMessage = "An unexpected error occurred."
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
