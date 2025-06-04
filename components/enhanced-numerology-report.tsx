"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NumerologyReportShare } from "@/components/numerology-report-share"
import { Save, Download, Share2, Printer } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  calculateLifePath,
  calculateDestinyNumber,
  calculateSoulUrgeNumber,
  calculatePersonalityNumber,
} from "@/lib/numerology"
import { numberData } from "@/data/number-meanings"

interface NumerologyProfile {
  id: string
  name: string
  birthDate: Date
  lifePathNumber: number
  destinyNumber: number
  personalityNumber: number
  soulUrgeNumber: number
  expressionNumber?: number
  maturityNumber?: number
  birthdayNumber?: number
  balanceNumber?: number
  createdAt: Date
  currentName?: string
  nicknames?: string
  challengeNumbers?: number[]
  pinnacleNumbers?: number[]
  personalYear?: number
  personalMonth?: number
  personalDay?: number
  karmicLessons?: number[]
  hiddenPassionNumber?: number
  bridgeNumber?: number
  notes?: string
}

interface EnhancedNumerologyReportProps {
  profile: {
    id: string
    birthName: string
    currentName?: string
    birthDate: Date
    numbers: {
      lifePathNumber: number
      destinyNumber: number
      personalityNumber: number
      soulUrgeNumber: number
      birthdayNumber: number
      maturityNumber: number
      [key: string]: any
    }
    imageUrl?: string
  }
  className?: string
}

