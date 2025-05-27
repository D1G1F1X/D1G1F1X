import PageHero from "@/components/page-hero"
import { Button } from "@/components/ui/button"

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
                      href="mailto:info@lumenhelix.com"
                      className="text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      info@lumenhelix.com
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
                    <a href="tel:+15551234567" className="text-primary-400 hover:text-primary-300 transition-colors">
                      +1 (555) 123-4567
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
                    <address className="text-primary-400 not-italic">
                      123 Innovation Drive
                      <br />
                      Tech City, TC 12345
                    </address>
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

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white transition-all duration-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white transition-all duration-300"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white transition-all duration-300"
                      placeholder="Subject"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white transition-all duration-300"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-lg hover:shadow-primary-500/20 transition-all duration-300">
                    Send Message
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
