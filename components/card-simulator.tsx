"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Sparkles, RefreshCw, Share2, Download } from "lucide-react"
import { EnhancedCardImage } from "@/components/enhanced-card-image-handler"
import { ShareReadingDialog } from "@/components/share-reading-dialog"
import type { OracleCard } from "@/types/cards"
import { filterCards, getSymbolValue } from "@/lib/card-data-access" // Corrected import path for getSymbolValue

interface CardSimulatorProps {
  allCards: OracleCard[]
  suits: string[]
  elements: string[]
  numbers: string[]
}

export function CardSimulator({ allCards, suits, elements, numbers }: CardSimulatorProps) {
  const [drawnCard, setDrawnCard] = useState<OracleCard | null>(null)
  const [selectedSuit, setSelectedSuit] = useState<string>("any")
  const [selectedElement, setSelectedElement] = useState<string>("any")
  const [selectedNumber, setSelectedNumber] = useState<string>("any")
  const [loading, setLoading] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)

  useEffect(() => {
    if (allCards.length > 0 && !drawnCard) {
      drawRandomCard(allCards, "any", "any", "any")
    }
  }, [allCards, drawnCard])

  const drawRandomCard = (
    cardsToDrawFrom: OracleCard[],
    suitFilter: string,
    elementFilter: string,
    numberFilter: string,
  ) => {
    setLoading(true)

    try {
      const filtered = filterCards(cardsToDrawFrom, {
        suit: suitFilter === "any" ? undefined : suitFilter,
        element: elementFilter === "any" ? undefined : elementFilter,
        number: numberFilter === "any" ? undefined : numberFilter,
      })

      if (filtered.length > 0) {
        const randomIndex = Math.floor(Math.random() * filtered.length)
        setDrawnCard(filtered[randomIndex])
      } else {
        setDrawnCard(null)
      }
    } catch (error) {
      console.error("Error drawing card:", error)
      setDrawnCard(null)
    } finally {
      setLoading(false)
    }
  }

  const handleDrawCard = () => {
    drawRandomCard(allCards, selectedSuit, selectedElement, selectedNumber)
  }

  const handleDownloadImage = () => {
    if (drawnCard) {
      const link = document.createElement("a")
      link.href = drawnCard.imageUrl
      link.download = `${drawnCard.fullTitle.replace(/\s/g, "-")}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  // Use the imported getSymbolValue from lib/card-data-access
  const getSymbolValueSafe = (card: OracleCard, key: keyof OracleCard | string): string => {
    const value = getSymbolValue(card, key as any) // Cast to any because CardSymbolKey is more specific
    return value !== undefined ? value : "N/A"
  }

  if (loading && !drawnCard) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] text-lg text-muted-foreground">
        <Sparkles className="h-6 w-6 animate-spin mr-2" />
        Loading cards for simulator...
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 min-h-[calc(100vh-64px)]">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Oracle Card Simulator
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Draw a random card from the deck, or filter by suit, element, or number to get a specific insight.
        </p>
      </div>

      <Card className="max-w-3xl mx-auto bg-gradient-to-br from-purple-900 to-indigo-900 text-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Draw Your Card</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          {/* Card Display */}
          <div className="flex flex-col items-center justify-center">
            {drawnCard ? (
              <>
                <EnhancedCardImage
                  cardId={drawnCard.id}
                  cardTitle={drawnCard.fullTitle}
                  baseElement={drawnCard.baseElement}
                  synergisticElement={drawnCard.synergisticElement}
                  className="w-full max-w-[270px] mb-4"
                  showStatus={true}
                />
                <h3 className="text-xl font-bold text-center mb-2">{drawnCard.fullTitle}</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary" className="bg-purple-600 text-white">
                    {drawnCard.suit}
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-600 text-white">
                    {drawnCard.baseElement}
                  </Badge>
                  {drawnCard.synergisticElement && drawnCard.synergisticElement !== drawnCard.baseElement && (
                    <Badge variant="secondary" className="bg-purple-600 text-white">
                      {drawnCard.synergisticElement}
                    </Badge>
                  )}
                  <Badge variant="secondary" className="bg-purple-600 text-white">
                    Number: {drawnCard.number}
                  </Badge>
                  {drawnCard.sacredGeometry && (
                    <Badge variant="secondary" className="bg-purple-600 text-white">
                      Sacred Geometry: {getSymbolValueSafe(drawnCard, "Sacred Geometry")}
                    </Badge>
                  )}
                  {drawnCard.iconSymbol && (
                    <Badge variant="secondary" className="bg-purple-600 text-white">
                      Icon: {getSymbolValueSafe(drawnCard, "Icon")}
                    </Badge>
                  )}
                </div>
              </>
            ) : (
              <div className="w-full max-w-[270px] h-[360px] bg-purple-800 rounded-lg flex items-center justify-center text-purple-300 text-center">
                {loading ? (
                  <div className="flex flex-col items-center">
                    <Sparkles className="h-8 w-8 animate-spin mb-2" />
                    <span>Drawing card...</span>
                  </div>
                ) : (
                  "Draw a card to begin"
                )}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <div className="grid gap-4">
              <Label htmlFor="suit-filter" className="text-purple-200">
                Filter by Suit
              </Label>
              <Select value={selectedSuit} onValueChange={setSelectedSuit}>
                <SelectTrigger id="suit-filter" className="bg-purple-800 border-purple-700 text-white">
                  <SelectValue placeholder="Any Suit" />
                </SelectTrigger>
                <SelectContent className="bg-purple-900 border-purple-700 text-white">
                  <SelectItem value="any">Any Suit</SelectItem>
                  {suits.map((suit) => (
                    <SelectItem key={suit} value={suit}>
                      {suit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label htmlFor="element-filter" className="text-purple-200">
                Filter by Element
              </Label>
              <Select value={selectedElement} onValueChange={setSelectedElement}>
                <SelectTrigger id="element-filter" className="bg-purple-800 border-purple-700 text-white">
                  <SelectValue placeholder="Any Element" />
                </SelectTrigger>
                <SelectContent className="bg-purple-900 border-purple-700 text-white">
                  <SelectItem value="any">Any Element</SelectItem>
                  {elements.map((element) => (
                    <SelectItem key={element} value={element}>
                      {element}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label htmlFor="number-filter" className="text-purple-200">
                Filter by Number
              </Label>
              <Select value={selectedNumber} onValueChange={setSelectedNumber}>
                <SelectTrigger id="number-filter" className="bg-purple-800 border-purple-700 text-white">
                  <SelectValue placeholder="Any Number" />
                </SelectTrigger>
                <SelectContent className="bg-purple-900 border-purple-700 text-white">
                  <SelectItem value="any">Any Number</SelectItem>
                  {numbers.map((number) => (
                    <SelectItem key={number} value={number}>
                      {number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleDrawCard}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Drawing..." : "Draw Card"}
            </Button>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 bg-purple-700 hover:bg-purple-600 text-white border-purple-600"
                onClick={() => setIsShareDialogOpen(true)}
                disabled={!drawnCard || loading}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-purple-700 hover:bg-purple-600 text-white border-purple-600"
                onClick={handleDownloadImage}
                disabled={!drawnCard || loading}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {drawnCard && (
        <div className="mt-8 max-w-3xl mx-auto">
          <Card className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
            <CardHeader>
              <CardTitle className="text-xl">Card Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {drawnCard.keyMeanings && drawnCard.keyMeanings.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-purple-200 mb-2">Key Meanings:</h4>
                    <ul className="space-y-1">
                      {drawnCard.keyMeanings.slice(0, 3).map((meaning, index) => (
                        <li key={index} className="text-sm text-purple-100">
                          • {meaning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {drawnCard.symbolismBreakdown && drawnCard.symbolismBreakdown.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-purple-200 mb-2">Symbolism:</h4>
                    <p className="text-sm text-purple-100">{drawnCard.symbolismBreakdown[0]}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {drawnCard && (
        <ShareReadingDialog
          open={isShareDialogOpen}
          onOpenChange={setIsShareDialogOpen}
          reading={{
            id: drawnCard.id,
            title: drawnCard.fullTitle,
            summary: drawnCard.keyMeanings?.[0] || "No summary available.",
            imageUrl: drawnCard.imageUrl,
            createdAt: new Date().toISOString(),
            type: "single-card",
            cards: [drawnCard],
          }}
        />
      )}
    </div>
  )
}
