"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCardById } from "@/lib/card-data-access"
import type { OracleCard } from "@/types/cards"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface CardDetailPageClientProps {
  cardId: string
}

export default function CardDetailPageClient({ cardId }: CardDetailPageClientProps) {
  const [card, setCard] = useState<OracleCard | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    setError(null)
    try {
      const fetchedCard = getCardById(cardId)
      if (fetchedCard) {
        setCard(fetchedCard)
      } else {
        setError("Card not found.")
      }
    } catch (err) {
      console.error("Failed to fetch card data:", err)
      setError("Failed to load card details. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }, [cardId])

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading card details...</div>
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!card) {
    return (
      <Alert className="max-w-md mx-auto mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Card Data</AlertTitle>
        <AlertDescription>No card data available to display.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <CardHeader className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-t-lg">
          <CardTitle className="text-3xl font-extrabold text-purple-900 dark:text-purple-200">
            {card.fullTitle}
          </CardTitle>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
            {card.suit} - Number {card.number}
          </p>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-3">
            <h3 className="font-bold text-xl text-purple-800 dark:text-purple-300">Key Meanings:</h3>
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-1">
              {card.keyMeanings.map((meaning, index) => (
                <li key={index}>{meaning}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-xl text-purple-800 dark:text-purple-300">Symbolism Breakdown:</h3>
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-1">
              {card.symbolismBreakdown.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-xl text-purple-800 dark:text-purple-300">Core Symbols:</h3>
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-1">
              {card.symbols.map((symbol, index) => (
                <li key={index}>
                  <strong>{symbol.key}:</strong> {symbol.value}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800 dark:text-gray-200">
            <div>
              <p>
                <strong>Number:</strong> {card.number}
              </p>
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
        </CardContent>
      </Card>
    </div>
  )
}
