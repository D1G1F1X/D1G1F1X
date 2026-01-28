import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Lumen Helix Solutions",
  description: "Privacy Policy for Lumen Helix Solutions - learn how we protect and handle your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Privacy Policy</h1>

        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-gray-100 text-lg mb-8">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
            <p className="text-gray-100 leading-relaxed mb-4">
              Lumen Helix Solutions collects information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-gray-100 space-y-2 ml-4">
              <li>Name, email address, and contact information</li>
              <li>Company information and professional details</li>
              <li>Project requirements and communication history</li>
              <li>Technical information related to service delivery</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-100 leading-relaxed mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-gray-100 space-y-2 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Communicate with you about projects and services</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Send technical notices and service updates</li>
              <li>Analyze and improve our business operations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing</h2>
            <p className="text-gray-100 leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share information with
              trusted service providers who assist in our operations, subject to confidentiality agreements. We may also
              disclose information when required by law or to protect our rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
            <p className="text-gray-100 leading-relaxed">
              We implement industry-standard security measures to protect your personal information from unauthorized
              access, disclosure, alteration, or destruction. However, no method of transmission over the Internet is
              100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Data Retention</h2>
            <p className="text-gray-100 leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this
              Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights</h2>
            <p className="text-gray-100 leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-100 space-y-2 ml-4">
              <li>Access and receive a copy of your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to processing of your personal information</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">7. Cookies and Tracking</h2>
            <p className="text-gray-100 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience on our website. You can
              control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">8. Changes to This Policy</h2>
            <p className="text-gray-100 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">9. Contact Us</h2>
            <p className="text-gray-100 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
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
