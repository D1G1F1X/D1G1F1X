"use client"

import { useState, useCallback } from "react"

interface EmailServiceResponse {
  success: boolean
  message?: string
  error?: string
  details?: any
}

interface WelcomeEmailPayload {
  type: "welcome"
  email: string
  userName: string
}

interface PasswordResetEmailPayload {
  type: "password-reset"
  email: string
  userName: string
  resetToken: string
}

interface ContactFormEmailPayload {
  type: "contact-form"
  name: string
  email: string
  subject: string
  message: string
}

type EmailPayload = WelcomeEmailPayload | PasswordResetEmailPayload | ContactFormEmailPayload

export function useEmailService() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendEmail = useCallback(async (payload: EmailPayload): Promise<EmailServiceResponse> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const responseClone = response.clone()

      let data: any = null
      try {
        data = await response.json()
      } catch (jsonError) {
        const rawText = await responseClone.text()
        console.error("Server returned non-JSON response:", rawText)
        setError("Server returned an unexpected response format. Please check server logs for details.")
        return {
          success: false,
          error: "Server returned an unexpected response format. Please check server logs for details.",
          details: rawText.slice(0, 200) + "...",
        }
      }

      if (!response.ok) {
        const errorMessage = data?.error || "Failed to send email."
        setError(errorMessage)
        return {
          success: false,
          error: errorMessage,
          details: data,
        }
      }

      return {
        success: true,
        message: data?.message || "Email sent successfully!",
        details: data,
      }
    } catch (err: any) {
      console.error("Network or unexpected error during email send:", err)
      const errorMessage = err.message || "A network error occurred."
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const sendWelcomeEmail = useCallback(
    (email: string, userName: string) => {
      return sendEmail({ type: "welcome", email, userName })
    },
    [sendEmail],
  )

  const sendPasswordResetEmail = useCallback(
    (email: string, userName: string, resetToken: string) => {
      return sendEmail({ type: "password-reset", email, userName, resetToken })
    },
    [sendEmail],
  )

  const sendContactFormEmail = useCallback(
    (formData: { name: string; email: string; subject: string; message: string }) => {
      return sendEmail({ type: "contact-form", ...formData })
    },
    [sendEmail],
  )

  return { sendWelcomeEmail, sendPasswordResetEmail, sendContactFormEmail, isLoading, error }
}
