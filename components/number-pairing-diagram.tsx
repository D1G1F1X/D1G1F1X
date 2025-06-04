"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

type NumberPair = {
  numbers: [number, number]
  name: string
  color: string
}

const numberPairs: NumberPair[] = [
  {
    numbers: [0, 1],
    name: "The Cauldron",
    color: "rgba(147, 51, 234, 0.7)", // purple
  },
  {
    numbers: [2, 5],
    name: "The Sword",
    color: "rgba(59, 130, 246, 0.7)", // blue
  },
  {
    numbers: [3, 8],
    name: "The Cord",
    color: "rgba(16, 185, 129, 0.7)", // green
  },
  {
    numbers: [4, 7],
    name: "The Spear",
    color: "rgba(245, 158, 11, 0.7)", // amber
  },
  {
    numbers: [6, 9],
    name: "The Stone",
    color: "rgba(244, 63, 94, 0.7)", // rose
  },
]

export default function NumberPairingDiagram() {
  const [hoveredPair, setHoveredPair] = useState<NumberPair | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="h-96 flex items-center justify-center">Loading number pairing diagram...</div>
  }

  // Calculate positions in a circle
  const radius = 150
  const centerX = 250
  const centerY = 250
  const numberPositions: Record<number, { x: number; y: number }> = {}

  // Position numbers in a circle
  for (let i = 0; i < 10; i++) {
    const angle = i * 36 * (Math.PI / 180) // 36 degrees per number (360 / 10)
    numberPositions[i] = {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="relative w-[500px] h-[500px]">
        <svg width="500" height="500" className="absolute top-0 left-0">
          {/* Draw connection lines between paired numbers */}
          {numberPairs.map((pair, index) => {
            const [num1, num2] = pair.numbers
            const pos1 = numberPositions[num1]
            const pos2 = numberPositions[num2]

            return (
              <motion.line
                key={index}
                x1={pos1.x}
                y1={pos1.y}
                x2={pos2.x}
                y2={pos2.y}
                stroke={hoveredPair === pair ? pair.color : "rgba(255, 255, 255, 0.2)"}
                strokeWidth={hoveredPair === pair ? 4 : 2}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: index * 0.3 }}
              />
            )
          })}

          {/* Draw center circle */}
          <circle cx={centerX} cy={centerY} r="50" fill="rgba(139, 92, 246, 0.1)" stroke="rgba(139, 92, 246, 0.3)" />

          {/* Draw outer circle */}
          <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="rgba(255, 255, 255, 0.1)" />
        </svg>

        {/* Number circles */}
        {Object.entries(numberPositions).map(([number, position]) => {
          const num = Number.parseInt(number)
          // Find which pair this number belongs to
          const pair = numberPairs.find((p) => p.numbers.includes(num)) || null
          const isHovered = hoveredPair === pair

          return (
            <motion.div
              key={number}
              className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold cursor-pointer transition-all duration-300 ${
                isHovered ? "scale-110 shadow-lg" : "hover:scale-105"
              }`}
              style={{
                top: position.y - 24,
                left: position.x - 24,
                backgroundColor: isHovered ? pair?.color : "rgba(31, 41, 55, 0.7)",
                border: `2px solid ${isHovered ? "white" : "rgba(255, 255, 255, 0.3)"}`,
                color: isHovered ? "white" : "rgba(255, 255, 255, 0.8)",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: num * 0.1 }}
              onMouseEnter={() => setHoveredPair(pair)}
              onMouseLeave={() => setHoveredPair(null)}
            >
              {number}
            </motion.div>
          )
        })}

        {/* Center text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-xs text-purple-300"
          >
            NUMO Oracle
          </motion.div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
        {numberPairs.map((pair) => (
          <div
            key={`${pair.numbers[0]}-${pair.numbers[1]}`}
            className="flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setHoveredPair(pair)}
            onMouseLeave={() => setHoveredPair(null)}
          >
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: pair.color }}></div>
            <div className="text-sm text-gray-300">
              <span className="font-bold">
                {pair.numbers[0]}-{pair.numbers[1]}
              </span>
              : {pair.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
