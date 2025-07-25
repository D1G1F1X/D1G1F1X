import type { OracleCard } from "@/types/cards" // Assuming OracleCard is imported from this path

export interface ShareData {
  title: string
  text: string
  url: string
}

export const shareService = {
  // Check if native sharing is supported
  isNativeShareSupported(): boolean {
    return typeof navigator !== "undefined" && "share" in navigator
  },

  // Native share (mobile devices)
  async nativeShare(data: ShareData): Promise<boolean> {
    if (!this.isNativeShareSupported()) {
      return false
    }

    try {
      await navigator.share(data)
      return true
    } catch (error) {
      console.error("Error sharing:", error)
      return false
    }
  },

  // Copy to clipboard
  async copyToClipboard(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        return true
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea")
        textArea.value = text
        textArea.style.position = "fixed"
        textArea.style.left = "-999999px"
        textArea.style.top = "-999999px"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        const success = document.execCommand("copy")
        textArea.remove()
        return success
      }
    } catch (error) {
      console.error("Error copying to clipboard:", error)
      return false
    }
  },

  // Generate shareable link (for general reports, if applicable)
  generateShareableLink(reportId: string): string {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
    return `${baseUrl}/numerology-report/${reportId}`
  },

  // Social media sharing URLs
  getSocialShareUrls(data: ShareData) {
    const encodedUrl = encodeURIComponent(data.url)
    const encodedTitle = encodeURIComponent(data.title)
    const encodedText = encodeURIComponent(data.text)

    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    }
  },

  // Open social share window
  openShareWindow(url: string, platform: string): void {
    const width = 600
    const height = 400
    const left = (window.screen.width - width) / 2
    const top = (window.screen.height - height) / 2

    window.open(
      url,
      `share-${platform}`,
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`,
    )
  },
}

// New function to generate a shareable link specifically for the simulator readings
export function generateShareableLinkForSimulator({
  readingText,
  question,
  spreadType,
  cards,
}: {
  readingText: string
  question: string
  spreadType: string
  cards: OracleCard[]
}): string {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
  const cardIds = cards.map((card) => card.id).join(",")
  // Truncate reading for URL to avoid excessively long URLs
  const truncatedReading = readingText.substring(0, 100)

  return `${baseUrl}/readings/share?q=${encodeURIComponent(question)}&s=${encodeURIComponent(
    spreadType,
  )}&c=${encodeURIComponent(cardIds)}&r=${encodeURIComponent(truncatedReading)}`
}
