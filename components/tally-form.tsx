"use client"

import { useEffect } from "react"
// Image import is no longer needed
// import Image from "next/image"

interface TallyFormProps {
  embedSrc: string
  title: string
  height?: string | number
  width?: string | number
}

export default function TallyForm({ embedSrc, title, height = "550", width = "100%" }: TallyFormProps) {
  useEffect(() => {
    const scriptId = "tally-embed-script"
    const tallyScriptUrl = "https://tally.so/widgets/embed.js"

    if (document.getElementById(scriptId)) {
      if (typeof (window as any).Tally !== "undefined") {
        ;(window as any).Tally.loadEmbeds()
      }
      return
    }

    const script = document.createElement("script")
    script.id = scriptId
    script.src = tallyScriptUrl
    script.async = true
    script.onload = () => {
      if (typeof (window as any).Tally !== "undefined") {
        ;(window as any).Tally.loadEmbeds()
      }
    }
    script.onerror = () => {
      console.error("Failed to load Tally embed script.")
    }
    document.body.appendChild(script)

    // Cleanup function for useEffect is generally good practice
    return () => {
      const existingScript = document.getElementById(scriptId)
      // Only remove if this component instance specifically added it,
      // and no other TallyForm instances might need it.
      // For a global widget script, often it's left in the body.
      // If Tally's script handles multiple embeds well, this might not be needed.
      // if (existingScript) {
      //   document.body.removeChild(existingScript);
      // }
    }
  }, []) // Empty dependency array ensures this runs once on mount and cleans up on unmount

  return (
    <iframe
      data-tally-src={embedSrc}
      loading="lazy"
      width={width}
      height={height}
      frameBorder="0"
      marginHeight={0}
      marginWidth={0}
      title={title}
      className="rounded-lg shadow-xl w-full" // Ensure iframe takes full width of its container
    ></iframe>
  )
}
