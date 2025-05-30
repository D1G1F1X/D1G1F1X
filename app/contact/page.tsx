import PageHero from "@/components/page-hero"
import ContactForm from "@/components/contact-form" // Import the new component

export default function ContactPage() {
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
              {/* Use the new ContactForm component here */}
              <ContactForm />
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
