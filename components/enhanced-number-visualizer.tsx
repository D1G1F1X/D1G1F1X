"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Flame, Droplets, Wind, Mountain, Sparkles } from "lucide-react"

type NumberData = {
  number: number
  title: string
  description: string
  element: {
    name: string
    color: string
    icon: React.ReactNode
  }
  pairedWith: number
  pairName: string
  pairDescription: string
  visualForm: string
  visualRelationship: string
}

const numberData: NumberData[] = [
  {
    number: 0,
    title: "The Void",
    description: "The circle of infinite potential, representing the void from which all creation emerges.",
    element: {
      name: "Spirit",
      color: "purple",
      icon: <Sparkles className="h-5 w-5 text-purple-400" />,
    },
    pairedWith: 1,
    pairName: "The Cauldron",
    pairDescription:
      "Together, 0 and 1 form the Cauldron, a powerful symbol of the dynamic process of creation, where infinite potential (0) transforms into manifestation (1).",
    visualForm:
      "A perfect circle, representing the void or emptiness from which all creation emerges. Its circular shape symbolizes infinity, wholeness, and the cosmic void that contains all possibilities.",
    visualRelationship:
      "The 0 is a perfect circle representing void and infinite potential, while 1 is a straight line representing the first manifestation. Together, they symbolize the container (0) and the content (1).",
  },
  {
    number: 1,
    title: "First Manifestation",
    description: "The first act of creation, the initial spark that brings things into form.",
    element: {
      name: "Fire",
      color: "red",
      icon: <Flame className="h-5 w-5 text-red-400" />,
    },
    pairedWith: 0,
    pairName: "The Cauldron",
    pairDescription:
      "Together, 0 and 1 form the Cauldron, a powerful symbol of the dynamic process of creation, where infinite potential (0) transforms into manifestation (1).",
    visualForm:
      "A straight vertical line, representing the first step into existence. Its upright form symbolizes the initial spark of creation, the beginning of all things, and the first manifestation from the void.",
    visualRelationship:
      "The 0 is a perfect circle representing void and infinite potential, while 1 is a straight line representing the first manifestation. Together, they symbolize the container (0) and the content (1).",
  },
  {
    number: 2,
    title: "Balance and Duality",
    description: "The energy of balance, harmony, and partnership between opposing forces.",
    element: {
      name: "Air",
      color: "lightblue",
      icon: <Wind className="h-5 w-5 text-sky-400" />,
    },
    pairedWith: 5,
    pairName: "The Sword",
    pairDescription:
      "Together, 2 and 5 form the Sword, symbolizing the balance between stability and transformation, duality and change.",
    visualForm:
      "A curve that gracefully bends, representing balance and partnership. Its form suggests flexibility, harmony, and the dance between two forces or energies.",
    visualRelationship:
      "The 2 forms a curve that bends, while 5 is a reflection of 2 flipped along the x-axis. When placed together, they form the shape of a sword - the curve of 2 forming the handle and the shape of 5 creating the blade.",
  },
  {
    number: 3,
    title: "Creativity and Expression",
    description: "The energy of creativity, self-expression, and joyful expansion.",
    element: {
      name: "Fire",
      color: "orange",
      icon: <Flame className="h-5 w-5 text-orange-400" />,
    },
    pairedWith: 8,
    pairName: "The Cord",
    pairDescription:
      "Together, 3 and 8 form the Cord, representing the connection between creativity and infinity, time and destiny.",
    visualForm:
      "Formed by two open curves stacked together, resembling a broken infinity symbol. Its open form suggests expansion, creativity, and the outward flow of ideas and energy.",
    visualRelationship:
      "The 3 looks like a broken infinity symbol (∞), while 8 is a complete infinity symbol. The 3 represents finite creation, while 8 represents infinite cycles and completion.",
  },
  {
    number: 4,
    title: "Structure and Foundation",
    description: "The energy of stability, order, and building solid foundations.",
    element: {
      name: "Earth",
      color: "green",
      icon: <Mountain className="h-5 w-5 text-green-400" />,
    },
    pairedWith: 7,
    pairName: "The Spear",
    pairDescription:
      "Together, 4 and 7 form the Spear, symbolizing the balance between material stability and spiritual ascension.",
    visualForm:
      "Composed of straight lines and right angles, reflecting stability and order. Its square-like shape symbolizes a solid foundation, structure, and the four corners of material existence.",
    visualRelationship:
      "The 4 is composed of straight lines and right angles, forming a stable foundation. The 7 has a sharp diagonal line that points upward like a spear. Together, they represent the shaft (4) and point (7) of a spear.",
  },
  {
    number: 5,
    title: "Freedom and Change",
    description: "The energy of movement, change, and freedom from limitations.",
    element: {
      name: "Fire",
      color: "red",
      icon: <Flame className="h-5 w-5 text-red-400" />,
    },
    pairedWith: 2,
    pairName: "The Sword",
    pairDescription:
      "Together, 2 and 5 form the Sword, symbolizing the balance between stability and transformation, duality and change.",
    visualForm:
      "A reflection of 2 flipped along the x-axis. Its upper curve mirrors 2's, while the lower part straightens into a line, symbolizing freedom, movement, and change.",
    visualRelationship:
      "The 2 forms a curve that bends, while 5 is a reflection of 2 flipped along the x-axis. When placed together, they form the shape of a sword - the curve of 2 forming the handle and the shape of 5 creating the blade.",
  },
  {
    number: 6,
    title: "Nurturing and Responsibility",
    description: "The energy of care, love, and responsibility toward others.",
    element: {
      name: "Earth",
      color: "green",
      icon: <Mountain className="h-5 w-5 text-green-400" />,
    },
    pairedWith: 9,
    pairName: "The Stone",
    pairDescription:
      "Together, 6 and 9 form the Stone, symbolizing the natural cycle of nurturing, growth, and fulfillment.",
    visualForm:
      "Forms a nurturing, protective spiral, symbolizing care and responsibility. Its form suggests a cradle or womb, offering support and nurturing energy for growth.",
    visualRelationship:
      "The 6 forms a nurturing, protective spiral, while 9 mirrors 6 but curves upward. The 6 represents nurturing and responsibility, while 9 represents fulfillment and completion. Together they form a cycle of growth.",
  },
  {
    number: 7,
    title: "Spiritual Insight and Growth",
    description: "The energy of seeking truth, inner growth, and exploring the mysteries of the universe.",
    element: {
      name: "Water",
      color: "blue",
      icon: <Droplets className="h-5 w-5 text-blue-400" />,
    },
    pairedWith: 4,
    pairName: "The Spear",
    pairDescription:
      "Together, 4 and 7 form the Spear, symbolizing the balance between material stability and spiritual ascension.",
    visualForm:
      "Has a sharp diagonal line that points upward, symbolizing spiritual insight and exploration. Its form mirrors the upward thrust of a spear, representing the pursuit of higher knowledge.",
    visualRelationship:
      "The 4 is composed of straight lines and right angles, forming a stable foundation. The 7 has a sharp diagonal line that points upward like a spear. Together, they represent the shaft (4) and point (7) of a spear.",
  },
  {
    number: 8,
    title: "Power and Infinity",
    description: "The energy of power, balance, and the infinite cycle of life.",
    element: {
      name: "Earth",
      color: "green",
      icon: <Mountain className="h-5 w-5 text-green-400" />,
    },
    pairedWith: 3,
    pairName: "The Cord",
    pairDescription:
      "Together, 3 and 8 form the Cord, representing the connection between creativity and infinity, time and destiny.",
    visualForm:
      "A closed, symmetrical figure, representing infinity and the eternal cycle. Where 3 is open and expansive, 8 is complete and continuous, symbolizing the infinite flow of energy.",
    visualRelationship:
      "The 3 looks like a broken infinity symbol (∞), while 8 is a complete infinity symbol. The 3 represents finite creation, while 8 represents infinite cycles and completion.",
  },
  {
    number: 9,
    title: "Fulfillment and Completion",
    description: "The energy of fulfillment, wisdom, and the completion of cycles.",
    element: {
      name: "Fire",
      color: "red",
      icon: <Flame className="h-5 w-5 text-red-400" />,
    },
    pairedWith: 6,
    pairName: "The Stone",
    pairDescription:
      "Together, 6 and 9 form the Stone, symbolizing the natural cycle of nurturing, growth, and fulfillment.",
    visualForm:
      "Mirrors 6 but curves upward, representing completion and fulfillment. Its upward spiral symbolizes the culmination of what was nurtured in 6, forming the shape of an eye when paired.",
    visualRelationship:
      "The 6 forms a nurturing, protective spiral, while 9 mirrors 6 but curves upward. The 6 represents nurturing and responsibility, while 9 represents fulfillment and completion. Together they form a cycle of growth.",
  },
]

