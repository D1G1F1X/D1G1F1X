"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { InfoIcon, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"
import { createDescriptivePlaceholder } from "@/lib/image-utils"
import { CardHeader, CardTitle } from "@/components/ui/card"

interface CardOverviewProps {
  cardNumber: number
  title: string
  subtitle?: string
  description?: string
  suit: string
  dominantElement: string
  numberMeaning?: string
  baseElement: string
  symbolism?: string[]
  elements?: {
    name: string
    description: string
  }[]
  imagePath?: string // New prop for card image
  card: {
    fullTitle: string
    suit: string
    number: number
  }
}

export function CardOverview({
  cardNumber,
  title,
  subtitle,
  description,
  suit,
  dominantElement,
  numberMeaning,
  baseElement,
  symbolism = [],
  elements = [],
  imagePath,
  card,
}: CardOverviewProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <Card className="bg-purple-950 text-white border-purple-800 shadow-lg overflow-hidden">
      <CardHeader className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-t-lg">
        <CardTitle className="text-3xl font-extrabold text-purple-900 dark:text-purple-200">{card.fullTitle}</CardTitle>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
          {card.suit} - Number {card.number}
        </p>
      </CardHeader>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-3 bg-purple-900 rounded-none border-b border-purple-800">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-purple-950 data-[state=active]:text-white text-purple-200"
          >
            <InfoIcon className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="elements"
            className="data-[state=active]:bg-purple-950 data-[state=active]:text-white text-purple-200"
          >
            Elements
          </TabsTrigger>
          <TabsTrigger
            value="symbolism"
            className="data-[state=active]:bg-purple-950 data-[state=active]:text-white text-purple-200"
          >
            Symbolism
          </TabsTrigger>
        </TabsList>

        {imagePath && (
          <div className="p-4 border-b border-purple-800 flex justify-center">
            <div className="relative w-40 h-60 rounded-md overflow-hidden">
              {imageError ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-purple-900/50 p-2">
                  <AlertTriangle className="h-6 w-6 text-yellow-500 mb-2" />
                  <p className="text-xs text-center text-purple-200">Image unavailable</p>
                </div>
              ) : (
                <Image
                  src={imagePath || "/placeholder.svg"}
                  alt={`${title} card`}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    setImageError(true)
                    e.currentTarget.src = createDescriptivePlaceholder(
                      `${title} - ${suit} of ${dominantElement}`,
                      160,
                      240,
                    )
                  }}
                />
              )}
            </div>
          </div>
        )}

        <TabsContent value="overview" className="m-0">
          <CardContent className="p-0">
            <div className="p-4 border-b border-purple-800 space-y-1">
              <h2 className="text-2xl font-bold tracking-tight">
                {cardNumber} – {title}
              </h2>
              {subtitle && <p className="text-sm text-purple-200">{subtitle}</p>}
            </div>

            {description && (
              <div className="p-4 border-b border-purple-800">
                <h3 className="text-sm font-medium text-purple-300 mb-2">Description</h3>
                <p className="text-white">{description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 p-4">
              <div>
                <h3 className="text-sm font-medium text-purple-300 mb-2">Suit</h3>
                <p className="font-semibold">{suit}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-purple-300 mb-2">Number</h3>
                <p className="font-semibold">{cardNumber}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-purple-300 mb-2">Dominant Element</h3>
                <div className="flex items-center">
                  <ElementBadge element={dominantElement} />
                  <span className="ml-2 font-semibold">{dominantElement}</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-purple-300 mb-2">Card End Base Element</h3>
                <div className="flex items-center">
                  <ElementBadge element={baseElement} />
                  <span className="ml-2 font-semibold">{baseElement}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </TabsContent>

        <TabsContent value="elements" className="m-0">
          <CardContent className="p-4 space-y-4">
            {elements.length > 0 ? (
              elements.map((element, index) => (
                <div key={index} className="border-b border-purple-800 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center mb-2">
                    <ElementBadge element={element.name} />
                    <h3 className="ml-2 font-semibold">{element.name}</h3>
                  </div>
                  <p className="text-purple-200">{element.description}</p>
                </div>
              ))
            ) : (
              <p className="text-purple-300">No element details available.</p>
            )}
          </CardContent>
        </TabsContent>

        <TabsContent value="symbolism" className="m-0">
          <CardContent className="p-4">
            {symbolism.length > 0 ? (
              <ul className="space-y-2">
                {symbolism.map((symbol, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>{symbol}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-purple-300">No symbolism details available.</p>
            )}
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  )
}

function ElementBadge({ element }: { element: string }) {
  const getElementColor = (element: string) => {
    const elementMap: Record<string, string> = {
      Fire: "bg-red-500",
      Water: "bg-blue-500",
      Air: "bg-sky-300",
      Earth: "bg-amber-700",
      Spirit: "bg-purple-400",
    }

    return elementMap[element] || "bg-gray-500"
  }

  return <span className={cn("inline-block w-3 h-3 rounded-full", getElementColor(element))} />
}
