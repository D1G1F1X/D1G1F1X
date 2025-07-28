import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | NUMO Oracle",
  description: "Privacy Policy for NUMO Oracle - Learn how we protect your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-purple-500">Privacy Policy</h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-lg mb-6">Last Updated: May 12, 2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>
            NUMO Oracle ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how
            we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          </p>
          <p>
            Please read this Privacy Policy carefully. By accessing or using our website and services, you acknowledge
            that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p>We may collect information about you in a variety of ways:</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Personal Data</h3>
          <p>
            When you register for an account, purchase products, or use certain features of our website, we may ask for
            personally identifiable information, such as your:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Name</li>
            <li>Email address</li>
            <li>Mailing address</li>
            <li>Phone number</li>
            <li>Payment information</li>
            <li>Date of birth (for numerology calculations)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Usage Data</h3>
          <p>
            We automatically collect certain information when you visit, use, or navigate our website. This information
            may include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device type</li>
            <li>Operating system</li>
            <li>Pages visited</li>
            <li>Time and date of your visit</li>
            <li>Time spent on pages</li>
            <li>Referring website addresses</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p>We may use the information we collect about you for various purposes, including to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Create and manage your account</li>
            <li>Process transactions and send related information</li>
            <li>Provide and maintain our services</li>
            <li>Respond to inquiries and offer support</li>
            <li>Send administrative information</li>
            <li>Send marketing and promotional communications</li>
            <li>Improve our website and services</li>
            <li>Generate personalized numerology readings and card interpretations</li>
            <li>Protect against unauthorized access and legal liability</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Disclosure of Your Information</h2>
          <p>We may share information we have collected about you in certain situations, including:</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Business Transfers</h3>
          <p>
            If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may
            be transferred as part of that transaction.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Third-Party Service Providers</h3>
          <p>
            We may share your information with third-party service providers who perform services on our behalf, such as
            payment processing, data analysis, email delivery, hosting services, and customer service.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Legal Requirements</h3>
          <p>
            We may disclose your information where required to do so by law or in response to valid requests by public
            authorities.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to protect your personal information. While
            we have taken reasonable steps to secure the information you provide to us, please be aware that no security
            measures are perfect or impenetrable, and we cannot guarantee the security of your information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>The right to access personal information we hold about you</li>
            <li>The right to request correction of inaccurate information</li>
            <li>The right to request deletion of your information</li>
            <li>The right to withdraw consent</li>
            <li>The right to object to processing of your information</li>
            <li>The right to data portability</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided in the "Contact Us" section
            below.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
          <p>
            Our website and services are not directed to children under 13 years of age. We do not knowingly collect
            personal information from children under 13. If you are a parent or guardian and believe your child has
            provided us with personal information, please contact us.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy
            Policy periodically for any changes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>If you have questions or concerns about this Privacy Policy, please contact us at:</p>
          <p className="mt-4">
            <strong>Email:</strong> privacy@numoracle.com
            <br />
            <strong>Address:</strong> NUMO Oracle, 123 Mystical Lane, Spiritual City, SC 12345
          </p>
        </section>
      </div>
    </div>
  )
}
