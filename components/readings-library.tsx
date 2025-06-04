"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock } from "lucide-react"

const readingsData = [
  {
    id: 1,
    name: "Five Card Spread",
    image: "/celestial-weave.png",
    description:
      "A comprehensive reading that reveals insights about your past, present, future, challenges, and potential outcomes. Perfect for deep guidance on complex situations.",
    positions: ["Past", "Recent Past", "Present", "Near Future", "Outcome"],
    available: true,
    featured: true,
    link: "#five-card-spread",
    tabId: "five-card-spread",
  },
  {
    id: 2,
    name: "Three Card Spread",
    image: "/amethyst-veil.png",
    description:
      "A focused reading that illuminates the past, present, and future of a specific situation. Ideal for clarity on a particular question or challenge.",
    positions: ["Past", "Present", "Future"],
    available: true,
    featured: false,
    link: "#card-simulator",
    tabId: "card-simulator",
  },
  {
    id: 3,
    name: "Celtic Cross",
    image: "/glowing-celtic-oracle.png",
    description:
      "An in-depth reading that explores multiple aspects of your situation, including influences, obstacles, hopes, and outcomes. Perfect for comprehensive guidance.",
    positions: [
      "Present",
      "Challenge",
      "Past",
      "Future",
      "Above",
      "Below",
      "Advice",
      "External Influences",
      "Hopes/Fears",
      "Outcome",
    ],
    available: false,
    featured: false,
    link: "",
  },
  {
    id: 4,
    name: "Relationship Spread",
    image: "/connected-hearts.png",
    description:
      "A specialized reading focused on relationships, revealing insights about you, your partner, your connection, challenges, and potential growth.",
    positions: ["You", "Partner", "Connection", "Challenge", "Growth"],
    available: false,
    featured: false,
    link: "",
  },
  {
    id: 5,
    name: "Elemental Spread",
    image: "/elemental-glyphs.png",
    description:
      "A balanced reading that examines how the five elements (Earth, Water, Fire, Air, Spirit) are influencing your life and how to harmonize them.",
    positions: ["Earth", "Water", "Fire", "Air", "Spirit"],
    available: false,
    featured: false,
    link: "",
  },
  {
    id: 6,
    name: "Numerology Spread",
    image: "/numerology-oracle-spread.png",
    description:
      "A unique spread that combines numerology with oracle wisdom, revealing insights based on your Life Path Number and current numerological influences.",
    positions: ["Life Path", "Expression", "Soul Urge", "Challenge", "Personal Year"],
    available: false,
    featured: false,
    link: "",
  },
]

export default function ReadingsLibrary() {
  const featuredReading = readingsData.find((reading) => reading.featured)
  const otherReadings = readingsData.filter((reading) => !reading.featured)

  const handleTabClick = (tabId: string) => {
    if (!tabId) return

    // Find the tab trigger element and click it
    const tabTrigger = document.querySelector(`[data-value="${tabId}"]`) as HTMLElement
    if (tabTrigger) {
      tabTrigger.click()
    }
  }

  return (
    <div>
      {featuredReading && (
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-white">Featured Reading</h2>
          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <Image
                  src={
                    featuredReading.image ||
                    `/placeholder.svg?height=500&width=500&query=${encodeURIComponent(featuredReading.name)}`
                  }
                  alt={featuredReading.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-purple-400">{featuredReading.name}</h3>
                  <Badge className="bg-purple-600">Featured</Badge>
                </div>
                <p className="text-gray-300 mb-6">{featuredReading.description}</p>
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Card Positions:</h4>
                  <div className="flex flex-wrap gap-2">
                    {featuredReading.positions.map((position, idx) => (
                      <span key={idx} className="bg-gray-700 text-purple-300 px-2 py-1 rounded-full text-xs">
                        {position}
                      </span>
                    ))}
                  </div>
                </div>
                {featuredReading.tabId ? (
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 w-full"
                    onClick={() => handleTabClick(featuredReading.tabId)}
                  >
                    Try This Reading
                  </Button>
                ) : (
                  <Button asChild className="bg-purple-600 hover:bg-purple-700 w-full">
                    <Link href={featuredReading.link}>Try This Reading</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-6 text-white">All Readings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherReadings.map((reading) => (
            <Card key={reading.id} className="bg-gray-800 border-gray-700 overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={
                    reading.image || `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(reading.name)}`
                  }
                  alt={reading.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-purple-400">{reading.name}</CardTitle>
                  {reading.available ? (
                    <Badge className="bg-green-600">Available</Badge>
                  ) : (
                    <Badge className="bg-gray-600 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Coming Soon
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-gray-400">{reading.positions.length} Card Spread</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-gray-300">{reading.description}</p>
              </CardContent>
              <CardFooter>
                {reading.available ? (
                  reading.tabId ? (
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      onClick={() => handleTabClick(reading.tabId)}
                    >
                      Try This Reading <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                      <Link href={reading.link}>
                        Try This Reading <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )
                ) : (
                  <Button disabled className="w-full bg-gray-700 cursor-not-allowed">
                    Coming Soon
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-16 bg-gray-800 border border-gray-700 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">How to Get the Most from Your Reading</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-medium text-purple-400 mb-3">Prepare Your Space</h3>
            <p className="text-gray-300 mb-6">
              Create a quiet, peaceful environment free from distractions. Consider lighting a candle or using gentle
              incense to create a sacred atmosphere. Take a few deep breaths to center yourself before beginning.
            </p>

            <h3 className="text-xl font-medium text-purple-400 mb-3">Set Clear Intentions</h3>
            <p className="text-gray-300 mb-6">
              Before drawing cards, take a moment to clarify what guidance you're seeking. Form a clear question or
              focus area in your mind, but remain open to receiving unexpected wisdom.
            </p>

            <h3 className="text-xl font-medium text-purple-400 mb-3">Trust Your Intuition</h3>
            <p className="text-gray-300">
              While card meanings provide valuable insights, your intuitive response to the imagery and symbols is
              equally important. Notice your first impressions and feelings as each card appears.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-medium text-purple-400 mb-3">Consider the Whole Picture</h3>
            <p className="text-gray-300 mb-6">
              Look for patterns, recurring elements, or themes across all cards in your spread. How do the cards relate
              to each other? The relationship between cards often reveals deeper insights.
            </p>

            <h3 className="text-xl font-medium text-purple-400 mb-3">Reflect and Journal</h3>
            <p className="text-gray-300 mb-6">
              Take time to reflect on your reading. Writing about your insights helps integrate the wisdom and may
              reveal additional meanings that weren't immediately apparent.
            </p>

            <h3 className="text-xl font-medium text-purple-400 mb-3">Take Inspired Action</h3>
            <p className="text-gray-300">
              Readings provide guidance, but it's up to you to apply the wisdom. Consider what actions you might take
              based on the insights you've received, even if they're small steps.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
