"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Loader2, Search, Filter, Info } from "lucide-react"
import Image from "next/image"
import { getCardData, getCardImagePath, getAllSuits, getAllElements } from "@/lib/card-data-access"
import type { OracleCard, CardSuit, CardElement } from "@/types/cards"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function CardDirectoryPageClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSuit, setSelectedSuit] = useState<CardSuit | "all">("all")
  const [selectedElement, setSelectedElement] = useState<CardElement | "all">("all")
  const [allCards, setAllCards] = useState<OracleCard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const suits = useMemo(() => ["all", ...getAllSuits()], [])
  const elements = useMemo(() => ["all", ...getAllElements()], [])

  useEffect(() => {
    try {
      const cards = getCardData() as OracleCard[]
      setAllCards(cards)
      setLoading(false)
    } catch (err) {
      console.error("Failed to load card data:", err)
      setError("Failed to load card data. Please try again later.")
      setLoading(false)
    }
  }, [])

  const filteredCards = useMemo(() => {
    return allCards.filter((card) => {
      const matchesSearch = searchTerm
        ? card.fullTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.keyMeanings.some((meaning) => meaning.toLowerCase().includes(searchTerm.toLowerCase())) ||
          card.symbolismBreakdown.some((breakdown) => breakdown.toLowerCase().includes(searchTerm.toLowerCase()))
        : true

      const matchesSuit = selectedSuit === "all" || card.suit === selectedSuit
      const matchesElement =
        selectedElement === "all" || card.baseElement === selectedElement || card.synergisticElement === selectedElement

      return matchesSearch && matchesSuit && matchesElement
    })
  }, [allCards, searchTerm, selectedSuit, selectedElement])

  const CardDetailModal = ({ card }: { card: OracleCard }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mt-2 bg-transparent">
          <Info className="h-4 w-4 mr-1" />
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{card.fullTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden border">
              <Image
                src={getCardImagePath(card, "first") || "/placeholder.svg"}
                alt={card.fullTitle}
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=420&width=270"
                }}
              />
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Badge variant="outline">Number: {card.number}</Badge>
                <Badge variant="outline">Suit: {card.suit}</Badge>
                <Badge variant="outline">Base: {card.baseElement}</Badge>
                <Badge variant="outline">Synergistic: {card.synergisticElement}</Badge>
              </div>
              <div className="space-y-2">
                <p>
                  <strong>Icon:</strong> {card.iconSymbol}
                </p>
                <p>
                  <strong>Orientation:</strong> {card.orientation}
                </p>
                <p>
                  <strong>Sacred Geometry:</strong> {card.sacredGeometry}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Symbols</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {card.symbols.map((symbol, index) => (
                <div key={index} className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                  <strong>{symbol.key}:</strong> {symbol.value}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Key Meanings</h3>
            <div className="space-y-3">
              {card.keyMeanings.map((meaning, i) => (
                <div key={i} className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <p className="text-sm">{meaning}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Symbolism Breakdown</h3>
            <Accordion type="single" collapsible>
              {card.symbolismBreakdown.map((breakdown, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{breakdown.split(":")[0]}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {breakdown.split(":").slice(1).join(":").trim()}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg text-muted-foreground">Loading card directory...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-center text-red-500">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary-foreground mb-4">NUMO Oracle Card Directory</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore the full collection of NUMO Oracle cards and their profound meanings.
        </p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search cards by title or meaning..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Select value={selectedSuit} onValueChange={(value) => setSelectedSuit(value as CardSuit | "all")}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by Suit" />
            </SelectTrigger>
            <SelectContent>
              {suits.map((suit) => (
                <SelectItem key={suit} value={suit}>
                  {suit === "all" ? "All Suits" : suit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedElement} onValueChange={(value) => setSelectedElement(value as CardElement | "all")}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by Element" />
            </SelectTrigger>
            <SelectContent>
              {elements.map((element) => (
                <SelectItem key={element} value={element}>
                  {element === "all" ? "All Elements" : element}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator className="my-8" />

      <ScrollArea className="h-[70vh] rounded-md border p-4">
        {filteredCards.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Filter className="h-12 w-12 mx-auto mb-4" />
            <p className="text-lg">No cards match your filters.</p>
            <p className="text-sm">Try adjusting your search term or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredCards.map((card) => (
              <Card key={card.id} className="flex flex-col items-center text-center p-3">
                <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden border shadow-sm mb-2">
                  <Image
                    src={getCardImagePath(card, "first") || "/placeholder.svg"}
                    alt={card.fullTitle}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=200&width=130"
                    }}
                  />
                </div>
                <CardTitle className="text-sm font-semibold line-clamp-2 h-10">{card.fullTitle}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  {card.suit} • {card.baseElement}
                </CardDescription>
                <CardDetailModal card={card} />
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
