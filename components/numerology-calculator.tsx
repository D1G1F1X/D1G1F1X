"use client"

import { Badge } from "@/components/ui/badge"
import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calculator,
  User,
  FileText,
  Sparkles,
  Download,
  Share2,
  ChevronDown,
  ChevronUp,
  Star,
  Heart,
} from "lucide-react"
import { MembershipBadge } from "@/components/membership-badge"
import { type MembershipStatus, hasPremiumAccess } from "@/lib/membership-types"
import { userDataService, type UserProfile } from "@/lib/services/user-data-service"
import { toast } from "@/components/ui/use-toast"
import { numoDefinitions } from "@/data/numo-definitions"
import { NumberChart } from "./numerology-calculator/number-chart"
import {
  calculateExpressionNumber,
  calculateMaturityNumber,
  calculateChallengeNumbers,
  calculatePinnacleNumbers,
  getNumerologyReport,
  getSingleDigitMeaning, // Import the new helper
  calculateLifePathNumber,
  calculateSoulUrgeNumber,
  calculatePersonalityNumber,
} from "@/lib/numerology"
import { numoNumberDefinitions } from "@/data/numo-definitions" // Corrected import

interface NumerologyProfile {
  birthName: string
  currentName: string
  nicknames: string
  birthDate: Date
  lifePathNumber: number
  destinyNumber: number
  soulUrgeNumber: number
  personalityNumber: number
  birthdayNumber: number
  maturityNumber: number
  balanceNumber?: number
  challengeNumbers?: number[]
  pinnacleNumbers?: number[]
  personalYear?: number
  personalMonth?: number
  personalDay?: number
  karmicLessons?: number[]
  hiddenPassionNumber?: number
  expressionNumber?: number
  bridgeNumber?: number
}

interface NumerologyCalculatorProps {
  membershipStatus?: MembershipStatus
  onVerifyPurchase?: (purchaseId: string) => void
  hasPrivacyConsent?: boolean
  onReportCalculated?: (data: any) => void
}

