"use client"

import type React from "react"

import { useEffect } from "react"
import Image from "next/image"

interface TallyFormProps {
  embedSrc: string
  width?: string
  height?: string
  title?: string
}

const TallyForm: React.FC<TallyFormProps> = ({
  embedSrc,
  width = "100%",
  height = "550", // Default height from user's embed
  title = "Contact Form",
}) => {
  useEffect(() => {
    const scriptId = "tally-embed-script"
    const scriptSrc = "https://tally.so/widgets/embed.js"

    if (document.getElementById(scriptId)) {
      // Script already loaded, ensure Tally loads new embeds if any
      if (typeof (window as any).Tally !== "undefined") {
        ;(window as any).Tally.loadEmbeds()
      }
      return
    }

    const script = document.createElement("script")
    script.id = scriptId
    script.src = scriptSrc
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
      // Optional: cleanup script if component unmounts, though Tally might manage this
      // const existingScript = document.getElementById(scriptId);
      // if (existingScript) {
      //   document.body.removeChild(existingScript);
      // }
    }
  }, [])

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mb-8">
        <Image src="/images/logo-horizontal-white.png" alt="LumenHelix Solutions Logo" width={240} height={60} />
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
        className="rounded-lg shadow-2xl border border-gray-700/50"
      ></iframe>
    </div>
  )
}

export default TallyForm
