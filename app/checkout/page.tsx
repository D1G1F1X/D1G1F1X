import { Suspense } from "react"
import type { Metadata } from "next"
import HeroSection from "@/components/hero-section" // Import HeroSection

export const metadata: Metadata = {
  title: "Checkout | NUMO Oracle",
  description: "Complete your purchase of NUMO Oracle products.",
}

export default function CheckoutPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <HeroSection
        title="Complete Your Order"
        description="Finalize your purchase and get ready to receive your NUMO Oracle products."
        backgroundImage="/checkout-page-background.png"
      />
      <Suspense fallback={<div className="text-center py-20 text-white">Loading checkout...</div>}>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Checkout</h1>
          <p className="text-center text-gray-300">Checkout page content goes here.</p>
        </div>
      </Suspense>
    </div>
  )
}
