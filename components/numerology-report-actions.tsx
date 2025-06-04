"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Save,
  Share2,
  Printer,
  Download,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
  Copy,
  Check,
  Loader2,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { numerologyReportService, type SavedNumerologyReport } from "@/lib/services/numerology-report-service"
import { pdfGeneratorService } from "@/lib/services/pdf-generator-service"
import { shareService } from "@/lib/services/share-service"

interface NumerologyReportActionsProps {
  profile: any // The numerology profile data
  reportContent: string // HTML content of the report
  className?: string
}

export function NumerologyReportActions({ profile, reportContent, className = "" }: NumerologyReportActionsProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [reportTitle, setReportTitle] = useState(`Numerology Report for ${profile.birthName}`)
  const [reportNotes, setReportNotes] = useState("")
  const [isPublic, setIsPublic] = useState(false)
  const [shareUrl, setShareUrl] = useState("")
  const [copied, setCopied] = useState(false)

  // Handle save report
  const handleSaveReport = async () => {
    setIsSaving(true)
    try {
      const reportData: SavedNumerologyReport = {
        birth_name: profile.birthName,
        current_name: profile.currentName,
        nicknames: profile.nicknames,
        birth_date: profile.birthDate.toISOString().split("T")[0],
        life_path_number: profile.lifePathNumber,
        destiny_number: profile.destinyNumber,
        soul_urge_number: profile.soulUrgeNumber,
        personality_number: profile.personalityNumber,
        birthday_number: profile.birthdayNumber,
        maturity_number: profile.maturityNumber,
        balance_number: profile.balanceNumber,
        challenge_numbers: profile.challengeNumbers || [],
        pinnacle_numbers: profile.pinnacleNumbers || [],
        personal_year: profile.personalYear || 1,
        personal_month: profile.personalMonth || 1,
        personal_day: profile.personalDay || 1,
        karmic_lessons: profile.karmicLessons || [],
        hidden_passion_number: profile.hiddenPassionNumber || 1,
        expression_number: profile.expressionNumber,
        bridge_number: profile.bridgeNumber,
        report_title: reportTitle,
        notes: reportNotes,
        is_public: isPublic,
        user_id: "", // Will be set by the service
      }

      const result = await numerologyReportService.saveReport(reportData)

      if (result.success) {
        toast({
          title: "Report Saved",
          description: "Your numerology report has been saved successfully.",
        })
        setSaveDialogOpen(false)

        // Generate shareable URL if public
        if (isPublic && result.id) {
          const url = shareService.generateShareableLink(result.id)
          setShareUrl(url)
        }
      } else {
        toast({
          title: "Save Failed",
          description: "Failed to save your report. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error saving report:", error)
      toast({
        title: "Save Failed",
        description: "An error occurred while saving your report.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Handle print report
  const handlePrintReport = () => {
    window.print()
  }

  // Handle download PDF
  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    try {
      const pdfBlob = await pdfGeneratorService.generatePDF({
        title: reportTitle,
        content: reportContent,
        includeCharts: true,
        includeTimeline: true,
        theme: "light",
        fontSize: "medium",
      })

      const filename = `${reportTitle.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_${new Date().toISOString().split("T")[0]}.pdf`

      // For now, we'll trigger the print dialog since we're using a simple implementation
      // In a real implementation, you would download the actual PDF
      toast({
        title: "PDF Generated",
        description: "Your PDF report is being prepared for download.",
      })

      // Trigger print dialog as fallback
      setTimeout(() => {
        window.print()
      }, 500)
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "PDF Generation Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  // Handle copy link
  const handleCopyLink = async () => {
    const url = shareUrl || window.location.href
    const success = await shareService.copyToClipboard(url)

    if (success) {
      setCopied(true)
      toast({
        title: "Link Copied",
        description: "The report link has been copied to your clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } else {
      toast({
        title: "Copy Failed",
        description: "Failed to copy link to clipboard.",
        variant: "destructive",
      })
    }
  }

  // Handle social sharing
  const handleSocialShare = (platform: string) => {
    const shareData = {
      title: reportTitle,
      text: `Check out my numerology report: ${reportTitle}`,
      url: shareUrl || window.location.href,
    }

    const socialUrls = shareService.getSocialShareUrls(shareData)

    switch (platform) {
      case "facebook":
        shareService.openShareWindow(socialUrls.facebook, "facebook")
        break
      case "twitter":
        shareService.openShareWindow(socialUrls.twitter, "twitter")
        break
      case "linkedin":
        shareService.openShareWindow(socialUrls.linkedin, "linkedin")
        break
      case "email":
        window.location.href = socialUrls.email
        break
      case "whatsapp":
        shareService.openShareWindow(socialUrls.whatsapp, "whatsapp")
        break
      case "telegram":
        shareService.openShareWindow(socialUrls.telegram, "telegram")
        break
      case "native":
        shareService.nativeShare(shareData)
        break
    }
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      {/* Save Button */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="bg-purple-900/20 border-purple-500/30 hover:bg-purple-900/40">
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-900 border-purple-500/30">
          <DialogHeader>
            <DialogTitle className="text-purple-300">Save Numerology Report</DialogTitle>
            <DialogDescription className="text-gray-400">
              Save your numerology report to access it later and optionally share it with others.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reportTitle" className="text-gray-300">
                Report Title
              </Label>
              <Input
                id="reportTitle"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                className="bg-gray-800 border-gray-700"
                placeholder="Enter a title for your report"
              />
            </div>
            <div>
              <Label htmlFor="reportNotes" className="text-gray-300">
                Notes (Optional)
              </Label>
              <Textarea
                id="reportNotes"
                value={reportNotes}
                onChange={(e) => setReportNotes(e.target.value)}
                className="bg-gray-800 border-gray-700"
                placeholder="Add any personal notes about your report"
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isPublic"
                checked={isPublic}
                onCheckedChange={setIsPublic}
                className="data-[state=checked]:bg-purple-600"
              />
              <Label htmlFor="isPublic" className="text-gray-300">
                Make this report public (others can view it)
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSaveDialogOpen(false)}
              className="border-gray-600 text-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveReport}
              disabled={isSaving || !reportTitle.trim()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Report
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Button */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="bg-blue-900/20 border-blue-500/30 hover:bg-blue-900/40">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-900 border-gray-700" align="end">
          <DropdownMenuItem onClick={handleCopyLink} className="text-gray-300 hover:bg-gray-800">
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? "Copied!" : "Copy Link"}
          </DropdownMenuItem>

          {shareService.isNativeShareSupported() && (
            <>
              <DropdownMenuItem onClick={() => handleSocialShare("native")} className="text-gray-300 hover:bg-gray-800">
                <Share2 className="h-4 w-4 mr-2" />
                Share...
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
            </>
          )}

          <DropdownMenuItem onClick={() => handleSocialShare("facebook")} className="text-gray-300 hover:bg-gray-800">
            <Facebook className="h-4 w-4 mr-2 text-blue-500" />
            Facebook
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSocialShare("twitter")} className="text-gray-300 hover:bg-gray-800">
            <Twitter className="h-4 w-4 mr-2 text-blue-400" />
            Twitter
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSocialShare("linkedin")} className="text-gray-300 hover:bg-gray-800">
            <Linkedin className="h-4 w-4 mr-2 text-blue-600" />
            LinkedIn
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSocialShare("whatsapp")} className="text-gray-300 hover:bg-gray-800">
            <MessageCircle className="h-4 w-4 mr-2 text-green-500" />
            WhatsApp
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuItem onClick={() => handleSocialShare("email")} className="text-gray-300 hover:bg-gray-800">
            <Mail className="h-4 w-4 mr-2 text-gray-400" />
            Email
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Print Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrintReport}
        className="bg-green-900/20 border-green-500/30 hover:bg-green-900/40"
      >
        <Printer className="h-4 w-4 mr-1" />
        Print
      </Button>

      {/* Download PDF Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownloadPDF}
        disabled={isGeneratingPDF}
        className="bg-orange-900/20 border-orange-500/30 hover:bg-orange-900/40"
      >
        {isGeneratingPDF ? (
          <>
            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Download className="h-4 w-4 mr-1" />
            PDF
          </>
        )}
      </Button>
    </div>
  )
}