export default function NumerologyCalculator({
  membershipStatus = { type: "free", verified: true },
  onVerifyPurchase,
  hasPrivacyConsent = false,
  onReportCalculated,
}: NumerologyCalculatorProps) {
  const hasPremium = hasPremiumAccess(membershipStatus.type)

  const [birthName, setBirthName] = useState("")
  const [currentName, setCurrentName] = useState("")
  const [nicknames, setNicknames] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [profile, setProfile] = useState<NumerologyProfile | null>(null)
  const [activeTab, setActiveTab] = useState("calculator")
  const [activeReportTab, setActiveReportTab] = useState("core")
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [expressionNumberSimple, setExpressionNumberSimple] = useState<number | null>(null)
  const [soulUrgeNumberSimple, setSoulUrgeNumberSimple] = useState<number | null>(null)
  const [personalityNumberSimple, setPersonalityNumberSimple] = useState<number | null>(null)
  const [lifePathNumberSimple, setLifePathNumberSimple] = useState<number | null>(null)

  // Ensure we're on the client before accessing localStorage or other browser APIs
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load user data only on client side
  useEffect(() => {
    if (!isClient || !hasPrivacyConsent) return

    try {
      const profile = userDataService.getUserProfile()
      if (profile) {
        setUserProfile(profile)
        setBirthName(profile.fullName || "")
        setBirthDate(profile.birthDate || "")
        setCurrentName(profile.currentName || "")
      }
    } catch (error) {
      console.error("Error loading user profile:", error)
    }
  }, [isClient, hasPrivacyConsent])

  // Auto-save form data with client-side check
  useEffect(() => {
    if (!isClient || !hasPrivacyConsent) return

    const timeoutId = setTimeout(() => {
      if (birthName || birthDate || currentName) {
        const profileData: Partial<UserProfile> = {}
        if (birthName) profileData.fullName = birthName
        if (birthDate) profileData.birthDate = birthDate
        if (currentName) profileData.currentName = currentName

        try {
          userDataService.saveUserProfile(profileData)
        } catch (error) {
          console.error("Error saving user profile:", error)
        }
      }
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [birthName, birthDate, currentName, hasPrivacyConsent, isClient])

  // Helper function to create a date from YYYY-MM-DD string without timezone issues
  const createDateFromString = (dateString: string): Date => {
    const [year, month, day] = dateString.split("-").map(Number)
    // Create date in local timezone to avoid UTC conversion issues
    return new Date(year, month - 1, day)
  }

  // Helper function to format date for display
  const formatDateForDisplay = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Helper function to reduce a number to a single digit (except master numbers)
  const reduceToSingleDigit = (num: number): number => {
    if (num === 11 || num === 22 || num === 33) return num
    if (num < 10) return num
    return reduceToSingleDigit(
      num
        .toString()
        .split("")
        .reduce((sum, digit) => sum + Number.parseInt(digit), 0),
    )
  }

  // Convert a letter to its numerological value
  const letterToNumber = (letter: string): number => {
    return numoDefinitions.letterValues[letter.toUpperCase()] || 0
  }

  // Calculate bridge number between two numbers
  const calculateBridgeNumber = (num1: number, num2: number): number => {
    return reduceToSingleDigit(Math.abs(num1 - num2))
  }

  // Calculate balance number from first letters of each name
  const calculateBalanceNumber = (fullName: string): number => {
    const firstLetters = fullName
      .split(" ")
      .map((name) => name.charAt(0).toLowerCase())
      .filter((letter) => letter)

    const sum = firstLetters.reduce((acc, letter) => acc + letterToNumber(letter), 0)
    return reduceToSingleDigit(sum)
  }

  // Calculate personal year
  const calculatePersonalYear = (birthDate: Date, currentDate: Date): number => {
    const birthMonth = birthDate.getMonth() + 1
    const birthDay = birthDate.getDate()
    const currentYear = currentDate.getFullYear()

    const monthDaySum = reduceToSingleDigit(birthMonth) + reduceToSingleDigit(birthDay)
    return reduceToSingleDigit(monthDaySum + reduceToSingleDigit(currentYear))
  }

  // Calculate personal month
  const calculatePersonalMonth = (personalYear: number, currentDate: Date): number => {
    const currentMonth = currentDate.getMonth() + 1
    return reduceToSingleDigit(personalYear + reduceToSingleDigit(currentMonth))
  }

  // Calculate personal day
  const calculatePersonalDay = (personalMonth: number, currentDate: Date): number => {
    const currentDay = currentDate.getDate()
    return reduceToSingleDigit(personalMonth + reduceToSingleDigit(currentDay))
  }

  // Calculate karmic lessons
  const calculateKarmicLessons = (fullName: string): number[] => {
    const nameLetters = fullName.toLowerCase().replace(/[^a-z]/g, "")
    const presentNumbers = new Set<number>()

    for (const letter of nameLetters) {
      const num = letterToNumber(letter)
      if (num) {
        presentNumbers.add(num)
      }
    }

    const missingNumbers: number[] = []
    for (let i = 1; i <= 9; i++) {
      if (!presentNumbers.has(i)) {
        missingNumbers.push(i)
      }
    }

    return missingNumbers
  }

  // Calculate hidden passion number
  const calculateHiddenPassionNumber = (fullName: string): number => {
    const nameLetters = fullName.toLowerCase().replace(/[^a-z]/g, "")
    const numberCounts: Record<number, number> = {}

    for (const letter of nameLetters) {
      const num = letterToNumber(letter)
      if (num) {
        numberCounts[num] = (numberCounts[num] || 0) + 1
      }
    }

    let maxCount = 0
    let hiddenPassion = 0

    for (const num in numberCounts) {
      if (numberCounts[num] > maxCount) {
        maxCount = numberCounts[num]
        hiddenPassion = Number.parseInt(num)
      }
    }

    return hiddenPassion
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
      // Create date object from the input string without timezone conversion
      const dateObj = createDateFromString(birthDate)

      if (isNaN(dateObj.getTime())) {
        setError("Please enter a valid birth date")
        setIsGenerating(false)
        return
      }

      if (dateObj > new Date()) {
        setError("Birth date cannot be in the future")
        setIsGenerating(false)
        return
      }

      const nameForCalculation = currentName || birthName

      // Calculate core numbers using the new getNumerologyReport
      const coreNumbers = getNumerologyReport(dateObj, birthName)

      // Calculate birthday number
      const day = dateObj.getDate()
      const birthdayNumber = day > 9 ? (day > 22 ? (day % 10) + Math.floor(day / 10) : day) : day

      // Calculate maturity number
      const maturityNumber = calculateMaturityNumber(coreNumbers.lifePath, coreNumbers.expression)

      // Calculate balance number
      const balanceNumber = calculateBalanceNumber(birthName)

      // Calculate bridge number
      const bridgeNumber = currentName
        ? calculateBridgeNumber(calculateExpressionNumber(birthName), calculateExpressionNumber(currentName))
        : undefined

      // Calculate challenge numbers
      const challengeNumbers = calculateChallengeNumbers(dateObj)

      // Calculate pinnacle numbers
      const pinnacleNumbers = calculatePinnacleNumbers(dateObj)

      // Calculate personal period numbers
      const currentDate = new Date()
      const personalYear = calculatePersonalYear(dateObj, currentDate)
      const personalMonth = calculatePersonalMonth(personalYear, currentDate)
      const personalDay = calculatePersonalDay(personalMonth, currentDate)

      // Calculate karmic lessons
      const karmicLessons = calculateKarmicLessons(birthName)

      // Calculate hidden passion number
      const hiddenPassionNumber = calculateHiddenPassionNumber(birthName)

      // Create profile
      const newProfile: NumerologyProfile = {
        birthName,
        currentName,
        nicknames,
        birthDate: dateObj,
        lifePathNumber: coreNumbers.lifePath,
        destinyNumber: coreNumbers.expression, // Destiny and Expression are often the same calculation, but based on birth name vs current name. Here, using Expression for Destiny based on birthName.
        expressionNumber: calculateExpressionNumber(nameForCalculation), // Expression based on current/birth name
        soulUrgeNumber: coreNumbers.soulUrge,
        personalityNumber: coreNumbers.personality,
        birthdayNumber,
        maturityNumber,
        balanceNumber,
        bridgeNumber,
        challengeNumbers,
        pinnacleNumbers,
        personalYear,
        personalMonth,
        personalDay,
        karmicLessons,
        hiddenPassionNumber,
      }

      setProfile(newProfile)
      setActiveTab("report")
      setActiveReportTab("core")

      // Auto-expand the first section in each tab
      setExpandedSections({
        lifePathSection: true,
        personalYearSection: true,
        challenge1Section: true,
        karmicLessonsSection: true,
      })

      if (onReportCalculated) {
        const reportData = {
          birthName,
          currentName,
          birthDate: dateObj,
          lifePath: newProfile.lifePathNumber,
          expression: newProfile.expressionNumber,
          soulUrge: newProfile.soulUrgeNumber,
          personality: newProfile.personalityNumber,
        }
        onReportCalculated(reportData)
      }

      // Update last used timestamp if client-side and consent given
      if (isClient && hasPrivacyConsent) {
        try {
          userDataService.updateLastUsed()
        } catch (error) {
          console.error("Error updating last used:", error)
        }
      }

      toast({
        title: "Report Generated",
        description: "Your comprehensive numerology report is ready.",
      })
    } catch (err) {
      console.error("Error generating report:", err)
      setError("An error occurred while generating your report. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  // Get number meaning from numoDefinitions
  const getNumberMeaning = (number: number): string => {
    const data = getSingleDigitMeaning(number)
    return data ? data.description : "No meaning available for this number."
  }

  // Get detailed number interpretation
  const getDetailedInterpretation = (number: number, type: string): string => {
    const data = getSingleDigitMeaning(number)

    if (!data) return "No detailed interpretation available."

    let interpretation = ""

    switch (type) {
      case "lifePath":
        interpretation = `As a Life Path ${number}, ${data.description} Your life's journey is about ${data.keywords.join(", ").toLowerCase()}.`
        break
      case "destiny": // Using expression for destiny based on birth name
      case "expression":
        interpretation = `Your Expression Number ${number} indicates that ${data.description} This number reveals how you express yourself in the world and the talents you have to offer.`
        break
      case "soul":
        interpretation = `Your Soul Urge Number ${number} indicates that deep within, you desire ${data.keywords.join(", ").toLowerCase()}. ${data.description} This number reveals your inner cravings, motivations, and what brings you true satisfaction.`
        break
      case "personality":
        interpretation = `With a Personality Number ${number}, you present yourself to others as someone who embodies ${data.keywords.join(", ").toLowerCase()}. ${data.description} This is the aspect of yourself that you allow others to see.`
        break
      case "bridge":
        interpretation = `Your Bridge Number ${number} represents the connection between your birth name and current name. ${data.description} This number indicates the energy needed to transition between these two expressions of yourself.`
        break
      default:
        interpretation = data.description
    }

    return interpretation
  }

  // Get challenge number meaning
  const getChallengeMeaning = (number: number): string => {
    const meanings: Record<number, string> = {
      0: "This challenge involves learning to be self-sufficient and independent. You need to develop confidence in your abilities and avoid being overly dependent on others.",
      1: "You must learn to be more independent and self-reliant. Developing confidence, willpower, and originality are key to overcoming this challenge.",
      2: "Your challenge is to develop patience, cooperation, and diplomacy. Learning to work well with others and being more sensitive to their needs will help you overcome this challenge.",
      3: "You need to learn to express yourself more effectively and develop your creative talents. Overcoming self-doubt and fear of criticism is essential.",
      4: "This challenge involves developing discipline, order, and practical skills. You need to learn to be more methodical and organized in your approach to life.",
      5: "Your challenge is to find constructive ways to express your need for freedom and change. Learning to adapt to change while maintaining stability is key.",
      6: "You must learn to balance your responsibilities to others with your own needs. Developing compassion without becoming overly involved in others' problems is essential.",
      7: "This challenge involves developing your analytical abilities and spiritual awareness. You need to learn to trust your intuition and seek deeper meaning in life.",
      8: "Your challenge is to develop good judgment in material and business matters. Learning to use power wisely and ethically is key to overcoming this challenge.",
      9: "You must learn to be more compassionate and tolerant of others. Developing a broader perspective and letting go of the past are essential.",
    }

    return meanings[number] || "This challenge represents a unique opportunity for growth and development."
  }

  // Get pinnacle number meaning
  const getPinnacleMeaning = (number: number): string => {
    const meanings: Record<number, string> = {
      1: "A period of independence, leadership, and new beginnings. This is a time to develop self-confidence and take initiative in pursuing your goals.",
      2: "A period focused on relationships, cooperation, and diplomacy. This is a time to develop patience and sensitivity to others' needs.",
      3: "A period of creativity, self-expression, and social activity. This is a time to develop your artistic talents and communication skills.",
      4: "A period of hard work, practical achievements, and building solid foundations. This is a time to develop discipline and organizational skills.",
      5: "A period of change, freedom, and adventure. This is a time to embrace new experiences and adapt to changing circumstances.",
      6: "A period of responsibility, service, and family matters. This is a time to nurture others and create harmony in your environment.",
      7: "A period of spiritual growth, introspection, and specialized knowledge. This is a time to develop wisdom and trust your intuition.",
      8: "A period of material achievement, authority, and business success. This is a time to develop leadership skills and financial acumen.",
      9: "A period of completion, humanitarianism, and universal understanding. This is a time to develop compassion and share your wisdom with others.",
      11: "A period of spiritual illumination, inspiration, and heightened intuition. This is a time to develop your visionary abilities and inspire others.",
      22: "A period of practical mastery, large-scale achievements, and building for the future. This is a time to develop your ability to manifest your highest ideals.",
    }

    return meanings[number] || "This pinnacle represents a unique period of opportunity and growth in your life."
  }

  // Get personal year meaning
  const getPersonalYearMeaning = (number: number): string => {
    const meanings: Record<number, string> = {
      1: "A year of new beginnings, fresh starts, and initiatives. This is an excellent time to start new projects, make important changes, and assert your independence.",
      2: "A year of patience, cooperation, and relationships. Focus on diplomacy, partnerships, and developing your sensitivity to others' needs.",
      3: "A year of creativity, self-expression, and social activity. This is a favorable time for communication, artistic pursuits, and expanding your social circle.",
      4: "A year of hard work, practical achievements, and building solid foundations. Focus on organization, discipline, and creating stability in your life.",
      5: "A year of change, freedom, and adventure. Embrace new experiences, travel opportunities, and be ready to adapt to unexpected changes.",
      6: "A year of responsibility, service, and family matters. Focus on creating harmony in your home, nurturing relationships, and fulfilling your obligations.",
      7: "A year of introspection, spiritual growth, and specialized knowledge. Take time for self-reflection, research, and developing your intuitive abilities.",
      8: "A year of material achievement, authority, and business success. Focus on financial matters, career advancement, and developing leadership skills.",
      9: "A year of completion, letting go, and humanitarian efforts. This is a time to conclude projects, release what no longer serves you, and give back to others.",
    }

    return meanings[number] || "This year represents a unique period of opportunity and growth in your life."
  }

  // Get karmic lesson meaning
  const getKarmicLessonMeaning = (number: number): string => {
    const meanings: Record<number, string> = {
      1: "You need to develop independence, initiative, and leadership abilities. Learn to stand on your own and express your individuality more confidently.",
      2: "You need to develop patience, cooperation, and sensitivity to others. Learn to work harmoniously with others and pay attention to details.",
      3: "You need to develop self-expression, creativity, and social skills. Learn to express your emotions and ideas more openly and joyfully.",
      4: "You need to develop discipline, order, and and practical skills. Learn to be more methodical, reliable, and grounded in your approach to life.",
      5: "You need to develop adaptability, versatility, and constructive use of freedom. Learn to embrace change and use your freedom responsibly.",
      6: "You need to develop responsibility, nurturing abilities, and service to others. Learn to create harmony and balance in your relationships.",
      7: "You need to develop analytical thinking, spiritual awareness, and trust in your intuition. Learn to look beneath the surface and seek deeper meaning.",
      8: "You need to develop good judgment in material and business matters. Learn to use power wisely and develop your executive abilities.",
      9: "You need to develop compassion, tolerance, and a universal perspective. Learn to let go of the past and embrace a broader view of humanity.",
    }

    return meanings[number] || "This karmic lesson represents an area for growth and development in this lifetime."
  }

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  // Validation functions
  const validateInputs = (): string | null => {
    if (!birthName.trim()) return "Please enter your full birth name"

    const namePattern = /^[A-Za-z\s]+$/
    if (!namePattern.test(birthName.trim())) {
      return "Name should contain only letters and spaces"
    }

    if (!birthDate) return "Please enter your birthdate"

    try {
      const [year, month, day] = birthDate.split("-").map(Number)
      const currentDate = new Date()
      const selectedDate = createDateFromString(birthDate)

      if (selectedDate > currentDate) {
        return "Birthdate cannot be in the future"
      }

      if (year < 1900) {
        return "Birth year must be 1900 or later"
      }
    } catch (err) {
      return "Invalid date format"
    }

    return null
  }

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const validationError = validateInputs()
    if (validationError) {
      setError(validationError)
      return
    }

    calculateNumerologyProfile()

    if (birthDate) {
      try {
        setLifePathNumberSimple(calculateLifePathNumber(birthDate))
      } catch (error) {
        console.error("Error calculating Life Path Number:", error)
        setLifePathNumberSimple(null)
      }
    }

    if (birthName) {
      try {
        setExpressionNumberSimple(calculateExpressionNumber(birthName))
        setSoulUrgeNumberSimple(calculateSoulUrgeNumber(birthName))
        setPersonalityNumberSimple(calculatePersonalityNumber(birthName))
      } catch (error) {
        console.error("Error calculating Name Numbers:", error)
        setExpressionNumberSimple(null)
        setSoulUrgeNumberSimple(null)
        setPersonalityNumberSimple(null)
      }
    }
  }

  const getMeaning = (number: number | null, type: "singleDigits" | "compoundNumbers") => {
    if (number === null) return null
    const numStr = number.toString()
    return numoNumberDefinitions[type][numStr] || numoNumberDefinitions.singleDigits[numStr]
  }

  // Don't render until client-side to prevent hydration issues
  if (!isClient) {
    return (
      <div className="w-full max-w-6xl mx-auto bg-black text-white p-6 rounded-lg">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-800 rounded mb-4"></div>
          <div className="h-4 bg-gray-800 rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-800 rounded"></div>
            <div className="h-96 bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-black text-white p-6 rounded-lg">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-2">
            <span className="text-purple-500">NUMO</span> Numerology Calculator
          </h2>
          <div className="flex items-center space-x-2">
            {profile && (
              <Badge variant="outline" className="text-green-400 border-green-400">
                <Sparkles className="h-3 w-3 mr-1" />
                Report Ready
              </Badge>
            )}
            <MembershipBadge type={membershipStatus.type} productType={membershipStatus.purchaseInfo?.productType} />
          </div>
        </div>
        <p className="text-gray-300">
          Discover your comprehensive numerology profile and gain deep insights into your life path, destiny, and
          spiritual journey.
        </p>
      </div>

      <Tabs defaultValue="calculator" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="report">
            Comprehensive Report
            {profile && <FileText className="h-3 w-3 ml-1" />}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <Card className="bg-gray-900/50 border-purple-500/30 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Comprehensive Numerology Report Generator</CardTitle>
              <CardDescription>
                Discover the hidden patterns in your name and birthdate with our detailed numerology analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <form onSubmit={handleCalculate} className="space-y-4">
                    <div>
                      <Label htmlFor="birthName">Full Birth Name (as on birth certificate)</Label>
                      <Input
                        id="birthName"
                        value={birthName}
                        onChange={(e) => setBirthName(e.target.value)}
                        placeholder="Enter your full birth name"
                        className="bg-gray-800 border-gray-700"
                      />
                      {hasPrivacyConsent && birthName && (
                        <p className="text-xs text-green-400 mt-1">✓ Name will be remembered for future calculations</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="currentName">Current Name (if different from birth name)</Label>
                      <Input
                        id="currentName"
                        value={currentName}
                        onChange={(e) => setCurrentName(e.target.value)}
                        placeholder="Enter your current name if different"
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nicknames">Nicknames or Aliases (optional)</Label>
                      <Input
                        id="nicknames"
                        value={nicknames}
                        onChange={(e) => setNicknames(e.target.value)}
                        placeholder="Enter any nicknames or aliases"
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                    <div>
                      <Label htmlFor="birthDate">Date of Birth</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="bg-gray-800 border-gray-700 w-full"
                        max={new Date().toISOString().split("T")[0]}
                        required
                      />
                      {hasPrivacyConsent && birthDate && (
                        <p className="text-xs text-green-400 mt-1">
                          ✓ Birth date will be remembered for future calculations
                        </p>
                      )}
                    </div>

                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <Button
                      type="submit"
                      disabled={isGenerating || !birthName || !birthDate}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                    >
                      <Calculator className="mr-2 h-5 w-5" />
                      {isGenerating ? "Generating Report..." : "Generate Comprehensive Report"}
                    </Button>
                  </form>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30 mb-4">
                    <h3 className="text-lg font-medium mb-2 text-purple-300">About Comprehensive Reports</h3>
                    <p className="text-gray-300 text-sm">
                      Our comprehensive numerology report analyzes your core numbers to reveal your life's purpose,
                      innate talents, challenges, and opportunities. By examining the vibrations in your name and
                      birthdate, we provide insights into your personality, relationships, career path, and spiritual
                      growth.
                    </p>
                    <p className="text-gray-300 text-sm mt-2">
                      Including your current name (if different from birth name) allows us to analyze the transition
                      between your birth identity and current identity, revealing important insights about your life
                      journey.
                    </p>
                  </div>
                  {profile && (
                    <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                      <h4 className="font-medium text-green-300 mb-2">Report Ready!</h4>
                      <p className="text-gray-300 text-sm mb-3">
                        Your comprehensive numerology report has been generated. Click the "Comprehensive Report" tab to
                        view your detailed analysis.
                      </p>
                      <Button
                        onClick={() => setActiveTab("report")}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        View Report
                      </Button>
                    </div>
                  )}
                </div>
                {(lifePathNumberSimple !== null ||
                  expressionNumberSimple !== null ||
                  soulUrgeNumberSimple !== null ||
                  personalityNumberSimple !== null) && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Your Numerology Profile:</h3>
                    {lifePathNumberSimple !== null && (
                      <div className="border p-3 rounded-md">
                        <p className="font-medium">Life Path Number: {lifePathNumberSimple}</p>
                        {getMeaning(lifePathNumberSimple, "singleDigits") && (
                          <p className="text-sm text-muted-foreground">
                            {getMeaning(lifePathNumberSimple, "singleDigits")?.title}:{" "}
                            {getMeaning(lifePathNumberSimple, "singleDigits")?.description}
                          </p>
                        )}
                      </div>
                    )}
                    {expressionNumberSimple !== null && (
                      <div className="border p-3 rounded-md">
                        <p className="font-medium">Expression Number: {expressionNumberSimple}</p>
                        {getMeaning(expressionNumberSimple, "singleDigits") && (
                          <p className="text-sm text-muted-foreground">
                            {getMeaning(expressionNumberSimple, "singleDigits")?.title}:{" "}
                            {getMeaning(expressionNumberSimple, "singleDigits")?.description}
                          </p>
                        )}
                      </div>
                    )}
                    {soulUrgeNumberSimple !== null && (
                      <div className="border p-3 rounded-md">
                        <p className="font-medium">Soul Urge Number: {soulUrgeNumberSimple}</p>
                        {getMeaning(soulUrgeNumberSimple, "singleDigits") && (
                          <p className="text-sm text-muted-foreground">
                            {getMeaning(soulUrgeNumberSimple, "singleDigits")?.title}:{" "}
                            {getMeaning(soulUrgeNumberSimple, "singleDigits")?.description}
                          </p>
                        )}
                      </div>
                    )}
                    {personalityNumberSimple !== null && (
                      <div className="border p-3 rounded-md">
                        <p className="font-medium">Personality Number: {personalityNumberSimple}</p>
                        {getMeaning(personalityNumberSimple, "singleDigits") && (
                          <p className="text-sm text-muted-foreground">
                            {getMeaning(personalityNumberSimple, "singleDigits")?.title}:{" "}
                            {getMeaning(personalityNumberSimple, "singleDigits")?.description}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="report">
          {profile ? (
            <div className="space-y-6">
              {/* Report Header */}
              <Card className="bg-gray-900/50 border-purple-500/30">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-xl">Numerology Report for {profile.birthName}</CardTitle>
                      <p className="text-sm text-gray-400">Born on {formatDateForDisplay(profile.birthDate)}</p>
                      {profile.currentName && (
                        <p className="text-sm text-gray-400">Current name: {profile.currentName}</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="bg-purple-900/20 p-3 rounded-lg border border-purple-500/30">
                      <div className="text-sm text-gray-400">Life Path Number</div>
                      <div className="text-3xl font-bold text-purple-400">{profile.lifePathNumber}</div>
                    </div>
                    <div className="bg-indigo-900/20 p-3 rounded-lg border border-indigo-500/30">
                      <div className="text-sm text-gray-400">Destiny Number</div>
                      <div className="text-3xl font-bold text-indigo-400">{profile.destinyNumber}</div>
                    </div>
                    <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-500/30">
                      <div className="text-sm text-gray-400">Soul Urge Number</div>
                      <div className="text-3xl font-bold text-blue-400">{profile.soulUrgeNumber}</div>
                    </div>
                    <div className="bg-violet-900/20 p-3 rounded-lg border border-violet-500/30">
                      <div className="text-sm text-gray-400">Personality Number</div>
                      <div className="text-3xl font-bold text-violet-400">{profile.personalityNumber}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Report Content */}
              <Tabs defaultValue="core" value={activeReportTab} onValueChange={setActiveReportTab}>
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="core">Core Numbers</TabsTrigger>
                  <TabsTrigger value="cycles">Life Cycles</TabsTrigger>
                  <TabsTrigger value="challenges">Challenges & Growth</TabsTrigger>
                  <TabsTrigger value="future">Future Trends</TabsTrigger>
                </TabsList>

                <TabsContent value="core" className="space-y-6">
                  {/* Life Path Section */}
                  <Card className="bg-gray-900/50 border-purple-500/30">
                    <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleSection("lifePathSection")}>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg flex items-center">
                          <User className="h-5 w-5 mr-2 text-purple-400" />
                          Life Path Number: {profile.lifePathNumber}
                        </CardTitle>
                        {expandedSections["lifePathSection"] ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </CardHeader>
                    {expandedSections["lifePathSection"] && (
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="col-span-2">
                            <p className="text-gray-300 mb-4">
                              {getDetailedInterpretation(profile.lifePathNumber, "lifePath")}
                            </p>
                            <h4 className="font-medium text-purple-300 mb-2">Key Characteristics</h4>
                            <ul className="list-disc pl-5 space-y-1 text-gray-300">
                              {getSingleDigitMeaning(profile.lifePathNumber)?.keywords.map((keyword, index) => (
                                <li key={index}>{keyword}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-32 h-32 mb-4">
                              <NumberChart number={profile.lifePathNumber} title="Life Path" />
                            </div>
                            <div className="bg-purple-900/20 p-3 rounded-lg border border-purple-500/30 w-full">
                              <h4 className="font-medium text-purple-300 mb-1 text-center">Elemental Energy</h4>
                              <p className="text-sm text-center text-gray-300">
                                {getSingleDigitMeaning(profile.lifePathNumber)?.elementalPower?.name || "Universal"} -{" "}
                                {getSingleDigitMeaning(profile.lifePathNumber)?.elementalPower?.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  {/* Destiny Number Section */}
                  <Card className="bg-gray-900/50 border-indigo-500/30">
                    <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleSection("destinySection")}>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg flex items-center">
                          <Star className="h-5 w-5 mr-2 text-indigo-400" />
                          Destiny Number: {profile.destinyNumber}
                        </CardTitle>
                        {expandedSections["destinySection"] ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </CardHeader>
                    {expandedSections["destinySection"] && (
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="col-span-2">
                            <p className="text-gray-300 mb-4">
                              {getDetailedInterpretation(profile.destinyNumber, "destiny")}
                            </p>
                            <h4 className="font-medium text-indigo-300 mb-2">Destiny Fulfillment</h4>
                            <p className="text-gray-300 mb-4">
                              Your Destiny Number reveals the talents, abilities, and opportunities that will help you
                              fulfill your life's purpose. It represents what you are destined to do and become in this
                              lifetime.
                            </p>
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-32 h-32 mb-4">
                              <NumberChart number={profile.destinyNumber} title="Destiny" />
                            </div>
                            <div className="bg-indigo-900/20 p-3 rounded-lg border border-indigo-500/30 w-full">
                              <h4 className="font-medium text-indigo-300 mb-1 text-center">Astrological Influence</h4>
                              <p className="text-sm text-center text-gray-300">
                                {getSingleDigitMeaning(profile.destinyNumber)?.astrologicalSign?.name || "Universal"} -{" "}
                                {getSingleDigitMeaning(profile.destinyNumber)?.astrologicalSign?.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  {/* Expression Number Section (if current name is different) */}
                  {profile.currentName && profile.expressionNumber && (
                    <Card className="bg-gray-900/50 border-teal-500/30">
                      <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleSection("expressionSection")}>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg flex items-center">
                            <Star className="h-5 w-5 mr-2 text-teal-400" />
                            Expression Number: {profile.expressionNumber}
                          </CardTitle>
                          {expandedSections["expressionSection"] ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </CardHeader>
                      {expandedSections["expressionSection"] && (
                        <CardContent className="pt-0">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="col-span-2">
                              <p className="text-gray-300 mb-4">
                                {getDetailedInterpretation(profile.expressionNumber, "expression")}
                              </p>
                              <h4 className="font-medium text-teal-300 mb-2">Name Transition</h4>
                              <p className="text-gray-300 mb-4">
                                Your Expression Number is based on your current name and reveals how you currently
                                express yourself in the world. This may differ from your Destiny Number (based on your
                                birth name), indicating a shift in how you manifest your talents and abilities.
                              </p>
                              {profile.bridgeNumber && (
                                <div>
                                  <h4 className="font-medium text-teal-300 mb-2">
                                    Bridge Number: {profile.bridgeNumber}
                                  </h4>
                                  <p className="text-gray-300">
                                    {getDetailedInterpretation(profile.bridgeNumber, "bridge")}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col items-center justify-center">
                              <div className="w-32 h-32 mb-4">
                                <NumberChart number={profile.expressionNumber} title="Expression" />
                              </div>
                              <div className="bg-teal-900/20 p-3 rounded-lg border border-teal-500/30 w-full">
                                <h4 className="font-medium text-teal-300 mb-1 text-center">Name Comparison</h4>
                                <p className="text-sm text-center text-gray-300">
                                  Birth Name: {profile.destinyNumber} → Current Name: {profile.expressionNumber}
                                  {profile.bridgeNumber && <> (Bridge: {profile.bridgeNumber})</>}
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  )}

                  {/* Soul Urge Number Section */}
                  <Card className="bg-gray-900/50 border-blue-500/30">
                    <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleSection("soulSection")}>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg flex items-center">
                          <Heart className="h-5 w-5 mr-2 text-blue-400" />
                          Soul Urge Number: {profile.soulUrgeNumber}
                        </CardTitle>
                        {expandedSections["soulSection"] ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </CardHeader>
                    {expandedSections["soulSection"] && (
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="col-span-2">
                            <p className="text-gray-300 mb-4">
                              {getDetailedInterpretation(profile.soulUrgeNumber, "soul")}
                            </p>
                            <h4 className="font-medium text-blue-300 mb-2">Inner Desires</h4>
                            <p className="text-gray-300 mb-4">
                              Your Soul Urge Number reveals what truly motivates you at the deepest level. It represents
                              your inner cravings, what brings you joy, and what you value most in life.
                            </p>
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-32 h-32 mb-4">
                              <NumberChart number={profile.soulUrgeNumber} title="Soul Urge" />
                            </div>
                            <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-500/30 w-full">
                              <h4 className="font-medium text-blue-300 mb-1 text-center">Planetary Influence</h4>
                              <p className="text-sm text-center text-gray-300">
                                {getSingleDigitMeaning(profile.soulUrgeNumber)?.planetInfluence?.name || "Universal"} -{" "}
                                {getSingleDigitMeaning(profile.soulUrgeNumber)?.planetInfluence?.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  {/* Personality Number Section */}
                  <Card className="bg-gray-900/50 border-violet-500/30">
                    <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleSection("personalitySection")}>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg flex items-center">
                          <User className="h-5 w-5 mr-2 text-violet-400" />
                          Personality Number: {profile.personalityNumber}
                        </CardTitle>
                        {expandedSections["personalitySection"] ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </CardHeader>
                    {expandedSections["personalitySection"] && (
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="col-span-2">
                            <p className="text-gray-300 mb-4">
                              {getDetailedInterpretation(profile.personalityNumber, "personality")}
                            </p>
                            <h4 className="font-medium text-violet-300 mb-2">External Persona</h4>
                            <p className="text-gray-300 mb-4">
                              Your Personality Number represents the outward impression you make on others. It's the
                              aspect of yourself that you allow the world to see, influencing how people perceive you.
                            </p>
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-32 h-32 mb-4">
                              <NumberChart number={profile.personalityNumber} title="Personality" />
                            </div>
                            <div className="bg-violet-900/20 p-3 rounded-lg border border-violet-500/30 w-full">
                              <h4 className="font-medium text-violet-300 mb-1 text-center">Symbolic Representation</h4>
                              <p className="text-sm text-center text-gray-300">
                                {getSingleDigitMeaning(profile.personalityNumber)?.symbolicRepresentation?.name ||
                                  "Universal"}{" "}
                                -{" "}
                                {getSingleDigitMeaning(profile.personalityNumber)?.symbolicRepresentation?.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </TabsContent>

                <TabsContent value="cycles" className="space-y-6">
                  {/* Birthday Number Section */}
                  <Card className="bg-gray-900/50 border-orange-500/30">
                    <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleSection("birthdaySection")}>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg flex items-center">
                          <Sparkles className="h-5 w-5 mr-2 text-orange-400" />
                          Birthday Number: {profile.birthdayNumber}
                        </CardTitle>
                        {expandedSections["birthdaySection"] ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </CardHeader>
                    {expandedSections["birthdaySection"] && (
                      <CardContent className="pt-0">
                        <p className="text-gray-300 mb-4">
                          Your Birthday Number reveals a specific talent or ability that will help you on your life
                          path. It's a gift you bring into this lifetime.
                        </p>
                        <p className="text-gray-300">{getNumberMeaning(profile.birthdayNumber)}</p>
                      </CardContent>
                    )}
                  </Card>

                  {/* Maturity Number Section */}
                  <Card className="bg-gray-900/50 border-yellow-500/30">
                    <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleSection("maturitySection")}>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg flex items-center">
                          <Sparkles className="h-5 w-5 mr-2 text-yellow-400" />
                          Maturity Number: {profile.maturityNumber}
                        </CardTitle>
                        {expandedSections["maturitySection"] ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </CardHeader>
                    {expandedSections["maturitySection"] && (
                      <CardContent className="pt-0">
                        <p className="text-gray-300 mb-4">
                          Your Maturity Number represents the underlying desire that will become more prominent in the
                          second half of your life. It's the goal you'll work towards and achieve.
                        </p>
                        <p className="text-gray-300">{getNumberMeaning(profile.maturityNumber)}</p>
                      </CardContent>
                    )}
                  </Card>

                  {/* Balance Number Section */}
                  {profile.balanceNumber !== undefined && (
                    <Card className="bg-gray-900/50 border-green-500/30">
                      <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleSection("balanceSection")}>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg flex items-center">
                            <Sparkles className="h-5 w-5 mr-2 text-green-400" />
                            Balance Number: {profile.balanceNumber}
                          </CardTitle>
                          {expandedSections["balanceSection"] ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </CardHeader>
                      {expandedSections["balanceSection"] && (
                        <CardContent className="pt-0">
                          <p className="text-gray-300 mb-4">
                            Your Balance Number indicates how you react to unexpected situations and crises. It reveals
                            your inner strength and how you find equilibrium.
                          </p>
                          <p className="text-gray-300">{getNumberMeaning(profile.balanceNumber)}</p>
                        </CardContent>
                      )}
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="challenges" className="space-y-6">
                  {/* Challenge Numbers Section */}
                  {profile.challengeNumbers && profile.challengeNumbers.length > 0 && (
                    <Card className="bg-gray-900/50 border-red-500/30">
                      <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleSection("challenge1Section")}>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg flex items-center">
                            <Sparkles className="h-5 w-5 mr-2 text-red-400" />
                            Challenge Numbers
                          </CardTitle>
                          {expandedSections["challenge1Section"] ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </CardHeader>
                      {expandedSections["challenge1Section"] && (
                        <CardContent className="pt-0">
                          <p className="text-gray-300 mb-4">
                            Challenge Numbers represent the obstacles and lessons you'll encounter at different stages
                            of your life. Overcoming these challenges leads to significant growth.
                          </p>
                          <ul className="list-disc list-inside space-y-2 text-gray-300">
                            {profile.challengeNumbers.map((challenge, index) => (
                              <li key={index}>
                                <strong>
                                  Challenge {index + 1}: {challenge}
                                </strong>{" "}
                                - {getChallengeMeaning(challenge)}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      )}
                    </Card>
                  )}

                  {/* Karmic Lessons Section */}
                  {profile.karmicLessons && profile.karmicLessons.length > 0 && (
                    <Card className="bg-gray-900/50 border-cyan-500/30">
                      <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleSection("karmicLessonsSection")}>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg flex items-center">
                            <Sparkles className="h-5 w-5 mr-2 text-cyan-400" />
                            Karmic Lessons
                          </CardTitle>
                          {expandedSections["karmicLessonsSection"] ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </CardHeader>
                      {expandedSections["karmicLessonsSection"] && (
                        <CardContent className="pt-0">
                          <p className="text-gray-300 mb-4">
                            Karmic Lessons indicate areas where you may have lacked experience or development in past
                            lives. These are areas you are meant to master in this lifetime.
                          </p>
                          <ul className="list-disc list-inside space-y-2 text-gray-300">
                            {profile.karmicLessons.map((lesson, index) => (
                              <li key={index}>
                                <strong>Lesson {lesson}</strong> - {getKarmicLessonMeaning(lesson)}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      )}
                    </Card>
                  )}

                  {/* Hidden Passion Number Section */}
                  {profile.hiddenPassionNumber !== undefined && profile.hiddenPassionNumber !== 0 && (
                    <Card className="bg-gray-900/50 border-pink-500/30">
                      <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleSection("hiddenPassionSection")}>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg flex items-center">
                            <Sparkles className="h-5 w-5 mr-2 text-pink-400" />
                            Hidden Passion Number: {profile.hiddenPassionNumber}
                          </CardTitle>
                          {expandedSections["hiddenPassionSection"] ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </CardHeader>
                      {expandedSections["hiddenPassionSection"] && (
                        <CardContent className="pt-0">
                          <p className="text-gray-300 mb-4">
                            Your Hidden Passion Number reveals your deepest desires and what truly excites you. It's an
                            area where you have natural talent and enthusiasm.
                          </p>
                          <p className="text-gray-300">{getNumberMeaning(profile.hiddenPassionNumber)}</p>
                        </CardContent>
                      )}
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="future" className="space-y-6">
                  {/* Pinnacle Numbers Section */}
                  {profile.pinnacleNumbers && profile.pinnacleNumbers.length > 0 && (
                    <Card className="bg-gray-900/50 border-teal-500/30">
                      <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleSection("pinnacleSection")}>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg flex items-center">
                            <Sparkles className="h-5 w-5 mr-2 text-teal-400" />
                            Pinnacle Numbers
                          </CardTitle>
                          {expandedSections["pinnacleSection"] ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </CardHeader>
                      {expandedSections["pinnacleSection"] && (
                        <CardContent className="pt-0">
                          <p className="text-gray-300 mb-4">
                            Pinnacle Numbers represent major life cycles, each lasting approximately 9 years. They
                            indicate the dominant energies and opportunities present during these periods.
                          </p>
                          <ul className="list-disc list-inside space-y-2 text-gray-300">
                            {profile.pinnacleNumbers.map((pinnacle, index) => (
                              <li key={index}>
                                <strong>
                                  Pinnacle {index + 1}: {pinnacle}
                                </strong>{" "}
                                - {getPinnacleMeaning(pinnacle)}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      )}
                    </Card>
                  )}

                  {/* Personal Year Section */}
                  {profile.personalYear !== undefined && (
                    <Card className="bg-gray-900/50 border-purple-500/30">
                      <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleSection("personalYearSection")}>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg flex items-center">
                            <Sparkles className="h-5 w-5 mr-2 text-purple-400" />
                            Personal Year: {profile.personalYear}
                          </CardTitle>
                          {expandedSections["personalYearSection"] ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </CardHeader>
                      {expandedSections["personalYearSection"] && (
                        <CardContent className="pt-0">
                          <p className="text-gray-300 mb-4">
                            Your Personal Year number indicates the general theme and energy for the current year. It
                            helps you understand what to focus on and what opportunities may arise.
                          </p>
                          <p className="text-gray-300">{getPersonalYearMeaning(profile.personalYear)}</p>
                        </CardContent>
                      )}
                    </Card>
                  )}

                  {/* Personal Month Section */}
                  {profile.personalMonth !== undefined && (
                    <Card className="bg-gray-900/50 border-indigo-500/30">
                      <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleSection("personalMonthSection")}>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg flex items-center">
                            <Sparkles className="h-5 w-5 mr-2 text-indigo-400" />
                            Personal Month: {profile.personalMonth}
                          </CardTitle>
                          {expandedSections["personalMonthSection"] ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </CardHeader>
                      {expandedSections["personalMonthSection"] && (
                        <CardContent className="pt-0">
                          <p className="text-gray-300 mb-4">
                            Your Personal Month number refines the energy of your Personal Year, providing a more
                            specific focus for the current month.
                          </p>
                          <p className="text-gray-300">{getNumberMeaning(profile.personalMonth)}</p>
                        </CardContent>
                      )}
                    </Card>
                  )}

                  {/* Personal Day Section */}
                  {profile.personalDay !== undefined && (
                    <Card className="bg-gray-900/50 border-blue-500/30">
                      <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleSection("personalDaySection")}>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg flex items-center">
                            <Sparkles className="h-5 w-5 mr-2 text-blue-400" />
                            Personal Day: {profile.personalDay}
                          </CardTitle>
                          {expandedSections["personalDaySection"] ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </CardHeader>
                      {expandedSections["personalDaySection"] && (
                        <CardContent className="pt-0">
                          <p className="text-gray-300 mb-4">
                            Your Personal Day number provides the daily energy and focus, guiding your actions and
                            interactions for the day.
                          </p>
                          <p className="text-gray-300">{getNumberMeaning(profile.personalDay)}</p>
                        </CardContent>
                      )}
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <Card className="bg-gray-900/50 border-red-500/30">
              <CardContent className="text-center py-8">
                <p className="text-red-400 text-lg mb-4">No report generated yet.</p>
                <p className="text-gray-300">
                  Please go to the "Calculator" tab and fill in your details to generate your comprehensive numerology
                  report.
                </p>
                <Button
                  onClick={() => setActiveTab("calculator")}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white"
                >
                  Go to Calculator
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
