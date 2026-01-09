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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/contact/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
      }
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Thank You!</h3>
        <p className="text-gray-300">
          We've received your contact information. Our team will reach out to you shortly.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-2">Contact Information</h3>
      <p className="text-gray-300 mb-6">Please share your details so we can follow up with you soon.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 bg-gray-700/50 px-4 py-3 rounded-lg border border-gray-600">
            <User className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3 bg-gray-700/50 px-4 py-3 rounded-lg border border-gray-600">
            <Mail className="w-4 h-4 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3 bg-gray-700/50 px-4 py-3 rounded-lg border border-gray-600">
            <Phone className="w-4 h-4 text-gray-400" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3 bg-gray-700/50 px-4 py-3 rounded-lg border border-gray-600">
            <Building className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="company"
              placeholder="Company (Optional)"
              value={formData.company}
              onChange={handleChange}
              className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="bg-gray-700/50 px-4 py-3 rounded-lg border border-gray-600">
          <textarea
            name="subject"
            placeholder="What can we help you with?"
            value={formData.subject}
            onChange={handleChange}
            rows={3}
            className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-600 text-white rounded-lg transition-colors font-semibold disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Submit & Get Follow-up"}
        </button>
      </form>
    </div>
  )
}
