"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, RefreshCw } from "lucide-react"

export default function TestCardImagesPage() {
  const [cardData, setCardData] = useState({})
  const [imageTests, setImageTests] = useState({})
  const [loading, setLoading] = useState(true)
  const [testing, setTesting] = useState(false)

  // Fetch card data
  useEffect(() => {
    async function fetchCardData() {
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

  // Helper function to get base element
  function getBaseElement(card) {
    if (!card || !card.elements) return "spirit"

    for (const [element, data] of Object.entries(card.elements)) {
      if (data.baseElementNote) {
        return element.toLowerCase()
      }
    }

    return "spirit"
  }

  // Helper function to construct image path with zero-padded numbers
  function getCardImagePath(cardId, element) {
    if (!cardId) return null

    try {
      const match = cardId.match(/^(\d+)(.+)$/)
      if (!match) return null

      const [_, cardNumber, cardSuit] = match
      // Always use zero-padded format: 01-cauldron-fire.jpg
      const formattedNumber = cardNumber.padStart(2, "0")
      return `/cards/${formattedNumber}-${cardSuit.toLowerCase()}-${element.toLowerCase()}.jpg`
    } catch (error) {
      return null
    }
  }

  // Test image loading
  async function testImageExists(url) {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.src = url
    })
  }

  // Run image tests
  async function runImageTests() {
    setTesting(true)
    const results = {}

    for (const [cardId, card] of Object.entries(cardData)) {
      const baseElement = getBaseElement(card)
      const imagePath = getCardImagePath(cardId, baseElement)

      if (imagePath) {
        const exists = await testImageExists(imagePath)
        results[cardId] = {
          path: imagePath,
          exists,
          element: baseElement,
          cardName: card.name,
        }
      }
    }

    setImageTests(results)
    setTesting(false)
  }

  const totalCards = Object.keys(cardData).length
  const testedCards = Object.keys(imageTests).length
  const successfulImages = Object.values(imageTests).filter((test) => test.exists).length
  const failedImages = testedCards - successfulImages

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Card Image Test</h1>
          <p className="text-gray-400">Test if card images are loading correctly after deployment</p>
        </div>

        <Card className="bg-black/30 border-gray-800">
          <CardHeader>
            <CardTitle>Image Loading Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex gap-4 items-center">
                <Button
                  onClick={runImageTests}
                  disabled={testing || totalCards === 0}
                  className="flex items-center gap-2"
                >
                  {testing ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4" />
                      Run Image Tests
                    </>
                  )}
                </Button>

                {testedCards > 0 && (
                  <div className="flex gap-4">
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {successfulImages} Success
                    </Badge>
                    <Badge variant="outline" className="text-red-400 border-red-400">
                      <XCircle className="h-3 w-3 mr-1" />
                      {failedImages} Failed
                    </Badge>
                    <Badge variant="outline">
                      {testedCards} / {totalCards} Tested
                    </Badge>
                  </div>
                )}
              </div>

              {testing && (
                <div className="text-sm text-gray-400">Testing image availability... This may take a moment.</div>
              )}

              {testedCards > 0 && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Test Results:</h3>
                  <div className="max-h-96 overflow-y-auto space-y-1">
                    {Object.entries(imageTests).map(([cardId, test]) => (
                      <div
                        key={cardId}
                        className={`flex items-center justify-between p-2 rounded border ${
                          test.exists ? "bg-green-900/20 border-green-500/30" : "bg-red-900/20 border-red-500/30"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {test.exists ? (
                            <CheckCircle className="h-4 w-4 text-green-400" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-400" />
                          )}
                          <span className="font-medium">{test.cardName}</span>
                          <span className="text-sm text-gray-400">({cardId})</span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-400">{test.path}</div>
                          <Badge variant="outline" className="text-xs">
                            {test.element}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {testedCards > 0 && failedImages > 0 && (
                <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded">
                  <h4 className="font-semibold text-yellow-400 mb-2">Missing Images Detected</h4>
                  <p className="text-sm text-gray-300">
                    {failedImages} card images could not be loaded. This might be due to:
                  </p>
                  <ul className="text-sm text-gray-300 mt-2 ml-4 list-disc">
                    <li>Missing image files in the /public/cards/ directory</li>
                    <li>Incorrect file naming conventions</li>
                    <li>Network issues during testing</li>
                  </ul>
                </div>
              )}

              {testedCards > 0 && failedImages === 0 && (
                <div className="mt-4 p-4 bg-green-900/20 border border-green-500/30 rounded">
                  <h4 className="font-semibold text-green-400 mb-2">All Images Loading Successfully!</h4>
                  <p className="text-sm text-gray-300">All {successfulImages} card images are loading correctly.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-gray-800">
          <CardHeader>
            <CardTitle>Sample Image Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.entries(imageTests)
              .slice(0, 6)
              .map(([cardId, test]) => (
                <div key={cardId} className="flex items-center gap-4 p-2 border-b border-gray-700 last:border-b-0">
                  <div className="w-16 h-24 bg-gray-800 rounded border overflow-hidden">
                    {test.exists ? (
                      <img
                        src={test.path || "/placeholder.svg"}
                        alt={test.cardName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <XCircle className="h-6 w-6 text-red-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{test.cardName}</div>
                    <div className="text-sm text-gray-400">{test.path}</div>
                    <Badge variant="outline" className="text-xs mt-1">
                      {test.element}
                    </Badge>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
