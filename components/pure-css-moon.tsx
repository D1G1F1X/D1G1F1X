"use client"

import { useEffect, useState } from "react"

export default function PureCssMoon() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed top-[10vh] left-[10vw] w-[16vmin] h-[16vmin] max-w-[200px] max-h-[200px] pointer-events-none z-[100]">
      {/* Moon glow */}
      <div className="absolute w-[250%] h-[250%] top-[-75%] left-[-75%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0)_70%)]"></div>

      {/* Pure CSS Moon */}
      <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_40%_40%,#ffffff_0%,#f0f0f0_30%,#e0e0e0_60%,#d0d0d0_100%)] shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.2)]">
        {/* Moon craters */}
        <div className="absolute w-[20%] h-[20%] top-[20%] left-[30%] rounded-full bg-[rgba(220,220,220,0.8)] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)]"></div>
        <div className="absolute w-[15%] h-[15%] top-[50%] left-[60%] rounded-full bg-[rgba(220,220,220,0.8)] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)]"></div>
        <div className="absolute w-[25%] h-[25%] top-[65%] left-[25%] rounded-full bg-[rgba(220,220,220,0.8)] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)]"></div>
      </div>
    </div>
  )
}
