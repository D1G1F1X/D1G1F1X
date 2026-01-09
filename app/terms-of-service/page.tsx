import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Lumen Helix Solutions",
  description:
    "Terms of Service for Lumen Helix Solutions - quantum computing, AI ethics, and advanced software development services.",
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Terms of Service</h1>

        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-gray-100 text-lg mb-8">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-100 leading-relaxed">
              By accessing and using the services provided by Lumen Helix Solutions ("we," "us," or "our"), you accept
              and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our
              services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">2. Services</h2>
            <p className="text-gray-100 leading-relaxed mb-4">
              Lumen Helix Solutions provides quantum computing research, AI ethics consulting, advanced software
              development, and related professional services. Our services include but are not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-100 space-y-2 ml-4">
              <li>Quantum computing research and development</li>
              <li>AI ethics and responsible AI implementation</li>
              <li>Custom software development and consulting</li>
              <li>Quaternionic computing frameworks (Cauldron, RUBIC, NUMO Field)</li>
              <li>Research and consulting services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">3. Intellectual Property</h2>
            <p className="text-gray-100 leading-relaxed">
              All content, research, code, and materials provided by Lumen Helix Solutions remain our intellectual
              property unless otherwise specified in a separate written agreement. Clients receive licenses to use
              deliverables as specified in their service agreements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">4. Confidentiality</h2>
            <p className="text-gray-100 leading-relaxed">
              We maintain strict confidentiality regarding all client information, research data, and project details.
              Any confidential information shared during the course of our engagement will be protected in accordance
              with industry best practices and applicable laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-100 leading-relaxed">
              Lumen Helix Solutions shall not be liable for any indirect, incidental, special, consequential, or
              punitive damages resulting from your use of our services. Our total liability shall not exceed the amount
              paid for the specific service in question.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">6. Modifications to Terms</h2>
            <p className="text-gray-100 leading-relaxed">
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately
              upon posting to this page. Continued use of our services after changes constitutes acceptance of the
              modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">7. Contact Information</h2>
            <p className="text-gray-100 leading-relaxed">
              For questions about these Terms of Service, please contact us at:
              <br />
              <strong className="text-white">Email:</strong> contact@lumenhelixsolutions.com
              <br />
              <strong className="text-white">Phone:</strong> (216) 282-1366
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
