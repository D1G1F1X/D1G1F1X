import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export default function TermsOfServicePage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center p-4">
      <Image
        src="/abstract-geometric-card.png" // Reusing a similar background
        alt="Terms of Service Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0 opacity-30"
      />
      <div className="absolute inset-0 bg-black/50 z-10" />

      <Card className="relative z-20 w-full max-w-4xl p-6 md:p-8 shadow-lg my-8">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary-foreground">Terms of Service</CardTitle>
          <p className="text-muted-foreground">Last Updated: July 25, 2024</p>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            Welcome to NUMO Oracle! These Terms of Service (&quot;Terms&quot;) govern your access to and use of the NUMO
            Oracle website, products, and services (collectively, the &quot;Services&quot;). By accessing or using our
            Services, you agree to be bound by these Terms.
          </p>

          <Separator className="my-6" />

          <h2>1. Acceptance of Terms</h2>
          <p>
            By creating an account, accessing, or using the Services, you signify that you have read, understood, and
            agree to be bound by these Terms, whether or not you are a registered user of our Services. If you do not
            agree to these Terms, do not use the Services.
          </p>

          <h2>2. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
            material, we will provide at least 30 days&apos; notice prior to any new terms taking effect. What
            constitutes a material change will be determined at our sole discretion.
          </p>

          <Separator className="my-6" />

          <h2>3. Use of Services</h2>
          <h3>Eligibility</h3>
          <p>
            You must be at least 13 years old to use the Services. By using the Services, you represent and warrant that
            you are at least 13 years old.
          </p>
          <h3>Account Responsibility</h3>
          <p>
            You are responsible for maintaining the confidentiality of your account password and are responsible for all
            activities that occur under your account. You agree to notify us immediately of any unauthorized use of your
            password or account.
          </p>
          <h3>Prohibited Conduct</h3>
          <p>
            You agree not to engage in any of the following prohibited activities: (a) copying, distributing, or
            disclosing any part of the Services in any medium; (b) transmitting spam, chain letters, or other
            unsolicited email; (c) attempting to interfere with, compromise the system integrity or security or decipher
            any transmissions to or from the servers running the Services; (d) taking any action that imposes an
            unreasonable or disproportionately large load on our infrastructure; (e) uploading invalid data, viruses,
            worms, or other software agents through the Services; (f) collecting or harvesting any personally
            identifiable information, including account names, from the Services; (g) using the Services for any
            commercial solicitation purposes; (h) impersonating another person or otherwise misrepresenting your
            affiliation with a person or entity, conducting fraud, hiding or attempting to hide your identity; (i)
            interfering with the proper working of the Services; (j) accessing any content on the Services through any
            technology or means other than those provided or authorized by the Services; or (k) bypassing the measures
            we may use to prevent or restrict access to the Services.
          </p>

          <Separator className="my-6" />

          <h2>4. Intellectual Property</h2>
          <p>
            All content on the Site, including text, graphics, logos, images, as well as the compilation thereof, and
            any software used on the Site, is the property of NUMO Oracle or its suppliers and protected by copyright
            and other laws that protect intellectual property and proprietary rights.
          </p>

          <Separator className="my-6" />

          <h2>5. Disclaimer of Warranties</h2>
          <p>
            The Services are provided on an &quot;as is&quot; and &quot;as available&quot; basis. Use of the Services is
            at your own risk. To the maximum extent permitted by applicable law, the Services are provided without
            warranties of any kind, whether express or implied, including, but not limited to, implied warranties of
            merchantability, fitness for a particular purpose, or non-infringement.
          </p>

          <Separator className="my-6" />

          <h2>6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, in no event shall NUMO Oracle, its affiliates, agents,
            directors, employees, suppliers or licensors be liable for any indirect, punitive, incidental, special,
            consequential or exemplary damages, including without limitation damages for loss of profits, goodwill, use,
            data or other intangible losses, arising out of or relating to the use of, or inability to use, this
            service.
          </p>

          <Separator className="my-6" />

          <h2>7. Governing Law</h2>
          <p>
            These Terms shall be governed by the laws of [Your State/Country], without regard to its conflict of law
            provisions.
          </p>

          <Separator className="my-6" />

          <h2>8. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p>
            Email:{" "}
            <a href="mailto:terms@numoracle.com" className="text-primary hover:underline">
              terms@numoracle.com
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
