"use client"

import { useEffect } from "react"
import type { ShareableContent } from "@/lib/services/enhanced-social-sharing"

interface OpenGraphTagsProps {
  content: ShareableContent
}

export function OpenGraphTags({ content }: OpenGraphTagsProps) {
  useEffect(() => {
    // Update meta tags when content changes
    updateMetaTags(content)

    // Clean up meta tags when component unmounts
    return () => {
      removeMetaTags()
    }
  }, [content])

  return null // This component doesn't render anything visible
}

function updateMetaTags(content: ShareableContent) {
  if (typeof document === "undefined") return

  // Basic meta tags
  updateMetaTag("title", content.title)
  updateMetaTag("description", content.description)

  // Open Graph tags
  updateMetaTag("og:title", content.title)
  updateMetaTag("og:description", content.description)
  updateMetaTag("og:url", content.url)
  updateMetaTag("og:type", "website")
  if (content.imageUrl) {
    updateMetaTag("og:image", content.imageUrl)
  }

  // Twitter Card tags
  updateMetaTag("twitter:card", "summary_large_image")
  updateMetaTag("twitter:title", content.title)
  updateMetaTag("twitter:description", content.description)
  if (content.imageUrl) {
    updateMetaTag("twitter:image", content.imageUrl)
  }
}

function updateMetaTag(name: string, content: string) {
  if (typeof document === "undefined") return

  // Check if the meta tag already exists
  let meta = document.querySelector(`meta[property="${name}"]`) || document.querySelector(`meta[name="${name}"]`)

  if (!meta) {
    // Create a new meta tag if it doesn't exist
    meta = document.createElement("meta")
    if (name.startsWith("og:") || name.startsWith("article:")) {
      meta.setAttribute("property", name)
    } else {
      meta.setAttribute("name", name)
    }
    document.head.appendChild(meta)
  }

  // Update the content
  meta.setAttribute("content", content)
}

function removeMetaTags() {
  if (typeof document === "undefined") return

  // Remove Open Graph tags
  document.querySelectorAll('meta[property^="og:"]').forEach((el) => el.remove())

  // Remove Twitter Card tags
  document.querySelectorAll('meta[name^="twitter:"]').forEach((el) => el.remove())
}
