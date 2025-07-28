import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/services/brevo-email-service"

export async function POST(request: Request) {
  try {
    const { to, subject, htmlContent, textContent } = await request.json()

    if (!to || !subject || (!htmlContent && !textContent)) {
      return NextResponse.json({ error: "Missing required email fields" }, { status: 400 })
    }

    const result = await sendEmail({ to, subject, htmlContent, textContent })

    if (result.success) {
      return NextResponse.json({ message: "Email sent successfully", data: result.data })
    } else {
      return NextResponse.json({ error: result.error || "Failed to send email" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error sending reading email:", error)
    return NextResponse.json({ error: "Failed to send reading email" }, { status: 500 })
  }
}
