import { Suspense } from "react"
import type { Metadata } from "next"
import HeroSection from "@/components/hero-section" // Import HeroSection

export const metadata: Metadata = {
  title: "Order Confirmation | NUMO Oracle",
  description: "Your NUMO Oracle order has been confirmed.",
}

export default function OrderConfirmationPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <HeroSection
        title="Order Confirmed!"
        description="Thank you for your purchase. Your NUMO Oracle journey begins now."
        backgroundImage="/order-confirmation-background.png"
      />
      <Suspense fallback={<div className="text-center py-20 text-white">Loading order confirmation...</div>}>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Order Confirmation</h1>
          <p className="text-center text-gray-300">Order confirmation details go here.</p>
        </div>
      </Suspense>
    </div>
  )
}
