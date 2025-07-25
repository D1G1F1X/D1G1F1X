"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EnhancedCardImage } from "@/components/enhanced-card-image-handler"
import { getSymbolValue } from "@/lib/card-data-access" // Corrected import path
import type { OracleCard, CardSymbolKey } from "@/types/cards"

interface CardDetailPageClientProps {
  card: OracleCard
}

export function CardDetailPageClient({ card }: CardDetailPageClientProps) {
  // Use the imported getSymbolValue from lib/card-data-access
  const getSymbolValueSafe = (card: OracleCard, key: CardSymbolKey): string => {
    const value = getSymbolValue(card, key)
    return value !== undefined ? value : "N/A"
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 min-h-[calc(100vh-64px)]">
      <Card className="max-w-4xl mx-auto bg-gradient-to-br from-purple-900 to-indigo-900 text-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center mb-4">{card.fullTitle}</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center justify-center">
            <EnhancedCardImage
              cardId={card.id}
              cardTitle={card.fullTitle}
              baseElement={card.baseElement}
              synergisticElement={card.synergisticElement}
              className="w-full max-w-[300px] mb-6"
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
                  Sacred Geometry: {getSymbolValueSafe(card, "Sacred Geometry")}
                </Badge>
              )}
              {card.iconSymbol && (
                <Badge variant="secondary" className="bg-purple-600 text-white">
                  Icon: {getSymbolValueSafe(card, "Icon")}
                </Badge>
              )}
              {card.orientation && (
                <Badge variant="secondary" className="bg-purple-600 text-white">
                  Orientation: {getSymbolValueSafe(card, "Orientation")}
                </Badge>
              )}
              {card.planetInternalInfluence && (
                <Badge variant="secondary" className="bg-purple-600 text-white">
                  Planet: {getSymbolValueSafe(card, "Planet (Internal Influence)")}
                </Badge>
              )}
              {card.astrologyExternalDomain && (
                <Badge variant="secondary" className="bg-purple-600 text-white">
                  Astrology: {getSymbolValueSafe(card, "Astrology (External Domain)")}
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {card.keyMeanings && card.keyMeanings.length > 0 && (
              <div>
                <h4 className="font-semibold text-purple-200 mb-2 text-xl">Key Meanings:</h4>
                <ul className="space-y-2 text-purple-100">
                  {card.keyMeanings.map((meaning, index) => (
                    <li key={index} className="text-base">
                      • {meaning}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {card.symbolismBreakdown && card.symbolismBreakdown.length > 0 && (
              <div>
                <h4 className="font-semibold text-purple-200 mb-2 text-xl">Symbolism Breakdown:</h4>
                <ul className="space-y-2 text-purple-100">
                  {card.symbolismBreakdown.map((breakdown, index) => (
                    <li key={index} className="text-base">
                      • {breakdown}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
