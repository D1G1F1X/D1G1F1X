import { Suspense } from "react"
import type { Metadata } from "next"
import ContactForm from "@/components/contact-form"
import StandardizedHero from "@/components/standardized-hero"

export const metadata: Metadata = {
  title: "Contact Us | NUMO Oracle",
  description: "Get in touch with the NUMO Oracle team for support, inquiries, or feedback.",
}

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <StandardizedHero
        title="Contact"
        subtitle="Us"
        description="We're here to help! Reach out to us for any questions or support"
        backgroundImage="/images/hero/ethereal-connection-contact.png"
        badge={{
          text: "💬 Get in Touch",
          icon: "",
        }}
        features={[
          { icon: "📧", text: "Email Support", color: "cyan" },
          { icon: "💬", text: "Live Chat", color: "blue" },
          { icon: "📞", text: "Phone Support", color: "purple" },
        ]}
        gradient="from-cyan-900/20 via-blue-900/20 to-black"
      />
      <div className="container mx-auto py-8">
        <Suspense fallback={<div className="text-center py-20 text-white">Loading contact form...</div>}>
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </Suspense>
      </div>
    </div>
  )
}
