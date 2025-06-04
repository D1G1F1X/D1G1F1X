"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { getCardImagePath } from "@/lib/card-image-handler"
import Image from "next/image"

interface CardImageStatus {
  id: string
  element: string
  endUp: "first" | "second"
  status: "loading" | "success" | "error"
  path: string
}

// Named export
export function CardImageVerifier() {
  const [cardStatuses, setCardStatuses] = useState<CardImageStatus[]>([])
  const [isVerifying, setIsVerifying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showSuccessful, setShowSuccessful] = useState(true)

  const elements = ["fire", "water", "air", "earth", "spirit"]
  const cardTypes = ["cauldron", "sword", "spear", "stone", "cord"]
  const cardNumbers = ["01", "10", "25", "38", "47", "52", "69", "74", "83", "96"]

  const verifyImages = async () => {
    setIsVerifying(true)
    setCardStatuses([])
    setProgress(0)

    const allCards: CardImageStatus[] = []

    // Generate all possible card combinations
    for (const type of cardTypes) {
      for (const element of elements) {
        for (const number of cardNumbers) {
          // First end
          const firstEndId = `${number}${type}-${element}`
          allCards.push({
            id: firstEndId,
            element,
            endUp: "first",
            status: "loading",
            path: getCardImagePath(firstEndId, element, "first"),
          })

          // Second end (reverse the number)
          const secondEndNumber = number.split("").reverse().join("")
          const secondEndId = `${secondEndNumber}${type}-${element}`
          allCards.push({
            id: secondEndId,
            element,
            endUp: "second",
            status: "loading",
            path: getCardImagePath(secondEndId, element, "second"),
          })
        }
      }
    }

    setCardStatuses(allCards)

    // Check each image
    let completed = 0
    for (let i = 0; i < allCards.length; i++) {
      const card = allCards[i]
      try {
        const response = await fetch(card.path, { method: "HEAD" })
        allCards[i].status = response.ok ? "success" : "error"
      } catch (error) {
        allCards[i].status = "error"
      }

      completed++
      setProgress(Math.floor((completed / allCards.length) * 100))
      setCardStatuses([...allCards])

      // Small delay to prevent browser from freezing
      if (i % 10 === 0) {
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    }

    setIsVerifying(false)
  }

  const successCount = cardStatuses.filter((card) => card.status === "success").length
  const errorCount = cardStatuses.filter((card) => card.status === "error").length

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Card Image Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <Button onClick={verifyImages} disabled={isVerifying}>
                {isVerifying ? "Verifying..." : "Verify Card Images"}
              </Button>

              <div className="flex items-center gap-4">
                <Badge variant="outline" className="bg-green-500/20">
                  Success: {successCount}
                </Badge>
                <Badge variant="outline" className="bg-red-500/20">
                  Error: {errorCount}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSuccessful(!showSuccessful)}
                  disabled={isVerifying}
                >
                  {showSuccessful ? "Hide Successful" : "Show All"}
                </Button>
              </div>
            </div>

            {isVerifying && (
              <div className="space-y-2">
                <Progress value={progress} />
                <p className="text-sm text-center">{progress}% complete</p>
              </div>
            )}

            {cardStatuses.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                {cardStatuses
                  .filter((card) => showSuccessful || card.status === "error")
                  .map((card, index) => (
                    <div
                      key={`${card.id}-${index}`}
                      className={`border rounded-md overflow-hidden ${
                        card.status === "success"
                          ? "border-green-500/30"
                          : card.status === "error"
                            ? "border-red-500/30"
                            : "border-gray-500/30"
                      }`}
                    >
                      <div className="relative h-40 bg-black/20">
                        {card.status === "success" && (
                          <Image src={card.path || "/placeholder.svg"} alt={card.id} fill className="object-contain" />
                        )}
                        {card.status === "error" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-red-900/20">
                            <span className="text-xs text-red-400">Image Missing</span>
                          </div>
                        )}
                      </div>
                      <div className="p-2 text-xs">
                        <p className="font-medium truncate">{card.id}</p>
                        <div className="flex justify-between items-center mt-1">
                          <Badge variant="outline" className="text-xs">
                            {card.element}
                          </Badge>
                          <Badge variant={card.status === "success" ? "success" : "destructive"} className="text-xs">
                            {card.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Default export that points to the named export
export default CardImageVerifier
