"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function CardArtBanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = window.innerWidth
    canvas.height = 300

    // Create a purple gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "rgba(88, 28, 135, 0.8)") // Dark purple
    gradient.addColorStop(0.5, "rgba(147, 51, 234, 0.7)") // Medium purple
    gradient.addColorStop(1, "rgba(192, 132, 252, 0.6)") // Light purple

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add some mystical particle effects
    const particles = []
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
      })
    }

    // Animation function
    const animate = () => {
      // Fade the background slightly
      ctx.fillStyle = "rgba(0, 0, 0, 0.02)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Redraw the gradient occasionally
      if (Math.random() < 0.05) {
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      {/* Floating cards effect */}
      <div className="relative z-10 w-full h-full">
        <motion.div
          className="absolute w-32 h-48 rounded-lg shadow-lg transform -rotate-12"
          style={{
            background: "url(/cards/01cauldron-fire.jpg) center/cover",
            top: "50px",
            left: "15%",
          }}
          animate={{
            y: [0, -10, 0],
            rotate: [-12, -8, -12],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute w-32 h-48 rounded-lg shadow-lg transform rotate-6"
          style={{
            background: "url(/cards/38cord-spirit.jpg) center/cover",
            top: "80px",
            left: "45%",
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [6, 10, 6],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        <motion.div
          className="absolute w-32 h-48 rounded-lg shadow-lg transform -rotate-5"
          style={{
            background: "url(/cards/25sword-water.jpg) center/cover",
            top: "60px",
            right: "15%",
          }}
          animate={{
            y: [0, -12, 0],
            rotate: [-5, -2, -5],
          }}
          transition={{
            duration: 4.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 w-full text-center pb-6 z-20">
        <h2 className="text-3xl font-bold text-white">Discover Your Mystical Path</h2>
        <p className="text-purple-200 mt-2">Explore the wisdom of the cards and unlock your potential</p>
      </div>
    </div>
  )
}
