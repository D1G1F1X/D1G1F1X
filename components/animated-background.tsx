"use client"

import { useEffect, useRef, useState } from "react"

// Enhanced cloud interface for realistic cumulus clouds
interface Cloud {
  x: number
  y: number
  scale: number
  speed: number
  opacity: number
  seed: number
  puffs: Array<{
    x: number
    y: number
    r: number
    offsetX: number
    offsetY: number
  }>
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  opacity: number
  active: boolean
  duration: number
  elapsed: number
}

interface DigitalParticle {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  pulse: number
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isSunLogoLoaded, setIsSunLogoLoaded] = useState(false)
  const [isMoonLogoLoaded, setIsMoonLogoLoaded] = useState(false)
  const sunLogoRef = useRef<HTMLImageElement | null>(null)
  const moonLogoRef = useRef<HTMLImageElement | null>(null)
  const logoOriginalWidth = useRef<number>(0)
  const logoOriginalHeight = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Load the logo images - use Blob URLs if available or fallback to local paths
    const sunLogo = new Image()
    sunLogoRef.current = sunLogo
    sunLogo.crossOrigin = "anonymous"
    // Try Blob URL first, then fallback to local path
    sunLogo.src = "/images/logo-bulb.png"
    sunLogo.onload = () => {
      console.log("Sun logo loaded successfully")
      logoOriginalWidth.current = sunLogo.naturalWidth
      logoOriginalHeight.current = sunLogo.naturalHeight
      setIsSunLogoLoaded(true)
    }

    const moonLogo = new Image()
    moonLogoRef.current = moonLogo
    moonLogo.crossOrigin = "anonymous"
    // Try Blob URL first, then fallback to local path
    moonLogo.src = "/images/logo-bulb.png"
    moonLogo.onload = () => {
      console.log("Moon logo loaded successfully")
      logoOriginalWidth.current = moonLogo.naturalWidth
      logoOriginalHeight.current = moonLogo.naturalHeight
      setIsMoonLogoLoaded(true)
    }

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Sky colors for different times of day
    const skyColors = [
      { time: 0, color: [10, 10, 35] }, // Night
      { time: 5, color: [40, 50, 80] }, // Dawn
      { time: 7, color: [135, 206, 235] }, // Morning
      { time: 12, color: [100, 155, 255] }, // Noon
      { time: 17, color: [255, 140, 100] }, // Sunset
      { time: 19, color: [70, 70, 130] }, // Dusk
      { time: 21, color: [20, 20, 50] }, // Night
      { time: 24, color: [10, 10, 35] }, // Night (loop back)
    ]

    // Generate realistic cumulus clouds with randomized puffs
    const clouds: Cloud[] = []
    const generateClouds = () => {
      clouds.length = 0
      if (canvas) {
        const cloudCount = 4 + Math.floor(Math.random() * 3) // 4-6 clouds for a cleaner sky

        for (let i = 0; i < cloudCount; i++) {
          const puffCount = 8 + Math.floor(Math.random() * 5) // 8-12 puffs per cloud
          const puffs = []

          // Generate randomized puff positions for natural cloud shapes
          for (let j = 0; j < puffCount; j++) {
            const angle = (j / puffCount) * Math.PI * 2
            const distance = 20 + Math.random() * 40
            const baseX = Math.cos(angle) * distance
            const baseY = Math.sin(angle) * distance * 0.6 // Flatten vertically

            puffs.push({
              x: baseX + (Math.random() - 0.5) * 30,
              y: baseY + (Math.random() - 0.5) * 20,
              r: 15 + Math.random() * 25,
              offsetX: (Math.random() - 0.5) * 10,
              offsetY: (Math.random() - 0.5) * 10,
            })
          }

          // Add some central puffs for volume
          for (let j = 0; j < 2 + Math.floor(Math.random() * 2); j++) {
            puffs.push({
              x: (Math.random() - 0.5) * 40,
              y: (Math.random() - 0.5) * 30,
              r: 20 + Math.random() * 30,
              offsetX: 0,
              offsetY: 0,
            })
          }

          clouds.push({
            x: Math.random() * (canvas.width + 600) - 300,
            y: 50 + Math.random() * (canvas.height * 0.3), // Keep clouds higher in the sky
            scale: 0.5 + Math.random() * 0.8, // Slightly smaller clouds
            speed: 0.006 + Math.random() * 0.015, // Slower for more realistic movement
            opacity: 0.25 + Math.random() * 0.35, // Slightly more transparent
            seed: Math.random() * 1000,
            puffs: puffs,
          })
        }
      }
    }

    generateClouds()
    window.addEventListener("resize", generateClouds)

    // Stars
    const stars: { x: number; y: number; size: number; opacity: number }[] = []
    const generateStars = () => {
      stars.length = 0
      if (canvas) {
        const starCount = Math.floor((canvas.width * canvas.height) / 5000)
        for (let i = 0; i < starCount; i++) {
          stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.8 + 0.2,
          })
        }
      }
    }

    generateStars()
    window.addEventListener("resize", generateStars)

    // Shooting stars
    const shootingStars: ShootingStar[] = []
    const digitalParticles: DigitalParticle[] = []
    const maxShootingStars = 5
    const shootingStarProbability = 0.003 // Chance of a new shooting star per frame

    const createShootingStar = () => {
      if (shootingStars.length >= maxShootingStars) return

      // Find an inactive star slot or add a new one
      let star: ShootingStar | undefined = shootingStars.find((s) => !s.active)

      if (!star) {
        star = {
          x: Math.random() * canvas!.width,
          y: Math.random() * (canvas!.height * 0.5),
          length: 50 + Math.random() * 100,
          speed: 5 + Math.random() * 15,
          angle: Math.PI / 4 + (Math.random() * Math.PI) / 2, // Angle between 45 and 135 degrees
          opacity: 0.7 + Math.random() * 0.3,
          active: true,
          duration: 1000 + Math.random() * 1000, // 1-2 seconds
          elapsed: 0,
        }
        shootingStars.push(star)
      } else {
        star.x = Math.random() * canvas!.width
        star.y = Math.random() * (canvas!.height * 0.5)
        star.length = 50 + Math.random() * 100
        star.speed = 5 + Math.random() * 15
        star.angle = Math.PI / 4 + (Math.random() * Math.PI) / 2
        star.opacity = 0.7 + Math.random() * 0.3
        star.active = true
        star.duration = 1000 + Math.random() * 1000
        star.elapsed = 0
      }
    }

    const updateShootingStars = (deltaTime: number) => {
      shootingStars.forEach((star) => {
        if (!star.active) return

        star.elapsed += deltaTime
        if (star.elapsed >= star.duration) {
          star.active = false
          return
        }

        // Calculate progress (0 to 1)
        const progress = star.elapsed / star.duration

        // Move the star
        star.x += Math.cos(star.angle) * star.speed
        star.y += Math.sin(star.angle) * star.speed

        // Fade out near the end
        if (progress > 0.7) {
          star.opacity = 0.7 * (1 - (progress - 0.7) / 0.3)
        }
      })
    }

    const drawShootingStars = (ctx: CanvasRenderingContext2D) => {
      shootingStars.forEach((star) => {
        if (!star.active) return

        const tailX = star.x - Math.cos(star.angle) * star.length
        const tailY = star.y - Math.sin(star.angle) * star.length

        // Create gradient for the tail
        const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY)
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`)
        gradient.addColorStop(0.3, `rgba(200, 220, 255, ${star.opacity * 0.6})`)
        gradient.addColorStop(1, "rgba(200, 220, 255, 0)")

        ctx.beginPath()
        ctx.moveTo(star.x, star.y)
        ctx.lineTo(tailX, tailY)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw the star head
        ctx.beginPath()
        ctx.arc(star.x, star.y, 1, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()
      })
    }

    const drawDigitalHorizon = (ctx: CanvasRenderingContext2D, timeOfDay: number) => {
      if (!canvas) return

      // Horizon line position - about 70% down the canvas
      const horizonY = canvas.height * 0.7

      // Create gradient for the horizon glow
      const horizonGlow = ctx.createLinearGradient(0, horizonY - 20, 0, horizonY + 20)

      // Color based on time of day
      let horizonColor
      if (timeOfDay < 5 || timeOfDay > 19) {
        // Night - blue glow
        horizonColor = [20, 80, 170]
        horizonGlow.addColorStop(0, `rgba(${horizonColor[0]}, ${horizonColor[1]}, ${horizonColor[2]}, 0)`)
        horizonGlow.addColorStop(0.5, `rgba(${horizonColor[0]}, ${horizonColor[1]}, ${horizonColor[2]}, 0.15)`)
        horizonGlow.addColorStop(1, `rgba(${horizonColor[0]}, ${horizonColor[1]}, ${horizonColor[2]}, 0)`)
      } else if (timeOfDay >= 5 && timeOfDay < 7) {
        // Dawn - purple/pink glow
        const progress = (timeOfDay - 5) / 2
        horizonColor = [
          Math.round(20 + progress * 235), // 20 to 255
          Math.round(80 + progress * 100), // 80 to 180
          Math.round(170 - progress * 70), // 170 to 100
        ]
        horizonGlow.addColorStop(0, `rgba(${horizonColor[0]}, ${horizonColor[1]}, ${horizonColor[2]}, 0)`)
        horizonGlow.addColorStop(0.5, `rgba(${horizonColor[0]}, ${horizonColor[1]}, ${horizonColor[2]}, 0.2)`)
        horizonGlow.addColorStop(1, `rgba(${horizonColor[0]}, ${horizonColor[1]}, ${horizonColor[2]}, 0)`)
      } else if (timeOfDay >= 7 && timeOfDay < 17) {
        // Day - cyan glow
        horizonColor = [0, 180, 230]
        horizonGlow.addColorStop(0, `rgba(${horizonColor[0]}, ${horizonColor[1]}, ${horizonColor[2]}, 0)`)
        horizonGlow.addColorStop(0.5, `rgba(${horizonColor[0]}, ${horizonColor[1]}, ${horizonColor[2]}, 0.15)`)
        horizonGlow.addColorStop(1, `rgba(${horizonColor[0]}, ${horizonColor[1]}, ${horizonColor[2]}, 0)`)
      } else {
        // Sunset - orange/red glow
        const progress = (timeOfDay - 17) / 2
        horizonColor = [
          255,
          Math.round(180 - progress * 100), // 180 to 80
          Math.round(100 - progress * 70), // 100 to 30
        ]
        horizonGlow.addColorStop(0, `rgba(${horizonColor[0]}, ${horizonColor[1]}, ${horizonColor[2]}, 0)`)
        horizonGlow.addColorStop(0.5, `rgba(${horizonColor[0]}, ${horizonColor[1]}, ${horizonColor[2]}, 0.2)`)
        horizonGlow.addColorStop(1, `rgba(${horizonColor[0]}, ${horizonColor[1]}, ${horizonColor[2]}, 0)`)
      }

      // Draw the horizon glow
      ctx.fillStyle = horizonGlow
      ctx.fillRect(0, horizonY - 20, canvas.width, 40)

      // Draw digital grid lines on the horizon
      ctx.strokeStyle = `rgba(${horizonColor[0]}, ${horizonColor[1]}, ${horizonColor[2]}, 0.3)`
      ctx.lineWidth = 1

      // Vertical grid lines
      const gridSpacing = 50
      const gridCount = Math.ceil(canvas.width / gridSpacing)

      for (let i = 0; i < gridCount; i++) {
        const x = i * gridSpacing

        // Vary the height based on a sine wave for a city skyline effect
        const heightVariation = Math.sin(i * 0.5) * 20 + Math.sin(i * 0.2) * 15 + Math.random() * 10
        const lineHeight = 20 + heightVariation

        ctx.beginPath()
        ctx.moveTo(x, horizonY)
        ctx.lineTo(x, horizonY - lineHeight)
        ctx.stroke()

        // Add some horizontal connectors for a circuit-like appearance
        if (i < gridCount - 1 && Math.random() > 0.7) {
          const nextHeight = 20 + Math.sin((i + 1) * 0.5) * 20 + Math.sin((i + 1) * 0.2) * 15 + Math.random() * 10
          const connectionY = horizonY - Math.min(lineHeight, nextHeight) * Math.random()

          ctx.beginPath()
          ctx.moveTo(x, connectionY)
          ctx.lineTo(x + gridSpacing, connectionY)
          ctx.stroke()
        }
      }

      // Draw the main horizon line
      ctx.beginPath()
      ctx.moveTo(0, horizonY)
      ctx.lineTo(canvas.width, horizonY)
      ctx.strokeStyle = `rgba(${horizonColor[0]}, ${horizonColor[1]}, ${horizonColor[2]}, 0.5)`
      ctx.lineWidth = 2
      ctx.stroke()

      // Add data pulse effects along the horizon
      const pulseCount = 3
      for (let i = 0; i < pulseCount; i++) {
        const pulsePosition = (Date.now() / 1000 + i * 1000) % canvas.width

        const pulseGradient = ctx.createRadialGradient(pulsePosition, horizonY, 0, pulsePosition, horizonY, 100)

        pulseGradient.addColorStop(0, `rgba(${horizonColor[0]}, ${horizonColor[1]}, ${horizonColor[2]}, 0.4)`)
        pulseGradient.addColorStop(0.5, `rgba(${horizonColor[0]}, ${horizonColor[1]}, ${horizonColor[2]}, 0.1)`)
        pulseGradient.addColorStop(1, `rgba(${horizonColor[0]}, ${horizonColor[1]}, ${horizonColor[2]}, 0)`)

        ctx.fillStyle = pulseGradient
        ctx.fillRect(pulsePosition - 100, horizonY - 20, 200, 40)
      }
    }

    const drawDigitalParticles = (ctx: CanvasRenderingContext2D, timeOfDay: number, deltaTime: number) => {
      if (!canvas) return

      // Initialize particles if they don't exist
      if (!digitalParticles.length) {
        for (let i = 0; i < 50; i++) {
          digitalParticles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * 0.7, // Keep above horizon
            size: 0.5 + Math.random() * 1.5,
            speed: 0.02 + Math.random() * 0.08,
            opacity: 0.3 + Math.random() * 0.7,
            pulse: Math.random() * Math.PI * 2, // Random starting phase
          })
        }
      }

      // Determine particle color based on time of day
      let particleColor
      if (timeOfDay < 5 || timeOfDay > 19) {
        // Night - blue particles
        particleColor = [100, 150, 255]
      } else if (timeOfDay >= 5 && timeOfDay < 7) {
        // Dawn - transition from blue to cyan
        const progress = (timeOfDay - 5) / 2
        particleColor = [
          Math.round(100 + progress * 50), // 100 to 150
          Math.round(150 + progress * 50), // 150 to 200
          Math.round(255 - progress * 55), // 255 to 200
        ]
      } else if (timeOfDay >= 7 && timeOfDay < 17) {
        // Day - cyan particles
        particleColor = [150, 200, 200]
      } else {
        // Sunset/dusk - transition from cyan to blue
        const progress = (timeOfDay - 17) / 3
        particleColor = [
          Math.round(150 - progress * 50), // 150 to 100
          Math.round(200 - progress * 50), // 200 to 150
          Math.round(200 + progress * 55), // 200 to 255
        ]
      }

      // Update and draw particles
      digitalParticles.forEach((particle) => {
        // Move particles upward slowly
        particle.y -= particle.speed * deltaTime

        // Reset particles that go off-screen
        if (particle.y < 0) {
          particle.y = canvas.height * 0.7
          particle.x = Math.random() * canvas.width
        }

        // Pulse the opacity for a data-like effect
        particle.pulse += 0.01
        const pulseFactor = (Math.sin(particle.pulse) + 1) / 2 // 0 to 1
        const finalOpacity = particle.opacity * pulseFactor

        // Draw the particle
        ctx.fillStyle = `rgba(${particleColor[0]}, ${particleColor[1]}, ${particleColor[2]}, ${finalOpacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Occasionally draw connecting lines between nearby particles
        if (Math.random() > 0.99) {
          const nearbyParticles = digitalParticles
            .filter((p) => p !== particle && Math.abs(p.x - particle.x) < 100 && Math.abs(p.y - particle.y) < 100)
            .slice(0, 2)

          nearbyParticles.forEach((nearbyParticle) => {
            const distance = Math.sqrt(
              Math.pow(nearbyParticle.x - particle.x, 2) + Math.pow(nearbyParticle.y - particle.y, 2),
            )

            const lineOpacity = Math.max(0, 0.5 - distance / 200) * finalOpacity

            ctx.strokeStyle = `rgba(${particleColor[0]}, ${particleColor[1]}, ${particleColor[2]}, ${lineOpacity})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(nearbyParticle.x, nearbyParticle.y)
            ctx.stroke()
          })
        }
      })
    }

    // Interpolate between colors
    const interpolateColor = (time: number) => {
      let startIndex = 0
      for (let i = 0; i < skyColors.length - 1; i++) {
        if (time >= skyColors[i].time && time < skyColors[i + 1].time) {
          startIndex = i
          break
        }
      }

      const startColor = skyColors[startIndex]
      const endColor = skyColors[startIndex + 1]
      const factor = (time - startColor.time) / (endColor.time - startColor.time)

      const r = Math.floor(startColor.color[0] + factor * (endColor.color[0] - startColor.color[0]))
      const g = Math.floor(startColor.color[1] + factor * (endColor.color[1] - startColor.color[1]))
      const b = Math.floor(startColor.color[2] + factor * (endColor.color[2] - startColor.color[2]))

      return `rgb(${r}, ${g}, ${b})`
    }

    // Enhanced realistic cumulus cloud drawing
    const drawRealisticCumulusCloud = (cloud: Cloud, timeOfDay: number) => {
      if (!ctx || !canvas) return

      ctx.save()
      ctx.translate(cloud.x, cloud.y)
      ctx.scale(cloud.scale, cloud.scale)

      // Dynamic cloud colors based on time of day
      let baseColor = { r: 255, g: 255, b: 255 }
      let shadowColor = { r: 200, g: 200, b: 210 }
      let highlightColor = { r: 255, g: 255, b: 255 }

      if (timeOfDay >= 5 && timeOfDay < 6) {
        // Early dawn - purple/pink tints
        const factor = timeOfDay - 5
        baseColor = {
          r: 240 + factor * 15,
          g: 230 + factor * 10,
          b: 245,
        }
        shadowColor = {
          r: 220 + factor * 20,
          g: 180 + factor * 20,
          b: 220,
        }
        highlightColor = {
          r: 255,
          g: 240 + factor * 10,
          b: 250,
        }
      } else if (timeOfDay >= 6 && timeOfDay < 7) {
        // Dawn - pink/orange tints
        const factor = timeOfDay - 6
        baseColor = {
          r: 255,
          g: 240 + factor * 10,
          b: 245 - factor * 15,
        }
        shadowColor = {
          r: 240,
          g: 200 + factor * 20,
          b: 220 - factor * 20,
        }
        highlightColor = {
          r: 255,
          g: 250,
          b: 250 - factor * 20,
        }
      } else if (timeOfDay >= 7 && timeOfDay < 17) {
        // Day - white with slight blue tint
        const midday = 12
        const distFromMidday = Math.abs(timeOfDay - midday) / 5
        const blueTint = 10 * (1 - distFromMidday)
        baseColor = {
          r: 255,
          g: 255,
          b: 255,
        }
        shadowColor = {
          r: 200,
          g: 200,
          b: 210 + blueTint,
        }
        highlightColor = {
          r: 255,
          g: 255,
          b: 255,
        }
      } else if (timeOfDay >= 17 && timeOfDay < 18) {
        // Early sunset - golden tints
        const factor = timeOfDay - 17
        baseColor = {
          r: 255,
          g: 250 - factor * 5,
          b: 240 - factor * 10,
        }
        shadowColor = {
          r: 245,
          g: 220 - factor * 10,
          b: 200 - factor * 20,
        }
        highlightColor = {
          r: 255,
          g: 255 - factor * 5,
          b: 250 - factor * 10,
        }
      } else if (timeOfDay >= 18 && timeOfDay < 19) {
        // Sunset - orange/red tints
        const factor = timeOfDay - 18
        baseColor = {
          r: 255,
          g: 245 - factor * 15,
          b: 230 - factor * 30,
        }
        shadowColor = {
          r: 245,
          g: 210 - factor * 30,
          b: 180 - factor * 30,
        }
        highlightColor = {
          r: 255,
          g: 255 - factor * 25,
          b: 240 - factor * 40,
        }
      } else if (timeOfDay >= 19 && timeOfDay < 20) {
        // Dusk - purple/blue transition
        const factor = timeOfDay - 19
        baseColor = {
          r: 230 - factor * 10,
          g: 230 - factor * 5,
          b: 240,
        }
        shadowColor = {
          r: 180 - factor * 20,
          g: 190 + factor * 5,
          b: 210,
        }
        highlightColor = {
          r: 240 - factor * 10,
          g: 240 - factor * 5,
          b: 250,
        }
      } else if (timeOfDay < 5 || timeOfDay >= 20) {
        // Night - blue/purple tints
        baseColor = {
          r: 220,
          g: 225,
          b: 240,
        }
        shadowColor = {
          r: 180,
          g: 185,
          b: 210,
        }
        highlightColor = {
          r: 230,
          g: 235,
          b: 250,
        }
      }

      // Adjust opacity based on time of day
      const dayOpacity = cloud.opacity
      const nightOpacity = cloud.opacity * 0.5
      const opacity = timeOfDay < 6 || timeOfDay > 18 ? nightOpacity : dayOpacity

      // Draw shadow layer first (larger and offset)
      cloud.puffs.forEach((puff, index) => {
        const shadowOffset = 5 + index * 0.5
        const gradient = ctx.createRadialGradient(
          puff.x + shadowOffset,
          puff.y + shadowOffset,
          0,
          puff.x + shadowOffset,
          puff.y + shadowOffset,
          puff.r * 1.2,
        )
        gradient.addColorStop(0, `rgba(${shadowColor.r}, ${shadowColor.g}, ${shadowColor.b}, ${opacity * 0.3})`)
        gradient.addColorStop(0.5, `rgba(${shadowColor.r}, ${shadowColor.g}, ${shadowColor.b}, ${opacity * 0.2})`)
        gradient.addColorStop(1, `rgba(${shadowColor.r}, ${shadowColor.g}, ${shadowColor.b}, 0)`)

        ctx.beginPath()
        ctx.arc(puff.x + shadowOffset, puff.y + shadowOffset, puff.r * 1.2, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw main cloud puffs with multiple layers for depth
      cloud.puffs.forEach((puff, index) => {
        // Base layer
        const baseGradient = ctx.createRadialGradient(puff.x, puff.y, 0, puff.x, puff.y, puff.r)
        baseGradient.addColorStop(0, `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${opacity})`)
        baseGradient.addColorStop(0.6, `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${opacity * 0.9})`)
        baseGradient.addColorStop(1, `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${opacity * 0.1})`)

        ctx.beginPath()
        ctx.arc(puff.x, puff.y, puff.r, 0, Math.PI * 2)
        ctx.fillStyle = baseGradient
        ctx.fill()

        // Add subtle inner glow for volume
        const innerGlow = ctx.createRadialGradient(
          puff.x - puff.r * 0.3,
          puff.y - puff.r * 0.3,
          0,
          puff.x - puff.r * 0.3,
          puff.y - puff.r * 0.3,
          puff.r * 0.7,
        )
        innerGlow.addColorStop(
          0,
          `rgba(${highlightColor.r}, ${highlightColor.g}, ${highlightColor.b}, ${opacity * 0.4})`,
        )
        innerGlow.addColorStop(1, `rgba(${highlightColor.r}, ${highlightColor.g}, ${highlightColor.b}, 0)`)

        ctx.beginPath()
        ctx.arc(puff.x - puff.r * 0.3, puff.y - puff.r * 0.3, puff.r * 0.7, 0, Math.PI * 2)
        ctx.fillStyle = innerGlow
        ctx.fill()
      })

      // Add wispy edges for more realism
      cloud.puffs.forEach((puff, index) => {
        if (index % 3 === 0) {
          // Only on some puffs
          const wisps = 3 + Math.floor((cloud.seed * index) % 3)
          for (let w = 0; w < wisps; w++) {
            const wispAngle = (w / wisps) * Math.PI * 2 + cloud.seed
            const wispX = puff.x + Math.cos(wispAngle) * puff.r * 1.2
            const wispY = puff.y + Math.sin(wispAngle) * puff.r * 0.8
            const wispR = puff.r * 0.3

            const wispGradient = ctx.createRadialGradient(wispX, wispY, 0, wispX, wispY, wispR)
            wispGradient.addColorStop(0, `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${opacity * 0.2})`)
            wispGradient.addColorStop(1, `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 0)`)

            ctx.beginPath()
            ctx.arc(wispX, wispY, wispR, 0, Math.PI * 2)
            ctx.fillStyle = wispGradient
            ctx.fill()
          }
        }
      })

      ctx.restore()
    }

    const updateClouds = (deltaTime: number) => {
      clouds.forEach((cloud) => {
        // Base horizontal movement
        cloud.x += cloud.speed * deltaTime

        // Parallax effect - clouds at different heights move at slightly different speeds
        const parallaxFactor = 0.7 + (cloud.y / (canvas!.height * 0.35)) * 0.3
        cloud.x += cloud.speed * deltaTime * (parallaxFactor - 1)

        // Slight vertical drift for more natural movement
        cloud.y += Math.sin(cloud.x * 0.001 + cloud.seed) * 0.05

        if (cloud.x > canvas!.width + 400) {
          cloud.x = -400
          cloud.y = 50 + Math.random() * (canvas!.height * 0.3)
          cloud.seed = Math.random() * 1000
        }
      })
    }

    // Animation variables
    let animationFrameId: number
    let lastTime = 0
    const cycleDuration = 240000 // 4 minutes for a full day cycle (slower)
    const startTime = Date.now()
    // Set animation start time if not already set
    if (!(window as any).animationStartTime) {
      ;(window as any).animationStartTime = startTime
    }

    // Draw function
    const draw = (timestamp: number) => {
      if (!ctx || !canvas) return

      const deltaTime = timestamp - lastTime
      lastTime = timestamp

      const elapsed = (Date.now() - ((window as any).animationStartTime || startTime)) % cycleDuration
      const timeOfDay = (elapsed / cycleDuration) * 24

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw gradient background
      const skyColor = interpolateColor(timeOfDay)
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, skyColor)
      gradient.addColorStop(1, "rgba(10, 10, 35, 0.8)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars (visible at night)
      if (timeOfDay < 6 || timeOfDay > 18) {
        const starOpacityFactor = timeOfDay < 6 ? 1 - timeOfDay / 6 : (timeOfDay - 18) / 6

        ctx.fillStyle = "white"
        stars.forEach((star) => {
          ctx.globalAlpha = star.opacity * starOpacityFactor
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
          ctx.fill()
        })
        ctx.globalAlpha = 1
      }

      // Randomly create shooting stars at night
      if ((timeOfDay < 6 || timeOfDay > 18) && Math.random() < shootingStarProbability) {
        createShootingStar()
      }

      // Update and draw shooting stars
      updateShootingStars(deltaTime)
      if (timeOfDay < 6 || timeOfDay > 18) {
        drawShootingStars(ctx)
      }

      // Update and draw clouds
      updateClouds(deltaTime)
      clouds.forEach((cloud) => drawRealisticCumulusCloud(cloud, timeOfDay))

      // Draw digital horizon
      drawDigitalHorizon(ctx, timeOfDay)

      // Draw digital particles
      drawDigitalParticles(ctx, timeOfDay, deltaTime)

      // Draw sun and moon logos with slower animation and pause 50px below header
      const logoSize = Math.min(canvas.width, canvas.height) * 0.15
      const x = canvas.width / 2

      // Sun animation with pause 50px below header
      if (sunLogoRef.current && timeOfDay >= 5 && timeOfDay <= 19) {
        let sunY
        let sunOpacity = 1.0

        // Header height (approx 80px) plus 50px
        const headerOffset = 135

        const sunDuration = 14 // Total hours for sun visibility (5-19)
        const pauseDuration = 2 // Hours to pause below header
        const moveDuration = (sunDuration - pauseDuration) / 2 // Time for each movement phase

        if (timeOfDay >= 5 && timeOfDay < 6) {
          // Sun entering from bottom
          const progress = (timeOfDay - 5) / 1
          sunY = canvas.height - progress * (canvas.height * 0.3)
          sunOpacity = progress
        } else if (timeOfDay >= 6 && timeOfDay < 6 + moveDuration) {
          // Sun rising to below header position
          const progress = (timeOfDay - 6) / moveDuration
          // Rise from 70% height to header position
          sunY = canvas.height * 0.7 - progress * (canvas.height * 0.7 - headerOffset)
          sunOpacity = 1.0
        } else if (timeOfDay >= 6 + moveDuration && timeOfDay < 6 + moveDuration + pauseDuration) {
          // Sun paused 50px below header
          sunY = headerOffset
          sunOpacity = 1.0
        } else if (timeOfDay >= 6 + moveDuration + pauseDuration && timeOfDay < 18) {
          // Sun continuing upward and exiting
          const progress = (timeOfDay - (6 + moveDuration + pauseDuration)) / moveDuration
          sunY = headerOffset - progress * (headerOffset + logoSize)
          sunOpacity = 1.0

          // Fade out as it exits
          if (progress > 0.6) {
            sunOpacity = 1 - (progress - 0.6) * 2.5
          }
        } else {
          sunOpacity = 0
        }

        if (sunOpacity > 0) {
          const sunGlowRadius = logoSize * 1.5
          const sunGlow = ctx.createRadialGradient(x, sunY, logoSize * 0.4, x, sunY, sunGlowRadius)

          if (timeOfDay < 8) {
            sunGlow.addColorStop(0, `rgba(255, 200, 100, ${0.8 * sunOpacity})`)
            sunGlow.addColorStop(1, `rgba(255, 200, 100, 0)`)
          } else if (timeOfDay > 16) {
            sunGlow.addColorStop(0, `rgba(255, 140, 50, ${0.8 * sunOpacity})`)
            sunGlow.addColorStop(1, `rgba(255, 140, 50, 0)`)
          } else {
            sunGlow.addColorStop(0, `rgba(255, 255, 200, ${0.8 * sunOpacity})`)
            sunGlow.addColorStop(1, `rgba(255, 255, 200, 0)`)
          }

          ctx.fillStyle = sunGlow
          ctx.beginPath()
          ctx.arc(x, sunY, sunGlowRadius, 0, Math.PI * 2)
          ctx.fill()

          try {
            ctx.globalAlpha = sunOpacity

            // Calculate dimensions to maintain aspect ratio
            let drawWidth = logoSize
            let drawHeight = logoSize

            if (logoOriginalWidth.current && logoOriginalHeight.current) {
              const aspectRatio = logoOriginalWidth.current / logoOriginalHeight.current
              if (aspectRatio > 1) {
                // Wider than tall
                drawHeight = logoSize / aspectRatio
              } else {
                // Taller than wide
                drawWidth = logoSize * aspectRatio
              }
            }

            ctx.drawImage(sunLogoRef.current, x - drawWidth / 2, sunY - drawHeight / 2, drawWidth, drawHeight)
            ctx.globalAlpha = 1.0
          } catch (error) {
            console.warn("Could not draw sun logo:", error)
          }
        }
      }

      // Moon animation with pause 50px below header
      if (moonLogoRef.current && (timeOfDay >= 18 || timeOfDay <= 7)) {
        let moonY
        let moonOpacity = 1.0

        // Header height (approx 80px) plus 50px
        const headerOffset = 135

        const moonStart = 18
        const moonEnd = 7
        const moonDuration = 24 - moonStart + moonEnd // Total hours for moon
        const pauseDuration = 2 // Hours to pause below header
        const moveDuration = (moonDuration - pauseDuration) / 2

        const adjustedTime = timeOfDay >= 18 ? timeOfDay - 18 : timeOfDay + 6

        if (adjustedTime < 1) {
          // Moon entering from bottom
          const progress = adjustedTime
          moonY = canvas.height - progress * (canvas.height * 0.3)
          moonOpacity = progress
        } else if (adjustedTime >= 1 && adjustedTime < 1 + moveDuration) {
          // Moon rising to below header position
          const progress = (adjustedTime - 1) / moveDuration
          // Rise from 70% height to header position
          moonY = canvas.height * 0.7 - progress * (canvas.height * 0.7 - headerOffset)
          moonOpacity = 1.0
        } else if (adjustedTime >= 1 + moveDuration && adjustedTime < 1 + moveDuration + pauseDuration) {
          // Moon paused 50px below header
          moonY = headerOffset
          moonOpacity = 1.0
        } else if (adjustedTime >= 1 + moveDuration + pauseDuration && adjustedTime < moonDuration - 1) {
          // Moon continuing upward and exiting
          const progress = (adjustedTime - (1 + moveDuration + pauseDuration)) / moveDuration
          moonY = headerOffset - progress * (headerOffset + logoSize)
          moonOpacity = 1.0

          // Fade out as it exits
          if (progress > 0.6) {
            moonOpacity = 1 - (progress - 0.6) * 2.5
          }
        } else {
          moonOpacity = 0
        }

        if (moonOpacity > 0) {
          const moonGlowRadius = logoSize * 1.2
          const moonGlow = ctx.createRadialGradient(x, moonY, logoSize * 0.4, x, moonY, moonGlowRadius)
          moonGlow.addColorStop(0, `rgba(200, 220, 255, ${0.6 * moonOpacity})`)
          moonGlow.addColorStop(1, `rgba(200, 220, 255, 0)`)

          ctx.fillStyle = moonGlow
          ctx.beginPath()
          ctx.arc(x, moonY, moonGlowRadius, 0, Math.PI * 2)
          ctx.fill()

          try {
            ctx.globalAlpha = moonOpacity
            ctx.globalCompositeOperation = "source-over"

            // Calculate dimensions to maintain aspect ratio
            let drawWidth = logoSize
            let drawHeight = logoSize

            if (logoOriginalWidth.current && logoOriginalHeight.current) {
              const aspectRatio = logoOriginalWidth.current / logoOriginalHeight.current
              if (aspectRatio > 1) {
                // Wider than tall
                drawHeight = logoSize / aspectRatio
              } else {
                // Taller than wide
                drawWidth = logoSize * aspectRatio
              }
            }

            ctx.drawImage(moonLogoRef.current, x - drawWidth / 2, moonY - drawHeight / 2, drawWidth, drawHeight)

            // Apply the blue tint effect
            ctx.globalCompositeOperation = "color"
            ctx.fillStyle = "rgba(180, 200, 255, 0.3)"
            ctx.fillRect(x - drawWidth / 2, moonY - drawHeight / 2, drawWidth, drawHeight)

            ctx.globalCompositeOperation = "source-over"
            ctx.globalAlpha = 1.0
          } catch (error) {
            console.warn("Could not draw moon logo:", error)
          }
        }
      }

      // Add subtle noise texture
      if (canvas.width > 0 && canvas.height > 0) {
        try {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const data = imageData.data
          for (let i = 0; i < data.length; i += 4) {
            const noise = Math.random() * 10 - 5
            data[i] = Math.max(0, Math.min(255, data[i] + noise))
            data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise))
            data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise))
          }
          ctx.putImageData(imageData, 0, 0)
        } catch (error) {
          console.warn("Could not apply noise texture:", error)
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    animationFrameId = requestAnimationFrame(draw)

    sunLogo.onerror = (error) => {
      console.error("Error loading sun logo:", error)
      // Create a simple sun circle as fallback
      const fallbackCanvas = document.createElement("canvas")
      fallbackCanvas.width = 100
      fallbackCanvas.height = 100
      const fallbackCtx = fallbackCanvas.getContext("2d")
      if (fallbackCtx) {
        // Draw a yellow circle with gradient
        const gradient = fallbackCtx.createRadialGradient(50, 50, 10, 50, 50, 40)
        gradient.addColorStop(0, "#FFFF80")
        gradient.addColorStop(1, "#FFCC00")
        fallbackCtx.fillStyle = gradient
        fallbackCtx.beginPath()
        fallbackCtx.arc(50, 50, 40, 0, Math.PI * 2)
        fallbackCtx.fill()

        // Add some rays
        fallbackCtx.strokeStyle = "#FFCC00"
        fallbackCtx.lineWidth = 2
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2
          fallbackCtx.beginPath()
          fallbackCtx.moveTo(50 + Math.cos(angle) * 40, 50 + Math.sin(angle) * 40)
          fallbackCtx.lineTo(50 + Math.cos(angle) * 48, 50 + Math.sin(angle) * 48)
          fallbackCtx.stroke()
        }

        sunLogo.src = fallbackCanvas.toDataURL()
      }
    }

    moonLogo.onerror = (error) => {
      console.error("Error loading moon logo:", error)
      // Create a simple moon circle as fallback
      const fallbackCanvas = document.createElement("canvas")
      fallbackCanvas.width = 100
      fallbackCanvas.height = 100
      const fallbackCtx = fallbackCanvas.getContext("2d")
      if (fallbackCtx) {
        // Draw a blue-white circle with gradient
        const gradient = fallbackCtx.createRadialGradient(50, 50, 10, 50, 50, 40)
        gradient.addColorStop(0, "#FFFFFF")
        gradient.addColorStop(1, "#CCDDFF")
        fallbackCtx.fillStyle = gradient
        fallbackCtx.beginPath()
        fallbackCtx.arc(50, 50, 40, 0, Math.PI * 2)
        fallbackCtx.fill()

        // Add a crater or two
        fallbackCtx.fillStyle = "rgba(180, 200, 220, 0.5)"
        fallbackCtx.beginPath()
        fallbackCtx.arc(65, 35, 10, 0, Math.PI * 2)
        fallbackCtx.fill()
        fallbackCtx.beginPath()
        fallbackCtx.arc(35, 60, 8, 0, Math.PI * 2)
        fallbackCtx.fill()

        moonLogo.src = fallbackCanvas.toDataURL()
      }
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("resize", generateStars)
      window.removeEventListener("resize", generateClouds)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" aria-hidden="true" />
}
