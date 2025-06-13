"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ChevronLeft, ChevronRight, Printer, ExternalLink } from "lucide-react"
import { getCardData, getAllElements, getAllSuits, getCardImagePath } from "@/lib/card-data-access"
import type { OracleCard } from "@/types/cards"

export function CardDirectory() {
  const [cards, setCards] = useState<OracleCard[]>([])
  const [filteredCards, setFilteredCards] = useState<OracleCard[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [elementFilter, setElementFilter] = useState<string>("all")
  const [suitFilter, setSuitFilter] = useState<string>("all")
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const [elements, setElements] = useState<string[]>([])
  const [suits, setSuits] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const loadCards = async () => {
      try {
        setIsLoading(true)
        const allCards = getCardData()
        setCards(allCards)
        setElements(getAllElements())
        setSuits(getAllSuits())
        if (allCards.length > 0) {
          setSelectedCardId(allCards[0].id)
        }
      } catch (error) {
        console.error("Error loading cards:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadCards()
  }, [])

  useEffect(() => {
    let result = [...cards]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (card) =>
          card.fullTitle?.toLowerCase().includes(term) ||
          card.number?.toString().includes(term) ||
          card.suit?.toLowerCase().includes(term) ||
          card.baseElement?.toLowerCase().includes(term) ||
          card.synergisticElement?.toLowerCase().includes(term) ||
          card.symbolismBreakdown?.some((item) => item.toLowerCase().includes(term)) ||
          card.keyMeanings?.some((meaning) => meaning.toLowerCase().includes(term)),
      )
    }

    if (elementFilter !== "all") {
      result = result.filter(
        (card) =>
          card.baseElement?.toLowerCase() === elementFilter.toLowerCase() ||
          card.synergisticElement?.toLowerCase() === elementFilter.toLowerCase(),
      )
    }

    if (suitFilter !== "all") {
      result = result.filter((card) => card.suit?.toLowerCase() === suitFilter.toLowerCase())
    }

    setFilteredCards(result)
  }, [searchTerm, elementFilter, suitFilter, cards])

  const selectedCard = filteredCards.find((card) => card.id === selectedCardId) || null

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, card: OracleCard, endUp: "first" | "second") => {
    const target = e.target as HTMLImageElement
    if (!target.src.includes("placeholder")) {
      const element = endUp === "first" ? card.baseElement : card.synergisticElement
      const elementVariations = [
        element?.toLowerCase(),
        element?.toUpperCase(),
        element?.charAt(0).toUpperCase() + element?.slice(1).toLowerCase(),
      ]
      for (const elementVar of elementVariations) {
        const altPath = `/cards/${card.number}${card.suit?.toLowerCase()}-${elementVar || "spirit"}.jpg`
        if (target.src !== altPath) {
          target.src = altPath
          return
        }
      }
      target.src = `/placeholder.svg?height=280&width=180&query=${card.fullTitle || "mystical card"}`
    }
    setImageErrors((prev) => ({ ...prev, [`${card.id}-${endUp}`]: true }))
  }

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

  const getCardImage = (card: OracleCard, endUp: "first" | "second") => {
    const hasImageError = imageErrors[`${card.id}-${endUp}`]
    const imagePath = getCardImagePath(card, endUp)
    const fallbackPath = `/placeholder.svg?height=280&width=180&query=${card.fullTitle || "mystical card"}`

    if (hasImageError) {
      return (
        <div
          className={`w-full h-full ${getElementColor(card.baseElement).split(" ").slice(0, 2).join(" ")} flex flex-col items-center justify-center p-4 rounded-md`}
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
          <div className="text-lg font-bold text-white mt-2">{card.number}</div>
        </div>
      )
    }

    return (
      <Image
        src={imagePath || fallbackPath}
        alt={`${card.fullTitle} - ${endUp === "first" ? "Base Element" : "Synergistic Element"}`}
        fill
        className="object-contain rounded-md"
        onError={(e) => handleImageError(e, card, endUp)}
        priority
      />
    )
  }

  const handleNavigation = (direction: "prev" | "next") => {
    if (!selectedCard) return
    const currentIndex = filteredCards.findIndex((card) => card.id === selectedCard.id)
    let newIndex = currentIndex
    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredCards.length
    } else {
      newIndex = (currentIndex - 1 + filteredCards.length) % filteredCards.length
    }
    setSelectedCardId(filteredCards[newIndex].id)
  }

  const handlePrint = () => {
    if (selectedCard) {
      window.print()
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-900 to-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-gray-900 text-white p-6 md:p-10 relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {/* Left Sidebar: Card List */}
        <Card className="md:col-span-1 bg-gray-900/50 border-purple-500/20 shadow-lg flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-purple-300">Cards ({filteredCards.length})</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4 p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Select value={elementFilter} onValueChange={setElementFilter}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="All Elements" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="all">All Elements</SelectItem>
                  {elements.map((element) => (
                    <SelectItem key={element} value={element.toLowerCase()}>
                      {element}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={suitFilter} onValueChange={setSuitFilter}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="All Suits" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="all">All Suits</SelectItem>
                  {suits.map((suit) => (
                    <SelectItem key={suit} value={suit.toLowerCase()}>
                      {suit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 -mr-2 custom-scrollbar">
              {filteredCards.length > 0 ? (
                filteredCards.map((card) => (
                  <div
                    key={card.id}
                    className={`flex items-center gap-3 p-3 mb-2 rounded-lg cursor-pointer transition-colors ${
                      selectedCardId === card.id
                        ? "bg-purple-700/40 border border-purple-500/50"
                        : "hover:bg-gray-800/50"
                    }`}
                    onClick={() => setSelectedCardId(card.id)}
                  >
                    <div className="relative h-10 w-10 flex-shrink-0">
                      {card.iconSymbol ? (
                        <div className="h-full w-full bg-gray-700 rounded-full flex items-center justify-center text-xs text-gray-300">
                          {card.iconSymbol.charAt(0).toUpperCase()}
                        </div>
                      ) : (
                        <div className="h-full w-full bg-gray-700 rounded-full flex items-center justify-center text-xs text-gray-300">
                          {card.suit?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm text-white">{card.fullTitle}</h3>
                      <p className="text-xs text-gray-400">{card.suit}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getElementColor(card.baseElement || "spirit")}`}
                    >
                      {card.baseElement}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center p-4 text-gray-400">No cards found matching your criteria.</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right Section: Card Detail View */}
        <Card className="md:col-span-2 bg-gray-900/50 border-purple-500/20 shadow-lg flex flex-col">
          {selectedCard ? (
            <>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center mb-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleNavigation("prev")}
                    className="text-purple-300 hover:bg-purple-900/30"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <CardTitle className="text-2xl text-purple-300 text-center flex-1">
                    {selectedCard.fullTitle}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleNavigation("next")}
                    className="text-purple-300 hover:bg-purple-900/30"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getElementColor(selectedCard.suit || "unknown")}`}
                  >
                    {selectedCard.suit}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getElementColor(selectedCard.baseElement || "spirit")}`}
                  >
                    {selectedCard.baseElement}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-800 text-gray-300">
                    Number: {selectedCard.number}
                  </span>
                  <Link href={`/tools/card-directory/${selectedCard.id}`} passHref>
                    <Button variant="ghost" size="sm" className="text-purple-300 hover:bg-purple-900/30">
                      View Full Page <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-48 h-72 border border-gray-700 rounded-md overflow-hidden shadow-xl">
                    {getCardImage(selectedCard, "first")}
                  </div>
                  <Button
                    variant="outline"
                    onClick={handlePrint}
                    className="w-48 bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                  >
                    <Printer className="mr-2 h-4 w-4" /> Print Card
                  </Button>
                </div>
                <div className="space-y-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-3 w-full bg-gray-800/50 border border-gray-700 rounded-md">
                      <TabsTrigger
                        value="overview"
                        className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
                      >
                        Overview
                      </TabsTrigger>
                      <TabsTrigger
                        value="elements"
                        className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
                      >
                        Elements
                      </TabsTrigger>
                      <TabsTrigger
                        value="symbolism"
                        className="data-[state=active]:bg-purple-700 data-[state=active]:text-white"
                      >
                        Symbolism
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="mt-4 space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-purple-300 mb-2">Key Meanings</h3>
                        <ul className="list-disc pl-5 text-gray-300">
                          {selectedCard.keyMeanings.map((meaning, i) => (
                            <li key={i}>{meaning}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-purple-300 mb-2">Number</h3>
                        <p className="text-gray-300">{selectedCard.number}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-purple-300 mb-2">Suit</h3>
                        <p className="text-gray-300">{selectedCard.suit}</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="elements" className="mt-4 space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-purple-300 mb-2">
                          Base Element: {selectedCard.baseElement}
                        </h3>
                        <p className="text-gray-300">The primary elemental energy of the card.</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-purple-300 mb-2">
                          Synergistic Element: {selectedCard.synergisticElement}
                        </h3>
                        <p className="text-gray-300">
                          The complementary elemental energy that influences the card's meaning.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-purple-300 mb-2">Elemental Symbolism</h3>
                        <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                          {selectedCard.symbolismBreakdown
                            .filter((item) => item.includes("Element"))
                            .map((item, i) => (
                              <p key={i} className="text-gray-300 mb-2">
                                {item}
                              </p>
                            ))}
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="symbolism" className="mt-4 space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-purple-300 mb-2">Symbolism Breakdown</h3>
                        {selectedCard.symbolismBreakdown && selectedCard.symbolismBreakdown.length > 0 ? (
                          <ul className="list-disc pl-5 text-gray-300 space-y-1">
                            {selectedCard.symbolismBreakdown.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-400 italic">No detailed symbolism available.</p>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-purple-300 mb-2">Sacred Geometry</h3>
                        <p className="text-gray-300">{selectedCard.sacredGeometry || "No information available."}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-purple-300 mb-2">Planetary Influence</h3>
                        <p className="text-gray-300">
                          {selectedCard.planetInternalInfluence || "No information available."}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-purple-300 mb-2">Astrological Domain</h3>
                        <p className="text-gray-300">
                          {selectedCard.astrologyExternalDomain || "No information available."}
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex flex-col items-center justify-center flex-1 p-6 text-center">
              <div className="relative w-48 h-48 mb-4">
                <Image src="/oracle-card-grid.png" alt="Select a card" fill className="object-contain" />
              </div>
              <h2 className="text-xl font-bold text-purple-300">Select a Card</h2>
              <p className="text-gray-400">Choose a card from the left sidebar to view its detailed information.</p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
