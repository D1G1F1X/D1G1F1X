"use client"

import { useEffect } from "react"
import Image from "next/image"

interface TallyFormProps {
  embedSrc: string
  title: string
  height?: string | number
  width?: string | number
}

export default function TallyForm({
  embedSrc,
  title,
  height = "550", // Default height from user's original embed
  width = "100%",
}: TallyFormProps) {
  useEffect(() => {
    const scriptId = "tally-embed-script"
    const tallyScriptUrl = "https://tally.so/widgets/embed.js"

    if (document.getElementById(scriptId)) {
      // Script already loaded, ensure Tally loads new embeds if any
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

    return () => {
      // Optional: cleanup script if component unmounts, though often not necessary for widget scripts
      // const existingScript = document.getElementById(scriptId);
      // if (existingScript) {
      //   document.body.removeChild(existingScript);
      // }
    }
  }, [])

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mb-8">
        <Image
          src="/images/logo-horizontal-white.png" // Using the horizontal text logo
          alt="LumenHelix Solutions Logo"
          width={250} // Adjusted width for horizontal logo
          height={60} // Adjusted height
          priority
          className="h-auto" // Maintain aspect ratio
        />
      </div>
      <iframe
        data-tally-src={embedSrc}
        loading="lazy"
        width={width}
        height={height}
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title={title}
        className="rounded-lg shadow-xl"
      ></iframe>
    </div>
  )
}
