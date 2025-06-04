import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | NUMO Oracle",
  description: "Terms of Service for NUMO Oracle - Please read these terms carefully before using our services.",
}

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-purple-500">Terms of Service</h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-lg mb-6">Last Updated: May 12, 2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
          <p>
            These Terms of Service constitute a legally binding agreement made between you and NUMO Oracle ("we," "us,"
            or "our"), concerning your access to and use of the NUMO Oracle website and services.
          </p>
          <p>
            By accessing or using our website and services, you agree to be bound by these Terms of Service. If you
            disagree with any part of these terms, you may not access the website or use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property Rights</h2>
          <p>
            The NUMO Oracle card deck, numerology system, website content, features, and functionality are owned by NUMO
            Oracle and are protected by international copyright, trademark, patent, trade secret, and other intellectual
            property or proprietary rights laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform,
            republish, download, store, or transmit any of our materials without our express written consent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
          <p>
            When you create an account with us, you must provide accurate, complete, and current information. You are
            responsible for safeguarding the password and for all activities that occur under your account.
          </p>
          <p>
            You agree to notify us immediately of any unauthorized access to or use of your account. We reserve the
            right to disable any user account at any time if, in our opinion, you have violated any provision of these
            Terms of Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Products and Purchases</h2>
          <p>
            All purchases through our website are subject to product availability. We reserve the right to discontinue
            any product at any time.
          </p>
          <p>
            Prices for our products are subject to change without notice. We reserve the right to modify or discontinue
            the service without notice at any time.
          </p>
          <p>
            We shall not be liable to you or to any third party for any modification, price change, suspension, or
            discontinuance of the service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Disclaimer of Warranties</h2>
          <p>
            The NUMO Oracle card readings and numerology calculations are provided for entertainment and self-reflection
            purposes only. They are not intended to replace professional advice, diagnosis, or treatment.
          </p>
          <p>
            Our website and services are provided on an "as is" and "as available" basis, without any warranties of any
            kind, either express or implied. We disclaim all warranties, including implied warranties of
            merchantability, fitness for a particular purpose, and non-infringement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
          <p>
            In no event shall NUMO Oracle, its directors, employees, partners, agents, suppliers, or affiliates be
            liable for any indirect, incidental, special, consequential, or punitive damages, including without
            limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Your access to or use of or inability to access or use the service</li>
            <li>Any conduct or content of any third party on the service</li>
            <li>Any content obtained from the service</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless NUMO Oracle and its licensees and licensors, and their
            employees, contractors, agents, officers, and directors, from and against any and all claims, damages,
            obligations, losses, liabilities, costs or debt, and expenses, including but not limited to attorney's fees,
            arising from your use of and access to the service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
          <p>
            These Terms shall be governed by and defined following the laws of [Your Country/State]. NUMO Oracle and
            yourself irrevocably consent that the courts of [Your Country/State] shall have exclusive jurisdiction to
            resolve any dispute which may arise in connection with these terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
            material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
          </p>
          <p>
            By continuing to access or use our service after those revisions become effective, you agree to be bound by
            the revised terms. If you do not agree to the new terms, please stop using the service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p className="mt-4">
            <strong>Email:</strong> terms@numoracle.com
            <br />
            <strong>Address:</strong> NUMO Oracle, 123 Mystical Lane, Spiritual City, SC 12345
          </p>
        </section>
      </div>
    </div>
  )
}
