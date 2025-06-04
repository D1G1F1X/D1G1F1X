"use client"

import { useEffect, useRef } from "react"

export default function AnimatedWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = 180 // Height of the wave area
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Wave properties
    const waves = [
      { y: 0, amplitude: 20, frequency: 0.02, speed: 0.05, color: "rgba(147, 51, 234, 0.3)" }, // Light purple
      { y: 30, amplitude: 15, frequency: 0.03, speed: 0.03, color: "rgba(168, 85, 247, 0.4)" }, // Medium purple
      { y: 60, amplitude: 25, frequency: 0.01, speed: 0.07, color: "rgba(192, 132, 252, 0.5)" }, // Bright purple
    ]

    let animationFrameId: number
    let time = 0

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      waves.forEach((wave) => {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height)

        for (let x = 0; x <= canvas.width; x += 5) {
          const y = canvas.height - wave.y - wave.amplitude * Math.sin(x * wave.frequency + time * wave.speed)
          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.closePath()
        ctx.fillStyle = wave.color
        ctx.fill()
      })

      time++
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="wave-container fixed bottom-0 left-0 right-0 pointer-events-none z-10">
      <canvas ref={canvasRef} className="w-full h-[180px]" style={{ filter: "blur(2px)" }} />
    </div>
  )
}
