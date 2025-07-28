"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Image from "next/image"
import { getCardImagePathWithElement } from "@/lib/card-image-utils" // Assuming this utility exists

export default function TestCardImagesPage() {
  const [cardId, setCardId] = useState("01-Cauldron")
  const [element, setElement] = useState("fire")
  const [imageUrl, setImageUrl] = useState("")
  const [imageError, setImageError] = useState(false)

  const handleGenerateImage = () => {
    const path = getCardImagePathWithElement(cardId, element)
    setImageUrl(path)
    setImageError(false) // Reset error state
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Test Card Images</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Generate & Test Card Image</CardTitle>
          <CardDescription>
            Enter a Card ID and Element to generate and display the corresponding card image.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="cardId">Card ID (e.g., 01-Cauldron)</Label>
              <Input
                id="cardId"
                value={cardId}
                onChange={(e) => setCardId(e.target.value)}
                placeholder="e.g., 01-Cauldron"
              />
            </div>
            <div>
              <Label htmlFor="element">Element (e.g., fire, water, spirit)</Label>
              <Input
                id="element"
                value={element}
                onChange={(e) => setElement(e.target.value)}
                placeholder="e.g., fire"
              />
            </div>
            <div className="md:col-span-2">
              <Button onClick={handleGenerateImage}>Generate Image</Button>
            </div>
          </div>

          {imageUrl && (
            <div className="mt-6">
              <h3 className="mb-2 text-lg font-semibold">Generated Image:</h3>
              <div className="relative h-64 w-40 overflow-hidden rounded-lg border border-gray-700 bg-gray-800">
                {imageError ? (
                  <div className="flex h-full w-full items-center justify-center text-center text-sm text-red-400">
                    Image failed to load. Check path or file existence.
                  </div>
                ) : (
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={`${cardId} - ${element}`}
                    fill
                    className="object-cover"
                    onError={handleImageError}
                    priority
                  />
                )}
              </div>
              <p className="mt-2 text-sm text-gray-400">Path: {imageUrl}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
