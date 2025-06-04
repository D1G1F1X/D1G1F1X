"use client"

import { useEffect, useRef } from "react"

export default function DeepOceanWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 0.25 // 1/4 of viewport height
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Wave properties - using much darker colors for very subtle deep ocean feel
    const waves = [
      {
        y: 0,
        amplitude: 8, // Reduced amplitude
        frequency: 0.012,
        speed: 0.02,
        color: "rgba(5, 1, 15, 0.7)", // Darker purple
      },
      {
        y: 40,
        amplitude: 10, // Reduced amplitude
        frequency: 0.007,
        speed: 0.015,
        color: "rgba(7, 2, 22, 0.65)", // Darker purple-blue
      },
      {
        y: 80,
        amplitude: 7, // Reduced amplitude
        frequency: 0.01,
        speed: 0.025,
        color: "rgba(10, 3, 30, 0.6)", // Darker purple-blue
      },
      {
        y: 120,
        amplitude: 5, // Reduced amplitude
        frequency: 0.015,
        speed: 0.02,
        color: "rgba(15, 5, 40, 0.55)", // Darker purple
      },
    ]

    let animationFrameId: number
    let time = 0

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw each wave layer from back to front
      waves.forEach((wave) => {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height)

        // Create smooth wave pattern
        for (let x = 0; x <= canvas.width; x += 10) {
          // Increased step for smoother performance
          // Combine multiple sine waves for more natural movement
          const y1 = Math.sin(x * wave.frequency * 0.8 + time * wave.speed) * wave.amplitude
          const y2 = Math.sin(x * wave.frequency * 1.2 + time * wave.speed * 0.8) * (wave.amplitude * 0.5)
          const y = canvas.height - wave.y - y1 - y2

          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.closePath()
        ctx.fillStyle = wave.color
        ctx.fill()
      })

      time += 0.5 // Slowed down animation speed
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
      <canvas
        ref={canvasRef}
        className="w-full h-[25vh]"
        style={{
          filter: "blur(2px)",
          opacity: 0.9, // Increased opacity for darker appearance
        }}
      />
    </div>
  )
}
