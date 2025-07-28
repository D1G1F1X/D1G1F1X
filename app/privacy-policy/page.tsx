import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center p-4">
      <Image
        src="/privacy-policy-background.png"
        alt="Privacy Policy Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0 opacity-30"
      />
      <div className="absolute inset-0 bg-black/50 z-10" />

      <Card className="relative z-20 w-full max-w-4xl p-6 md:p-8 shadow-lg my-8">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary-foreground">Privacy Policy</CardTitle>
          <p className="text-muted-foreground">Last Updated: July 25, 2024</p>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            Your privacy is important to us. This Privacy Policy explains how NUMO Oracle collects, uses, discloses, and
            safeguards your information when you visit our website numoracle.com, including any other media form, media
            channel, mobile website, or mobile application related or connected thereto (collectively, the “Site”).
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please
            do not access the Site.
          </p>

          <Separator className="my-6" />

          <h2>1. Collection of Your Information</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may collect on the Site
            includes:
          </p>
          <h3>Personal Data</h3>
          <p>
            Personally identifiable information, such as your name, shipping address, email address, and telephone
            number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily
            give to us when you register with the Site or when you choose to participate in various activities related
            to the Site, such as online chat and message boards.
          </p>
          <h3>Derivative Data</h3>
          <p>
            Information our servers automatically collect when you access the Site, such as your IP address, your
            browser type, your operating system, your access times, and the pages you have viewed directly before and
            after accessing the Site.
          </p>
          <h3>Financial Data</h3>
          <p>
            Financial information, such as data related to your payment method (e.g., valid credit card number, card
            brand, expiration date) that we may collect when you purchase, order, return, exchange, or request
            information about our services from the Site.
          </p>

          <Separator className="my-6" />

          <h2>2. Use of Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized
            experience. Specifically, we may use information collected about you via the Site to:
          </p>
          <ul>
            <li>Create and manage your account.</li>
            <li>
              Process your transactions and send you related information, including purchase confirmations and invoices.
            </li>
            <li>Email you regarding your account or order.</li>
            <li>Enable user-to-user communications.</li>
            <li>Generate personalized oracle readings and numerology reports.</li>
            <li>Request feedback and contact you about your use of the Site.</li>
            <li>Resolve disputes and troubleshoot problems.</li>
            <li>Respond to product and customer service requests.</li>
            <li>Send you a newsletter.</li>
          </ul>

          <Separator className="my-6" />

          <h2>3. Disclosure of Your Information</h2>
          <p>
            We may share information we have collected about you in certain situations. Your information may be
            disclosed as follows:
          </p>
          <h3>By Law or to Protect Rights</h3>
          <p>
            If we believe the release of information about you is necessary to respond to legal process, to investigate
            or remedy potential violations of our policies, or to protect the rights, property, or safety of others, we
            may share your information as permitted or required by any applicable law, rule, or regulation.
          </p>
          <h3>Third-Party Service Providers</h3>
          <p>
            We may share your information with third parties that perform services for us or on our behalf, including
            payment processing, data analysis, email delivery, hosting services, customer service, and marketing
            assistance.
          </p>

          <Separator className="my-6" />

          <h2>4. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information.
            While we have taken reasonable steps to secure the personal information you provide to us, please be aware
            that despite our efforts, no security measures are perfect or impenetrable, and no method of data
            transmission can be guaranteed against any interception or other type of misuse.
          </p>

          <Separator className="my-6" />

          <h2>5. Policy for Children</h2>
          <p>
            We do not knowingly solicit information from or market to children under the age of 13. If you become aware
            of any data we have collected from children under age 13, please contact us using the contact information
            provided below.
          </p>

          <Separator className="my-6" />

          <h2>6. Contact Us</h2>
          <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
          <p>
            Email:{" "}
            <a href="mailto:privacy@numoracle.com" className="text-primary hover:underline">
              privacy@numoracle.com
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
