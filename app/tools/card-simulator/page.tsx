import type { Metadata } from "next"
import FixedCardDealer from "@/components/fixed-card-dealer"

export const metadata: Metadata = {
  title: "Card Simulator - NUMO Oracle",
  description: "Experience the NUMO Oracle card reading system with our interactive simulator",
}

export default function CardSimulatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white">
      {/* Hero Section with Background Image */}
      <div
        className="relative py-16 md:py-24 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/card-simulator-hero-bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div> {/* Overlay for readability */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              NUMO Oracle Card Simulator
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto drop-shadow-md">
              Experience the wisdom of the NUMO Oracle cards with our interactive simulator. Draw cards, receive
              interpretations, and explore the ancient Celtic wisdom that guides your path forward.
            </p>
          </div>
        </div>
      </div>

      {/* Card Dealer Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <FixedCardDealer />
        </div>
      </div>
    </div>
  )
}
