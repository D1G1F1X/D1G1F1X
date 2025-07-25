"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { EnhancedCardImage } from "@/components/enhanced-card-image-handler"
import { filterCards, sortCards, getSymbolValue } from "@/lib/card-data-access"
import type { OracleCard, CardSymbolKey } from "@/types/cards"
import Link from "next/link"

interface CardDirectoryProps {
  allCards: OracleCard[]
  suits: string[]
  elements: string[]
  numbers: string[]
}

export function CardDirectory({ allCards, suits, elements, numbers }: CardDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSuit, setSelectedSuit] = useState("any")
  const [selectedElement, setSelectedElement] = useState("any")
  const [selectedNumber, setSelectedNumber] = useState("any")
  const [sortBy, setSortBy] = useState<"number" | "fullTitle" | "suit" | "baseElement">("number")

  const filteredAndSortedCards = useMemo(() => {
    let currentCards = allCards

    // Apply filters
    currentCards = filterCards(currentCards, {
      suit: selectedSuit === "any" ? undefined : selectedSuit,
      element: selectedElement === "any" ? undefined : selectedElement,
      number: selectedNumber === "any" ? undefined : selectedNumber,
      query: searchTerm,
    })

    // Apply sorting
    currentCards = sortCards(currentCards, sortBy)

    return currentCards
  }, [allCards, searchTerm, selectedSuit, selectedElement, selectedNumber, sortBy])

  // Ensure initial state is set if allCards is available
  useEffect(() => {
    if (
      allCards.length > 0 &&
      filteredAndSortedCards.length === 0 &&
      searchTerm === "" &&
      selectedSuit === "any" &&
      selectedElement === "any" &&
      selectedNumber === "any"
    ) {
      // If no cards are shown due to initial filters, reset them or ensure a default view
      // This might happen if default 'any' filters don't match anything, which shouldn't be the case
      // if allCards is populated. This is more of a safeguard.
    }
  }, [allCards, filteredAndSortedCards, searchTerm, selectedSuit, selectedElement, selectedNumber])

  // Use the imported getSymbolValue from lib/card-data-access
  const getSymbolValueSafe = (card: OracleCard, key: CardSymbolKey): string => {
    const value = getSymbolValue(card, key)
    return value !== undefined ? value : "N/A"
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 min-h-[calc(100vh-64px)]">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Oracle Card Directory
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore the full collection of Oracle Cards. Use the filters to find specific cards or browse the entire deck.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-1 space-y-4">
          <Card className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Filters & Sort</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="search" className="text-purple-200">
                  Search
                </Label>
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by title or meaning..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-purple-800 border-purple-700 text-white placeholder:text-purple-300"
                />
              </div>

              <div>
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
              </div>

              <div>
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
              </div>

              <div>
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

              <div>
                <Label htmlFor="sort-by" className="text-purple-200">
                  Sort By
                </Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sort-by" className="bg-purple-800 border-purple-700 text-white">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent className="bg-purple-900 border-purple-700 text-white">
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="fullTitle">Title</SelectItem>
                    <SelectItem value="suit">Suit</SelectItem>
                    <SelectItem value="baseElement">Element</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          {filteredAndSortedCards.length === 0 ? (
            <div className="text-center text-muted-foreground text-lg py-10">
              No cards found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedCards.map((card) => (
                <Link href={`/tools/card-directory/${card.id}`} key={card.id}>
                  <Card className="bg-gradient-to-br from-purple-800 to-indigo-800 text-white shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    <CardContent className="p-4 flex flex-col items-center justify-center flex-grow">
                      <EnhancedCardImage
                        cardId={card.id}
                        cardTitle={card.fullTitle}
                        baseElement={card.baseElement}
                        synergisticElement={card.synergisticElement}
                        className="w-full max-w-[180px] mb-4"
                        showStatus={true}
                      />
                      <h3 className="text-lg font-bold text-center mb-2">{card.fullTitle}</h3>
                      <div className="flex flex-wrap gap-2 justify-center">
                        <Badge variant="secondary" className="bg-purple-600 text-white">
                          {card.suit}
                        </Badge>
                        <Badge variant="secondary" className="bg-purple-600 text-white">
                          {card.baseElement}
                        </Badge>
                        <Badge variant="secondary" className="bg-purple-600 text-white">
                          Number: {card.number}
                        </Badge>
                        {card.sacredGeometry && (
                          <Badge variant="secondary" className="bg-purple-600 text-white">
                            Sacred Geometry: {getSymbolValueSafe(card, "Sacred Geometry")}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
