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
  Clock,
  FileText,
  Sparkles,
  Download,
  Share2,
  ChevronDown,
  ChevronUp,
  Calendar,
  Star,
  Heart,
  ArrowRight,
  BarChart3,
} from "lucide-react"
import { MembershipBadge } from "@/components/membership-badge"
import { type MembershipStatus, hasPremiumAccess } from "@/lib/membership-types"
import { userDataService, type UserProfile } from "@/lib/services/user-data-service"
import { toast } from "@/components/ui/use-toast"
import { numberData } from "@/data/number-meanings"
import { NumberChart } from "./numerology-calculator/number-chart"
import { LifePathChart } from "./numerology-calculator/life-path-chart"
import { NumerologyTimeline } from "./numerology-calculator/numerology-timeline"

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
    const letterMap: { [key: string]: number } = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6,
      g: 7,
      h: 8,
      i: 9,
      j: 1,
      k: 2,
      l: 3,
      m: 4,
      n: 5,
      o: 6,
      p: 7,
      q: 8,
      r: 9,
      s: 1,
      t: 2,
      u: 3,
      v: 4,
      w: 5,
      x: 6,
      y: 7,
      z: 8,
    }
    return letterMap[letter.toLowerCase()] || 0
  }

  // Calculate Life Path Number
  const calculateLifePath = (birthDate: Date): number => {
    const year = birthDate.getFullYear()
    const month = birthDate.getMonth() + 1 // getMonth() returns 0-11
    const day = birthDate.getDate()

    const yearSum = reduceToSingleDigit(year)
    const monthSum = reduceToSingleDigit(month)
    const daySum = reduceToSingleDigit(day)

    let lifePathNumber = yearSum + monthSum + daySum
    while (lifePathNumber > 9 && lifePathNumber !== 11 && lifePathNumber !== 22 && lifePathNumber !== 33) {
      lifePathNumber = reduceToSingleDigit(lifePathNumber)
    }

    return lifePathNumber
  }

  // Calculate Destiny Number
  const calculateDestinyNumber = (fullName: string): number => {
    const nameSum = fullName
      .toLowerCase()
      .replace(/[^a-z]/g, "")
      .split("")
      .reduce((sum, letter) => sum + letterToNumber(letter), 0)

    return reduceToSingleDigit(nameSum)
  }

  // Calculate Soul Urge Number
  const calculateSoulUrgeNumber = (fullName: string): number => {
    const vowels = "aeiou"
    const vowelSum = fullName
      .toLowerCase()
      .replace(/[^a-z]/g, "")
      .split("")
      .reduce((sum, letter) => {
        if (vowels.includes(letter)) {
          return sum + letterToNumber(letter)
        }
        return sum
      }, 0)

    return reduceToSingleDigit(vowelSum)
  }

  // Calculate Personality Number
  const calculatePersonalityNumber = (fullName: string): number => {
    const vowels = "aeiou"
    const consonantSum = fullName
      .toLowerCase()
      .replace(/[^a-z]/g, "")
      .split("")
      .reduce((sum, letter) => {
        if (!vowels.includes(letter)) {
          return sum + letterToNumber(letter)
        }
        return sum
      }, 0)

    return reduceToSingleDigit(consonantSum)
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

  // Calculate challenge numbers
  const calculateChallengeNumbers = (birthDate: Date): number[] => {
    const day = birthDate.getDate()
    const month = birthDate.getMonth() + 1
    const year = birthDate.getFullYear()

    const dayNum = reduceToSingleDigit(day)
    const monthNum = reduceToSingleDigit(month)
    const yearNum = reduceToSingleDigit(year)

    const c1 = Math.abs(dayNum - monthNum)
    const c2 = Math.abs(dayNum - yearNum)
    const c3 = Math.abs(c1 - c2)
    const c4 = Math.abs(monthNum - yearNum)

    return [c1, c2, c3, c4]
  }

  // Calculate pinnacle numbers
  const calculatePinnacleNumbers = (birthDate: Date): number[] => {
    const day = birthDate.getDate()
    const month = birthDate.getMonth() + 1
    const year = birthDate.getFullYear()

    const dayNum = reduceToSingleDigit(day)
    const monthNum = reduceToSingleDigit(month)
    const yearNum = reduceToSingleDigit(year)

    const p1 = reduceToSingleDigit(dayNum + monthNum)
    const p2 = reduceToSingleDigit(dayNum + yearNum)
    const p3 = reduceToSingleDigit(p1 + p2)
    const p4 = reduceToSingleDigit(monthNum + yearNum)

    return [p1, p2, p3, p4]
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

      // Calculate core numbers
      const lifePathNumber = calculateLifePath(dateObj)
      const destinyNumber = calculateDestinyNumber(birthName)
      const expressionNumber = calculateDestinyNumber(nameForCalculation)
      const soulUrgeNumber = calculateSoulUrgeNumber(birthName)
      const personalityNumber = calculatePersonalityNumber(birthName)

      // Calculate birthday number
      const day = dateObj.getDate()
      const birthdayNumber = day > 9 ? (day > 22 ? (day % 10) + Math.floor(day / 10) : day) : day

      // Calculate maturity number
      const maturityNumber = reduceToSingleDigit(lifePathNumber + destinyNumber)

      // Calculate balance number
      const balanceNumber = calculateBalanceNumber(birthName)

      // Calculate bridge number
      const bridgeNumber = currentName
        ? calculateBridgeNumber(calculateDestinyNumber(birthName), calculateDestinyNumber(currentName))
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
        lifePathNumber,
        destinyNumber,
        expressionNumber,
        soulUrgeNumber,
        personalityNumber,
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
          lifePath: lifePathNumber,
          expression: expressionNumber,
          soulUrge: soulUrgeNumber,
          personality: personalityNumber,
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
      case "expression":
        interpretation = `Your Expression Number ${number} (based on your current name) indicates that ${data.description} This number reveals how you express yourself in the world and the talents you have to offer.`
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
      4: "You need to develop discipline, order, and practical skills. Learn to be more methodical, reliable, and grounded in your approach to life.",
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
                              {numberData
                                .find((item) => item.number === profile.lifePathNumber)
                                ?.keywords.map((keyword, index) => (
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
                                {numberData.find((item) => item.number === profile.lifePathNumber)?.elementalPower
                                  .name || "Universal"}{" "}
                                -{" "}
                                {
                                  numberData.find((item) => item.number === profile.lifePathNumber)?.elementalPower
                                    .description
                                }
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
                                {numberData.find((item) => item.number === profile.destinyNumber)?.astrologicalSign
                                  .name || "Universal"}{" "}
                                -{" "}
                                {
                                  numberData.find((item) => item.number === profile.destinyNumber)?.astrologicalSign
                                    .description
                                }
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
                              <h4 className="font-medium text-blue-300 mb-1 text-center">Emotional Nature</h4>
                              <p className="text-sm text-center text-gray-300">
                                Your emotional nature tends toward{" "}
                                {profile.soulUrgeNumber === 1
                                  ? "independence and self-reliance"
                                  : profile.soulUrgeNumber === 2
                                    ? "sensitivity and emotional depth"
                                    : profile.soulUrgeNumber === 3
                                      ? "expressiveness and optimism"
                                      : profile.soulUrgeNumber === 4
                                        ? "stability and practicality"
                                        : profile.soulUrgeNumber === 5
                                          ? "adaptability and excitement"
                                          : profile.soulUrgeNumber === 6
                                            ? "nurturing and responsibility"
                                            : profile.soulUrgeNumber === 7
                                              ? "introspection and analysis"
                                              : profile.soulUrgeNumber === 8
                                                ? "ambition and control"
                                                : profile.soulUrgeNumber === 9
                                                  ? "compassion and universal love"
                                                  : profile.soulUrgeNumber === 11
                                                    ? "sensitivity and intuition"
                                                    : profile.soulUrgeNumber === 22
                                                      ? "practical idealism"
                                                      : "selfless love and service"}
                                .
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
                            <h4 className="font-medium text-violet-300 mb-2">Social Presentation</h4>
                            <p className="text-gray-300 mb-4">
                              Your Personality Number reveals how you present yourself to the world and how others
                              perceive you upon first meeting. It represents the aspects of yourself that you allow
                              others to see.
                            </p>
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-32 h-32 mb-4">
                              <NumberChart number={profile.personalityNumber} title="Personality" />
                            </div>
                            <div className="bg-violet-900/20 p-3 rounded-lg border border-violet-500/30 w-full">
                              <h4 className="font-medium text-violet-300 mb-1 text-center">Social Strengths</h4>
                              <p className="text-sm text-center text-gray-300">
                                Your social strengths include{" "}
                                {profile.personalityNumber === 1
                                  ? "leadership, confidence, and originality"
                                  : profile.personalityNumber === 2
                                    ? "diplomacy, cooperation, and sensitivity"
                                    : profile.personalityNumber === 3
                                      ? "communication, creativity, and charm"
                                      : profile.personalityNumber === 4
                                        ? "reliability, organization, and practicality"
                                        : profile.personalityNumber === 5
                                          ? "adaptability, enthusiasm, and versatility"
                                          : profile.personalityNumber === 6
                                            ? "responsibility, harmony, and nurturing"
                                            : profile.personalityNumber === 7
                                              ? "analysis, wisdom, and depth"
                                              : profile.personalityNumber === 8
                                                ? "authority, confidence, and leadership"
                                                : profile.personalityNumber === 9
                                                  ? "compassion, idealism, and sophistication"
                                                  : profile.personalityNumber === 11
                                                    ? "intuition, inspiration, and sensitivity"
                                                    : profile.personalityNumber === 22
                                                      ? "practicality, vision, and capability"
                                                      : "compassion, wisdom, and selflessness"}
                                .
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  {/* Core Numbers Relationship */}
                  <Card className="bg-gray-900/50 border-purple-500/30">
                    <CardHeader
                      className="pb-3 cursor-pointer"
                      onClick={() => toggleSection("coreRelationshipSection")}
                    >
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg flex items-center">
                          <BarChart3 className="h-5 w-5 mr-2 text-purple-400" />
                          Core Numbers Relationship
                        </CardTitle>
                        {expandedSections["coreRelationshipSection"] ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </CardHeader>
                    {expandedSections["coreRelationshipSection"] && (
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-gray-300 mb-4">
                              The relationship between your core numbers reveals important patterns in your numerology
                              profile. These interactions show how different aspects of your personality work together
                              or create tension.
                            </p>
                            <h4 className="font-medium text-purple-300 mb-2">Key Observations</h4>
                            <ul className="list-disc pl-5 space-y-2 text-gray-300">
                              <li>
                                Your Life Path ({profile.lifePathNumber}) and Destiny ({profile.destinyNumber}) numbers
                                are
                                {profile.lifePathNumber === profile.destinyNumber
                                  ? " identical, creating a powerful alignment between your natural tendencies and life goals."
                                  : Math.abs(profile.lifePathNumber - profile.destinyNumber) <= 1
                                    ? " very compatible, suggesting a harmonious flow between your natural tendencies and life goals."
                                    : " different, creating an interesting dynamic that may require integration of different energies."}
                              </li>
                              <li>
                                Your Soul Urge ({profile.soulUrgeNumber}) and Personality ({profile.personalityNumber})
                                numbers
                                {profile.soulUrgeNumber === profile.personalityNumber
                                  ? " match perfectly, indicating that your inner desires align with how you present yourself to the world."
                                  : " differ, suggesting that your inner desires and outer presentation may create a complex but rich personality."}
                              </li>
                              {profile.expressionNumber && (
                                <li>
                                  Your Destiny ({profile.destinyNumber}) and Expression ({profile.expressionNumber})
                                  numbers
                                  {profile.destinyNumber === profile.expressionNumber
                                    ? " are identical, indicating that your current name fully supports your life purpose."
                                    : " differ, suggesting that your current name is creating a new path or expression of your talents."}
                                </li>
                              )}
                              <li>
                                Your Maturity Number ({profile.maturityNumber}) indicates that as you age, you will
                                develop more
                                {numberData
                                  .find((item) => item.number === profile.maturityNumber)
                                  ?.keywords.map((keyword, index) =>
                                    index === 0
                                      ? ` ${keyword.toLowerCase()}`
                                      : index ===
                                          numberData.find((item) => item.number === profile.maturityNumber)?.keywords
                                            .length -
                                            1
                                        ? ` and ${keyword.toLowerCase()}`
                                        : `, ${keyword.toLowerCase()}`,
                                  )}
                                .
                              </li>
                            </ul>
                          </div>
                          <div className="flex items-center justify-center">
                            <LifePathChart
                              lifePathNumber={profile.lifePathNumber}
                              destinyNumber={profile.destinyNumber}
                              soulNumber={profile.soulUrgeNumber}
                            />
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </TabsContent>

                <TabsContent value="cycles" className="space-y-6">
                  {/* Personal Year Section */}
                  <Card className="bg-gray-900/50 border-green-500/30">
                    <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleSection("personalYearSection")}>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg flex items-center">
                          <Calendar className="h-5 w-5 mr-2 text-green-400" />
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="col-span-2">
                            <p className="text-gray-300 mb-4">{getPersonalYearMeaning(profile.personalYear || 1)}</p>
                            <h4 className="font-medium text-green-300 mb-2">Current Cycle</h4>
                            <p className="text-gray-300 mb-4">
                              You are currently in a Personal Year {profile.personalYear}, Personal Month{" "}
                              {profile.personalMonth}, and Personal Day {profile.personalDay} cycle. These numbers
                              indicate the energies and opportunities available to you during these specific time
                              periods.
                            </p>
                          </div>
                          <div>
                            <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30 mb-4">
                              <h4 className="font-medium text-green-300 mb-2 text-center">
                                Personal Month: {profile.personalMonth}
                              </h4>
                              <p className="text-sm text-center text-gray-300">
                                This month emphasizes{" "}
                                {profile.personalMonth === 1
                                  ? "new beginnings and initiative"
                                  : profile.personalMonth === 2
                                    ? "patience and cooperation"
                                    : profile.personalMonth === 3
                                      ? "creativity and self-expression"
                                      : profile.personalMonth === 4
                                        ? "organization and practical matters"
                                        : profile.personalMonth === 5
                                          ? "change and freedom"
                                          : profile.personalMonth === 6
                                            ? "responsibility and service"
                                            : profile.personalMonth === 7
                                              ? "reflection and spiritual growth"
                                              : profile.personalMonth === 8
                                                ? "business and achievement"
                                                : "completion and letting go"}
                                .
                              </p>
                            </div>
                            <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                              <h4 className="font-medium text-green-300 mb-2 text-center">
                                Personal Day: {profile.personalDay}
                              </h4>
                              <p className="text-sm text-center text-gray-300">
                                Today is ideal for{" "}
                                {profile.personalDay === 1
                                  ? "taking initiative and starting new projects"
                                  : profile.personalDay === 2
                                    ? "cooperation and diplomatic interactions"
                                    : profile.personalDay === 3
                                      ? "creative expression and socializing"
                                      : profile.personalDay === 4
                                        ? "organization and attending to practical matters"
                                        : profile.personalDay === 5
                                          ? "embracing change and variety"
                                          : profile.personalDay === 6
                                            ? "handling responsibilities and nurturing others"
                                            : profile.personalDay === 7
                                              ? "reflection, research, and spiritual activities"
                                              : profile.personalDay === 8
                                                ? "focusing on business and financial matters"
                                                : "completion, giving back, and letting go"}
                                .
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  {/* Life Cycles Timeline */}
                  <Card className="bg-gray-900/50 border-purple-500/30">
                    <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleSection("timelineSection")}>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg flex items-center">
                          <Clock className="h-5 w-5 mr-2 text-purple-400" />
                          Life Cycles Timeline
                        </CardTitle>
                        {expandedSections["timelineSection"] ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </CardHeader>
                    {expandedSections["timelineSection"] && (
                      <CardContent className="pt-0">
                        <div className="mb-6">
                          <p className="text-gray-300 mb-4">
                            Your life is divided into distinct cycles, each with its own challenges and opportunities.
                            Understanding these cycles helps you navigate life's journey with greater awareness and
                            purpose.
                          </p>
                          <NumerologyTimeline
                            birthdate={profile.birthDate.toISOString().split("T")[0]}
                            challengeNumbers={profile.challengeNumbers || []}
                            pinnacleNumbers={profile.pinnacleNumbers || []}
                          />
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  {/* Pinnacle Numbers Section */}
                  <Card className="bg-gray-900/50 border-emerald-500/30">
                    <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleSection("pinnaclesSection")}>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg flex items-center">
                          <ArrowRight className="h-5 w-5 mr-2 text-emerald-400" />
                          Pinnacle Numbers
                        </CardTitle>
                        {expandedSections["pinnaclesSection"] ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </CardHeader>
                    {expandedSections["pinnaclesSection"] && (
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-gray-300 mb-4">
                              Pinnacle Numbers represent periods of opportunity and achievement in your life. They
                              indicate the lessons you are ready to master and the gifts you can access during specific
                              life periods.
                            </p>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium text-emerald-300 mb-1">
                                  First Pinnacle ({profile.pinnacleNumbers?.[0]})
                                </h4>
                                <p className="text-gray-300 text-sm">
                                  Birth to age 27-35: {getPinnacleMeaning(profile.pinnacleNumbers?.[0] || 0)}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-medium text-emerald-300 mb-1">
                                  Second Pinnacle ({profile.pinnacleNumbers?.[1]})
                                </h4>
                                <p className="text-gray-300 text-sm">
                                  Age 27-35 to 36-44: {getPinnacleMeaning(profile.pinnacleNumbers?.[1] || 0)}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-medium text-emerald-300 mb-1">
                                  Third Pinnacle ({profile.pinnacleNumbers?.[2]})
                                </h4>
                                <p className="text-gray-300 text-sm">
                                  Age 36-44 to 53-62: {getPinnacleMeaning(profile.pinnacleNumbers?.[2] || 0)}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-medium text-emerald-300 mb-1">
                                  Fourth Pinnacle ({profile.pinnacleNumbers?.[3]})
                                </h4>
                                <p className="text-gray-300 text-sm">
                                  Age 53-62 onward: {getPinnacleMeaning(profile.pinnacleNumbers?.[3] || 0)}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-emerald-300 mb-2">Pinnacle Progression</h4>
                            <div className="bg-emerald-900/20 p-4 rounded-lg border border-emerald-500/30">
                              <div className="space-y-3">
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-emerald-300">First Pinnacle</span>
                                    <span className="text-sm text-emerald-300">{profile.pinnacleNumbers?.[0]}</span>
                                  </div>
                                  <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div
                                      className="bg-emerald-500 h-2 rounded-full"
                                      style={{ width: `${(profile.pinnacleNumbers?.[0] || 0) * 11}%` }}
                                    ></div>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-emerald-300">Second Pinnacle</span>
                                    <span className="text-sm text-emerald-300">{profile.pinnacleNumbers?.[1]}</span>
                                  </div>
                                  <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div
                                      className="bg-emerald-500 h-2 rounded-full"
                                      style={{ width: `${(profile.pinnacleNumbers?.[1] || 0) * 11}%` }}
                                    ></div>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-emerald-300">Third Pinnacle</span>
                                    <span className="text-sm text-emerald-300">{profile.pinnacleNumbers?.[2]}</span>
                                  </div>
                                  <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div
                                      className="bg-emerald-500 h-2 rounded-full"
                                      style={{ width: `${(profile.pinnacleNumbers?.[2] || 0) * 11}%` }}
                                    ></div>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-emerald-300">Fourth Pinnacle</span>
                                    <span className="text-sm text-emerald-300">{profile.pinnacleNumbers?.[3]}</span>
                                  </div>
                                  <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div
                                      className="bg-emerald-500 h-2 rounded-full"
                                      style={{ width: `${(profile.pinnacleNumbers?.[3] || 0) * 11}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </TabsContent>

                <TabsContent value="challenges" className="space-y-6">
                  {/* Challenge Numbers Section */}
                  <Card className="bg-gray-900/50 border-amber-500/30">
                    <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleSection("challenge1Section")}>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg flex items-center">
                          <ArrowRight className="h-5 w-5 mr-2 text-amber-400" />
                          First Challenge: {profile.challengeNumbers?.[0]}
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="col-span-2">
                            <p className="text-gray-300 mb-4">
                              Your First Challenge (birth to age 27-35) is {profile.challengeNumbers?.[0]}.
                              {getChallengeMeaning(profile.challengeNumbers?.[0] || 0)}
                            </p>
                            <h4 className="font-medium text-amber-300 mb-2">Early Life Lessons</h4>
                            <p className="text-gray-300 mb-4">
                              This challenge represents the obstacles and lessons you need to overcome in your early
                              life. It often relates to family patterns, education, and establishing your identity.
                            </p>
                          </div>
                          <div className="flex flex-col justify-center">
                            <div className="bg-amber-900/20 p-4 rounded-lg border border-amber-500/30">
                              <h4 className="font-medium text-amber-300 mb-2 text-center">Challenge Timeline</h4>
                              <div className="relative pt-6 pb-2">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gray-700"></div>
                                <div className="absolute top-0 left-0 w-1/4 h-1 bg-amber-500"></div>
                                <div className="absolute top-0 left-0 w-1 h-3 bg-amber-500 -translate-y-1"></div>
                                <div className="absolute top-0 left-1/4 w-1 h-3 bg-amber-500 -translate-y-1"></div>
                                <div className="absolute top-0 left-1/2 w-1 h-3 bg-gray-700 -translate-y-1"></div>
                                <div className="absolute top-0 left-3/4 w-1 h-3 bg-gray-700 -translate-y-1"></div>
                                <div className="absolute top-0 right-0 w-1 h-3 bg-gray-700 -translate-y-1"></div>
                                <div className="flex justify-between text-xs text-gray-400 mt-2">
                                  <span>Birth</span>
                                  <span className="absolute left-1/4 transform -translate-x-1/2">Age 28-35</span>
                                  <span className="absolute left-1/2 transform -translate-x-1/2">Age 36-44</span>
                                  <span className="absolute left-3/4 transform -translate-x-1/2">Age 53-62</span>
                                  <span>Onward</span>
                                </div>
                              </div>
                              <div className="text-center mt-6">
                                <span className="inline-block px-3 py-1 bg-amber-900/40 text-amber-300 rounded-full text-sm">
                                  Current Focus
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  {/* Additional Challenge Numbers */}
                  {profile.challengeNumbers?.slice(1).map((challenge, index) => (
                    <Card key={index + 1} className="bg-gray-900/50 border-amber-500/30">
                      <CardHeader
                        className="pb-3 cursor-pointer"
                        onClick={() => toggleSection(`challenge${index + 2}Section`)}
                      >
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg flex items-center">
                            <ArrowRight className="h-5 w-5 mr-2 text-amber-400" />
                            {index === 0 ? "Second" : index === 1 ? "Third" : "Fourth"} Challenge: {challenge}
                          </CardTitle>
                          {expandedSections[`challenge${index + 2}Section`] ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </CardHeader>
                      {expandedSections[`challenge${index + 2}Section`] && (
                        <CardContent className="pt-0">
                          <p className="text-gray-300 mb-4">
                            Your {index === 0 ? "Second" : index === 1 ? "Third" : "Fourth"} Challenge is {challenge}.
                            {getChallengeMeaning(challenge)}
                          </p>
                        </CardContent>
                      )}
                    </Card>
                  ))}

                  {/* Karmic Lessons Section */}
                  <Card className="bg-gray-900/50 border-purple-500/30">
                    <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleSection("karmicLessonsSection")}>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg flex items-center">
                          <Sparkles className="h-5 w-5 mr-2 text-purple-400" />
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="col-span-2">
                            <p className="text-gray-300 mb-4">
                              Karmic Lessons are indicated by missing numbers in your name. They represent skills or
                              qualities that you need to develop in this lifetime, often because they were neglected in
                              past lives.
                            </p>
                            {profile.karmicLessons && profile.karmicLessons.length > 0 ? (
                              <div>
                                <h4 className="font-medium text-purple-300 mb-2">Your Karmic Lessons</h4>
                                <div className="space-y-3">
                                  {profile.karmicLessons.map((lesson, index) => (
                                    <div
                                      key={index}
                                      className="bg-purple-900/20 p-3 rounded-lg border border-purple-500/30"
                                    >
                                      <h5 className="font-medium text-purple-300 mb-1">Karmic Lesson {lesson}</h5>
                                      <p className="text-sm text-gray-300">{getKarmicLessonMeaning(lesson)}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                                <h4 className="font-medium text-purple-300 mb-2 text-center">No Karmic Lessons</h4>
                                <p className="text-center text-gray-300">
                                  You have no missing numbers in your name, which suggests that you have already
                                  developed a well-rounded set of skills and qualities. This indicates balanced
                                  development from past lives.
                                </p>
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-purple-300 mb-2">Hidden Passion</h4>
                            <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                              <div className="w-20 h-20 mx-auto mb-3">
                                <NumberChart number={profile.hiddenPassionNumber || 0} title="Hidden Passion" />
                              </div>
                              <p className="text-center text-gray-300">
                                Your Hidden Passion number is {profile.hiddenPassionNumber}, indicating a natural talent
                                and love for activities related to{" "}
                                {profile.hiddenPassionNumber === 1
                                  ? "leadership, independence, and pioneering"
                                  : profile.hiddenPassionNumber === 2
                                    ? "cooperation, diplomacy, and relationships"
                                    : profile.hiddenPassionNumber === 3
                                      ? "creativity, communication, and self-expression"
                                      : profile.hiddenPassionNumber === 4
                                        ? "organization, detail, and building"
                                        : profile.hiddenPassionNumber === 5
                                          ? "freedom, change, and adventure"
                                          : profile.hiddenPassionNumber === 6
                                            ? "responsibility, nurturing, and harmony"
                                            : profile.hiddenPassionNumber === 7
                                              ? "analysis, research, and spiritual pursuits"
                                              : profile.hiddenPassionNumber === 8
                                                ? "business, achievement, and authority"
                                                : "humanitarian service, compassion, and artistic expression"}
                                .
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </TabsContent>

                <TabsContent value="future" className="space-y-6">
                  {/* Future Trends Section */}
                  <Card className="bg-gray-900/50 border-blue-500/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-blue-400" />
                        Future Trends and Forecasts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-blue-300 mb-2">9-Year Cycle Forecast</h4>
                          <p className="text-gray-300 mb-4">
                            Numerology works in 9-year cycles. Based on your Personal Year {profile.personalYear},
                            here's what you can expect in the coming years:
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((year) => (
                              <div
                                key={year}
                                className={`p-3 rounded-lg border ${
                                  year === profile.personalYear
                                    ? "bg-blue-900/30 border-blue-500/50"
                                    : "bg-gray-800/30 border-gray-700"
                                }`}
                              >
                                <h5
                                  className={`font-medium mb-1 ${
                                    year === profile.personalYear ? "text-blue-300" : "text-gray-300"
                                  }`}
                                >
                                  Year {year}
                                </h5>
                                <p className="text-sm text-gray-300">{getPersonalYearMeaning(year).split(".")[0]}.</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-blue-300 mb-2">Long-Term Forecast</h4>
                          <p className="text-gray-300 mb-4">
                            Based on your numerology profile, here are some key trends and opportunities to watch for in
                            the coming years:
                          </p>
                          <ul className="list-disc pl-5 space-y-2 text-gray-300">
                            <li>
                              <span className="font-medium">Relationship Dynamics:</span> With your Soul Urge number{" "}
                              {profile.soulUrgeNumber}, you will likely seek deeper connections that offer{" "}
                              {profile.soulUrgeNumber === 1
                                ? "freedom and independence"
                                : profile.soulUrgeNumber === 2
                                  ? "harmony and cooperation"
                                  : profile.soulUrgeNumber === 3
                                    ? "creativity and joy"
                                    : profile.soulUrgeNumber === 4
                                      ? "stability and security"
                                      : profile.soulUrgeNumber === 5
                                        ? "variety and adventure"
                                        : profile.soulUrgeNumber === 6
                                          ? "nurturing and responsibility"
                                          : profile.soulUrgeNumber === 7
                                            ? "depth and understanding"
                                            : profile.soulUrgeNumber === 8
                                              ? "mutual success and achievement"
                                              : "compassion and universal love"}
                              .
                            </li>
                            <li>
                              <span className="font-medium">Career Evolution:</span> Your Destiny number{" "}
                              {profile.destinyNumber} suggests that your career will increasingly align with{" "}
                              {profile.destinyNumber === 1
                                ? "leadership and pioneering new ideas"
                                : profile.destinyNumber === 2
                                  ? "cooperation, support roles, and partnerships"
                                  : profile.destinyNumber === 3
                                    ? "creative expression and communication"
                                    : profile.destinyNumber === 4
                                      ? "building, organizing, and creating solid structures"
                                      : profile.destinyNumber === 5
                                        ? "change, variety, and progressive ideas"
                                        : profile.destinyNumber === 6
                                          ? "service, teaching, and nurturing others"
                                          : profile.destinyNumber === 7
                                            ? "research, analysis, and specialized knowledge"
                                            : profile.destinyNumber === 8
                                              ? "business, management, and material achievement"
                                              : profile.destinyNumber === 9
                                                ? "humanitarian work and universal service"
                                                : profile.destinyNumber === 11
                                                  ? "inspiration, spiritual teaching, and visionary ideas"
                                                  : profile.destinyNumber === 22
                                                    ? "large-scale projects and practical manifestation"
                                                    : "spiritual teaching and selfless service"}
                              .
                            </li>
                            <li>
                              <span className="font-medium">Personal Growth:</span> As you move toward your Maturity
                              number {profile.maturityNumber}, you will develop more{" "}
                              {profile.maturityNumber === 1
                                ? "independence and leadership"
                                : profile.maturityNumber === 2
                                  ? "diplomacy and cooperation"
                                  : profile.maturityNumber === 3
                                    ? "creativity and self-expression"
                                    : profile.maturityNumber === 4
                                      ? "practicality and organization"
                                      : profile.maturityNumber === 5
                                        ? "adaptability and freedom"
                                        : profile.maturityNumber === 6
                                          ? "responsibility and nurturing"
                                          : profile.maturityNumber === 7
                                            ? "wisdom and spiritual awareness"
                                            : profile.maturityNumber === 8
                                              ? "material mastery and authority"
                                              : profile.maturityNumber === 9
                                                ? "compassion and universal perspective"
                                                : profile.maturityNumber === 11
                                                  ? "intuition and inspiration"
                                                  : profile.maturityNumber === 22
                                                    ? "practical vision and master building"
                                                    : "spiritual teaching and selfless service"}
                              .
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="text-center text-gray-400 p-8">
              <FileText className="h-12 w-12 mx-auto mb-4 text-purple-500/50" />
              <p>Calculate your numerology profile first to generate your comprehensive report</p>
              <p className="text-sm mt-2">Your detailed analysis will appear here</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
