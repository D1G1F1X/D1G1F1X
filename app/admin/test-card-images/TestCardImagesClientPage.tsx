"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { EnhancedCardImage } from "@/components/enhanced-card-image-handler"
import type { OracleCard } from "@/types/cards"

interface TestCardImagesClientPageProps {
  initialCards: OracleCard[]
}

export default function TestCardImagesClientPage({ initialCards }: TestCardImagesClientPageProps) {
  // Changed to default export
  const [cardId, setCardId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCardIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardId(event.target.value)
  }

  const displayCard = initialCards.find((card) => card.id === cardId)

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Test Card Images</h1>
      <p className="text-muted-foreground mb-8">
        This page allows you to test the loading and display of individual card images.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Test Card Image Loading</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 items-center">
            <div>
              <Label htmlFor="card-id">Enter Card ID</Label>
              <Input id="card-id" placeholder="e.g., 0-cauldron" value={cardId || ""} onChange={handleCardIdChange} />
            </div>
            <div className="flex justify-center items-center min-h-[200px] border rounded-md">
              {loading ? (
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              ) : displayCard ? (
                <EnhancedCardImage
                  cardId={displayCard.id}
                  cardTitle={displayCard.fullTitle}
                  baseElement={displayCard.baseElement}
                  synergisticElement={displayCard.synergisticElement}
                  className="max-w-[150px] h-auto"
                  showStatus={true}
                />
              ) : (
                <span className="text-muted-foreground">Enter a card ID to preview its image.</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
