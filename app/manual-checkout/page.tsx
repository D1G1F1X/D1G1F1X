import { Suspense } from "react"
import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import ManualCheckoutForm from "@/components/manual-checkout-form"
import { ManualCartProvider } from "@/contexts/manual-cart-context"

export const metadata: Metadata = {
  title: "Manual Checkout | NUMO Oracle",
  description: "Complete your NUMO Oracle order with our secure manual checkout process.",
}

export default function ManualCheckoutPage() {
  return (
    <ManualCartProvider>
      <div className="relative min-h-screen bg-black">
        <HeroSection
          title="Secure Checkout"
          description="Complete your order with confidence using our secure checkout process"
          backgroundImage="/manual-checkout-background.png"
        />
        <Suspense
          fallback={
            <div className="text-center py-20 text-white">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4" />
              Loading secure checkout...
            </div>
          }
        >
          <ManualCheckoutForm />
        </Suspense>
      </div>
    </ManualCartProvider>
  )
}
