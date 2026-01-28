import { Mail, Phone, MapPin, Globe } from "lucide-react"
import Link from "next/link"

export default function DirectContactTab() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "info@lumenhelix.com",
      href: "mailto:info@lumenhelix.com",
      description: "General inquiries & project discussions",
    },
    {
      icon: Phone,
      title: "Cincinnati Office",
      value: "(216) 440-1313",
      href: "tel:+12164401313",
      description: "Ohio office phone number",
    },
    {
      icon: Phone,
      title: "New York Office",
      value: "(812) 655-5857",
      href: "tel:+18126555857",
      description: "New York office phone number",
    },
    {
      icon: MapPin,
      title: "Cincinnati Address",
      value: "Cincinnati, Ohio",
      href: "#",
      description: "Primary office location",
    },
    {
      icon: Globe,
      title: "Website",
      value: "lumenhelix.com",
      href: "https://lumenhelix.com",
      description: "Visit our main website",
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-2">Direct Contact Information</h3>
        <p className="text-gray-300">Here's everything you need to get in touch with Lumen Helix Solutions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contactMethods.map((method, index) => {
          const Icon = method.icon
          const isClickable = method.href !== "#"

          const content = (
            <div
              key={index}
              className="h-full p-6 bg-gray-700/50 border border-gray-600 rounded-lg hover:border-primary-500/50 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <Icon className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-1">{method.title}</h4>
                  <p className="text-primary-300 font-medium break-all">{method.value}</p>
                  <p className="text-gray-400 text-sm mt-2">{method.description}</p>
                </div>
              </div>
            </div>
          )

          return isClickable ? (
            <Link key={index} href={method.href} target={method.title === "Website" ? "_blank" : undefined}>
              {content}
            </Link>
          ) : (
            content
          )
        })}
      </div>

      <div className="mt-8 bg-secondary-500/10 border border-secondary-500/30 rounded-lg p-6">
        <h4 className="text-white font-semibold mb-2">Research & Development Team</h4>
        <p className="text-gray-300 mb-4">
          Interested in our research or R&D collaboration? Visit our dedicated R&D page for research papers and team
          information.
        </p>
        <Link
          href="/research-development"
          className="text-secondary-400 hover:text-secondary-300 font-medium transition-colors"
        >
          Explore R&D Research →
        </Link>
      </div>
    </div>
  )
}
