"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { Save, RefreshCw, AlertCircle, ImageIcon } from "lucide-react"
import { getCardImagePath } from "@/lib/card-image-utils" // For displaying current image

// Define types based on comprehensive-card-data.json structure (numeric keys)
interface CardElementData {
  influence: string
  guidance: string
  baseElementNote?: boolean
}
interface ComprehensiveCard {
  number: number
  suit: string
  name: string
  pair: string
  description: string
  numberMeaning: string
  sacredGeometryName: string
  sacredGeometryMeaning: string
  centerIconName: string
  centerIconMeaning: string
  planetName: string
  planetMeaning: string
  astroSignName: string
  astroSignMeaning: string
  elements: Record<string, CardElementData>
  keywords?: string[]
  // This 'id' will be the numeric key from the parent object, e.g., "0", "1"
  id: string
}

type ComprehensiveCardData = Record<string, Omit<ComprehensiveCard, "id">> // API returns this
type CardImagePathsData = Record<string, string>

export function OracleCardManager() {
  const [cardDetails, setCardDetails] = useState<ComprehensiveCard[]>([])
  const [imagePaths, setImagePaths] = useState<CardImagePathsData>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSavingCardDetails, setIsSavingCardDetails] = useState(false)
  const [isSavingImagePaths, setIsSavingImagePaths] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [detailsRes, pathsRes] = await Promise.all([
        fetch("/api/admin/comprehensive-card-data"),
        fetch("/api/admin/card-image-paths"),
      ])

      if (!detailsRes.ok) throw new Error(`Failed to load card details: ${detailsRes.statusText}`)
      if (!pathsRes.ok) throw new Error(`Failed to load image paths: ${pathsRes.statusText}`)

      const detailsData: ComprehensiveCardData = await detailsRes.json()
      const pathsData: CardImagePathsData = await pathsRes.json()

      // Transform detailsData from Record<string, Omit<ComprehensiveCard, 'id'>> to ComprehensiveCard[]
      const detailsArray: ComprehensiveCard[] = Object.entries(detailsData)
        .map(([key, value]) => ({
          id: key, // The numeric key "0", "1", etc.
          ...value,
        }))
        .sort((a, b) => Number.parseInt(a.id) - Number.parseInt(b.id)) // Sort by numeric ID

      setCardDetails(detailsArray)
      setImagePaths(pathsData)
    } catch (err: any) {
      console.error("Error fetching card management data:", err)
      setError(err.message || "Failed to load data.")
      toast({ title: "Error", description: err.message, variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const getBaseElement = (card: ComprehensiveCard): string => {
    if (!card || !card.elements) return "Spirit" // Default or error
    for (const [element, data] of Object.entries(card.elements)) {
      if (data.baseElementNote) {
        return element
      }
    }
    return "Spirit" // Default if no base element note found
  }

  const getDescriptiveImageKey = (card: ComprehensiveCard): string | null => {
    if (!card) return null
    const numberStr = card.number.toString().padStart(2, "0")
    const suitStr = card.suit.toLowerCase()
    const baseElementStr = getBaseElement(card)?.toLowerCase()

    if (!numberStr || !suitStr || !baseElementStr) return null
    return `${numberStr}${suitStr}-${baseElementStr}`
  }

  const handleDetailChange = (
    cardId: string,
    field: keyof Omit<ComprehensiveCard, "id" | "elements" | "keywords">,
    value: string | number,
  ) => {
    setCardDetails((prevDetails) =>
      prevDetails.map((card) => (card.id === cardId ? { ...card, [field]: value } : card)),
    )
  }

  const handleElementDetailChange = (
    cardId: string,
    elementName: string,
    field: keyof CardElementData,
    value: string | boolean,
  ) => {
    setCardDetails((prevDetails) =>
      prevDetails.map((card) => {
        if (card.id === cardId) {
          const updatedElements = {
            ...card.elements,
            [elementName]: {
              ...card.elements[elementName],
              [field]: value,
            },
          }
          return { ...card, elements: updatedElements }
        }
        return card
      }),
    )
  }

  const handleImagePathChange = (descriptiveKey: string, newPath: string) => {
    setImagePaths((prevPaths) => ({
      ...prevPaths,
      [`${descriptiveKey}.jpg`]: newPath, // Manifest keys include .jpg
    }))
  }

  const saveCardDetails = async () => {
    setIsSavingCardDetails(true)
    // Transform cardDetails array back to Record<string, Omit<ComprehensiveCard, 'id'>> for API
    const dataToSave: ComprehensiveCardData = cardDetails.reduce((acc, card) => {
      const { id, ...rest } = card
      acc[id] = rest
      return acc
    }, {} as ComprehensiveCardData)

    try {
      const response = await fetch("/api/admin/comprehensive-card-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: dataToSave }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save card details")
      }
      toast({ title: "Success", description: "Card details saved." })
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" })
    } finally {
      setIsSavingCardDetails(false)
    }
  }

  const saveImagePaths = async () => {
    setIsSavingImagePaths(true)
    try {
      const response = await fetch("/api/admin/card-image-paths", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: imagePaths }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save image paths")
      }
      toast({ title: "Success", description: "Image paths saved." })
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" })
    } finally {
      setIsSavingImagePaths(false)
    }
  }

  if (isLoading)
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />{" "}
        <span className="ml-2">Loading card data...</span>
      </div>
    )
  if (error)
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Button onClick={saveCardDetails} disabled={isSavingCardDetails || isSavingImagePaths}>
          {isSavingCardDetails ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}{" "}
          Save Card Details
        </Button>
        <Button onClick={saveImagePaths} disabled={isSavingCardDetails || isSavingImagePaths}>
          {isSavingImagePaths ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}{" "}
          Save Image Paths
        </Button>
        <Button variant="outline" onClick={fetchData} disabled={isLoading || isSavingCardDetails || isSavingImagePaths}>
          <RefreshCw className="mr-2 h-4 w-4" /> Reload All Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardDetails.map((card) => {
          const descriptiveKey = getDescriptiveImageKey(card)
          const currentImagePathKey = descriptiveKey ? `${descriptiveKey}.jpg` : null
          const currentImagePathValue = currentImagePathKey ? imagePaths[currentImagePathKey] : undefined
          const displayImageUrl = getCardImagePath(descriptiveKey, card.name)

          return (
            <Card key={card.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>
                  {card.name} (ID: {card.id}, Num: {card.number})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow">
                <div className="relative w-full aspect-[270/420] border rounded overflow-hidden bg-slate-800">
                  {displayImageUrl ? (
                    <Image
                      src={displayImageUrl || "/placeholder.svg"}
                      alt={card.name}
                      fill
                      className="object-contain"
                      sizes="300px"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <ImageIcon className="w-12 h-12" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Image Path in Manifest (e.g., public/cards/01cauldron-spirit.jpg)
                  </label>
                  <Input
                    value={currentImagePathValue || ""}
                    onChange={(e) => descriptiveKey && handleImagePathChange(descriptiveKey, e.target.value)}
                    placeholder="public/cards/..."
                    disabled={!descriptiveKey}
                  />
                  {descriptiveKey && !currentImagePathValue && (
                    <p className="text-xs text-amber-500 mt-1">
                      Path not found in manifest for key: {currentImagePathKey}
                    </p>
                  )}
                </div>

                <label className="text-sm font-medium">Name</label>
                <Input value={card.name} onChange={(e) => handleDetailChange(card.id, "name", e.target.value)} />

                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={card.description}
                  onChange={(e) => handleDetailChange(card.id, "description", e.target.value)}
                  rows={3}
                />

                {/* Add more fields as needed: suit, pair, numberMeaning, sacredGeo, etc. */}
                {/* Example for elements (simplified, could be more complex UI) */}
                <details>
                  <summary className="cursor-pointer font-medium">
                    Element Details ({Object.keys(card.elements).length})
                  </summary>
                  <div className="mt-2 space-y-3 p-3 border rounded-md bg-slate-800/50">
                    {Object.entries(card.elements).map(([elName, elData]) => (
                      <div key={elName} className="space-y-1">
                        <p className="font-semibold text-sm">
                          {elName}{" "}
                          {elData.baseElementNote ? (
                            <Badge variant="secondary" size="sm">
                              Base
                            </Badge>
                          ) : (
                            ""
                          )}
                        </p>
                        <Input
                          placeholder="Influence"
                          value={elData.influence}
                          onChange={(e) => handleElementDetailChange(card.id, elName, "influence", e.target.value)}
                        />
                        <Input
                          placeholder="Guidance"
                          value={elData.guidance}
                          onChange={(e) => handleElementDetailChange(card.id, elName, "guidance", e.target.value)}
                        />
                        <label className="flex items-center text-xs">
                          <input
                            type="checkbox"
                            checked={!!elData.baseElementNote}
                            onChange={(e) =>
                              handleElementDetailChange(card.id, elName, "baseElementNote", e.target.checked)
                            }
                            className="mr-1"
                          />
                          Base Element
                        </label>
                      </div>
                    ))}
                  </div>
                </details>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">Descriptive Key: {descriptiveKey || "N/A"}</p>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
