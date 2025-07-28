import { type NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { put } from "@vercel/blob" // Import Vercel Blob put function
import { brevoEmailService } from "@/lib/services/brevo-email-service" // Import the email service

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const description = formData.get("description") as string
    const pageUrl = formData.get("pageUrl") as string
    const email = formData.get("email") as string
    const type = formData.get("type") as "bug" | "typo"
    const screenshot = formData.get("screenshot") as File | null

    let screenshotUrl: string | null = null
    if (screenshot) {
      const bytes = await screenshot.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Generate a unique filename for the screenshot
      const filename = `bug-reports/${uuidv4()}-${screenshot.name}`

      // Upload screenshot to Vercel Blob
      const { url } = await put(filename, buffer, { access: "public" })
      screenshotUrl = url
    }

    // Create a record of the bug report
    const bugReport = {
      id: uuidv4(),
      description,
      pageUrl,
      email: email || undefined, // Use undefined if empty for optional fields
      type,
      screenshotUrl,
      createdAt: new Date().toISOString(),
      status: "new",
    }

    // Send notification to admin
    const adminNotificationResult = await brevoEmailService.sendBugReportNotification(bugReport)
    if (!adminNotificationResult.success) {
      console.error("Failed to send admin bug report notification:", adminNotificationResult.error)
      // Continue, but log the error. We don't want to fail the user's submission just because admin email failed.
    }

    // Send confirmation to user if email is provided
    if (bugReport.email) {
      const userConfirmationResult = await brevoEmailService.sendBugReportConfirmation(bugReport)
      if (!userConfirmationResult.success) {
        console.error("Failed to send user bug report confirmation:", userConfirmationResult.error)
      }
    }

    return NextResponse.json({
      success: true,
      message: "Bug report submitted successfully. Thank you for your feedback!",
      reportId: bugReport.id,
      screenshotUrl: bugReport.screenshotUrl, // Return the URL for confirmation
    })
  } catch (error) {
    console.error("Error handling bug report:", error)
    return NextResponse.json({ success: false, message: "Failed to submit bug report" }, { status: 500 })
  }
}
