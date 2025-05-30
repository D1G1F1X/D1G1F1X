"use client"

import PageHero from "@/components/page-hero"
import TallyForm from "@/components/tally-form" // Import the new TallyForm component
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden text-white">
      <PageHero
        badge="Get In Touch"
        badgeVariant="primary"
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out to discuss how we can help transform your business."
      />

      <div className="container px-4 mx-auto py-12 lg:py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Left Column: Contact Details */}
            <div className="lg:w-2/5">
              <h2 className="text-3xl font-bold text-white mb-6 leading-tight">Let's Work Together</h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Ready to transform your business with our integrated solutions? Connect with our team of experts today.
                Whether you have a specific project in mind or need guidance on your digital strategy, we're eager to
                help your business thrive in the digital age.
              </p>

              <div className="space-y-8">
                <div className="flex items-start group">
                  <div className="bg-gray-800/90 p-4 rounded-xl mr-5 border border-gray-700/50 group-hover:border-primary-500/30 transition-all duration-300 shadow-lg group-hover:shadow-primary-500/10">
                    <Mail className="h-6 w-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-primary-400 transition-colors">
                      Email Us
                    </h3>
                    <p className="text-gray-300 mb-1">For general inquiries:</p>
                    <a
                      href="mailto:info@LumenHelix.com"
                      className="text-primary-400 hover:text-primary-300 transition-colors block"
                    >
                      info@LumenHelix.com
                    </a>
                    <a
                      href="mailto:LumenHelixSolutions@gmail.com"
                      className="text-primary-400 hover:text-primary-300 transition-colors block"
                    >
                      LumenHelixSolutions@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-gray-800/90 p-4 rounded-xl mr-5 border border-gray-700/50 group-hover:border-primary-500/30 transition-all duration-300 shadow-lg group-hover:shadow-primary-500/10">
                    <Phone className="h-6 w-6 text-primary-400" />
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
                    <MapPin className="h-6 w-6 text-primary-400" />
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

            {/* Right Column: Tally Form Embed */}
            <div className="lg:w-3/5">
              <div className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700/50 hover:border-primary-500/30 transition-all duration-500 relative overflow-hidden group">
                <TallyForm
                  embedSrc="https://tally.so/embed/n9ypaE?hideTitle=1&transparentBackground=1&dynamicHeight=1"
                  title="Tell us about your idea..."
                  height="600" // Adjusted height for potentially dynamic content
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glowing orbs - kept for consistent page styling */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-secondary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow pointer-events-none"></div>
    </div>
  )
}
