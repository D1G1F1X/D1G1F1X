"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Calendar, Hash, Heart, Brain, Sparkles, Star, Compass, BarChart, Users } from "lucide-react"
import type { NumerologyProfile, ReportSettings } from "./numerology-report-generator"
import { NumerologyChart } from "./numerology-chart"
import { NumerologyTimeline } from "./numerology-timeline"

interface PrintableReportProps {
  profile: NumerologyProfile
  settings: ReportSettings
}

export function PrintableReport({ profile, settings }: PrintableReportProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Format date for display
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Get number meaning based on the number
  const getNumberMeaning = (number: number): string => {
    const meanings: Record<number, string> = {
      1: "Leadership, independence, individuality, and self-confidence. You are a natural leader with strong determination and ambition.",
      2: "Cooperation, diplomacy, sensitivity, and harmony. You excel in partnerships and have a natural ability to mediate conflicts.",
      3: "Creativity, self-expression, joy, and communication. You have natural artistic talents and a gift for inspiring others.",
      4: "Stability, practicality, organization, and hard work. You are reliable, methodical, and have a strong foundation for success.",
      5: "Freedom, adaptability, change, and adventure. You seek variety and new experiences, with a natural versatility.",
      6: "Responsibility, nurturing, harmony, and service. You are caring and supportive of others, with a strong sense of duty.",
      7: "Analysis, wisdom, spirituality, and introspection. You seek deeper meaning and knowledge, with strong intuitive abilities.",
      8: "Ambition, authority, material success, and power. You have strong leadership abilities and a talent for achievement.",
      9: "Compassion, humanitarianism, idealism, and completion. You work for the greater good with a universal perspective.",
      11: "Intuition, inspiration, spiritual insight, and enlightenment. You are a visionary with heightened sensitivity.",
      22: "Master builder, practical idealism, and large-scale manifestation. You can transform dreams into reality.",
      33: "Selfless service, spiritual teaching, and compassionate guidance. You inspire and uplift others.",
    }

    return meanings[number] || "This number represents a unique combination of energies in your life."
  }

  // Get expanded meaning for comprehensive reports
  const getExpandedMeaning = (number: number, type: string): string => {
    // This would contain more detailed interpretations in a real implementation
    return `Your ${type} number ${number} indicates ${getNumberMeaning(number)} 
    
    In your daily life, this manifests as a tendency to ${
      number === 1
        ? "take charge and initiate projects"
        : number === 2
          ? "seek harmony and work well with others"
          : number === 3
            ? "express yourself creatively and communicate effectively"
            : number === 4
              ? "create structure and work methodically"
              : number === 5
                ? "seek freedom and adapt quickly to change"
                : number === 6
                  ? "take responsibility and care for others"
                  : number === 7
                    ? "analyze deeply and seek spiritual understanding"
                    : number === 8
                      ? "pursue ambitious goals and take leadership roles"
                      : number === 9
                        ? "serve humanitarian causes and see the big picture"
                        : number === 11
                          ? "inspire others and access intuitive insights"
                          : number === 22
                            ? "build significant structures and manifest large visions"
                            : "serve humanity with compassion and spiritual wisdom"
    }.
    
    This energy influences your approach to challenges, relationships, and personal growth throughout your life journey.`
  }

  // Get personal insights based on number combinations
  const getPersonalInsights = (): string => {
    const { lifePathNumber, destinyNumber, personalityNumber, soulUrgeNumber } = profile

    let insights = ""

    // Life Path and Destiny alignment
    if (lifePathNumber === destinyNumber) {
      insights +=
        "Your Life Path and Destiny numbers are aligned, indicating a strong sense of purpose and direction in life. Your natural tendencies support your life goals.\n\n"
    } else if (Math.abs(lifePathNumber - destinyNumber) <= 1) {
      insights +=
        "Your Life Path and Destiny numbers are complementary, suggesting that your natural tendencies generally support your life goals with minor adjustments.\n\n"
    } else {
      insights +=
        "There is a significant difference between your Life Path and Destiny numbers, which may create tension between your natural tendencies and your life goals. This can be a source of growth and development.\n\n"
    }

    // Soul Urge and Personality alignment
    if (soulUrgeNumber === personalityNumber) {
      insights +=
        "Your inner desires (Soul Urge) align with how you present yourself (Personality), indicating authenticity and congruence in your self-expression.\n\n"
    } else {
      insights +=
        "There is a difference between your inner desires (Soul Urge) and how you present yourself (Personality), which may create a sense of internal conflict or complexity in your self-expression.\n\n"
    }

    return insights
  }

  // Get future projections based on life path
  const getFutureProjections = (): string => {
    const { lifePathNumber, birthDate } = profile
    const currentYear = new Date().getFullYear()
    const birthYear = birthDate.getFullYear()
    const age = currentYear - birthYear

    let projections = ""

    if (age < 28) {
      projections += "You are in your first life cycle, focused on establishing your identity and foundation. "
    } else if (age < 56) {
      projections += "You are in your second life cycle, focused on productivity and building your life's work. "
    } else {
      projections += "You are in your third life cycle, focused on wisdom, reflection, and sharing your experience. "
    }

    projections += `With a Life Path number of ${lifePathNumber}, your journey involves ${
      lifePathNumber === 1
        ? "developing leadership and independence"
        : lifePathNumber === 2
          ? "mastering cooperation and sensitivity"
          : lifePathNumber === 3
            ? "expressing creativity and joy"
            : lifePathNumber === 4
              ? "building stability and order"
              : lifePathNumber === 5
                ? "embracing freedom and change"
                : lifePathNumber === 6
                  ? "nurturing responsibility and service"
                  : lifePathNumber === 7
                    ? "seeking wisdom and spiritual depth"
                    : lifePathNumber === 8
                      ? "developing material success and authority"
                      : lifePathNumber === 9
                        ? "embodying compassion and completion"
                        : lifePathNumber === 11
                          ? "channeling intuition and inspiration"
                          : lifePathNumber === 22
                            ? "manifesting large-scale visions"
                            : "serving humanity with spiritual wisdom"
    }.\n\n`

    // Personal Year calculation (simplified)
    const personalYear = currentYear % 9 || 9

    projections += `Your Personal Year number for ${currentYear} is ${personalYear}, suggesting a focus on ${
      personalYear === 1
        ? "new beginnings and initiatives"
        : personalYear === 2
          ? "patience, cooperation, and partnerships"
          : personalYear === 3
            ? "creativity, expression, and social connections"
            : personalYear === 4
              ? "building foundations and practical matters"
              : personalYear === 5
                ? "change, freedom, and adventure"
                : personalYear === 6
                  ? "responsibility, family, and service"
                  : personalYear === 7
                    ? "reflection, analysis, and spiritual growth"
                    : personalYear === 8
                      ? "abundance, power, and achievement"
                      : "completion, letting go, and preparation for a new cycle"
    }.`

    return projections
  }

  // Determine font size class based on settings
  const fontSizeClass =
    settings.fontSize === "small" ? "text-sm" : settings.fontSize === "large" ? "text-lg" : "text-base"

  // Determine theme class based on settings
  const themeClass =
    settings.theme === "classic"
      ? "bg-white text-black"
      : settings.theme === "mystical"
        ? "bg-indigo-50 text-indigo-900"
        : "bg-gray-50 text-gray-900"

  return (
    <div className={`numerology-report ${themeClass} ${fontSizeClass} print:text-black print:bg-white`}>
      {/* Report Header */}
      <div className="text-center mb-8 print:mb-6">
        <h1 className="text-3xl font-bold mb-2 print:text-4xl">Numerology Profile Report</h1>
        <div className="flex items-center justify-center mb-2">
          <User className="h-4 w-4 mr-2" />
          <span className="font-medium">{profile.name}</span>
        </div>
        <div className="flex items-center justify-center">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Born on {formatDate(profile.birthDate)}</span>
        </div>
        <div className="text-sm text-gray-500 mt-2 print:text-gray-700">
          Report generated on {formatDate(new Date())}
        </div>
      </div>

      {/* Core Numbers Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 print:grid-cols-4">
        <Card className="border-purple-200 print:border-gray-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Hash className="h-4 w-4 mr-2 text-purple-500" />
              Life Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center text-purple-600 print:text-purple-800">
              {profile.lifePathNumber}
            </div>
            <p className="text-sm text-center mt-1">Your life's purpose and journey</p>
          </CardContent>
        </Card>

        <Card className="border-indigo-200 print:border-gray-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Compass className="h-4 w-4 mr-2 text-indigo-500" />
              Destiny
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center text-indigo-600 print:text-indigo-800">
              {profile.destinyNumber}
            </div>
            <p className="text-sm text-center mt-1">Your goals and direction</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 print:border-gray-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Brain className="h-4 w-4 mr-2 text-blue-500" />
              Personality
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center text-blue-600 print:text-blue-800">
              {profile.personalityNumber}
            </div>
            <p className="text-sm text-center mt-1">How others see you</p>
          </CardContent>
        </Card>

        <Card className="border-violet-200 print:border-gray-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Heart className="h-4 w-4 mr-2 text-violet-500" />
              Soul Urge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center text-violet-600 print:text-violet-800">
              {profile.soulUrgeNumber}
            </div>
            <p className="text-sm text-center mt-1">Your inner desires</p>
          </CardContent>
        </Card>
      </div>

      {/* Premium Numbers (if available) */}
      {settings.detailLevel >= 2 && profile.expressionNumber && profile.maturityNumber && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 print:grid-cols-4">
          <Card className="border-emerald-200 print:border-gray-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-emerald-500" />
                Expression
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-center text-emerald-600 print:text-emerald-800">
                {profile.expressionNumber}
              </div>
              <p className="text-sm text-center mt-1">Your talents and abilities</p>
            </CardContent>
          </Card>

          <Card className="border-amber-200 print:border-gray-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Star className="h-4 w-4 mr-2 text-amber-500" />
                Maturity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-center text-amber-600 print:text-amber-800">
                {profile.maturityNumber}
              </div>
              <p className="text-sm text-center mt-1">Your later life development</p>
            </CardContent>
          </Card>

          {profile.birthdayNumber && profile.balanceNumber && (
            <>
              <Card className="border-rose-200 print:border-gray-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-rose-500" />
                    Birthday
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-center text-rose-600 print:text-rose-800">
                    {profile.birthdayNumber}
                  </div>
                  <p className="text-sm text-center mt-1">Your special talents</p>
                </CardContent>
              </Card>

              <Card className="border-teal-200 print:border-gray-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <BarChart className="h-4 w-4 mr-2 text-teal-500" />
                    Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-center text-teal-600 print:text-teal-800">
                    {profile.balanceNumber}
                  </div>
                  <p className="text-sm text-center mt-1">Your stability factor</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      )}

      {/* Detailed Report Content */}
      <div className="print:hidden">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed</TabsTrigger>
            {settings.includePersonalInsights && <TabsTrigger value="insights">Insights</TabsTrigger>}
            {settings.includeFutureProjections && <TabsTrigger value="future">Future</TabsTrigger>}
            {settings.includeCompatibilityInfo && <TabsTrigger value="compatibility">Compatibility</TabsTrigger>}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Life Path Number: {profile.lifePathNumber}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{getNumberMeaning(profile.lifePathNumber)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Destiny Number: {profile.destinyNumber}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{getNumberMeaning(profile.destinyNumber)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personality Number: {profile.personalityNumber}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{getNumberMeaning(profile.personalityNumber)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Soul Urge Number: {profile.soulUrgeNumber}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{getNumberMeaning(profile.soulUrgeNumber)}</p>
              </CardContent>
            </Card>

            {settings.includeCharts && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Numerology Chart</h3>
                <NumerologyChart profile={profile} />
              </div>
            )}
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6">
            {settings.detailLevel >= 2 ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Life Path Number: {profile.lifePathNumber}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line">{getExpandedMeaning(profile.lifePathNumber, "Life Path")}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Destiny Number: {profile.destinyNumber}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line">{getExpandedMeaning(profile.destinyNumber, "Destiny")}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Personality Number: {profile.personalityNumber}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line">
                      {getExpandedMeaning(profile.personalityNumber, "Personality")}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Soul Urge Number: {profile.soulUrgeNumber}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line">{getExpandedMeaning(profile.soulUrgeNumber, "Soul Urge")}</p>
                  </CardContent>
                </Card>

                {profile.expressionNumber && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Expression Number: {profile.expressionNumber}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-line">
                        {getExpandedMeaning(profile.expressionNumber, "Expression")}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {profile.maturityNumber && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Maturity Number: {profile.maturityNumber}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-line">{getExpandedMeaning(profile.maturityNumber, "Maturity")}</p>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <Badge variant="outline" className="mb-4 bg-amber-100 text-amber-800 border-amber-300">
                  Premium Feature
                </Badge>
                <h3 className="text-lg font-medium mb-2">Detailed Interpretations</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Upgrade to access comprehensive interpretations of your numerology numbers.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            {settings.includePersonalInsights ? (
              <Card>
                <CardHeader>
                  <CardTitle>Personal Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line">{getPersonalInsights()}</p>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Number Interactions</h3>
                    <p>
                      Your Life Path ({profile.lifePathNumber}) and Destiny ({profile.destinyNumber}) numbers
                      {profile.lifePathNumber === profile.destinyNumber
                        ? " are identical, creating a powerful alignment between your natural tendencies and life goals."
                        : Math.abs(profile.lifePathNumber - profile.destinyNumber) <= 1
                          ? " are complementary, suggesting a harmonious flow between your natural tendencies and life goals."
                          : " create an interesting dynamic that may require integration of different energies."}
                    </p>

                    <p className="mt-3">
                      Your Soul Urge ({profile.soulUrgeNumber}) and Personality ({profile.personalityNumber}) numbers
                      {profile.soulUrgeNumber === profile.personalityNumber
                        ? " match perfectly, indicating that your inner desires align with how you present yourself to the world."
                        : " differ, suggesting that your inner desires and outer presentation may create a complex but rich personality."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center py-8">
                <Badge variant="outline" className="mb-4 bg-amber-100 text-amber-800 border-amber-300">
                  Premium Feature
                </Badge>
                <h3 className="text-lg font-medium mb-2">Personal Insights</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Upgrade to access personalized insights based on your unique number combinations.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="future" className="space-y-6">
            {settings.includeFutureProjections ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Future Projections</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line">{getFutureProjections()}</p>
                  </CardContent>
                </Card>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">Life Cycles Timeline</h3>
                  <NumerologyTimeline profile={profile} />
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <Badge variant="outline" className="mb-4 bg-amber-100 text-amber-800 border-amber-300">
                  Premium Feature
                </Badge>
                <h3 className="text-lg font-medium mb-2">Future Projections</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Upgrade to access future projections and life cycle analysis based on your numerology profile.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="compatibility" className="space-y-6">
            {settings.includeCompatibilityInfo ? (
              <Card>
                <CardHeader>
                  <CardTitle>Compatibility Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <Users className="h-12 w-12 text-purple-500 mx-auto mb-2" />
                    <h3 className="text-lg font-medium">Relationship Compatibility</h3>
                    <p className="text-gray-500">
                      Based on your Life Path number {profile.lifePathNumber}, you are most compatible with Life Paths:
                    </p>

                    <div className="flex justify-center gap-2 mt-4">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                        // Simple compatibility logic (would be more complex in real implementation)
                        const isCompatible = num === profile.lifePathNumber || (profile.lifePathNumber + num) % 3 === 0

                        return (
                          <Badge
                            key={num}
                            variant={isCompatible ? "default" : "outline"}
                            className={isCompatible ? "bg-green-100 text-green-800 hover:bg-green-200" : ""}
                          >
                            {num}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Compatibility Notes:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        With Life Path {profile.lifePathNumber}, you bring{" "}
                        {profile.lifePathNumber === 1
                          ? "leadership and initiative"
                          : profile.lifePathNumber === 2
                            ? "harmony and cooperation"
                            : profile.lifePathNumber === 3
                              ? "creativity and expression"
                              : profile.lifePathNumber === 4
                                ? "stability and practicality"
                                : profile.lifePathNumber === 5
                                  ? "freedom and adaptability"
                                  : profile.lifePathNumber === 6
                                    ? "nurturing and responsibility"
                                    : profile.lifePathNumber === 7
                                      ? "wisdom and analysis"
                                      : profile.lifePathNumber === 8
                                        ? "ambition and authority"
                                        : "compassion and idealism"}{" "}
                        to relationships.
                      </li>
                      <li>
                        Your Destiny number {profile.destinyNumber} suggests that your life goals involve{" "}
                        {profile.destinyNumber === 1
                          ? "independence and achievement"
                          : profile.destinyNumber === 2
                            ? "partnership and support"
                            : profile.destinyNumber === 3
                              ? "self-expression and joy"
                              : profile.destinyNumber === 4
                                ? "building and organizing"
                                : profile.destinyNumber === 5
                                  ? "freedom and change"
                                  : profile.destinyNumber === 6
                                    ? "service and responsibility"
                                    : profile.destinyNumber === 7
                                      ? "knowledge and spirituality"
                                      : profile.destinyNumber === 8
                                        ? "success and influence"
                                        : "humanitarian service and completion"}
                        , which affects your relationship needs.
                      </li>
                      <li>
                        Your Soul Urge number {profile.soulUrgeNumber} reveals that you deeply desire{" "}
                        {profile.soulUrgeNumber === 1
                          ? "recognition and independence"
                          : profile.soulUrgeNumber === 2
                            ? "harmony and cooperation"
                            : profile.soulUrgeNumber === 3
                              ? "creative expression and joy"
                              : profile.soulUrgeNumber === 4
                                ? "order and stability"
                                : profile.soulUrgeNumber === 5
                                  ? "freedom and variety"
                                  : profile.soulUrgeNumber === 6
                                    ? "love and nurturing"
                                    : profile.soulUrgeNumber === 7
                                      ? "wisdom and understanding"
                                      : profile.soulUrgeNumber === 8
                                        ? "success and recognition"
                                        : "universal love and service"}{" "}
                        in relationships.
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center py-8">
                <Badge variant="outline" className="mb-4 bg-amber-100 text-amber-800 border-amber-300">
                  Premium Feature
                </Badge>
                <h3 className="text-lg font-medium mb-2">Compatibility Insights</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Upgrade to access relationship compatibility insights based on your numerology profile.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Print Version (only visible when printing) */}
      <div className="hidden print:block space-y-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold border-b pb-2">Core Numbers Interpretation</h2>

          <div>
            <h3 className="text-xl font-semibold">Life Path Number: {profile.lifePathNumber}</h3>
            <p className="mt-2">
              {settings.detailLevel >= 2
                ? getExpandedMeaning(profile.lifePathNumber, "Life Path")
                : getNumberMeaning(profile.lifePathNumber)}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Destiny Number: {profile.destinyNumber}</h3>
            <p className="mt-2">
              {settings.detailLevel >= 2
                ? getExpandedMeaning(profile.destinyNumber, "Destiny")
                : getNumberMeaning(profile.destinyNumber)}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Personality Number: {profile.personalityNumber}</h3>
            <p className="mt-2">
              {settings.detailLevel >= 2
                ? getExpandedMeaning(profile.personalityNumber, "Personality")
                : getNumberMeaning(profile.personalityNumber)}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Soul Urge Number: {profile.soulUrgeNumber}</h3>
            <p className="mt-2">
              {settings.detailLevel >= 2
                ? getExpandedMeaning(profile.soulUrgeNumber, "Soul Urge")
                : getNumberMeaning(profile.soulUrgeNumber)}
            </p>
          </div>
        </div>

        {settings.detailLevel >= 2 && profile.expressionNumber && profile.maturityNumber && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold border-b pb-2">Additional Numbers</h2>

            <div>
              <h3 className="text-xl font-semibold">Expression Number: {profile.expressionNumber}</h3>
              <p className="mt-2">{getExpandedMeaning(profile.expressionNumber, "Expression")}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Maturity Number: {profile.maturityNumber}</h3>
              <p className="mt-2">{getExpandedMeaning(profile.maturityNumber, "Maturity")}</p>
            </div>

            {profile.birthdayNumber && profile.balanceNumber && (
              <>
                <div>
                  <h3 className="text-xl font-semibold">Birthday Number: {profile.birthdayNumber}</h3>
                  <p className="mt-2">{getExpandedMeaning(profile.birthdayNumber, "Birthday")}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold">Balance Number: {profile.balanceNumber}</h3>
                  <p className="mt-2">{getExpandedMeaning(profile.balanceNumber, "Balance")}</p>
                </div>
              </>
            )}
          </div>
        )}

        {settings.includePersonalInsights && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold border-b pb-2">Personal Insights</h2>
            <p className="whitespace-pre-line">{getPersonalInsights()}</p>
          </div>
        )}

        {settings.includeFutureProjections && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold border-b pb-2">Future Projections</h2>
            <p className="whitespace-pre-line">{getFutureProjections()}</p>
          </div>
        )}

        {settings.includeCharts && (
          <div className="space-y-6 page-break-before">
            <h2 className="text-2xl font-bold border-b pb-2">Numerology Charts</h2>
            <div className="mt-4">
              <NumerologyChart profile={profile} />
            </div>

            {settings.includeFutureProjections && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Life Cycles Timeline</h3>
                <NumerologyTimeline profile={profile} />
              </div>
            )}
          </div>
        )}

        <div className="mt-12 pt-6 border-t text-sm text-gray-500">
          <p>
            This report is based on numerological principles and is for entertainment and self-reflection purposes only.
          </p>
          <p className="mt-2">© {new Date().getFullYear()} NUMO Oracle</p>
        </div>
      </div>
    </div>
  )
}
