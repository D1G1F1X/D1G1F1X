"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EnhancedCardImage } from "@/components/enhanced-card-image-handler"
import { getSymbolDescription, getSymbolValue } from "@/lib/numerology" // Ensure getSymbolValue is imported
import type { OracleCard } from "@/types/cards"
import { Sparkles } from "lucide-react"

interface CardDetailPageClientProps {
  card: OracleCard | null
}

export default function CardDetailPageClient({ card }: CardDetailPageClientProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (card) {
      setLoading(false)
    }
  }, [card])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] text-lg text-muted-foreground">
        <Sparkles className="h-6 w-6 animate-spin mr-2" /> Loading card details...
      </div>
    )
  }

  if (!card) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] text-lg text-muted-foreground">
        Card not found.
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 min-h-[calc(100vh-64px)]">
      <Card className="max-w-4xl mx-auto bg-gradient-to-br from-purple-900 to-indigo-900 text-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            {card.fullTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center justify-center">
            <EnhancedCardImage
              cardId={card.id}
              cardTitle={card.fullTitle}
              baseElement={card.baseElement}
              synergisticElement={card.synergisticElement}
              className="w-full max-w-[300px] mb-6 rounded-lg shadow-xl"
              showStatus={true}
            />
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary" className="bg-purple-600 text-white">
                Suit: {card.suit}
              </Badge>
              <Badge variant="secondary" className="bg-purple-600 text-white">
                Base Element: {card.baseElement}
              </Badge>
              {card.synergisticElement && card.synergisticElement !== card.baseElement && (
                <Badge variant="secondary" className="bg-purple-600 text-white">
                  Synergistic Element: {card.synergisticElement}
                </Badge>
              )}
              <Badge variant="secondary" className="bg-purple-600 text-white">
                Number: {card.number}
              </Badge>
              {card.sacredGeometry && (
                <Badge variant="secondary" className="bg-purple-600 text-white">
                  Sacred Geometry: {card.sacredGeometry}
                </Badge>
              )}
              {card.iconSymbol && (
                <Badge variant="secondary" className="bg-purple-600 text-white">
                  Icon: {card.iconSymbol}
                </Badge>
              )}
              {card.orientation && (
                <Badge variant="secondary" className="bg-purple-600 text-white">
                  Orientation: {card.orientation}
                </Badge>
              )}
              {card.planetInternalInfluence && (
                <Badge variant="secondary" className="bg-purple-600 text-white">
                  Planet: {card.planetInternalInfluence.split(" – ")[0]}
                </Badge>
              )}
              {card.astrologyExternalDomain && (
                <Badge variant="secondary" className="bg-purple-600 text-white">
                  Astrology: {card.astrologyExternalDomain.split(" – ")[0]}
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-6 text-purple-100">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                Key Meanings
              </h2>
              <ul className="list-disc list-inside space-y-1">
                {card.keyMeanings.map((meaning, index) => (
                  <li key={index}>{meaning}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                Symbolism Breakdown
              </h2>
              <ul className="list-disc list-inside space-y-1">
                {card.symbolismBreakdown.map((breakdown, index) => (
                  <li key={index}>{breakdown}</li>
                ))}
              </ul>
            </div>

            {card.iconSymbol && (
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                  Icon Symbolism
                </h2>
                <p>{getSymbolDescription(card.iconSymbol)}</p>
                <p className="mt-2">Numerological Value: {getSymbolValue(card.iconSymbol)}</p>
              </div>
            )}

            {card.sacredGeometry && (
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                  Sacred Geometry Symbolism
                </h2>
                <p>{getSymbolDescription(card.sacredGeometry)}</p>
                <p className="mt-2">Numerological Value: {getSymbolValue(card.sacredGeometry)}</p>
              </div>
            )}

            {card.planetInternalInfluence && (
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                  Planetary Influence
                </h2>
                <p>{getSymbolDescription(card.planetInternalInfluence.split(" – ")[0])}</p>
              </div>
            )}

            {card.astrologyExternalDomain && (
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                  Astrological Domain
                </h2>
                <p>{getSymbolDescription(card.astrologyExternalDomain.split(" – ")[0])}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
