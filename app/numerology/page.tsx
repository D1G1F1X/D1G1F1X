import { Suspense } from "react"
import type { Metadata } from "next"
import NumerologyCalculator from "@/components/numerology-calculator"
import StandardizedHero from "@/components/standardized-hero"

export const metadata: Metadata = {
  title: "Numerology Calculator | Discover Your Life Path",
  description: "Calculate your life path number, destiny number, and more with our free numerology tools.",
}

export default function NumerologyPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <StandardizedHero
        title="Numerology"
        subtitle="Calculator"
        description="Uncover your life path, destiny, and soul urge numbers through the ancient science of numerology"
        backgroundImage="/numerology-diagram-hero.png"
        badge={{
          text: "🔢 Sacred Mathematics",
          icon: "",
        }}
        features={[
          { icon: "🛤️", text: "Life Path", color: "rose" },
          { icon: "⭐", text: "Destiny Number", color: "pink" },
          { icon: "💫", text: "Soul Urge", color: "purple" },
        ]}
        gradient="from-rose-900/20 via-pink-900/20 to-black"
      />
      <div className="container mx-auto py-8">
        <Suspense fallback={<div className="text-center py-20 text-white">Loading numerology calculator...</div>}>
          <NumerologyCalculator />
        </Suspense>
      </div>
    </div>
  )
}
