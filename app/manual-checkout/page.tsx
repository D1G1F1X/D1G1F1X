import { Suspense } from "react"
import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import ManualCheckoutForm from "@/components/manual-checkout-form"
import { ManualCartProvider } from "@/contexts/manual-cart-context"

export const metadata: Metadata = {
  title: "Manual Checkout | NUMO Oracle",
  description: "Process manual orders for NUMO Oracle products with comprehensive order management.",
}

export default function ManualCheckoutPage() {
  return (
    <ManualCartProvider>
      <div className="relative min-h-screen bg-black">
        <HeroSection
          title="Manual Order Checkout"
          description="Create and process manual orders for NUMO Oracle products with full customer and shipping information."
          backgroundImage="/manual-checkout-background.png"
        />
        <div className="relative z-10 bg-black/80 backdrop-blur-sm">
          <div className="container mx-auto py-12">
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-white">Loading manual checkout...</p>
                  </div>
                </div>
              }
            >
              <ManualCheckoutForm />
            </Suspense>
          </div>
        </div>
      </div>
    </ManualCartProvider>
  )
}
