import NumerologyCalculatorPageClient from "./NumerologyCalculatorPageClient"
import HeroSection from "@/components/hero-section" // Import HeroSection

export default function NumerologyCalculatorPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <HeroSection
        title="Numerology Calculator"
        description="Calculate your life path number and discover your numerological insights."
        backgroundImage="/numerology-diagram.png"
      />
      <NumerologyCalculatorPageClient />
    </div>
  )
}
