import CardSimulatorPageClient from "./CardSimulatorPageClient"
import HeroSection from "@/components/hero-section"

export default function CardSimulatorPage() {
  return (
    <div className="relative min-h-screen bg-black flex flex-col">
      {" "}
      {/* Added flex flex-col */}
      <HeroSection
        title="NUMO Oracle Card Simulator"
        description="Experience profound insights with our interactive oracle card readings."
        backgroundImage="/mystical-insight-hero.png"
      />
      {/* New wrapper div to center the client component */}
      <div className="flex-grow flex items-center justify-center">
        <CardSimulatorPageClient />
      </div>
    </div>
  )
}
