"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EnhancedSocialShare } from "@/components/enhanced-social-share"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Share2, ImageIcon, FileText, Settings, Camera, Download, Link } from "lucide-react"
import type { ShareableContent } from "@/lib/services/enhanced-social-sharing"
import enhancedSocialSharing from "@/lib/services/enhanced-social-sharing"
import { cn } from "@/lib/utils"

interface EnhancedToolResultShareProps {
  toolName: string
  resultTitle: string
  resultDescription: string
  resultImageUrl?: string
  resultData?: Record<string, any>
  tags?: string[]
  className?: string
}

export function EnhancedToolResultShare({
  toolName,
  resultTitle,
  resultDescription,
  resultImageUrl,
  resultData,
  tags = [],
  className = "",
}: EnhancedToolResultShareProps) {
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

  // Generate a shareable image of the result
  const generateShareableImage = async () => {
    toast({
      title: "Generating Image",
      description: "Creating a shareable image of your result...",
    })

    // In a real implementation, this would call an API to generate an image
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
      description: enhancedSocialSharing.createShareableSummary(description, 280),
      imageUrl: includeImage ? resultImageUrl : undefined,
    })

    setActiveTab("share")

    toast({
      title: "Share Content Updated",
      description: "Your customized share content is ready.",
      duration: 3000,
    })
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 pb-4">
        <CardTitle className="flex items-center text-white">
          <Share2 className="h-5 w-5 mr-2" />
          Share Your {toolName} Result
        </CardTitle>
        <CardDescription className="text-white/80">Share your insights with friends and family</CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="share">Share</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
          </TabsList>

          <TabsContent value="share" className="space-y-4 mt-4">
            {/* Preview Card */}
            <div className="border rounded-md overflow-hidden">
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
                <h3 className="font-medium text-base mb-2">{shareContent.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{shareContent.description}</p>

                {includeImage && resultImageUrl && (
                  <div className="rounded-md overflow-hidden mb-3 bg-black/10 aspect-video flex items-center justify-center">
                    <img
                      src={resultImageUrl || "/placeholder.svg"}
                      alt="Result Preview"
                      className="max-w-full max-h-[200px] object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=200&width=400&query=Result+Preview"
                      }}
                    />
                  </div>
                )}

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
                  <div className="flex flex-wrap gap-1 mt-2">
                    {shareContent.hashtags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <div className="border-t p-3 bg-background">
                <p className="text-xs text-muted-foreground truncate flex items-center">
                  <Link className="h-3 w-3 mr-1" />
                  {typeof window !== "undefined" ? window.location.href : "numoracle.com"}
                </p>
              </div>
            </div>

            <EnhancedSocialShare
              content={shareContent}
              variant="inline"
              onShare={(platform) => {
                toast({
                  title: "Shared!",
                  description: `Your result has been shared on ${platform}.`,
                  duration: 3000,
                })
              }}
            />

            <div className="grid grid-cols-3 gap-2 mt-4">
              <Button variant="outline" onClick={takeScreenshot} className="flex items-center justify-center">
                <Camera className="h-4 w-4 mr-2" />
                <span className="text-sm">Screenshot</span>
              </Button>
              <Button variant="outline" onClick={generateShareableImage} className="flex items-center justify-center">
                <ImageIcon className="h-4 w-4 mr-2" />
                <span className="text-sm">Image</span>
              </Button>
              <Button variant="outline" onClick={generateShareablePDF} className="flex items-center justify-center">
                <FileText className="h-4 w-4 mr-2" />
                <span className="text-sm">PDF</span>
              </Button>
            </div>

            <Button
              variant="default"
              className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              onClick={() => {
                const url = typeof window !== "undefined" ? window.location.href : ""
                enhancedSocialSharing.copyToClipboard(url).then((success) => {
                  if (success) {
                    toast({
                      title: "Link Copied!",
                      description: "Share link has been copied to clipboard",
                      duration: 3000,
                    })
                  }
                })
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Download & Share
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

            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              onClick={updateShareContent}
            >
              Apply Changes
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-4 bg-muted/30">
        <p className="text-xs text-muted-foreground">Sharing helps spread the wisdom of NUMO Oracle</p>
        <Button variant="ghost" size="sm" onClick={() => setActiveTab("customize")}>
          <Settings className="h-4 w-4 mr-2" />
          Customize
        </Button>
      </CardFooter>
    </Card>
  )
}
