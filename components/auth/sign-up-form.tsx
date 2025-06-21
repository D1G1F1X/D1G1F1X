"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEmailService } from "@/hooks/use-email-service" // Import the hook
import { toast } from "@/components/ui/use-toast" // Import toast

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "", // Added userName
  })
  const { sendWelcomeEmail, isLoading, error } = useEmailService() // Use the hook

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return // Prevent multiple submissions

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      return
    }

    // Simulate user registration and then send welcome email
    // In a real app, this would involve a server action or API call to register the user
    // and then trigger the email send. For this example, we'll simulate success.
    console.log("Simulating user registration for:", formData.email)

    // Send welcome email
    const result = await sendWelcomeEmail(formData.email, formData.userName)

    if (result.success) {
      toast({
        title: "Registration Successful!",
        description: result.message || "Welcome email sent. Please check your inbox.",
        variant: "default",
      })
      setFormData({ email: "", password: "", confirmPassword: "", userName: "" }) // Clear form
    } else {
      toast({
        title: "Registration Error!",
        description: result.error || "Failed to send welcome email. Please try again.",
        variant: "destructive",
      })
      console.error("Welcome email send error:", result.details || result.error)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="userName">User Name</Label>
            <Input id="userName" value={formData.userName} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Button>
          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        </form>
      </CardContent>
    </Card>
  )
}
