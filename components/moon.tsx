"use client"

import { useEffect, useState } from "react"

export default function Moon() {
  const [mounted, setMounted] = useState(false)

  // Only render the moon after component mounts to avoid hydration issues
  useEffect(() => {
    setMounted(true)
    console.log("Moon component mounted")
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
      {/* Moon container */}
      <div
        className="absolute"
        style={{
          top: "10vh",
          left: "10vw",
          width: "16vmin",
          height: "16vmin",
          maxWidth: "200px",
          maxHeight: "200px",
        }}
      >
        {/* Moon glow */}
        <div
          className="absolute rounded-full"
          style={{
            width: "250%",
            height: "250%",
            top: "-75%",
            left: "-75%",
            background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)",
          }}
        />

        {/* Moon image */}
        <div
          className="w-full h-full rounded-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/moon.png')",
          }}
        />
      </div>
    </div>
  )
}
