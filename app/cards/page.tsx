import { Suspense } from "react"
import type { Metadata } from "next"
import CardCatalog from "@/components/card-catalog"
import StandardizedHero from "@/components/standardized-hero"

export const metadata: Metadata = {
  title: "NUMO Oracle Cards | Explore the Deck",
  description: "Browse the complete NUMO Oracle card deck, learn about each card's meaning and symbolism.",
}

export default function CardsPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <StandardizedHero
        title="Explore the"
        subtitle="Oracle Deck"
        description="Dive into the symbolism and meanings of each NUMO Oracle card"
        backgroundImage="/mystical-oracle-cards.png"
        badge={{
          text: "🎴 Complete Collection",
          icon: "",
        }}
        features={[
          { icon: "🔥", text: "Fire Cards", color: "amber" },
          { icon: "💧", text: "Water Cards", color: "blue" },
          { icon: "🌍", text: "Earth Cards", color: "green" },
          { icon: "💨", text: "Air Cards", color: "gray" },
          { icon: "✨", text: "Spirit Cards", color: "purple" },
        ]}
        gradient="from-amber-900/20 via-orange-900/20 to-black"
      />
      <div className="container mx-auto py-8">
        <Suspense fallback={<div className="text-center py-20 text-white">Loading card catalog...</div>}>
          <CardCatalog />
        </Suspense>
      </div>
    </div>
  )
}
