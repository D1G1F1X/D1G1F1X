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

    // For now, we'll just log and acknowledge
    console.log("Chat intake submission:", { name, email, phone, company, subject })

    // TODO: Implement actual email sending or database storage
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'contact@lumenhelix.com',
    //   to: email,
    //   subject: 'We received your inquiry',
    //   html: `<p>Hi ${name}, we'll get back to you soon!</p>`,
    // })

    return Response.json({ success: true })
  } catch (error) {
    console.error("Intake API error:", error)
    return Response.json({ error: "Failed to submit your information" }, { status: 500 })
  }
}
