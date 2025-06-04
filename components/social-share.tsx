"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import socialSharingService, {
  type ShareableContent,
  type SocialShareOptions,
  socialPlatforms,
} from "@/lib/services/social-sharing-service"
import {
  Share2,
  Copy,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
  Send,
  ImageIcon,
  QrCode,
} from "lucide-react"

interface SocialShareProps {
  content: ShareableContent
  options?: SocialShareOptions
  className?: string
  variant?: "icon" | "button" | "floating" | "inline" | "expanded"
  size?: "sm" | "md" | "lg"
  label?: string
  onShare?: (platform: string) => void
}

export function SocialShare({
  content,
  options = {},
  className = "",
  variant = "button",
  size = "md",
  label = "Share",
  onShare,
}: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState("")
  const [activeTab, setActiveTab] = useState("social")
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const { toast } = useToast()

  // Default options
  const {
    platforms = Object.keys(socialPlatforms),
    showCopyLink = true,
    showNativeShare = true,
    trackShares = true,
    customClass = "",
  } = options

  // Update share URL when content changes
  useEffect(() => {
    if (content.url) {
      setShareUrl(socialSharingService.generateShareableUrl(content.url, "copy", content))
    }
  }, [content])

  // Generate QR code URL when needed
  useEffect(() => {
    if (activeTab === "qrcode" && shareUrl) {
      // Using a free QR code API service
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`)
    }
  }, [activeTab, shareUrl])

  // Handle share button click
  const handleShare = (platform: string) => {
    if (platform === "copy") {
      handleCopyLink()
      return
    }

    if (platform === "native") {
      handleNativeShare()
      return
    }

    // Format and open share URL for the platform
    const shareUrl = socialSharingService.formatShareContent(platform, content)
    socialSharingService.openSharePopup(shareUrl, platform)

    // Call onShare callback if provided
    if (onShare) {
      onShare(platform)
    }

    // Show toast notification
    toast({
      title: "Shared!",
      description: `Your content has been shared on ${socialPlatforms[platform as keyof typeof socialPlatforms]?.name}`,
    })

    // Close dialog if open
    setIsOpen(false)
  }

  // Handle copy link button click
  const handleCopyLink = async () => {
    const success = await socialSharingService.copyToClipboard(shareUrl)

    if (success) {
      setCopied(true)
      toast({
        title: "Link Copied!",
        description: "The link has been copied to your clipboard.",
      })

      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000)

      // Call onShare callback if provided
      if (onShare) {
        onShare("copy")
      }
    } else {
      toast({
        title: "Copy Failed",
        description: "Failed to copy link to clipboard.",
        variant: "destructive",
      })
    }
  }

  // Handle native share button click
  const handleNativeShare = async () => {
    const success = await socialSharingService.nativeShare(content)

    if (success) {
      toast({
        title: "Shared!",
        description: "Your content has been shared.",
      })

      // Call onShare callback if provided
      if (onShare) {
        onShare("native")
      }

      // Close dialog if open
      setIsOpen(false)
    }
  }

  // Check if native sharing is supported
  const isNativeShareSupported = typeof navigator !== "undefined" && !!navigator.share

  // Get icon for platform
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <Facebook className="h-4 w-4" />
      case "twitter":
        return <Twitter className="h-4 w-4" />
      case "linkedin":
        return <Linkedin className="h-4 w-4" />
      case "whatsapp":
        return <MessageCircle className="h-4 w-4" />
      case "telegram":
        return <Send className="h-4 w-4" />
      case "email":
        return <Mail className="h-4 w-4" />
      default:
        return <Share2 className="h-4 w-4" />
    }
  }

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-xs p-1"
      case "lg":
        return "text-base p-3"
      default:
        return "text-sm p-2"
    }
  }

  // Render icon-only variant
  if (variant === "icon") {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className={cn("rounded-full", className, customClass)} aria-label="Share">
            <Share2 className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share</DialogTitle>
            <DialogDescription>Share this content with your friends and colleagues</DialogDescription>
          </DialogHeader>
          {renderShareOptions()}
        </DialogContent>
      </Dialog>
    )
  }

  // Render button variant
  if (variant === "button") {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className={cn("", className, customClass)}>
            <Share2 className="h-4 w-4 mr-2" />
            {label}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share</DialogTitle>
            <DialogDescription>Share this content with your friends and colleagues</DialogDescription>
          </DialogHeader>
          {renderShareOptions()}
        </DialogContent>
      </Dialog>
    )
  }

  // Render floating variant
  if (variant === "floating") {
    return (
      <div className={cn("fixed bottom-4 right-4 z-50", className, customClass)}>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="default" size="icon" className="rounded-full h-12 w-12 shadow-lg">
              <Share2 className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share</DialogTitle>
              <DialogDescription>Share this content with your friends and colleagues</DialogDescription>
            </DialogHeader>
            {renderShareOptions()}
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  // Render inline variant
  if (variant === "inline") {
    return (
      <div className={cn("flex flex-wrap gap-2", className, customClass)}>
        {platforms.map((platform) => (
          <TooltipProvider key={platform}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full bg-${platform}-100 hover:bg-${platform}-200`}
                  onClick={() => handleShare(platform)}
                >
                  {getPlatformIcon(platform)}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share on {socialPlatforms[platform as keyof typeof socialPlatforms]?.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}

        {showCopyLink && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full" onClick={handleCopyLink}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copied ? "Copied!" : "Copy link"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {showNativeShare && isNativeShareSupported && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full" onClick={handleNativeShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    )
  }

  // Render expanded variant (default to this if no valid variant specified)
  return (
    <div className={cn("space-y-4", className, customClass)}>
      <Tabs defaultValue="social" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="link">Copy Link</TabsTrigger>
          <TabsTrigger value="qrcode">QR Code</TabsTrigger>
        </TabsList>

        <TabsContent value="social" className="space-y-4">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {platforms.map((platform) => (
              <Button
                key={platform}
                variant="outline"
                className={`flex flex-col items-center justify-center h-20 p-2`}
                style={{
                  backgroundColor: `${socialPlatforms[platform as keyof typeof socialPlatforms]?.color}20`,
                  borderColor: `${socialPlatforms[platform as keyof typeof socialPlatforms]?.color}40`,
                }}
                onClick={() => handleShare(platform)}
              >
                <div
                  className="h-8 w-8 rounded-full flex items-center justify-center mb-1"
                  style={{ backgroundColor: socialPlatforms[platform as keyof typeof socialPlatforms]?.color }}
                >
                  {getPlatformIcon(platform)}
                </div>
                <span className="text-xs">{socialPlatforms[platform as keyof typeof socialPlatforms]?.name}</span>
              </Button>
            ))}
          </div>

          {showNativeShare && isNativeShareSupported && (
            <Button variant="default" className="w-full" onClick={handleNativeShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share using device
            </Button>
          )}
        </TabsContent>

        <TabsContent value="link" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="share-link">Share Link</Label>
            <div className="flex space-x-2">
              <Input id="share-link" value={shareUrl} readOnly className="flex-1" />
              <Button
                variant={copied ? "default" : "outline"}
                className={copied ? "bg-green-600" : ""}
                onClick={handleCopyLink}
              >
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Share Summary</Label>
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm font-medium">{content.title}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {socialSharingService.createShareableSummary(content.description, 120)}
              </p>
              {content.hashtags && content.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {content.hashtags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="qrcode" className="space-y-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            {qrCodeUrl ? (
              <div className="border rounded-md p-4 bg-white">
                <img src={qrCodeUrl || "/placeholder.svg"} alt="QR Code" width={200} height={200} className="mx-auto" />
              </div>
            ) : (
              <div className="h-[200px] w-[200px] flex items-center justify-center border rounded-md">
                <QrCode className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
            <p className="text-sm text-center text-muted-foreground">Scan this QR code to share this content</p>
            <Button
              variant="outline"
              onClick={() => {
                if (qrCodeUrl) {
                  const link = document.createElement("a")
                  link.href = qrCodeUrl
                  link.download = "qrcode.png"
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)

                  toast({
                    title: "QR Code Downloaded",
                    description: "The QR code has been downloaded successfully.",
                  })
                }
              }}
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Download QR Code
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )

  // Helper function to render share options in dialog
  function renderShareOptions() {
    return (
      <Tabs defaultValue="social" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="link">Copy Link</TabsTrigger>
          <TabsTrigger value="qrcode">QR Code</TabsTrigger>
        </TabsList>

        <TabsContent value="social" className="space-y-4 mt-4">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {platforms.map((platform) => (
              <Button
                key={platform}
                variant="outline"
                className={`flex flex-col items-center justify-center h-20 p-2`}
                style={{
                  backgroundColor: `${socialPlatforms[platform as keyof typeof socialPlatforms]?.color}20`,
                  borderColor: `${socialPlatforms[platform as keyof typeof socialPlatforms]?.color}40`,
                }}
                onClick={() => handleShare(platform)}
              >
                <div
                  className="h-8 w-8 rounded-full flex items-center justify-center mb-1"
                  style={{ backgroundColor: socialPlatforms[platform as keyof typeof socialPlatforms]?.color }}
                >
                  {getPlatformIcon(platform)}
                </div>
                <span className="text-xs">{socialPlatforms[platform as keyof typeof socialPlatforms]?.name}</span>
              </Button>
            ))}
          </div>

          {showNativeShare && isNativeShareSupported && (
            <Button variant="default" className="w-full" onClick={handleNativeShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share using device
            </Button>
          )}
        </TabsContent>

        <TabsContent value="link" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="share-link-dialog">Share Link</Label>
            <div className="flex space-x-2">
              <Input id="share-link-dialog" value={shareUrl} readOnly className="flex-1" />
              <Button
                variant={copied ? "default" : "outline"}
                className={copied ? "bg-green-600" : ""}
                onClick={handleCopyLink}
              >
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm font-medium">{content.title}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {socialSharingService.createShareableSummary(content.description, 120)}
              </p>
              {content.hashtags && content.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {content.hashtags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="qrcode" className="space-y-4 mt-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            {qrCodeUrl ? (
              <div className="border rounded-md p-4 bg-white">
                <img src={qrCodeUrl || "/placeholder.svg"} alt="QR Code" width={200} height={200} className="mx-auto" />
              </div>
            ) : (
              <div className="h-[200px] w-[200px] flex items-center justify-center border rounded-md">
                <QrCode className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
            <p className="text-sm text-center text-muted-foreground">Scan this QR code to share this content</p>
            <Button
              variant="outline"
              onClick={() => {
                if (qrCodeUrl) {
                  const link = document.createElement("a")
                  link.href = qrCodeUrl
                  link.download = "qrcode.png"
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)

                  toast({
                    title: "QR Code Downloaded",
                    description: "The QR code has been downloaded successfully.",
                  })
                }
              }}
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Download QR Code
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    )
  }
}
