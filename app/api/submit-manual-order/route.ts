import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { brevoEmailService } from "@/lib/services/brevo-email-service"
import { getEnv } from "@/lib/env"

export async function POST(request: NextRequest) {
  const supabase = createClient()

  try {
    const body = await request.json()
    const { customer_name, customer_email, customer_phone, shipping_address, order_items, notes } = body

    // Basic validation (can be expanded with Zod)
    if (!customer_name || !customer_email || !shipping_address || !order_items || order_items.length === 0) {
      return NextResponse.json({ error: "Missing required order fields." }, { status: 400 })
    }

    const { street, city, state, zip, country } = shipping_address

    const { data, error } = await supabase
      .from("manual_orders")
      .insert({
        customer_name,
        customer_email,
        customer_phone,
        shipping_address_street: street,
        shipping_address_city: city,
        shipping_address_state: state,
        shipping_address_zip: zip,
        shipping_address_country: country,
        order_items, // Store as JSONB
        notes,
        status: "pending", // Default status
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Send order confirmation email to customer
    const customerEmailResult = await brevoEmailService.sendOrderConfirmationEmail(
      customer_email,
      customer_name,
      data, // Pass the inserted order data
    )

    if (!customerEmailResult.success) {
      console.error("Failed to send customer order confirmation email:", customerEmailResult.error)
      // Log but don't block the response, as the order was successfully saved
    }

    // Send admin notification email
    const adminEmail = getEnv("ADMIN_EMAIL_FOR_NOTIFICATIONS")
    const adminEmailResult = await brevoEmailService.sendAdminOrderNotification(data) // Pass the inserted order data

    if (!adminEmailResult.success) {
      console.error("Failed to send admin order notification email:", adminEmailResult.error)
      // Log but don't block the response
    }

    return NextResponse.json({ success: true, order: data }, { status: 200 })
  } catch (error) {
    console.error("Error submitting manual order:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "An unknown error occurred.",
      },
      { status: 500 },
    )
  }
}
