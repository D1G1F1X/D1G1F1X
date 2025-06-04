"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { PrinterIcon, DownloadIcon, ArrowLeftIcon } from "lucide-react"
import { numberMeanings } from "@/data/number-meanings"

interface NumerologyReportProps {
  data: {
    birthName: string
    currentName: string
    nickname: string
    birthDate: Date
    lifePath: number
    expression: number
    soulUrge: number
    personality: number
    currentExpression: number | null
    currentSoulUrge: number | null
    currentPersonality: number | null
    nicknameInfluence: number | null
  }
  onBack: () => void
}

export function NumerologyReport({ data, onBack }: NumerologyReportProps) {
  const [activeTab, setActiveTab] = useState("core")

  const getMeaning = (number: number) => {
    return numberMeanings[number] || "No meaning available"
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // Implementation for downloading as PDF would go here
    alert("Download functionality would be implemented here")
  }

  return (
    <div className="space-y-6 print:p-6">
      <div className="flex items-center justify-between print:hidden">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to Calculator
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <PrinterIcon className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <DownloadIcon className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <Card className="border-purple-300 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-purple-800 dark:text-purple-300">
            Your Numerology Report
          </CardTitle>
          <CardDescription>
            Generated for {data.birthName} on {format(new Date(), "MMMM d, yyyy")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-white/50 dark:bg-black/20 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>
                  <span className="font-medium">Birth Name:</span> {data.birthName}
                </p>
                {data.currentName && (
                  <p>
                    <span className="font-medium">Current Name:</span> {data.currentName}
                  </p>
                )}
                {data.nickname && (
                  <p>
                    <span className="font-medium">Nickname:</span> {data.nickname}
                  </p>
                )}
              </div>
              <div>
                <p>
                  <span className="font-medium">Date of Birth:</span> {format(data.birthDate, "MMMM d, yyyy")}
                </p>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="core">Core Numbers</TabsTrigger>
              <TabsTrigger value="current">Current Name</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="future">Future Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="core" className="space-y-4 mt-4">
              <div className="p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Life Path Number: {data.lifePath}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Your Life Path number represents your life purpose and the path you'll take through life.
                </p>
                <p className="mt-2">{getMeaning(data.lifePath)}</p>
              </div>

              <div className="p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Expression Number: {data.expression}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Your Expression number reveals your natural abilities, talents, and shortcomings.
                </p>
                <p className="mt-2">{getMeaning(data.expression)}</p>
              </div>

              <div className="p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Soul Urge Number: {data.soulUrge}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Your Soul Urge number represents your inner desires, likes, dislikes, and what motivates you.
                </p>
                <p className="mt-2">{getMeaning(data.soulUrge)}</p>
              </div>

              <div className="p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Personality Number: {data.personality}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Your Personality number reveals how others see you and your outer personality.
                </p>
                <p className="mt-2">{getMeaning(data.personality)}</p>
              </div>
            </TabsContent>

            <TabsContent value="current" className="space-y-4 mt-4">
              {data.currentName ? (
                <>
                  <div className="p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Current Name Expression: {data.currentExpression}</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      How your current name influences your abilities and talents.
                    </p>
                    <p className="mt-2">{getMeaning(data.currentExpression!)}</p>
                  </div>

                  <div className="p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Current Name Soul Urge: {data.currentSoulUrge}</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      How your current name influences your inner desires and motivations.
                    </p>
                    <p className="mt-2">{getMeaning(data.currentSoulUrge!)}</p>
                  </div>

                  <div className="p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Current Name Personality: {data.currentPersonality}</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      How your current name influences how others perceive you.
                    </p>
                    <p className="mt-2">{getMeaning(data.currentPersonality!)}</p>
                  </div>

                  {data.nickname && (
                    <div className="p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Nickname Influence: {data.nicknameInfluence}</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        How your nickname influences your everyday interactions.
                      </p>
                      <p className="mt-2">{getMeaning(data.nicknameInfluence!)}</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                  <p>No current name provided. Your birth name is used for all calculations.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="challenges" className="space-y-4 mt-4">
              <div className="p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Life Path Challenges</h3>
                <p>As a Life Path {data.lifePath}, your main challenges include:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {/* These would be dynamically generated based on the life path number */}
                  <li>Challenge 1 specific to Life Path {data.lifePath}</li>
                  <li>Challenge 2 specific to Life Path {data.lifePath}</li>
                  <li>Challenge 3 specific to Life Path {data.lifePath}</li>
                </ul>
              </div>

              <div className="p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Expression Challenges</h3>
                <p>With an Expression number of {data.expression}, you may struggle with:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {/* These would be dynamically generated based on the expression number */}
                  <li>Challenge 1 specific to Expression {data.expression}</li>
                  <li>Challenge 2 specific to Expression {data.expression}</li>
                </ul>
              </div>

              <div className="p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Name-Birth Date Compatibility</h3>
                <p>
                  The compatibility between your Life Path ({data.lifePath}) and Expression ({data.expression}) numbers:
                </p>
                <div className="mt-2">
                  {/* This would be dynamically generated based on the compatibility between numbers */}
                  {Math.abs(data.lifePath - data.expression) <= 1 ? (
                    <p className="text-green-600 dark:text-green-400">
                      Strong compatibility! Your natural talents align well with your life purpose.
                    </p>
                  ) : (
                    <p className="text-amber-600 dark:text-amber-400">
                      Moderate compatibility. You may need to work on aligning your talents with your life purpose.
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="future" className="space-y-4 mt-4">
              <div className="p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Personal Year</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Your Personal Year number indicates the themes and opportunities for the current year.
                </p>
                <p className="mt-2">
                  {/* This would be calculated based on birth date and current date */}
                  Based on your birth date, you are in a Personal Year{" "}
                  {(new Date().getFullYear() + data.lifePath) % 9 || 9}.
                </p>
              </div>

              <div className="p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Life Cycles</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Your life is divided into three cycles, each with its own focus and challenges.
                </p>
                <div className="mt-2 space-y-2">
                  <p>
                    <span className="font-medium">First Cycle (0-27):</span> Focused on establishment and growth
                  </p>
                  <p>
                    <span className="font-medium">Second Cycle (28-55):</span> Focused on productivity and
                    responsibility
                  </p>
                  <p>
                    <span className="font-medium">Third Cycle (56+):</span> Focused on wisdom and fulfillment
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Pinnacles and Challenges</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  These represent major periods of growth and challenge in your life.
                </p>
                <div className="mt-2 space-y-2">
                  {/* These would be calculated based on birth date */}
                  <p>
                    <span className="font-medium">First Pinnacle (0-27):</span> Number{" "}
                    {(data.lifePath + data.birthDate.getMonth() + 1) % 9 || 9}
                  </p>
                  <p>
                    <span className="font-medium">Second Pinnacle (28-36):</span> Number{" "}
                    {(data.expression + data.birthDate.getDate()) % 9 || 9}
                  </p>
                  <p>
                    <span className="font-medium">Third Pinnacle (37-45):</span> Number{" "}
                    {(data.soulUrge + data.personality) % 9 || 9}
                  </p>
                  <p>
                    <span className="font-medium">Fourth Pinnacle (46+):</span> Number{" "}
                    {(data.lifePath + data.expression) % 9 || 9}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center print:hidden">
          <p className="text-sm text-gray-500">
            This report is based on numerological principles and is for entertainment purposes only.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
