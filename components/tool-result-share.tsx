"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SocialShare } from "@/components/social-share"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Share2, ImageIcon, FileText, Settings, Camera, Share } from "lucide-react"
import type { ShareableContent } from "@/lib/services/social-sharing-service"
import socialSharingService from "@/lib/services/social-sharing-service"
import { generateId } from "@/lib/utils"

interface ToolResultShareProps {
  toolName: string
  resultTitle: string
  resultDescription: string
  resultImageUrl?: string
  resultData?: Record<string, any>
  tags?: string[]
  className?: string
  resultId?: string
  shareUrl?: string
  onShare?: (shareId: string) => void
}

export function ToolResultShare({
  toolName,
  resultTitle,
  resultDescription,
  resultImageUrl,
  resultData,
  tags = [],
  className = "",
  resultId,
  shareUrl,
  onShare,
}: ToolResultShareProps) {
  const [shareContent, setShareContent] = useState<ShareableContent>({
    title: `${toolName} Result: ${resultTitle}`,
    description: resultDescription,
    url: typeof window !== "undefined" ? window.location.href : "",
    imageUrl: resultImageUrl,
    hashtags: ["numoracle", ...tags],
  })

  const [customMessage, setCustomMessage] = useState("")
  const [includeDetails, setIncludeDetails] = useState(true)
  const [includeImage, setIncludeImage] = useState(true)
  const [activeTab, setActiveTab] = useState("share")
  const { toast } = useToast()
  const [isSharing, setIsSharing] = useState(false)
  const [shareComplete, setShareComplete] = useState(false)

  // Generate a shareable image of the result
  const generateShareableImage = async () => {
    toast({
      title: "Generating Image",
      description: "Creating a shareable image of your result...",
    })

    // In a real implementation, this would call an API to generate an image
    // For this example, we'll simulate a delay and then show a success message

    setTimeout(() => {
      toast({
        title: "Image Generated",
        description: "Your shareable image is ready to download.",
      })
    }, 2000)
  }

  // Generate a shareable PDF of the result
  const generateShareablePDF = async () => {
    toast({
      title: "Generating PDF",
      description: "Creating a shareable PDF of your result...",
    })

    // In a real implementation, this would call an API to generate a PDF
    // For this example, we'll simulate a delay and then show a success message

    setTimeout(() => {
      toast({
        title: "PDF Generated",
        description: "Your shareable PDF is ready to download.",
      })
    }, 2000)
  }

  // Take a screenshot of the result
  const takeScreenshot = async () => {
    toast({
      title: "Taking Screenshot",
      description: "Capturing your result...",
    })

    // In a real implementation, this would use a library like html2canvas
    // For this example, we'll simulate a delay and then show a success message

    setTimeout(() => {
      toast({
        title: "Screenshot Taken",
        description: "Your result screenshot is ready to share.",
      })
    }, 2000)
  }

  // Update share content when customization options change
  const updateShareContent = () => {
    let description = customMessage || resultDescription

    if (includeDetails && resultData) {
      const details = Object.entries(resultData)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ")

      description = `${description}\n\n${details}`
    }

    setShareContent({
      ...shareContent,
      description: socialSharingService.createShareableSummary(description, 280),
      imageUrl: includeImage ? resultImageUrl : undefined,
    })

    setActiveTab("share")
  }

  const handleShare = async () => {
    try {
      setIsSharing(true)

      // Generate a share ID if one wasn't provided
      const shareId = resultId || generateId()

      // Use Web Share API if available
      if (navigator.share && shareUrl) {
        await navigator.share({
          title: `My ${toolName} Result`,
          text: `Check out my ${toolName} result from NUMO Oracle!`,
          url: shareUrl,
        })
      } else if (shareUrl) {
        // Fallback to clipboard copy
        await navigator.clipboard.writeText(shareUrl)
      }

      // Track the share event
      if (onShare) {
        onShare(shareId)
      }

      // Log analytics
      try {
        await fetch("/api/analytics/share", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            toolName,
            shareId,
            timestamp: new Date().toISOString(),
          }),
        })
      } catch (analyticsError) {
        console.error("Failed to log share analytics:", analyticsError)
      }

      setShareComplete(true)
      setTimeout(() => setShareComplete(false), 2000)
    } catch (error) {
      console.error("Error sharing result:", error)
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Share2 className="h-5 w-5 mr-2" />
          Share Your {toolName} Result
        </CardTitle>
        <CardDescription>Share your insights with friends and family</CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="share">Share</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
          </TabsList>

          <TabsContent value="share" className="space-y-4 mt-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2">{shareContent.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{shareContent.description}</p>

              {includeDetails && resultData && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {Object.entries(resultData).map(([key, value]) => (
                    <Badge key={key} variant="outline" className="bg-purple-500/10">
                      {key}: {value}
                    </Badge>
                  ))}
                </div>
              )}

              {shareContent.hashtags && (
                <div className="flex flex-wrap gap-1">
                  {shareContent.hashtags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <SocialShare
              content={shareContent}
              variant="expanded"
              onShare={(platform) => {
                toast({
                  title: "Shared!",
                  description: `Your result has been shared on ${platform}.`,
                })
              }}
            />

            <div className="grid grid-cols-3 gap-2 mt-4">
              <Button variant="outline" onClick={takeScreenshot}>
                <Camera className="h-4 w-4 mr-2" />
                Screenshot
              </Button>
              <Button variant="outline" onClick={generateShareableImage}>
                <ImageIcon className="h-4 w-4 mr-2" />
                Generate Image
              </Button>
              <Button variant="outline" onClick={generateShareablePDF}>
                <FileText className="h-4 w-4 mr-2" />
                Generate PDF
              </Button>
            </div>
            <Button onClick={handleShare} variant="outline" size="sm" className="gap-2 mt-4" disabled={isSharing}>
              <Share className="h-4 w-4" />
              {shareComplete ? "Shared!" : "Share"}
            </Button>
          </TabsContent>

          <TabsContent value="customize" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="custom-message">Custom Message</Label>
                <Textarea
                  id="custom-message"
                  placeholder="Add a personal message to your share..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">{280 - customMessage.length} characters remaining</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-details" className="cursor-pointer">
                    Include Result Details
                  </Label>
                  <Switch
                    id="include-details"
                    checked={includeDetails}
                    onCheckedChange={setIncludeDetails}
                    disabled={!resultData}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="include-image" className="cursor-pointer">
                    Include Result Image
                  </Label>
                  <Switch
                    id="include-image"
                    checked={includeImage}
                    onCheckedChange={setIncludeImage}
                    disabled={!resultImageUrl}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="hashtags">Hashtags</Label>
                <Input
                  id="hashtags"
                  placeholder="numoracle, divination, spirituality"
                  value={shareContent.hashtags?.join(", ")}
                  onChange={(e) => {
                    const tags = e.target.value
                      .split(",")
                      .map((tag) => tag.trim().replace(/^#/, ""))
                      .filter(Boolean)

                    setShareContent({
                      ...shareContent,
                      hashtags: tags,
                    })
                  }}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">Separate hashtags with commas</p>
              </div>

              <div>
                <Label htmlFor="share-title">Share Title</Label>
                <Input
                  id="share-title"
                  placeholder={`${toolName} Result: ${resultTitle}`}
                  value={shareContent.title}
                  onChange={(e) => {
                    setShareContent({
                      ...shareContent,
                      title: e.target.value,
                    })
                  }}
                  className="mt-1"
                />
              </div>
            </div>

            <Button className="w-full" onClick={updateShareContent}>
              Apply Changes
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-4">
        <p className="text-xs text-muted-foreground">Sharing helps spread the wisdom of NUMO Oracle</p>
        <Button variant="ghost" size="sm" onClick={() => setActiveTab("customize")}>
          <Settings className="h-4 w-4 mr-2" />
          Customize
        </Button>
      </CardFooter>
    </Card>
  )
}
