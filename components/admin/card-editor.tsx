"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { getCardDataById, getAllSuits, getAllElements } from "@/lib/card-data-access"
import type { OracleCard, CardSuit, CardElement } from "@/types/cards"

interface CardEditorProps {
  cardId?: string // Optional: if provided, edit existing card; otherwise, create new
  onSave?: (card: OracleCard) => void
  onDelete?: (id: string) => void
}

export function CardEditor({ cardId, onSave, onDelete }: CardEditorProps) {
  const [card, setCard] = useState<OracleCard | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const allSuits = getAllSuits()
  const allElements = getAllElements()

  useEffect(() => {
    const loadCard = async () => {
      setIsLoading(true)
      setError(null)
      if (cardId) {
        try {
          const fetchedCard = getCardDataById(cardId)
          if (fetchedCard) {
            setCard(fetchedCard)
          } else {
            setError("Card not found.")
            toast({
              title: "Error",
              description: "Card not found.",
              variant: "destructive",
            })
          }
        } catch (err: any) {
          setError(err.message)
          toast({
            title: "Error Loading Card",
            description: err.message,
            variant: "destructive",
          })
        }
      } else {
        // Initialize for new card
        setCard({
          id: "",
          number: "",
          suit: "Cauldron",
          fullTitle: "",
          symbols: [],
          symbolismBreakdown: [],
          keyMeanings: [],
          baseElement: "Spirit",
          planetInternalInfluence: "",
          astrologyExternalDomain: "",
          iconSymbol: "",
          orientation: "",
          sacredGeometry: "",
          synergisticElement: "Spirit",
          imagePath: "", // Default for new card
        })
      }
      setIsLoading(false)
    }
    loadCard()
  }, [cardId, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCard((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const handleSelectChange = (name: keyof OracleCard, value: string) => {
    setCard((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const handleArrayChange = (name: keyof OracleCard, index: number, value: string) => {
    setCard((prev) => {
      if (!prev) return null
      const newArray = [...(prev[name] as string[])]
      newArray[index] = value
      return { ...prev, [name]: newArray }
    })
  }

  const handleAddArrayItem = (name: keyof OracleCard) => {
    setCard((prev) => {
      if (!prev) return null
      const newArray = [...(prev[name] as string[]), ""]
      return { ...prev, [name]: newArray }
    })
  }

  const handleRemoveArrayItem = (name: keyof OracleCard, index: number) => {
    setCard((prev) => {
      if (!prev) return null
      const newArray = (prev[name] as string[]).filter((_, i) => i !== index)
      return { ...prev, [name]: newArray }
    })
  }

  const handleSymbolChange = (index: number, key: string, value: string) => {
    setCard((prev) => {
      if (!prev) return null
      const newSymbols = [...prev.symbols]
      newSymbols[index] = { ...newSymbols[index], [key]: value }
      return { ...prev, symbols: newSymbols }
    })
  }

  const handleAddSymbol = () => {
    setCard((prev) => {
      if (!prev) return null
      return { ...prev, symbols: [...prev.symbols, { key: "", value: "" }] }
    })
  }

  const handleRemoveSymbol = (index: number) => {
    setCard((prev) => {
      if (!prev) return null
      const newSymbols = prev.symbols.filter((_, i) => i !== index)
      return { ...prev, symbols: newSymbols }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!card) return

    setIsSaving(true)
    setError(null)

    try {
      // Basic validation
      if (!card.id || !card.number || !card.suit || !card.fullTitle || !card.baseElement || !card.synergisticElement) {
        throw new Error("Please fill in all required fields (ID, Number, Suit, Full Title, Base Element, Synergistic Element).")
      }

      // Simulate API call for saving
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you'd send `card` to your API
      console.log("Saving card:", card)

      toast({
        title: "Card Saved",
        description: `Card "${card.fullTitle}" has been saved successfully.`,
        variant: "default",
      })
      onSave?.(card)
    } catch (err: any) {
      setError(err.message)
      toast({
        title: "Error Saving Card",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!card || !card.id) return
    if (!window.confirm(`Are you sure you want to delete card "${card.fullTitle}"? This action cannot be undone.`)) {
      return
    }

    setIsDeleting(true)
    setError(null)

    try {
      // Simulate API call for deletion
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Deleting card:", card.id)

      toast({
        title: "Card Deleted",
        description: `Card "${card.fullTitle}" has been deleted.`,
        variant: "default",
      })
      onDelete?.(card.id)
      setCard(null) // Clear form after deletion
    } catch (err: any) {
      setError(err.message)
      toast({
        title: "Error Deleting Card",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center h-96">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-lg text-muted-foreground">Loading card data...</p>
        </CardContent>
      </Card>
    )
  }

  if (!card) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center h-96">
          <p className="text-lg text-muted-foreground">Card not found or deleted.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{cardId ? `Edit Card: ${card.fullTitle}` : "Create New Card"}</CardTitle>
          <CardDescription>
            {cardId ? "Modify the details of this Oracle Card." : "Define a new Oracle Card."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 text-red-500">
              <XCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id">Card ID (e.g., 0-Cauldron)</Label>
              <Input id="id" name="id" value={card.id} onChange={handleChange} required disabled={!!cardId} />
              {cardId && <p className="text-xs text-muted-foreground">Card ID cannot be changed.</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="number">Number</Label>
              <Input id="number" name="number" value={card.number} onChange={handleChange} required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="suit">Suit</Label>
              <Select value={card.suit} onValueChange={(value) => handleSelectChange("suit", value as CardSuit)}>
                <SelectTrigger id="suit">
                  <SelectValue placeholder="Select a suit" />
                </SelectTrigger>
                <SelectContent>
                  {allSuits.map((suit) => (
                    <SelectItem key={suit} value={suit}>
                      {suit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullTitle">Full Title</Label>
              <Input id="fullTitle" name="fullTitle" value={card.fullTitle} onChange={handleChange} required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="baseElement">Base Element</Label>
              <Select value={card.baseElement} onValueChange={(value) => handleSelectChange("baseElement", value as CardElement)}>
                <SelectTrigger id="baseElement">
                  <SelectValue placeholder="Select base element" />
                </SelectTrigger>
                <SelectContent>
                  {allElements.map((element) => (
                    <SelectItem key={element} value={element}>
                      {element}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="synergisticElement">Synergistic Element</Label>
              <Select value={card.synergisticElement} onValueChange={(value) => handleSelectChange("synergisticElement", value as CardElement)}>
                <SelectTrigger id="synergisticElement">
                  <SelectValue placeholder="Select synergistic element" />
                </SelectTrigger>
                <SelectContent>
                  {allElements.map((element) => (
                    <SelectItem key={element} value={element}>
                      {element}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="planetInternalInfluence">Planet Internal Influence</Label>
            <Input id="planetInternalInfluence" name="planetInternalInfluence" value={card.planetInternalInfluence} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="astrologyExternalDomain">Astrology External Domain</Label>
            <Input id="astrologyExternalDomain" name="astrologyExternalDomain" value={card.astrologyExternalDomain} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="iconSymbol">Icon Symbol</Label>
            <Input id="iconSymbol" name="iconSymbol" value={card.iconSymbol} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="orientation">Orientation</Label>
            <Input id="orientation" name="orientation" value={card.orientation} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sacredGeometry">Sacred Geometry</Label>
            <Input id="sacredGeometry" name="sacredGeometry" value={card.sacredGeometry} onChange={handleChange} />
          </div>

          {/* Key Meanings */}
          <div className="space-y-2">
            <Label>Key Meanings</Label>
            {card.keyMeanings.map((meaning, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Textarea
                  value={meaning}
                  onChange={(e) => handleArrayChange("keyMeanings", index, e.target.value)}
                  rows={2}
                  className="flex-grow"
                />
                <Button type="button" variant="destructive" size="sm" onClick={() => handleRemoveArrayItem("keyMeanings", index)}>
                  <\
