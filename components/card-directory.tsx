"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Search } from "lucide-react"
import { EnhancedCardImage } from "@/components/enhanced-card-image-handler"
import type { OracleCard } from "@/types/cards"
import { filterCards, sortCards } from "@/lib/card-data-access"
import { getSymbolValue } from "@/lib/numerology" // Correct import path

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
  const [sortBy, setSortBy] = useState("number")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay or actual data fetching if it were client-side
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500) // Adjust as needed
    return () => clearTimeout(timer)
  }, [])

  const filteredAndSortedCards = useMemo(() => {
    const filtered = filterCards(allCards, {
      suit: selectedSuit === "any" ? undefined : selectedSuit,
      element: selectedElement === "any" ? undefined : selectedElement,
      number: selectedNumber === "any" ? undefined : selectedNumber,
      query: searchTerm,
    })
    return sortCards(filtered, sortBy as any) // Cast to CardSortOption
  }, [allCards, searchTerm, selectedSuit, selectedElement, selectedNumber, sortBy])

  // Use a safe wrapper for getSymbolValue to handle any potential errors
  const getSymbolValueSafe = (symbol: string | undefined): string => {
    if (!symbol) return "N/A"
    try {
      const value = getSymbolValue(symbol)
      return value.toString()
    } catch (error) {
      console.error(`Error getting symbol value for ${symbol}:`, error)
      return "N/A"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] text-lg text-muted-foreground">
        <Sparkles className="h-6 w-6 animate-spin mr-2" />
        Loading card directory...
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 min-h-[calc(100vh-64px)]">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Oracle Card Directory
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore the full collection of Oracle Cards. Filter and search to find specific insights.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="relative">
          <Label htmlFor="search-cards" className="sr-only">
            Search Cards
          </Label>
          <Input
            id="search-cards"
            placeholder="Search cards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
        </div>

        <div>
          <Label htmlFor="suit-filter" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Filter by Suit
          </Label>
          <Select value={selectedSuit} onValueChange={setSelectedSuit}>
            <SelectTrigger
              id="suit-filter"
              className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
            >
              <SelectValue placeholder="Any Suit" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
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
          <Label htmlFor="element-filter" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Filter by Element
          </Label>
          <Select value={selectedElement} onValueChange={setSelectedElement}>
            <SelectTrigger
              id="element-filter"
              className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
            >
              <SelectValue placeholder="Any Element" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
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
          <Label htmlFor="number-filter" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Filter by Number
          </Label>
          <Select value={selectedNumber} onValueChange={setSelectedNumber}>
            <SelectTrigger
              id="number-filter"
              className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
            >
              <SelectValue placeholder="Any Number" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
              <SelectItem value="any">Any Number</SelectItem>
              {numbers.map((number) => (
                <SelectItem key={number} value={number}>
                  {number}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredAndSortedCards.length > 0 ? (
          filteredAndSortedCards.map((card) => (
            <Card
              key={card.id}
              className="bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <CardContent className="p-4 flex flex-col items-center">
                <EnhancedCardImage
                  cardId={card.id}
                  cardTitle={card.fullTitle}
                  baseElement={card.baseElement}
                  synergisticElement={card.synergisticElement}
                  className="w-full max-w-[200px] mb-4"
                />
                <h3 className="text-lg font-semibold text-center mb-2 text-gray-900 dark:text-gray-100">
                  {card.fullTitle}
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                  >
                    {card.suit}
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                    {card.baseElement}
                  </Badge>
                  {card.synergisticElement && card.synergisticElement !== card.baseElement && (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    >
                      {card.synergisticElement}
                    </Badge>
                  )}
                  <Badge
                    variant="secondary"
                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                  >
                    Number: {card.number}
                  </Badge>
                  {card.sacredGeometry && (
                    <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                      Sacred Geometry: {card.sacredGeometry}
                    </Badge>
                  )}
                  {card.iconSymbol && (
                    <Badge
                      variant="secondary"
                      className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100"
                    >
                      Symbol Value: {getSymbolValueSafe(card.iconSymbol)}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground text-lg py-12">
            No cards found matching your criteria.
          </div>
        )}
      </div>
    </div>
  )
}
