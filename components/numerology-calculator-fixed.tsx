"use client"

import { Badge } from "@/components/ui/badge"
import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, Info, User, Clock, FileText, Check, Sparkles, AlertTriangle } from "lucide-react"
import { MembershipBadge } from "@/components/membership-badge"
import { type MembershipStatus, hasPremiumAccess } from "@/lib/membership-types"
import { NumerologyTimeline } from "@/components/numerology-calculator/numerology-timeline"
import { ComprehensiveNumerologyReport } from "@/components/comprehensive-numerology-report"
import { toast } from "@/components/ui/use-toast"

interface NumerologyResult {
  lifePathNumber: number
  destinyNumber: number
  soulNumber: number
  personalityNumber: number
  birthDayNumber: number
  expressionNumber: number
  maturityNumber: number
  challengeNumbers: number[]
  pinnacleNumbers: number[]
  compoundNumbers?: Record<string, number>
  compatibility?: Record<string, number | string>
  detailedReport?: string
}

interface CalculationSession {
  userData: {
    fullName: string
    currentName?: string
    nicknames?: string
    birthDate: string
  }
  results: NumerologyResult
  timestamp: string
  isComplete: boolean
}

interface UserProfile {
  fullName?: string
  currentName?: string
  nicknames?: string
  birthDate?: string
  lastUsed?: string
}

interface NumerologyCalculation {
  lifePathNumber?: number
  destinyNumber?: number
  soulNumber?: number
  personalityNumber?: number
  birthDayNumber?: number
  expressionNumber?: number
  maturityNumber?: number
  challengeNumbers?: number[]
  pinnacleNumbers?: number[]
  calculatedAt?: string
}

interface NumerologyCalculatorProps {
  membershipStatus?: MembershipStatus
  onVerifyPurchase?: (purchaseId: string) => void
  hasPrivacyConsent?: boolean
  onReportCalculated?: (data: any) => void
}

// Safe localStorage wrapper
class SafeStorage {
  private isAvailable: boolean

  constructor() {
    this.isAvailable = this.checkAvailability()
  }

  private checkAvailability(): boolean {
    try {
      if (typeof window === "undefined") return false
      const test = "__storage_test__"
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  }

  getItem(key: string): string | null {
    if (!this.isAvailable) return null
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  }

  setItem(key: string, value: string): boolean {
    if (!this.isAvailable) return false
    try {
      localStorage.setItem(key, value)
      return true
    } catch {
      return false
    }
  }

  removeItem(key: string): boolean {
    if (!this.isAvailable) return false
    try {
      localStorage.removeItem(key)
      return true
    } catch {
      return false
    }
  }
}

// Safe user data service
class SafeUserDataService {
  private storage = new SafeStorage()
  private readonly USER_PROFILE_KEY = "numo_user_profile"
  private readonly LAST_CALCULATION_KEY = "numo_last_calculation"

  getUserProfile(): UserProfile | null {
    try {
      const data = this.storage.getItem(this.USER_PROFILE_KEY)
      return data ? JSON.parse(data) : null
    } catch {
      return null
    }
  }

  saveUserProfile(profile: Partial<UserProfile>): boolean {
    try {
      const existing = this.getUserProfile() || {}
      const updated = { ...existing, ...profile, lastUsed: new Date().toISOString() }
      return this.storage.setItem(this.USER_PROFILE_KEY, JSON.stringify(updated))
    } catch {
      return false
    }
  }

  getLastCalculation(): NumerologyCalculation | null {
    try {
      const data = this.storage.getItem(this.LAST_CALCULATION_KEY)
      return data ? JSON.parse(data) : null
    } catch {
      return null
    }
  }

  saveNumerologyCalculation(calculation: NumerologyCalculation): boolean {
    try {
      const updated = { ...calculation, calculatedAt: new Date().toISOString() }
      return this.storage.setItem(this.LAST_CALCULATION_KEY, JSON.stringify(updated))
    } catch {
      return false
    }
  }

