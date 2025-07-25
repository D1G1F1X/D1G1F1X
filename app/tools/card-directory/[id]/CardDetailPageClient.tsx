"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EnhancedCardImage } from "@/components/enhanced-card-image-handler"
import type { OracleCard } from "@/types/cards"
import { getSymbolDescription } from "@/lib/numerology" // Keep getSymbolDescription from numerology

interface CardDetailPageClientProps {
  card: OracleCard
}

export default function CardDetailPageClient({ card }: CardDetailPageClientProps) {
  if (!card) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-6 text-center text-lg text-muted-foreground">
        Card not found.
      </div>
    )
  }

  // Use a safe wrapper for getSymbolValue to handle any potential errors
  const getSymbolValueSafe = (card: OracleCard, key: keyof OracleCard): string => {
    if (!card || !card[key]) return "N/A"
    try {
      // Directly access the property if it's a simple string/number
      if (typeof card[key] === "string" || typeof card[key] === "number") {
        return card[key]?.toString() || "N/A"
      }
      // For complex symbols array, use the getSymbolValue from card-data-access
      // This assumes `key` here is one of the `CardSymbolKey` types.
      // If `key` is literally "iconSymbol", then `card.iconSymbol` is already the value.
      // The original `getSymbolValue(symbol)` was problematic because `symbol` was a string like "Pentagon"
      // and `getSymbolValue` expects an OracleCard and a key.
      // Re-evaluating based on how `iconSymbol` is used in the badge.
      // It seems `card.iconSymbol` already holds the value.
      return card.iconSymbol // Assuming iconSymbol is directly the value
    } catch (error) {
      console.error(`Error getting symbol value for ${key}:`, error)
      return "N/A"
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 min-h-[calc(100vh-64px)]">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          {card.fullTitle}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A deep dive into the meaning and symbolism of this Oracle Card.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto bg-gradient-to-br from-purple-900 to-indigo-900 text-white shadow-lg">
        <CardContent className="grid md:grid-cols-2 gap-8 p-6">
          {/* Card Image and Basic Info */}
          <div className="flex flex-col items-center justify-center">
            <EnhancedCardImage
              cardId={card.id}
              cardTitle={card.fullTitle}
              baseElement={card.baseElement}
              synergisticElement={card.synergisticElement}
              className="w-full max-w-[270px] mb-4"
              showStatus={true}
            />
            <h3 className="text-xl font-bold text-center mb-2">{card.fullTitle}</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary" className="bg-purple-600 text-white">
                {card.suit}
              </Badge>
              <Badge variant="secondary" className="bg-purple-600 text-white">
                {card.baseElement}
              </Badge>
              {card.synergisticElement && card.synergisticElement !== card.baseElement && (
                <Badge variant="secondary" className="bg-purple-600 text-white">
                  {card.synergisticElement}
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
                  Symbol Value: {getSymbolValueSafe(card, "iconSymbol")}
                </Badge>
              )}
            </div>
          </div>

          {/* Detailed Insights */}
          <div className="space-y-6">
            {card.keyMeanings && card.keyMeanings.length > 0 && (
              <div>
                <h4 className="font-semibold text-purple-200 mb-2">Key Meanings:</h4>
                <ul className="space-y-1">
                  {card.keyMeanings.map((meaning, index) => (
                    <li key={index} className="text-sm text-purple-100">
                      • {meaning}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {card.symbolismBreakdown && card.symbolismBreakdown.length > 0 && (
              <div>
                <h4 className="font-semibold text-purple-200 mb-2">Symbolism Breakdown:</h4>
                <ul className="space-y-1">
                  {card.symbolismBreakdown.map((symbolism, index) => (
                    <li key={index} className="text-sm text-purple-100">
                      • {symbolism}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {card.numberMeaning && (
              <div>
                <h4 className="font-semibold text-purple-200 mb-2">Number Meaning:</h4>
                <p className="text-sm text-purple-100">{card.numberMeaning}</p>
              </div>
            )}

            {card.planetInternalInfluence && (
              <div>
                <h4 className="font-semibold text-purple-200 mb-2">Internal Influence (Planet):</h4>
                <p className="text-sm text-purple-100">{getSymbolDescription(card.planetInternalInfluence)}</p>
              </div>
            )}

            {card.astrologyExternalDomain && (
              <div>
                <h4 className="font-semibold text-purple-200 mb-2">External Domain (Astrology):</h4>
                <p className="text-sm text-purple-100">{getSymbolDescription(card.astrologyExternalDomain)}</p>
              </div>
            )}

            {card.orientation && (
              <div>
                <h4 className="font-semibold text-purple-200 mb-2">Orientation:</h4>
                <p className="text-sm text-purple-100">{getSymbolDescription(card.orientation)}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
