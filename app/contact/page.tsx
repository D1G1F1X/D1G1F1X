import ContactForm from "@/components/contact-form"
import NumoEmblemLogo from "@/components/numo-emblem-logo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | NUMO Oracle",
  description: "Get in touch with the NUMO Oracle team. We'd love to hear from you!",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center mb-8">
          <NumoEmblemLogo width={80} height={80} />
        </div>
        <h1 className="text-4xl font-bold text-center mb-2 text-purple-300">Contact Us</h1>
        <p className="text-lg text-center text-gray-300 mb-10">
          Have questions, feedback, or just want to say hello? Fill out the form below.
        </p>
        <ContactForm />
      </div>
    </div>
  )
}
