import { Suspense } from "react"
import BuyPageClient from "./BuyPageClient"
import StandardizedHero from "@/components/standardized-hero"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Buy NUMO Oracle | Purchase Your Deck",
  description: "Purchase the official NUMO Oracle Deck and companion products.",
}

export default function BuyPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <StandardizedHero
        title="Purchase Your"
        subtitle="NUMO Oracle Deck"
        description="Begin your journey with the NUMO Oracle. Explore our products and find the perfect fit for your spiritual path."
        backgroundImage="/images/hero/mystical-shop-background.png"
        badge={{
          text: "🛒 Sacred Collection",
          icon: "",
        }}
        features={[
          { icon: "🎴", text: "Premium Decks", color: "emerald" },
          { icon: "📚", text: "Guidebooks", color: "teal" },
          { icon: "💎", text: "Crystal Sets", color: "cyan" },
        ]}
        gradient="from-emerald-900/20 via-teal-900/20 to-black"
      />
      <Suspense fallback={<div className="text-center py-20 text-white">Loading purchase options...</div>}>
        <BuyPageClient />
      </Suspense>
    </div>
  )
}
