"use client"

import type React from "react"

import { Twitter, Facebook, Linkedin, RssIcon as Reddit, Mail, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

// Define the props for the component
interface SocialShareButtonsProps {
  url: string
  title: string
  imageUrl?: string // Optional image URL for Pinterest or other platforms
  tags?: string[] // Optional tags for Twitter
  className?: string
}

// Define the structure for each social platform
interface SocialPlatform {
  name: string
  icon: React.ElementType
  color: string // Tailwind hover background color
  action: (url: string, title: string, imageUrl?: string, tags?: string[]) => void
}

export default function SocialShareButtons({ url, title, imageUrl, tags, className = "" }: SocialShareButtonsProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    // Prevent hydration mismatch by not rendering on the server
    // Or render a placeholder/skeleton
    return null
  }

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedImageUrl = imageUrl ? encodeURIComponent(imageUrl) : ""

  const platforms: SocialPlatform[] = [
    {
      name: "X (Twitter)",
      icon: Twitter,
      color: "hover:bg-sky-500",
      action: () => {
        const tweetTags = tags ? `&hashtags=${tags.join(",")}` : ""
        window.open(
          `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}${tweetTags}`,
          "_blank",
          "noopener,noreferrer",
        )
      },
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "hover:bg-blue-700",
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, "_blank", "noopener,noreferrer")
      },
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "hover:bg-sky-700",
      action: () => {
        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
          "_blank",
          "noopener,noreferrer",
        )
      },
    },
    {
      name: "Reddit",
      icon: Reddit,
      color: "hover:bg-orange-600",
      action: () => {
        window.open(
          `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
          "_blank",
          "noopener,noreferrer",
        )
      },
    },
    {
      name: "Email",
      icon: Mail,
      color: "hover:bg-gray-600",
      action: () => {
        window.location.href = `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(
          `Check out this link: ${url}`,
        )}`
      },
    },
  ]

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err)
        // Optionally, you could set an error state here to inform the user
        // For now, we'll just log the error.
      })
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <p className="text-sm font-medium text-gray-300 mr-2">Share:</p>
      {platforms.map((platform) => (
        <Button
          key={platform.name}
          variant="outline"
          size="icon"
          className={`border-gray-700 bg-gray-800/50 text-gray-300 ${platform.color} hover:text-white transition-colors`}
          onClick={() => platform.action(url, title, imageUrl, tags)}
          aria-label={`Share on ${platform.name}`}
        >
          <platform.icon className="h-4 w-4" />
        </Button>
      ))}
      <Button
        variant="outline"
        size="icon"
        className="border-gray-700 bg-gray-800/50 text-gray-300 hover:bg-green-600 hover:text-white transition-colors"
        onClick={handleCopyLink}
        aria-label="Copy link"
      >
        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )
}
