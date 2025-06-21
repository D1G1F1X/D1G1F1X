import CardSimulatorPageClient from "./CardSimulatorPageClient"
import HeroSection from "@/components/hero-section" // Import HeroSection

export default function CardSimulatorPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <HeroSection
        title="NUMO Oracle Card Dealer"
        description="Draw oracle cards and receive detailed interpretations based on ancient Celtic wisdom."
        backgroundImage="/mystical-oracle.png"
      />
      <CardSimulatorPageClient />
    </div>
  )
}
