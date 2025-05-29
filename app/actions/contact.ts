"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitContactForm(prevState: any, formData: FormData) {
  console.log("submitContactForm action invoked.") // Log invocation

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set.")
    return {
      success: false,
      message: "Server configuration error. Please contact support.",
    }
  }

  try {
    if (!formData) {
      console.error("Form data is missing.")
      return {
        success: false,
        message: "Form data is missing. Please try again.",
      }
    }

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    console.log("Form data received:", { name, email, subject, message: message.substring(0, 50) + "..." })

    if (!name || !email || !subject || !message) {
      console.warn("Validation failed: All fields are required.", { name, email, subject, message })
      return {
        success: false,
        message: "All fields are required.",
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.warn("Validation failed: Invalid email address.", { email })
      return {
        success: false,
        message: "Please enter a valid email address.",
      }
    }

    const emailPayload = {
      from: "Contact Form <noreply@lumenhelix.com>", // Ensure this 'from' domain is verified in Resend
      to: ["lumenhelixsolution@gmail.com"],
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B82F6; border-bottom: 2px solid #3B82F6; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Message:</h3>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #3B82F6; border-radius: 4px;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p>This message was sent from the LumenHelix Solutions contact form.</p>
            <p>Reply directly to this email to respond to ${name} at ${email}</p>
          </div>
        </div>
      `,
      replyTo: email,
    }

    console.log("Attempting to send email with payload:", JSON.stringify(emailPayload, null, 2))

    const { data, error } = await resend.emails.send(emailPayload)

    if (error) {
      console.error("Resend API Error:", JSON.stringify(error, null, 2))
      return {
        success: false,
        message: `Failed to send message. Error: ${error.message || "Unknown Resend error"}`,
      }
    }

    console.log("Email sent successfully. Resend response data:", JSON.stringify(data, null, 2))
    return {
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    }
  } catch (error: any) {
    console.error(
      "Catch block error in submitContactForm:",
      JSON.stringify(error, Object.getOwnPropertyNames(error), 2),
    )
    return {
      success: false,
      message: `An unexpected error occurred: ${error.message || "Unknown error"}. Please try again later.`,
    }
  }
}