  clearAllData(): boolean {
    try {
      this.storage.removeItem(this.USER_PROFILE_KEY)
      this.storage.removeItem(this.LAST_CALCULATION_KEY)
      return true
    } catch {
      return false
    }
  }
}

export default function NumerologyCalculatorFixed({
  membershipStatus = { type: "free", verified: true },
  onVerifyPurchase,
  hasPrivacyConsent = false,
  onReportCalculated,
}: NumerologyCalculatorProps) {
  const hasPremium = hasPremiumAccess(membershipStatus.type)
  const userDataService = useRef(new SafeUserDataService()).current

  // Form state
  const [name, setName] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [currentName, setCurrentName] = useState("")
  const [nicknames, setNicknames] = useState("")

  // Calculation state
  const [result, setResult] = useState<NumerologyResult | null>(null)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("calculator")

  // Session management
  const [currentSession, setCurrentSession] = useState<CalculationSession | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isRestoringData, setIsRestoringData] = useState(false)
  const [dataRestored, setDataRestored] = useState(false)

  // Report generation
  const [showComprehensiveReport, setShowComprehensiveReport] = useState(false)
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [reportData, setReportData] = useState<any>(null)

  // Prevent duplicate toasts
  const toastShownRef = useRef(false)
  const lastRestoredTimestamp = useRef<string>("")

  // Numerology calculation functions with proper validation
  const letterToNumber = useCallback((letter: string): number => {
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
    const normalized = letter.toLowerCase()
    return letterMap[normalized] || 0
  }, [])

  const reduceToSingleDigit = useCallback((num: number): number => {
    if (!Number.isFinite(num) || num < 0) return 0
    if (num === 11 || num === 22 || num === 33) return num
    if (num < 10) return num

    const digits = Math.abs(Math.floor(num)).toString().split("")
    const sum = digits.reduce((acc, digit) => acc + Number.parseInt(digit, 10), 0)
    return reduceToSingleDigit(sum)
  }, [])

  const calculateLifePathNumber = useCallback(
    (date: string): number => {
      try {
        const [year, month, day] = date.split("-").map(Number)
        if (!year || !month || !day || year < 1900 || month < 1 || month > 12 || day < 1 || day > 31) {
          throw new Error("Invalid date")
        }

        const dayNum = reduceToSingleDigit(day)
        const monthNum = reduceToSingleDigit(month)
        const yearNum = reduceToSingleDigit(year)
        return reduceToSingleDigit(dayNum + monthNum + yearNum)
      } catch {
        return 0
      }
    },
    [reduceToSingleDigit],
  )

