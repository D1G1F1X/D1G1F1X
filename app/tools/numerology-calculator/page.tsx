import NumerologyCalculatorPageClient from "./NumerologyCalculatorPageClient"
import HeroSection from "@/components/hero-section" // Import HeroSection

export default function NumerologyCalculatorPage() {
  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center">
      {" "}
      {/* Added flex flex-col items-center */}
      <HeroSection
        title="Numerology Calculator"
        description="Calculate your life path number and discover your numerological insights."
        backgroundImage="/numerology-diagram.png"
      />
      {/* The client component already has its own max-width and mx-auto, so it will center itself within this flex container */}
      <NumerologyCalculatorPageClient />
    </div>
  )
}
