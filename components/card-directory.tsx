"use client"

import { useState, useEffect } from "react"
import { getAllCards, getCardById } from "@/lib/card-data-access"
import { EnhancedCardImage } from "@/components/enhanced-card-image-handler"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, ExternalLink, Printer } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function CardDirectory() {
  const allCards = getAllCards()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedElement, setSelectedElement] = useState("All Elements")
  const [selectedSuit, setSelectedSuit] = useState("All Suits")
  const [selectedCardId, setSelectedCardId] = useState<string | null>(allCards.length > 0 ? allCards[0].id : null)

  const filteredCards = allCards.filter((card) => {
    const matchesSearch =
      searchTerm === "" ||
      card.fullTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.keyMeanings.some((meaning) => meaning.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesElement =
      selectedElement === "All Elements" ||
      card.baseElement.toLowerCase() === selectedElement.toLowerCase() ||
      card.synergisticElement.toLowerCase() === selectedElement.toLowerCase()

    const matchesSuit = selectedSuit === "All Suits" || card.suit.toLowerCase() === selectedSuit.toLowerCase()

    return matchesSearch && matchesElement && matchesSuit
  })

  useEffect(() => {
    if (filteredCards.length > 0 && !filteredCards.some((card) => card.id === selectedCardId)) {
      setSelectedCardId(filteredCards[0].id)
    } else if (filteredCards.length === 0) {
      setSelectedCardId(null)
    }
  }, [filteredCards, selectedCardId])

  const selectedCard = selectedCardId ? getCardById(selectedCardId) : null

  const handlePrevCard = () => {
    if (!selectedCard) return
    const currentIndex = filteredCards.findIndex((card) => card.id === selectedCard.id)
    if (currentIndex > 0) {
      setSelectedCardId(filteredCards[currentIndex - 1].id)
    }
  }

  const handleNextCard = () => {
    if (!selectedCard) return
    const currentIndex = filteredCards.findIndex((card) => card.id === selectedCard.id)
    if (currentIndex < filteredCards.length - 1) {
      setSelectedCardId(filteredCards[currentIndex + 1].id)
    }
  }

  const handlePrintCard = () => {
    if (selectedCard) {
      window.print()
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 min-h-[calc(100vh-64px)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Sidebar: Card List */}
        <Card className="lg:col-span-1 bg-gradient-to-br from-purple-900 to-indigo-900 text-white shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold flex items-center justify-between">
              Cards ({filteredCards.length})
            </CardTitle>
            <Input
              placeholder="Search cards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-4 bg-purple-800 border-purple-700 text-white placeholder:text-purple-300 focus:ring-purple-500 focus:border-purple-500"
            />
            <div className="flex gap-2 mt-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex-1 bg-purple-800 border-purple-700 text-white hover:bg-purple-700"
                  >
                    {selectedElement}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-purple-900 border-purple-700 text-white">
                  <DropdownMenuLabel>Filter by Element</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {getAllCards()
                    .map((card) => card.baseElement)
                    .filter((value, index, self) => self.indexOf(value) === index)
                    .sort()
                    .map((element) => (
                      <DropdownMenuItem
                        key={element}
                        onClick={() => setSelectedElement(element)}
                        className="hover:bg-purple-700"
                      >
                        {element}
                      </DropdownMenuItem>
                    ))}
                  <DropdownMenuItem onClick={() => setSelectedElement("All Elements")} className="hover:bg-purple-700">
                    All Elements
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex-1 bg-purple-800 border-purple-700 text-white hover:bg-purple-700"
                  >
                    {selectedSuit}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-purple-900 border-purple-700 text-white">
                  <DropdownMenuLabel>Filter by Suit</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {getAllCards()
                    .map((card) => card.suit)
                    .filter((value, index, self) => self.indexOf(value) === index)
                    .sort()
                    .map((suit) => (
                      <DropdownMenuItem
                        key={suit}
                        onClick={() => setSelectedSuit(suit)}
                        className="hover:bg-purple-700"
                      >
                        {suit}
                      </DropdownMenuItem>
                    ))}
                  <DropdownMenuItem onClick={() => setSelectedSuit("All Suits")} className="hover:bg-purple-700">
                    All Suits
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-purple-950">
            {filteredCards.length > 0 ? (
              filteredCards.map((card) => (
                <div
                  key={card.id}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedCardId === card.id ? "bg-purple-700" : "hover:bg-purple-800"
                  }`}
                  onClick={() => setSelectedCardId(card.id)}
                >
                  <div className="flex items-center gap-3">
                    {/* Placeholder for icon based on suit */}
                    {card.suit === "Cauldron" && <span className="text-xl">🍲</span>}
                    {card.suit === "Sword" && <span className="text-xl">⚔️</span>}
                    {card.suit === "Cord" && <span className="text-xl">🔗</span>}
                    {card.suit === "Spear" && <span className="text-xl">🔱</span>}
                    {card.suit === "Stone" && <span className="text-xl">🪨</span>}
                    <div>
                      <p className="font-medium">
                        {card.number} {card.suit} - {card.fullTitle}
                      </p>
                      <p className="text-sm text-purple-200">{card.suit}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-purple-600 text-white">
                    {card.baseElement}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-center text-purple-300 py-4">No cards found matching your criteria.</p>
            )}
          </CardContent>
        </Card>

        {/* Right Panel: Card Detail View */}
        <div className="lg:col-span-2">
          {selectedCard ? (
            <Card className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevCard}
                  disabled={filteredCards.findIndex((card) => card.id === selectedCard.id) === 0}
                  className="text-purple-300 hover:text-white"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <CardTitle className="text-3xl font-bold text-center flex-1">
                  {selectedCard.number} {selectedCard.suit} - {selectedCard.fullTitle}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNextCard}
                  disabled={filteredCards.findIndex((card) => card.id === selectedCard.id) === filteredCards.length - 1}
                  className="text-purple-300 hover:text-white"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6 p-6">
                <div className="flex flex-col items-center">
                  <EnhancedCardImage
                    cardId={selectedCard.id} // Use selectedCard.id directly
                    cardTitle={selectedCard.fullTitle}
                    baseElement={selectedCard.baseElement}
                    synergisticElement={selectedCard.synergisticElement}
                    className="w-full max-w-[270px]"
                    showStatus={true}
                  />
                  <Button onClick={handlePrintCard} className="mt-4 bg-purple-700 hover:bg-purple-600 text-white">
                    <Printer className="h-4 w-4 mr-2" />
                    Print Card
                  </Button>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="bg-purple-600 text-white">
                      {selectedCard.suit}
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-600 text-white">
                      {selectedCard.baseElement}
                    </Badge>
                    {selectedCard.synergisticElement &&
                      selectedCard.synergisticElement !== selectedCard.baseElement && (
                        <Badge variant="secondary" className="bg-purple-purple-600 text-white">
                          {selectedCard.synergisticElement}
                        </Badge>
                      )}
                    <Badge variant="secondary" className="bg-purple-600 text-white">
                      Number: {selectedCard.number}
                    </Badge>
                    {selectedCard.sacredGeometry && (
                      <Badge variant="secondary" className="bg-purple-600 text-white">
                        Sacred Geometry: {selectedCard.sacredGeometry}
                      </Badge>
                    )}
                    <a href={`/cards/${selectedCard.id}`} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-purple-800 border-purple-700 text-white hover:bg-purple-700"
                      >
                        View Full Page <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>

                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-purple-800">
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
                    <TabsContent value="overview" className="mt-4 text-purple-100">
                      <h3 className="text-xl font-semibold mb-2">Key Meanings</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedCard.keyMeanings.map((meaning, index) => (
                          <li key={index}>{meaning}</li>
                        ))}
                      </ul>
                      <h3 className="text-xl font-semibold mt-4 mb-2">Number Meaning</h3>
                      <p>{selectedCard.numberMeaning}</p>
                      <h3 className="text-xl font-semibold mt-4 mb-2">Keywords</h3>
                      <p>
                        {selectedCard.keywords && selectedCard.keywords.length > 0
                          ? selectedCard.keywords.join(", ")
                          : "No keywords"}
                      </p>
                    </TabsContent>
                    <TabsContent value="elements" className="mt-4 text-purple-100">
                      <h3 className="text-xl font-semibold mb-2">Elemental Influences</h3>
                      <p>
                        <strong>Base Element:</strong> {selectedCard.baseElement}
                      </p>
                      <p>
                        <strong>Synergistic Element:</strong> {selectedCard.synergisticElement}
                      </p>
                      {selectedCard.planetInternalInfluence && (
                        <p>
                          <strong>Planet/Internal Influence:</strong> {selectedCard.planetInternalInfluence}
                        </p>
                      )}
                      {selectedCard.astrologyExternalDomain && (
                        <p>
                          <strong>Astrology/External Domain:</strong> {selectedCard.astrologyExternalDomain}
                        </p>
                      )}
                    </TabsContent>
                    <TabsContent value="symbolism" className="mt-4 text-purple-100">
                      <h3 className="text-xl font-semibold mb-2">Symbolism Breakdown</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedCard.symbolismBreakdown.map((symbol, index) => (
                          <li key={index}>{symbol}</li>
                        ))}
                      </ul>
                      {selectedCard.symbols && selectedCard.symbols.length > 0 && (
                        <>
                          <h3 className="text-xl font-semibold mt-4 mb-2">Key Symbols</h3>
                          <ul className="list-disc list-inside space-y-1">
                            {selectedCard.symbols.map((symbol, index) => (
                              <li key={index}>
                                <strong>{symbol.key}:</strong> {symbol.value}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="flex items-center justify-center h-full bg-gradient-to-br from-purple-900 to-indigo-900 text-white shadow-lg">
              <CardContent className="text-center p-6">
                <p className="text-xl text-purple-300">Select a card from the left to view its details.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