export function EnhancedNumerologyReport({ profile, className = "" }: EnhancedNumerologyReportProps) {
  const [isClient, setIsClient] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [showSharePanel, setShowSharePanel] = useState(false)
  const { toast } = useToast()

  // User input states
  const [birthName, setBirthName] = useState("")
  const [currentName, setCurrentName] = useState("")
  const [nicknames, setNicknames] = useState("")
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined)
  const [email, setEmail] = useState("")
  const [question, setQuestion] = useState("")

  // Report states
  const [generatedProfile, setGeneratedProfile] = useState<NumerologyProfile | null>(null)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    lifePathSection: true,
    destinySection: false,
    soulUrgeSection: false,
    personalitySection: false,
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")

  // UI control states
  const [showSettings, setShowSettings] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [showPremiumOverlay, setShowPremiumOverlay] = useState(false)

  // Settings
  const [includePersonalInsights, setIncludePersonalInsights] = useState(true)
  const [includeFutureProjections, setIncludeFutureProjections] = useState(true)

  // Use useEffect to ensure we only run client-side code after mounting
  useEffect(() => {
    setIsClient(true)
  }, [])

  // If not client-side yet, render a minimal placeholder
  if (!isClient) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Numerology Report Generator</h2>
          <p>Loading report generator...</p>
        </CardContent>
      </Card>
    )
  }

  const handleSave = () => {
    toast({
      title: "Report Saved",
      description: "Your numerology report has been saved to your account.",
    })
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your report is being prepared for download.",
    })

    // In a real app, this would generate a PDF
    // For demo purposes, we'll just show a success message after a delay
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Your report has been downloaded as a PDF.",
      })
    }, 1500)
  }

  const handleShare = () => {
    setShowSharePanel(!showSharePanel)
  }

  // Calculate all numerology numbers
  const calculateNumerologyProfile = () => {
    if (!birthName || !birthDate) {
      setError("Please provide both your birth name and birth date")
      return
    }

    setError("")
    setIsGenerating(true)

    try {
      // Calculate core numbers
      const lifePathNumber = calculateLifePath(birthDate)
      const destinyNumber = calculateDestinyNumber(birthName)
      const soulUrgeNumber = calculateSoulUrgeNumber(birthName)
      const personalityNumber = calculatePersonalityNumber(birthName)

      // Create profile with unique ID
      const newProfile: NumerologyProfile = {
        id: `report-${Date.now()}`,
        name: birthName,
        currentName,
        nicknames,
        birthDate,
        lifePathNumber,
        destinyNumber,
        soulUrgeNumber,
        personalityNumber,
        createdAt: new Date(),
      }

      setGeneratedProfile(newProfile)
      setActiveTab("core")

      toast({
        title: "Report Generated",
        description: "Your numerology report is ready to explore.",
      })
    } catch (err) {
      console.error("Error generating report:", err)
      setError("An error occurred while generating your report. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  // Get number meaning from numberData
  const getNumberMeaning = (number: number): string => {
    const data = numberData.find((item) => item.number === number)
    return data ? data.description : "No meaning available for this number."
  }

  // Get detailed number interpretation
  const getDetailedInterpretation = (number: number, type: string): string => {
    const data = numberData.find((item) => item.number === number)

    if (!data) return "No detailed interpretation available."

    let interpretation = ""

    switch (type) {
      case "lifePath":
        interpretation = `As a Life Path ${number}, ${data.description} Your life's journey is about ${data.keywords.join(", ").toLowerCase()}. ${data.numerologyMeaning}`
        break
      case "destiny":
        interpretation = `Your Destiny Number ${number} reveals that ${data.description} Your life's purpose involves ${data.keywords.join(", ").toLowerCase()}. This number represents what you are destined to achieve and become.`
        break
      case "soul":
        interpretation = `Your Soul Urge Number ${number} indicates that deep within, you desire ${data.keywords.join(", ").toLowerCase()}. ${data.description} This number reveals your inner cravings, motivations, and what brings you true satisfaction.`
        break
      case "personality":
        interpretation = `With a Personality Number ${number}, you present yourself to others as someone who embodies ${data.keywords.join(", ").toLowerCase()}. ${data.description} This is the aspect of yourself that you allow others to see.`
        break
      default:
        interpretation = data.description
    }

    return interpretation
  }

  // Handle premium feature click
  const handlePremiumFeatureClick = () => {
    setShowPremiumOverlay(true)
  }

  return (
    <TooltipProvider>
      <div className={`space-y-6 ${className}`}>
        <div className="flex flex-wrap gap-2 justify-end">
          <Button variant="outline" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>

        {showSharePanel && (
          <NumerologyReportShare
            report={{
              id: profile.id,
              title: `Numerology Report for ${profile.birthName}`,
              description: `Discover the numerological insights for ${profile.birthName}, including Life Path ${profile.numbers.lifePathNumber}, Destiny ${profile.numbers.destinyNumber}, and more.`,
              imageUrl: profile.imageUrl,
              numbers: profile.numbers,
              name: profile.birthName,
              birthDate: profile.birthDate.toISOString(),
            }}
          />
        )}

        <Card className="border-purple-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950">
            <CardTitle className="text-2xl">Numerology Report for {profile.birthName}</CardTitle>
            <CardDescription>Birth Date: {profile.birthDate.toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full rounded-none border-b">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="core-numbers">Core Numbers</TabsTrigger>
                <TabsTrigger value="personality">Personality</TabsTrigger>
                <TabsTrigger value="life-path">Life Path</TabsTrigger>
                <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
              </TabsList>

              <div className="p-6">
                <TabsContent value="overview" className="mt-0">
                  <h3 className="text-xl font-semibold mb-4">Your Numerology Overview</h3>
                  <p className="mb-4">
                    This numerology report provides insights into your personal numbers and their influence on your
                    life, personality, and potential. Based on your birth name and date, we've calculated your core
                    numbers and their meanings.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                      <CardHeader className="p-3">
                        <CardTitle className="text-lg">Life Path</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 pt-0">
                        <div className="text-3xl font-bold text-center text-purple-600">
                          {profile.numbers.lifePathNumber}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="p-3">
                        <CardTitle className="text-lg">Destiny</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 pt-0">
                        <div className="text-3xl font-bold text-center text-indigo-600">
                          {profile.numbers.destinyNumber}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="p-3">
                        <CardTitle className="text-lg">Soul Urge</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 pt-0">
                        <div className="text-3xl font-bold text-center text-blue-600">
                          {profile.numbers.soulUrgeNumber}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="p-3">
                        <CardTitle className="text-lg">Personality</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 pt-0">
                        <div className="text-3xl font-bold text-center text-violet-600">
                          {profile.numbers.personalityNumber}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <p>
                    Your Life Path number {profile.numbers.lifePathNumber} indicates your life's purpose and the path
                    you'll take to fulfill it. Your Destiny number {profile.numbers.destinyNumber} reveals your goals
                    and ultimate direction in life. Your Soul Urge number {profile.numbers.soulUrgeNumber} represents
                    your inner desires and motivations, while your Personality number{" "}
                    {profile.numbers.personalityNumber} shows how others perceive you.
                  </p>
                </TabsContent>

                <TabsContent value="core-numbers" className="mt-0">
                  <h3 className="text-xl font-semibold mb-4">Your Core Numbers</h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-medium mb-2">Life Path Number: {profile.numbers.lifePathNumber}</h4>
                      <p>
                        Your Life Path number is derived from your birth date and represents the path you'll walk
                        through life. It reveals your purpose, opportunities, challenges, and lessons you'll learn.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-2">Destiny Number: {profile.numbers.destinyNumber}</h4>
                      <p>
                        Your Destiny number (also called Expression number) is calculated from all the letters in your
                        birth name. It indicates your natural abilities, talents, and the goals you're likely to achieve
                        in this lifetime.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-2">Soul Urge Number: {profile.numbers.soulUrgeNumber}</h4>
                      <p>
                        Your Soul Urge number (also called Heart's Desire) is derived from the vowels in your birth
                        name. It reveals your inner cravings, motivations, and what truly makes you happy.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-2">
                        Personality Number: {profile.numbers.personalityNumber}
                      </h4>
                      <p>
                        Your Personality number comes from the consonants in your birth name. It shows how you appear to
                        others, your outer personality, and the traits people first notice about you.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-2">Birthday Number: {profile.numbers.birthdayNumber}</h4>
                      <p>
                        Your Birthday number is simply the day of the month you were born. It represents a special
                        talent or ability you possess that can help you fulfill your life's purpose.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-2">Maturity Number: {profile.numbers.maturityNumber}</h4>
                      <p>
                        Your Maturity number is calculated from your Life Path and Destiny numbers. It indicates the
                        direction your life will take as you mature and the wisdom you'll gain in your later years.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="personality" className="mt-0">
                  {/* Personality tab content */}
                  <h3 className="text-xl font-semibold mb-4">Your Personality Profile</h3>
                  <p className="mb-4">
                    Based on your numerology numbers, here's an analysis of your personality traits, strengths, and
                    challenges.
                  </p>

                  {/* Content would continue here */}
                </TabsContent>

                <TabsContent value="life-path" className="mt-0">
                  {/* Life Path tab content */}
                  <h3 className="text-xl font-semibold mb-4">Your Life Path Journey</h3>
                  <p className="mb-4">
                    Your Life Path number {profile.numbers.lifePathNumber} guides your journey through life. Here's what
                    it means for you.
                  </p>

                  {/* Content would continue here */}
                </TabsContent>

                <TabsContent value="compatibility" className="mt-0">
                  {/* Compatibility tab content */}
                  <h3 className="text-xl font-semibold mb-4">Numerology Compatibility</h3>
                  <p className="mb-4">
                    Discover how your numbers interact with others and which Life Path numbers are most compatible with
                    yours.
                  </p>

                  {/* Content would continue here */}
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-4">
            <p className="text-sm text-muted-foreground">Generated on {new Date().toLocaleDateString()}</p>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share Report
            </Button>
          </CardFooter>
        </Card>
      </div>
    </TooltipProvider>
  )
}

// Helper components for rendering
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  )
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
