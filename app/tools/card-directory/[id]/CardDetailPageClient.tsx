"use client"

import { useEffect, useState } from "react"
import { getCardById } from "@/lib/card-data-access"
import type { OracleCard } from "@/types/cards"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnhancedCardImage } from "@/components/enhanced-card-image-handler" // Import the EnhancedCardImage
import { getSymbolValue } from "@/lib/card-data-access" // Ensure this is imported for symbol values
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeftIcon } from "lucide-react"

interface CardDetailPageClientProps {
  params: {
    id: string
  }
}

export default function CardDetailPageClient({ params }: CardDetailPageClientProps) {
  const [card, setCard] = useState<OracleCard | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCard = async () => {
      setLoading(true)
      setError(null)
      try {
        // Assuming getCardById is a client-side safe function or you'd fetch from an API route
        const fetchedCard = getCardById(params.id)
        if (fetchedCard) {
          setCard(fetchedCard)
        } else {
          setError("Card not found.")
        }
      } catch (err) {
        console.error("Failed to fetch card:", err)
        setError("Failed to load card details.")
      } finally {
        setLoading(false)
      }
    }

    fetchCard()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-4">
        <Skeleton className="w-full max-w-4xl h-[500px] rounded-lg" />
        <Skeleton className="w-48 h-10 mt-4 rounded-md" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-4 text-red-500">
        <p>{error}</p>
        <Button asChild className="mt-4">
          <Link href="/tools/card-directory">Back to Card Directory</Link>
        </Button>
      </div>
    )
  }

  if (!card) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-4 text-gray-400">
        <p>No card data available.</p>
        <Button asChild className="mt-4">
          <Link href="/tools/card-directory">Back to Card Directory</Link>
        </Button>
      </div>
    )
  }

  const cardNumber = card.number || "0"

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/tools/card-directory">
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          Back to Card Directory
        </Link>
      </Button>
      <Card className="overflow-hidden bg-gray-900 border border-purple-500/30 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 flex justify-center items-center">
              {/* Use EnhancedCardImage here */}
              <div className="w-[240px] h-[360px] rounded-lg overflow-hidden shadow-[0_0_20px_rgba(128,0,128,0.3)]">
                <EnhancedCardImage
                  card={card}
                  endUp="first" // Display the base element image as per the screenshot
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h1 className="text-3xl font-bold mb-2">{card.fullTitle}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{card.suit}</Badge>
                <Badge>Number: {cardNumber}</Badge>
                <Badge variant="outline">Synergistic Element: {card.synergisticElement}</Badge>
                <Badge variant="destructive">Base Element: {card.baseElement}</Badge>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="elements">Elements</TabsTrigger>
                  <TabsTrigger value="symbolism">Symbolism</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-purple-300">Key Meanings</h3>
                    <ul className="list-disc pl-5 text-gray-300">
                      {card.keyMeanings.map((meaning, i) => (
                        <li key={i}>{meaning}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-300">Description</h3>
                    <p className="text-gray-300">{(card.symbolismBreakdown || []).join(" ")}</p>
                  </div>
                </TabsContent>
                <TabsContent value="elements" className="mt-4 space-y-4">
                  <div className="border rounded-lg p-3 bg-gray-800/50">
                    <h3 className="text-lg font-semibold text-purple-300 flex items-center gap-2">
                      Base Element: {card.baseElement}
                    </h3>
                    <p className="mt-2 text-gray-300">The primary elemental energy of the card.</p>
                  </div>
                  <div className="border rounded-lg p-3 bg-gray-800/50">
                    <h3 className="text-lg font-semibold text-purple-300 flex items-center gap-2">
                      Synergistic Element: {card.synergisticElement}
                    </h3>
                    <p className="mt-2 text-gray-300">
                      The complementary elemental energy that influences the card's meaning.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-300">Elemental Symbolism</h3>
                    <div className="mt-2 space-y-2 text-gray-300">
                      {card.symbolismBreakdown
                        .filter((s) => s.includes("Element"))
                        .map((line, i) => (
                          <p key={i} className="text-sm">
                            {line}
                          </p>
                        ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="symbolism" className="mt-4 space-y-4">
                  <div className="space-y-2 text-gray-300">
                    <p>
                      <strong>Sacred Geometry:</strong> {getSymbolValue(card, "Sacred Geometry")}
                    </p>
                    <p>
                      <strong>Planet (Internal Influence):</strong>{" "}
                      {getSymbolValue(card, "Planet (Internal Influence)")}
                    </p>
                    <p>
                      <strong>Astrology (External Domain):</strong>{" "}
                      {getSymbolValue(card, "Astrology (External Domain)")}
                    </p>
                    <p>
                      <strong>Icon:</strong> {getSymbolValue(card, "Icon")}
                    </p>
                    <p>
                      <strong>Orientation:</strong> {getSymbolValue(card, "Orientation")}
                    </p>
                    {card.symbolismBreakdown.map((item, i) => (
                      <div key={i}>
                        <p className="text-gray-300">{item.replace(/^Number: \d+ – /, "")}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
