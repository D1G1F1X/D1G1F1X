"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SocialShare } from "@/components/social-share"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Share2, FileText, Download, Camera } from "lucide-react"
import type { ShareableContent } from "@/lib/services/social-sharing-service"

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

interface ReadingShareProps {
  reading: CardReading
  className?: string
}

export function ReadingShare({ reading, className = "" }: ReadingShareProps) {
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
      description,
    })

    setActiveTab("share")

    toast({
      title: "Share Content Updated",
      description: "Your customized share content is ready.",
    })
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Share2 className="h-5 w-5 mr-2" />
          Share Your Card Reading
        </CardTitle>
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
              <p className="text-sm text-muted-foreground whitespace-pre-line">{shareContent.description}</p>
            </div>

            <SocialShare
              content={shareContent}
              variant="expanded"
              onShare={(platform) => {
                toast({
                  title: "Shared!",
                  description: `Your card reading has been shared on ${platform}.`,
                })
              }}
            />

            <div className="grid grid-cols-3 gap-2 mt-4">
              <Button variant="outline" onClick={takeScreenshot}>
                <Camera className="h-4 w-4 mr-2" />
                Screenshot
              </Button>
              <Button variant="outline" onClick={generatePDF}>
                <FileText className="h-4 w-4 mr-2" />
                Generate PDF
              </Button>
              <Button variant="outline" onClick={() => window.print()}>
                <Download className="h-4 w-4 mr-2" />
                Print Reading
              </Button>
            </div>
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

              <Button className="w-full" onClick={updateShareContent}>
                Apply Changes
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
