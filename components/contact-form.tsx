"use client"

import { useActionState, useEffect } from "react"
import { Button } from "@/components/ui/button"
// Ensuring this path is correctly using the standard alias
import { submitContactForm } from "@/app/actions/contact"

const initialState = {
  success: false,
  message: "",
}

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)

  useEffect(() => {
    if (state?.success) {
      const form = document.getElementById("homepage-contact-form") as HTMLFormElement
      if (form) {
        setTimeout(() => {
          form.reset()
        }, 3000)
      }
    }
  }, [state?.success])

  return (
    <div className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700/50 hover:border-primary-500/30 transition-all duration-500 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="formGradientContactComponent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            d="M0,0 L800,0 L800,600 L0,600 Z M400,50 A350,350 0 1,0 400,550 A350,350 0 1,0 400,50 Z M400,150 A250,250 0 1,1 400,450 A250,250 0 1,1 400,150 Z"
            fill="none"
            stroke="url(#formGradientContactComponent)"
            strokeWidth="0.5"
          />
          <path
            d="M50,300 L350,300 M450,300 L750,300 M400,50 L400,250 M400,350 L400,550"
            stroke="url(#formGradientContactComponent)"
            strokeWidth="0.5"
            strokeDasharray="5,5"
          />
        </svg>
      </div>

      <div className="flex items-center mb-8">
        <div className="w-12 h-12 flex items-center justify-center bg-primary-500/20 rounded-full mr-4 border border-primary-500/30">
          <div className="w-3 h-3 bg-primary-400 rounded-full animate-pulse"></div>
        </div>
        <h3 className="text-2xl font-bold text-white">Send Us a Message</h3>
      </div>

      {state && state.message && (
        <div
          className={`mb-6 p-4 rounded-lg border ${
            state.success
              ? "bg-green-900/20 border-green-500/30 text-green-400"
              : "bg-red-900/20 border-red-500/30 text-red-400"
          }`}
        >
          <div className="flex items-center">
            {state.success ? (
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {state.message}
          </div>
        </div>
      )}

      <form id="homepage-contact-form" action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name-homepage" className="block text-sm font-medium text-gray-300">
              Name *
            </label>
            <input
              type="text"
              id="name-homepage"
              name="name"
              required
              disabled={isPending}
              className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white transition-all duration-300 disabled:opacity-50"
              placeholder="Your name"
              autoComplete="name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email-homepage" className="block text-sm font-medium text-gray-300">
              Email *
            </label>
            <input
              type="email"
              id="email-homepage"
              name="email"
              required
              disabled={isPending}
              className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white transition-all duration-300 disabled:opacity-50"
              placeholder="Your email"
              autoComplete="email"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="subject-homepage" className="block text-sm font-medium text-gray-300">
            Subject *
          </label>
          <input
            type="text"
            id="subject-homepage"
            name="subject"
            required
            disabled={isPending}
            className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white transition-all duration-300 disabled:opacity-50"
            placeholder="Subject"
            autoComplete="off"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="message-homepage" className="block text-sm font-medium text-gray-300">
            Message *
          </label>
          <textarea
            id="message-homepage"
            name="message"
            rows={5}
            required
            disabled={isPending}
            className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white transition-all duration-300 disabled:opacity-50"
            placeholder="Your message"
            autoComplete="off"
          ></textarea>
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-lg hover:shadow-primary-500/20 transition-all duration-300 disabled:opacity-50"
        >
          {isPending ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </div>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </div>
  )
}
