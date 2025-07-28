"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { getCardData, getCardById, getAllElements, getAllSuits, getCardImagePath } from "@/lib/card-data-access"
import type { OracleCard } from "@/types/cards"
import Image from "next/image"
import { getElementColor, getElementSymbol } from "@/lib/card-image-utils"
import { Plus, Save, Trash2, Search, ImageIcon } from "lucide-react"

export function OracleCardManager() {
  const { toast } = useToast()
  const [cards, setCards] = useState<OracleCard[]>([])
  const [selectedCard, setSelectedCard] = useState<OracleCard | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isNewCard, setIsNewCard] = useState(false)
  const [elements, setElements] = useState<string[]>([])
  const [suits, setSuits] = useState<string[]>([])
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  useEffect(() => {
    loadCards()
    setElements(getAllElements())
    setSuits(getAllSuits())
  }, [])

  const loadCards = () => {
    try {
      const allCards = getCardData()
      setCards(allCards)
      if (allCards.length > 0 && !selectedCard) {
        setSelectedCard(allCards[0])
      }
    } catch (error) {
      console.error("Error loading cards:", error)
      toast({
        title: "Error",
        description: "Failed to load card data.",
        variant: "destructive",
      })
    }
  }

  const handleSelectCard = (id: string) => {
    const card = getCardById(id)
    if (card) {
      setSelectedCard({ ...card }) // Create a mutable copy
      setIsNewCard(false)
      setImageErrors({}) // Reset image errors for new card selection
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (selectedCard) {
      setSelectedCard({ ...selectedCard, [name]: value })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    if (selectedCard) {
      setSelectedCard({ ...selectedCard, [name]: value })
    }
  }

  const handleArrayChange = (name: keyof OracleCard, value: string) => {
    if (selectedCard) {
      setSelectedCard({
        ...selectedCard,
        [name]: value.split(";").map((item) => item.trim()),
      })
    }
  }

  const handleSymbolsChange = (index: number, key: string, value: string) => {
    if (selectedCard) {
      const updatedSymbols = [...(selectedCard.symbols || [])]
      updatedSymbols[index] = { ...updatedSymbols[index], [key]: value }
      setSelectedCard({ ...selectedCard, symbols: updatedSymbols })
    }
  }

  const addSymbol = () => {
    if (selectedCard) {
      setSelectedCard({
        ...selectedCard,
        symbols: [...(selectedCard.symbols || []), { key: "", value: "" }],
      })
    }
  }

  const removeSymbol = (index: number) => {
    if (selectedCard) {
      const updatedSymbols = [...(selectedCard.symbols || [])]
      updatedSymbols.splice(index, 1)
      setSelectedCard({ ...selectedCard, symbols: updatedSymbols })
    }
  }

  const handleSaveCard = async () => {
    if (!selectedCard) return

    try {
      // In a real application, you would send this data to your API
      // For now, we'll just log it and update the local state
      console.log("Saving card:", selectedCard)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setCards((prevCards) => {
        if (isNewCard) {
          return [...prevCards, selectedCard]
        } else {
          return prevCards.map((card) => (card.id === selectedCard.id ? selectedCard : card))
        }
      })
      toast({
        title: "Success",
        description: `Card "${selectedCard.fullTitle}" saved successfully.`,
      })
      setIsNewCard(false)
    } catch (error) {
      console.error("Error saving card:", error)
      toast({
        title: "Error",
        description: "Failed to save card data.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteCard = async () => {
    if (!selectedCard || isNewCard) return

    if (!window.confirm(`Are you sure you want to delete "${selectedCard.fullTitle}"?`)) {
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setCards((prevCards) => prevCards.filter((card) => card.id !== selectedCard.id))
      setSelectedCard(null)
      toast({
        title: "Success",
        description: `Card "${selectedCard.fullTitle}" deleted successfully.`,
      })
    } catch (error) {
      console.error("Error deleting card:", error)
      toast({
        title: "Error",
        description: "Failed to delete card.",
        variant: "destructive",
      })
    }
  }

  const handleNewCard = () => {
    setSelectedCard({
      id: `new-card-${Date.now()}`,
      number: "",
      suit: "",
      fullTitle: "New Card",
      name: "New Card",
      pair: "",
      description: "",
      numberMeaning: "",
      sacredGeometryName: "",
      sacredGeometryMeaning: "",
      centerIconName: "",
      centerIconMeaning: "",
      planetName: "",
      planetMeaning: "",
      astroSignName: "",
      astroSignMeaning: "",
      elements: {},
      keyMeanings: [],
      symbolismBreakdown: [],
      symbols: [],
      baseElement: "",
      synergisticElement: "",
      iconSymbol: "",
      orientation: "",
      sacredGeometry: "",
      planetInternalInfluence: "",
      astrologyExternalDomain: "",
    })
    setIsNewCard(true)
    setImageErrors({})
  }

  const filteredCards = cards.filter(
    (card) =>
      card.fullTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.suit?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.number?.toString().includes(searchTerm.toLowerCase()),
  )

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, card: OracleCard, endUp: "first" | "second") => {
    const target = e.target as HTMLImageElement
    if (!target.src.includes("placeholder")) {
      const numberStr = card.number?.toString().padStart(2, "0") || "00"
      const suitStr = card.suit?.toLowerCase() || "unknown"
      const elementStr =
        endUp === "first"
          ? card.baseElement?.toLowerCase() || "spirit"
          : card.synergisticElement?.toLowerCase() || "spirit"
      const altPath = `/cards/${numberStr}-${suitStr}-${elementStr}.jpg`

      if (target.src !== altPath) {
        target.src = altPath
        return
      }
      target.src = `/placeholder.svg?height=280&width=180&query=${card.fullTitle || "mystical card"}`
    }
    setImageErrors((prev) => ({ ...prev, [`${card.id}-${endUp}`]: true }))
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-gray-900 text-white p-6 md:p-10 relative overflow-hidden">
      <Card className="bg-gray-900/50 border-purple-500/20 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl text-purple-300">Oracle Card Manager</CardTitle>
          <p className="text-gray-400">Manage and edit the details of your NUMO Oracle cards.</p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar: Card List */}
          <div className="lg:col-span-1 flex flex-col space-y-4">
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
            <Button onClick={handleNewCard} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              <Plus className="mr-2 h-4 w-4" /> Add New Card
            </Button>
            <div className="flex-1 overflow-y-auto pr-2 -mr-2 custom-scrollbar max-h-[600px]">
              {filteredCards.length > 0 ? (
                filteredCards.map((card) => (
                  <div
                    key={card.id}
                    className={`flex items-center gap-3 p-3 mb-2 rounded-lg cursor-pointer transition-colors ${
                      selectedCard?.id === card.id
                        ? "bg-purple-700/40 border border-purple-500/50"
                        : "hover:bg-gray-800/50"
                    }`}
                    onClick={() => handleSelectCard(card.id)}
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
                <div className="text-center p-4 text-gray-400">No cards found.</div>
              )}
            </div>
          </div>

          {/* Right Section: Card Editor */}
          <div className="lg:col-span-2 bg-gray-800/50 border border-gray-700 rounded-lg p-6 space-y-6">
            {selectedCard ? (
              <>
                <h2 className="text-xl font-bold text-purple-300">
                  {isNewCard ? "Add New Card" : `Edit Card: ${selectedCard.fullTitle}`}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullTitle" className="text-gray-300">
                      Full Title
                    </Label>
                    <Input
                      id="fullTitle"
                      name="fullTitle"
                      value={selectedCard.fullTitle || ""}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="name" className="text-gray-300">
                      Short Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={selectedCard.name || ""}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="number" className="text-gray-300">
                      Number
                    </Label>
                    <Input
                      id="number"
                      name="number"
                      value={selectedCard.number || ""}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="suit" className="text-gray-300">
                      Suit
                    </Label>
                    <Select
                      value={selectedCard.suit || ""}
                      onValueChange={(value) => handleSelectChange("suit", value)}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select Suit" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        {suits.map((suit) => (
                          <SelectItem key={suit} value={suit}>
                            {suit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="baseElement" className="text-gray-300">
                      Base Element
                    </Label>
                    <Select
                      value={selectedCard.baseElement || ""}
                      onValueChange={(value) => handleSelectChange("baseElement", value)}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select Base Element" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        {elements.map((element) => (
                          <SelectItem key={element} value={element}>
                            {element}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="synergisticElement" className="text-gray-300">
                      Synergistic Element
                    </Label>
                    <Select
                      value={selectedCard.synergisticElement || ""}
                      onValueChange={(value) => handleSelectChange("synergisticElement", value)}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select Synergistic Element" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        {elements.map((element) => (
                          <SelectItem key={element} value={element}>
                            {element}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-gray-300">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={selectedCard.description || ""}
                    onChange={handleInputChange}
                    className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
                  />
                </div>

                <div>
                  <Label htmlFor="keyMeanings" className="text-gray-300">
                    Key Meanings (semicolon separated)
                  </Label>
                  <Textarea
                    id="keyMeanings"
                    name="keyMeanings"
                    value={(selectedCard.keyMeanings || []).join("; ")}
                    onChange={(e) => handleArrayChange("keyMeanings", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white min-h-[80px]"
                  />
                </div>

                <div>
                  <Label htmlFor="symbolismBreakdown" className="text-gray-300">
                    Symbolism Breakdown (semicolon separated)
                  </Label>
                  <Textarea
                    id="symbolismBreakdown"
                    name="symbolismBreakdown"
                    value={(selectedCard.symbolismBreakdown || []).join("; ")}
                    onChange={(e) => handleArrayChange("symbolismBreakdown", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white min-h-[80px]"
                  />
                </div>

                {/* Dynamic Symbols Array */}
                <div className="space-y-2">
                  <Label className="text-gray-300">Symbols</Label>
                  {(selectedCard.symbols || []).map((symbol, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Input
                        placeholder="Key"
                        value={symbol.key}
                        onChange={(e) => handleSymbolsChange(index, "key", e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                      <Input
                        placeholder="Value"
                        value={symbol.value}
                        onChange={(e) => handleSymbolsChange(index, "value", e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                      <Button variant="destructive" size="icon" onClick={() => removeSymbol(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={addSymbol}
                    className="w-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Symbol
                  </Button>
                </div>

                {/* Image Preview */}
                <div className="flex flex-col items-center space-y-4">
                  <h3 className="text-lg font-semibold text-purple-300">Card Image Preview</h3>
                  <div className="relative w-48 h-72 border border-gray-700 rounded-md overflow-hidden shadow-xl">
                    {selectedCard.baseElement && selectedCard.suit && selectedCard.number ? (
                      getCardImage(selectedCard, "first")
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400">
                        <ImageIcon className="h-12 w-12" />
                        <span className="sr-only">No image available</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 text-center">
                    This preview uses the Base Element image. Ensure your `card-image-paths.json` is correctly populated
                    for blob images to appear.
                  </p>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  {!isNewCard && (
                    <Button onClick={handleDeleteCard} variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete Card
                    </Button>
                  )}
                  <Button onClick={handleSaveCard} className="bg-green-600 hover:bg-green-700 text-white">
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                <Search className="h-16 w-16 mb-4" />
                <p className="text-lg">Select a card from the left to edit, or add a new one.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
