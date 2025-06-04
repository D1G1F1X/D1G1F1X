"use client"

import { cn } from "@/lib/utils"
import { Flame, Droplets, Mountain, Wind, Sparkles } from "lucide-react"
import type { ElementType } from "@/types/dice-types"
import { motion } from "framer-motion"

interface ElementalDieProps {
  element: ElementType
  value: number | null
  isRolling: boolean
}

export function ElementalDie({ element, value, isRolling }: ElementalDieProps) {
  // Get the appropriate icon based on the element
  const Icon = getElementIcon(element)

  // Get the appropriate colors based on the element
  const { bgGradient, borderColor, textColor } = getElementColors(element)

  return (
    <motion.div
      className={cn(
        "relative rounded-xl flex items-center justify-center",
        "shadow-lg border-2",
        bgGradient,
        borderColor,
        "w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28", // Responsive width and height
      )}
      animate={
        isRolling
          ? {
              rotateX: [0, 360, 720, 1080],
              rotateY: [0, 360, 720, 1080],
              scale: [1, 0.8, 1.1, 1],
            }
          : {}
      }
      transition={{
        duration: 1.5,
        ease: "easeInOut",
      }}
    >
      {/* Element Icon */}
      <Icon className={cn("absolute top-1 left-1 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6", textColor)} />

      {/* Die Value */}
      <span className={cn("text-4xl font-bold md:text-5xl lg:text-6xl", textColor)}>
        {isRolling ? "?" : value !== null ? value : "-"}
      </span>

      {/* Element Name */}
      <span
        className={cn("absolute bottom-1 right-1 text-xs font-medium capitalize md:text-sm lg:text-base", textColor)}
      >
        {element}
      </span>
    </motion.div>
  )
}

function getElementIcon(element: ElementType) {
  switch (element) {
    case "fire":
      return Flame
    case "water":
      return Droplets
    case "earth":
      return Mountain
    case "air":
      return Wind
    case "spirit":
      return Sparkles
    default:
      return Flame
  }
}

function getElementColors(element: ElementType) {
  switch (element) {
    case "fire":
      return {
        bgGradient: "bg-gradient-to-br from-red-400 to-orange-600",
        borderColor: "border-red-600",
        textColor: "text-white",
      }
    case "water":
      return {
        bgGradient: "bg-gradient-to-br from-blue-400 to-blue-600",
        borderColor: "border-blue-600",
        textColor: "text-white",
      }
    case "earth":
      return {
        bgGradient: "bg-gradient-to-br from-green-400 to-green-600",
        borderColor: "border-green-600",
        textColor: "text-white",
      }
    case "air":
      return {
        bgGradient: "bg-gradient-to-br from-yellow-300 to-yellow-500",
        borderColor: "border-yellow-500",
        textColor: "text-yellow-900",
      }
    case "spirit":
      return {
        bgGradient: "bg-gradient-to-br from-purple-400 to-purple-600",
        borderColor: "border-purple-600",
        textColor: "text-white",
      }
    default:
      return {
        bgGradient: "bg-gradient-to-br from-gray-400 to-gray-600",
        borderColor: "border-gray-600",
        textColor: "text-white",
      }
  }
}
