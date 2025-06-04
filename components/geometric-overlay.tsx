"use client"

import { useEffect, useRef } from "react"

export default function GeometricOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Draw sacred geometry patterns
    const drawPatterns = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set very low opacity - reduced even further
      ctx.globalAlpha = 0.03

      // Draw flower of life pattern in top right
      drawFlowerOfLife(canvas.width * 0.85, canvas.height * 0.15, canvas.width * 0.3)

      // Draw metatron's cube in bottom left
      drawMetatronsCube(canvas.width * 0.15, canvas.height * 0.85, canvas.width * 0.25)

      // Draw spiral pattern in center
      drawSpiral(canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.4)
    }

    // Flower of Life pattern
    const drawFlowerOfLife = (centerX: number, centerY: number, size: number) => {
      const radius = size / 6
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
      ctx.lineWidth = 0.5

      // Center circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()

      // Surrounding circles
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 3) {
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.stroke()

        // Second layer
        for (let angle2 = 0; angle2 < Math.PI * 2; angle2 += Math.PI / 3) {
          const x2 = x + Math.cos(angle2) * radius
          const y2 = y + Math.sin(angle2) * radius

          ctx.beginPath()
          ctx.arc(x2, y2, radius, 0, Math.PI * 2)
          ctx.stroke()
        }
      }
    }

    // Metatron's Cube pattern
    const drawMetatronsCube = (centerX: number, centerY: number, size: number) => {
      const radius = size / 8
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
      ctx.lineWidth = 0.5

      // Points of the cube
      const points = [
        { x: centerX, y: centerY }, // Center
        { x: centerX, y: centerY - radius * 2 }, // Top
        { x: centerX + radius * 1.73, y: centerY - radius }, // Top right
        { x: centerX + radius * 1.73, y: centerY + radius }, // Bottom right
        { x: centerX, y: centerY + radius * 2 }, // Bottom
        { x: centerX - radius * 1.73, y: centerY + radius }, // Bottom left
        { x: centerX - radius * 1.73, y: centerY - radius }, // Top left
      ]

      // Draw circles at each point
      points.forEach((point) => {
        ctx.beginPath()
        ctx.arc(point.x, point.y, radius / 2, 0, Math.PI * 2)
        ctx.stroke()
      })

      // Connect all points
      for (let i = 1; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          ctx.beginPath()
          ctx.moveTo(points[i].x, points[i].y)
          ctx.lineTo(points[j].x, points[j].y)
          ctx.stroke()
        }
      }
    }

    // Spiral pattern
    const drawSpiral = (centerX: number, centerY: number, size: number) => {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)"
      ctx.lineWidth = 0.5

      ctx.beginPath()
      let radius = 5
      let angle = 0
      const maxRadius = size / 2

      ctx.moveTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle))

      while (radius < maxRadius) {
        angle += 0.1
        radius += 0.5
        ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle))
      }

      ctx.stroke()
    }

    drawPatterns()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-2]"
      aria-hidden="true"
    />
  )
}
