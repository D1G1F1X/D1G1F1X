"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Filter, Grid, List, Eye } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllCards } from "@/lib/card-data-access"
import { EnhancedCardImage } from "@/components/enhanced-card-image-handler"
import type { OracleCard } from "@/types/cards"
import Link from "next/link"

export default function CardDirectoryPageClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSuit, setSelectedSuit] = useState<string>("all")
  const [selectedElement, setSelectedElement] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"number" | "suit" | "title">("number")

  // Get all cards from the master data
  const allCards = useMemo(() => getAllCards(), [])

  // Get unique suits and elements for filters
  const suits = useMemo(() => {
    const uniqueSuits = Array.from(new Set(allCards.map((card) => card.suit)))
    return uniqueSuits.sort()
  }, [allCards])

  const elements = useMemo(() => {
    const uniqueElements = Array.from(new Set(allCards.flatMap((card) => [card.baseElement, card.synergisticElement])))
    return uniqueElements.sort()
  }, [allCards])

  // Filter and sort cards
  const filteredCards = useMemo(() => {
    const filtered = allCards.filter((card) => {
      const matchesSearch =
        searchTerm === "" ||
        card.fullTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.suit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.baseElement.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.synergisticElement.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesSuit = selectedSuit === "all" || card.suit === selectedSuit

      const matchesElement =
        selectedElement === "all" || card.baseElement === selectedElement || card.synergisticElement === selectedElement

      return matchesSearch && matchesSuit && matchesElement
    })

    // Sort cards
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "number":
          return Number.parseInt(a.number) - Number.parseInt(b.number)
        case "suit":
          return a.suit.localeCompare(b.suit) || Number.parseInt(a.number) - Number.parseInt(b.number)
        case "title":
          return a.fullTitle.localeCompare(b.fullTitle)
        default:
          return 0
      }
    })

    return filtered
  }, [allCards, searchTerm, selectedSuit, selectedElement, sortBy])

  const CardGridView = ({ cards }: { cards: OracleCard[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <Card key={card.id} className="bg-black/30 border-gray-800 hover:border-purple-500/50 transition-colors">
          <CardContent className="p-4">
            <div className="space-y-3">
              <EnhancedCardImage
                cardId={card.id}
                cardTitle={card.fullTitle}
                baseElement={card.baseElement}
                synergisticElement={card.synergisticElement}
                className="w-full"
                showStatus={false}
              />

              <div className="space-y-2">
                <h3 className="font-semibold text-sm line-clamp-2">{card.fullTitle}</h3>

                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    {card.suit}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {card.baseElement}
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-purple-900/30">
                    {card.synergisticElement}
                  </Badge>
                </div>

                <div className="text-xs text-gray-400 space-y-1">
                  <p>
                    <strong>Icon:</strong> {card.iconSymbol}
                  </p>
                  <p>
                    <strong>Orientation:</strong> {card.orientation}
                  </p>
                </div>

                <Link href={`/tools/card-directory/${card.id}`}>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const CardListView = ({ cards }: { cards: OracleCard[] }) => (
    <div className="space-y-4">
      {cards.map((card) => (
        <Card key={card.id} className="bg-black/30 border-gray-800 hover:border-purple-500/50 transition-colors">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-20">
                <EnhancedCardImage
                  cardId={card.id}
                  cardTitle={card.fullTitle}
                  baseElement={card.baseElement}
                  synergisticElement={card.synergisticElement}
                  className="w-full"
                  showStatus={false}
                />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold">{card.fullTitle}</h3>
                  <Link href={`/tools/card-directory/${card.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </Link>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    {card.suit}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {card.baseElement}
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-purple-900/30">
                    {card.synergisticElement}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
                  <p>
                    <strong>Icon:</strong> {card.iconSymbol}
                  </p>
                  <p>
                    <strong>Orientation:</strong> {card.orientation}
                  </p>
                  <p>
                    <strong>Sacred Geometry:</strong> {card.sacredGeometry}
                  </p>
                  <p>
                    <strong>Number:</strong> {card.number}
                  </p>
                </div>

                {card.keyMeanings && card.keyMeanings.length > 0 && (
                  <p className="text-sm text-gray-300 line-clamp-2">{card.keyMeanings[0]}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">NUMO Oracle Card Directory</h1>
        <p className="text-gray-400">Explore the complete collection of oracle cards</p>
        <p className="text-sm text-gray-500">{allCards.length} cards available</p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-black/30 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search cards by title, suit, or element..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedSuit} onValueChange={setSelectedSuit}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Suit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Suits</SelectItem>
                {suits.map((suit) => (
                  <SelectItem key={suit} value={suit}>
                    {suit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedElement} onValueChange={setSelectedElement}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Element" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Elements</SelectItem>
                {elements.map((element) => (
                  <SelectItem key={element} value={element}>
                    {element}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value: "number" | "suit" | "title") => setSortBy(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="suit">Suit</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>

            <Tabs value={viewMode} onValueChange={(value: "grid" | "list") => setViewMode(value)}>
              <TabsList className="w-full">
                <TabsTrigger value="grid" className="flex-1">
                  <Grid className="h-4 w-4 mr-1" />
                  Grid
                </TabsTrigger>
                <TabsTrigger value="list" className="flex-1">
                  <List className="h-4 w-4 mr-1" />
                  List
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {filteredCards.length} Card{filteredCards.length !== 1 ? "s" : ""} Found
          </h2>
        </div>

        {filteredCards.length === 0 ? (
          <Card className="bg-black/30 border-gray-800">
            <CardContent className="p-8 text-center">
              <p className="text-gray-400">No cards match your current filters.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedSuit("all")
                  setSelectedElement("all")
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : viewMode === "grid" ? (
          <CardGridView cards={filteredCards} />
        ) : (
          <CardListView cards={filteredCards} />
        )}
      </div>
    </div>
  )
}
