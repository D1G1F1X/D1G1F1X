import { Suspense } from "react"
import type { Metadata } from "next"
import ContactForm from "@/components/contact-form" // Assuming this component exists

export const metadata: Metadata = {
  title: "Contact Us | NUMO Oracle",
  description: "Get in touch with the NUMO Oracle team for support, inquiries, or feedback.",
}

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Unique Contact Hero Section */}
      <div className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-black"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/hero/ethereal-connection-contact.png')" }}
        ></div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-cyan-600/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/30">
              💬 Get in Touch
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Contact</span> Us
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            We're here to help! Reach out to us for any questions or support
          </p>
          <div className="flex justify-center gap-8 mt-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400">📧</span>
              <span>Email Support</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400">💬</span>
              <span>Live Chat</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-400">📞</span>
              <span>Phone Support</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-8">
        <Suspense fallback={<div className="text-center py-20 text-white">Loading contact form...</div>}>
          <div className="max-w-2xl mx-auto">
            {/* Assuming ContactForm component exists */}
            <ContactForm />
          </div>
        </Suspense>
      </div>
    </div>
  )
}
