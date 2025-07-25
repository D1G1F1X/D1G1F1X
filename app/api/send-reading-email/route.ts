import { NextResponse } from "next/server"
import { sendReadingEmail } from "@/lib/services/brevo-email-service"

export async function POST(request: Request) {
  try {
    const { to, subject, htmlContent } = await request.json()

    if (!to || !subject || !htmlContent) {
      return NextResponse.json({ error: "Missing required email fields" }, { status: 400 })
    }

    const result = await sendReadingEmail(to, subject, htmlContent)

    if (result.success) {
      return NextResponse.json({ message: "Reading email sent successfully" })
    } else {
      return NextResponse.json({ error: result.message }, { status: 500 })
    }
  } catch (error) {
    console.error("Error sending reading email:", error)
    return NextResponse.json({ error: "Failed to send reading email" }, { status: 500 })
  }
}
