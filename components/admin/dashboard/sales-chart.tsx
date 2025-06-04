"use client"

import { useEffect, useRef } from "react"

export function SalesChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const width = canvas.width
    const height = canvas.height
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Sample data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const currentSales = [4500, 5200, 4800, 5800, 6000, 5500, 7000, 6800, 7200, 7800, 8500, 9200]
    const previousSales = [3800, 4300, 4000, 4600, 5100, 4800, 5500, 5300, 5800, 6200, 6800, 7500]

    // Find max value for scaling
    const maxValue = Math.max(...currentSales, ...previousSales) * 1.1

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.strokeStyle = "#e2e8f0"
    ctx.stroke()

    // Draw horizontal grid lines
    const gridLines = 5
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"
    ctx.font = "10px sans-serif"
    ctx.fillStyle = "#94a3b8"

    for (let i = 0; i <= gridLines; i++) {
      const y = padding + (chartHeight / gridLines) * i
      const value = Math.round(maxValue - (maxValue / gridLines) * i)

      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.strokeStyle = "#e2e8f0"
      ctx.stroke()

      ctx.fillText(`$${value}`, padding - 5, y)
    }

    // Draw month labels
    ctx.textAlign = "center"
    ctx.textBaseline = "top"

    const barWidth = chartWidth / months.length / 3
    const groupWidth = barWidth * 2 + 4

    months.forEach((month, i) => {
      const x = padding + (chartWidth / months.length) * (i + 0.5)
      ctx.fillText(month, x, height - padding + 10)
    })

    // Draw current year bars
    currentSales.forEach((value, i) => {
      const x = padding + (chartWidth / months.length) * (i + 0.5) - barWidth - 2
      const barHeight = (value / maxValue) * chartHeight
      const y = height - padding - barHeight

      ctx.fillStyle = "rgba(147, 51, 234, 0.8)"
      ctx.fillRect(x, y, barWidth, barHeight)
    })

    // Draw previous year bars
    previousSales.forEach((value, i) => {
      const x = padding + (chartWidth / months.length) * (i + 0.5) + 2
      const barHeight = (value / maxValue) * chartHeight
      const y = height - padding - barHeight

      ctx.fillStyle = "rgba(79, 70, 229, 0.6)"
      ctx.fillRect(x, y, barWidth, barHeight)
    })

    // Draw legend
    const legendX = width - padding - 150
    const legendY = padding + 20

    ctx.fillStyle = "rgba(147, 51, 234, 0.8)"
    ctx.fillRect(legendX, legendY, 15, 15)

    ctx.fillStyle = "#64748b"
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"
    ctx.fillText("Current Year", legendX + 20, legendY + 7.5)

    ctx.fillStyle = "rgba(79, 70, 229, 0.6)"
    ctx.fillRect(legendX, legendY + 25, 15, 15)

    ctx.fillStyle = "#64748b"
    ctx.fillText("Previous Year", legendX + 20, legendY + 32.5)
  }, [])

  return (
    <div className="w-full h-[300px]">
      <canvas ref={canvasRef} width={800} height={300} className="w-full h-full" />
    </div>
  )
}
