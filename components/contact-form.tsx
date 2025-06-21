"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Mail, Send, CheckCircle } from "lucide-react"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormState {
  isSubmitting: boolean
  isSuccess: boolean
  error: string | null
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (formState.error) {
      setFormState((prev) => ({ ...prev, error: null }))
    }
  }

  const validateForm = (): string | null => {
    if (!formData.name.trim()) return "Name is required"
    if (!formData.email.trim()) return "Email is required"
    if (!formData.subject.trim()) return "Subject is required"
    if (!formData.message.trim()) return "Message is required"

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) return "Please enter a valid email address"

    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      setFormState((prev) => ({ ...prev, error: validationError }))
      return
    }

    setFormState((prev) => ({ ...prev, isSubmitting: true, error: null }))

    try {
      const response = await fetch("/api/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "contact-form",
          ...formData,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message")
      }

      setFormState((prev) => ({ ...prev, isSuccess: true }))
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      console.error("Contact form error:", error)
      setFormState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to send message. Please try again.",
      }))
    } finally {
      setFormState((prev) => ({ ...prev, isSubmitting: false }))
    }
  }

  if (formState.isSuccess) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-700 mb-2">Message Sent Successfully!</h2>
          <p className="text-gray-600 mb-4">
            Thank you for reaching out to us. We've received your message and will respond within 24-48 hours.
          </p>
          <p className="text-sm text-gray-500 mb-6">A confirmation email has been sent to your email address.</p>
          <Button
            onClick={() => setFormState({ isSubmitting: false, isSuccess: false, error: null })}
            variant="outline"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Mail className="w-8 h-8 text-primary mr-2" />
          <CardTitle className="text-2xl">Contact Us</CardTitle>
        </div>
        <CardDescription>
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {formState.error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{formState.error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                disabled={formState.isSubmitting}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                disabled={formState.isSubmitting}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="What is this regarding?"
              disabled={formState.isSubmitting}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us more about your inquiry..."
              rows={6}
              disabled={formState.isSubmitting}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending Message...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>* Required fields</p>
          <p className="mt-2">We respect your privacy. Your information will never be shared with third parties.</p>
        </div>
      </CardContent>
    </Card>
  )
}
