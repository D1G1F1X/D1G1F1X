"use client"

import { useEffect, useRef } from "react"

interface NumerologyTimelineProps {
  birthdate: string
  challengeNumbers: number[]
  pinnacleNumbers: number[]
}

export function NumerologyTimeline({ birthdate, challengeNumbers, pinnacleNumbers }: NumerologyTimelineProps) {
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

    // Calculate life periods based on birthdate
    const birthYear = Number.parseInt(birthdate.split("-")[0])
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
    ctx.strokeStyle = "rgba(156, 163, 175, 0.6)" // gray-400
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw period markers
    const drawPeriodMarker = (x: number, year: number) => {
      ctx.beginPath()
      ctx.moveTo(x, timelineY - 10)
      ctx.lineTo(x, timelineY + 10)
      ctx.strokeStyle = "rgba(156, 163, 175, 0.8)" // gray-400
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw year
      ctx.font = "10px sans-serif"
      ctx.fillStyle = "rgba(156, 163, 175, 1)" // gray-400
      ctx.textAlign = "center"
      ctx.fillText(year.toString(), x, timelineY + 25)
    }

    // Draw birth year
    drawPeriodMarker(timelineStart, birthYear)

    // Draw period end markers
    const firstPeriodX = timelineStart + timelineLength * 0.33
    const secondPeriodX = timelineStart + timelineLength * 0.67
    const thirdPeriodX = timelineEnd

    drawPeriodMarker(firstPeriodX, firstPeriodEnd)
    drawPeriodMarker(secondPeriodX, secondPeriodEnd)
    drawPeriodMarker(thirdPeriodX, thirdPeriodEnd)

    // Draw period labels
    ctx.font = "bold 12px sans-serif"
    ctx.fillStyle = "rgba(216, 180, 254, 1)" // purple-300
    ctx.textAlign = "center"

    const labelY = timelineY - 35
    ctx.fillText("First Period", (timelineStart + firstPeriodX) / 2, labelY)
    ctx.fillText("Second Period", (firstPeriodX + secondPeriodX) / 2, labelY)
    ctx.fillText("Third Period", (secondPeriodX + thirdPeriodX) / 2, labelY)
    ctx.fillText("Fourth Period", thirdPeriodX, labelY)

    // Draw challenge numbers
    if (challengeNumbers && challengeNumbers.length >= 4) {
      const drawChallenge = (x: number, num: number, index: number) => {
        ctx.beginPath()
        ctx.arc(x, timelineY - 60, 15, 0, 2 * Math.PI)
        ctx.fillStyle = "rgba(251, 191, 36, 0.2)" // amber-400
        ctx.fill()
        ctx.strokeStyle = "rgba(251, 191, 36, 0.6)" // amber-400
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw number
        ctx.font = "bold 12px sans-serif"
        ctx.fillStyle = "rgba(251, 191, 36, 1)" // amber-400
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(num.toString(), x, timelineY - 60)

        // Draw label
        ctx.font = "10px sans-serif"
        ctx.fillStyle = "rgba(156, 163, 175, 1)" // gray-400
        ctx.fillText(`Challenge ${index}`, x, timelineY - 80)
      }

      drawChallenge((timelineStart + firstPeriodX) / 2, challengeNumbers[0], 1)
      drawChallenge((firstPeriodX + secondPeriodX) / 2, challengeNumbers[1], 2)
      drawChallenge((secondPeriodX + thirdPeriodX) / 2, challengeNumbers[2], 3)
      drawChallenge(thirdPeriodX, challengeNumbers[3], 4)
    }

    // Draw pinnacle numbers
    if (pinnacleNumbers && pinnacleNumbers.length >= 4) {
      const drawPinnacle = (x: number, num: number, index: number) => {
        ctx.beginPath()
        ctx.arc(x, timelineY + 60, 15, 0, 2 * Math.PI)
        ctx.fillStyle = "rgba(52, 211, 153, 0.2)" // green-400
        ctx.fill()
        ctx.strokeStyle = "rgba(52, 211, 153, 0.6)" // green-400
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw number
        ctx.font = "bold 12px sans-serif"
        ctx.fillStyle = "rgba(52, 211, 153, 1)" // green-400
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(num.toString(), x, timelineY + 60)

        // Draw label
        ctx.font = "10px sans-serif"
        ctx.fillStyle = "rgba(156, 163, 175, 1)" // gray-400
        ctx.fillText(`Pinnacle ${index}`, x, timelineY + 80)
      }

      drawPinnacle((timelineStart + firstPeriodX) / 2, pinnacleNumbers[0], 1)
      drawPinnacle((firstPeriodX + secondPeriodX) / 2, pinnacleNumbers[1], 2)
      drawPinnacle((secondPeriodX + thirdPeriodX) / 2, pinnacleNumbers[2], 3)
      drawPinnacle(thirdPeriodX, pinnacleNumbers[3], 4)
    }
  }, [birthdate, challengeNumbers, pinnacleNumbers])

  return (
    <div className="w-full bg-gray-800/50 p-3 rounded-lg">
      <canvas ref={canvasRef} width={600} height={180} className="w-full h-auto" />
    </div>
  )
}
