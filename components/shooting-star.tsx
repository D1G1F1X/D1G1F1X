"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface ShootingStarProps {
  width?: number
  height?: number
}

const ShootingStar: React.FC<ShootingStarProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })

  useEffect(() => {
    // Set dimensions based on window size or props
    const w = width || window.innerWidth
    const h = height || window.innerHeight
    setDimensions({ width: w, height: h })

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = w
    canvas.height = h

    // Array to store shooting stars
    const shootingStars: {
      x: number
      y: number
      length: number
      speed: number
      size: number
      tail: { x: number; y: number }[]
      active: boolean
      timer: number
    }[] = []

    // Create a new shooting star
    const createShootingStar = () => {
      const direction = Math.random() > 0.5 ? 1 : -1
      return {
        x: Math.random() * w,
        y: Math.random() * h * 0.5,
        length: Math.floor(Math.random() * 80) + 40,
        speed: Math.random() * 10 + 5,
        size: Math.random() * 1 + 0.5,
        tail: [],
        active: true,
        timer: 0,
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, w, h)

      // Randomly create new shooting stars
      if (Math.random() < 0.005 && shootingStars.length < 2) {
        shootingStars.push(createShootingStar())
      }

      // Update and draw shooting stars
      for (let i = 0; i < shootingStars.length; i++) {
        const star = shootingStars[i]

        if (star.active) {
          star.x += star.speed * 0.75
          star.y += star.speed * 0.75
          star.tail.unshift({ x: star.x, y: star.y })

          // Limit the tail length
          if (star.tail.length > 20) {
            star.tail.pop()
          }

          // Draw the shooting star
          ctx.beginPath()
          ctx.moveTo(star.x, star.y)

          // Draw the tail
          for (let j = 0; j < star.tail.length; j++) {
            const point = star.tail[j]
            const alpha = 0.5 - j / star.tail.length / 2
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
            ctx.lineWidth = star.size * (1 - j / star.tail.length)
            ctx.lineTo(point.x, point.y)
          }

          ctx.stroke()
          ctx.closePath()

          // Check if the shooting star is out of bounds
          if (star.x > w || star.y > h) {
            star.active = false
            star.timer = Math.floor(Math.random() * 200) + 100
          }
        } else {
          // Countdown to reactivate
          star.timer--
          if (star.timer <= 0) {
            shootingStars[i] = createShootingStar()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      const newWidth = width || window.innerWidth
      const newHeight = height || window.innerHeight
      setDimensions({ width: newWidth, height: newHeight })

      if (canvas) {
        canvas.width = newWidth
        canvas.height = newHeight
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [width, height])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
      aria-hidden="true"
    />
  )
}

// Export both as default and named export to support both import styles
export default ShootingStar
export { ShootingStar }
