import { Suspense } from "react"
import type { Metadata } from "next"
import ContactForm from "@/components/contact-form" // Assuming this component exists
import HeroSection from "@/components/hero-section" // Import HeroSection

export const metadata: Metadata = {
  title: "Contact Us | NUMO Oracle",
  description: "Get in touch with the NUMO Oracle team for support, inquiries, or feedback.",
}

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <HeroSection
        title="Contact Us"
        description="We're here to help! Reach out to us for any questions or support."
        backgroundImage="/images/hero/ethereal-connection-contact.png"
      />
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
