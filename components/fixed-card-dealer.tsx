"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getCardData } from "@/lib/card-data-access"
import type { OracleCard } from "@/types/cards"

interface DrawnCard {
  card: OracleCard
  endUp: "first" | "second"
}

export default function FixedCardDealer() {
  const [cards, setCards] = useState<OracleCard[]>([])
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [showReading, setShowReading] = useState(false)
  const [selectedCard, setSelectedCard] = useState<DrawnCard | null>(null)

  useEffect(() => {
    const cardData = getCardData()
    setCards(cardData)
  }, [])

  const drawCards = () => {
    if (cards.length === 0) return

    setIsDrawing(true)
    setShowReading(false)
    setSelectedCard(null)

    // Simulate drawing delay
    setTimeout(() => {
      const shuffled = [...cards].sort(() => 0.5 - Math.random())
      const drawn = shuffled.slice(0, 3).map((card) => ({
        card,
        endUp: Math.random() > 0.5 ? "first" : ("second" as "first" | "second"),
      }))

      setDrawnCards(drawn)
      setIsDrawing(false)
      setShowReading(true)
    }, 1500)
  }

  const getCardImagePath = (card: OracleCard, endUp: "first" | "second"): string => {
    // Use the imagePath directly from the card object
    return card.imagePath || "/placeholder.svg"
  }

  const getElementColor = (element: string) => {
    switch (element.toLowerCase()) {
      case "earth":
        return "bg-green-900/20 border-green-500/30 text-green-300"
      case "water":
        return "bg-blue-900/20 border-blue-500/30 text-blue-300"
      case "fire":
        return "bg-red-900/20 border-red-500/30 text-red-300"
      case "air":
        return "bg-yellow-900/20 border-yellow-500/30 text-yellow-300"
      case "spirit":
        return "bg-purple-900/20 border-purple-500/30 text-purple-300"
      default:
        return "bg-gray-900/20 border-gray-500/30 text-gray-300"
    }
  }

  const getElementSymbol = (element: string) => {
    switch (element.toLowerCase()) {
      case "earth":
        return "⊕"
      case "water":
        return "≈"
      case "fire":
        return "△"
      case "air":
        return "≋"
      case "spirit":
        return "✧"
      default:
        return "★"
    }
  }

  const renderCard = (drawnCard: DrawnCard, index: number) => {
    const { card, endUp } = drawnCard
    const imagePath = getCardImagePath(card, endUp)

    // Use the direct number field from the card data
    const cardNumber = card.number || "0"

    return (
      <div
        key={`${card.id}-${index}`}
        className="w-[200px] h-[320px] rounded-lg overflow-hidden shadow-[0_0_20px_rgba(128,0,128,0.3)] cursor-pointer hover:shadow-[0_0_30px_rgba(128,0,128,0.5)] transition-all duration-300 transform hover:scale-105"
        onClick={() => setSelectedCard(drawnCard)}
      >
        <div className="relative w-full h-full">
          <img
            src={imagePath || "/placeholder.svg"}
            alt={`${card.fullTitle} - ${endUp === "first" ? "Base Element" : "Synergistic Element"}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to element-based display
              const target = e.target as HTMLImageElement
              target.style.display = "none"
              target.nextElementSibling?.classList.remove("hidden")
            }}
          />
          <div
            className={`hidden w-full h-full ${getElementColor(card.baseElement).split(" ").slice(0, 2).join(" ")} flex flex-col items-center justify-center p-4`}
          >
            <div className="text-center mb-2 text-sm font-medium text-white">{card.fullTitle}</div>
            <div className="w-24 h-24 my-4 rounded-full bg-gray-800/50 border border-gray-300/30 flex items-center justify-center">
              <span className={getElementColor(card.baseElement).split(" ").slice(2).join(" ") + " text-4xl"}>
                {getElementSymbol(card.baseElement)}
              </span>
            </div>
            <div className="text-xs text-center text-white/80 mt-2">
              {card.suit} • {card.baseElement}
            </div>
            <div className="text-lg font-bold text-white mt-2">{cardNumber}</div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-center">
            <div className="text-xs font-medium text-white truncate">{card.fullTitle}</div>
            <div className="text-xs text-gray-300">
              {cardNumber} • {endUp === "first" ? card.baseElement : card.synergisticElement}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderCardModal = () => {
    if (!selectedCard) return null

    const { card, endUp } = selectedCard
    // Use the direct number field from the card data
    const cardNumber = card.number || "0"

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
        <div className="bg-gray-900 border border-purple-500/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-purple-300">
                {card.suit} of {endUp === "first" ? card.baseElement : card.synergisticElement} -{" "}
                {endUp === "first" ? "First" : "Second"} End
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setSelectedCard(null)}>
                ✕
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Card Image */}
              <div className="flex justify-center">
                <div className="w-[300px] h-[480px] rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={getCardImagePath(card, endUp) || "/placeholder.svg"}
                    alt={`${card.fullTitle} - ${endUp === "first" ? "Base Element" : "Synergistic Element"}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                      target.nextElementSibling?.classList.remove("hidden")
                    }}
                  />
                  <div
                    className={`hidden w-full h-full ${getElementColor(card.baseElement).split(" ").slice(0, 2).join(" ")} flex flex-col items-center justify-center p-6`}
                  >
                    <div className="text-center mb-4 text-lg font-medium text-white">{card.fullTitle}</div>
                    <div className="w-32 h-32 my-6 rounded-full bg-gray-800/50 border border-gray-300/30 flex items-center justify-center">
                      <span className={getElementColor(card.baseElement).split(" ").slice(2).join(" ") + " text-6xl"}>
                        {getElementSymbol(card.baseElement)}
                      </span>
                    </div>
                    <div className="text-sm text-center text-white/80 mt-4">
                      {card.suit} • {card.baseElement}
                    </div>
                    <div className="text-2xl font-bold text-white mt-4">{cardNumber}</div>
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Card Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Element:</span>
                      <span className="text-white ml-2">
                        {endUp === "first" ? card.baseElement : card.synergisticElement}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Type:</span>
                      <span className="text-white ml-2">{card.suit}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Number:</span>
                      <span className="text-white ml-2">{cardNumber}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Sacred Geometry:</span>
                      <span className="text-white ml-2">{card.sacredGeometry}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Planet:</span>
                      <span className="text-white ml-2">{card.planetInternalInfluence?.split(" – ")[0] || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Rules:</span>
                      <span className="text-white ml-2">{card.astrologyExternalDomain?.split(" – ")[0] || "N/A"}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-purple-300 mb-2">Meaning</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {card.keyMeanings?.[0] || "Mastery of spiritual wisdom and the ability to bridge worlds."}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-purple-300 mb-2">Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {card.keyMeanings?.slice(0, 4).map((meaning, index) => {
                      const keyword = meaning.split(":")[0] || meaning.split(".")[0] || meaning.substring(0, 20)
                      return (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      )
                    }) || (
                      <>
                        <Badge variant="secondary" className="text-xs">
                          Mastery
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Integration
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Teaching
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Enlightenment
                        </Badge>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-purple-300 mb-3">Expanded Interpretation</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                The {endUp === "first" ? "first" : "second"} end of the {card.suit} of{" "}
                {endUp === "first" ? card.baseElement : card.synergisticElement} represents{" "}
                {card.symbolismBreakdown?.[0]?.replace(/^Number: \d+ – /, "") ||
                  "the mastery of spiritual wisdom and the ability to integrate the lessons of all elements into a cohesive whole."}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">NUMO Oracle Card Simulator</h2>
        <p className="text-gray-300 mb-6">
          Draw three cards to receive guidance from the ancient wisdom of the NUMO Oracle
        </p>
        <Button
          onClick={drawCards}
          disabled={isDrawing || cards.length === 0}
          size="lg"
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
        >
          {isDrawing ? "Drawing Cards..." : "Draw Cards"}
        </Button>
      </div>

      {showReading && drawnCards.length > 0 && (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">Reading Interpretation</h3>
            <p className="text-gray-300 mb-6">Your cards have been drawn. Here's what they reveal:</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {drawnCards.map((drawnCard, index) => renderCard(drawnCard, index))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {drawnCards.map((drawnCard, index) => {
              const { card } = drawnCard
              // Use the direct number field from the card data
              const cardNumber = card.number || "0"

              return (
                <Card key={index} className="bg-gray-800/50 border-purple-500/30">
                  <CardContent className="p-4">
                    <h4 className="text-lg font-semibold text-purple-300 mb-2">
                      Card {index + 1}: {card.fullTitle}
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary">{card.suit}</Badge>
                      <Badge variant="outline">Number: {cardNumber}</Badge>
                      <Badge variant="destructive">{card.baseElement}</Badge>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {card.keyMeanings?.[0] || "This card brings wisdom and guidance for your journey."}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {renderCardModal()}
    </div>
  )
}
