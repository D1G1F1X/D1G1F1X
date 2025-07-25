"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Share2, Download, Sparkles } from "lucide-react"
import { EnhancedCardImage } from "@/components/enhanced-card-image-handler"
import { ShareReadingDialog } from "@/components/share-reading-dialog"
import type { OracleCard } from "@/types/cards"
import { getSymbolValue, getSymbolDescription } from "@/lib/numerology" // Corrected import path

interface CardDetailPageClientProps {
  card: OracleCard | null
}

export function CardDetailPageClient({ card }: CardDetailPageClientProps) {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (card) {
      setLoading(false)
    }
  }, [card])

  const handleDownloadImage = () => {
    if (card) {
      const link = document.createElement("a")
      link.href = card.imageUrl
      link.download = `${card.fullTitle.replace(/\s/g, "-")}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] text-lg text-muted-foreground">
        <Sparkles className="h-6 w-6 animate-spin mr-2" />
        Loading card details...
      </div>
    )
  }

  if (!card) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-6 text-center text-xl text-muted-foreground min-h-[calc(100vh-64px)]">
        Card not found.
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 min-h-[calc(100vh-64px)]">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          {card.fullTitle}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Deep dive into the symbolism and meanings of this Oracle Card.
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
              className="w-full max-w-[300px] mb-4"
              showStatus={true}
            />
            <div className="flex flex-wrap gap-2 justify-center mt-4">
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
            </div>
            <div className="flex gap-4 mt-6 w-full max-w-[300px]">
              <Button
                variant="outline"
                className="flex-1 bg-purple-700 hover:bg-purple-600 text-white border-purple-600"
                onClick={() => setIsShareDialogOpen(true)}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-purple-700 hover:bg-purple-600 text-white border-purple-600"
                onClick={handleDownloadImage}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          {/* Card Details */}
          <div className="space-y-6">
            {card.keyMeanings && card.keyMeanings.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-purple-200 mb-2">Key Meanings</h3>
                <ul className="list-disc list-inside space-y-1 text-purple-100">
                  {card.keyMeanings.map((meaning, index) => (
                    <li key={index}>{meaning}</li>
                  ))}
                </ul>
              </div>
            )}

            {card.symbolismBreakdown && card.symbolismBreakdown.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-purple-200 mb-2">Symbolism Breakdown</h3>
                <ul className="list-disc list-inside space-y-1 text-purple-100">
                  {card.symbolismBreakdown.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {card.planetInternalInfluence && (
                <div>
                  <h4 className="font-semibold text-purple-200">Planet (Internal Influence)</h4>
                  <p className="text-sm text-purple-100">{getSymbolDescription(card.planetInternalInfluence)}</p>
                </div>
              )}
              {card.astrologyExternalDomain && (
                <div>
                  <h4 className="font-semibold text-purple-200">Astrology (External Domain)</h4>
                  <p className="text-sm text-purple-100">{getSymbolDescription(card.astrologyExternalDomain)}</p>
                </div>
              )}
              {card.iconSymbol && (
                <div>
                  <h4 className="font-semibold text-purple-200">Icon Symbol</h4>
                  <p className="text-sm text-purple-100">
                    {getSymbolDescription(card.iconSymbol)} (Value: {getSymbolValue(card.iconSymbol)})
                  </p>
                </div>
              )}
              {card.orientation && (
                <div>
                  <h4 className="font-semibold text-purple-200">Orientation</h4>
                  <p className="text-sm text-purple-100">{getSymbolDescription(card.orientation)}</p>
                </div>
              )}
              {card.sacredGeometry && (
                <div>
                  <h4 className="font-semibold text-purple-200">Sacred Geometry</h4>
                  <p className="text-sm text-purple-100">{getSymbolDescription(card.sacredGeometry)}</p>
                </div>
              )}
              {card.synergisticElement && (
                <div>
                  <h4 className="font-semibold text-purple-200">Synergistic Element</h4>
                  <p className="text-sm text-purple-100">{getSymbolDescription(card.synergisticElement)}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {card && (
        <ShareReadingDialog
          open={isShareDialogOpen}
          onOpenChange={setIsShareDialogOpen}
          reading={{
            id: card.id,
            title: card.fullTitle,
            summary: card.keyMeanings?.[0] || "No summary available.",
            imageUrl: card.imageUrl,
            createdAt: new Date().toISOString(),
            type: "card-detail",
            cards: [card],
          }}
        />
      )}
    </div>
  )
}
