"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, Info, Save, Lock, Star, Users, FileText, Sparkles, CreditCard } from "lucide-react"
import { MembershipBadge } from "@/components/membership-badge"
import { MembershipVerification } from "@/components/membership-verification"
import { type MembershipStatus, hasPremiumAccess } from "@/lib/membership-types"

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

  // Premium: Calculate Compound Numbers
  const calculateCompoundNumbers = (fullName: string, date: string): Record<string, number> => {
    // This would be more complex in a real implementation
    const nameFirstLetter = fullName.charAt(0).toLowerCase()
    const nameLastLetter = fullName.charAt(fullName.length - 1).toLowerCase()
    const birthYear = Number.parseInt(date.split("-")[0])

    return {
      karmic: reduceToSingleDigit(letterToNumber(nameFirstLetter) + letterToNumber(nameLastLetter)),
      cosmic: reduceToSingleDigit(birthYear),
      challenge: reduceToSingleDigit(calculateLifePathNumber(date) + calculateBirthDayNumber(date)),
      balance: reduceToSingleDigit(calculateDestinyNumber(fullName) + calculateSoulNumber(fullName)),
      hidden: reduceToSingleDigit(calculatePersonalityNumber(fullName) * 2),
    }
  }

  // Premium: Calculate Compatibility
  const calculateCompatibility = (
    name1: string,
    date1: string,
    name2: string,
    date2: string,
  ): Record<string, number | string> => {
    if (!name2 || !date2) return {}

    const life1 = calculateLifePathNumber(date1)
    const life2 = calculateLifePathNumber(date2)
    const destiny1 = calculateDestinyNumber(name1)
    const destiny2 = calculateDestinyNumber(name2)

    const lifePathCompatibility = 10 - Math.abs(life1 - life2)
    const destinyCompatibility = 10 - Math.abs(destiny1 - destiny2)
    const overallScore = Math.round((lifePathCompatibility + destinyCompatibility) * 5)

    let compatibilityText = "Unknown"
    if (overallScore >= 90) compatibilityText = "Exceptional Match"
    else if (overallScore >= 80) compatibilityText = "Highly Compatible"
    else if (overallScore >= 70) compatibilityText = "Very Good Match"
    else if (overallScore >= 60) compatibilityText = "Good Potential"
    else if (overallScore >= 50) compatibilityText = "Average Compatibility"
    else compatibilityText = "Challenging Match"

    return {
      lifePathCompatibility,
      destinyCompatibility,
      overallScore,
      compatibilityText,
    }
  }

  // Premium: Generate Detailed Report
  const generateDetailedReport = (result: NumerologyResult): string => {
    return `
      ## Comprehensive Numerology Profile for ${name}

      ### Core Numbers Analysis
      Your Life Path Number ${result.lifePathNumber} indicates your life's purpose and the path you'll take.
      Your Destiny Number ${result.destinyNumber} reveals your goals and ultimate achievements.
      Your Soul Number ${result.soulNumber} represents your inner desires and what fulfills you spiritually.
      
      ### Personality Insights
      With a Personality Number of ${result.personalityNumber}, you present yourself to others as someone who is ${getNumberMeaning(result.personalityNumber).split(".")[0].toLowerCase()}.
      Your Birthday Number ${result.birthDayNumber} reveals special talents you possess.
      
      ### Life Cycles and Challenges
      Your Maturity Number ${result.maturityNumber} indicates what you'll evolve into as you grow and mature.
      
      ### Recommendations
      Based on your numerological profile, focus on developing your ${result.lifePathNumber === result.destinyNumber ? "natural alignment between purpose and goals" : "balance between your life path and destiny"}.
    `
  }

  // Handle form submission
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()

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

    // Validate partner data if provided
    if ((partnerName && !partnerBirthdate) || (!partnerName && partnerBirthdate)) {
      setError("Please provide both partner name and birthdate, or neither")
      return
    }

    if (partnerName && !/^[A-Za-z\s]+$/.test(partnerName.trim())) {
      setError("Partner name should contain only letters and spaces")
      return
    }

    if (partnerBirthdate) {
      try {
        const [pYear, pMonth, pDay] = partnerBirthdate.split("-").map(Number)

        const currentDate = new Date()
        const selectedDate = new Date(pYear, pMonth - 1, pDay)

        if (selectedDate > currentDate) {
          setError("Partner birthdate cannot be in the future")
          return
        }

        if (pYear < 1900) {
          setError("Partner birth year must be 1900 or later")
          return
        }
      } catch (err) {
        setError("Invalid partner date format")
        return
      }
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

      // Add premium features if user has premium access
      if (hasPremium) {
        newResult.compoundNumbers = calculateCompoundNumbers(name, birthdate)
        if (partnerName && partnerBirthdate) {
          newResult.compatibility = calculateCompatibility(name, birthdate, partnerName, partnerBirthdate)
        }
        newResult.detailedReport = generateDetailedReport(newResult)
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

  const handleSaveReport = () => {
    if (!hasPremium) {
      setShowPremiumModal(true)
      return
    }

    if (result) {
      const newReport = {
        name: name,
        date: new Date().toLocaleDateString(),
      }
      setSavedReports([...savedReports, newReport])
    }
  }

  const handlePremiumFeatureClick = () => {
    if (!hasPremium) {
      setShowPremiumModal(true)
    }
  }

  const handleVerificationComplete = (success: boolean, purchaseId: string) => {
    if (success && onVerifyPurchase) {
      onVerifyPurchase(purchaseId)
    }
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card className="bg-gray-900/50 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-lg">Your Information</CardTitle>
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
                  </div>

                  {hasPremium && (
                    <div className="pt-4 border-t border-gray-700">
                      <div className="flex items-center mb-2">
                        <h3 className="text-sm font-medium flex items-center">
                          <Users className="h-4 w-4 mr-1 text-purple-400" />
                          Compatibility Analysis
                        </h3>
                        <Badge className="ml-2 bg-purple-600 text-xs">Premium</Badge>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="partnerName">Partner's Full Name</Label>
                          <Input
                            id="partnerName"
                            value={partnerName}
                            onChange={(e) => setPartnerName(e.target.value)}
                            className="bg-gray-800 border-gray-700"
                            placeholder="Enter partner's full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="partnerBirthdate">Partner's Date of Birth</Label>
                          <Input
                            id="partnerBirthdate"
                            type="date"
                            value={partnerBirthdate}
                            onChange={(e) => setPartnerBirthdate(e.target.value)}
                            className="bg-gray-800 border-gray-700"
                          />
                        </div>
                      </div>
                    </div>
                  )}

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

          {hasPremium && savedReports.length > 0 && (
            <div className="mt-6 bg-gray-900/50 p-4 rounded-lg border border-purple-500/30">
              <h3 className="flex items-center text-lg font-medium mb-2">
                <Save className="mr-2 h-5 w-5 text-purple-400" />
                Saved Reports
              </h3>
              <ul className="divide-y divide-gray-700">
                {savedReports.map((report, index) => (
                  <li key={index} className="py-2 flex justify-between">
                    <span>{report.name}</span>
                    <span className="text-gray-400 text-sm">{report.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Verification form for users who have purchased the app or card */}
          {!hasPremium && showVerificationForm && (
            <div className="mt-6">
              <h3 className="flex items-center text-lg font-medium mb-2">
                <CreditCard className="mr-2 h-5 w-5 text-emerald-400" />
                Verify Your Purchase
              </h3>
              <MembershipVerification onVerificationComplete={handleVerificationComplete} />
            </div>
          )}
        </div>

        <div>
          {result ? (
            <Card className="bg-gray-900/50 border-purple-500/30 h-full">
              <CardHeader className="pb-0">
                <div className="flex justify-between items-center">
                  <CardTitle>Your Numerology Profile</CardTitle>
                  {hasPremium && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs border-purple-500 text-purple-400 hover:bg-purple-900/30"
                      onClick={handleSaveReport}
                    >
                      <Save className="h-3 w-3 mr-1" /> Save Report
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="lifePath" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4 mb-4">
                    <TabsTrigger value="lifePath">Core</TabsTrigger>
                    <TabsTrigger value="personality">Personality</TabsTrigger>
                    {hasPremium ? (
                      <>
                        <TabsTrigger value="advanced">Advanced</TabsTrigger>
                        <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
                      </>
                    ) : (
                      <>
                        <TabsTrigger value="advanced" disabled onClick={handlePremiumFeatureClick} className="relative">
                          <Lock className="h-3 w-3 mr-1" />
                          Advanced
                        </TabsTrigger>
                        <TabsTrigger
                          value="compatibility"
                          disabled
                          onClick={handlePremiumFeatureClick}
                          className="relative"
                        >
                          <Lock className="h-3 w-3 mr-1" />
                          Compatibility
                        </TabsTrigger>
                      </>
                    )}
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

                  <TabsContent value="advanced" className="space-y-4">
                    {hasPremium ? (
                      <>
                        <div>
                          <h4 className="font-medium text-purple-300 flex items-center">
                            Expression Number: {result.expressionNumber}
                          </h4>
                          <p className="text-gray-300 text-sm mt-1">{getNumberMeaning(result.expressionNumber)}</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-purple-300 flex items-center">
                            Maturity Number: {result.maturityNumber}
                          </h4>
                          <p className="text-gray-300 text-sm mt-1">{getNumberMeaning(result.maturityNumber)}</p>
                        </div>

                        {result.compoundNumbers && (
                          <div className="pt-3 border-t border-gray-700">
                            <h4 className="font-medium text-purple-300 mb-2">Compound Numbers</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {Object.entries(result.compoundNumbers).map(([key, value]) => (
                                <div key={key} className="bg-gray-800/50 p-2 rounded">
                                  <div className="text-xs text-gray-400 capitalize">{key}</div>
                                  <div className="text-lg font-semibold">{value}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <Lock className="h-12 w-12 text-gray-500 mb-3" />
                        <h3 className="text-lg font-medium mb-2">Premium Feature</h3>
                        <p className="text-gray-400 mb-4 max-w-xs">
                          Unlock advanced numerology insights including compound numbers and detailed interpretations.
                        </p>
                        <div className="space-y-3">
                          <Button
                            className="bg-gradient-to-r from-purple-600 to-blue-500"
                            onClick={() => setShowPremiumModal(true)}
                          >
                            <Star className="mr-2 h-4 w-4" /> Upgrade to Premium
                          </Button>

                          <div className="flex items-center justify-center text-sm text-gray-400">
                            <span className="mr-1">or</span>
                            <Button
                              variant="link"
                              className="text-emerald-400 p-0 h-auto"
                              onClick={() => setShowVerificationForm(true)}
                            >
                              Verify App/Card Purchase
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="compatibility" className="space-y-4">
                    {hasPremium ? (
                      result.compatibility ? (
                        <div>
                          <div className="mb-4">
                            <h4 className="font-medium text-purple-300 mb-2">Compatibility Analysis</h4>
                            <div className="flex justify-center mb-4">
                              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center">
                                <div className="w-28 h-28 rounded-full bg-gray-900 flex flex-col items-center justify-center">
                                  <div className="text-3xl font-bold">{result.compatibility.overallScore}%</div>
                                  <div className="text-xs text-gray-300">Compatibility</div>
                                </div>
                              </div>
                            </div>
                            <div className="text-center mb-4">
                              <Badge className="bg-purple-600">{result.compatibility.compatibilityText}</Badge>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <div className="text-sm text-gray-400 mb-1">Life Path Compatibility</div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                                  style={{ width: `${(result.compatibility.lifePathCompatibility as number) * 10}%` }}
                                ></div>
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-400 mb-1">Destiny Compatibility</div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                                  style={{ width: `${(result.compatibility.destinyCompatibility as number) * 10}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
                            <p className="text-sm text-gray-300">
                              Your numerological compatibility indicates{" "}
                              {result.compatibility.compatibilityText.toString().toLowerCase()}. This suggests that your
                              relationship has{" "}
                              {result.compatibility.overallScore >= 70
                                ? "strong potential"
                                : result.compatibility.overallScore >= 50
                                  ? "moderate potential"
                                  : "some challenges"}{" "}
                              based on your core numbers.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Users className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                          <h3 className="text-lg font-medium mb-2">No Compatibility Data</h3>
                          <p className="text-gray-400 mb-4">
                            Enter your partner's information to see your compatibility analysis.
                          </p>
                        </div>
                      )
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <Lock className="h-12 w-12 text-gray-500 mb-3" />
                        <h3 className="text-lg font-medium mb-2">Premium Feature</h3>
                        <p className="text-gray-400 mb-4 max-w-xs">
                          Unlock relationship compatibility analysis to see how your numbers align with your partner's.
                        </p>
                        <div className="space-y-3">
                          <Button
                            className="bg-gradient-to-r from-purple-600 to-blue-500"
                            onClick={() => setShowPremiumModal(true)}
                          >
                            <Star className="mr-2 h-4 w-4" /> Upgrade to Premium
                          </Button>

                          <div className="flex items-center justify-center text-sm text-gray-400">
                            <span className="mr-1">or</span>
                            <Button
                              variant="link"
                              className="text-emerald-400 p-0 h-auto"
                              onClick={() => setShowVerificationForm(true)}
                            >
                              Verify App/Card Purchase
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>

              {hasPremium && result.detailedReport && (
                <CardFooter className="pt-0 px-6 pb-6">
                  <div className="w-full">
                    <Button
                      variant="outline"
                      className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-900/30"
                    >
                      <FileText className="h-4 w-4 mr-2" /> Download Detailed Report
                    </Button>
                  </div>
                </CardFooter>
              )}
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

      {/* Premium Features Highlight */}
      {!hasPremium && (
        <div className="mt-8 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-6 border border-purple-500/30">
          <div className="flex items-center mb-4">
            <Sparkles className="h-5 w-5 text-purple-400 mr-2" />
            <h3 className="text-lg font-medium">Access Premium Features</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <FileText className="h-8 w-8 text-purple-500 mb-2" />
              <h4 className="font-medium mb-1">Detailed Reports</h4>
              <p className="text-sm text-gray-400">
                Comprehensive analysis of your numerological profile with personalized insights.
              </p>
            </div>

            <div className="bg-gray-900/50 p-4 rounded-lg">
              <Users className="h-8 w-8 text-purple-500 mb-2" />
              <h4 className="font-medium mb-1">Compatibility Analysis</h4>
              <p className="text-sm text-gray-400">
                Discover how your numbers align with your partner, friends, or colleagues.
              </p>
            </div>

            <div className="bg-gray-900/50 p-4 rounded-lg">
              <Save className="h-8 w-8 text-purple-500 mb-2" />
              <h4 className="font-medium mb-1">Save & Export</h4>
              <p className="text-sm text-gray-400">
                Save your reports for future reference and export them as PDF documents.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
              onClick={() => setShowPremiumModal(true)}
            >
              <Star className="mr-2 h-4 w-4" /> Upgrade to Premium
            </Button>

            <div className="flex items-center">
              <div className="h-px w-8 bg-gray-700 hidden md:block"></div>
              <span className="mx-3 text-gray-400">or</span>
              <div className="h-px w-8 bg-gray-700 hidden md:block"></div>
            </div>

            <Button variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/30">
              <CreditCard className="mr-2 h-4 w-4" /> Already Purchased?
            </Button>
          </div>
        </div>
      )}

      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-md w-full p-6 border border-purple-500/30">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Unlock Premium Features</h3>
              <p className="text-gray-300">Enhance your numerology experience with our premium membership</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-purple-400 mr-2">✓</div>
                <p className="text-gray-300">Detailed numerology reports with in-depth analysis</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-purple-400 mr-2">✓</div>
                <p className="text-gray-300">Relationship compatibility analysis</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-purple-400 mr-2">✓</div>
                <p className="text-gray-300">Save and export your reports</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-purple-400 mr-2">✓</div>
                <p className="text-gray-300">Compound number analysis and interpretations</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
                Join Premium Membership
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-900 px-2 text-gray-400">Or</span>
                </div>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="font-medium text-emerald-400 flex items-center mb-2">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Already have the NUMO Oracle App or Card Deck?
                </h4>
                <p className="text-sm text-gray-300 mb-3">
                  If you've purchased our app or card deck, you already have access to premium features!
                </p>
                <Button
                  variant="outline"
                  className="w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/30"
                  onClick={() => {
                    setShowPremiumModal(false)
                    setShowVerificationForm(true)
                  }}
                >
                  Verify Your Purchase
                </Button>
              </div>

              <Button
                variant="outline"
                className="w-full border-gray-700 text-gray-400 hover:bg-gray-800"
                onClick={() => setShowPremiumModal(false)}
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
