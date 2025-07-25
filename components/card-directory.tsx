"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useEffect, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Search, Sparkles } from "lucide-react"
import { EnhancedCardImage } from "@/components/enhanced-card-image-handler"
import type { OracleCard, CardSortOption } from "@/types/cards"
import { filterCards, sortCards } from "@/lib/card-data-access"
import { getSymbolValue } from "@/lib/numerology" // Corrected import path

interface CardDirectoryProps {
  allCards: OracleCard[]
  suits: string[]
  elements: string[]
  numbers: string[]
}

const CARDS_PER_PAGE = 12

export function CardDirectory({ allCards, suits, elements, numbers }: CardDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSuit, setSelectedSuit] = useState("all")
  const [selectedElement, setSelectedElement] = useState("all")
  const [selectedNumber, setSelectedNumber] = useState("all")
  const [sortBy, setSortBy] = useState<CardSortOption>("number")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (allCards.length > 0) {
      setLoading(false)
    }
  }, [allCards])

  const filteredAndSortedCards = useMemo(() => {
    const filtered = filterCards(allCards, {
      suit: selectedSuit === "all" ? undefined : selectedSuit,
      element: selectedElement === "all" ? undefined : selectedElement,
      number: selectedNumber === "all" ? undefined : selectedNumber,
      query: searchTerm,
    })
    return sortCards(filtered, sortBy)
  }, [allCards, searchTerm, selectedSuit, selectedElement, selectedNumber, sortBy])

  const totalPages = Math.ceil(filteredAndSortedCards.length / CARDS_PER_PAGE)
  const paginatedCards = useMemo(() => {
    const startIndex = (currentPage - 1) * CARDS_PER_PAGE
    const endIndex = startIndex + CARDS_PER_PAGE
    return filteredAndSortedCards.slice(startIndex, endIndex)
  }, [filteredAndSortedCards, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

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
          Explore the full collection of Numo Oracle cards. Filter by suit, element, or number, and search for specific
          card meanings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search cards..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-9 bg-card text-card-foreground border-border"
          />
        </div>

        <Select
          value={selectedSuit}
          onValueChange={(value) => {
            setSelectedSuit(value)
            setCurrentPage(1)
          }}
        >
          <SelectTrigger className="bg-card text-card-foreground border-border">
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

        <Select
          value={selectedElement}
          onValueChange={(value) => {
            setSelectedElement(value)
            setCurrentPage(1)
          }}
        >
          <SelectTrigger className="bg-card text-card-foreground border-border">
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

        <Select
          value={selectedNumber}
          onValueChange={(value) => {
            setSelectedNumber(value)
            setCurrentPage(1)
          }}
        >
          <SelectTrigger className="bg-card text-card-foreground border-border">
            <SelectValue placeholder="Filter by Number" />
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

      {paginatedCards.length === 0 ? (
        <div className="text-center text-muted-foreground text-xl py-12">No cards found matching your criteria.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedCards.map((card) => (
              <Card key={card.id} className="flex flex-col items-center p-4 bg-card text-card-foreground shadow-lg">
                <EnhancedCardImage
                  cardId={card.id}
                  cardTitle={card.fullTitle}
                  baseElement={card.baseElement}
                  synergisticElement={card.synergisticElement}
                  className="w-full max-w-[200px] mb-4"
                />
                <h3 className="text-lg font-semibold text-center mb-2">{card.fullTitle}</h3>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  <Badge variant="secondary">{card.suit}</Badge>
                  <Badge variant="secondary">{card.baseElement}</Badge>
                  {card.synergisticElement && card.synergisticElement !== card.baseElement && (
                    <Badge variant="secondary">{card.synergisticElement}</Badge>
                  )}
                  <Badge variant="secondary">Number: {card.number}</Badge>
                  {card.sacredGeometry && <Badge variant="secondary">Sacred Geometry: {card.sacredGeometry}</Badge>}
                  {card.iconSymbol && (
                    <Badge variant="secondary">Symbol Value: {getSymbolValueSafe(card.iconSymbol)}</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground text-center line-clamp-3">
                  {card.keyMeanings?.[0] || "No key meaning available."}
                </p>
                <Button variant="link" className="mt-2 text-primary" asChild>
                  <a href={`/tools/card-directory/${card.id}`}>View Details</a>
                </Button>
              </Card>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <Button variant="outline" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              <ChevronLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            <span className="text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
