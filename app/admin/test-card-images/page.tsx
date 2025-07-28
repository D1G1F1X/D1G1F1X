"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Loader2, ImageIcon, PlusCircle, RotateCcw, XCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { getCardData, getCardById } from "@/lib/card-data-access"
import { getCardImagePath, getCardFallbackUrl } from "@/lib/card-image-utils"
import Image from "next/image"

interface TestImage {
  id: string
  name: string
  baseElement: string
  synergisticElement: string
  imageUrl: string
  status: "loading" | "loaded" | "error"
  source: "base" | "synergistic" | "fallback"
}

export default function TestCardImagesPage() {
  const [testImages, setTestImages] = useState<TestImage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [cardIdInput, setCardIdInput] = useState("")
  const [elementInput, setElementInput] = useState("")
  const { toast } = useToast()

  const allCards = getCardData()

  const loadTestImages = () => {
    setIsLoading(true)
    setTestImages([])
    const imagesToLoad: TestImage[] = []

    // Load a subset of distinct cards for testing
    const distinctCards = new Map<string, (typeof allCards)[0]>()
    for (const card of allCards) {
      if (!distinctCards.has(card.id)) {
        distinctCards.set(card.id, card)
        if (distinctCards.size >= 10) break // Load up to 10 distinct cards initially
      }
    }

    distinctCards.forEach((card) => {
      // Test with base element
      const baseImagePath = getCardImagePath(card, "first")
      imagesToLoad.push({
        id: card.id,
        name: card.fullTitle,
        baseElement: card.baseElement,
        synergisticElement: card.synergisticElement,
        imageUrl: baseImagePath,
        status: "loading",
        source: "base",
      })

      // Test with synergistic element if different
      if (card.baseElement !== card.synergisticElement) {
        const synergisticImagePath = getCardImagePath(card, "second")
        imagesToLoad.push({
          id: card.id,
          name: card.fullTitle,
          baseElement: card.baseElement,
          synergisticElement: card.synergisticElement,
          imageUrl: synergisticImagePath,
          status: "loading",
          source: "synergistic",
        })
      }
    })

    setTestImages(imagesToLoad)
    setIsLoading(false)
  }

  useEffect(() => {
    loadTestImages()
  }, [])

  const handleImageLoad = (id: string, url: string) => {
    setTestImages((prevImages) => prevImages.map((img) => (img.imageUrl === url ? { ...img, status: "loaded" } : img)))
  }

  const handleImageError = (id: string, url: string, card: TestImage) => {
    setTestImages((prevImages) =>
      prevImages.map((img) =>
        img.imageUrl === url
          ? { ...img, status: "error", imageUrl: getCardFallbackUrl(card) } // Use generic fallback
          : img,
      ),
    )
    toast({
      title: "Image Load Error",
      description: `Failed to load image for ${card.name} (${card.source} element). Displaying fallback.`,
      variant: "destructive",
    })
  }

  const handleAddCustomImage = () => {
    if (!cardIdInput || !elementInput) {
      toast({
        title: "Missing Input",
        description: "Please enter both Card ID and Element.",
        variant: "destructive",
      })
      return
    }

    const card = getCardById(cardIdInput)
    if (!card) {
      toast({
        title: "Card Not Found",
        description: `No card found with ID: ${cardIdInput}.`,
        variant: "destructive",
      })
      return
    }

    const customImagePath = getCardImagePath(card, elementInput === card.baseElement ? "first" : "second")
    const newTestImage: TestImage = {
      id: card.id,
      name: card.fullTitle,
      baseElement: card.baseElement,
      synergisticElement: card.synergisticElement,
      imageUrl: customImagePath,
      status: "loading",
      source: `custom (${elementInput})`,
    }

    setTestImages((prevImages) => [...prevImages, newTestImage])
    setCardIdInput("")
    setElementInput("")
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Test Card Images (Legacy)</h1>
          <p className="text-muted-foreground">Manually test direct image paths and their loading status.</p>
        </div>
        <Button onClick={loadTestImages} disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RotateCcw className="mr-2 h-4 w-4" />}
          {isLoading ? "Loading..." : "Refresh Images"}
        </Button>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Add Custom Image Path to Test</CardTitle>
          <CardDescription>Enter a Card ID and Element to test its specific image path.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="card-id">Card ID</Label>
              <Input
                id="card-id"
                placeholder="e.g., 0-Cauldron"
                value={cardIdInput}
                onChange={(e) => setCardIdInput(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="element">Element</Label>
              <Input
                id="element"
                placeholder="e.g., Spirit, Fire"
                value={elementInput}
                onChange={(e) => setElementInput(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleAddCustomImage}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Image to Test
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" /> All Test Images
          </CardTitle>
          <CardDescription>
            {testImages.length === 0 ? "No images loaded for testing." : "Displaying loaded images and their status."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] w-full rounded-md border p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {testImages.map((image) => (
                <div key={`${image.id}-${image.source}`} className="flex flex-col items-center space-y-2">
                  <div className="relative w-full aspect-[2/3] rounded-md overflow-hidden border">
                    <Image
                      src={image.imageUrl || "/placeholder.svg"}
                      alt={`${image.name} (${image.source})`}
                      fill
                      className="object-cover"
                      onLoad={() => handleImageLoad(image.id, image.imageUrl)}
                      onError={() => handleImageError(image.id, image.imageUrl, image)}
                      priority // Load these images immediately
                    />
                    {image.status === "loading" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    )}
                    {image.status === "error" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-red-900/50">
                        <XCircle className="h-8 w-8 text-red-400" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-medium text-center">{image.name}</p>
                  <p className="text-xs text-muted-foreground text-center">({image.source})</p>
                  <span
                    className={`text-xs ${image.status === "loaded" ? "text-green-500" : image.status === "error" ? "text-red-500" : "text-muted-foreground"}`}
                  >
                    {image.status === "loaded" ? "Loaded" : image.status === "error" ? "Error" : "Loading..."}
                  </span>
                </div>
              ))}
            </div>
            {testImages.length === 0 && !isLoading && (
              <p className="text-center text-muted-foreground">
                No images to display. Click &quot;Refresh Images&quot; or add a custom one.
              </p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
