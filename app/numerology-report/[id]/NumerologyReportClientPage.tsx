"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft, Printer, Share2 } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { numerologyReportService, type SavedNumerologyReport } from "@/lib/services/numerology-report-service"
import { shareService } from "@/lib/services/share-service"
import { toast } from "@/components/ui/use-toast"

export default function NumerologyReportClientPage() {
  const params = useParams<{ id: string }>()
  const reportId = params.id
  const [report, setReport] = useState<SavedNumerologyReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReport = async () => {
      if (!reportId || typeof reportId !== "string") {
        setError("Invalid report ID")
        setLoading(false)
        return
      }

      try {
        const reportData = await numerologyReportService.getReportById(reportId)

        if (!reportData) {
          setError("Report not found")
        } else if (!reportData.is_public) {
          setError("This report is private")
        } else {
          setReport(reportData)
        }
      } catch (err) {
        console.error("Error fetching report:", err)
        setError("Failed to load report")
      } finally {
        setLoading(false)
      }
    }

    fetchReport()
  }, [reportId])

  const handleShare = async () => {
    const shareData = {
      title: report?.report_title || "Numerology Report",
      text: `Check out this numerology report: ${report?.report_title}`,
      url: window.location.href,
    }

    if (shareService.isNativeShareSupported()) {
      await shareService.nativeShare(shareData)
    } else {
      const success = await shareService.copyToClipboard(window.location.href)
      if (success) {
        toast({
          title: "Link Copied",
          description: "The report link has been copied to your clipboard.",
        })
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-400" />
          <p className="text-gray-300">Loading numerology report...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <Card className="bg-gray-900/50 border-red-500/30 max-w-md">
          <CardHeader>
            <CardTitle className="text-red-400">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">{error}</p>
            <Link href="/tools/numerology-report">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Create Your Own Report
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!report) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" asChild>
              <Link href="/numerology">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Numerology
              </Link>
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <Card className="bg-gray-900/50 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-300">
                {report.report_title || `Numerology Report for ${report.birth_name}`}
              </CardTitle>
              <CardDescription>Generated on {format(new Date(report.created_at!), "MMMM d, yyyy")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">Born on {format(new Date(report.birth_date), "MMMM d, yyyy")}</p>
              {report.current_name && <p className="text-gray-300">Current name: {report.current_name}</p>}
            </CardContent>
          </Card>
        </div>

        {/* Core Numbers */}
        <Card className="bg-gray-900/50 border-purple-500/30 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-purple-300">Core Numbers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30 text-center">
                <div className="text-sm text-gray-400 mb-1">Life Path</div>
                <div className="text-3xl font-bold text-purple-400">{report.life_path_number}</div>
              </div>
              <div className="bg-indigo-900/20 p-4 rounded-lg border border-indigo-500/30 text-center">
                <div className="text-sm text-gray-400 mb-1">Destiny</div>
                <div className="text-3xl font-bold text-indigo-400">{report.destiny_number}</div>
              </div>
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30 text-center">
                <div className="text-sm text-gray-400 mb-1">Soul Urge</div>
                <div className="text-3xl font-bold text-blue-400">{report.soul_urge_number}</div>
              </div>
              <div className="bg-violet-900/20 p-4 rounded-lg border border-violet-500/30 text-center">
                <div className="text-sm text-gray-400 mb-1">Personality</div>
                <div className="text-3xl font-bold text-violet-400">{report.personality_number}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Summary */}
        <Card className="bg-gray-900/50 border-purple-500/30 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-purple-300">Report Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-300 mb-2">
                Life Path Number: {report.life_path_number}
              </h3>
              <p className="text-gray-300">
                Your Life Path number reveals your life's purpose and the lessons you're here to learn. This number
                represents your natural talents and the path you're meant to follow.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-indigo-300 mb-2">Destiny Number: {report.destiny_number}</h3>
              <p className="text-gray-300">
                Your Destiny number shows what you're meant to achieve in this lifetime. It represents your life's work
                and the contribution you're meant to make to the world.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-300 mb-2">Soul Urge Number: {report.soul_urge_number}</h3>
              <p className="text-gray-300">
                Your Soul Urge number reveals your inner desires and what truly motivates you. It represents what your
                soul craves and what brings you deep satisfaction.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-violet-300 mb-2">
                Personality Number: {report.personality_number}
              </h3>
              <p className="text-gray-300">
                Your Personality number shows how others perceive you and the image you project to the world. It
                represents the mask you wear in social situations.
              </p>
            </div>

            {report.personal_year && (
              <div>
                <h3 className="text-lg font-semibold text-green-300 mb-2">Personal Year: {report.personal_year}</h3>
                <p className="text-gray-300">
                  Your Personal Year number indicates the energy and opportunities available to you this year. It helps
                  you understand what to focus on and what themes will be prominent.
                </p>
              </div>
            )}

            {report.notes && (
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Personal Notes</h3>
                <p className="text-gray-300 italic">{report.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Numbers */}
        <Card className="bg-gray-900/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-xl text-purple-300">Additional Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-amber-300 mb-2">Challenge Numbers</h4>
                <div className="space-y-2">
                  {report.challenge_numbers.map((challenge, index) => (
                    <div key={index} className="text-sm text-gray-300">
                      Challenge {index + 1}: {challenge}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-emerald-300 mb-2">Pinnacle Numbers</h4>
                <div className="space-y-2">
                  {report.pinnacle_numbers.map((pinnacle, index) => (
                    <div key={index} className="text-sm text-gray-300">
                      Pinnacle {index + 1}: {pinnacle}
                    </div>
                  ))}
                </div>
              </div>

              {report.karmic_lessons.length > 0 && (
                <div>
                  <h4 className="font-semibold text-purple-300 mb-2">Karmic Lessons</h4>
                  <div className="space-y-2">
                    {report.karmic_lessons.map((lesson, index) => (
                      <div key={index} className="text-sm text-gray-300">
                        Lesson {lesson}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-semibold text-pink-300 mb-2">Hidden Passion</h4>
                <div className="text-sm text-gray-300">Number: {report.hidden_passion_number}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            This report is based on numerological principles and is for entertainment and self-reflection purposes only.
          </p>
          <p className="text-gray-500 text-xs mt-2">© {new Date().getFullYear()} NUMO Oracle</p>
        </div>
      </div>
    </div>
  )
}
