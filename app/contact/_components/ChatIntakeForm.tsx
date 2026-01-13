"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, User, Building, CheckCircle } from "lucide-react"

export default function ChatIntakeForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email"
    return newErrors
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validateForm()
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/contact/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        setErrors({ submit: "Failed to submit form. Please try again." })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setErrors({ submit: "An error occurred. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8" role="status" aria-live="polite">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Thank You!</h3>
        <p className="text-gray-300">
          We've received your contact information. Our team will reach out to you shortly.
        </p>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-800 rounded-lg my-4">
      <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="intake-name" className="block text-sm font-medium text-gray-300 mb-1">
            Name{" "}
            <span className="text-red-500" aria-label="required">
              *
            </span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              id="intake-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded border ${
                errors.name ? "border-red-500" : "border-gray-600"
              } focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "intake-name-error" : undefined}
              disabled={loading}
            />
          </div>
          {errors.name && (
            <p id="intake-name-error" className="text-red-500 text-sm mt-1" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="intake-email" className="block text-sm font-medium text-gray-300 mb-1">
            Email{" "}
            <span className="text-red-500" aria-label="required">
              *
            </span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              id="intake-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded border ${
                errors.email ? "border-red-500" : "border-gray-600"
              } focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "intake-email-error" : undefined}
              disabled={loading}
            />
          </div>
          {errors.email && (
            <p id="intake-email-error" className="text-red-500 text-sm mt-1" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="intake-phone" className="block text-sm font-medium text-gray-300 mb-1">
            Phone
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              id="intake-phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="intake-company" className="block text-sm font-medium text-gray-300 mb-1">
            Company
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              id="intake-company"
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              disabled={loading}
            />
          </div>
        </div>

        {errors.submit && (
          <div className="p-3 bg-red-900/20 border border-red-500 rounded text-red-400 text-sm" role="alert">
            {errors.submit}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-600 text-white rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          aria-busy={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  )
}
