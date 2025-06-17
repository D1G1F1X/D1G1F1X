"use client"

import { Badge } from "@/components/ui/badge"
import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, Info, User, Clock } from "lucide-react"
import { MembershipBadge } from "@/components/membership-badge"
import { type MembershipStatus, hasPremiumAccess } from "@/lib/membership-types"
import { PrivacyNotice } from "@/components/privacy-notice"
import { userDataService, type UserProfile } from "@/lib/services/user-data-service"

interface NumerologyResult {
  lifePathNumber: number
  destinyNumber: number
  soulNumber: number
  personalityNumber: number
  birthDayNumber: number
  expressionNumber: number
  maturityNumber: number
  // Premium features
  compoundNumbers?: Record<string, number>
  compatibility?: Record<string, number | string>
  detailedReport?: string
}

interface NumerologyCalculatorProps {
  membershipStatus?: MembershipStatus
  onVerifyPurchase?: (purchaseId: string) => void
}

export default function NumerologyCalculator({
  membershipStatus = { type: "free", verified: true },
  onVerifyPurchase,
}: NumerologyCalculatorProps) {
  // Use membership status to determine if user has premium access
  const hasPremium = hasPremiumAccess(membershipStatus.type)

  const [name, setName] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [partnerName, setPartnerName] = useState("")
  const [partnerBirthdate, setPartnerBirthdate] = useState("")
  const [result, setResult] = useState<NumerologyResult | null>(null)
  const [error, setError] = useState("")
  const [showPremiumModal, setShowPremiumModal] = useState(false)
  const [showVerificationForm, setShowVerificationForm] = useState(false)
  const [savedReports, setSavedReports] = useState<Array<{ name: string; date: string }>>([])
  const [activeTab, setActiveTab] = useState("lifePath")
  const [hasConsent, setHasConsent] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  // Load user data on component mount
  useEffect(() => {
    const consent = userDataService.hasConsent()
    setHasConsent(consent)

    if (consent) {
      const profile = userDataService.getUserProfile()
      if (profile) {
        setUserProfile(profile)
        setName(profile.fullName || "")
        setBirthdate(profile.birthDate || "")
      }
    }
  }, [])

  // Save user data when form changes
  useEffect(() => {
    if (hasConsent && (name || birthdate)) {
      const profileData: Partial<UserProfile> = {}

      if (name) profileData.fullName = name
      if (birthdate) profileData.birthDate = birthdate

      userDataService.saveUserProfile(profileData)
    }
  }, [name, birthdate, hasConsent])

  const handleConsentChange = useCallback((consent: boolean) => {
    setHasConsent(consent)

    if (consent) {
      // Load existing data if available
      const profile = userDataService.getUserProfile()
      if (profile) {
        setUserProfile(profile)
        setName(profile.fullName || "")
        setBirthdate(profile.birthDate || "")
      }
    } else {
      // Clear form data when consent is withdrawn
      setUserProfile(null)
      setName("")
      setBirthdate("")
      setPartnerName("")
      setPartnerBirthdate("")
    }
  }, [])

  // Convert letters to numbers according to numerology
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

  // Reduce a number to a single digit (except master numbers 11, 22, 33)
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

  // Calculate Life Path Number from birthdate
  const calculateLifePathNumber = (date: string): number => {
    const [year, month, day] = date.split("-").map(Number)
    const dayNum = reduceToSingleDigit(day)
    const monthNum = reduceToSingleDigit(month)
    const yearNum = reduceToSingleDigit(year)
    return reduceToSingleDigit(dayNum + monthNum + yearNum)
  }

  // Calculate Destiny Number from full name
  const calculateDestinyNumber = (fullName: string): number => {
    const nameSum = fullName
      .toLowerCase()
      .replace(/[^a-z]/g, "")
      .split("")
      .reduce((sum, letter) => sum + letterToNumber(letter), 0)
    return reduceToSingleDigit(nameSum)
  }

  // Calculate Soul Number from vowels in name
  const calculateSoulNumber = (fullName: string): number => {
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

  // Calculate Personality Number from consonants in name
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

  // Calculate Birthday Number
  const calculateBirthDayNumber = (date: string): number => {
    const day = Number.parseInt(date.split("-")[2])
    return reduceToSingleDigit(day)
  }

  // Calculate Expression Number (same as Destiny Number)
  const calculateExpressionNumber = (fullName: string): number => {
    return calculateDestinyNumber(fullName)
  }

  // Calculate Maturity Number
  const calculateMaturityNumber = (lifePathNumber: number, destinyNumber: number): number => {
    return reduceToSingleDigit(lifePathNumber + destinyNumber)
  }

  // Handle form submission
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()

    // Update last used timestamp
    if (hasConsent) {
      userDataService.updateLastUsed()
    }

    // Clear previous errors
    setError("")

    // Validate name
    if (!name.trim()) {
      setError("Please enter your full name")
      return
    }

    // Validate name format - should only contain letters and spaces
    const namePattern = /^[A-Za-z\s]+$/
    if (!namePattern.test(name.trim())) {
      setError("Name should contain only letters and spaces")
      return
    }

    // Validate birthdate
    if (!birthdate) {
      setError("Please enter your birthdate")
      return
    }

    // Validate birthdate format and logic
    try {
      const [year, month, day] = birthdate.split("-").map(Number)

      // Check for valid date range
      const currentDate = new Date()
      const selectedDate = new Date(year, month - 1, day)

      if (selectedDate > currentDate) {
        setError("Birthdate cannot be in the future")
        return
      }

      if (year < 1900) {
        setError("Birth year must be 1900 or later")
        return
      }
    } catch (err) {
      setError("Invalid date format")
      return
    }

    // Clear error since validation passed
    setError("")

    try {
      const lifePathNumber = calculateLifePathNumber(birthdate)
      const destinyNumber = calculateDestinyNumber(name)
      const soulNumber = calculateSoulNumber(name)
      const personalityNumber = calculatePersonalityNumber(name)
      const birthDayNumber = calculateBirthDayNumber(birthdate)
      const expressionNumber = calculateExpressionNumber(name)
      const maturityNumber = calculateMaturityNumber(lifePathNumber, destinyNumber)

      const newResult: NumerologyResult = {
        lifePathNumber,
        destinyNumber,
        soulNumber,
        personalityNumber,
        birthDayNumber,
        expressionNumber,
        maturityNumber,
      }

      setResult(newResult)
    } catch (err) {
      setError("An error occurred during calculation. Please check your inputs.")
    }
  }

  // Get number meaning
  const getNumberMeaning = (number: number): string => {
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
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-black text-white p-6 rounded-lg">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-2">
            <span className="text-purple-500">NUMO</span> Numerology Calculator
          </h2>
          <div className="flex items-center">
            <MembershipBadge type={membershipStatus.type} productType={membershipStatus.purchaseInfo?.productType} />
          </div>
        </div>
        <p className="text-gray-300">
          Discover your numerology profile and gain insights into your life path, destiny, and soul numbers.
        </p>
      </div>

      <PrivacyNotice context="numerology-calculator" onConsentChange={handleConsentChange} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card className="bg-gray-900/50 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <User className="h-5 w-5 mr-2" />
                Your Information
                {userProfile?.lastUsed && hasConsent && (
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
                    <Label htmlFor="name">Full Name (as on birth certificate)</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-800 border-gray-700"
                      placeholder="Enter your full name"
                    />
                    {hasConsent && name && (
                      <p className="text-xs text-green-400 mt-1">✓ Name will be remembered for future calculations</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="birthdate">Date of Birth</Label>
                    <Input
                      id="birthdate"
                      type="date"
                      value={birthdate}
                      onChange={(e) => setBirthdate(e.target.value)}
                      className="bg-gray-800 border-gray-700"
                    />
                    {hasConsent && birthdate && (
                      <p className="text-xs text-green-400 mt-1">
                        ✓ Birth date will be remembered for future calculations
                      </p>
                    )}
                  </div>

                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                  >
                    <Calculator className="mr-2 h-5 w-5" />
                    Calculate Your Numbers
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
            <h3 className="flex items-center text-lg font-medium mb-2">
              <Info className="mr-2 h-5 w-5 text-purple-400" />
              About Numerology
            </h3>
            <p className="text-gray-300 text-sm">
              Numerology is the study of numbers and their energetic influence on our lives. Each number carries a
              unique vibration that can reveal insights about your personality, life path, and potential. By calculating
              your core numbers based on your name and birthdate, you can gain a deeper understanding of your life's
              purpose and challenges.
            </p>
          </div>
        </div>

        <div>
          {result ? (
            <Card className="bg-gray-900/50 border-purple-500/30 h-full">
              <CardHeader className="pb-0">
                <div className="flex justify-between items-center">
                  <CardTitle>Your Numerology Profile</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="lifePath" value={activeTab} onValueChange={setActiveTab}>
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
    </div>
  )
}
