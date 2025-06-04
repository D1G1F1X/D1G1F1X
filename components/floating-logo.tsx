"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface FloatingLogoProps {
  variant?: "icon" | "full"
  size?: number
  opacity?: number
}

export default function FloatingLogo({ variant = "icon", size = 100, opacity = 0.7 }: FloatingLogoProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const logoSrc = variant === "icon" ? "/numero-logo-500x500.png" : "/toplogowicon.gif"

  return (
    <div className="absolute z-10 pointer-events-none">
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{ opacity }}
      >
        <Image
          src={logoSrc || "/placeholder.svg"}
          alt="NUMOracle"
          width={size}
          height={size}
          className="w-auto h-auto"
        />
      </motion.div>
    </div>
  )
}
