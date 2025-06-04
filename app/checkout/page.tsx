"use client"

import { useState, useEffect, useCallback } from "react"
import { Elements } from "@stripe/react-stripe-js"
import type { StripeElementsOptions } from "@stripe/stripe-js"
import StripeCheckoutForm from "@/components/stripe-checkout-form"
import { getStripe } from "@/lib/stripe-loader"
import { useToast } from "@/components/ui/use-toast" // Assuming you have this

// Example: Replace with your actual cart context or state management
// For simplicity, we'll use a mock cart total here.
// In a real app, you'd get this from your cart state.
const MOCK_CART_TOTAL = 25.0 // e.g., for the Novice Deck
const MOCK_CART_ITEMS = [{ id: "novice-deck", name: "NUMO Oracle Novice Deck", quantity: 1 }]

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // In a real app, get cartTotal and cartItems from your cart context/state
  const cartTotal = MOCK_CART_TOTAL
  const cartItems = MOCK_CART_ITEMS

  const createPaymentIntent = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: cartTotal,
          items: cartItems, // Send items for metadata
          // You might want to collect customer name/email on this page
          // and pass it here if not collected by AddressElement directly for metadata
          customerName: "Test User", // Example
          customerEmail: "test@example.com", // Example
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || "Failed to create payment intent")
      }

      const data = await res.json()
      setClientSecret(data.clientSecret)
    } catch (err: any) {
      console.error("Error in createPaymentIntent:", err)
      setError(err.message || "Could not initialize payment.")
      toast({
        title: "Payment Initialization Failed",
        description: err.message || "Could not initialize payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [cartTotal, cartItems, toast])

  useEffect(() => {
    if (cartTotal > 0) {
      createPaymentIntent()
    } else {
      setError("Your cart is empty.") // Or redirect
      setIsLoading(false)
    }
  }, [cartTotal, createPaymentIntent])

  const stripePromise = getStripe()

  const options: StripeElementsOptions = clientSecret
    ? { clientSecret, appearance: { theme: "night", labels: "floating" /* Example appearance */ } }
    : {}

  const handleSuccessfulCheckout = (paymentIntentId: string) => {
    console.log("Payment successful on client, PaymentIntent ID:", paymentIntentId)
    // Here you would typically:
    // 1. Clear the cart
    // 2. Redirect to an order confirmation page (if not already handled by Stripe's return_url)
    // 3. Show a success message
    // Note: The source of truth for payment success is your webhook handler.
    // This client-side confirmation is for immediate UX.
    // For example: router.push(`/order-confirmation?payment_intent=${paymentIntentId}`);
    toast({
      title: "Checkout Initiated",
      description: "Redirecting to confirmation...",
    })
  }

  if (isLoading && !clientSecret && !error) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading payment options...</div>
  }
  if (error) {
    return <div className="container mx-auto px-4 py-12 text-center text-red-500">Error: {error}</div>
  }
  if (!clientSecret || !stripePromise) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        Could not initialize Stripe. Publishable key might be missing or cart empty.
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Checkout</h1>
      <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-xl">
        <Elements stripe={stripePromise} options={options}>
          <StripeCheckoutForm clientSecret={clientSecret} onSuccessfulCheckout={handleSuccessfulCheckout} />
        </Elements>
      </div>
    </div>
  )
}
