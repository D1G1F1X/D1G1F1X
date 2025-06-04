"use client"

import { useEffect, useRef } from "react"
import type { NumerologyProfile } from "./numerology-report-generator"

interface NumerologyChartProps {
  profile: NumerologyProfile
}

export function NumerologyChart({ profile }: NumerologyChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - 40

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw background
    ctx.fillStyle = "rgba(249, 250, 251, 0.5)" // gray-50
    ctx.fillRect(0, 0, width, height)

    // Draw title
    ctx.font = "bold 16px sans-serif"
    ctx.fillStyle = "#4B5563" // gray-600
    ctx.textAlign = "center"
    ctx.fillText("Numerology Profile Chart", centerX, 30)

    // Define the data points
    const dataPoints = [
      { label: "Life Path", value: profile.lifePathNumber, color: "#8B5CF6" }, // purple-500
      { label: "Destiny", value: profile.destinyNumber, color: "#6366F1" }, // indigo-500
      { label: "Personality", value: profile.personalityNumber, color: "#3B82F6" }, // blue-500
      { label: "Soul Urge", value: profile.soulUrgeNumber, color: "#8B5CF6" }, // purple-500
    ]

    // Add premium data points if available
    if (profile.expressionNumber) {
      dataPoints.push({ label: "Expression", value: profile.expressionNumber, color: "#10B981" }) // emerald-500
    }

    if (profile.maturityNumber) {
      dataPoints.push({ label: "Maturity", value: profile.maturityNumber, color: "#F59E0B" }) // amber-500
    }

    if (profile.birthdayNumber) {
      dataPoints.push({ label: "Birthday", value: profile.birthdayNumber, color: "#EF4444" }) // red-500
    }

    if (profile.balanceNumber) {
      dataPoints.push({ label: "Balance", value: profile.balanceNumber, color: "#14B8A6" }) // teal-500
    }

    const numPoints = dataPoints.length
    const angleStep = (2 * Math.PI) / numPoints

    // Draw radar chart
    // Draw axis lines
    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep - Math.PI / 2 // Start from top (subtract 90 degrees)
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.strokeStyle = "rgba(209, 213, 219, 0.8)" // gray-300
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw axis labels
      const labelX = centerX + (radius + 20) * Math.cos(angle)
      const labelY = centerY + (radius + 20) * Math.sin(angle)

      ctx.font = "12px sans-serif"
      ctx.fillStyle = "#4B5563" // gray-600
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(dataPoints[i].label, labelX, labelY)
    }

    // Draw concentric circles
    for (let r = radius / 9; r <= radius; r += radius / 9) {
      ctx.beginPath()
      ctx.arc(centerX, centerY, r, 0, 2 * Math.PI)
      ctx.strokeStyle = "rgba(229, 231, 235, 0.8)" // gray-200
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Draw data points and connect them
    ctx.beginPath()

    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep - Math.PI / 2 // Start from top
      const value = Math.min(dataPoints[i].value, 9) // Cap at 9 for display
      const pointRadius = (radius * value) / 9
      const x = centerX + pointRadius * Math.cos(angle)
      const y = centerY + pointRadius * Math.sin(angle)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }

    // Close the path
    ctx.lineTo(
      centerX + ((radius * Math.min(dataPoints[0].value, 9)) / 9) * Math.cos(-Math.PI / 2),
      centerY + ((radius * Math.min(dataPoints[0].value, 9)) / 9) * Math.sin(-Math.PI / 2),
    )

    // Fill the shape
    ctx.fillStyle = "rgba(139, 92, 246, 0.2)" // purple-500 with opacity
    ctx.fill()

    // Stroke the shape
    ctx.strokeStyle = "rgba(139, 92, 246, 0.8)" // purple-500
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw data points
    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep - Math.PI / 2
      const value = Math.min(dataPoints[i].value, 9) // Cap at 9 for display
      const pointRadius = (radius * value) / 9
      const x = centerX + pointRadius * Math.cos(angle)
      const y = centerY + pointRadius * Math.sin(angle)

      // Draw point
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, 2 * Math.PI)
      ctx.fillStyle = dataPoints[i].color
      ctx.fill()
      ctx.strokeStyle = "#FFFFFF"
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Draw value
      ctx.font = "bold 12px sans-serif"
      ctx.fillStyle = "#FFFFFF"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(dataPoints[i].value.toString(), x, y)
    }

    // Draw legend
    const legendX = 40
    let legendY = height - 20 - numPoints * 20

    for (let i = 0; i < numPoints; i++) {
      // Draw color box
      ctx.fillStyle = dataPoints[i].color
      ctx.fillRect(legendX, legendY - 6, 12, 12)

      // Draw label
      ctx.font = "12px sans-serif"
      ctx.fillStyle = "#4B5563" // gray-600
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText(`${dataPoints[i].label}: ${dataPoints[i].value}`, legendX + 20, legendY)

      legendY += 20
    }
  }, [profile])

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} width={500} height={500} className="w-full max-w-md h-auto" />
    </div>
  )
}
