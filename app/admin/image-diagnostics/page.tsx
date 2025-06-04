"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { getCardImagePath } from "@/lib/card-image-handler"
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react"

export default function ImageDiagnosticsPage() {
  const [cardData, setCardData] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [checking, setChecking] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<Record<string, boolean>>({})
  const [missingCards, setMissingCards] = useState<string[]>([])
  const [loadedCards, setLoadedCards] = useState<string[]>([])

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch("/api/card-directory")
        if (!response.ok) {
          throw new Error("Failed to fetch card data")
        }
        const data = await response.json()
        setCardData(data)
      } catch (err) {
        console.error("Error fetching card data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCardData()
  }, [])

  const checkAllCardImages = async () => {
    setChecking(true)
    setProgress(0)
    setResults({})
    setMissingCards([])
    setLoadedCards([])

    const cardIds = Object.keys(cardData)
    const totalCards = cardIds.length
    let processedCards = 0
    const missingList: string[] = []
    const loadedList: string[] = []
    const resultsMap: Record<string, boolean> = {}

    for (const cardId of cardIds) {
      const card = cardData[cardId]
      const baseElement = getBaseElement(card)
      const imagePath = getCardImagePath(cardId, baseElement)

      try {
        const response = await fetch(imagePath, { method: "HEAD" })
        const exists = response.ok

        resultsMap[cardId] = exists

        if (exists) {
          loadedList.push(cardId)
        } else {
          missingList.push(cardId)
        }
      } catch (error) {
        console.error(`Error checking image for ${cardId}:`, error)
        resultsMap[cardId] = false
        missingList.push(cardId)
      }

      processedCards++
      setProgress(Math.floor((processedCards / totalCards) * 100))
    }

    setResults(resultsMap)
    setMissingCards(missingList)
    setLoadedCards(loadedList)
    setChecking(false)
  }

  const getBaseElement = (card: any): string => {
    if (!card || !card.elements) return "Spirit"

    for (const [element, data] of Object.entries(card.elements)) {
      if (data.baseElementNote) {
        return element
      }
    }

    return "Spirit"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Card Image Diagnostics</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Card Image Verification</h3>
                  <Button onClick={checkAllCardImages} disabled={checking || Object.keys(cardData).length === 0}>
                    {checking ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      "Check All Card Images"
                    )}
                  </Button>
                </div>

                {checking && (
                  <div className="space-y-2">
                    <Progress value={progress} />
                    <p className="text-sm text-gray-400 text-center">{progress}% complete</p>
                  </div>
                )}

                {!checking && Object.keys(results).length > 0 && (
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div>
                        <Badge className="bg-green-500">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {loadedCards.length} Available
                        </Badge>
                      </div>
                      <div>
                        <Badge variant="destructive">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {missingCards.length} Missing
                        </Badge>
                      </div>
                    </div>

                    {missingCards.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Missing Card Images:</h4>
                        <div className="bg-black/20 p-4 rounded-md max-h-60 overflow-y-auto">
                          <ul className="space-y-2">
                            {missingCards.map((cardId) => {
                              const card = cardData[cardId]
                              const baseElement = getBaseElement(card)
                              const imagePath = getCardImagePath(cardId, baseElement)

                              return (
                                <li key={cardId} className="text-sm">
                                  <div className="flex justify-between">
                                    <span>
                                      {card.name} ({cardId})
                                    </span>
                                    <code className="text-xs bg-black/30 px-2 py-1 rounded">{imagePath}</code>
                                  </div>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="font-medium mb-2">Image Path Format:</h4>
                      <p className="text-sm bg-black/20 p-2 rounded">
                        Card images should be stored in the <code>/public/cards/</code> directory with the naming
                        format: <code>[number][suit]-[element].jpg</code>
                      </p>
                      <p className="text-sm mt-2">
                        Example: <code>/cards/01cauldron-fire.jpg</code> for the 1 of Cauldron (Fire)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
