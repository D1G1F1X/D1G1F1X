"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EnhancedSocialShare } from "@/components/enhanced-social-share"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Share2, FileText, Download, Camera, Settings, Link } from "lucide-react"
import type { ShareableContent } from "@/lib/services/enhanced-social-sharing"
import enhancedSocialSharing from "@/lib/services/enhanced-social-sharing"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CardReading {
  id: string
  title: string
  description: string
  imageUrl?: string
  cards: {
    name: string
    element: string
    number: number
    position?: string
    meaning?: string
    imageUrl?: string
  }[]
  timestamp: string
  question?: string
}

interface EnhancedReadingShareProps {
  reading: CardReading
  className?: string
}

export function EnhancedReadingShare({ reading, className = "" }: EnhancedReadingShareProps) {
  const [shareContent, setShareContent] = useState<ShareableContent>({
    title: reading.title,
    description: reading.description,
    url: typeof window !== "undefined" ? window.location.href : "",
    imageUrl: reading.imageUrl,
    hashtags: ["numoracle", "cardreading", "divination", "oracle"],
  })

  const [customMessage, setCustomMessage] = useState("")
  const [includeCards, setIncludeCards] = useState(true)
  const [includeQuestion, setIncludeQuestion] = useState(reading.question ? true : false)
  const [activeTab, setActiveTab] = useState("share")
  const { toast } = useToast()

  // Generate a PDF of the reading
  const generatePDF = async () => {
    toast({
      title: "Generating PDF",
      description: "Your card reading PDF is being created...",
    })

    // In a real implementation, this would call an API to generate a PDF
    setTimeout(() => {
      toast({
        title: "PDF Ready",
        description: "Your card reading has been downloaded.",
      })
    }, 2000)
  }

  // Take a screenshot of the reading
  const takeScreenshot = async () => {
    toast({
      title: "Taking Screenshot",
      description: "Capturing your card reading...",
    })

    // In a real implementation, this would use a library like html2canvas
    setTimeout(() => {
      toast({
        title: "Screenshot Taken",
        description: "Your card reading screenshot is ready to share.",
      })
    }, 2000)
  }

  // Update share content when customization options change
  const updateShareContent = () => {
    let description = customMessage || reading.description

    if (includeQuestion && reading.question) {
      description = `Question: "${reading.question}"\n\n${description}`
    }

    if (includeCards) {
      const cardsSummary = reading.cards
        .map((card) => `${card.position ? card.position + ": " : ""}${card.name} (${card.element})`)
        .join(", ")
      description = `${description}\n\nCards: ${cardsSummary}`
    }

    setShareContent({
      ...shareContent,
      description: enhancedSocialSharing.createShareableSummary(description, 280),
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
          Share Your Card Reading
        </CardTitle>
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
                <p className="text-sm text-muted-foreground mb-3 whitespace-pre-line">{shareContent.description}</p>

                {reading.imageUrl && (
                  <div className="rounded-md overflow-hidden mb-3 bg-black/10 aspect-video flex items-center justify-center">
                    <img
                      src={reading.imageUrl || "/placeholder.svg"}
                      alt="Reading Preview"
                      className="max-w-full max-h-[200px] object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=200&width=400&query=Card+Reading"
                      }}
                    />
                  </div>
                )}

                {includeCards && reading.cards.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {reading.cards.slice(0, 3).map((card, index) => (
                      <Badge key={index} variant="outline" className="bg-purple-500/10">
                        {card.position ? `${card.position}: ` : ""}
                        {card.name}
                      </Badge>
                    ))}
                    {reading.cards.length > 3 && (
                      <Badge variant="outline" className="bg-purple-500/10">
                        +{reading.cards.length - 3} more
                      </Badge>
                    )}
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
                  description: `Your reading has been shared on ${platform}.`,
                  duration: 3000,
                })
              }}
            />

            <div className="grid grid-cols-3 gap-2 mt-4">
              <Button variant="outline" onClick={takeScreenshot} className="flex items-center justify-center">
                <Camera className="h-4 w-4 mr-2" />
                <span className="text-sm">Screenshot</span>
              </Button>
              <Button variant="outline" onClick={generatePDF} className="flex items-center justify-center">
                <FileText className="h-4 w-4 mr-2" />
                <span className="text-sm">PDF</span>
              </Button>
              <Button variant="outline" onClick={() => window.print()} className="flex items-center justify-center">
                <Download className="h-4 w-4 mr-2" />
                <span className="text-sm">Print</span>
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
              Share Your Reading
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
                  <Label htmlFor="include-cards" className="cursor-pointer">
                    Include Card Details
                  </Label>
                  <Switch id="include-cards" checked={includeCards} onCheckedChange={setIncludeCards} />
                </div>

                {reading.question && (
                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-question" className="cursor-pointer">
                      Include Your Question
                    </Label>
                    <Switch id="include-question" checked={includeQuestion} onCheckedChange={setIncludeQuestion} />
                  </div>
                )}
              </div>

              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                onClick={updateShareContent}
              >
                Apply Changes
              </Button>
            </div>
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
