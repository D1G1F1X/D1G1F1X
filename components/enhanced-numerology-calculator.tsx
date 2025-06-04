"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/date-picker"
import {
  calculateLifePath,
  calculateDestinyNumber,
  calculatePersonalityNumber,
  calculateSoulUrgeNumber,
} from "@/lib/numerology"
import { NumerologyChart } from "./numerology-chart"
import { NumerologyReport } from "./numerology-report"
import { NumerologyCompatibility } from "./numerology-compatibility"
import { NumerologyTimeline } from "./numerology-timeline"
import { Download, Share2, Save } from "lucide-react"

export function EnhancedNumerologyCalculator() {
  const [activeTab, setActiveTab] = useState("calculator")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined)
  const [results, setResults] = useState<any>(null)
  const [savedProfiles, setSavedProfiles] = useState<any[]>([])

  const calculateNumbers = () => {
    if (!firstName || !lastName || !birthDate) return

    const lifePathNumber = calculateLifePath(birthDate)
    const destinyNumber = calculateDestinyNumber(firstName + " " + lastName)
    const personalityNumber = calculatePersonalityNumber(firstName + " " + lastName)
    const soulUrgeNumber = calculateSoulUrgeNumber(firstName + " " + lastName)

    const newResults = {
      name: `${firstName} ${lastName}`,
      birthDate,
      lifePathNumber,
      destinyNumber,
      personalityNumber,
      soulUrgeNumber,
      timestamp: new Date(),
    }

    setResults(newResults)
    setActiveTab("results")
  }

  const saveProfile = () => {
    if (results) {
      setSavedProfiles([...savedProfiles, results])
    }
  }

  const exportPDF = () => {
    // PDF export functionality would be implemented here
    console.log("Exporting PDF...")
  }

  const shareResults = () => {
    // Share functionality would be implemented here
    console.log("Sharing results...")
  }

  return (
    <div className="space-y-8">
      <Card className="border-purple-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950">
          <CardTitle className="text-2xl text-center">Numerology Calculator</CardTitle>
          <CardDescription className="text-center">
            Discover the hidden meanings in your name and birthdate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="results" disabled={!results}>
                Results
              </TabsTrigger>
              <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">Birth Date</Label>
                  <DatePicker date={birthDate} setDate={setBirthDate} />
                </div>

                <Button
                  onClick={calculateNumbers}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={!firstName || !lastName || !birthDate}
                >
                  Calculate Numerology Profile
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              {results && (
                <>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold">{results.name}'s Numerology Profile</h3>
                    <p className="text-sm text-muted-foreground">
                      Birth Date: {results.birthDate.toLocaleDateString()}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Life Path Number</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-4xl font-bold text-center text-purple-600">{results.lifePathNumber}</div>
                        <p className="text-sm text-center mt-2">Your life's purpose and journey</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Destiny Number</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-4xl font-bold text-center text-indigo-600">{results.destinyNumber}</div>
                        <p className="text-sm text-center mt-2">Your goals and ultimate direction</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Personality Number</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-4xl font-bold text-center text-blue-600">{results.personalityNumber}</div>
                        <p className="text-sm text-center mt-2">How others perceive you</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Soul Urge Number</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-4xl font-bold text-center text-violet-600">{results.soulUrgeNumber}</div>
                        <p className="text-sm text-center mt-2">Your inner desires and motivations</p>
                      </CardContent>
                    </Card>
                  </div>

                  <NumerologyChart results={results} />
                </>
              )}
            </TabsContent>

            <TabsContent value="compatibility">
              <NumerologyCompatibility savedProfiles={savedProfiles} />
            </TabsContent>

            <TabsContent value="timeline">
              <NumerologyTimeline birthDate={birthDate} />
            </TabsContent>
          </Tabs>
        </CardContent>

        {results && activeTab === "results" && (
          <CardFooter className="flex justify-between border-t p-4">
            <Button variant="outline" onClick={saveProfile}>
              <Save className="mr-2 h-4 w-4" />
              Save Profile
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={shareResults}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" onClick={exportPDF}>
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>

      {results && <NumerologyReport results={results} />}
    </div>
  )
}
