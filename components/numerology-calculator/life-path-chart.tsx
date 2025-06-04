"use client"

import { useEffect, useRef } from "react"

interface LifePathChartProps {
  lifePathNumber: number
  destinyNumber: number
  soulNumber: number
}

export function LifePathChart({ lifePathNumber, destinyNumber, soulNumber }: LifePathChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw background
    ctx.fillStyle = "rgba(17, 24, 39, 0.5)" // gray-900 with opacity
    ctx.fillRect(0, 0, width, height)

    // Draw title
    ctx.font = "bold 14px sans-serif"
    ctx.fillStyle = "rgba(216, 180, 254, 1)" // purple-300
    ctx.textAlign = "center"
    ctx.fillText("Core Numbers Relationship", width / 2, 20)

    // Draw triangle
    const centerX = width / 2
    const centerY = height / 2 + 10
    const triangleSize = Math.min(width, height) * 0.35

    // Draw triangle lines
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - triangleSize)
    ctx.lineTo(centerX - triangleSize, centerY + triangleSize / 2)
    ctx.lineTo(centerX + triangleSize, centerY + triangleSize / 2)
    ctx.closePath()
    ctx.strokeStyle = "rgba(139, 92, 246, 0.6)" // purple-500
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw numbers at triangle points
    const drawNumber = (x: number, y: number, num: number, label: string) => {
      // Draw circle
      ctx.beginPath()
      ctx.arc(x, y, 20, 0, 2 * Math.PI)
      ctx.fillStyle = "rgba(91, 33, 182, 0.4)" // purple-800
      ctx.fill()
      ctx.strokeStyle = "rgba(139, 92, 246, 0.8)" // purple-500
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Draw number
      ctx.font = "bold 16px sans-serif"
      ctx.fillStyle = "rgba(216, 180, 254, 1)" // purple-300
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(num.toString(), x, y)

      // Draw label
      ctx.font = "12px sans-serif"
      ctx.fillStyle = "rgba(156, 163, 175, 1)" // gray-400
      ctx.fillText(label, x, y + 30)
    }

    // Draw numbers at triangle points
    drawNumber(centerX, centerY - triangleSize, lifePathNumber, "Life Path")
    drawNumber(centerX - triangleSize, centerY + triangleSize / 2, destinyNumber, "Destiny")
    drawNumber(centerX + triangleSize, centerY + triangleSize / 2, soulNumber, "Soul")

    // Draw connecting lines between numbers if they're the same
    ctx.lineWidth = 1
    ctx.setLineDash([3, 3])

    if (lifePathNumber === destinyNumber) {
      ctx.beginPath()
      ctx.moveTo(centerX, centerY - triangleSize)
      ctx.lineTo(centerX - triangleSize, centerY + triangleSize / 2)
      ctx.strokeStyle = "rgba(167, 139, 250, 0.8)" // purple-400
      ctx.stroke()

      // Draw text for the connection
      const midX = (centerX + (centerX - triangleSize)) / 2
      const midY = (centerY - triangleSize + (centerY + triangleSize / 2)) / 2
      ctx.font = "10px sans-serif"
      ctx.fillStyle = "rgba(167, 139, 250, 1)" // purple-400
      ctx.fillText("Strong Alignment", midX - 15, midY - 5)
    }

    if (lifePathNumber === soulNumber) {
      ctx.beginPath()
      ctx.moveTo(centerX, centerY - triangleSize)
      ctx.lineTo(centerX + triangleSize, centerY + triangleSize / 2)
      ctx.strokeStyle = "rgba(167, 139, 250, 0.8)" // purple-400
      ctx.stroke()

      // Draw text for the connection
      const midX = (centerX + (centerX + triangleSize)) / 2
      const midY = (centerY - triangleSize + (centerY + triangleSize / 2)) / 2
      ctx.font = "10px sans-serif"
      ctx.fillStyle = "rgba(167, 139, 250, 1)" // purple-400
      ctx.fillText("Inner Harmony", midX - 5, midY - 5)
    }

    if (destinyNumber === soulNumber) {
      ctx.beginPath()
      ctx.moveTo(centerX - triangleSize, centerY + triangleSize / 2)
      ctx.lineTo(centerX + triangleSize, centerY + triangleSize / 2)
      ctx.strokeStyle = "rgba(167, 139, 250, 0.8)" // purple-400
      ctx.stroke()

      // Draw text for the connection
      ctx.font = "10px sans-serif"
      ctx.fillStyle = "rgba(167, 139, 250, 1)" // purple-400
      ctx.fillText("Purpose Alignment", centerX, centerY + triangleSize / 2 - 10)
    }
  }, [lifePathNumber, destinyNumber, soulNumber])

  return (
    <div className="w-full">
      <canvas ref={canvasRef} width={400} height={250} className="w-full h-auto" />
    </div>
  )
}
