import { Suspense } from "react"
import BuyPageClient from "./BuyPageClient"
import type { Metadata } from "next"
import HeroSection from "@/components/hero-section" // Import HeroSection

export const metadata: Metadata = {
  title: "Buy NUMO Oracle | Purchase Your Deck",
  description: "Purchase the official NUMO Oracle Deck and companion products.",
}

export default function BuyPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <HeroSection
        title="Purchase Your NUMO Oracle Deck"
        description="Begin your journey with the NUMO Oracle. Explore our products and find the perfect fit for your spiritual path."
        backgroundImage="/images/hero/mystical-shop-background.png"
      />
      <Suspense fallback={<div className="text-center py-20 text-white">Loading purchase options...</div>}>
        <BuyPageClient />
      </Suspense>
    </div>
  )
}
