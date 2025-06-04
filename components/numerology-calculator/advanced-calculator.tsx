"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnhancedDatePicker } from "@/components/ui/enhanced-date-picker"
import { NumerologyReport } from "./numerology-report"
import { calculateLifePath, calculateExpression, calculateSoulUrge, calculatePersonality } from "@/lib/numerology"

export function AdvancedCalculator() {
  const [birthName, setBirthName] = useState("")
  const [currentName, setCurrentName] = useState("")
  const [nickname, setNickname] = useState("")
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined)
  const [showReport, setShowReport] = useState(false)
  const [reportData, setReportData] = useState<any>(null)

  const handleCalculate = () => {
    if (!birthName || !birthDate) {
      alert("Please enter your birth name and date of birth")
      return
    }

    // Calculate core numbers
    const lifePath = calculateLifePath(birthDate)
    const expression = calculateExpression(birthName)
    const soulUrge = calculateSoulUrge(birthName)
    const personality = calculatePersonality(birthName)

    // Calculate additional numbers if current name is different
    const currentExpression = currentName ? calculateExpression(currentName) : null
    const currentSoulUrge = currentName ? calculateSoulUrge(currentName) : null
    const currentPersonality = currentName ? calculatePersonality(currentName) : null

    // Calculate nickname influence if provided
    const nicknameInfluence = nickname ? calculateExpression(nickname) : null

    setReportData({
      birthName,
      currentName,
      nickname,
      birthDate,
      lifePath,
      expression,
      soulUrge,
      personality,
      currentExpression,
      currentSoulUrge,
      currentPersonality,
      nicknameInfluence,
    })

    setShowReport(true)
  }

  const resetForm = () => {
    setBirthName("")
    setCurrentName("")
    setNickname("")
    setBirthDate(undefined)
    setShowReport(false)
    setReportData(null)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="report" disabled={!showReport}>
            Report
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <Card className="border-purple-300 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-purple-800 dark:text-purple-300">
                Comprehensive Numerology Report Generator
              </CardTitle>
              <CardDescription>
                Discover the hidden patterns in your name and birthdate with our detailed numerology analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="birthName" className="block text-sm font-medium">
                  Full Birth Name (as on birth certificate)
                </label>
                <Input
                  id="birthName"
                  value={birthName}
                  onChange={(e) => setBirthName(e.target.value)}
                  placeholder="Enter your full birth name"
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="currentName" className="block text-sm font-medium">
                  Current Name (if different from birth name)
                </label>
                <Input
                  id="currentName"
                  value={currentName}
                  onChange={(e) => setCurrentName(e.target.value)}
                  placeholder="Enter your current name if different"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="nickname" className="block text-sm font-medium">
                  Nickname or Preferred Name
                </label>
                <Input
                  id="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Enter any nickname you commonly use"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="birthDate" className="block text-sm font-medium">
                  Date of Birth
                </label>
                <EnhancedDatePicker
                  date={birthDate}
                  setDate={setBirthDate}
                  placeholder="Select your birth date"
                  showQuickDates={true}
                  quickDateRanges={[
                    { label: "Today", date: new Date() },
                    { label: "Yesterday", date: new Date(new Date().setDate(new Date().getDate() - 1)) },
                    { label: "Last Week", date: new Date(new Date().setDate(new Date().getDate() - 7)) },
                    { label: "Last Month", date: new Date(new Date().setMonth(new Date().getMonth() - 1)) },
                  ]}
                  className="w-full"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetForm}>
                Reset
              </Button>
              <Button onClick={handleCalculate} className="bg-purple-600 hover:bg-purple-700">
                Generate Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="report">
          {reportData && <NumerologyReport data={reportData} onBack={() => setShowReport(false)} />}
        </TabsContent>
      </Tabs>
    </div>
  )
}
