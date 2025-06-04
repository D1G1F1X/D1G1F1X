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

interface NumerologyReport {
  id: string
  title: string
  description: string
  imageUrl?: string
  numbers: {
    lifePathNumber: number
    destinyNumber: number
    personalityNumber: number
    soulUrgeNumber: number
    [key: string]: any
  }
  name: string
  birthDate: string
}

interface NumerologyReportShareProps {
  report: NumerologyReport
  className?: string
}

export function NumerologyReportShare({ report, className = "" }: NumerologyReportShareProps) {
  const [shareContent, setShareContent] = useState<ShareableContent>({
    title: report.title,
    description: report.description,
    url: typeof window !== "undefined" ? window.location.href : "",
    imageUrl: report.imageUrl,
    hashtags: ["numoracle", "numerology", `lifepath${report.numbers.lifePathNumber}`, "spirituality"],
  })

  const [customMessage, setCustomMessage] = useState("")
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [activeTab, setActiveTab] = useState("share")
  const { toast } = useToast()

  // Generate a PDF of the report
  const generatePDF = async () => {
    toast({
      title: "Generating PDF",
      description: "Your numerology report PDF is being created...",
    })

    // In a real implementation, this would call an API to generate a PDF
    setTimeout(() => {
      toast({
        title: "PDF Ready",
        description: "Your numerology report has been downloaded.",
      })
    }, 2000)
  }

  // Take a screenshot of the report
  const takeScreenshot = async () => {
    toast({
      title: "Taking Screenshot",
      description: "Capturing your numerology report...",
    })

    // In a real implementation, this would use a library like html2canvas
    setTimeout(() => {
      toast({
        title: "Screenshot Taken",
        description: "Your numerology report screenshot is ready to share.",
      })
    }, 2000)
  }

  // Update share content when customization options change
  const updateShareContent = () => {
    let description = customMessage || report.description

    if (includeNumbers) {
      const numbersSummary = `Life Path: ${report.numbers.lifePathNumber}, Destiny: ${report.numbers.destinyNumber}, Soul Urge: ${report.numbers.soulUrgeNumber}, Personality: ${report.numbers.personalityNumber}`
      description = `${description}\n\n${numbersSummary}`
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
          Share Your Numerology Report
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
              <p className="text-sm text-muted-foreground">{shareContent.description}</p>
            </div>

            <SocialShare
              content={shareContent}
              variant="expanded"
              onShare={(platform) => {
                toast({
                  title: "Shared!",
                  description: `Your numerology report has been shared on ${platform}.`,
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
                Print Report
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

              <div className="flex items-center justify-between">
                <Label htmlFor="include-numbers" className="cursor-pointer">
                  Include Numerology Numbers
                </Label>
                <Switch id="include-numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
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
