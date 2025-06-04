"use client"

import { type FormEvent, useState, useEffect } from "react"
import { PaymentElement, useStripe, useElements, AddressElement } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast" // Assuming you have this from shadcn/ui

interface CheckoutFormProps {
  clientSecret: string
  onSuccessfulCheckout: (paymentIntentId: string) => void // Callback for successful payment
}

export default function StripeCheckoutForm({ clientSecret, onSuccessfulCheckout }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [email, setEmail] = useState("") // Example: collect email

  useEffect(() => {
    if (!stripe) {
      return
    }
    if (!clientSecret) {
      return
    }
    // You can retrieve the PaymentIntent status here if needed,
    // though typically not required for initial form load.
  }, [stripe, clientSecret])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!stripe || !elements) {
      setMessage("Stripe.js has not loaded yet.")
      return
    }

    setIsLoading(true)
    setMessage(null)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/order-confirmation`, // Or a page that handles payment status
        receipt_email: email, // Optional: pass email for Stripe receipt
      },
      // redirect: 'if_required' // Use this if you want to handle the redirect manually or show success/error on the same page
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "An unexpected error occurred.")
      } else {
        setMessage("An unexpected error occurred.")
      }
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // This block is more relevant if you use redirect: 'if_required'
      // and handle the success directly on this page.
      // Otherwise, the success is handled on the return_url page.
      toast({
        title: "Payment Successful!",
        description: `Payment ID: ${paymentIntent.id}`,
      })
      onSuccessfulCheckout(paymentIntent.id)
    }

    setIsLoading(false)
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
      {/* Example: Email input for receipt */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-gray-700 text-white"
          placeholder="you@example.com"
          required
        />
      </div>

      {/* Stripe Address Element for shipping/billing */}
      <AddressElement
        options={{
          mode: "billing", // or 'shipping'
          allowedCountries: ["US", "CA", "GB"], // Example
          // More options: https://stripe.com/docs/js/elements_object/create_address_element#address_element_create-options
        }}
      />

      {/* Stripe Payment Element */}
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />

      <Button disabled={isLoading || !stripe || !elements} id="submit" type="submit" className="w-full">
        {isLoading ? "Processing..." : "Pay Now"}
      </Button>

      {message && (
        <div id="payment-message" className="text-red-500 text-sm mt-2">
          {message}
        </div>
      )}
    </form>
  )
}
