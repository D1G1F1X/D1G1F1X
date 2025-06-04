"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, Share2, Trash2, MoreVertical, Search, Calendar, User, Globe, Lock, Loader2 } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import { numerologyReportService, type SavedNumerologyReport } from "@/lib/services/numerology-report-service"
import { shareService } from "@/lib/services/share-service"

interface SavedReportsManagerProps {
  userId?: string
  showPublicReports?: boolean
}

export function SavedReportsManager({ userId, showPublicReports = false }: SavedReportsManagerProps) {
  const [reports, setReports] = useState<SavedNumerologyReport[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true)
      try {
        let reportData: SavedNumerologyReport[] = []

        if (showPublicReports) {
          reportData = await numerologyReportService.getPublicReports(20)
        } else if (userId) {
          reportData = await numerologyReportService.getUserReports(userId)
        }

        setReports(reportData)
      } catch (error) {
        console.error("Error fetching reports:", error)
        toast({
          title: "Error",
          description: "Failed to load reports. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [userId, showPublicReports])

  const filteredReports = reports.filter(
    (report) =>
      report.birth_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.report_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.current_name?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleShare = async (report: SavedNumerologyReport) => {
    if (!report.is_public) {
      toast({
        title: "Cannot Share",
        description: "This report is private and cannot be shared.",
        variant: "destructive",
      })
      return
    }

    const shareUrl = shareService.generateShareableLink(report.id!)
    const shareData = {
      title: report.report_title || `Numerology Report for ${report.birth_name}`,
      text: `Check out this numerology report: ${report.report_title}`,
      url: shareUrl,
    }

    if (shareService.isNativeShareSupported()) {
      await shareService.nativeShare(shareData)
    } else {
      const success = await shareService.copyToClipboard(shareUrl)
      if (success) {
        toast({
          title: "Link Copied",
          description: "The report link has been copied to your clipboard.",
        })
      }
    }
  }

  const handleDelete = async (reportId: string) => {
    if (!userId) return

    setDeletingId(reportId)
    try {
      const result = await numerologyReportService.deleteReport(reportId, userId)

      if (result.success) {
        setReports(reports.filter((report) => report.id !== reportId))
        toast({
          title: "Report Deleted",
          description: "The report has been deleted successfully.",
        })
      } else {
        toast({
          title: "Delete Failed",
          description: "Failed to delete the report. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting report:", error)
      toast({
        title: "Delete Failed",
        description: "An error occurred while deleting the report.",
        variant: "destructive",
      })
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-400" />
          <p className="text-gray-300">Loading reports...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search reports by name or title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-gray-800 border-gray-700"
        />
      </div>

      {/* Reports Grid */}
      {filteredReports.length === 0 ? (
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="py-12 text-center">
            <User className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-300 mb-2">
              {searchTerm ? "No reports found" : showPublicReports ? "No public reports" : "No saved reports"}
            </h3>
            <p className="text-gray-400">
              {searchTerm
                ? "Try adjusting your search terms"
                : showPublicReports
                  ? "There are no public reports available yet"
                  : "Create your first numerology report to see it here"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <Card
              key={report.id}
              className="bg-gray-900/50 border-purple-500/30 hover:border-purple-400/50 transition-colors"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg text-purple-300 truncate">
                      {report.report_title || `Report for ${report.birth_name}`}
                    </CardTitle>
                    <p className="text-sm text-gray-400 mt-1">
                      {report.birth_name}
                      {report.current_name && report.current_name !== report.birth_name && (
                        <span className="text-gray-500"> (now {report.current_name})</span>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {report.is_public ? (
                      <Badge variant="secondary" className="bg-green-900/30 text-green-300 border-green-500/30">
                        <Globe className="h-3 w-3 mr-1" />
                        Public
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-gray-700/30 text-gray-300 border-gray-600/30">
                        <Lock className="h-3 w-3 mr-1" />
                        Private
                      </Badge>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700">
                        <DropdownMenuItem asChild>
                          <Link
                            href={report.is_public ? `/numerology-report/${report.id}` : "#"}
                            className="flex items-center"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Report
                          </Link>
                        </DropdownMenuItem>

                        {report.is_public && (
                          <DropdownMenuItem onClick={() => handleShare(report)}>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                        )}

                        {!showPublicReports && userId && (
                          <>
                            <DropdownMenuSeparator className="bg-gray-700" />
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                  className="text-red-400 focus:text-red-300"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-gray-900 border-gray-700">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-red-400">Delete Report</AlertDialogTitle>
                                  <AlertDialogDescription className="text-gray-300">
                                    Are you sure you want to delete this report? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="border-gray-600 text-gray-300">
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(report.id!)}
                                    disabled={deletingId === report.id}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    {deletingId === report.id ? (
                                      <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Deleting...
                                      </>
                                    ) : (
                                      "Delete"
                                    )}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-purple-900/20 p-2 rounded border border-purple-500/30 text-center">
                    <div className="text-xs text-gray-400">Life Path</div>
                    <div className="text-lg font-bold text-purple-400">{report.life_path_number}</div>
                  </div>
                  <div className="bg-indigo-900/20 p-2 rounded border border-indigo-500/30 text-center">
                    <div className="text-xs text-gray-400">Destiny</div>
                    <div className="text-lg font-bold text-indigo-400">{report.destiny_number}</div>
                  </div>
                  <div className="bg-blue-900/20 p-2 rounded border border-blue-500/30 text-center">
                    <div className="text-xs text-gray-400">Soul Urge</div>
                    <div className="text-lg font-bold text-blue-400">{report.soul_urge_number}</div>
                  </div>
                  <div className="bg-violet-900/20 p-2 rounded border border-violet-500/30 text-center">
                    <div className="text-xs text-gray-400">Personality</div>
                    <div className="text-lg font-bold text-violet-400">{report.personality_number}</div>
                  </div>
                </div>

                <div className="flex items-center text-xs text-gray-400">
                  <Calendar className="h-3 w-3 mr-1" />
                  Born {format(new Date(report.birth_date), "MMM d, yyyy")}
                </div>

                {report.created_at && (
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    Created {format(new Date(report.created_at), "MMM d, yyyy")}
                  </div>
                )}

                {report.notes && <p className="text-xs text-gray-400 mt-2 line-clamp-2">{report.notes}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
