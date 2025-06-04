"use client"

import PrideAnimatedLogo from "@/components/pride-animated-logo"
import { useState, useEffect } from "react" // Import useState and useEffect

export default function PrideLogoShowcasePage() {
  const [isLoading, setIsLoading] = useState(true) // Add loading state

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000) // Show "Loading..." for 1 second
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white text-3xl">
        Loading Showcase...
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center gap-12 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-8">Pride Animated Logo Showcase</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl text-gray-300 mb-4">Small (50px)</h2>
          <PrideAnimatedLogo size={50} />
          <p className="text-xs text-gray-400 mt-2">Suitable for header/footer accents</p>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-2xl text-gray-300 mb-4">Medium (100px - Default)</h2>
          <PrideAnimatedLogo size={100} />
          <p className="text-xs text-gray-400 mt-2">General purpose</p>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-2xl text-gray-300 mb-4">Large (200px)</h2>
          <PrideAnimatedLogo size={200} />
          <p className="text-xs text-gray-400 mt-2">Suitable for loading screens or hero sections</p>
        </div>
      </div>

      <div className="mt-12 p-6 bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <h3 className="text-xl font-semibold text-white mb-3">Integration Notes:</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Import `PrideAnimatedLogo` into any component or page.</li>
          <li>Use the `size` prop to adjust its dimensions.</li>
          <li>
            For the header, you might replace the static emblem in your existing `NumoracleLogo` component (when
            `variant="icon"`) or place this animated logo alongside your text logo.
          </li>
          <li>For loading screens, a larger size would be impactful.</li>
          <li>The animation is a continuous loop and designed to be relatively lightweight.</li>
        </ul>
        <div className="mt-4 p-3 bg-slate-700 rounded">
          <p className="text-sm text-slate-200">
            If the logo doesn&apos;t appear animated or masked correctly, please check the browser console for errors.
            CSS masking can have compatibility differences across browsers. Ensure the image path{" "}
            <code>/numero-logo-500x500.png</code> is correct.
          </p>
        </div>
      </div>
    </div>
  )
}
