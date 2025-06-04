"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface NebulaEffectProps {
  width: number
  height: number
}

export const NebulaEffect: React.FC<NebulaEffectProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = width
    canvas.height = height

    // Create nebula clouds
    const nebulaClouds = Array.from({ length: 5 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 200 + 100,
      color: [
        `rgba(75, 0, 130, 0.05)`, // Indigo
        `rgba(138, 43, 226, 0.05)`, // BlueViolet
        `rgba(148, 0, 211, 0.05)`, // DarkViolet
        `rgba(186, 85, 211, 0.05)`, // MediumOrchid
        `rgba(218, 112, 214, 0.05)`, // Orchid
      ][Math.floor(Math.random() * 5)],
      vx: Math.random() * 0.2 - 0.1,
      vy: Math.random() * 0.2 - 0.1,
    }))

    // Animation loop
    const animate = () => {
      // Apply a subtle fade effect to the previous frame
      ctx.fillStyle = "rgba(0, 0, 0, 0.01)"
      ctx.fillRect(0, 0, width, height)

      // Draw and update nebula clouds
      nebulaClouds.forEach((cloud) => {
        // Move the cloud
        cloud.x += cloud.vx
        cloud.y += cloud.vy

        // Wrap around the screen
        if (cloud.x < -cloud.radius) cloud.x = width + cloud.radius
        if (cloud.x > width + cloud.radius) cloud.x = -cloud.radius
        if (cloud.y < -cloud.radius) cloud.y = height + cloud.radius
        if (cloud.y > height + cloud.radius) cloud.y = -cloud.radius

        // Draw the cloud
        const gradient = ctx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, cloud.radius)
        gradient.addColorStop(0, cloud.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      // Cleanup
    }
  }, [width, height])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
      aria-hidden="true"
    />
  )
}
