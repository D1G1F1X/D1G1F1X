import { Suspense } from "react"
import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import ManualCheckoutForm from "@/components/manual-checkout-form"

export const metadata: Metadata = {
  title: "Manual Checkout | NUMO Oracle - Secure Order Processing",
  description:
    "Complete your NUMO Oracle order with our secure manual checkout process. We'll contact you with payment instructions within 24 hours.",
  keywords: "manual checkout, oracle cards, numerology products, secure ordering, payment processing",
  openGraph: {
    title: "Manual Checkout | NUMO Oracle",
    description: "Complete your mystical order securely with our manual checkout process.",
    type: "website",
  },
}

export default function ManualCheckoutPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <HeroSection
        title="Secure Manual Checkout"
        description="Complete your order and we'll contact you with payment instructions within 24 hours"
        backgroundImage="/manual-checkout-background.png"
      />
      <Suspense
        fallback={
          <div className="container mx-auto py-20">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              <span className="ml-3 text-white">Loading secure checkout...</span>
            </div>
          </div>
        }
      >
        <div className="container mx-auto py-12 px-4">
          <ManualCheckoutForm />
        </div>
      </Suspense>
    </div>
  )
}
