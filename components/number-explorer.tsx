"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { numberData } from "@/data/number-meanings"
import { Flame, Droplets, Wind, Mountain, Sparkles, Sun, Moon, SpaceIcon as Planet, Infinity, Zap } from "lucide-react"

export default function NumberExplorer() {
  const [selectedNumber, setSelectedNumber] = useState(0)
  const [activeTab, setActiveTab] = useState("meaning")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const currentNumber = numberData.find((n) => n.number === selectedNumber) || numberData[0]

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

  const getPlanetIcon = (planet: string) => {
    switch (planet.toLowerCase()) {
      case "the sun":
        return <Sun className="h-5 w-5 text-yellow-400" />
      case "the moon":
        return <Moon className="h-5 w-5 text-blue-300" />
      case "mercury":
      case "venus":
      case "mars":
      case "jupiter":
      case "saturn":
      case "uranus":
      case "neptune":
      case "pluto":
        return <Planet className="h-5 w-5 text-indigo-400" />
      default:
        return <Planet className="h-5 w-5 text-indigo-400" />
    }
  }

  const getElementColor = (element: string) => {
    switch (element.toLowerCase()) {
      case "fire":
        return "bg-red-900/30 border-red-500/30 text-red-300"
      case "water":
        return "bg-blue-900/30 border-blue-500/30 text-blue-300"
      case "air":
        return "bg-sky-900/30 border-sky-500/30 text-sky-300"
      case "earth":
        return "bg-green-900/30 border-green-500/30 text-green-300"
      case "spirit":
        return "bg-purple-900/30 border-purple-500/30 text-purple-300"
      default:
        return "bg-purple-900/30 border-purple-500/30 text-purple-300"
    }
  }

  if (!isClient) {
    return <div className="h-96 flex items-center justify-center">Loading number explorer...</div>
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-purple-300">Explore the Numbers</h2>

      <div className="flex justify-center mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {numberData.map((num) => (
            <button
              key={num.number}
              onClick={() => setSelectedNumber(num.number)}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 ${
                selectedNumber === num.number
                  ? "bg-purple-600 text-white scale-110 shadow-lg shadow-purple-500/30"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
              }`}
            >
              {num.number}
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
          <Card
            className={`border ${getElementColor(currentNumber.elementalPower.name).split(" ")[1]} bg-black/40 backdrop-blur-sm overflow-hidden`}
          >
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-16 h-16 rounded-full ${getElementColor(currentNumber.elementalPower.name).split(" ")[0]} flex items-center justify-center text-3xl font-bold ${getElementColor(currentNumber.elementalPower.name).split(" ")[2]}`}
                    >
                      {currentNumber.number}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{currentNumber.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {getElementIcon(currentNumber.elementalPower.name)}
                        <span className="text-sm">{currentNumber.elementalPower.name} Element</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{currentNumber.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {currentNumber.keywords.map((keyword) => (
                      <Badge key={keyword} variant="outline" className="bg-black/30">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="bg-black/30 rounded-lg p-4 border border-gray-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Infinity className="h-5 w-5 text-purple-400" />
                      <h4 className="font-medium text-purple-300">Paired with Number {currentNumber.pairedWith}</h4>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{currentNumber.pairName}</h3>
                    <p className="text-sm text-gray-300">{currentNumber.pairDescription}</p>
                  </div>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="meaning">Numerology</TabsTrigger>
                  <TabsTrigger value="astrology">Astrology</TabsTrigger>
                  <TabsTrigger value="symbolism">Symbolism</TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TabsContent value="meaning" className="mt-0">
                      <div className="bg-black/20 rounded-lg p-4 border border-gray-800">
                        <h4 className="font-medium text-lg mb-2 text-purple-300">Numerology Meaning</h4>
                        <p className="text-gray-300">{currentNumber.numerologyMeaning}</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="astrology" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black/20 rounded-lg p-4 border border-gray-800">
                          <div className="flex items-center gap-2 mb-2">
                            {getPlanetIcon(currentNumber.planetaryRuler.name)}
                            <h4 className="font-medium text-lg text-purple-300">
                              Planetary Ruler: {currentNumber.planetaryRuler.name}
                            </h4>
                          </div>
                          <p className="text-gray-300">{currentNumber.planetaryRuler.description}</p>
                        </div>

                        <div className="bg-black/20 rounded-lg p-4 border border-gray-800">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="h-5 w-5 text-yellow-400" />
                            <h4 className="font-medium text-lg text-purple-300">
                              Astrological Sign: {currentNumber.astrologicalSign.name}
                            </h4>
                          </div>
                          <p className="text-gray-300">{currentNumber.astrologicalSign.description}</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="symbolism" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black/20 rounded-lg p-4 border border-gray-800">
                          <h4 className="font-medium text-lg mb-2 text-purple-300">Visual Symbolism</h4>
                          <p className="text-gray-300">{currentNumber.visualSymbolism}</p>
                        </div>

                        <div className="bg-black/20 rounded-lg p-4 border border-gray-800">
                          <div className="flex items-center gap-2 mb-2">
                            {getElementIcon(currentNumber.elementalPower.name)}
                            <h4 className="font-medium text-lg text-purple-300">
                              Elemental Power: {currentNumber.elementalPower.name}
                            </h4>
                          </div>
                          <p className="text-gray-300">{currentNumber.elementalPower.description}</p>
                        </div>
                      </div>
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
