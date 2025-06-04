"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, Mail, Link, MessageCircle, Share2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface SocialShareButtonsProps {
  url: string
  title: string
  description?: string
  className?: string
  compact?: boolean
}

export function SocialShareButtons({
  url,
  title,
  description = "",
  className = "",
  compact = false,
}: SocialShareButtonsProps) {
  const { toast } = useToast()

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
    toast({
      title: "Link Copied",
      description: "The link has been copied to your clipboard.",
    })
  }

  const nativeShare = () => {
    if (typeof navigator.share === "function") {
      navigator
        .share({
          title,
          text: description,
          url,
        })
        .catch((err) => {
          console.error("Error sharing:", err)
          // Fallback
          copyToClipboard()
        })
    } else {
      // Fallback for browsers that don't support the Web Share API
      copyToClipboard()
    }
  }

  if (compact) {
    return (
      <div className={`flex gap-2 ${className}`}>
        <Button variant="outline" size="icon" onClick={nativeShare} title="Share">
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={copyToClipboard} title="Copy Link">
          <Link className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        className="bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border-[#1877F2]/20"
        onClick={() => window.open(shareLinks.facebook, "_blank")}
      >
        <Facebook className="h-4 w-4 mr-2 text-[#1877F2]" />
        Facebook
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border-[#1DA1F2]/20"
        onClick={() => window.open(shareLinks.twitter, "_blank")}
      >
        <Twitter className="h-4 w-4 mr-2 text-[#1DA1F2]" />
        Twitter
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border-[#0A66C2]/20"
        onClick={() => window.open(shareLinks.linkedin, "_blank")}
      >
        <Linkedin className="h-4 w-4 mr-2 text-[#0A66C2]" />
        LinkedIn
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="bg-gray-500/10 hover:bg-gray-500/20 border-gray-500/20"
        onClick={() => window.open(shareLinks.email, "_blank")}
      >
        <Mail className="h-4 w-4 mr-2 text-gray-500" />
        Email
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="bg-green-500/10 hover:bg-green-500/20 border-green-500/20"
        onClick={() => {
          if (typeof navigator.share === "function") {
            navigator.share({
              title,
              text: description,
              url,
            })
          } else {
            copyToClipboard()
          }
        }}
      >
        <MessageCircle className="h-4 w-4 mr-2 text-green-500" />
        Message
      </Button>

      <Button variant="outline" size="sm" onClick={copyToClipboard}>
        <Link className="h-4 w-4 mr-2" />
        Copy Link
      </Button>
    </div>
  )
}
