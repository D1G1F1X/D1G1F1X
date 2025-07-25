import type { Metadata } from "next"
import ElementalDiceRoller from "@/components/elemental-dice-roller" // Corrected import to default
import HeroSection from "@/components/hero-section"

export const metadata: Metadata = {
  title: "Elemental Dice Oracle | Numoracle",
  description: "Divine guidance through the five elements: fire, water, earth, air, and spirit.",
}

export default function ElementalDicePage() {
  return (
    <div className="relative min-h-screen bg-black">
      <HeroSection
        title="Elemental Dice Oracle"
        description="Divine guidance through the five elements: fire, water, earth, air, and spirit."
        backgroundImage="/elemental-dice-oracle.png"
      />
      <div className="min-h-screen py-12">
        <ElementalDiceRoller />
      </div>
    </div>
  )
}
