"use client"

import { useEffect, useRef } from "react"
import type { NumerologyProfile } from "./numerology-report-generator"

interface NumerologyTimelineProps {
  profile: NumerologyProfile
}

export function NumerologyTimeline({ profile }: NumerologyTimelineProps) {
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
    ctx.fillStyle = "rgba(249, 250, 251, 0.5)" // gray-50
    ctx.fillRect(0, 0, width, height)

    // Calculate life periods based on birthdate
    const birthYear = profile.birthDate.getFullYear()
    const currentYear = new Date().getFullYear()
    const age = currentYear - birthYear

    const firstPeriodEnd = birthYear + 27
    const secondPeriodEnd = birthYear + 54
    const thirdPeriodEnd = birthYear + 81

    // Draw timeline
    const timelineY = height / 2
    const timelineStart = 40
    const timelineEnd = width - 40
    const timelineLength = timelineEnd - timelineStart

    // Draw main timeline
    ctx.beginPath()
    ctx.moveTo(timelineStart, timelineY)
    ctx.lineTo(timelineEnd, timelineY)
    ctx.strokeStyle = "rgba(107, 114, 128, 0.8)" // gray-500
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw period markers
    const drawPeriodMarker = (x: number, year: number, label: string) => {
      ctx.beginPath()
      ctx.moveTo(x, timelineY - 10)
      ctx.lineTo(x, timelineY + 10)
      ctx.strokeStyle = "rgba(107, 114, 128, 0.8)" // gray-500
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw year
      ctx.font = "12px sans-serif"
      ctx.fillStyle = "#4B5563" // gray-600
      ctx.textAlign = "center"
      ctx.fillText(year.toString(), x, timelineY + 25)

      // Draw label
      ctx.font = "10px sans-serif"
      ctx.fillStyle = "#6B7280" // gray-500
      ctx.fillText(label, x, timelineY + 40)
    }

    // Draw birth year
    drawPeriodMarker(timelineStart, birthYear, "Birth")

    // Draw period end markers
    const firstPeriodX = timelineStart + timelineLength * 0.33
    const secondPeriodX = timelineStart + timelineLength * 0.67
    const thirdPeriodX = timelineEnd

    drawPeriodMarker(firstPeriodX, firstPeriodEnd, "1st Cycle End")
    drawPeriodMarker(secondPeriodX, secondPeriodEnd, "2nd Cycle End")
    drawPeriodMarker(thirdPeriodX, thirdPeriodEnd, "3rd Cycle End")

    // Draw current year marker
    const currentYearX = timelineStart + ((currentYear - birthYear) / (thirdPeriodEnd - birthYear)) * timelineLength

    ctx.beginPath()
    ctx.moveTo(currentYearX, timelineY - 15)
    ctx.lineTo(currentYearX, timelineY + 15)
    ctx.strokeStyle = "rgba(220, 38, 38, 0.8)" // red-600
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw current year label
    ctx.font = "bold 12px sans-serif"
    ctx.fillStyle = "#DC2626" // red-600
    ctx.textAlign = "center"
    ctx.fillText("Now", currentYearX, timelineY - 25)
    ctx.fillText(currentYear.toString(), currentYearX, timelineY - 10)

    // Draw period labels
    ctx.font = "bold 14px sans-serif"
    ctx.fillStyle = "#4B5563" // gray-600
    ctx.textAlign = "center"

    const labelY = timelineY - 60
    ctx.fillText("First Cycle", (timelineStart + firstPeriodX) / 2, labelY)
    ctx.fillText("Second Cycle", (firstPeriodX + secondPeriodX) / 2, labelY)
    ctx.fillText("Third Cycle", (secondPeriodX + thirdPeriodX) / 2, labelY)

    // Draw cycle descriptions
    ctx.font = "11px sans-serif"
    ctx.fillStyle = "#6B7280" // gray-500
    ctx.textAlign = "center"

    const descY = labelY + 15
    ctx.fillText("Foundation & Learning", (timelineStart + firstPeriodX) / 2, descY)
    ctx.fillText("Productivity & Achievement", (firstPeriodX + secondPeriodX) / 2, descY)
    ctx.fillText("Reflection & Wisdom", (secondPeriodX + thirdPeriodX) / 2, descY)

    // Highlight current period
    let currentPeriodStart = timelineStart
    let currentPeriodEnd = firstPeriodX
    let currentPeriodLabel = "First Cycle"

    if (age >= 27 && age < 54) {
      currentPeriodStart = firstPeriodX
      currentPeriodEnd = secondPeriodX
      currentPeriodLabel = "Second Cycle"
    } else if (age >= 54) {
      currentPeriodStart = secondPeriodX
      currentPeriodEnd = thirdPeriodX
      currentPeriodLabel = "Third Cycle"
    }

    // Draw highlight for current period
    ctx.fillStyle = "rgba(139, 92, 246, 0.1)" // purple-500 with opacity
    ctx.fillRect(currentPeriodStart, timelineY - 30, currentPeriodEnd - currentPeriodStart, 60)

    // Draw pinnacle periods
    const pinnacleY = timelineY + 80
    ctx.font = "bold 14px sans-serif"
    ctx.fillStyle = "#4B5563" // gray-600
    ctx.textAlign = "center"
    ctx.fillText("Pinnacle Periods", width / 2, pinnacleY)

    // Calculate pinnacle periods
    const pinnacle1End = birthYear + 36
    const pinnacle2End = birthYear + 45
    const pinnacle3End = birthYear + 54

    // Draw pinnacle timeline
    ctx.beginPath()
    ctx.moveTo(timelineStart, pinnacleY + 30)
    ctx.lineTo(timelineEnd, pinnacleY + 30)
    ctx.strokeStyle = "rgba(107, 114, 128, 0.8)" // gray-500
    ctx.lineWidth = 2
    ctx.stroke()

    // Calculate pinnacle positions
    const pinnacle1X = timelineStart + ((pinnacle1End - birthYear) / (thirdPeriodEnd - birthYear)) * timelineLength
    const pinnacle2X = timelineStart + ((pinnacle2End - birthYear) / (thirdPeriodEnd - birthYear)) * timelineLength
    const pinnacle3X = timelineStart + ((pinnacle3End - birthYear) / (thirdPeriodEnd - birthYear)) * timelineLength

    // Draw pinnacle markers
    drawPeriodMarker(timelineStart, birthYear, "1st Pinnacle")
    drawPeriodMarker(pinnacle1X, pinnacle1End, "2nd Pinnacle")
    drawPeriodMarker(pinnacle2X, pinnacle2End, "3rd Pinnacle")
    drawPeriodMarker(pinnacle3X, pinnacle3End, "4th Pinnacle")

    // Draw pinnacle numbers (would be calculated in a real implementation)
    const pinnacle1 = (profile.lifePathNumber + 1) % 9 || 9
    const pinnacle2 = (profile.destinyNumber + 2) % 9 || 9
    const pinnacle3 = (pinnacle1 + pinnacle2) % 9 || 9
    const pinnacle4 = (profile.personalityNumber + profile.soulUrgeNumber) % 9 || 9

    // Draw pinnacle number labels
    const drawPinnacleNumber = (x1: number, x2: number, number: number) => {
      const centerX = (x1 + x2) / 2

      ctx.beginPath()
      ctx.arc(centerX, pinnacleY + 30, 15, 0, 2 * Math.PI)
      ctx.fillStyle = "rgba(139, 92, 246, 0.2)" // purple-500 with opacity
      ctx.fill()
      ctx.strokeStyle = "rgba(139, 92, 246, 0.8)" // purple-500
      ctx.lineWidth = 1.5
      ctx.stroke()

      ctx.font = "bold 12px sans-serif"
      ctx.fillStyle = "#8B5CF6" // purple-500
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(number.toString(), centerX, pinnacleY + 30)
    }

    drawPinnacleNumber(timelineStart, pinnacle1X, pinnacle1)
    drawPinnacleNumber(pinnacle1X, pinnacle2X, pinnacle2)
    drawPinnacleNumber(pinnacle2X, pinnacle3X, pinnacle3)
    drawPinnacleNumber(pinnacle3X, timelineEnd, pinnacle4)
  }, [profile])

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} width={600} height={300} className="w-full max-w-lg h-auto" />
    </div>
  )
}
