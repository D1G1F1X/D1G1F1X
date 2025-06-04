"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { getCardImagePath, handleCardImageError } from "@/lib/card-image-handler"

interface CardData {
  id: string
  name: string
  element: string
  type: string
  position?: string
  description?: string
  imagePath: string
}

interface SimpleCardDealerProps {
  spreadType?: "single" | "three" | "five"
  className?: string
  onCardsDraw?: (cards: CardData[]) => void
}

export function SimpleCardDealer({ spreadType = "three", className, onCardsDraw }: SimpleCardDealerProps) {
  const [cards, setCards] = useState<CardData[]>([])
  const [isDealing, setIsDealing] = useState(false)
  const [isFlipping, setIsFlipping] = useState(false)
  const [showBackside, setShowBackside] = useState(true)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  // Sample card data - in a real app, this would come from an API or database
  const sampleCards: CardData[] = [
    {
      id: "spear-air",
      name: "Spear of Air",
      element: "Air",
      type: "Spear",
      imagePath: "/cards/47spear-air.jpg",
    },
    {
      id: "sword-spirit",
      name: "Sword of Spirit",
      element: "Spirit",
      type: "Sword",
      imagePath: "/cards/25sword-spirit.jpg",
    },
    {
      id: "cauldron-earth",
      name: "Cauldron of Earth",
      element: "Earth",
      type: "Cauldron",
      imagePath: "/cards/01cauldron-earth.jpg",
    },
    {
      id: "cord-water",
      name: "Cord of Water",
      element: "Water",
      type: "Cord",
      imagePath: "/cards/38cord-water.jpg",
    },
    {
      id: "sword-fire",
      name: "Sword of Fire",
      element: "Fire",
      type: "Sword",
      imagePath: "/cards/52sword-fire.jpg",
    },
    {
      id: "stone-earth",
      name: "Stone of Earth",
      element: "Earth",
      type: "Stone",
      imagePath: "/cards/69stone-earth.jpg",
    },
    {
      id: "stone-spirit",
      name: "Stone of Spirit",
      element: "Spirit",
      type: "Stone",
      imagePath: "/cards/96stone-spirit.jpg",
    },
  ]

  // Position descriptions for three-card spread
  const threeCardPositions = [
    {
      name: "Past",
      description: "Influences from the past affecting your current situation",
    },
    {
      name: "Present",
      description: "Current energies and immediate concerns",
    },
    {
      name: "Future",
      description: "Potential outcomes and developing energies",
    },
  ]

  const handleDealCards = () => {
    setIsDealing(true)
    setShowBackside(true)
    setCards([])

    // Determine how many cards to draw based on spread type
    const numCards = spreadType === "single" ? 1 : spreadType === "three" ? 3 : 5

    // Simulate delay for animation
    setTimeout(() => {
      // Shuffle and select cards
      const shuffled = [...sampleCards].sort(() => 0.5 - Math.random())
      const selectedCards = shuffled.slice(0, numCards).map((card, index) => {
        // Add position and description for three-card spread
        if (spreadType === "three" && index < threeCardPositions.length) {
          return {
            ...card,
            position: threeCardPositions[index].name,
            description: threeCardPositions[index].description,
          }
        }
        return card
      })

      setCards(selectedCards)
      setIsDealing(false)

      // Flip cards after a delay
      setTimeout(() => {
        setIsFlipping(true)
        setTimeout(() => {
          setShowBackside(false)
          setIsFlipping(false)

          // Notify parent component if callback provided
          if (onCardsDraw) {
            onCardsDraw(selectedCards)
          }
        }, 600)
      }, 1000)
    }, 1000)
  }

  const handleImageError = (cardId: string) => {
    setImageErrors((prev) => ({
      ...prev,
      [cardId]: true,
    }))
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-6">
        <Button
          onClick={handleDealCards}
          disabled={isDealing}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          {isDealing ? "Drawing Cards..." : "Draw Your Cards"}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {cards.map((card, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={cn(
                "relative w-full h-[320px] rounded-lg overflow-hidden shadow-lg transition-all duration-500",
                isFlipping ? "scale-[0.01] rotate-y-90" : "scale-100",
                isDealing ? "opacity-0" : "opacity-100",
              )}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {showBackside ? (
                <div className="w-full h-full bg-black">
                  <Image src="/back.jpg" alt="Card Back" fill className="object-cover" onError={() => {}} />
                </div>
              ) : (
                <>
                  {!imageErrors[card.id] ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={getCardImagePath(card.id, card.element) || "/placeholder.svg"}
                        alt={card.name}
                        fill
                        className="object-contain"
                        onError={(e) => {
                          handleCardImageError(e, card)
                          handleImageError(card.id)
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-purple-900 flex items-center justify-center p-4">
                      <div className="text-center">
                        <div className="text-lg font-bold mb-2">{card.name}</div>
                        <div className="text-sm">
                          {card.element} • {card.type}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {!showBackside && card.position && (
              <div className="mt-4 text-center w-full">
                <Card className="bg-purple-900/80 border-purple-700">
                  <CardContent className="p-3">
                    <div className="font-medium text-white mb-1">{card.position}</div>
                    <p className="text-sm text-gray-200">{card.description}</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        ))}
      </div>

      {cards.length > 0 && !isDealing && !showBackside && (
        <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={handleDealCards} className="border-purple-500 text-purple-300">
            <RefreshCw className="mr-2 h-4 w-4" />
            Draw New Cards
          </Button>
        </div>
      )}
    </div>
  )
}
