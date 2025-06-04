"use client"

import type React from "react"

interface PrideAnimatedLogoProps {
  size?: number
  className?: string
}

const PrideAnimatedLogo: React.FC<PrideAnimatedLogoProps> = ({ size = 100, className = "" }) => {
  console.log("Rendering PrideAnimatedLogo (ULTRA-SIMPLE TEXT VERSION). Size:", size)
  return (
    <div
      className={`inline-block ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: "magenta",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid yellow",
        color: "white",
        fontSize: `${Math.max(10, size / 5)}px`, // Adjust font size based on container
        textAlign: "center",
        padding: "5px",
      }}
      role="status" // Changed role to status for this diagnostic
      aria-label="Simplified Pride Logo Test"
    >
      Pride Logo Test
    </div>
  )
}

export default PrideAnimatedLogo
