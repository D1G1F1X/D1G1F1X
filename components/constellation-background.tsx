"use client"

import { useEffect, useRef, useState } from "react"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  twinkleDirection: boolean
  vx: number
  vy: number
}

interface Constellation {
  stars: number[]
  width: number
}

export default function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const starsRef = useRef<Star[]>([])
  const constellationsRef = useRef<Constellation[]>([])

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Create stars - very sparse for subtlety
    const starCount = Math.floor((dimensions.width * dimensions.height) / 10000) // Even more sparse
    const stars: Star[] = []

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 0.7 + 0.2, // Very small stars
        opacity: Math.random() * 0.2 + 0.05, // Very faint
        twinkleSpeed: Math.random() * 0.001 + 0.0003, // Very slow twinkle
        twinkleDirection: Math.random() > 0.5,
        vx: (Math.random() - 0.5) * 0.05, // Very slow drift
        vy: (Math.random() - 0.5) * 0.05,
      })
    }

    starsRef.current = stars

    // Create constellations (groups of connected stars)
    const constellationCount = Math.floor(starCount / 35) // Fewer constellations
    const constellations: Constellation[] = []

    for (let i = 0; i < constellationCount; i++) {
      const starIndices: number[] = []
      const startingStarIndex = Math.floor(Math.random() * starCount)
      starIndices.push(startingStarIndex)

      // Add 2-5 more stars to the constellation
      const constellationSize = Math.floor(Math.random() * 4) + 2
      for (let j = 0; j < constellationSize; j++) {
        // Find a star that's relatively close to the last added star
        const lastStar = stars[starIndices[starIndices.length - 1]]
        let closestStarIndex = -1
        let closestDistance = Number.POSITIVE_INFINITY

        for (let k = 0; k < starCount; k++) {
          if (starIndices.includes(k)) continue // Skip stars already in constellation

          const distance = Math.sqrt(Math.pow(stars[k].x - lastStar.x, 2) + Math.pow(stars[k].y - lastStar.y, 2))

          // Only consider stars within a reasonable distance
          if (distance < dimensions.width / 10 && distance < closestDistance) {
            closestDistance = distance
            closestStarIndex = k
          }
        }

        if (closestStarIndex !== -1) {
          starIndices.push(closestStarIndex)
        }
      }

      constellations.push({
        stars: starIndices,
        width: Math.random() * 0.3 + 0.1, // Line width between 0.1 and 0.4
      })
    }

    constellationsRef.current = constellations

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Draw constellations (lines between stars)
      constellationsRef.current.forEach((constellation) => {
        if (constellation.stars.length < 2) return

        ctx.beginPath()
        const firstStar = starsRef.current[constellation.stars[0]]
        ctx.moveTo(firstStar.x, firstStar.y)

        for (let i = 1; i < constellation.stars.length; i++) {
          const star = starsRef.current[constellation.stars[i]]
          ctx.lineTo(star.x, star.y)
        }

        ctx.strokeStyle = `rgba(255, 255, 255, ${0.02 + Math.random() * 0.02})` // Very faint lines
        ctx.lineWidth = constellation.width
        ctx.stroke()
      })

      // Update and draw stars
      starsRef.current.forEach((star, index) => {
        // Slow drift
        star.x += star.vx
        star.y += star.vy

        // Wrap around edges
        if (star.x < 0) star.x = dimensions.width
        if (star.x > dimensions.width) star.x = 0
        if (star.y < 0) star.y = dimensions.height
        if (star.y > dimensions.height) star.y = 0

        // Twinkle effect
        if (star.twinkleDirection) {
          star.opacity += star.twinkleSpeed
          if (star.opacity >= 0.25) {
            star.opacity = 0.25
            star.twinkleDirection = false
          }
        } else {
          star.opacity -= star.twinkleSpeed
          if (star.opacity <= 0.05) {
            star.opacity = 0.05
            star.twinkleDirection = true
          }
        }

        // Draw star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(235, 240, 255, ${star.opacity})`
        ctx.fill()

        // Update reference
        starsRef.current[index] = star
      })

      requestAnimationFrame(animate)
    }

    // Start animation
    const animationId = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [dimensions])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-3]"
      aria-hidden="true"
    />
  )
}
