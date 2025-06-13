"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Printer, Share2 } from "lucide-react"
import { getCardById, getCardImagePath } from "@/lib/card-data-access"
import type { OracleCard } from "@/types/cards"

interface CardDetailPageClientProps {
  cardId: string
}

export default function CardDetailPageClient({ cardId }: CardDetailPageClientProps) {
  const [card, setCard] = useState<OracleCard | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeEnd, setActiveEnd] = useState<"first" | "second">("first")
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const [activeTab, setActiveTab] = useState("overview") // Declare activeTab and setActiveTab

  useEffect(() => {
    const loadCard = async () => {
      try {
        setIsLoading(true)
        const cardData = getCardById(cardId)

        if (cardData) {
          setCard(cardData)
        } else {
          console.error(`Card with ID ${cardId} not found`)
        }
      } catch (error) {
        console.error("Error loading card:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCard()
  }, [cardId])

  // Handle image error with improved fallback strategy
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, card: OracleCard, endUp: "first" | "second") => {
    console.log(`Image error for card: ${card.id}, end: ${endUp}`)

    const target = e.target as HTMLImageElement

    // Try alternative path formats before falling back
    if (!target.src.includes("placeholder")) {
      // First fallback: Try with different case for element
      const element = endUp === "first" ? card.baseElement : card.synergisticElement
      const elementVariations = [
        element?.toLowerCase(),
        element?.toUpperCase(),
        element?.charAt(0).toUpperCase() + element?.slice(1).toLowerCase(),
      ]

      // Try each variation
      for (const elementVar of elementVariations) {
        const altPath = `/cards/${card.firstEnd?.number}${card.suit?.toLowerCase()}-${elementVar || "spirit"}.jpg` // Use firstEnd.number for image path
        if (target.src !== altPath) {
          target.src = altPath
          return
        }
      }

      // If all variations fail, use placeholder
      target.src = `/placeholder.svg?height=280&width=180&query=${card.fullTitle || "mystical card"}`
    }

    // Record the error
    setImageErrors((prev) => ({
      ...prev,
      [`${card.id}-${endUp}`]: true,
    }))
  }

  // Get element color
  const getElementColor = (element: string) => {
    switch (element?.toLowerCase()) {
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

  // Get element symbol
  const getElementSymbol = (element: string) => {
    switch (element?.toLowerCase()) {
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

  // Get card image with fallback handling
  const getCardImage = (card: OracleCard, endUp: "first" | "second") => {
    const hasImageError = imageErrors[`${card.id}-${endUp}`]
    const imagePath = endUp === "first" ? card.firstEndImage : card.secondEndImage
    const fallbackPath = `/placeholder.svg?height=280&width=180&query=${card.fullTitle || "mystical card"}`

    if (hasImageError) {
      return (
        <div
          className={`w-full h-full ${getElementColor(card.element).split(" ").slice(0, 2).join(" ")} flex flex-col items-center justify-center p-4 rounded-md`}
        >
          <div className="text-center mb-2 text-sm font-medium text-white">{card.fullTitle}</div>
          <div className="w-24 h-24 my-4 rounded-full bg-gray-800/50 border border-gray-300/30 flex items-center justify-center">
            <span className={getElementColor(card.element).split(" ").slice(2).join(" ") + " text-4xl"}>
              {getElementSymbol(card.element)}
            </span>
          </div>
          <div className="text-xs text-center text-white/80 mt-2">
            {card.type} • {card.element}
          </div>
          <div className="text-lg font-bold text-white mt-2">
            {endUp === "first" ? card.firstEnd?.number : card.secondEnd?.number}
          </div>
        </div>
      )
    }

    return (
      <Image
        src={imagePath || getCardImagePath(card, endUp) || fallbackPath}
        alt={`${card.fullTitle} - ${endUp === "first" ? "First End" : "Second End"}`}
        fill
        className="object-contain rounded-md" // Use object-contain for line art style
        onError={(e) => handleImageError(e, card, endUp)}
        priority
      />
    )
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: card?.fullTitle || "Numoracle Card",
          text: `Check out this Numoracle card: ${card?.fullTitle}`,
          url: window.location.href,
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        alert("Link copied to clipboard!")
      }
    } catch (err) {
      console.error("Error sharing:", err)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!card) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <h3 className="text-red-800 font-medium">Error</h3>
        <p className="text-red-600">Card not found</p>
        <Link href="/tools/card-directory">
          <Button variant="outline" className="mt-2">
            Back to Directory
          </Button>
        </Link>
      </div>
    )
  }

  const cardEnd = activeEnd === "first" ? card.firstEnd : card.secondEnd

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Link href="/tools/card-directory">
          <Button variant="outline" size="sm">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Directory
          </Button>
        </Link>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>

          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="space-y-4">
                <div className="relative h-80 w-full">{getCardImage(card, activeEnd)}</div>

                <div className="text-center">
                  <h2 className="text-xl font-bold">{card.fullTitle}</h2>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="meanings">Meanings</TabsTrigger>
                  <TabsTrigger value="symbolism">Symbolism</TabsTrigger>
                  <TabsTrigger value="elements">Elements</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Description</h3>
                    <p className="mt-2">{card.description || "No description available."}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium">Base Element</h4>
                      <p>{card.baseElement}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Synergistic Element</h4>
                      <p>{card.synergisticElement}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Key Meanings</h3>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {card.firstEnd?.keywords?.map((keyword, index) => (
                        <li key={index}>{keyword}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="meanings" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">Primary Meaning</h3>
                      <p>{card.firstEnd?.meaning || "No primary meaning available."}</p>

                      <h4 className="font-medium">Shadow Aspect</h4>
                      <p>{card.firstEnd?.shadowAspect || "No shadow aspect available."}</p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">Secondary Meaning</h3>
                      <p>{card.secondEnd?.meaning || "No secondary meaning available."}</p>

                      <h4 className="font-medium">Shadow Aspect</h4>
                      <p>{card.secondEnd?.shadowAspect || "No shadow aspect available."}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="symbolism" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium">Sacred Geometry</h3>
                      <p className="mt-2">
                        {card.firstEnd?.sacredGeometry || "No sacred geometry information available."}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">Astrological Influences</h3>
                      <div className="mt-2 space-y-2">
                        <div>
                          <h4 className="font-medium">Planet</h4>
                          <p>{card.firstEnd?.planet || "No planetary information available."}</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Astrological Sign</h4>
                          <p>{card.firstEnd?.astrologicalSign || "No astrological sign information available."}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Symbolism</h3>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {card.symbolismBreakdown?.map((symbol, index) => (
                        <li key={index}>{symbol}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="elements" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">Base Element: {card.baseElement}</h3>
                      <div className="relative h-40 w-full">
                        <Image
                          src={getCardImagePath(card, "first") || "/placeholder.svg"}
                          alt={`${card.fullTitle} - ${card.baseElement}`}
                          fill
                          className="object-contain"
                          onError={handleImageError}
                        />
                      </div>
                      <p>The base element represents the primary energy of the card.</p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">Synergistic Element: {card.synergisticElement}</h3>
                      <div className="relative h-40 w-full">
                        <Image
                          src={getCardImagePath(card, "second") || "/placeholder.svg"}
                          alt={`${card.fullTitle} - ${card.synergisticElement}`}
                          fill
                          className="object-contain"
                          onError={handleImageError}
                        />
                      </div>
                      <p>The synergistic element represents the complementary energy of the card.</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Elemental Interaction</h3>
                    <p className="mt-2">
                      The interaction between {card.baseElement} and {card.synergisticElement} creates a unique energy
                      that influences the card's meaning and interpretation.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
