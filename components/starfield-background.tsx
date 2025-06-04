"use client"

import { useRef, useEffect, useState } from "react"
import { ShootingStar } from "./shooting-star"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  twinkleDirection: boolean
}

const StarfieldBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const starsRef = useRef<Star[]>([])

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Create stars - reduced density by increasing divisor from 3500 to 4000
    const starCount = Math.floor((dimensions.width * dimensions.height) / 4000)
    const stars: Star[] = []

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        // Further reduced size range
        size: Math.random() * 0.7 + 0.2,
        // Further reduced opacity range
        opacity: Math.random() * 0.3 + 0.05,
        // Further reduced twinkle speed
        twinkleSpeed: Math.random() * 0.002 + 0.0005,
        twinkleDirection: Math.random() > 0.5,
      })
    }

    starsRef.current = stars

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Update and draw stars
      starsRef.current.forEach((star) => {
        // Twinkle effect
        if (star.twinkleDirection) {
          star.opacity += star.twinkleSpeed
          // Reduced max opacity
          if (star.opacity >= 0.35) {
            star.opacity = 0.35
            star.twinkleDirection = false
          }
        } else {
          star.opacity -= star.twinkleSpeed
          // Reduced min opacity
          if (star.opacity <= 0.05) {
            star.opacity = 0.05
            star.twinkleDirection = true
          }
        }

        // Draw star with slightly blue-gray tint instead of pure white
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(235, 240, 255, ${star.opacity})`
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    // Start animation
    const animationId = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [dimensions])

  return (
    <>
      {/* Enhanced CSS-only Moon with more realistic look and stronger glow */}
      <div
        className="fixed pointer-events-none z-[-4]"
        style={{
          top: "-40px",
          left: "-40px",
          width: "180px",
          height: "180px",
        }}
      >
        {/* Outer glow layer - larger and more diffuse */}
        <div
          className="absolute rounded-full"
          style={{
            width: "200%",
            height: "200%",
            top: "-50%",
            left: "-50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)",
          }}
        />

        {/* Middle glow layer - more concentrated */}
        <div
          className="absolute rounded-full"
          style={{
            width: "170%",
            height: "170%",
            top: "-35%",
            left: "-35%",
            background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)",
          }}
        />

        {/* Inner glow layer - brightest */}
        <div
          className="absolute rounded-full"
          style={{
            width: "140%",
            height: "140%",
            top: "-20%",
            left: "-20%",
            background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 60%)",
          }}
        />

        {/* Enhanced CSS Moon with more realistic texture */}
        <div
          className="w-full h-full rounded-full relative overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.95), rgba(235,235,240,0.85) 30%, rgba(220,220,225,0.8) 50%, rgba(210,210,215,0.8) 70%, rgba(200,200,205,0.75) 100%)",
            boxShadow: "inset -25px 15px 35px rgba(0,0,0,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          {/* Moon surface texture overlay */}
          <div
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 70% 70%, transparent 0%, rgba(0,0,0,0.03) 20%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.03) 60%, transparent 80%),
                               radial-gradient(circle at 30% 30%, transparent 0%, rgba(0,0,0,0.03) 20%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.03) 60%, transparent 80%)`,
            }}
          />

          {/* Large crater 1 */}
          <div
            className="absolute rounded-full"
            style={{
              width: "28%",
              height: "28%",
              top: "22%",
              left: "25%",
              background: "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.9), rgba(240,240,245,0.4) 70%)",
              boxShadow: "inset 3px 3px 5px rgba(0,0,0,0.15), inset -2px -2px 4px rgba(255,255,255,0.2)",
              opacity: 0.9,
            }}
          />

          {/* Large crater 2 */}
          <div
            className="absolute rounded-full"
            style={{
              width: "22%",
              height: "22%",
              top: "40%",
              left: "60%",
              background: "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.9), rgba(240,240,245,0.4) 70%)",
              boxShadow: "inset 3px 3px 5px rgba(0,0,0,0.15), inset -2px -2px 4px rgba(255,255,255,0.2)",
              opacity: 0.85,
            }}
          />

          {/* Medium crater 1 */}
          <div
            className="absolute rounded-full"
            style={{
              width: "18%",
              height: "18%",
              top: "65%",
              left: "35%",
              background: "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.9), rgba(240,240,245,0.4) 70%)",
              boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.15), inset -1px -1px 3px rgba(255,255,255,0.2)",
              opacity: 0.8,
            }}
          />

          {/* Medium crater 2 */}
          <div
            className="absolute rounded-full"
            style={{
              width: "15%",
              height: "15%",
              top: "30%",
              left: "70%",
              background: "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.9), rgba(240,240,245,0.4) 70%)",
              boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.15), inset -1px -1px 3px rgba(255,255,255,0.2)",
              opacity: 0.75,
            }}
          />

          {/* Small crater 1 */}
          <div
            className="absolute rounded-full"
            style={{
              width: "10%",
              height: "10%",
              top: "20%",
              left: "55%",
              background: "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.9), rgba(240,240,245,0.4) 70%)",
              boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.15), inset -1px -1px 2px rgba(255,255,255,0.2)",
              opacity: 0.7,
            }}
          />

          {/* Small crater 2 */}
          <div
            className="absolute rounded-full"
            style={{
              width: "8%",
              height: "8%",
              top: "50%",
              left: "25%",
              background: "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.9), rgba(240,240,245,0.4) 70%)",
              boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.15), inset -1px -1px 2px rgba(255,255,255,0.2)",
              opacity: 0.65,
            }}
          />

          {/* Small crater 3 */}
          <div
            className="absolute rounded-full"
            style={{
              width: "7%",
              height: "7%",
              top: "75%",
              left: "65%",
              background: "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.9), rgba(240,240,245,0.4) 70%)",
              boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.15), inset -1px -1px 2px rgba(255,255,255,0.2)",
              opacity: 0.6,
            }}
          />

          {/* Tiny craters */}
          <div
            className="absolute rounded-full"
            style={{
              width: "5%",
              height: "5%",
              top: "40%",
              left: "45%",
              background: "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.9), rgba(240,240,245,0.4) 70%)",
              boxShadow: "inset 1px 1px 1px rgba(0,0,0,0.15)",
              opacity: 0.5,
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: "4%",
              height: "4%",
              top: "60%",
              left: "15%",
              background: "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.9), rgba(240,240,245,0.4) 70%)",
              boxShadow: "inset 1px 1px 1px rgba(0,0,0,0.15)",
              opacity: 0.5,
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: "3%",
              height: "3%",
              top: "15%",
              left: "40%",
              background: "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.9), rgba(240,240,245,0.4) 70%)",
              boxShadow: "inset 1px 1px 1px rgba(0,0,0,0.15)",
              opacity: 0.5,
            }}
          />
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-3]"
        aria-hidden="true"
      />

      {dimensions.width > 0 && dimensions.height > 0 && (
        <ShootingStar width={dimensions.width} height={dimensions.height} />
      )}
    </>
  )
}

export default StarfieldBackground
