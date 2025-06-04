"use client"

import { useEffect } from "react"

export default function ContactForm() {
  useEffect(() => {
    const scriptSrc = "https://tally.so/widgets/embed.js"
    let script = document.querySelector(`script[src="${scriptSrc}"]`) as HTMLScriptElement | null

    const loadTallyEmbeds = () => {
      if (typeof (window as any).Tally !== "undefined") {
        ;(window as any).Tally.loadEmbeds()
      } else {
        document.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((iframe) => {
          const tallySrc = iframe.getAttribute("data-tally-src")
          if (tallySrc) {
            ;(iframe as HTMLIFrameElement).src = tallySrc
          }
        })
      }
    }

    if (!script) {
      script = document.createElement("script")
      script.src = scriptSrc
      script.onload = loadTallyEmbeds
      script.onerror = loadTallyEmbeds // Also try to load if script fetching fails but was already loaded
      document.body.appendChild(script)
    } else {
      // If script already exists, Tally might already be loaded
      loadTallyEmbeds()
    }

    // Cleanup function to remove the script when the component unmounts
    // This might not be strictly necessary for Tally's script if it's designed to be global,
    // but it's good practice for some external scripts.
    // However, Tally's script might be intended to persist.
    // For now, we won't remove it to avoid issues if other Tally forms are used.
    // return () => {
    //   if (script && script.parentNode) {
    //     script.parentNode.removeChild(script);
    //   }
    // };
  }, [])

  return (
    <iframe
      data-tally-src="https://tally.so/embed/n9ypaE?dynamicHeight=1&transparentBackground=1&hideTitle=1"
      loading="lazy"
      width="100%"
      height="550" // Initial height, dynamicHeight should adjust it
      frameBorder="0"
      marginHeight={0}
      marginWidth={0}
      title="Contact form"
      className="rounded-lg shadow-xl"
    ></iframe>
  )
}
