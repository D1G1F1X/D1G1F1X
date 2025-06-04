/**
 * Social Sharing Service
 * Provides functionality for sharing content across various social media platforms
 * with tracking, analytics, and optimized previews
 */

import { generateId } from "@/lib/utils"

// Types for our sharing functionality
export interface ShareableContent {
  title: string
  description: string
  url: string
  imageUrl?: string
  hashtags?: string[]
  via?: string // Twitter username without @
  analyticsSource?: string // For UTM parameters
  analyticsContent?: string // For UTM parameters
}

export interface SocialShareOptions {
  platforms?: string[] // Platforms to include, or all if not specified
  showCopyLink?: boolean
  showNativeShare?: boolean
  trackShares?: boolean
  customClass?: string
}

export interface ShareStats {
  id: string
  url: string
  platform: string
  timestamp: string
  referrer?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
}

// Social media platforms configuration
export const socialPlatforms = {
  facebook: {
    name: "Facebook",
    color: "#1877F2",
    icon: "facebook",
    shareUrl: "https://www.facebook.com/sharer/sharer.php?u={{url}}&quote={{title}}",
    popupWidth: 670,
    popupHeight: 340,
  },
  twitter: {
    name: "Twitter",
    color: "#1DA1F2",
    icon: "twitter",
    shareUrl: "https://twitter.com/intent/tweet?text={{title}}&url={{url}}{{hashtags}}{{via}}",
    popupWidth: 550,
    popupHeight: 420,
  },
  linkedin: {
    name: "LinkedIn",
    color: "#0A66C2",
    icon: "linkedin",
    shareUrl: "https://www.linkedin.com/sharing/share-offsite/?url={{url}}",
    popupWidth: 750,
    popupHeight: 600,
  },
  pinterest: {
    name: "Pinterest",
    color: "#E60023",
    icon: "pinterest",
    shareUrl: "https://pinterest.com/pin/create/button/?url={{url}}&media={{image}}&description={{title}}",
    popupWidth: 750,
    popupHeight: 550,
  },
  whatsapp: {
    name: "WhatsApp",
    color: "#25D366",
    icon: "message-circle",
    shareUrl: "https://api.whatsapp.com/send?text={{title}}%20{{url}}",
    popupWidth: 550,
    popupHeight: 450,
  },
  telegram: {
    name: "Telegram",
    color: "#0088cc",
    icon: "send",
    shareUrl: "https://t.me/share/url?url={{url}}&text={{title}}",
    popupWidth: 550,
    popupHeight: 450,
  },
  email: {
    name: "Email",
    color: "#B8B8B8",
    icon: "mail",
    shareUrl: "mailto:?subject={{title}}&body={{description}}%0A%0A{{url}}",
  },
}

/**
 * Generates a shareable URL with UTM parameters for tracking
 */
export function generateShareableUrl(baseUrl: string, platform: string, content: ShareableContent): string {
  // Make sure we have a valid URL
  if (!baseUrl) {
    if (typeof window !== "undefined") {
      baseUrl = window.location.href
    } else {
      return ""
    }
  }

  // Parse the URL to handle UTM parameters properly
  let url: URL
  try {
    url = new URL(baseUrl)
  } catch (e) {
    // If baseUrl is a relative path, construct a full URL
    if (typeof window !== "undefined") {
      url = new URL(baseUrl, window.location.origin)
    } else {
      return baseUrl // Can't process without window
    }
  }

  // Add UTM parameters for tracking
  if (platform !== "copy" && platform !== "native") {
    url.searchParams.set("utm_source", platform)
    url.searchParams.set("utm_medium", "social")
    url.searchParams.set("utm_campaign", "share")

    if (content.analyticsSource) {
      url.searchParams.set("utm_source", content.analyticsSource)
    }

    if (content.analyticsContent) {
      url.searchParams.set("utm_content", content.analyticsContent)
    }

    // Add a unique share ID for tracking individual shares
    url.searchParams.set("share_id", generateId())
  }

  return url.toString()
}

/**
 * Formats content for sharing on a specific platform
 */
export function formatShareContent(platform: string, content: ShareableContent): string {
  if (!platform || !socialPlatforms[platform as keyof typeof socialPlatforms]) {
    return ""
  }

  const platformConfig = socialPlatforms[platform as keyof typeof socialPlatforms]

  // Generate the shareable URL with tracking parameters
  const shareableUrl = generateShareableUrl(content.url, platform, content)

  // Format the share URL template with content
  let shareUrl = platformConfig.shareUrl
    .replace("{{url}}", encodeURIComponent(shareableUrl))
    .replace("{{title}}", encodeURIComponent(content.title))
    .replace("{{description}}", encodeURIComponent(content.description || ""))

  // Handle platform-specific parameters
  if (platform === "twitter") {
    // Add hashtags for Twitter
    if (content.hashtags && content.hashtags.length > 0) {
      shareUrl = shareUrl.replace("{{hashtags}}", "&hashtags=" + content.hashtags.join(","))
    } else {
      shareUrl = shareUrl.replace("{{hashtags}}", "")
    }

    // Add via for Twitter
    if (content.via) {
      shareUrl = shareUrl.replace("{{via}}", "&via=" + content.via)
    } else {
      shareUrl = shareUrl.replace("{{via}}", "")
    }
  }

  // Add image for Pinterest
  if (platform === "pinterest" && content.imageUrl) {
    shareUrl = shareUrl.replace("{{image}}", encodeURIComponent(content.imageUrl))
  } else if (platform === "pinterest") {
    shareUrl = shareUrl.replace("{{image}}", "")
  }

  return shareUrl
}

