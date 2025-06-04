"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image" // Import Next.js Image component
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Printer, Share2 } from "lucide-react"
import { getCardImagePath } from "@/lib/card-image-utils" // Ensure createCardFallbackUrl is imported if used

export default function CardDetailPage({ params }: { params: { id: string } }) {
  const [card, setCard] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imageError, setImageError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        setLoading(true)
        setError(null)
        setImageError(false)
        const response = await fetch("/api/card-directory")
        if (!response.ok) {
          throw new Error("Failed to fetch card data")
        }
        const data = await response.json()

        const cardId = params.id
        if (data[cardId]) {
          setCard(data[cardId])
        } else {
          setError("Card not found")
        }
      } catch (err) {
        console.error("Error fetching card data:", err)
        setError("Failed to load card data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchCardData()
  }, [params.id])

  const getBaseElement = (cardDetails: any): string => {
    if (!cardDetails || !cardDetails.elements) return "Spirit"
    for (const [element, data] of Object.entries(cardDetails.elements)) {
      if ((data as any).baseElementNote) {
        return element
      }
    }
    return "Spirit"
  }

  const getDescriptiveKeyForPage = (cardDetails: any): string | null => {
    if (!cardDetails || typeof cardDetails.number !== "number" || !cardDetails.suit) {
      return null
    }
    const numberStr = cardDetails.number.toString().padStart(2, "0")
    const suitStr = cardDetails.suit.toLowerCase()
    const baseElementStr = getBaseElement(cardDetails)?.toLowerCase()
    if (!baseElementStr) {
      return null
    }
    return `${numberStr}${suitStr}-${baseElementStr}`
  }

  const getElementColor = (element: string | undefined) => {
    if (!element) return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    switch (element.toLowerCase()) {
      case "fire":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "water":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "air":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" // Changed from sky for consistency
      case "earth":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "spirit":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getSuitIcon = (suit: string) => {
    switch (suit?.toLowerCase()) {
      case "cauldron":
        return "🔮"
      case "sword":
        return "⚔️"
      case "spear":
        return "🔱"
      case "stone":
        return "🪨"
      case "cord":
        return "⚝"
      default:
        return "✧"
    }
  }

  const handlePrintCard = () => {
    if (!card) return
    // Use a more robust printing solution or simplify for direct print
    const descriptiveKey = getDescriptiveKeyForPage(card)
    const imagePath = getCardImagePath(descriptiveKey, card.name)

    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const content = `
      <!DOCTYPE html><html><head><title>${card.name} - NUMO Oracle Card</title>
      <style>
        body { font-family: sans-serif; margin: 20px; color: #333; }
        .container { max-width: 800px; margin: auto; }
        .card-image { max-width: 300px; height: auto; border-radius: 8px; margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto; }
        h1 { text-align: center; color: #5a3a8a; }
        h2 { color: #7c52b3; border-bottom: 1px solid #eee; padding-bottom: 5px; }
        .details p, .details div { margin-bottom: 10px; }
        .badge { display: inline-block; padding: 0.25em 0.6em; font-size: 0.85em; font-weight: 600; line-height: 1; text-align: center; white-space: nowrap; vertical-align: baseline; border-radius: 0.375rem; margin-right: 5px; }
        .element-badge { color: white; } /* Add specific element colors if needed */
        .fire { background-color: #ef4444; } .water { background-color: #3b82f6; } .air { background-color: #eab308; } .earth { background-color: #22c55e; } .spirit { background-color: #8b5cf6; }
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none; }
        }
      </style>
      </head><body><div class="container">
        <h1>${card.name}</h1>
        <img src="${imagePath}" alt="${card.name}" class="card-image" onerror="this.style.display='none'; this.insertAdjacentHTML('afterend', '<p style=\\'text-align:center; color:red;\\'>Image not available for printing.</p>');" />
        <div class="details">
          <p><strong>Number:</strong> ${card.number} | <strong>Suit:</strong> ${card.suit} ${getSuitIcon(card.suit)} | <strong>Pair:</strong> ${card.pair || "N/A"}</p>
          <p><strong>Base Element:</strong> <span class="badge element-badge ${getBaseElement(card)?.toLowerCase()}">${getBaseElement(card)}</span></p>
          <h2>Description</h2><p>${card.description || "No description available."}</p>
          ${card.numberMeaning ? `<h2>Number Meaning</h2><p>${card.numberMeaning}</p>` : ""}
          <h2>Elemental Influences</h2>
          ${
            card.elements && Object.keys(card.elements).length > 0
              ? Object.entries(card.elements)
                  .map(
                    ([el, data]: [string, any]) => `
              <div style="border-left: 4px solid ${getElementColor(el).match(/bg-([a-z]+)-500\/20/)?.[1] || "gray"}; padding-left: 10px; margin-bottom:15px;">
                <h3>${el} ${data.baseElementNote ? "<span style='font-size:0.8em; color:purple;'>(Base)</span>" : ""}</h3>
                <p><strong>Influence:</strong> ${data.influence}</p>
                <p><strong>Guidance:</strong> ${data.guidance}</p>
              </div>`,
                  )
                  .join("")
              : "<p>No elemental influences detailed.</p>"
          }
          <h2>Symbolism</h2>
          ${card.sacredGeometryName ? `<p><strong>Sacred Geometry (${card.sacredGeometryName}):</strong> ${card.sacredGeometryMeaning || ""}</p>` : ""}
          ${card.centerIconName ? `<p><strong>Center Icon (${card.centerIconName}):</strong> ${card.centerIconMeaning || ""}</p>` : ""}
          ${card.planetName ? `<p><strong>Planet (${card.planetName}):</strong> ${card.planetMeaning || ""}</p>` : ""}
          ${card.astroSignName ? `<p><strong>Astrology (${card.astroSignName}):</strong> ${card.astroSignMeaning || ""}</p>` : ""}
        </div>
        <p class="no-print" style="text-align:center; margin-top:20px;"><button onclick="window.print()">Print</button> <button onclick="window.close()">Close</button></p>
      </div></body></html>
    `
    printWindow.document.open()
    printWindow.document.write(content)
    printWindow.document.close()
  }

  const handleShareCard = () => {
    if (!card) return
    if (typeof navigator.share === "function") {
      navigator
        .share({
          title: card.name,
          text: `Check out the ${card.name} card in the NUMO Oracle deck!`,
          url: window.location.href,
        })
        .catch((err) => console.error("Share failed:", err))
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("Link copied to clipboard!"))
        .catch((err) => console.error("Copy failed:", err))
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-4">
          <h3 className="text-xl font-bold mb-2">Error</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <Button onClick={() => router.push("/tools/card-directory")}>Back to Card Directory</Button>
        </div>
      </div>
    )
  }

  if (!card) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-4">
          <h3 className="text-xl font-bold mb-2">Card Not Found</h3>
          <p className="text-gray-400 mb-4">The requested card could not be found.</p>
          <Button onClick={() => router.push("/tools/card-directory")}>Back to Card Directory</Button>
        </div>
      </div>
    )
  }

  const descriptiveKey = getDescriptiveKeyForPage(card)
  const imagePath = getCardImagePath(descriptiveKey, card.name)

  return (
    <div className="container mx-auto px-4 py-8 text-slate-200">
      <div className="mb-6 flex items-center justify-between print:hidden">
        <Button
          variant="outline"
          onClick={() => router.push("/tools/card-directory")}
          className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Directory
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handlePrintCard}
            className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button
            variant="outline"
            onClick={handleShareCard}
            className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <Card className="bg-slate-900/60 border-slate-700/80 shadow-xl print:shadow-none print:border-none print:bg-white print:text-black">
        <CardHeader className="print:pb-2">
          <div className="flex flex-col items-center text-center">
            <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 print:text-black print:bg-none">
              {card.name}
            </CardTitle>
            <CardDescription className="text-lg mt-2 text-slate-400 print:text-gray-700">
              Number: {card.number} • Suit: {card.suit} • Pair: {card.pair || "N/A"}
            </CardDescription>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              <Badge
                variant="outline"
                className="border-slate-600 bg-slate-800 text-slate-300 print:bg-gray-100 print:text-gray-800 print:border-gray-300"
              >
                {getSuitIcon(card.suit)} {card.suit}
              </Badge>
              <Badge className={`${getElementColor(getBaseElement(card))} print:text-white print:bg-opacity-100`}>
                Base Element: {getBaseElement(card)}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-5 print:pt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 flex flex-col items-center">
              <div className="relative w-full max-w-[270px] aspect-[270/420] mb-4 rounded-lg overflow-hidden border-2 border-slate-700 shadow-md print:border-gray-300 print:shadow-none">
                {imageError ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                    Image not available
                  </div>
                ) : (
                  <Image
                    src={imagePath || "/placeholder.svg"}
                    alt={card.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 270px"
                    className="object-cover"
                    priority
                    onError={() => {
                      console.warn(`Image error for ${card.name} on detail page. Path: ${imagePath}`)
                      setImageError(true)
                    }}
                  />
                )}
              </div>
              <div className="space-y-4 print:hidden w-full max-w-[270px]">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-purple-300">Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {card.keywords && Array.isArray(card.keywords) && card.keywords.length > 0 ? (
                      card.keywords.map((keyword: string, index: number) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-slate-700 text-slate-300 hover:bg-slate-600"
                        >
                          {keyword}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-slate-400 italic">No keywords available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <Tabs defaultValue="overview" className="print:hidden">
                <TabsList className="w-full grid grid-cols-3 mb-4 bg-slate-800/70 border-slate-700">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-purple-700/30 data-[state=active]:text-purple-200 text-slate-400"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="elements"
                    className="data-[state=active]:bg-purple-700/30 data-[state=active]:text-purple-200 text-slate-400"
                  >
                    Elements
                  </TabsTrigger>
                  <TabsTrigger
                    value="symbolism"
                    className="data-[state=active]:bg-purple-700/30 data-[state=active]:text-purple-200 text-slate-400"
                  >
                    Symbolism
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 text-slate-300">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-purple-300">Description</h3>
                    <p className="leading-relaxed">{card.description}</p>
                  </div>
                  {card.numberMeaning && (
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-purple-300">Number Meaning</h3>
                      <p className="leading-relaxed">{card.numberMeaning}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="elements" className="space-y-6 text-slate-300">
                  {card.elements && Object.keys(card.elements).length > 0 ? (
                    Object.entries(card.elements).map(([element, data]: [string, any]) => (
                      <div key={element} className={`p-4 rounded-lg border ${getElementColor(element)}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{element}</h3>
                          {data.baseElementNote && (
                            <Badge variant="destructive" className="bg-red-500/80 text-white text-xs">
                              Base Element
                            </Badge>
                          )}
                        </div>
                        <div className="mb-4">
                          <h4 className="font-medium text-slate-200">Influence:</h4>
                          <p className="leading-relaxed">{data.influence}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-200">Guidance:</h4>
                          <p className="leading-relaxed">{data.guidance}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="italic text-slate-400">No elemental details available.</p>
                  )}
                </TabsContent>

                <TabsContent value="symbolism" className="space-y-6 text-slate-300">
                  {card.sacredGeometryName && (
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-purple-300">Sacred Geometry</h3>
                      <p className="font-medium text-slate-200">{card.sacredGeometryName}</p>
                      <p className="leading-relaxed text-sm">{card.sacredGeometryMeaning}</p>
                    </div>
                  )}
                  {card.centerIconName && (
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-purple-300">Center Icon</h3>
                      <p className="font-medium text-slate-200">{card.centerIconName}</p>
                      <p className="leading-relaxed text-sm">{card.centerIconMeaning}</p>
                    </div>
                  )}
                  {card.planetName && (
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-purple-300">Planetary Association</h3>
                      <p className="font-medium text-slate-200">{card.planetName}</p>
                      <p className="leading-relaxed text-sm">{card.planetMeaning}</p>
                    </div>
                  )}
                  {card.astroSignName && (
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-purple-300">Astrological Sign</h3>
                      <p className="font-medium text-slate-200">{card.astroSignName}</p>
                      <p className="leading-relaxed text-sm">{card.astroSignMeaning}</p>
                    </div>
                  )}
                  {!(card.sacredGeometryName || card.centerIconName || card.planetName || card.astroSignName) && (
                    <p className="italic text-slate-400">No symbolism details available.</p>
                  )}
                </TabsContent>
              </Tabs>

              {/* Print-friendly version that shows all content */}
              <div className="hidden print:block space-y-6 text-black">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Description</h3>
                  <p>{card.description}</p>
                </div>
                {card.numberMeaning && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Number Meaning</h3>
                    <p>{card.numberMeaning}</p>
                  </div>
                )}

                <h3 className="text-xl font-semibold mb-2 mt-4">Elemental Influences</h3>
                {card.elements && Object.keys(card.elements).length > 0 ? (
                  Object.entries(card.elements).map(([element, data]: [string, any]) => (
                    <div key={element} className="mb-4 p-4 border rounded-md border-gray-300">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{element}</h3>
                        {data.baseElementNote && (
                          <span className="text-sm font-medium px-2 py-1 bg-gray-200 rounded">Base Element</span>
                        )}
                      </div>
                      <div className="mb-2">
                        <h4 className="font-medium">Influence:</h4>
                        <p>{data.influence}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Guidance:</h4>
                        <p>{data.guidance}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="italic">No elemental influences detailed.</p>
                )}

                <h3 className="text-xl font-semibold mb-2 mt-4">Symbolism</h3>
                {card.sacredGeometryName && (
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold">Sacred Geometry</h4>
                    <p className="font-medium">{card.sacredGeometryName}</p>
                    <p>{card.sacredGeometryMeaning}</p>
                  </div>
                )}
                {card.centerIconName && (
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold">Center Icon</h4>
                    <p className="font-medium">{card.centerIconName}</p>
                    <p>{card.centerIconMeaning}</p>
                  </div>
                )}
                {card.planetName && (
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold">Planetary Association</h4>
                    <p className="font-medium">{card.planetName}</p>
                    <p>{card.planetMeaning}</p>
                  </div>
                )}
                {card.astroSignName && (
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold">Astrological Sign</h4>
                    <p className="font-medium">{card.astroSignName}</p>
                    <p>{card.astroSignMeaning}</p>
                  </div>
                )}
                {!(card.sacredGeometryName || card.centerIconName || card.planetName || card.astroSignName) && (
                  <p className="italic">No symbolism details available.</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
