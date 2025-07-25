"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Grid, List, ChevronRight, Sparkles, Eye, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import Image from "next/image"
import { filterCards, sortCards, debugCardLoading } from "@/lib/card-data-access"
import type { OracleCard, CardSortOption } from "@/types/cards"

interface CardDirectoryPageClientProps {
  initialCards: OracleCard[]
  suits: string[]
  elements: string[]
  numbers: string[]
}

export default function CardDirectoryPageClient({
  initialCards,
  suits,
  elements,
  numbers,
}: CardDirectoryPageClientProps) {
  const [cards, setCards] = useState<OracleCard[]>(initialCards) // Keep initialCards as the base
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSuit, setSelectedSuit] = useState<string>("all")
  const [selectedElement, setSelectedElement] = useState<string>("all")
  const [selectedNumber, setSelectedNumber] = useState<string>("all")
  const [sortBy, setSortBy] = useState<CardSortOption>("number")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [loading, setLoading] = useState(false) // This loading state might be less relevant now as data is server-fetched
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  // Debug card loading on mount
  useEffect(() => {
    const cardCount = debugCardLoading(initialCards)
    console.log(`Card Directory initialized with ${cardCount} cards`)
  }, [initialCards])

  // Filter and sort cards
  const filteredAndSortedCards = useMemo(() => {
    const filtered = filterCards(initialCards, {
      // Use initialCards for filtering
      suit: selectedSuit === "all" ? undefined : selectedSuit,
      element: selectedElement === "all" ? undefined : selectedElement,
      number: selectedNumber === "all" ? undefined : selectedNumber,
      query: searchQuery || undefined,
    })
    return sortCards(filtered, sortBy)
  }, [searchQuery, selectedSuit, selectedElement, selectedNumber, sortBy, initialCards])

  // Reset filters
  const clearFilters = () => {
    setSearchQuery("")
    setSelectedSuit("all")
    setSelectedElement("all")
    setSelectedNumber("all")
  }

  // Check if any filters are active
  const hasActiveFilters =
    searchQuery || selectedSuit !== "all" || selectedElement !== "all" || selectedNumber !== "all"

  // Handle image errors
  const handleImageError = (cardId: string) => {
    setImageErrors((prev) => new Set(prev).add(cardId))
  }

  // Get fallback image URL
  const getFallbackImageUrl = (card: OracleCard) => {
    return `/placeholder.svg?height=300&width=200&text=${encodeURIComponent(card.fullTitle)}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Oracle Card Directory
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the complete collection of Numo Oracle cards. Each card contains ancient wisdom and elemental
            insights to guide your spiritual journey.
          </p>
          <div className="mt-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {initialCards.length} Total Cards Available
            </Badge>
          </div>
        </div>

        {/* Debug Info */}
        {process.env.NODE_ENV === "development" && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Debug: Loaded {initialCards.length} cards from JSON data. Filtered results:{" "}
              {filteredAndSortedCards.length} cards. Image errors: {imageErrors.size} cards.
            </AlertDescription>
          </Alert>
        )}

        {/* Filters and Controls */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
            <CardDescription>Filter cards by suit, element, number, or search by keywords</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Suit Filter */}
              <Select value={selectedSuit} onValueChange={setSelectedSuit}>
                <SelectTrigger>
                  <SelectValue placeholder="All Suits" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Suits ({suits.length})</SelectItem>
                  {suits.map((suit) => (
                    <SelectItem key={suit} value={suit}>
                      {suit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Element Filter */}
              <Select value={selectedElement} onValueChange={setSelectedElement}>
                <SelectTrigger>
                  <SelectValue placeholder="All Elements" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Elements ({elements.length})</SelectItem>
                  {elements.map((element) => (
                    <SelectItem key={element} value={element}>
                      {element}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Number Filter */}
              <Select value={selectedNumber} onValueChange={setSelectedNumber}>
                <SelectTrigger>
                  <SelectValue placeholder="All Numbers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Numbers</SelectItem>
                  {numbers.map((number) => (
                    <SelectItem key={number} value={number}>
                      {number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Controls Row */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex gap-2">
                {hasActiveFilters && (
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
                <Badge variant="secondary">
                  {filteredAndSortedCards.length} card{filteredAndSortedCards.length !== 1 ? "s" : ""} found
                </Badge>
              </div>

              <div className="flex gap-2 items-center">
                {/* Sort */}
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as CardSortOption)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="number">By Number</SelectItem>
                    <SelectItem value="suit">By Suit</SelectItem>
                    <SelectItem value="title">By Title</SelectItem>
                    <SelectItem value="element">By Element</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards Display */}
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2">
              <Sparkles className="h-5 w-5 animate-spin" />
              Loading cards...
            </div>
          </div>
        ) : filteredAndSortedCards.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No cards found matching your search criteria.</p>
              {hasActiveFilters && (
                <Button variant="outline" className="mt-4 bg-transparent" onClick={clearFilters}>
                  Clear filters to see all cards
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
            }
          >
            {filteredAndSortedCards.map((card) => (
              <Link key={card.id} href={`/tools/card-directory/${card.id}`}>
                <Card
                  className={`group hover:shadow-xl transition-all duration-300 cursor-pointer ${
                    viewMode === "grid" ? "h-full" : ""
                  }`}
                >
                  {viewMode === "grid" ? (
                    <div className="relative overflow-hidden">
                      <div className="aspect-[3/4] relative bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900">
                        <Image
                          src={imageErrors.has(card.id) ? getFallbackImageUrl(card) : card.imageUrl}
                          alt={card.fullTitle}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          onError={() => handleImageError(card.id)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="font-bold text-lg mb-1 line-clamp-2">{card.fullTitle}</h3>
                          <div className="flex gap-2 mb-2">
                            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                              {card.suit}
                            </Badge>
                            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                              {card.baseElement}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-sm opacity-90">
                            <Eye className="h-3 w-3" />
                            View Details
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-20 relative bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={imageErrors.has(card.id) ? getFallbackImageUrl(card) : card.imageUrl}
                            alt={card.fullTitle}
                            fill
                            className="object-cover"
                            sizes="64px"
                            onError={() => handleImageError(card.id)}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg mb-2 group-hover:text-purple-600 transition-colors">
                            {card.fullTitle}
                          </h3>
                          <div className="flex gap-2 mb-3">
                            <Badge variant="outline">{card.suit}</Badge>
                            <Badge variant="outline">{card.baseElement}</Badge>
                            <Badge variant="outline">#{card.number}</Badge>
                          </div>
                          {card.keyMeanings && card.keyMeanings[0] && (
                            <p className="text-muted-foreground text-sm line-clamp-2">
                              {card.keyMeanings[0].split(":")[1]?.trim() || card.keyMeanings[0]}
                            </p>
                          )}
                          <div className="mt-2 text-xs text-muted-foreground">
                            <span className="font-medium">Sacred Geometry:</span> {card.sacredGeometry} •
                            <span className="font-medium"> Orientation:</span> {card.orientation}
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-purple-600 transition-colors flex-shrink-0" />
                      </div>
                    </CardContent>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