  const calculateDestinyNumber = useCallback(
    (fullName: string): number => {
      try {
        if (!fullName || typeof fullName !== "string") return 0

        const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, "")
        if (!cleanName) return 0

        const nameSum = cleanName.split("").reduce((sum, letter) => sum + letterToNumber(letter), 0)
        return reduceToSingleDigit(nameSum)
      } catch {
        return 0
      }
    },
    [letterToNumber, reduceToSingleDigit],
  )

  const calculateSoulNumber = useCallback(
    (fullName: string): number => {
      try {
        if (!fullName || typeof fullName !== "string") return 0

        const vowels = "aeiou"
        const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, "")
        if (!cleanName) return 0

        const vowelSum = cleanName.split("").reduce((sum, letter) => {
          if (vowels.includes(letter)) {
            return sum + letterToNumber(letter)
          }
          return sum
        }, 0)
        return reduceToSingleDigit(vowelSum)
      } catch {
        return 0
      }
    },
    [letterToNumber, reduceToSingleDigit],
  )

  const calculatePersonalityNumber = useCallback(
    (fullName: string): number => {
      try {
        if (!fullName || typeof fullName !== "string") return 0

        const vowels = "aeiou"
        const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, "")
        if (!cleanName) return 0

        const consonantSum = cleanName.split("").reduce((sum, letter) => {
          if (!vowels.includes(letter)) {
            return sum + letterToNumber(letter)
          }
          return sum
        }, 0)
        return reduceToSingleDigit(consonantSum)
      } catch {
        return 0
      }
    },
    [letterToNumber, reduceToSingleDigit],
  )

  const calculateBirthDayNumber = useCallback(
    (date: string): number => {
      try {
        const day = Number.parseInt(date.split("-")[2], 10)
        if (!Number.isFinite(day) || day < 1 || day > 31) return 0
        return reduceToSingleDigit(day)
      } catch {
        return 0
      }
    },
    [reduceToSingleDigit],
  )

  const calculateExpressionNumber = useCallback(
    (fullName: string): number => {
      return calculateDestinyNumber(fullName)
    },
    [calculateDestinyNumber],
  )

  const calculateMaturityNumber = useCallback(
    (lifePathNumber: number, destinyNumber: number): number => {
      if (!Number.isFinite(lifePathNumber) || !Number.isFinite(destinyNumber)) return 0
      return reduceToSingleDigit(lifePathNumber + destinyNumber)
    },
    [reduceToSingleDigit],
  )

  const calculateChallengeNumbers = useCallback(
    (date: string): number[] => {
      try {
        const [year, month, day] = date.split("-").map(Number)
        if (!year || !month || !day) return [0, 0, 0, 0]

        const m = reduceToSingleDigit(month)
        const d = reduceToSingleDigit(day)
        const y = reduceToSingleDigit(year)

        const c1 = reduceToSingleDigit(Math.abs(m - d))
        const c2 = reduceToSingleDigit(Math.abs(d - y))
        const c3 = reduceToSingleDigit(Math.abs(c1 - c2))
        const c4 = reduceToSingleDigit(Math.abs(m - y))

        return [c1, c2, c3, c4]
      } catch {
        return [0, 0, 0, 0]
      }
    },
    [reduceToSingleDigit],
  )

  const calculatePinnacleNumbers = useCallback(
    (date: string): number[] => {
      try {
        const [year, month, day] = date.split("-").map(Number)
        if (!year || !month || !day) return [0, 0, 0, 0]

        const m = reduceToSingleDigit(month)
        const d = reduceToSingleDigit(day)
        const y = reduceToSingleDigit(year)

        const p1 = reduceToSingleDigit(m + d)
        const p2 = reduceToSingleDigit(d + y)
        const p3 = reduceToSingleDigit(p1 + p2)
        const p4 = reduceToSingleDigit(m + y)

        return [p1, p2, p3, p4]
      } catch {
        return [0, 0, 0, 0]
      }
    },
    [reduceToSingleDigit],
  )

  // Validation functions
  const validateInputs = useCallback((): string | null => {
    if (!name || typeof name !== "string" || !name.trim()) {
      return "Please enter your full name"
    }

    const namePattern = /^[A-Za-z\s'-]+$/
    if (!namePattern.test(name.trim())) {
      return "Name should contain only letters, spaces, hyphens, and apostrophes"
    }

    if (name.trim().length < 2) {
      return "Name must be at least 2 characters long"
    }

    if (!birthdate) {
      return "Please enter your birthdate"
    }

    try {
      const [year, month, day] = birthdate.split("-").map(Number)
      const currentDate = new Date()
      const selectedDate = new Date(year, month - 1, day)

      if (isNaN(selectedDate.getTime())) {
        return "Invalid date format"
      }

      if (selectedDate > currentDate) {
        return "Birthdate cannot be in the future"
      }

      if (year < 1900) {
        return "Birth year must be 1900 or later"
      }

      if (year > currentDate.getFullYear()) {
        return "Birth year cannot be in the future"
      }

      if (month < 1 || month > 12) {
        return "Invalid month"
      }

      if (day < 1 || day > 31) {
        return "Invalid day"
      }

      // Check for valid day in month
      const daysInMonth = new Date(year, month, 0).getDate()
      if (day > daysInMonth) {
        return "Invalid day for the selected month"
      }
    } catch {
      return "Invalid date format"
    }

    return null
  }, [name, birthdate])

  // Auto-save session data
  const saveCurrentSession = useCallback(
    (userData: any, results: NumerologyResult) => {
      if (!hasPrivacyConsent) return

      try {
        const session: CalculationSession = {
          userData,
          results,
          timestamp: new Date().toISOString(),
          isComplete: true,
        }

        setCurrentSession(session)

        // Save to user data service
        userDataService.saveNumerologyCalculation({
          ...results,
          calculatedAt: session.timestamp,
        })

        userDataService.saveUserProfile({
          fullName: userData.fullName,
          currentName: userData.currentName,
          nicknames: userData.nicknames,
          birthDate: userData.birthDate,
        })
      } catch (err) {
        console.warn("Failed to save session:", err)
      }
    },
    [hasPrivacyConsent, userDataService],
  )

  // Load user data on component mount and consent change
  useEffect(() => {
    if (hasPrivacyConsent) {
      setIsRestoringData(true)

      try {
        const profile = userDataService.getUserProfile()
        const lastCalculation = userDataService.getLastCalculation()

        if (profile) {
          setUserProfile(profile)
          setName(profile.fullName || "")
          setCurrentName(profile.currentName || "")
          setNicknames(profile.nicknames || "")
          setBirthdate(profile.birthDate || "")

          // Restore complete session if available
          if (lastCalculation && profile.fullName && profile.birthDate) {
            const restoredResult: NumerologyResult = {
              lifePathNumber: lastCalculation.lifePathNumber || 0,
              destinyNumber: lastCalculation.destinyNumber || 0,
              soulNumber: lastCalculation.soulNumber || 0,
              personalityNumber: lastCalculation.personalityNumber || 0,
              birthDayNumber: lastCalculation.birthDayNumber || 0,
              expressionNumber: lastCalculation.expressionNumber || 0,
              maturityNumber: lastCalculation.maturityNumber || 0,
              challengeNumbers: lastCalculation.challengeNumbers || [],
              pinnacleNumbers: lastCalculation.pinnacleNumbers || [],
            }

            if (restoredResult.lifePathNumber > 0) {
              setResult(restoredResult)

              // Restore complete session
              const restoredSession: CalculationSession = {
                userData: {
                  fullName: profile.fullName,
                  currentName: profile.currentName,
                  nicknames: profile.nicknames,
                  birthDate: profile.birthDate,
                },
                results: restoredResult,
                timestamp: lastCalculation.calculatedAt || new Date().toISOString(),
                isComplete: true,
              }

              setCurrentSession(restoredSession)
              setDataRestored(true)

              // Auto-generate report data for seamless experience
              const autoReportData = {
                birthName: profile.fullName,
                currentName: profile.currentName || undefined,
                nickname: profile.nicknames || undefined,
                birthDate: new Date(profile.birthDate),
                lifePath: restoredResult.lifePathNumber,
                expression: restoredResult.expressionNumber,
                soulUrge: restoredResult.soulNumber,
                personality: restoredResult.personalityNumber,
              }

              setReportData(autoReportData)

              if (onReportCalculated) {
                onReportCalculated(autoReportData)
              }

              // Prevent duplicate toasts
              const currentTimestamp = lastCalculation.calculatedAt || ""
              if (!toastShownRef.current && currentTimestamp !== lastRestoredTimestamp.current) {
                lastRestoredTimestamp.current = currentTimestamp
                toastShownRef.current = true

                toast({
                  title: "Welcome Back!",
                  description: `Your calculation from ${new Date(currentTimestamp).toLocaleDateString()} has been restored. Ready to generate your comprehensive report!`,
                })

                // Reset toast flag after a delay
                setTimeout(() => {
                  toastShownRef.current = false
                }, 5000)
              }
            }
          }
        }
      } catch (err) {
        console.warn("Failed to restore user data:", err)
      }

      setIsRestoringData(false)
    } else {
      // Clear all data when consent is withdrawn
      setUserProfile(null)
      setCurrentSession(null)
      setName("")
      setCurrentName("")
      setNicknames("")
      setBirthdate("")
      setResult(null)
      setDataRestored(false)
      setReportData(null)
      setShowComprehensiveReport(false)
      toastShownRef.current = false
      lastRestoredTimestamp.current = ""
    }
  }, [hasPrivacyConsent, userDataService, onReportCalculated])

  // Auto-save form data as user types (with debouncing)
  useEffect(() => {
    if (!hasPrivacyConsent) return

    const timeoutId = setTimeout(() => {
      if (name || currentName || nicknames || birthdate) {
        try {
          const profileData: Partial<UserProfile> = {}
          if (name) profileData.fullName = name
          if (currentName) profileData.currentName = currentName
          if (nicknames) profileData.nicknames = nicknames
          if (birthdate) profileData.birthDate = birthdate

          userDataService.saveUserProfile(profileData)
        } catch (err) {
          console.warn("Failed to auto-save profile data:", err)
        }
      }
    }, 1000) // Debounce for 1 second

    return () => clearTimeout(timeoutId)
  }, [name, currentName, nicknames, birthdate, hasPrivacyConsent, userDataService])

  // Handle form submission with automatic session management
  const handleCalculate = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      setError("")

      const validationError = validateInputs()
      if (validationError) {
        setError(validationError)
        return
      }

      try {
        const lifePathNumber = calculateLifePathNumber(birthdate)
        const destinyNumber = calculateDestinyNumber(name)
        const soulNumber = calculateSoulNumber(name)
        const personalityNumber = calculatePersonalityNumber(name)
        const birthDayNumber = calculateBirthDayNumber(birthdate)
        const expressionNumber = calculateExpressionNumber(name)
        const maturityNumber = calculateMaturityNumber(lifePathNumber, destinyNumber)

        // Validate all calculations
        const numbers = [
          lifePathNumber,
          destinyNumber,
          soulNumber,
          personalityNumber,
          birthDayNumber,
          expressionNumber,
          maturityNumber,
        ]
        if (numbers.some((num) => !Number.isFinite(num) || num < 0)) {
          throw new Error("Invalid calculation results")
        }

        const newResult: NumerologyResult = {
          lifePathNumber,
          destinyNumber,
          soulNumber,
          personalityNumber,
          birthDayNumber,
          expressionNumber,
          maturityNumber,
          challengeNumbers: calculateChallengeNumbers(birthdate),
          pinnacleNumbers: calculatePinnacleNumbers(birthdate),
        }

        setResult(newResult)

        // Prepare user data
        const userData = {
          fullName: name,
          currentName: currentName || undefined,
          nicknames: nicknames || undefined,
          birthDate: birthdate,
        }

        // Auto-save session
        saveCurrentSession(userData, newResult)

        // Prepare report data automatically
        const autoReportData = {
          birthName: name,
          currentName: currentName || undefined,
          nickname: nicknames || undefined,
          birthDate: new Date(birthdate),
          lifePath: lifePathNumber,
          expression: expressionNumber,
          soulUrge: soulNumber,
          personality: personalityNumber,
        }

        setReportData(autoReportData)

        if (onReportCalculated) {
          onReportCalculated(autoReportData)
        }

        toast({
          title: "Calculation Complete",
          description: "Your numerology profile is ready! You can now generate your comprehensive report instantly.",
        })
      } catch (err) {
        console.error("Calculation error:", err)
        setError("An error occurred during calculation. Please check your inputs and try again.")
      }
    },
    [
      validateInputs,
      calculateLifePathNumber,
      calculateDestinyNumber,
      calculateSoulNumber,
      calculatePersonalityNumber,
      calculateBirthDayNumber,
      calculateExpressionNumber,
      calculateMaturityNumber,
      calculateChallengeNumbers,
      calculatePinnacleNumbers,
      birthdate,
      name,
      currentName,
      nicknames,
      saveCurrentSession,
      onReportCalculated,
    ],
  )

  // Streamlined comprehensive report generation
  const handleGenerateComprehensiveReport = useCallback(() => {
    if (!currentSession?.isComplete) {
      toast({
        title: "Calculate First",
        description: "Please calculate your basic numerology profile first.",
        variant: "destructive",
      })
      return
    }

    setIsGeneratingReport(true)

    try {
      // Use existing session data - no need to re-enter information
      setShowComprehensiveReport(true)
      setActiveTab("comprehensive")

      toast({
        title: "Report Generated Instantly!",
        description: "Your comprehensive numerology report is ready using your saved data.",
      })
    } catch (err) {
      console.error("Report generation error:", err)
      toast({
        title: "Report Generation Failed",
        description: "There was an error generating your report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingReport(false)
    }
  }, [currentSession])

  // Get number meaning
  const getNumberMeaning = useCallback((number: number): string => {
    const meanings: { [key: number]: string } = {
      1: "Leadership, independence, originality, and self-confidence. You are a pioneer and innovator.",
      2: "Cooperation, diplomacy, sensitivity, and harmony. You excel at partnerships and mediation.",
      3: "Creativity, self-expression, joy, and communication. You have natural artistic talents.",
      4: "Stability, practicality, organization, and hard work. You are reliable and methodical.",
      5: "Freedom, adaptability, change, and adventure. You seek variety and new experiences.",
      6: "Responsibility, nurturing, harmony, and service. You are caring and supportive of others.",
      7: "Analysis, wisdom, spirituality, and introspection. You seek deeper meaning and knowledge.",
      8: "Ambition, authority, material success, and power. You have strong leadership abilities.",
      9: "Compassion, humanitarianism, idealism, and completion. You work for the greater good.",
      11: "Intuition, inspiration, spiritual insight, and enlightenment. You are a visionary.",
      22: "Master builder, practical idealism, and large-scale manifestation. You can transform dreams into reality.",
      33: "Selfless service, spiritual teaching, and compassionate guidance. You inspire and uplift others.",
    }
    return meanings[number] || "This number represents a unique combination of energies in your life."
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto bg-black text-white p-6 rounded-lg">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-2">
            <span className="text-purple-500">NUMO</span> Numerology Calculator
          </h2>
          <div className="flex items-center space-x-2">
            {currentSession?.isComplete && (
              <Badge variant="outline" className="text-green-400 border-green-400">
                <Check className="h-3 w-3 mr-1" />
                Session Active
              </Badge>
            )}
            <MembershipBadge type={membershipStatus.type} productType={membershipStatus.purchaseInfo?.productType} />
          </div>
        </div>
        <p className="text-gray-300">
          Discover your numerology profile and gain insights into your life path, destiny, and soul numbers.
        </p>
      </div>

      <Tabs defaultValue="calculator" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="comprehensive">
            Comprehensive Report
            {currentSession?.isComplete && <Sparkles className="h-3 w-3 ml-1" />}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Card className="bg-gray-900/50 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Your Information
                    {userProfile?.lastUsed && hasPrivacyConsent && (
                      <Badge variant="outline" className="ml-auto text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        Last used: {new Date(userProfile.lastUsed).toLocaleDateString()}
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleCalculate}>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Birth Name (as on birth certificate)</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-gray-800 border-gray-700"
                          placeholder="Enter your full birth name"
                          maxLength={100}
                        />
                        {hasPrivacyConsent && name && (
                          <p className="text-xs text-green-400 mt-1">✓ Auto-saved for seamless report generation</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="currentName">Current Name (if different)</Label>
                        <Input
                          id="currentName"
                          value={currentName}
                          onChange={(e) => setCurrentName(e.target.value)}
                          className="bg-gray-800 border-gray-700"
                          placeholder="Enter your current name if different"
                          maxLength={100}
                        />
                      </div>

                      <div>
                        <Label htmlFor="nicknames">Nicknames or Aliases (optional)</Label>
                        <Input
                          id="nicknames"
                          value={nicknames}
                          onChange={(e) => setNicknames(e.target.value)}
                          className="bg-gray-800 border-gray-700"
                          placeholder="Enter any nicknames or aliases"
                          maxLength={200}
                        />
                      </div>

                      <div>
                        <Label htmlFor="birthdate">Date of Birth</Label>
                        <Input
                          id="birthdate"
                          type="date"
                          value={birthdate}
                          onChange={(e) => setBirthdate(e.target.value)}
                          className="bg-gray-800 border-gray-700"
                          min="1900-01-01"
                          max={new Date().toISOString().split("T")[0]}
                        />
                        {hasPrivacyConsent && birthdate && (
                          <p className="text-xs text-green-400 mt-1">✓ Auto-saved for seamless report generation</p>
                        )}
                      </div>

                      {isRestoringData && (
                        <div className="flex items-center space-x-2 text-blue-400 text-sm">
                          <div className="w-4 h-4 border-2 border-t-blue-400 border-blue-200 rounded-full animate-spin"></div>
                          <span>Restoring your saved data...</span>
                        </div>
                      )}

                      {dataRestored && (
                        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                          <p className="text-green-400 text-sm flex items-center">
                            <Check className="h-4 w-4 mr-2" />
                            Welcome back! Your data and calculations are ready. Generate your comprehensive report
                            instantly!
                          </p>
                        </div>
                      )}

                      {error && (
                        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                          <p className="text-red-400 text-sm flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            {error}
                          </p>
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                        disabled={isRestoringData}
                      >
                        <Calculator className="mr-2 h-5 w-5" />
                        {result ? "Recalculate Your Numbers" : "Calculate Your Numbers"}
                      </Button>

                      {currentSession?.isComplete && (
                        <Button
                          type="button"
                          onClick={handleGenerateComprehensiveReport}
                          disabled={isGeneratingReport}
                          className="w-full bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-700 hover:to-purple-600"
                        >
                          <Sparkles className="mr-2 h-5 w-5" />
                          {isGeneratingReport ? "Generating..." : "Generate Comprehensive Report Instantly"}
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              <div className="mt-6 bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                <h3 className="flex items-center text-lg font-medium mb-2">
                  <Info className="mr-2 h-5 w-5 text-purple-400" />
                  Streamlined Experience
                </h3>
                <p className="text-gray-300 text-sm">
                  Your data is automatically saved as you type (with your consent). Once calculated, you can generate
                  comprehensive reports instantly without re-entering information. All data is stored securely in your
                  browser and never shared.
                </p>
              </div>
            </div>

            <div>
              {result ? (
                <Card className="bg-gray-900/50 border-purple-500/30 h-full">
                  <CardHeader className="pb-0">
                    <div className="flex justify-between items-center">
                      <CardTitle>Your Numerology Profile</CardTitle>
                      {currentSession?.isComplete && (
                        <Badge variant="outline" className="text-purple-400 border-purple-400">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Ready for Report
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Tabs defaultValue="lifePath">
                      <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="lifePath">Core Numbers</TabsTrigger>
                        <TabsTrigger value="personality">Personality</TabsTrigger>
                      </TabsList>

                      <TabsContent value="lifePath" className="space-y-4">
                        <div>
                          <h4 className="font-medium text-purple-300 flex items-center">
                            Life Path Number: {result.lifePathNumber}
                          </h4>
                          <p className="text-gray-300 text-sm mt-1">{getNumberMeaning(result.lifePathNumber)}</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-purple-300 flex items-center">
                            Destiny Number: {result.destinyNumber}
                          </h4>
                          <p className="text-gray-300 text-sm mt-1">{getNumberMeaning(result.destinyNumber)}</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-purple-300 flex items-center">
                            Soul Number: {result.soulNumber}
                          </h4>
                          <p className="text-gray-300 text-sm mt-1">{getNumberMeaning(result.soulNumber)}</p>
                        </div>
                      </TabsContent>

                      <TabsContent value="personality" className="space-y-4">
                        <div>
                          <h4 className="font-medium text-purple-300 flex items-center">
                            Personality Number: {result.personalityNumber}
                          </h4>
                          <p className="text-gray-300 text-sm mt-1">{getNumberMeaning(result.personalityNumber)}</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-purple-300 flex items-center">
                            Birthday Number: {result.birthDayNumber}
                          </h4>
                          <p className="text-gray-300 text-sm mt-1">{getNumberMeaning(result.birthDayNumber)}</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-purple-300 flex items-center">
                            Maturity Number: {result.maturityNumber}
                          </h4>
                          <p className="text-gray-300 text-sm mt-1">{getNumberMeaning(result.maturityNumber)}</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ) : (
                <div className="h-full flex items-center justify-center text-center text-gray-400 p-8 border border-dashed border-gray-700 rounded-lg">
                  <div>
                    <Calculator className="h-12 w-12 mx-auto mb-4 text-purple-500/50" />
                    <p>Enter your details and calculate your numerology profile</p>
                    <p className="text-sm mt-2">Your results will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          {result ? (
            <Card className="bg-gray-900/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Numerology Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-300 text-sm mb-4">
                  Explore the major periods, challenges, and pinnacles in your life's numerological journey.
                </p>
                <NumerologyTimeline
                  birthdate={birthdate}
                  challengeNumbers={result.challengeNumbers}
                  pinnacleNumbers={result.pinnacleNumbers}
                />
              </CardContent>
            </Card>
          ) : (
            <div className="text-center text-gray-400 p-8">
              <Clock className="h-12 w-12 mx-auto mb-4 text-purple-500/50" />
              <p>Calculate your numerology profile first to view your timeline</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="comprehensive">
          {showComprehensiveReport && currentSession?.isComplete ? (
            <div className="space-y-6">
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-400 text-sm flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Report generated using your saved data from {new Date(currentSession.timestamp).toLocaleDateString()}.
                  No need to re-enter information!
                </p>
              </div>
              <ComprehensiveNumerologyReport />
            </div>
          ) : (
            <div className="text-center text-gray-400 p-8">
              <FileText className="h-12 w-12 mx-auto mb-4 text-purple-500/50" />
              <p>Calculate your numerology profile first to generate your comprehensive report</p>
              <p className="text-sm mt-2">
                Once calculated, your report will be generated instantly using your saved data
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
