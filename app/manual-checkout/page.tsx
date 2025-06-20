import { Suspense } from "react"
import type { Metadata } from "next"
import HeroSection from "@/components/hero-section" // Import HeroSection

export const metadata: Metadata = {
  title: "Manual Checkout | NUMO Oracle",
  description: "Process manual orders for NUMO Oracle products.",
}

export default function ManualCheckoutPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <HeroSection
        title="Manual Order Checkout"
        description="Process manual orders for NUMO Oracle products."
        backgroundImage="/manual-checkout-background.png"
      />
      <Suspense fallback={<div className="text-center py-20 text-white">Loading manual checkout...</div>}>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Manual Checkout</h1>
          <p className="text-center text-gray-300">Manual checkout content goes here.</p>
        </div>
      </Suspense>
    </div>
  )
}
