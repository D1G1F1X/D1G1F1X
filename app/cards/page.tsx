import { Suspense } from "react"
import type { Metadata } from "next"
import CardCatalog from "@/components/card-catalog" // Assuming this component exists
import HeroSection from "@/components/hero-section" // Import HeroSection

export const metadata: Metadata = {
  title: "NUMO Oracle Cards | Explore the Deck",
  description: "Browse the complete NUMO Oracle card deck, learn about each card's meaning and symbolism.",
}

export default function CardsPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <HeroSection
        title="Explore the Oracle Deck"
        description="Dive into the symbolism and meanings of each NUMO Oracle card."
        backgroundImage="/mystical-oracle-cards.png"
      />
      <div className="container mx-auto py-8">
        <Suspense fallback={<div className="text-center py-20 text-white">Loading card catalog...</div>}>
          {/* Assuming CardCatalog component exists and displays cards */}
          <CardCatalog />
        </Suspense>
      </div>
    </div>
  )
}
