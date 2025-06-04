"use client"

import type React from "react"
// Assuming DirectoryCardData is defined correctly based on your comprehensive-card-data.json structure
// For example:
interface DirectoryCardData {
  name: string
  number: number // This is the crucial field for image key generation
  suit: string
  pair?: string | number
  description: string
  numberMeaning?: string
  keywords?: string[] // Keywords field
  elements: {
    [elementName: string]: {
      influence: string
      guidance: string
      baseElementNote?: boolean // Used by getBaseElement
    }
  }
  sacredGeometryName?: string
  sacredGeometryMeaning?: string
  centerIconName?: string
  centerIconMeaning?: string
  planetName?: string
  planetMeaning?: string
  astroSignName?: string
  astroSignMeaning?: string
}

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Search, Filter, Info, AlertCircle, Printer, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { getCardImagePath } from "@/lib/card-image-utils"

interface CardDirectoryProps {
  onSelectCard?: (card: DirectoryCardData | undefined) => void // Allow undefined for no selection
}

export function CardDirectory({ onSelectCard }: CardDirectoryProps) {
  const [cardData, setCardData] = useState<Record<string, DirectoryCardData>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSuit, setFilterSuit] = useState("all")
  const [filterElement, setFilterElement] = useState("all")
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [filteredCards, setFilteredCards] = useState<[string, DirectoryCardData][]>([])
  const [uniqueSuits, setUniqueSuits] = useState<string[]>([])
  const [currentImageError, setCurrentImageError] = useState(false)

  const getBaseElement = useCallback((card: DirectoryCardData | undefined): string => {
    if (!card || !card.elements) return "Spirit"
    for (const [element, data] of Object.entries(card.elements)) {
      if (data.baseElementNote) {
        return element
      }
    }
    return "Spirit"
  }, [])

  const getDescriptiveImageKey = useCallback(
    (card: DirectoryCardData | null): string | null => {
      if (!card) return null
      if (typeof card.number !== "number" || !card.suit || !card.elements) {
        console.warn(
          "DEBUG (CardDirectory Image): Missing critical data in card to form descriptive key. Card data:",
          card,
        )
        return null
      }
      const numberStr = card.number.toString().padStart(2, "0")
      const suitStr = card.suit.toLowerCase()
      const baseElementStr = getBaseElement(card)?.toLowerCase()
      if (!baseElementStr) {
        console.warn("DEBUG (CardDirectory Image): Could not derive base element for card. Card data:", card)
        return null
      }
      return `${numberStr}${suitStr}-${baseElementStr}`
    },
    [getBaseElement],
  )

  useEffect(() => {
    async function fetchCardData() {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch("/api/card-directory")
        if (!response.ok) {
          throw new Error(`Failed to fetch card data: ${response.statusText}`)
        }
        const data: Record<string, DirectoryCardData> = await response.json()
        setCardData(data)

        const suits = Array.from(
          new Set(
            Object.values(data)
              .map((card) => card.suit)
              .filter(Boolean),
          ),
        )
        setUniqueSuits(suits.sort())

        if (Object.keys(data).length > 0 && !selectedCardId) {
          // Only set initial if not already set
          const sortedKeys = Object.keys(data).sort((a, b) => {
            const cardA = data[a]
            const cardB = data[b]
            if (cardA.number !== cardB.number) {
              return cardA.number - cardB.number
            }
            return a.localeCompare(b)
          })
          const firstCardKey = sortedKeys[0]
          if (firstCardKey) {
            setSelectedCardId(firstCardKey)
            if (onSelectCard) onSelectCard(data[firstCardKey])
          }
        }
      } catch (err: any) {
        console.error("Error fetching card data in CardDirectory:", err)
        setError(err.message || "Failed to load card data.")
      } finally {
        setLoading(false)
      }
    }
    fetchCardData()
  }, [onSelectCard, selectedCardId]) // Keep selectedCardId to allow external control if needed

  useEffect(() => {
    if (!cardData || Object.keys(cardData).length === 0) return

    const lowerSearchTerm = searchTerm.toLowerCase()
    const filtered = Object.entries(cardData)
      .filter(([key, card]) => {
        const matchesSearch =
          searchTerm === "" ||
          card.name.toLowerCase().includes(lowerSearchTerm) ||
          card.description.toLowerCase().includes(lowerSearchTerm) ||
          (card.keywords && card.keywords.some((keyword) => keyword.toLowerCase().includes(lowerSearchTerm)))

        const matchesSuit = filterSuit === "all" || card.suit === filterSuit
        const cardBaseElement = getBaseElement(card)
        const matchesElement = filterElement === "all" || cardBaseElement.toLowerCase() === filterElement.toLowerCase()

        return matchesSearch && matchesSuit && matchesElement
      })
      .sort(([, aCard], [, bCard]) => aCard.number - bCard.number)

    setFilteredCards(filtered)
    if (filtered.length > 0 && !filtered.find(([id]) => id === selectedCardId)) {
      const newSelectedId = filtered[0][0]
      setSelectedCardId(newSelectedId)
      setActiveTab("overview")
      setCurrentImageError(false) // Reset image error state
      if (onSelectCard) onSelectCard(cardData[newSelectedId])
    } else if (filtered.length === 0) {
      setSelectedCardId(null)
      if (onSelectCard) onSelectCard(undefined)
    }
  }, [cardData, searchTerm, filterSuit, filterElement, getBaseElement, onSelectCard])

  const selectedCard = selectedCardId ? cardData[selectedCardId] : null

  const getElementColor = useCallback((element: string | undefined): string => {
    if (!element) return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    switch (element.toLowerCase()) {
      case "fire":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "water":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "air":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" // Changed from sky
      case "earth":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "spirit":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }, [])

  const getSuitIcon = useCallback((suit: string | undefined): string => {
    if (!suit) return "✧"
    switch (suit.toLowerCase()) {
      case "cauldron":
        return "🔮"
      case "sword":
        return "⚔️"
      case "spear":
        return "🔱"
      case "stone":
        return "🪨"
      case "cord":
        return "⚝"
      default:
        return "✧"
    }
  }, [])

  const handleCardSelect = (id: string, card: DirectoryCardData) => {
    setSelectedCardId(id)
    setActiveTab("overview")
    setCurrentImageError(false) // Reset image error state when selecting a new card
    if (onSelectCard) onSelectCard(card)
  }

  const handlePrevCard = useCallback(() => {
    if (!selectedCardId || filteredCards.length === 0) return
    const currentIndex = filteredCards.findIndex(([id]) => id === selectedCardId)
    const prevIndex = (currentIndex - 1 + filteredCards.length) % filteredCards.length
    const newSelectedId = filteredCards[prevIndex][0]
    setSelectedCardId(newSelectedId)
    setActiveTab("overview")
    setCurrentImageError(false) // Reset image error state
    if (onSelectCard) onSelectCard(cardData[newSelectedId])
  }, [selectedCardId, filteredCards, cardData, onSelectCard])

  const handleNextCard = useCallback(() => {
    if (!selectedCardId || filteredCards.length === 0) return
    const currentIndex = filteredCards.findIndex(([id]) => id === selectedCardId)
    const nextIndex = (currentIndex + 1) % filteredCards.length
    const newSelectedId = filteredCards[nextIndex][0]
    setSelectedCardId(newSelectedId)
    setActiveTab("overview")
    setCurrentImageError(false) // Reset image error state
    if (onSelectCard) onSelectCard(cardData[newSelectedId])
  }, [selectedCardId, filteredCards, cardData, onSelectCard])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)
  const handleSuitChange = (value: string) => setFilterSuit(value)
  const handleElementChange = (value: string) => setFilterElement(value)
  const handleClearFilters = () => {
    setSearchTerm("")
    setFilterSuit("all")
    setFilterElement("all")
  }

  const handlePrintCard = useCallback(() => {
    if (!selectedCard) return
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const descriptiveKey = getDescriptiveImageKey(selectedCard)
    const imagePathForPrint = getCardImagePath(descriptiveKey, selectedCard.name)

    const content = `
    <!DOCTYPE html><html><head><title>${selectedCard.name} - NUMO Oracle Card</title><style>body{font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;max-width:800px;margin:20px auto;padding:20px;border:1px solid #eee;box-shadow:0 0 10px rgba(0,0,0,0.1);color:#333}h1{text-align:center;margin-bottom:15px;color:#5a3a8a}h2{margin-top:25px;border-bottom:2px solid #dcb8ff;padding-bottom:8px;color:#7c52b3}.card-image-container{text-align:center;margin-bottom:20px;}.card-image{max-width:300px;height:auto;border-radius:10px;border:1px solid #ccc;}.card-info{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:20px;background-color:#f9f7fc;padding:15px;border-radius:8px}.card-info p{margin:5px 0}.element-section{margin-top:15px;padding:12px;border-radius:8px;border:1px solid #e0e0e0}.element-section h3{margin-top:0;color:#6a409e}.fire{background-color:rgba(255,224,224,0.7);border-left:4px solid #ff8a8a}.water{background-color:rgba(224,239,255,0.7);border-left:4px solid #8ac2ff}.air{background-color:rgba(224,250,255,0.7);border-left:4px solid #8af0ff}.earth{background-color:rgba(224,245,224,0.7);border-left:4px solid #8ae28a}.spirit{background-color:rgba(240,224,255,0.7);border-left:1px solid #c58aff}strong{color:#555}footer{margin-top:30px;text-align:center;font-size:0.9em;color:#777;border-top:1px solid #eee;padding-top:15px}@media print{body{font-size:11pt;box-shadow:none;border:none;margin:0;padding:0}h1{font-size:16pt}h2{font-size:13pt}.card-image-container{margin-bottom:15px;}.card-image{max-width:250px;}.card-info{background-color:#fff!important;padding:10px 0}.no-print{display:none}}</style></head><body><h1>${selectedCard.name}</h1><div class="card-image-container"><img src="${imagePathForPrint}" alt="${selectedCard.name}" class="card-image" onerror="this.style.display='none'; this.insertAdjacentHTML('afterend', '<p style=\\'text-align:center; color:red;\\'>Image not available for printing.</p>');" /></div><div class="card-info"><div><p><strong>Number:</strong> ${selectedCard.number}</p><p><strong>Suit:</strong> ${selectedCard.suit}</p><p><strong>Pair:</strong> ${selectedCard.pair || "N/A"}</p></div><div><p><strong>Base Element:</strong> ${getBaseElement(selectedCard)}</p><p><strong>Planet:</strong> ${selectedCard.planetName || "N/A"}</p><p><strong>Astrological Sign:</strong> ${selectedCard.astroSignName || "N/A"}</p></div></div><h2>Description</h2><p>${selectedCard.description}</p>${selectedCard.numberMeaning ? `<h2>Number Meaning</h2><p>${selectedCard.numberMeaning}</p>` : ""}${selectedCard.sacredGeometryName ? `<h2>Sacred Geometry</h2><p><strong>${selectedCard.sacredGeometryName}</strong>: ${selectedCard.sacredGeometryMeaning || ""}</p>` : ""}${selectedCard.centerIconName ? `<h2>Center Icon</h2><p><strong>${selectedCard.centerIconName}</strong>: ${selectedCard.centerIconMeaning || ""}</p>` : ""}<h2>Elemental Influences</h2>${
      selectedCard.elements && Object.keys(selectedCard.elements).length > 0
        ? Object.entries(selectedCard.elements)
            .map(
              ([element, data]) =>
                `<div class="element-section ${element.toLowerCase()}"><h3>${element} ${data.baseElementNote ? "<span style='font-size:0.8em;color:#a357e0;'>(Base Element)</span>" : ""}</h3><p><strong>Influence:</strong> ${data.influence}</p><p><strong>Guidance:</strong> ${data.guidance}</p></div>`,
            )
            .join("")
        : "<p>No specific elemental influences detailed.</p>"
    }<footer><p>NUMO Oracle Card System - Printed on ${new Date().toLocaleDateString()}</p><p class="no-print">For more details, visit NumOracle.com</p></footer></body></html>`
    printWindow.document.open()
    printWindow.document.write(content)
    printWindow.document.close()
    printWindow.onload = () => {
      printWindow.focus()
      printWindow.print()
    }
  }, [selectedCard, getBaseElement, getDescriptiveImageKey])

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[400px] p-4">
        <div className="animate-spin h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full mr-3"></div>
        <p className="text-lg text-slate-400">Loading Card Directory...</p>
      </div>
    )
  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 bg-red-900/10 border border-red-700/30 rounded-lg">
        <AlertCircle className="h-16 w-16 text-red-400 mb-4" />
        <h3 className="text-2xl font-bold mb-3 text-red-300">Error Loading Cards</h3>
        <p className="text-red-200/80 mb-6 max-w-md">{error}</p>
        <Button variant="destructive" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    )
  if (Object.keys(cardData).length === 0 && !loading)
    // Check !loading to avoid showing this during initial load
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 bg-amber-900/10 border border-amber-700/30 rounded-lg">
        <Info className="h-16 w-16 text-amber-400 mb-4" />
        <h3 className="text-2xl font-bold mb-3 text-amber-300">No Card Data Available</h3>
        <p className="text-amber-200/80 mb-4 max-w-md">
          The card directory is currently empty or the data could not be loaded.
        </p>
      </div>
    )

  const descriptiveKeyForSelectedCard = getDescriptiveImageKey(selectedCard)
  const imagePathForSelectedCard = getCardImagePath(descriptiveKeyForSelectedCard, selectedCard?.name)

  return (
    <div className="container mx-auto px-2 sm:px-4 py-8 text-slate-200">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <Input
                placeholder="Search cards..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 bg-slate-800/70 border-slate-700 focus:border-purple-500 text-slate-200 placeholder-slate-500"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="sm:w-auto w-full bg-slate-800/70 border-slate-700 hover:bg-slate-700/70 text-slate-300"
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700/80">
              <div>
                <label htmlFor="suitFilter" className="text-sm font-medium mb-1 block text-slate-400">
                  Filter by Suit
                </label>
                <Select value={filterSuit} onValueChange={handleSuitChange}>
                  <SelectTrigger id="suitFilter" className="bg-slate-800 border-slate-700 text-slate-200">
                    <SelectValue placeholder="All Suits" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                    <SelectItem value="all">All Suits</SelectItem>
                    {uniqueSuits.map((suit) => (
                      <SelectItem key={suit} value={suit}>
                        {getSuitIcon(suit)} {suit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="elementFilter" className="text-sm font-medium mb-1 block text-slate-400">
                  Filter by Base Element
                </label>
                <Select value={filterElement} onValueChange={handleElementChange}>
                  <SelectTrigger id="elementFilter" className="bg-slate-800 border-slate-700 text-slate-200">
                    <SelectValue placeholder="All Elements" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                    <SelectItem value="all">All Elements</SelectItem>
                    {["Fire", "Water", "Air", "Earth", "Spirit"].map((element) => (
                      <SelectItem key={element} value={element}>
                        <span
                          className={cn(
                            "inline-block w-3 h-3 rounded-full mr-2",
                            getElementColor(element).split(" ")[0], // Get only the bg color class
                          )}
                        ></span>{" "}
                        {element}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-2">
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="w-full bg-slate-800/70 border-slate-700 hover:bg-slate-700/70 text-slate-300"
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
          <div className="md:col-span-2 h-[60vh] md:h-[75vh] overflow-y-auto bg-slate-900/50 rounded-lg border border-slate-700/80 p-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800/50">
            <h2 className="text-xl font-bold mb-4 text-purple-300 sticky top-0 bg-slate-900/80 backdrop-blur-sm py-2 z-10">
              Cards ({filteredCards.length})
            </h2>
            {filteredCards.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-center">
                <p className="text-slate-400 mb-2">No cards match criteria.</p>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  size="sm"
                  className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2.5">
                {filteredCards.map(([id, card]) => (
                  <div
                    key={id}
                    className={cn(
                      "p-3 rounded-lg cursor-pointer transition-all duration-150 ease-in-out border",
                      selectedCardId === id
                        ? "bg-purple-600/30 border-purple-500 shadow-lg"
                        : "bg-slate-800/60 border-slate-700 hover:bg-purple-800/20 hover:border-purple-600/70",
                    )}
                    onClick={() => handleCardSelect(id, card)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center min-w-0">
                        <span className="text-xl mr-2.5">{getSuitIcon(card.suit)}</span>
                        <div className="min-w-0">
                          <h3 className="font-medium text-slate-100 truncate">{card.name}</h3>
                          <p className="text-xs text-slate-400">
                            {card.number} • {card.suit}
                          </p>
                        </div>
                      </div>
                      <Badge className={cn("ml-2 flex-shrink-0", getElementColor(getBaseElement(card)))}>
                        {getBaseElement(card)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="md:col-span-5">
            {selectedCard ? (
              <Card className="bg-slate-900/60 border-slate-700/80 shadow-xl">
                <CardHeader className="pb-3 border-b border-slate-700/60">
                  <div className="flex justify-between items-center mb-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handlePrevCard}
                      disabled={filteredCards.length <= 1}
                      className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <CardTitle className="text-center text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 px-2">
                      {selectedCard.name}
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleNextCard}
                      disabled={filteredCards.length <= 1}
                      className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center items-center text-xs">
                    <Badge variant="outline" className="border-slate-600 bg-slate-800 text-slate-300">
                      {getSuitIcon(selectedCard.suit)} {selectedCard.suit}
                    </Badge>
                    <Badge className={cn(getElementColor(getBaseElement(selectedCard)))}>
                      {getBaseElement(selectedCard)}
                    </Badge>
                    <Badge variant="outline" className="border-slate-600 bg-slate-800 text-slate-300">
                      Number: {selectedCard.number}
                    </Badge>
                    {selectedCard.pair && (
                      <Badge variant="outline" className="border-slate-600 bg-slate-800 text-slate-300">
                        Pair: {selectedCard.pair}
                      </Badge>
                    )}
                    {selectedCardId && (
                      <Link href={`/tools/card-directory/${selectedCardId}`} passHref legacyBehavior>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-purple-400 hover:text-purple-300 flex items-center"
                        >
                          <ExternalLink size={14} className="mr-1" /> View Full Page
                        </a>
                      </Link>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-5">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-2/5 flex flex-col items-center">
                      <div className="relative w-full max-w-[270px] aspect-[270/420] mb-4 rounded-lg overflow-hidden border-2 border-slate-700 shadow-md hover:shadow-purple-500/30 transition-shadow duration-300">
                        {currentImageError ? (
                          <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-300">
                            Image not available
                          </div>
                        ) : (
                          <Image
                            src={imagePathForSelectedCard || "/placeholder.svg"}
                            alt={selectedCard?.name || "Card Image"}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                            priority={true}
                            onError={(e) => {
                              console.error(
                                `ERROR (CardDirectory Image): Failed to load image for ${selectedCard?.name} from src: ${e.currentTarget.src}. Falling back to placeholder.`,
                              )
                              setCurrentImageError(true)
                              // Fallback is handled by getCardImagePath returning a placeholder
                            }}
                          />
                        )}
                      </div>
                      <div className="flex gap-2 w-full max-w-[270px]">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300"
                          onClick={handlePrintCard}
                        >
                          <Printer className="h-4 w-4 mr-2" />
                          Print Card
                        </Button>
                      </div>
                    </div>
                    <div className="lg:w-3/5">
                      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-3 bg-slate-800/70 border-slate-700 mb-4">
                          <TabsTrigger
                            value="overview"
                            className="data-[state=active]:bg-purple-700/30 data-[state=active]:text-purple-200 text-slate-400"
                          >
                            Overview
                          </TabsTrigger>
                          <TabsTrigger
                            value="elements"
                            className="data-[state=active]:bg-purple-700/30 data-[state=active]:text-purple-200 text-slate-400"
                          >
                            Elements
                          </TabsTrigger>
                          <TabsTrigger
                            value="symbolism"
                            className="data-[state=active]:bg-purple-700/30 data-[state=active]:text-purple-200 text-slate-400"
                          >
                            Symbolism
                          </TabsTrigger>
                        </TabsList>
                        <div className="min-h-[250px] text-sm">
                          <TabsContent value="overview" className="space-y-4 text-slate-300">
                            <div>
                              <h3 className="text-lg font-semibold mb-1.5 text-purple-300">Description</h3>
                              <p className="leading-relaxed">{selectedCard.description}</p>
                            </div>
                            {selectedCard.numberMeaning && (
                              <div>
                                <h3 className="text-lg font-semibold mb-1.5 text-purple-300">Number Meaning</h3>
                                <p className="leading-relaxed">{selectedCard.numberMeaning}</p>
                              </div>
                            )}
                            <div>
                              <h3 className="text-lg font-semibold mb-2 text-purple-300">Keywords</h3>
                              <div className="flex flex-wrap gap-2">
                                {selectedCard.keywords && selectedCard.keywords.length > 0 ? (
                                  selectedCard.keywords.map((keyword, index) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="bg-slate-700 text-slate-300 hover:bg-slate-600"
                                    >
                                      {keyword}
                                    </Badge>
                                  ))
                                ) : (
                                  <p className="text-slate-400 italic">No keywords</p>
                                )}
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="elements" className="space-y-4 text-slate-300">
                            {selectedCard.elements && Object.keys(selectedCard.elements).length > 0 ? (
                              Object.entries(selectedCard.elements).map(([element, data]) => (
                                <div key={element} className={cn("p-3.5 rounded-lg border", getElementColor(element))}>
                                  <div className="flex items-center gap-2 mb-1.5">
                                    <h3 className="text-lg font-semibold">{element}</h3>
                                    {data.baseElementNote && (
                                      <Badge variant="destructive" className="bg-red-500/80 text-white text-xs">
                                        Base Element
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="mb-1.5">
                                    <h4 className="font-medium text-slate-200">Influence:</h4>
                                    <p className="leading-relaxed">{data.influence}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-slate-200">Guidance:</h4>
                                    <p className="leading-relaxed">{data.guidance}</p>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-slate-400 italic">No elemental details.</p>
                            )}
                          </TabsContent>
                          <TabsContent value="symbolism" className="space-y-4 text-slate-300">
                            {selectedCard.sacredGeometryName && (
                              <div>
                                <h3 className="text-lg font-semibold mb-1 text-purple-300">Sacred Geometry</h3>
                                <p className="font-medium text-slate-200">{selectedCard.sacredGeometryName}</p>
                                <p className="leading-relaxed text-sm">{selectedCard.sacredGeometryMeaning}</p>
                              </div>
                            )}
                            {selectedCard.centerIconName && (
                              <div>
                                <h3 className="text-lg font-semibold mb-1 text-purple-300">Center Icon</h3>
                                <p className="font-medium text-slate-200">{selectedCard.centerIconName}</p>
                                <p className="leading-relaxed text-sm">{selectedCard.centerIconMeaning}</p>
                              </div>
                            )}
                            {selectedCard.planetName && (
                              <div>
                                <h3 className="text-lg font-semibold mb-1 text-purple-300">Planetary Association</h3>
                                <p className="font-medium text-slate-200">{selectedCard.planetName}</p>
                                <p className="leading-relaxed text-sm">{selectedCard.planetMeaning}</p>
                              </div>
                            )}
                            {selectedCard.astroSignName && (
                              <div>
                                <h3 className="text-lg font-semibold mb-1 text-purple-300">Astrological Sign</h3>
                                <p className="font-medium text-slate-200">{selectedCard.astroSignName}</p>
                                <p className="leading-relaxed text-sm">{selectedCard.astroSignMeaning}</p>
                              </div>
                            )}
                            {!(
                              selectedCard.sacredGeometryName ||
                              selectedCard.centerIconName ||
                              selectedCard.planetName ||
                              selectedCard.astroSignName
                            ) && <p className="text-slate-400 italic">No symbolism details.</p>}
                          </TabsContent>
                        </div>
                      </Tabs>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-slate-900/50 rounded-lg border border-slate-700/80 p-8 text-center">
                <Info className="h-16 w-16 text-slate-500 mb-5" />
                <h3 className="text-2xl font-bold mb-3 text-slate-300">No Card Selected</h3>
                <p className="text-slate-400 mb-4 max-w-sm">
                  {filteredCards.length > 0 ? "Select a card from the list." : "No cards match filters."}
                </p>
                {filteredCards.length === 0 && searchTerm && (
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    className="bg-slate-800/70 border-slate-700 hover:bg-slate-700/70 text-slate-300"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
