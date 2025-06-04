"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

type NumberShape = {
  number: number
  title: string
  description: string
  visualExplanation: string
  pairsWith: number
  pairName: string
}

const numberShapes: NumberShape[] = [
  {
    number: 0,
    title: "The Void",
    description: "The circle of infinite potential",
    visualExplanation:
      "The 0 is a perfect circle, representing the void or emptiness from which all creation emerges. Its circular shape symbolizes infinity, wholeness, and the cosmic void that contains all possibilities.",
    pairsWith: 1,
    pairName: "The Cauldron",
  },
  {
    number: 1,
    title: "The Pillar",
    description: "The first manifestation",
    visualExplanation:
      "The 1 is a straight vertical line, representing the first step into existence. Its upright form symbolizes the initial spark of creation, the beginning of all things, and the first manifestation from the void.",
    pairsWith: 0,
    pairName: "The Cauldron",
  },
  {
    number: 2,
    title: "The Curve",
    description: "Balance and duality",
    visualExplanation:
      "The 2 forms a curve that gracefully bends, representing balance and partnership. Its form suggests flexibility, harmony, and the dance between two forces or energies.",
    pairsWith: 5,
    pairName: "The Sword",
  },
  {
    number: 3,
    title: "The Open Spiral",
    description: "Creativity and expression",
    visualExplanation:
      "The 3 is formed by two open curves stacked together, resembling a broken infinity symbol. Its open form suggests expansion, creativity, and the outward flow of ideas and energy.",
    pairsWith: 8,
    pairName: "The Cord",
  },
  {
    number: 4,
    title: "The Foundation",
    description: "Structure and stability",
    visualExplanation:
      "The 4 is composed of straight lines and right angles, reflecting stability and order. Its square-like shape symbolizes a solid foundation, structure, and the four corners of material existence.",
    pairsWith: 7,
    pairName: "The Spear",
  },
  {
    number: 5,
    title: "The Hook",
    description: "Freedom and change",
    visualExplanation:
      "The 5 is a reflection of 2 flipped along the x-axis. Its upper curve mirrors 2's, while the lower part straightens into a line, symbolizing freedom, movement, and change.",
    pairsWith: 2,
    pairName: "The Sword",
  },
  {
    number: 6,
    title: "The Spiral",
    description: "Nurturing and responsibility",
    visualExplanation:
      "The 6 forms a nurturing, protective spiral, symbolizing care and responsibility. Its form suggests a cradle or womb, offering support and nurturing energy for growth.",
    pairsWith: 9,
    pairName: "The Stone",
  },
  {
    number: 7,
    title: "The Angle",
    description: "Spiritual insight",
    visualExplanation:
      "The 7 has a sharp diagonal line that points upward, symbolizing spiritual insight and exploration. Its form mirrors the upward thrust of a spear, representing the pursuit of higher knowledge.",
    pairsWith: 4,
    pairName: "The Spear",
  },
  {
    number: 8,
    title: "The Infinity",
    description: "Power and cycles",
    visualExplanation:
      "The 8 is a closed, symmetrical figure, representing infinity and the eternal cycle. Where 3 is open and expansive, 8 is complete and continuous, symbolizing the infinite flow of energy.",
    pairsWith: 3,
    pairName: "The Cord",
  },
  {
    number: 9,
    title: "The Eye",
    description: "Fulfillment and completion",
    visualExplanation:
      "The 9 mirrors 6 but curves upward, representing completion and fulfillment. Its upward spiral symbolizes the culmination of what was nurtured in 6, forming the shape of an eye when paired.",
    pairsWith: 6,
    pairName: "The Stone",
  },
]

export default function NumberShapeExplorer() {
  const [selectedNumber, setSelectedNumber] = useState<number>(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const currentShape = numberShapes.find((shape) => shape.number === selectedNumber) || numberShapes[0]
  const pairShape = numberShapes.find((shape) => shape.number === currentShape.pairsWith)

  if (!isClient) {
    return <div className="h-96 flex items-center justify-center">Loading number shape explorer...</div>
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-purple-300">
        The Sacred Geometry of Numbers
      </h2>
      <p className="text-gray-300 mb-8 text-center max-w-3xl mx-auto">
        Each number in the NUMO Oracle system has a unique visual form that reveals its energetic properties and
        symbolic meaning. Select a number to explore its sacred geometry and visual relationship with its paired number.
      </p>

      <div className="flex justify-center mb-8">
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {numberShapes.map((shape) => (
            <button
              key={shape.number}
              onClick={() => setSelectedNumber(shape.number)}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 ${
                selectedNumber === shape.number
                  ? "bg-purple-600 text-white scale-110 shadow-lg shadow-purple-500/30"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
              }`}
            >
              {shape.number}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedNumber}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-black/40 border-purple-900/50 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 rounded-full bg-purple-900/50 flex items-center justify-center text-3xl font-bold text-white">
                      {currentShape.number}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{currentShape.title}</h3>
                      <p className="text-sm text-gray-300">{currentShape.description}</p>
                    </div>
                  </div>

                  <div className="bg-black/30 rounded-lg p-4 border border-gray-800 mb-6">
                    <h4 className="font-medium text-lg mb-2 text-purple-300">Visual Form</h4>
                    <p className="text-gray-300">{currentShape.visualExplanation}</p>
                  </div>

                  <div className="flex justify-center mb-6">
                    <div className="w-40 h-40 flex items-center justify-center">
                      <div className="text-9xl font-bold text-purple-400">{currentShape.number}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-white">Paired With Number {currentShape.pairsWith}</h3>

                  <div className="bg-black/30 rounded-lg p-4 border border-gray-800 mb-6">
                    <h4 className="font-medium text-lg mb-2 text-purple-300">
                      Together They Form: {currentShape.pairName}
                    </h4>
                    <p className="text-gray-300">
                      When number {currentShape.number} is paired with number {currentShape.pairsWith}, they create{" "}
                      {currentShape.pairName}. This pairing reveals the visual and energetic relationship between these
                      numbers.
                    </p>
                  </div>

                  <div className="flex justify-center mb-6">
                    <div className="relative w-40 h-40">
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-50">
                        <div className="text-9xl font-bold text-purple-400">{currentShape.number}</div>
                      </div>
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-50">
                        <div className="text-9xl font-bold text-indigo-400">{currentShape.pairsWith}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={() => setSelectedNumber(currentShape.pairsWith)}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors duration-300"
                    >
                      Explore Number {currentShape.pairsWith}
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
