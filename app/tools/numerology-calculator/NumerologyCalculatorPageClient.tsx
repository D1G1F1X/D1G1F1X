"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Loader2, Calculator, Sparkles } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  calculateLifePath,
  calculateExpressionNumber,
  calculateSoulUrgeNumber,
  calculateDestinyNumber,
  calculatePersonalityNumber,
  calculateMaturityNumber,
  calculateBalanceNumber,
  calculateChallengeNumbers,
  calculatePinnacleNumbers,
  calculatePersonalYearNumber,
  calculateEssenceNumber,
  calculateKarmicDebtNumbers,
  calculateMasterNumbers,
  calculateBirthDayNumber,
  calculateLifeCycleNumbers,
} from "@/lib/numerology"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePicker } from "@/components/ui/date-picker"
import { format } from "date-fns"
import { getNumberMeaning } from "@/data/number-meanings"
import { getCompoundNumberMeaning } from "@/data/numo-definitions"
import { getCardByNumber } from "@/lib/card-data-access"
import type { OracleCard } from "@/types/cards"
import { generateNumerologyReport } from "@/lib/services/numerology-report-service"
import Link from "next/link"
import Image from "next/image"
import { getCardImagePath } from "@/lib/card-image-path" // Import getCardImagePath

interface NumerologyReportData {
  fullName: string
  birthDate: string
  lifePathNumber: number
  expressionNumber: number
  soulUrgeNumber: number
  destinyNumber: number
  personalityNumber: number
  maturityNumber: number
  balanceNumber: number
  challengeNumbers: number[]
  pinnacleNumbers: number[]
  personalYearNumber: number
  essenceNumber: number
  karmicDebtNumbers: number[]
  masterNumbers: number[]
  birthDayNumber: number
  lifeCycleNumbers: number[]
  reportContent: string
  reportDate: string
}

