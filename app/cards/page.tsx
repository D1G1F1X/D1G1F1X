import { Suspense } from "react"
import type { Metadata } from "next"
import CardCatalog from "@/components/card-catalog" // Assuming this component exists

export const metadata: Metadata = {
  title: "NUMO Oracle Cards | Explore the Deck",
  description: "Browse the complete NUMO Oracle card deck, learn about each card's meaning and symbolism.",
}

export default function CardsPage() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Unique Cards Catalog Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-orange-900/20 to-black"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/mystical-oracle-cards.png')" }}
        ></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-6 py-3 bg-amber-600/20 text-amber-300 rounded-full text-lg font-medium border border-amber-500/30">
              🎴 Complete Collection
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            Explore the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              Oracle Deck
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Dive into the symbolism and meanings of each NUMO Oracle card
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="px-4 py-2 bg-amber-900/30 text-amber-300 rounded-full border border-amber-700/50">
              🔥 Fire Cards
            </div>
            <div className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-full border border-blue-700/50">
              💧 Water Cards
            </div>
            <div className="px-4 py-2 bg-green-900/30 text-green-300 rounded-full border border-green-700/50">
              🌍 Earth Cards
            </div>
            <div className="px-4 py-2 bg-gray-900/30 text-gray-300 rounded-full border border-gray-700/50">
              💨 Air Cards
            </div>
            <div className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-full border border-purple-700/50">
              ✨ Spirit Cards
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-8">
        <Suspense fallback={<div className="text-center py-20 text-white">Loading card catalog...</div>}>
          {/* Assuming CardCatalog component exists and displays cards */}
          <CardCatalog />
        </Suspense>
      </div>
    </div>
  )
}