/**
 * Opens a popup window for sharing
 */
export function openSharePopup(url: string, platform: string): void {
  if (!url || typeof window === "undefined") return

  const platformConfig = socialPlatforms[platform as keyof typeof socialPlatforms]

  // For email, just change the window location
  if (platform === "email") {
    window.location.href = url
    return
  }

  // For other platforms, open a popup
  const width = platformConfig?.popupWidth || 550
  const height = platformConfig?.popupHeight || 450
  const left = (window.screen.width - width) / 2
  const top = (window.screen.height - height) / 2

  window.open(
    url,
    `share-${platform}`,
    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`,
  )

  // Track this share event
  trackShareEvent(platform, url)
}

/**
 * Attempts to use the native Web Share API if available
 */
export function nativeShare(content: ShareableContent): Promise<boolean> {
  if (typeof navigator === "undefined" || !navigator.share) {
    return Promise.resolve(false)
  }

  const shareData: ShareData = {
    title: content.title,
    text: content.description,
    url: generateShareableUrl(content.url, "native", content),
  }

  return navigator
    .share(shareData)
    .then(() => {
      trackShareEvent("native", content.url)
      return true
    })
    .catch((error) => {
      console.error("Error sharing:", error)
      return false
    })
}

/**
 * Copies a link to the clipboard
 */
export function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator === "undefined") {
    return Promise.resolve(false)
  }

  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard
      .writeText(text)
      .then(() => {
        trackShareEvent("copy", text)
        return true
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error)
        return false
      })
  } else {
    // Fallback for browsers that don't support clipboard API
    try {
      const textArea = document.createElement("textarea")
      textArea.value = text
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      textArea.style.top = "-999999px"
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      const successful = document.execCommand("copy")
      textArea.remove()

      if (successful) {
        trackShareEvent("copy", text)
      }

      return Promise.resolve(successful)
    } catch (error) {
      console.error("Error copying to clipboard:", error)
      return Promise.resolve(false)
    }
  }
}

/**
 * Tracks share events for analytics
 */
export function trackShareEvent(platform: string, url: string): void {
  // Record the share event
  const shareEvent: ShareStats = {
    id: generateId(),
    url,
    platform,
    timestamp: new Date().toISOString(),
    referrer: typeof document !== "undefined" ? document.referrer : undefined,
  }

  // In a real app, you would send this to your analytics service
  console.log("Share event:", shareEvent)

  // Store locally for demo purposes
  if (typeof localStorage !== "undefined") {
    const shareStats = JSON.parse(localStorage.getItem("shareStats") || "[]")
    shareStats.push(shareEvent)
    localStorage.setItem("shareStats", JSON.stringify(shareStats))
  }

  // You could also send this to your backend
  // fetch('/api/analytics/share', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(shareEvent),
  // })
}

/**
 * Generates Open Graph meta tags for a page
 */
export function generateOpenGraphTags(content: ShareableContent): Record<string, string> {
  return {
    "og:title": content.title,
    "og:description": content.description,
    "og:url": content.url,
    "og:type": "website",
    "og:image": content.imageUrl || "",
    "twitter:card": "summary_large_image",
    "twitter:title": content.title,
    "twitter:description": content.description,
    "twitter:image": content.imageUrl || "",
  }
}

/**
 * Creates a shareable summary of content
 */
export function createShareableSummary(content: string, maxLength = 140): string {
  if (!content) return ""

  // Remove HTML tags if present
  const plainText = content.replace(/<[^>]*>?/gm, "")

  // Truncate to maxLength
  if (plainText.length <= maxLength) return plainText

  // Find the last space before maxLength
  const lastSpace = plainText.substring(0, maxLength).lastIndexOf(" ")

  // If no space found, just truncate at maxLength
  if (lastSpace === -1) return plainText.substring(0, maxLength) + "..."

  // Otherwise truncate at the last space
  return plainText.substring(0, lastSpace) + "..."
}

// Export the social sharing service
const socialSharingService = {
  socialPlatforms,
  generateShareableUrl,
  formatShareContent,
  openSharePopup,
  nativeShare,
  copyToClipboard,
  trackShareEvent,
  generateOpenGraphTags,
  createShareableSummary,
}

export default socialSharingService
