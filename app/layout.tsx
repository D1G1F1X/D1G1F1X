import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Lexend } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import { Analytics } from "@vercel/analytics/next"
import FloatingContactButton from "@/components/floating-contact-button"
import SkipToContent from "@/components/skip-to-content"

// Load Inter font for body text
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

// Load Lexend font for headings and logo
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-lexend",
})

export const metadata: Metadata = {
  title: "Lumen Helix Solutions | AI & Tech Consulting",
  description:
    "Lumen Helix Solutions merges strategic insight with practical implementation. We offer AI strategy, web development, graphic design, marketing strategy, and comprehensive tech consulting services.",
  generator: "Next.js",
  keywords: [
    "tech consulting",
    "AI strategy",
    "web development",
    "graphic design",
    "marketing strategy",
    "digital transformation",
  ],
  authors: [{ name: "Lumen Helix Solutions" }],
  creator: "Lumen Helix Solutions",
  publisher: "Lumen Helix Solutions",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lumenhelix.com",
    siteName: "Lumen Helix Solutions",
    title: "Lumen Helix Solutions | AI & Tech Consulting",
    description:
      "Strategic tech consulting firm specializing in AI strategy, web development, and digital transformation.",
    images: [
      {
        url: "https://lumenhelix.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lumen Helix Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@lumenhelix",
    creator: "@lumenhelix",
    title: "Lumen Helix Solutions | AI & Tech Consulting",
    description:
      "Strategic tech consulting firm specializing in AI strategy, web development, and digital transformation.",
    images: ["https://lumenhelix.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://lumenhelix.com",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Lumen Helix Solutions",
              url: "https://lumenhelix.com",
              logo: "https://lumenhelix.com/images/logo-bulb.png",
              description:
                "Strategic tech consulting firm specializing in AI strategy, web development, graphic design, and digital transformation.",
              sameAs: [
                "https://twitter.com/lumenhelix",
                "https://linkedin.com/company/lumen-helix",
                "https://facebook.com/lumenhelix",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Akron",
                addressRegion: "Ohio",
                addressCountry: "US",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                telephone: "+1-484-202-0272",
                email: "info@lumenhelix.com",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${lexend.variable} font-sans`}>
        <SkipToContent />
        <AnimatedBackground />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          <main id="main-content" className="focus:outline-none">
            {children}
          </main>
          <Footer />
          <FloatingContactButton />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
