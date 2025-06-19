import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import BugReport from "@/components/bug-report"
import SiteAssistant from "@/components/site-assistant"
import { AuthProvider } from "@/contexts/auth-context"
import { ManualCartProvider } from "@/contexts/manual-cart-context"
// Removed PayPalScriptProvider
import ConstellationBackground from "@/components/constellation-background"
import DeepOceanWaves from "@/components/deep-ocean-waves"
import GeometricOverlay from "@/components/geometric-overlay"
import ElementalEffects from "@/components/elemental-effects"
import StarfieldBackground from "@/components/starfield-background"
import { ErrorBoundary } from "@/components/error-boundary"
import SiteNewsBanner from "@/components/site-news-banner"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NUMO Oracle",
  description: "Discover the wisdom of the NUMO Oracle cards",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://numoracle.com",
    siteName: "NUMO Oracle",
    title: "NUMO Oracle - Numerology and Oracle Card Readings",
    description: "Discover the wisdom of the NUMO Oracle cards and numerology readings",
    images: [
      {
        url: "/numoracle-full-logo.png",
        width: 1200,
        height: 630,
        alt: "NUMO Oracle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NUMO Oracle - Numerology and Oracle Card Readings",
    description: "Discover the wisdom of the NUMO Oracle cards and numerology readings",
    images: ["/numoracle-full-logo.png"],
    creator: "@NUMOOracle",
  },
  generator: "v0.dev",
}

// Removed PAYPAL_CLIENT_ID constant as it's no longer used here

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-gradient-to-b from-black to-purple-950`}>
        {/* Removed PayPalScriptProvider wrapper */}
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
          <AuthProvider>
            <ManualCartProvider>
              <ErrorBoundary>
                <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
                  <StarfieldBackground />
                  <ConstellationBackground />
                  <GeometricOverlay />
                  <ElementalEffects />
                </Suspense>
                <Navbar />
                <div className="relative z-10 flex flex-col min-h-[calc(100vh-80px)] mt-20">
                  <SiteNewsBanner />
                  <main className="flex-grow">{children}</main>
                  <Footer />
                </div>
                <DeepOceanWaves />
                <BugReport />
                <SiteAssistant />
                <Toaster />
                <Analytics />
              </ErrorBoundary>
            </ManualCartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
