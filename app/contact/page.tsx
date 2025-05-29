"use client"

import { useActionState, useEffect } from "react"
import PageHero from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { submitContactForm } from "@/app/actions/contact"

const initialState = {
  success: false,
  message: "",
}

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)

  // Reset form on successful submission
  useEffect(() => {
    if (state?.success) {
      const form = document.getElementById("contact-form") as HTMLFormElement
      if (form) {
        setTimeout(() => {
          form.reset()
        }, 100)
      }
    }
  }, [state?.success])

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <PageHero
        badge="Get In Touch"
        badgeVariant="primary"
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out to discuss how we can help transform your business."
      />

      <div className="container px-4 mx-auto py-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-white mb-6 leading-tight">Let's Work Together</h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Ready to transform your business with our integrated solutions? Connect with our team of experts today.
                Whether you have a specific project in mind or need guidance on your digital strategy, we're eager to
                help your business thrive in the digital age.
              </p>

              <div className="space-y-8">
                <div className="flex items-start group">
                  <div className="bg-gray-800/90 p-4 rounded-xl mr-5 border border-gray-700/50 group-hover:border-primary-500/30 transition-all duration-300 shadow-lg group-hover:shadow-primary-500/10">
                    <svg className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-primary-400 transition-colors">
                      Email Us
                    </h3>
                    <p className="text-gray-300 mb-1">For general inquiries:</p>
                    <a
                      href="mailto:info@LumenHelix.com"
                      className="text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      info@LumenHelix.com
                    </a>
                    <br />
                    <a
                      href="mailto:LumenHelixSolutions@gmail.com"
                      className="text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      LumenHelixSolutions@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-gray-800/90 p-4 rounded-xl mr-5 border border-gray-700/50 group-hover:border-primary-500/30 transition-all duration-300 shadow-lg group-hover:shadow-primary-500/10">
                    <svg className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-primary-400 transition-colors">
                      Call Us
                    </h3>
                    <p className="text-gray-300 mb-1">Monday-Friday, 9am-5pm:</p>
                    <a href="tel:+14842020272" className="text-primary-400 hover:text-primary-300 transition-colors">
                      (484) 202-0272
                    </a>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-gray-800/90 p-4 rounded-xl mr-5 border border-gray-700/50 group-hover:border-primary-500/30 transition-all duration-300 shadow-lg group-hover:shadow-primary-500/10">
                    <svg className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-primary-400 transition-colors">
                      Visit Us
                    </h3>
                    <p className="text-gray-300 mb-1">Our headquarters:</p>
                    <address className="text-primary-400 not-italic">Akron, Ohio</address>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700/50 hover:border-primary-500/30 transition-all duration-500 relative overflow-hidden group">
                {/* Enhanced digital circuit accent */}
                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
                  <svg width="100%" height="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="formGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,0 L800,0 L800,600 L0,600 Z M400,50 A350,350 0 1,0 400,550 A350,350 0 1,0 400,50 Z M400,150 A250,250 0 1,1 400,450 A250,250 0 1,1 400,150 Z"
                      fill="none"
                      stroke="url(#formGradient)"
                      strokeWidth="0.5"
                    />
                    <path
                      d="M50,300 L350,300 M450,300 L750,300 M400,50 L400,250 M400,350 L400,550"
                      stroke="url(#formGradient)"
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

                {/* Status Message */}
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

                <form id="contact-form" action={formAction} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        disabled={isPending}
                        className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white transition-all duration-300 disabled:opacity-50"
                        placeholder="Your name"
                        autoComplete="name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
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
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      disabled={isPending}
                      className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white transition-all duration-300 disabled:opacity-50"
                      placeholder="Subject"
                      autoComplete="off"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                      Message *
                    </label>
                    <textarea
                      id="message"
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
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
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
            </div>
          </div>
        </div>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-secondary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
    </div>
  )
}
