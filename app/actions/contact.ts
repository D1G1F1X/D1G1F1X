"use server"

import { Resend } from "resend"
import { z } from "zod"

const resend = new Resend(process.env.RESEND_API_KEY)

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email address."),
  subject: z.string().min(1, "Subject is required."),
  message: z.string().min(1, "Message is required."),
})

export async function submitContactForm(prevState: any, formData: FormData) {
  try {
    const validatedFields = contactFormSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    })

    if (!validatedFields.success) {
      console.error("Validation Errors:", validatedFields.error.flatten().fieldErrors)
      return {
        success: false,
        message: "Validation failed. Please check your input.",
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const { name, email, subject, message } = validatedFields.data

    const { data, error } = await resend.emails.send({
      from: "Lumen Helix Contact <noreply@lumenhelix.com>", // Ensure this domain is verified in Resend
      to: ["YOUR_RECEIVING_EMAIL@example.com"], // REPLACE WITH YOUR ACTUAL EMAIL ADDRESS
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background-color: #f9f9f9; border: 1px solid #eee; padding: 10px;">${message}</p>
        </div>
      `,
      reply_to: email,
    })

    if (error) {
      console.error("Resend API Error:", error)
      // Check for specific Resend error related to domain verification
      if (error.message && error.message.includes("domain is not verified")) {
        return {
          success: false,
          message: `Failed to send message. Error: The ${error.message.split(" ")[2]} domain is not verified. Please, add and verify your domain on https://resend.com/domains`,
        }
      }
      return {
        success: false,
        message: "Failed to send message. Please try again later.",
      }
    }

    return {
      success: true,
      message: "Message sent successfully! We'll get back to you soon.",
    }
  } catch (e) {
    console.error("Unexpected Error:", e)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}
