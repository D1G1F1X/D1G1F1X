"use client"

import { useEffect, useRef } from "react"

export default function NumberPairingsDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Set colors to match site theme
    const backgroundColor = "transparent"
    const lineColor = "#d8b4fe" // purple-300
    const textColor = "#f5f3ff" // purple-50
    const circleColor = "rgba(216, 180, 254, 0.2)" // purple-300 with opacity

    // Fill background
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, rect.width, rect.height)

    // Draw outer circle
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const outerRadius = Math.min(centerX, centerY) * 0.9

    ctx.beginPath()
    ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI)
    ctx.strokeStyle = lineColor
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw numbers
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    const numberRadius = outerRadius * 0.6

    ctx.font = "bold 24px sans-serif"
    ctx.fillStyle = textColor
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Position numbers in a line across the center
    const numberWidth = rect.width * 0.7
    const startX = centerX - numberWidth / 2
    const spacing = numberWidth / (numbers.length - 1)

    numbers.forEach((num, i) => {
      const x = startX + i * spacing
      ctx.fillText(num, x, centerY)
    })

    // Draw pairing circles
    const pairings = [
      { pair: [0, 1], name: "Cauldron" },
      { pair: [2, 5], name: "Sword" },
      { pair: [3, 8], name: "Cord" },
      { pair: [4, 7], name: "Spear" },
      { pair: [6, 9], name: "Stone" },
    ]

    const circleRadius = spacing * 1.2

    pairings.forEach(({ pair }) => {
      const index1 = numbers.indexOf(pair[0].toString())
      const index2 = numbers.indexOf(pair[1].toString())

      if (index1 >= 0 && index2 >= 0) {
        const x1 = startX + index1 * spacing
        const x2 = startX + index2 * spacing
        const midX = (x1 + x2) / 2

        ctx.beginPath()
        ctx.arc(midX, centerY, circleRadius, 0, 2 * Math.PI)
        ctx.fillStyle = circleColor
        ctx.fill()
        ctx.strokeStyle = lineColor
        ctx.lineWidth = 1
        ctx.stroke()
      }
    })

    // Draw inner connecting circles
    ctx.beginPath()
    ctx.arc(centerX, centerY, outerRadius * 0.4, 0, 2 * Math.PI)
    ctx.strokeStyle = lineColor
    ctx.lineWidth = 1
    ctx.stroke()

    // Add subtle glow effect
    ctx.shadowColor = "#a855f7" // purple-500
    ctx.shadowBlur = 15
    ctx.beginPath()
    ctx.arc(centerX, centerY, outerRadius * 0.2, 0, 2 * Math.PI)
    ctx.strokeStyle = "#c084fc" // purple-400
    ctx.lineWidth = 2
    ctx.stroke()
  }, [])

  return (
    <div className="w-full aspect-square max-w-xl mx-auto my-8">
      <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />
    </div>
  )
}
