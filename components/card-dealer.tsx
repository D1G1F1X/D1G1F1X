"use client"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { OracleCard } from "@/types/cards"
import { getCardData } from "@/lib/card-data-access"
import { cn } from "@/lib/utils"
import { Sparkles, RefreshCw, HelpCircle, Book } from "lucide-react"

interface SpreadType {
  id: string
  name: string
  description: string
  positions: {
    name: string
    description: string
  }[]
}

const spreadTypes: SpreadType[] = [
  {
    id: "single",
    name: "Single Card",
    description: "A simple draw for daily guidance or a specific question.",
    positions: [
      {
        name: "Guidance",
        description: "The energy or wisdom offered for your consideration",
      },
    ],
  },
  {
    id: "three",
    name: "Three Card Spread",
    description: "Reveals past influences, present situation, and future potential.",
    positions: [
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
    ],
  },
  {
    id: "threeElements",
    name: "Three Elements Spread",
    description: "Reveals how three key elements influence your situation.",
    positions: [
      {
        name: "Mind (Air)",
        description: "Mental influences and thoughts affecting the outcome",
      },
      {
        name: "Body (Earth)",
        description: "Physical aspects and material considerations",
      },
      {
        name: "Spirit (Fire)",
        description: "Creative energy and spiritual guidance",
      },
    ],
  },
  {
    id: "five",
    name: "Five Card Spread",
    description: "Provides a deeper insight into your situation.",
    positions: [
      {
        name: "Center",
        description: "The core issue or focus of your question",
      },
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
      {
        name: "Outcome",
        description: "The likely result of your current situation",
      },
    ],
  },
]

interface CardDealerProps {
  initialCards?: OracleCard[]
  onDeal?: (cards: OracleCard[]) => void
  numberOfCards?: number
  showDetails?: boolean
}

export default function CardDealer({
  initialCards = [],
  onDeal,
  numberOfCards = 1,
  showDetails = true,
}: CardDealerProps) {
  const [dealtCards, setDealtCards] = useState<OracleCard[]>(initialCards)
  const [allAvailableCards, setAllAvailableCards] = useState<OracleCard[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const dealAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const cards = getCardData()
      setAllAvailableCards(cards)
      setIsLoading(false)
    } catch (err) {
      console.error("Failed to load card data:", err)
      setError("Failed to load card data. Please try again later.")
      setIsLoading(false)
    }
  }, [])

  const dealCards = useCallback(() => {
    if (allAvailableCards.length === 0) {
      setError("No cards available to deal.")
      return
    }

    const shuffled = [...allAvailableCards].sort(() => 0.5 - Math.random())
    const newDealtCards = shuffled.slice(0, numberOfCards)
    setDealtCards(newDealtCards)
    onDeal?.(newDealtCards)
  }, [allAvailableCards, numberOfCards, onDeal])

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading cards...</div>
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <p>{error}</p>
        <Button onClick={dealCards} className="mt-4">
          Try Dealing Again
        </Button>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "w-full max-w-4xl mx-auto bg-black/80 text-white p-6 rounded-lg border border-purple-500/20 shadow-lg",
      )}
      ref={dealAreaRef}
    >
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-purple-400" />
              <span>NUMO Card Dealer</span>
            </h2>
            <p className="text-gray-300">
              Draw oracle cards for guidance and insight. Each card has two distinct ends with unique meanings.
            </p>
          </div>

          <Button variant="outline" size="sm" className="border-purple-500/30 text-purple-300">
            <HelpCircle className="mr-2 h-4 w-4" />
            How It Works
          </Button>
        </div>

        <div className="space-y-4">
          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
            onClick={dealCards}
            disabled={isLoading}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Deal New Card{numberOfCards > 1 ? "s" : ""}
          </Button>
        </div>
      </div>

      <div ref={dealAreaRef} className="min-h-[300px] mb-8">
        {dealtCards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {dealtCards.map((card) => (
              <Card key={card.id} className="w-full shadow-lg">
                <CardHeader className="flex flex-col items-center text-center p-4">
                  <CardTitle className="text-2xl font-bold text-purple-800 dark:text-purple-300">
                    {card.fullTitle}
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {card.suit} - {card.number}
                  </p>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {showDetails && (
                    <>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg text-purple-700 dark:text-purple-200">Key Meanings:</h3>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                          {card.keyMeanings.map((meaning, index) => (
                            <li key={index}>{meaning}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg text-purple-700 dark:text-purple-200">
                          Symbolism Breakdown:
                        </h3>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                          {card.symbolismBreakdown.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg text-purple-700 dark:text-purple-200">Symbols:</h3>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                          {card.symbols.map((symbol, index) => (
                            <li key={index}>
                              <strong>{symbol.key}:</strong> {symbol.value}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                        <div>
                          <p>
                            <strong>Base Element:</strong> {card.baseElement}
                          </p>
                          <p>
                            <strong>Synergistic Element:</strong> {card.synergisticElement}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Planet (Internal Influence):</strong> {card.planetInternalInfluence}
                          </p>
                          <p>
                            <strong>Astrology (External Domain):</strong> {card.astrologyExternalDomain}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Icon Symbol:</strong> {card.iconSymbol}
                          </p>
                          <p>
                            <strong>Orientation:</strong> {card.orientation}
                          </p>
                          <p>
                            <strong>Sacred Geometry:</strong> {card.sacredGeometry}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-center text-gray-400">
            <div>
              <Book className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p>Select a spread type and draw your cards</p>
            </div>
          </div>
        )}
      </div>

      {dealtCards.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Button variant="outline" className="border-purple-500 text-purple-300" onClick={dealCards}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Draw New Cards
          </Button>
        </div>
      )}
    </div>
  )
}
