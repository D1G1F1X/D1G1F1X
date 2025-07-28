import { Suspense } from "react"
import type { Metadata } from "next"
import HeroSection from "@/components/hero-section" // Import HeroSection

export const metadata: Metadata = {
  title: "Shipping | NUMO Oracle",
  description: "Shipping information for NUMO Oracle products.",
}

export default function ShippingPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <HeroSection
        title="Shipping Information"
        description="Details about our shipping policies and delivery options."
        backgroundImage="/placeholder.svg?height=500&width=1500"
      />
      <Suspense fallback={<div className="text-center py-20 text-white">Loading shipping information...</div>}>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Shipping</h1>
          <p className="text-center text-gray-300">Shipping content goes here.</p>
        </div>
      </Suspense>
    </div>
  )
}