export default function EnhancedNumberVisualizer() {
  const [selectedNumber, setSelectedNumber] = useState<number>(0)
  const [showPair, setShowPair] = useState(false)
  const [showCombined, setShowCombined] = useState(false)
  const [activeTab, setActiveTab] = useState("visual")
  const [isClient, setIsClient] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (showCombined && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const currentNumber = numberData.find((n) => n.number === selectedNumber)
      if (!currentNumber) return

      const pairNumber = numberData.find((n) => n.number === currentNumber.pairedWith)
      if (!pairNumber) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw the combined shape based on the pair
      if (currentNumber.pairName === "The Cauldron") {
        // Draw Cauldron (0-1)
        ctx.strokeStyle = "rgba(168, 85, 247, 0.8)"
        ctx.lineWidth = 4

        // Draw circle (0)
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, 80, 0, Math.PI * 2)
        ctx.stroke()

        // Draw line (1)
        ctx.beginPath()
        ctx.moveTo(canvas.width / 2, canvas.height / 2 - 70)
        ctx.lineTo(canvas.width / 2, canvas.height / 2 + 70)
        ctx.stroke()
      } else if (currentNumber.pairName === "The Sword") {
        // Draw Sword (2-5)
        ctx.strokeStyle = "rgba(59, 130, 246, 0.8)"
        ctx.lineWidth = 4

        // Draw handle (2)
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2 + 50, 30, Math.PI * 1.5, Math.PI * 0.5, true)
        ctx.stroke()

        // Draw blade (5)
        ctx.beginPath()
        ctx.moveTo(canvas.width / 2 + 30, canvas.height / 2 + 50)
        ctx.lineTo(canvas.width / 2 + 100, canvas.height / 2 + 50)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(canvas.width / 2 + 100, canvas.height / 2 + 50)
        ctx.lineTo(canvas.width / 2 + 120, canvas.height / 2 + 20)
        ctx.stroke()
      } else if (currentNumber.pairName === "The Cord") {
        // Draw Cord (3-8)
        ctx.strokeStyle = "rgba(16, 185, 129, 0.8)"
        ctx.lineWidth = 4

        // Draw infinity symbol (8)
        ctx.beginPath()
        ctx.moveTo(canvas.width / 2 - 60, canvas.height / 2)
        ctx.bezierCurveTo(
          canvas.width / 2 - 60,
          canvas.height / 2 - 40,
          canvas.width / 2 - 20,
          canvas.height / 2 - 40,
          canvas.width / 2,
          canvas.height / 2,
        )
        ctx.bezierCurveTo(
          canvas.width / 2 + 20,
          canvas.height / 2 + 40,
          canvas.width / 2 + 60,
          canvas.height / 2 + 40,
          canvas.width / 2 + 60,
          canvas.height / 2,
        )
        ctx.bezierCurveTo(
          canvas.width / 2 + 60,
          canvas.height / 2 - 40,
          canvas.width / 2 + 20,
          canvas.height / 2 - 40,
          canvas.width / 2,
          canvas.height / 2,
        )
        ctx.bezierCurveTo(
          canvas.width / 2 - 20,
          canvas.height / 2 + 40,
          canvas.width / 2 - 60,
          canvas.height / 2 + 40,
          canvas.width / 2 - 60,
          canvas.height / 2,
        )
        ctx.stroke()
      } else if (currentNumber.pairName === "The Spear") {
        // Draw Spear (4-7)
        ctx.strokeStyle = "rgba(245, 158, 11, 0.8)"
        ctx.lineWidth = 4

        // Draw shaft (4)
        ctx.beginPath()
        ctx.moveTo(canvas.width / 2, canvas.height / 2 - 80)
        ctx.lineTo(canvas.width / 2, canvas.height / 2 + 80)
        ctx.stroke()

        // Draw point (7)
        ctx.beginPath()
        ctx.moveTo(canvas.width / 2, canvas.height / 2 - 80)
        ctx.lineTo(canvas.width / 2 - 30, canvas.height / 2 - 120)
        ctx.lineTo(canvas.width / 2 + 30, canvas.height / 2 - 120)
        ctx.closePath()
        ctx.stroke()
      } else if (currentNumber.pairName === "The Stone") {
        // Draw Stone (6-9)
        ctx.strokeStyle = "rgba(244, 63, 94, 0.8)"
        ctx.lineWidth = 4

        // Draw outer circle
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, 80, 0, Math.PI * 2)
        ctx.stroke()

        // Draw inner circle (eye)
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, 30, 0, Math.PI * 2)
        ctx.stroke()

        // Draw spiral elements
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, 55, Math.PI * 0.2, Math.PI * 1.8, false)
        ctx.stroke()
      }
    }
  }, [showCombined, selectedNumber])

  const currentNumber = numberData.find((n) => n.number === selectedNumber) || numberData[0]
  const pairNumber = numberData.find((n) => n.number === currentNumber.pairedWith)

  const handleShowPair = () => {
    setShowPair(true)
    setTimeout(() => {
      setShowCombined(true)
    }, 1000)
  }

  const handleReset = () => {
    setShowCombined(false)
    setShowPair(false)
  }

  if (!isClient) {
    return <div className="h-96 flex items-center justify-center">Loading number visualizer...</div>
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 mb-4">
          The Sacred Geometry of Numbers
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Explore the visual forms and relationships of numbers in the NUMO Oracle system. Each number has a unique
          shape that reveals its energetic properties and symbolic meaning.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {numberData.map((data) => (
            <button
              key={data.number}
              onClick={() => {
                setSelectedNumber(data.number)
                handleReset()
              }}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 ${
                selectedNumber === data.number
                  ? "bg-purple-600 text-white scale-110 shadow-lg shadow-purple-500/30"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
              }`}
            >
              {data.number}
            </button>
          ))}
        </div>
      </div>

      <Card className="bg-black/40 border-purple-900/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 rounded-full bg-purple-900/50 flex items-center justify-center text-3xl font-bold text-white">
                  {currentNumber.number}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{currentNumber.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {currentNumber.element.icon}
                    <span className="text-sm">{currentNumber.element.name} Element</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-6">{currentNumber.description}</p>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="visual">Visual Form</TabsTrigger>
                  <TabsTrigger value="pairing">Number Pairing</TabsTrigger>
                </TabsList>

                <TabsContent value="visual" className="space-y-4">
                  <div className="bg-black/30 rounded-lg p-4 border border-gray-800">
                    <h4 className="font-medium text-lg mb-2 text-purple-300">Sacred Geometry</h4>
                    <p className="text-gray-300">{currentNumber.visualForm}</p>
                  </div>

                  <div className="flex justify-center py-6">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-[180px] leading-none font-bold text-purple-500/80"
                    >
                      {currentNumber.number}
                    </motion.div>
                  </div>
                </TabsContent>

                <TabsContent value="pairing" className="space-y-4">
                  <div className="bg-black/30 rounded-lg p-4 border border-gray-800">
                    <h4 className="font-medium text-lg mb-2 text-purple-300">
                      Paired with Number {currentNumber.pairedWith}
                    </h4>
                    <p className="text-gray-300">{currentNumber.visualRelationship}</p>
                  </div>

                  <div className="flex justify-center py-4">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center gap-8 mb-4">
                        <motion.div
                          className="text-8xl font-bold"
                          animate={
                            showPair
                              ? { x: -40, y: showCombined ? -20 : 0, opacity: showCombined ? 0.3 : 1 }
                              : { x: 0, y: 0, opacity: 1 }
                          }
                          transition={{ duration: 0.5 }}
                          style={{ color: `rgba(168, 85, 247, 0.8)` }}
                        >
                          {currentNumber.number}
                        </motion.div>

                        {(showPair || showCombined) && (
                          <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: showCombined ? 0.3 : 1, x: showCombined ? 40 : 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-8xl font-bold"
                            style={{ color: `rgba(139, 92, 246, 0.8)` }}
                          >
                            {currentNumber.pairedWith}
                          </motion.div>
                        )}
                      </div>

                      {showCombined && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                          className="mt-4"
                        >
                          <canvas ref={canvasRef} width={300} height={200} className="mx-auto" />
                          <p className="text-center mt-2 text-white font-medium">{currentNumber.pairName}</p>
                        </motion.div>
                      )}

                      <div className="mt-6">
                        {!showPair ? (
                          <Button onClick={handleShowPair} className="bg-purple-600 hover:bg-purple-700">
                            Show Pairing
                          </Button>
                        ) : (
                          <Button onClick={handleReset} variant="outline" className="border-purple-500 text-purple-300">
                            Reset
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex flex-col">
              <div className="bg-black/30 rounded-lg p-4 border border-gray-800 mb-6 h-full">
                <h4 className="font-medium text-lg mb-4 text-purple-300">{currentNumber.pairName}</h4>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center text-xl font-bold text-white">
                    {currentNumber.number}
                  </div>
                  <div className="w-6 text-center">+</div>
                  <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center text-xl font-bold text-white">
                    {currentNumber.pairedWith}
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{currentNumber.pairDescription}</p>

                <div className="mt-6 p-4 bg-black/40 rounded-lg">
                  <h5 className="font-medium text-purple-300 mb-2">Symbolic Meaning</h5>
                  {currentNumber.pairName === "The Cauldron" && (
                    <p className="text-gray-300">
                      The Cauldron symbolizes creation, abundance, and the power to manifest. It represents both
                      emptiness and fullness, the void and the first spark of creation. The Cauldron reminds us that we
                      have the power to create something from nothing.
                    </p>
                  )}
                  {currentNumber.pairName === "The Sword" && (
                    <p className="text-gray-300">
                      The Sword symbolizes decisiveness, clarity, and the power to cut through illusion. It represents
                      the balance between stability and change, encouraging us to make clear choices and take action
                      with confidence and conviction.
                    </p>
                  )}
                  {currentNumber.pairName === "The Cord" && (
                    <p className="text-gray-300">
                      The Cord symbolizes connection, creativity, and infinity. It represents the power of time and
                      urgency, as well as the interconnectedness of all things. The Cord reminds us to build strong
                      relationships and to trust in the flow of the universe.
                    </p>
                  )}
                  {currentNumber.pairName === "The Spear" && (
                    <p className="text-gray-300">
                      The Spear symbolizes focus, protection, and the power of stable planning. It represents the
                      balance between material stability and spiritual growth, encouraging us to tap into our inner
                      wisdom and pursue our goals with determination.
                    </p>
                  )}
                  {currentNumber.pairName === "The Stone" && (
                    <p className="text-gray-300">
                      The Stone symbolizes love, service, and sovereignty. It represents the natural cycle of nurturing,
                      growth, and fulfillment. The Stone reminds us to connect with divine love within ourselves and to
                      serve the world around us.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-auto">
                <Button
                  onClick={() => {
                    setSelectedNumber(currentNumber.pairedWith)
                    handleReset()
                  }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:opacity-90"
                >
                  Explore Number {currentNumber.pairedWith}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
