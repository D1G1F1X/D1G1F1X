"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Flame, Droplets, Wind, Mountain, Sparkles, Sword, BeakerIcon as Cauldron, Scroll, Shield } from "lucide-react"

type NumberPair = {
  numbers: [number, number]
  name: string
  description: string
  visualRelationship: string
  icon: React.ReactNode
  color: string
}

const numberPairs: NumberPair[] = [
  {
    numbers: [0, 1],
    name: "The Cauldron",
    description:
      "The zero and the one embody the Cauldron, as they are seemingly polar opposites but can exist together in harmony. They represent both emptiness and fullness, capable of containing anything.",
    visualRelationship:
      "The 0 is a perfect circle representing void and infinite potential, while 1 is a straight line representing the first manifestation. Together, they symbolize the container (0) and the content (1).",
    icon: <Cauldron className="h-6 w-6" />,
    color: "from-purple-500 to-indigo-600",
  },
  {
    numbers: [2, 5],
    name: "The Sword",
    description:
      "The two and the five with their masculine and feminine properties of choice and change embody the Sword. They represent decisiveness and challenge.",
    visualRelationship:
      "The 2 forms a curve that bends, while 5 is a reflection of 2 flipped along the x-axis. When placed together, they form the shape of a sword - the curve of 2 forming the handle and the shape of 5 creating the blade.",
    icon: <Sword className="h-6 w-6" />,
    color: "from-blue-500 to-sky-600",
  },
  {
    numbers: [3, 8],
    name: "The Cord",
    description:
      "The three and the eight, visualized by the finite and infinity symbol, embody the Cord. They represent creativity and infinity, symbolizing time, urgency, and interconnectedness.",
    visualRelationship:
      "The 3 looks like a broken infinity symbol (∞), while 8 is a complete infinity symbol. The 3 represents finite creation, while 8 represents infinite cycles and completion.",
    icon: <Scroll className="h-6 w-6" />,
    color: "from-green-500 to-emerald-600",
  },
  {
    numbers: [4, 7],
    name: "The Spear",
    description:
      "The four and the seven embody the Spear as symbols of structure and protection. They represent the power of stable and intelligent planning.",
    visualRelationship:
      "The 4 is composed of straight lines and right angles, forming a stable foundation. The 7 has a sharp diagonal line that points upward like a spear. Together, they represent the shaft (4) and point (7) of a spear.",
    icon: <Shield className="h-6 w-6" />,
    color: "from-amber-500 to-orange-600",
  },
  {
    numbers: [6, 9],
    name: "The Stone",
    description:
      "The six and the nine, symbolized by the spiral and the eye, embody the Stone. They represent love and service, as well as sovereignty and authority.",
    visualRelationship:
      "The 6 forms a nurturing, protective spiral, while 9 mirrors 6 but curves upward. The 6 represents nurturing and responsibility, while 9 represents fulfillment and completion. Together they form a cycle of growth.",
    icon: <Mountain className="h-6 w-6" />,
    color: "from-rose-500 to-pink-600",
  },
]

const getElementIcon = (element: string) => {
  switch (element.toLowerCase()) {
    case "fire":
      return <Flame className="h-5 w-5 text-red-400" />
    case "water":
      return <Droplets className="h-5 w-5 text-blue-400" />
    case "air":
      return <Wind className="h-5 w-5 text-sky-400" />
    case "earth":
      return <Mountain className="h-5 w-5 text-green-400" />
    case "spirit":
      return <Sparkles className="h-5 w-5 text-purple-400" />
    default:
      return <Sparkles className="h-5 w-5 text-purple-400" />
  }
}

