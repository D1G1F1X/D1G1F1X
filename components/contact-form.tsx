"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEmailService } from "@/hooks/use-email-service" // Import the hook
import { toast } from "@/components/ui/use-toast" // Import toast

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const { sendContactFormEmail, isLoading, error } = useEmailService() // Use the hook

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return // Prevent multiple submissions

    const result = await sendContactFormEmail(formData)

    if (result.success) {
      toast({
        title: "Success!",
        description: result.message || "Your message has been sent.",
        variant: "default",
      })
      setFormData({ name: "", email: "", subject: "", message: "" }) // Clear form
    } else {
      toast({
        title: "Error!",
        description: result.error || "Failed to send your message. Please try again.",
        variant: "destructive",
      })
      console.error("Contact form submission error:", result.details || result.error)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" value={formData.subject} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" value={formData.message} onChange={handleChange} required rows={5} />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Message"}
          </Button>
          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        </form>
      </CardContent>
    </Card>
  )
}
