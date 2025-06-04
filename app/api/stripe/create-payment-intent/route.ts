import { NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with your secret key
// Ensure your STRIPE_SECRET_KEY is set in your Vercel environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10", // Use the latest API version
  typescript: true,
})

export async function POST(request: Request) {
  try {
    const { amount, currency = "usd", items, customerName, customerEmail } = await request.json()

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    // You can pass more details to the PaymentIntent
    // For example, a description, customer ID (if you manage customers in Stripe),
    // or metadata with order details.
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Amount in cents
      currency: currency,
      automatic_payment_methods: {
        enabled: true,
      },
      // Optional: Add metadata for your reference
      metadata: {
        order_items: JSON.stringify(items), // Example: items could be an array of {id, name, quantity}
        customer_name: customerName,
        customer_email: customerEmail,
      },
      // Optional: Add customer details for better fraud prevention and record keeping
      // receipt_email: customerEmail, // Stripe can send email receipts
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error: any) {
    console.error("Error creating PaymentIntent:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