export default function NumberPairingVisualizer() {
  const [selectedPair, setSelectedPair] = useState<NumberPair>(numberPairs[0])
  const [isAnimating, setIsAnimating] = useState(false)
  const [showCombined, setShowCombined] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handlePairClick = (pair: NumberPair) => {
    setSelectedPair(pair)
    setShowCombined(false)
  }

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating)
    if (!isAnimating) {
      setTimeout(() => {
        setShowCombined(true)
      }, 1000)
    } else {
      setShowCombined(false)
    }
  }

  if (!isClient) {
    return <div className="h-96 flex items-center justify-center">Loading number pairing visualizer...</div>
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-purple-300">
        The Visual Relationships Between Numbers
      </h2>
      <p className="text-gray-300 mb-8 text-center max-w-3xl mx-auto">
        In the NUMO Oracle system, numbers are paired based on their visual forms, symbolic meanings, and energetic
        properties. Explore how each pair creates a powerful tool when combined.
      </p>

      <div className="flex justify-center mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {numberPairs.map((pair) => (
            <Button
              key={`${pair.numbers[0]}-${pair.numbers[1]}`}
              onClick={() => handlePairClick(pair)}
              variant={selectedPair === pair ? "default" : "outline"}
              className={`px-4 py-2 ${selectedPair === pair ? `bg-gradient-to-r ${pair.color} text-white` : "bg-black/30"}`}
            >
              {pair.icon}
              <span className="ml-2">{pair.name}</span>
            </Button>
          ))}
        </div>
      </div>

      <Card className="bg-black/40 border-purple-900/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h3
                className={`text-2xl font-bold mb-4 bg-gradient-to-r ${selectedPair.color} bg-clip-text text-transparent`}
              >
                {selectedPair.name}
              </h3>
              <p className="text-gray-300 mb-6">{selectedPair.description}</p>

              <div className="bg-black/30 rounded-lg p-4 border border-gray-800 mb-6">
                <h4 className="font-medium text-lg mb-2 text-purple-300">Visual Relationship</h4>
                <p className="text-gray-300">{selectedPair.visualRelationship}</p>
              </div>

              <Button
                onClick={toggleAnimation}
                className={`bg-gradient-to-r ${selectedPair.color} hover:opacity-90 transition-all`}
              >
                {isAnimating ? "Reset Animation" : "Show Transformation"}
              </Button>
            </div>

            <div className="flex-1 flex items-center justify-center min-h-[300px] relative">
              <div className="relative h-64 w-64">
                {showCombined ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center"
                    >
                      {selectedPair.numbers[0] === 0 && selectedPair.numbers[1] === 1 && (
                        <div className="relative">
                          <div className="w-40 h-40 rounded-full border-4 border-purple-500 mx-auto"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-32 w-2 bg-indigo-500 rounded-full"></div>
                          <p className="mt-4 text-white font-medium">The Cauldron</p>
                        </div>
                      )}

                      {selectedPair.numbers[0] === 2 && selectedPair.numbers[1] === 5 && (
                        <div className="relative">
                          <div className="w-4 h-40 bg-blue-500 mx-auto rounded-t-full"></div>
                          <div className="w-24 h-4 bg-sky-600 mx-auto -mt-4 rounded-r-full"></div>
                          <p className="mt-4 text-white font-medium">The Sword</p>
                        </div>
                      )}

                      {selectedPair.numbers[0] === 3 && selectedPair.numbers[1] === 8 && (
                        <div className="relative">
                          <div className="w-40 h-20 relative mx-auto">
                            <div className="absolute top-0 left-0 w-full h-full border-4 border-green-500 rounded-full transform rotate-45"></div>
                            <div className="absolute top-0 left-0 w-full h-full border-4 border-emerald-600 rounded-full transform -rotate-45"></div>
                          </div>
                          <p className="mt-4 text-white font-medium">The Cord</p>
                        </div>
                      )}

                      {selectedPair.numbers[0] === 4 && selectedPair.numbers[1] === 7 && (
                        <div className="relative">
                          <div className="w-4 h-40 bg-gradient-to-t from-amber-500 to-orange-600 mx-auto"></div>
                          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 transform rotate-45 mx-auto -mt-16"></div>
                          <p className="mt-4 text-white font-medium">The Spear</p>
                        </div>
                      )}

                      {selectedPair.numbers[0] === 6 && selectedPair.numbers[1] === 9 && (
                        <div className="relative">
                          <div className="w-32 h-32 rounded-full border-4 border-rose-500 mx-auto flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full border-4 border-pink-600"></div>
                          </div>
                          <p className="mt-4 text-white font-medium">The Stone</p>
                        </div>
                      )}
                    </motion.div>
                  </div>
                ) : (
                  <>
                    <motion.div
                      className="absolute top-0 left-0 w-32 h-32 flex items-center justify-center"
                      animate={isAnimating ? { x: 80, y: 40, scale: 0.8 } : { x: 0, y: 0, scale: 1 }}
                      transition={{ duration: 1 }}
                    >
                      <div
                        className={`text-8xl font-bold bg-gradient-to-br ${selectedPair.color} bg-clip-text text-transparent`}
                      >
                        {selectedPair.numbers[0]}
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute top-0 right-0 w-32 h-32 flex items-center justify-center"
                      animate={isAnimating ? { x: -80, y: 40, scale: 0.8 } : { x: 0, y: 0, scale: 1 }}
                      transition={{ duration: 1 }}
                    >
                      <div
                        className={`text-8xl font-bold bg-gradient-to-br ${selectedPair.color} bg-clip-text text-transparent`}
                      >
                        {selectedPair.numbers[1]}
                      </div>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
