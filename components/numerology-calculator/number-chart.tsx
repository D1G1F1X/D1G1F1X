"\"use client"

import { useEffect, useRef } from "react"

interface NumberChartProps {
  number: number
  title: string
}

export function NumberChart({ number, title }: NumberChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const size = canvas.width
    const centerX = size / 2
    const centerY = size / 2
    const radius = size * 0.4

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Draw outer circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.fillStyle = "rgba(139, 92, 246, 0.2)" // purple-500 with opacity
    ctx.fill()

    // Draw inner circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.8, 0, 2 * Math.PI)
    ctx.fillStyle = "rgba(139, 92, 246, 0.3)" // purple-500 with more opacity
    ctx.fill()

    // Draw number
    ctx.font = "bold 24px sans-serif"
    ctx.fillStyle = "rgba(216, 180, 254, 1)" // purple-300
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(number.toString(), centerX, centerY)

    // Draw title
    ctx.font = "10px sans-serif"
    ctx.fillStyle = "rgba(156, 163, 175, 1)" // gray-400
    ctx.fillText(title, centerX, centerY + radius * 0.6)

    // Draw decorative elements based on number
    const points = number > 9 ? 11 : number
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * 2 * Math.PI
      const x = centerX + Math.cos(angle) * (radius * 1.1)
      const y = centerY + Math.sin(angle) * (radius * 1.1)

      ctx.beginPath()
      ctx.arc(x, y, 2, 0, 2 * Math.PI)
      ctx.fillStyle = "rgba(139, 92, 246, 0.8)" // purple-500
      ctx.fill()
    }
  }, [number, title])

  return <canvas ref={canvasRef} width={100} height={100} className="w-full h-full" />
}
