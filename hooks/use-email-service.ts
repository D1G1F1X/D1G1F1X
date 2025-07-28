"use client"

import { useState } from "react"

interface EmailRequest {
  type: "welcome" | "password-reset" | "contact-form"
  [key: string]: any
}

interface EmailResponse {
  success: boolean
  error?: string
}

export function useEmailService() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendEmail = async (emailData: EmailRequest): Promise<EmailResponse> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      })

      const result = await response.json()

      if (!response.ok) {
        const errorMessage = result.error || "Failed to send email"
        setError(errorMessage)
        return { success: false, error: errorMessage }
      }

      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Network error"
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  const sendWelcomeEmail = (email: string, userName: string) => sendEmail({ type: "welcome", email, userName })

  const sendPasswordResetEmail = (email: string, userName: string, resetToken: string) =>
    sendEmail({ type: "password-reset", email, userName, resetToken })

  const sendContactFormEmail = (formData: { name: string; email: string; subject: string; message: string }) =>
    sendEmail({ type: "contact-form", ...formData })

  return {
    sendEmail,
    sendWelcomeEmail,
    sendPasswordResetEmail,
    sendContactFormEmail,
    isLoading,
    error,
  }
}
