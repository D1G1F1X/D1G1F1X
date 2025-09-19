import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { formatAmountForStripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is properly configured
    if (!stripe) {
      console.error('Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.')
      return NextResponse.json(
        { error: 'Payment system not configured. Please contact support.' },
        { status: 500 }
      )
    }

    const { 
      items, 
      successUrl, 
      cancelUrl,
      customerEmail 
    } = await request.json()

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Invalid items' },
        { status: 400 }
      )
    }

    // Get the base URL from the request headers
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || 
      `${request.nextUrl.protocol}//${request.nextUrl.host}`

    const lineItems = items.map((item: any) => {
      // Convert relative image URLs to absolute URLs
      let imageUrl = item.image
      if (imageUrl && imageUrl.startsWith('/')) {
        imageUrl = `${baseUrl}${imageUrl}`
      }

      // Validate image URL format
      const isValidUrl = (url: string) => {
        try {
          new URL(url)
          return true
        } catch {
          return false
        }
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: item.description,
            // Only include images if they are valid URLs
            images: (imageUrl && isValidUrl(imageUrl)) ? [imageUrl] : [],
          },
          unit_amount: formatAmountForStripe(item.price, 'usd'),
        },
        quantity: item.quantity || 1,
      }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl || `${baseUrl}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${baseUrl}/buy`,
      customer_email: customerEmail,
      metadata: {
        orderId: `order_${Date.now()}`,
      },
    })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    })
  } catch (error: any) {
    console.error('Error creating checkout session:', error)
    
    // Handle Stripe-specific errors
    if (error.type === 'StripeInvalidRequestError') {
      return NextResponse.json(
        { 
          error: 'Invalid request to payment processor',
          details: error.message,
          param: error.param 
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}