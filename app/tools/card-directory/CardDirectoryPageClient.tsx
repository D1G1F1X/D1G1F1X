"use client"

import { useState } from "react"
import { CardDirectory } from "@/components/card-directory"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"

export default function CardDirectoryPageClient() {
  const [selectedCard, setSelectedCard] = useState<any>(null)

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Hero Banner */}
      <div className="relative w-full h-48 mb-8 overflow-hidden rounded-lg">
        <Image
          src="/gifts-of-danu.png"
          alt="The Five Gifts of Danu - Sword, Spear, Cauldron, Stone, and Cord"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 flex items-center">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-2">NUMO Oracle Card Directory</h1>
            <p className="text-gray-200 max-w-xl">
              Explore the complete collection of NUMO Oracle cards, their meanings, and elemental associations
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="prose prose-invert max-w-none mb-8">
        <p>
          The NUMO Oracle deck consists of cards representing the five sacred treasures of Danu: the Cauldron, Sword,
          Cord, Spear, and Stone. Each card combines one of these suits with an elemental influence of Fire, Water, Air,
          Earth, or Spirit.
        </p>
        <p>
          Use this directory to explore the complete card collection, learn about their meanings, and understand the
          elemental influences that shape each card's guidance.
        </p>
      </div>

      <Separator className="my-6" />

      {/* Card Directory Component */}
      <CardDirectory onSelectCard={setSelectedCard} />
    </div>
  )
}
