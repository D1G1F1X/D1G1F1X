export async function POST(request: Request) {
  try {
    const { name, email, phone, company, subject } = await request.json()

    // Validate required fields
    if (!name || !email) {
      return Response.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Here you would typically:
    // 1. Send an email to your team using Resend or similar
    // 2. Save to database
    // 3. Create CRM entry

    return Response.json({ success: true, message: "Thank you for your submission" })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return Response.json({ error: "Failed to submit your information", details: errorMessage }, { status: 500 })
  }
}