export function NumerologyCalculatorPageClient() {
  const [fullName, setFullName] = useState("")
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined)
  const [report, setReport] = useState<NumerologyReportData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(true)
  const [consentGiven, setConsentGiven] = useState(false)
  const [savedReports, setSavedReports] = useState<NumerologyReportData[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Load consent from localStorage
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem("numerologyConsent") === "true"
      setConsentGiven(consent)
      setShowPrivacyNotice(!consent)

      // Load saved reports
      const storedReports = localStorage.getItem("numerologyReports")
      if (storedReports) {
        setSavedReports(JSON.parse(storedReports))
      }
    }
  }, [])

  const handleConsentChange = (checked: boolean) => {
    setConsentGiven(checked)
    if (typeof window !== "undefined") {
      localStorage.setItem("numerologyConsent", String(checked))
    }
    if (!checked) {
      // Optionally clear saved data if consent is revoked
      setFullName("")
      setBirthDate(undefined)
      setReport(null)
      setSavedReports([])
      if (typeof window !== "undefined") {
        localStorage.removeItem("numerologyReports")
      }
    }
  }

  const handleCalculate = async () => {
    if (!fullName || !birthDate) {
      toast({
        title: "Missing Information",
        description: "Please enter your full name and birth date.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setReport(null)

    try {
      const formattedBirthDate = format(birthDate, "MM/dd/yyyy")

      const lifePath = calculateLifePath(formattedBirthDate)
      const expression = calculateExpressionNumber(fullName)
      const soulUrge = calculateSoulUrgeNumber(fullName)
      const destiny = calculateDestinyNumber(formattedBirthDate)
      const personality = calculatePersonalityNumber(fullName)
      const maturity = calculateMaturityNumber(lifePath, expression)
      const balance = calculateBalanceNumber(fullName)
      const challenges = calculateChallengeNumbers(formattedBirthDate)
      const pinnacles = calculatePinnacleNumbers(formattedBirthDate)
      const personalYear = calculatePersonalYearNumber(birthDate)
      const essence = calculateEssenceNumber(fullName, formattedBirthDate)
      const karmicDebt = calculateKarmicDebtNumbers(lifePath, expression, soulUrge, destiny, personality)
      const masterNumbers = calculateMasterNumbers(lifePath, expression, soulUrge, destiny, personality)
      const birthDay = calculateBirthDayNumber(birthDate)
      const lifeCycles = calculateLifeCycleNumbers(formattedBirthDate)

      const reportContent = await generateNumerologyReport({
        fullName,
        birthDate: formattedBirthDate,
        lifePathNumber: lifePath,
        expressionNumber: expression,
        soulUrgeNumber: soulUrge,
        destinyNumber: destiny,
        personalityNumber: personality,
        maturityNumber: maturity,
        balanceNumber: balance,
        challengeNumbers: challenges,
        pinnacleNumbers: pinnacles,
        personalYearNumber: personalYear,
        essenceNumber: essence,
        karmicDebtNumbers: karmicDebt,
        masterNumbers: masterNumbers,
        birthDayNumber: birthDay,
        lifeCycleNumbers: lifeCycles,
      })

      const newReport: NumerologyReportData = {
        fullName,
        birthDate: formattedBirthDate,
        lifePathNumber: lifePath,
        expressionNumber: expression,
        soulUrgeNumber: soulUrge,
        destinyNumber: destiny,
        personalityNumber: personality,
        maturityNumber: maturity,
        balanceNumber: balance,
        challengeNumbers: challenges,
        pinnacleNumbers: pinnacles,
        personalYearNumber: personalYear,
        essenceNumber: essence,
        karmicDebtNumbers: karmicDebt,
        masterNumbers: masterNumbers,
        birthDayNumber: birthDay,
        lifeCycleNumbers: lifeCycles,
        reportContent: reportContent.report,
        reportDate: new Date().toISOString(),
      }

      setReport(newReport)
      toast({
        title: "Numerology Report Generated!",
        description: "Your personalized report is ready.",
      })

      if (consentGiven) {
        const updatedReports = [...savedReports, newReport]
        setSavedReports(updatedReports)
        if (typeof window !== "undefined") {
          localStorage.setItem("numerologyReports", JSON.stringify(updatedReports))
        }
      }
    } catch (error: any) {
      console.error("Error generating report:", error)
      toast({
        title: "Report Generation Failed",
        description: error.message || "An error occurred while generating your report.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getCardForNumber = (num: number): OracleCard | undefined => {
    return getCardByNumber(num.toString())
  }

  const getNumberDetails = (num: number) => {
    const meaning = getNumberMeaning(num)
    const compoundMeaning = getCompoundNumberMeaning(num)
    const card = getCardForNumber(num)
    return { meaning, compoundMeaning, card }
  }

  const NumberDetailAccordion = ({ number, title }: { number: number; title: string }) => {
    const { meaning, compoundMeaning, card } = getNumberDetails(number)
    return (
      <AccordionItem value={title}>
        <AccordionTrigger className="text-lg font-semibold">
          {title}: {number}
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 p-2">
            {meaning && (
              <div>
                <h4 className="font-medium">Core Meaning:</h4>
                <p className="text-muted-foreground">{meaning}</p>
              </div>
            )}
            {compoundMeaning && (
              <div>
                <h4 className="font-medium">Compound Meaning:</h4>
                <p className="text-muted-foreground">{compoundMeaning}</p>
              </div>
            )}
            {card && (
              <div>
                <h4 className="font-medium">Associated Oracle Card:</h4>
                <div className="flex items-center gap-4 mt-2">
                  <div className="relative w-20 h-30 flex-shrink-0">
                    <Image
                      src={getCardImagePath(card, "first") || "/placeholder.svg"}
                      alt={card.fullTitle}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{card.fullTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      {card.suit} - {card.baseElement}
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="link" className="p-0 h-auto text-sm">
                          View Card Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{card.fullTitle}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="relative aspect-[2/3] w-full max-w-xs mx-auto">
                            <Image
                              src={getCardImagePath(card, "first") || "/placeholder.svg"}
                              alt={card.fullTitle}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                          <p className="text-muted-foreground">{card.keyMeanings.join(". ")}</p>
                          <Accordion type="single" collapsible>
                            <AccordionItem value="symbolism">
                              <AccordionTrigger>Symbolism Breakdown</AccordionTrigger>
                              <AccordionContent>
                                {card.symbolismBreakdown.map((s, i) => (
                                  <p key={i} className="text-sm text-muted-foreground">
                                    {s}
                                  </p>
                                ))}
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary-foreground mb-4">Numerology Calculator</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Uncover your life's blueprint through the ancient wisdom of numbers.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" /> Your Details
          </CardTitle>
          <CardDescription>Enter your full name and birth date to generate your numerology report.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name (as on birth certificate)</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g., John Michael Doe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthDate">Birth Date</Label>
            <DatePicker date={birthDate} setDate={setBirthDate} />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="consent" checked={consentGiven} onCheckedChange={handleConsentChange} />
            <Label htmlFor="consent">
              Allow us to save your name and birth date for future reports and personalized experiences.
            </Label>
          </div>
          <Button onClick={handleCalculate} disabled={isLoading || !fullName || !birthDate}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Report...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" /> Generate My Report
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {report && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" /> Your Numerology Report
            </CardTitle>
            <CardDescription>A deep dive into your personal numbers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-muted-foreground">Life Path Number</p>
                <p className="text-4xl font-bold text-purple-500">{report.lifePathNumber}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Expression Number</p>
                <p className="text-4xl font-bold text-blue-500">{report.expressionNumber}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Soul Urge Number</p>
                <p className="text-4xl font-bold text-green-500">{report.soulUrgeNumber}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Destiny Number</p>
                <p className="text-4xl font-bold text-orange-500">{report.destinyNumber}</p>
              </div>
            </div>

            <Separator />

            <div className="prose dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: report.reportContent }} />
            </div>

            <Separator />

            <h3 className="text-xl font-bold">Detailed Number Breakdown</h3>
            <Accordion type="multiple" className="w-full">
              <NumberDetailAccordion number={report.lifePathNumber} title="Life Path Number" />
              <NumberDetailAccordion number={report.expressionNumber} title="Expression Number" />
              <NumberDetailAccordion number={report.soulUrgeNumber} title="Soul Urge Number" />
              <NumberDetailAccordion number={report.destinyNumber} title="Destiny Number" />
              <NumberDetailAccordion number={report.personalityNumber} title="Personality Number" />
              <NumberDetailAccordion number={report.maturityNumber} title="Maturity Number" />
              <NumberDetailAccordion number={report.birthDayNumber} title="Birth Day Number" />
              {report.balanceNumber !== 0 && (
                <NumberDetailAccordion number={report.balanceNumber} title="Balance Number" />
              )}
              {report.personalYearNumber !== 0 && (
                <NumberDetailAccordion number={report.personalYearNumber} title="Personal Year Number" />
              )}
              {report.essenceNumber !== 0 && (
                <NumberDetailAccordion number={report.essenceNumber} title="Essence Number" />
              )}
              {report.karmicDebtNumbers.length > 0 && (
                <AccordionItem value="karmic-debt">
                  <AccordionTrigger className="text-lg font-semibold">
                    Karmic Debt Numbers: {report.karmicDebtNumbers.join(", ")}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      These numbers indicate lessons from past lives that need to be addressed in this lifetime.
                    </p>
                    {report.karmicDebtNumbers.map((num, i) => (
                      <div key={`kd-${i}`} className="mt-2">
                        <h4 className="font-medium">Number {num}:</h4>
                        <p className="text-muted-foreground">{getNumberMeaning(num)}</p>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              )}
              {report.masterNumbers.length > 0 && (
                <AccordionItem value="master-numbers">
                  <AccordionTrigger className="text-lg font-semibold">
                    Master Numbers: {report.masterNumbers.join(", ")}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Master Numbers (11, 22, 33) carry intense potential and require significant effort to master.
                    </p>
                    {report.masterNumbers.map((num, i) => (
                      <div key={`mn-${i}`} className="mt-2">
                        <h4 className="font-medium">Number {num}:</h4>
                        <p className="text-muted-foreground">{getNumberMeaning(num)}</p>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              )}
              {report.challengeNumbers.length > 0 && (
                <AccordionItem value="challenge-numbers">
                  <AccordionTrigger className="text-lg font-semibold">
                    Challenge Numbers: {report.challengeNumbers.join(", ")}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      These numbers highlight areas where you will face challenges and opportunities for growth
                      throughout your life.
                    </p>
                    {report.challengeNumbers.map((num, i) => (
                      <div key={`cn-${i}`} className="mt-2">
                        <h4 className="font-medium">Number {num}:</h4>
                        <p className="text-muted-foreground">{getNumberMeaning(num)}</p>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              )}
              {report.pinnacleNumbers.length > 0 && (
                <AccordionItem value="pinnacle-numbers">
                  <AccordionTrigger className="text-lg font-semibold">
                    Pinnacle Numbers: {report.pinnacleNumbers.join(", ")}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Pinnacle Numbers represent periods of opportunity and growth in your life, typically lasting
                      around 9 years each.
                    </p>
                    {report.pinnacleNumbers.map((num, i) => (
                      <div key={`pn-${i}`} className="mt-2">
                        <h4 className="font-medium">Number {num}:</h4>
                        <p className="text-muted-foreground">{getNumberMeaning(num)}</p>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              )}
              {report.lifeCycleNumbers.length > 0 && (
                <AccordionItem value="life-cycle-numbers">
                  <AccordionTrigger className="text-lg font-semibold">
                    Life Cycle Numbers: {report.lifeCycleNumbers.join(", ")}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      These numbers represent the three major periods of your life, each with its own theme and lessons.
                    </p>
                    {report.lifeCycleNumbers.map((num, i) => (
                      <div key={`lcn-${i}`} className="mt-2">
                        <h4 className="font-medium">Number {num}:</h4>
                        <p className="text-muted-foreground">{getNumberMeaning(num)}</p>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </CardContent>
          {/* CardFooter is not defined in the existing code, so it's commented out */}
          {/* <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" /> Share Report
            </Button>
            <Button>
              <Printer className="mr-2 h-4 w-4" /> Print Report
            </Button>
            <Link href={`/numerology-report/${report.fullName.replace(/\s+/g, '-')}-${format(birthDate!, 'yyyy-MM-dd')}`}>
              <Button>
                <Save className="mr-2 h-4 w-4" /> Save Report
              </Button>
            </Link>
          </CardFooter> */}
        </Card>
      )}

      {consentGiven && savedReports.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Saved Reports</CardTitle>
            <CardDescription>Access your previously generated numerology reports.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64 rounded-md border p-4">
              <ul className="space-y-2">
                {savedReports.map((sr, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>
                      {sr.fullName} - {sr.birthDate} (Life Path: {sr.lifePathNumber})
                    </span>
                    <Link
                      href={`/numerology-report/${sr.fullName.replace(/\s+/g, "-")}-${sr.birthDate.replace(/\//g, "-")}`}
                    >
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
