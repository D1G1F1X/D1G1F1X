import { NextResponse } from "next/server"
import Stripe from "stripe"
import type { Readable } from "stream"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
  typescript: true,
})

const relevantEvents = new Set([
  "payment_intent.succeeded",
  "payment_intent.payment_failed",
  "checkout.session.completed", // If using Stripe Checkout sessions
  // Add other events you want to handle
])

// Helper to buffer the request body, as Vercel's default body parser might consume it.
async function buffer(readable: Readable): Promise<Buffer> {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

export async function POST(request: Request) {
  const rawBody = await buffer(request.body as unknown as Readable)
  const sig = request.headers.get("stripe-signature")
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!sig || !webhookSecret) {
    console.error("Webhook Error: Missing signature or secret")
    return NextResponse.json({ error: "Webhook signature or secret missing." }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 })
  }

  console.log("Received Stripe event:", event.type, event.id)

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntentSucceeded = event.data.object as Stripe.PaymentIntent
          console.log(`PaymentIntent ${paymentIntentSucceeded.id} was successful!`)
          // TODO: Fulfill the purchase (e.g., save order to DB, send email)
          // Access metadata: paymentIntentSucceeded.metadata.order_items
          // Access customer email (if provided): paymentIntentSucceeded.receipt_email
          // Or customer details from paymentIntentSucceeded.customer (if a Stripe Customer object was used)
          // Example: await saveOrderToDatabase(paymentIntentSucceeded);
          break

        case "payment_intent.payment_failed":
          const paymentIntentFailed = event.data.object as Stripe.PaymentIntent
          console.log(`PaymentIntent ${paymentIntentFailed.id} failed.`)
          // TODO: Notify customer, log error, etc.
          break

        // case 'checkout.session.completed': // If you were using Stripe Checkout sessions
        //   const session = event.data.object as Stripe.Checkout.Session;
        //   console.log(`CheckoutSession ${session.id} completed!`);
        //   // Retrieve session items, customer details, etc.
        //   // const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        //   // TODO: Fulfill the purchase
        //   break;

        default:
          console.warn(`Unhandled relevant event type: ${event.type}`)
      }
    } catch (error) {
      console.error("Error handling webhook event:", error)
      return NextResponse.json({ error: "Webhook handler failed. View logs." }, { status: 500 })
    }
  } else {
    console.log("Received event, but not handling:", event.type)
  }

  return NextResponse.json({ received: true })
}
