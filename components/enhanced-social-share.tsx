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
import enhancedSocialSharing, {
  type ShareableContent,
  type SocialShareOptions,
  socialPlatforms,
} from "@/lib/services/enhanced-social-sharing"
import shareAnalyticsService from "@/lib/services/share-analytics-service"
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
  ExternalLink,
  Smartphone,
} from "lucide-react"

interface EnhancedSocialShareProps {
  content: ShareableContent
  options?: SocialShareOptions
  className?: string
  variant?: "icon" | "button" | "floating" | "inline" | "expanded" | "minimal"
  size?: "sm" | "md" | "lg"
  label?: string
  onShare?: (platform: string) => void
}

export function EnhancedSocialShare({
  content,
  options = {},
  className = "",
  variant = "button",
  size = "md",
  label = "Share",
  onShare,
}: EnhancedSocialShareProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState("")
  const [activeTab, setActiveTab] = useState("social")
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [formattedContent, setFormattedContent] = useState<ShareableContent>(content)
  const { toast } = useToast()

  // Default options
  const {
    platforms = ["facebook", "twitter", "linkedin", "whatsapp", "telegram", "email"],
    showCopyLink = true,
    showNativeShare = true,
    trackShares = true,
    customClass = "",
  } = options

  // Format content for optimal sharing when component mounts or content changes
  useEffect(() => {
    setFormattedContent(enhancedSocialSharing.formatForSocialMedia(content))
  }, [content])

  // Update share URL when content changes
  useEffect(() => {
    if (formattedContent.url) {
      setShareUrl(enhancedSocialSharing.generateShareableUrl(formattedContent.url, "copy", formattedContent))
    }
  }, [formattedContent])

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
    const shareUrl = enhancedSocialSharing.formatShareContent(platform, formattedContent)
    enhancedSocialSharing.openSharePopup(shareUrl, platform)

    // Record share event with analytics service
    shareAnalyticsService
      .recordShareEvent({
        platform,
        contentType: content.analyticsContent || "unknown",
        contentId: content.analyticsSource,
        url: formattedContent.url,
        successful: true,
      })
      .catch((err) => console.error("Failed to record share event:", err))

    // Call onShare callback if provided
    if (onShare) {
      onShare(platform)
    }

    // Show toast notification
    toast({
      title: "Shared!",
      description: `Your content has been shared on ${socialPlatforms[platform as keyof typeof socialPlatforms]?.name}`,
      duration: 3000,
    })

    // Close dialog if open
    setIsOpen(false)
  }

  // Handle copy link button click
  const handleCopyLink = async () => {
    const success = await enhancedSocialSharing.copyToClipboard(shareUrl)

    if (success) {
      setCopied(true)

      // Record share event with analytics service
      shareAnalyticsService
        .recordShareEvent({
          platform: "copy",
          contentType: content.analyticsContent || "unknown",
          contentId: content.analyticsSource,
          url: formattedContent.url,
          successful: true,
        })
        .catch((err) => console.error("Failed to record share event:", err))

      toast({
        title: "Link Copied!",
        description: "The link has been copied to your clipboard.",
        duration: 3000,
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
    const success = await enhancedSocialSharing.nativeShare(formattedContent)

    if (success) {
      // Record share event with analytics service
      shareAnalyticsService
        .recordShareEvent({
          platform: "native",
          contentType: content.analyticsContent || "unknown",
          contentId: content.analyticsSource,
          url: formattedContent.url,
          successful: true,
        })
        .catch((err) => console.error("Failed to record share event:", err))

      toast({
        title: "Shared!",
        description: "Your content has been shared.",
        duration: 3000,
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

  // Render minimal variant
  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center gap-2", className, customClass)}>
        {platforms.slice(0, 3).map((platform) => (
          <TooltipProvider key={platform}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleShare(platform)}
                  aria-label={`Share on ${socialPlatforms[platform as keyof typeof socialPlatforms]?.name}`}
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

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" aria-label="More sharing options">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share</DialogTitle>
              <DialogDescription>Share this content with your network</DialogDescription>
            </DialogHeader>
            {renderShareOptions()}
          </DialogContent>
        </Dialog>
      </div>
    )
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
            <DialogDescription>Share this content with your network</DialogDescription>
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
            <DialogDescription>Share this content with your network</DialogDescription>
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
              <DialogDescription>Share this content with your network</DialogDescription>
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
                  className="rounded-full"
                  style={{
                    backgroundColor: `${socialPlatforms[platform as keyof typeof socialPlatforms]?.color}10`,
                    borderColor: `${socialPlatforms[platform as keyof typeof socialPlatforms]?.color}30`,
                  }}
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
                  <Smartphone className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share using device</p>
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

        <TabsContent value="social" className="space-y-4 pt-4">
          {/* Content Preview */}
          <div className="border rounded-md overflow-hidden mb-4">
            <div className="bg-muted p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">N</span>
                </div>
                <div>
                  <p className="text-sm font-medium">NUMO Oracle</p>
                  <p className="text-xs text-muted-foreground">Just now</p>
                </div>
              </div>
              <h3 className="font-medium text-base mb-2">{formattedContent.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{formattedContent.description}</p>

              {formattedContent.imageUrl && (
                <div className="rounded-md overflow-hidden mb-3 bg-black/10 aspect-video flex items-center justify-center">
                  <img
                    src={formattedContent.imageUrl || "/placeholder.svg"}
                    alt="Preview"
                    className="max-w-full max-h-[200px] object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=200&width=400&query=Preview"
                    }}
                  />
                </div>
              )}

              {formattedContent.hashtags && formattedContent.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {formattedContent.hashtags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {platforms.map((platform) => (
              <Button
                key={platform}
                variant="outline"
                className={`flex flex-col items-center justify-center h-20 p-2`}
                style={{
                  backgroundColor: `${socialPlatforms[platform as keyof typeof socialPlatforms]?.color}10`,
                  borderColor: `${socialPlatforms[platform as keyof typeof socialPlatforms]?.color}30`,
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
              <Smartphone className="h-4 w-4 mr-2" />
              Share using device
            </Button>
          )}
        </TabsContent>

        <TabsContent value="link" className="space-y-4 pt-4">
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
            <Label>Preview</Label>
            <div className="border rounded-md overflow-hidden">
              <div className="bg-muted p-4">
                <h3 className="font-medium mb-2">{formattedContent.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{formattedContent.description}</p>

                {formattedContent.imageUrl && (
                  <div className="rounded-md overflow-hidden mb-3 bg-black/10 aspect-video flex items-center justify-center">
                    <img
                      src={formattedContent.imageUrl || "/placeholder.svg"}
                      alt="Preview"
                      className="max-w-full max-h-[150px] object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=150&width=300&query=Preview"
                      }}
                    />
                  </div>
                )}

                {formattedContent.hashtags && formattedContent.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formattedContent.hashtags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <div className="border-t p-3 bg-background">
                <p className="text-xs text-muted-foreground truncate">{shareUrl}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="qrcode" className="space-y-4 pt-4">
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
          {/* Content Preview */}
          <div className="border rounded-md overflow-hidden mb-4">
            <div className="bg-muted p-4">
              <h3 className="font-medium mb-2">{formattedContent.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{formattedContent.description}</p>

              {formattedContent.imageUrl && (
                <div className="rounded-md overflow-hidden mb-3 bg-black/10 aspect-video flex items-center justify-center">
                  <img
                    src={formattedContent.imageUrl || "/placeholder.svg"}
                    alt="Preview"
                    className="max-w-full max-h-[150px] object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=150&width=300&query=Preview"
                    }}
                  />
                </div>
              )}

              {formattedContent.hashtags && formattedContent.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {formattedContent.hashtags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {platforms.map((platform) => (
              <Button
                key={platform}
                variant="outline"
                className={`flex flex-col items-center justify-center h-20 p-2`}
                style={{
                  backgroundColor: `${socialPlatforms[platform as keyof typeof socialPlatforms]?.color}10`,
                  borderColor: `${socialPlatforms[platform as keyof typeof socialPlatforms]?.color}30`,
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
              <Smartphone className="h-4 w-4 mr-2" />
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
            <div className="border rounded-md overflow-hidden">
              <div className="bg-muted p-4">
                <h3 className="font-medium mb-2">{formattedContent.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{formattedContent.description}</p>

                {formattedContent.imageUrl && (
                  <div className="rounded-md overflow-hidden mb-3 bg-black/10 aspect-video flex items-center justify-center">
                    <img
                      src={formattedContent.imageUrl || "/placeholder.svg"}
                      alt="Preview"
                      className="max-w-full max-h-[150px] object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=150&width=300&query=Preview"
                      }}
                    />
                  </div>
                )}

                {formattedContent.hashtags && formattedContent.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formattedContent.hashtags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <div className="border-t p-3 bg-background">
                <p className="text-xs text-muted-foreground truncate">{shareUrl}</p>
              </div>
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
