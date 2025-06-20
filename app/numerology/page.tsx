import { Suspense } from "react"
import type { Metadata } from "next"
import NumerologyCalculator from "@/components/numerology-calculator" // Assuming this component exists
import HeroSection from "@/components/hero-section" // Import HeroSection

export const metadata: Metadata = {
  title: "Numerology Calculator | Discover Your Life Path",
  description: "Calculate your life path number, destiny number, and more with our free numerology tools.",
}

export default function NumerologyPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <HeroSection
        title="Numerology Calculator"
        description="Uncover your life path, destiny, and soul urge numbers."
        backgroundImage="/numerology-diagram-hero.png"
      />
      <div className="container mx-auto py-8">
        <Suspense fallback={<div className="text-center py-20 text-white">Loading numerology calculator...</div>}>
          {/* Assuming NumerologyCalculator component exists */}
          <NumerologyCalculator />
        </Suspense>
      </div>
    </div>
  )
}
