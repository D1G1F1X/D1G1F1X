"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { BeakerIcon, Sword, Scroll, Shield, Mountain } from "lucide-react"

type Tool = {
  name: string
  numbers: [number, number]
  description: string
  icon: React.ReactNode
  color: string
  symbolism: string
}

const tools: Tool[] = [
  {
    name: "The Cauldron",
    numbers: [0, 1],
    description:
      "The zero and the one embody the Cauldron, as they are seemingly polar opposites but can exist together in harmony to represent the Cauldron in the sense that they are both empty and full, capable of containing anything.",
    icon: <BeakerIcon className="h-6 w-6" />,
    color: "from-purple-500 to-indigo-600",
    symbolism:
      "The Cauldron symbolizes creation, abundance, and the power to manifest. It reminds us that we have the power to create something from nothing and forge the tools we need to nourish our bodies and souls.",
  },
  {
    name: "The Sword",
    numbers: [2, 5],
    description:
      "The two and the five with their masculine and feminine properties of choice and change embody the Sword, they represent decisiveness and challenge.",
    icon: <Sword className="h-6 w-6" />,
    color: "from-blue-500 to-sky-600",
    symbolism:
      "The Sword represents the power of choice and the ability to cut through illusion and confusion. It symbolizes power of change and authority, encouraging us to think critically and clearly.",
  },
  {
    name: "The Cord",
    numbers: [3, 8],
    description:
      "The three and the eight visually symbolized by the finite and infinity symbol embody the Cord and represent creativity and infinity.",
    icon: <Scroll className="h-6 w-6" />,
    color: "from-green-500 to-emerald-600",
    symbolism:
      "The Cord symbolizes the power of time and urgency, as well as the importance of creating and connecting with partners and our ancestors. It also represents destiny and the interconnectedness of all things.",
  },
  {
    name: "The Spear",
    numbers: [4, 7],
    description:
      "The four and the seven embody the Spear as symbols of structure and protection and represents the power of stable and intelligent planning.",
    icon: <Shield className="h-6 w-6" />,
    color: "from-amber-500 to-orange-600",
    symbolism:
      "The Spear symbolizes the ability to heal and protect its bearer from harm. It encourages us to tap into our inner wisdom and listen to the voice of our hearts as we explore our deepest feelings and desires.",
  },
  {
    name: "The Stone",
    numbers: [6, 9],
    description:
      "The six and the nine symbolized by the spiral and the eye embody the Stone, as they represent love and service.",
    icon: <Mountain className="h-6 w-6" />,
    color: "from-rose-500 to-pink-600",
    symbolism:
      "The Stone symbolizes the power of love for others and service, as well as sovereignty and authority. It encourages us to connect with the divine love within ourselves and to serve the world around us.",
  },
]

export default function FiveToolsShowcase() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="h-96 flex items-center justify-center">Loading tools showcase...</div>
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 mb-4">
          The Five Sacred Tools
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          The NUMO Oracle system is built around five sacred tools, each formed by a pair of numbers. These tools
          represent different aspects of life and provide guidance on our spiritual journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {tools.map((tool) => (
          <Card
            key={tool.name}
            className={`bg-black/40 border-transparent hover:border-purple-500/50 backdrop-blur-sm overflow-hidden cursor-pointer transition-all duration-300 ${
              selectedTool?.name === tool.name ? "border-purple-500 ring-1 ring-purple-500/50" : ""
            }`}
            onClick={() => setSelectedTool(tool)}
          >
            <CardContent className="p-4">
              <div
                className={`w-full h-1 mb-4 rounded-full bg-gradient-to-r ${tool.color}`}
                style={{ height: "2px" }}
              ></div>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br ${tool.color}`}
                >
                  {tool.icon}
                </div>
                <h3 className="font-bold text-white">{tool.name}</h3>
              </div>
              <div className="flex items-center gap-1 mb-3">
                <div className="w-6 h-6 rounded-full bg-purple-900/30 flex items-center justify-center text-xs font-bold text-white">
                  {tool.numbers[0]}
                </div>
                <span className="text-xs text-gray-400">+</span>
                <div className="w-6 h-6 rounded-full bg-purple-900/30 flex items-center justify-center text-xs font-bold text-white">
                  {tool.numbers[1]}
                </div>
              </div>
              <p className="text-xs text-gray-400 line-clamp-3">{tool.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedTool && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-black/40 border-purple-900/50 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${selectedTool.color}`}
                    >
                      {selectedTool.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedTool.name}</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-purple-900/30 flex items-center justify-center text-xs font-bold text-white">
                          {selectedTool.numbers[0]}
                        </div>
                        <span className="text-xs text-gray-400">+</span>
                        <div className="w-6 h-6 rounded-full bg-purple-900/30 flex items-center justify-center text-xs font-bold text-white">
                          {selectedTool.numbers[1]}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6">{selectedTool.description}</p>

                  <div className="bg-black/30 rounded-lg p-4 border border-gray-800">
                    <h4 className="font-medium text-lg mb-2 text-purple-300">Symbolic Meaning</h4>
                    <p className="text-gray-300">{selectedTool.symbolism}</p>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    {selectedTool.name === "The Cauldron" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <div className="w-40 h-40 rounded-full border-4 border-purple-500 mx-auto"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-32 w-2 bg-indigo-500 rounded-full"></div>
                        </div>
                      </div>
                    )}

                    {selectedTool.name === "The Sword" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <div className="w-4 h-40 bg-blue-500 mx-auto rounded-t-full"></div>
                          <div className="w-24 h-4 bg-sky-600 mx-auto -mt-4 rounded-r-full"></div>
                        </div>
                      </div>
                    )}

                    {selectedTool.name === "The Cord" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <div className="w-40 h-20 relative mx-auto">
                            <div className="absolute top-0 left-0 w-full h-full border-4 border-green-500 rounded-full transform rotate-45"></div>
                            <div className="absolute top-0 left-0 w-full h-full border-4 border-emerald-600 rounded-full transform -rotate-45"></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedTool.name === "The Spear" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <div className="w-4 h-40 bg-gradient-to-t from-amber-500 to-orange-600 mx-auto"></div>
                          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 transform rotate-45 mx-auto -mt-16"></div>
                        </div>
                      </div>
                    )}

                    {selectedTool.name === "The Stone" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <div className="w-32 h-32 rounded-full border-4 border-rose-500 mx-auto flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full border-4 border-pink-600"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
