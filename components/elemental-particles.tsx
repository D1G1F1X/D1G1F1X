"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type ElementType = "fire" | "water" | "earth" | "air" | "spirit"

interface ElementalParticlesProps {
  element: ElementType
  isActive: boolean
  x: number
  y: number
}

export default function ElementalParticles({ element, isActive, x, y }: ElementalParticlesProps) {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number }>
  >([])

  // Element-specific configurations
  const elementConfig = {
    fire: {
      count: 12,
      colors: ["#FF4500", "#FF8C00", "#FFD700"],
      baseSize: { min: 3, max: 6 },
      speed: { min: 2, max: 3.5 },
      spread: { x: 40, y: 60 },
      direction: { x: [-10, 10], y: [-60, -30] },
      className: "rounded-full opacity-70 blur-[1px]",
    },
    water: {
      count: 15,
      colors: ["#1E90FF", "#00BFFF", "#87CEFA"],
      baseSize: { min: 2, max: 5 },
      speed: { min: 3, max: 5 },
      spread: { x: 50, y: 30 },
      direction: { x: [-20, 20], y: [-10, 30] },
      className: "rounded-full opacity-60 blur-[1px]",
    },
    earth: {
      count: 10,
      colors: ["#228B22", "#32CD32", "#90EE90"],
      baseSize: { min: 3, max: 7 },
      speed: { min: 4, max: 6 },
      spread: { x: 60, y: 20 },
      direction: { x: [-15, 15], y: [10, 40] },
      className: "rounded-sm opacity-60 blur-[0.5px]",
    },
    air: {
      count: 18,
      colors: ["#F0F8FF", "#E6E6FA", "#FFFACD"],
      baseSize: { min: 2, max: 4 },
      speed: { min: 2.5, max: 4 },
      spread: { x: 70, y: 40 },
      direction: { x: [-30, 30], y: [-20, 20] },
      className: "rounded-full opacity-50 blur-[1.5px]",
    },
    spirit: {
      count: 14,
      colors: ["#9370DB", "#8A2BE2", "#BA55D3"],
      baseSize: { min: 2, max: 5 },
      speed: { min: 3, max: 4.5 },
      spread: { x: 60, y: 50 },
      direction: { x: [-20, 20], y: [-40, -10] },
      className: "rounded-full opacity-70 blur-[0.5px]",
    },
  }

  const config = elementConfig[element]

  // Generate particles when active state changes
  useEffect(() => {
    if (isActive) {
      const newParticles = Array.from({ length: config.count }, (_, i) => {
        const size = Math.random() * (config.baseSize.max - config.baseSize.min) + config.baseSize.min
        const delay = Math.random() * 0.5
        const duration = Math.random() * (config.speed.max - config.speed.min) + config.speed.min

        return {
          id: i,
          x: Math.random() * config.spread.x - config.spread.x / 2,
          y: Math.random() * config.spread.y - config.spread.y / 2,
          size,
          delay,
          duration,
        }
      })

      setParticles(newParticles)
    } else {
      setParticles([])
    }
  }, [isActive, element])

  if (!isActive) return null

  return (
    <div className="absolute pointer-events-none" style={{ left: x, top: y }}>
      {particles.map((particle) => {
        const directionX = Math.random() * (config.direction.x[1] - config.direction.x[0]) + config.direction.x[0]
        const directionY = Math.random() * (config.direction.y[1] - config.direction.y[0]) + config.direction.y[0]
        const color = config.colors[Math.floor(Math.random() * config.colors.length)]

        return (
          <motion.div
            key={particle.id}
            className={config.className}
            style={{
              position: "absolute",
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: color,
            }}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{
              x: directionX,
              y: directionY,
              opacity: 0,
              scale: element === "fire" ? [1, 1.5, 0.8] : 0.5,
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              ease: element === "water" ? "easeInOut" : element === "air" ? "linear" : "easeOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: Math.random() * 0.5,
            }}
          />
        )
      })}
    </div>
  )
}
