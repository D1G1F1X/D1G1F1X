import PageHero from "@/components/page-hero"
import ServiceCard from "@/components/service-card"
import { services } from "@/lib/data"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Services() {
  return (
    <main className="min-h-screen bg-gray-900 relative overflow-hidden">
      <PageHero
        badge="Our Services"
        title="Comprehensive Solutions for Modern Businesses"
        subtitle="From strategic planning to technical implementation, we offer end-to-end services to drive your digital transformation"
      />

      {/* Glowing orbs for visual effect */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>

      <div className="container px-4 mx-auto py-16 relative z-10">
        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            At Lumen Helix, we've developed a comprehensive suite of services designed to address the complex challenges
            of today's digital landscape. Our integrated approach ensures that each service complements and enhances the
            others, creating a cohesive strategy for your business transformation.
          </p>
          <p className="text-xl text-gray-300 leading-relaxed">
            We believe that true digital transformation requires more than just implementing new technologies—it demands
            a holistic approach that considers your business objectives, organizational culture, and customer
            experience. Our services are designed with this philosophy in mind, delivering solutions that are both
            innovative and practical.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

        <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Business?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Contact us today to discuss how our integrated services can help you achieve your digital transformation
            goals.
          </p>
          <Button asChild size="lg" className="bg-primary-500 hover:bg-primary-600 text-white">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
