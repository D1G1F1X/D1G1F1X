import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar" // Re-import Navbar
import Footer from "@/components/footer" // Re-import Footer
import { Toaster } from "@/components/ui/toaster"
import BugReport from "@/components/bug-report"
import SiteAssistant from "@/components/site-assistant"
import ConstellationBackground from "@/components/constellation-background" // Re-import
import DeepOceanWaves from "@/components/deep-ocean-waves" // Re-import
import GeometricOverlay from "@/components/geometric-overlay" // Re-import
import ElementalEffects from "@/components/elemental-effects" // Re-import
import StarfieldBackground from "@/components/starfield-background" // Re-import
import { ErrorBoundary } from "@/components/error-boundary"
import SiteNewsBanner from "@/components/site-news-banner"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"
import { initializeImagePaths } from "@/lib/card-data-access" // Import the initializer
import AuthProvider from "@/components/auth-provider" // Import AuthProvider
import ManualCartProvider from "@/components/manual-cart-provider" // Import ManualCartProvider

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

// Fetch image paths on the server side and initialize the singleton
async function setupImagePaths() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ""
    const res = await fetch(`${baseUrl}/api/admin/card-image-paths`, {
      cache: "no-store",
    })
    if (!res.ok) {
      console.error(`Failed to fetch image paths in layout: ${res.statusText}`)
      return {}
    }
    const data = await res.json()
    initializeImagePaths(data)
    return data
  } catch (error) {
    console.error("Error fetching image paths in layout:", error)
    return {}
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Call the setup function to initialize image paths
  await setupImagePaths()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical images */}
        <link rel="preload" href="/back.jpg" as="image" />
        <link rel="preload" href="/cards/01cauldron-fire.jpg" as="image" />
        {/* ... other preloads ... */}
      </head>
      <body className={`${inter.className} min-h-screen bg-gradient-to-b from-black to-purple-950`}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
          <AuthProvider>
            <ManualCartProvider>
              <ErrorBoundary>
                <Suspense fallback={null}>
                  <StarfieldBackground />
                  <ConstellationBackground />
                  <GeometricOverlay />
                  <ElementalEffects />
                </Suspense>
                <Navbar /> {/* Re-added Navbar */}
                <div className="relative z-10 flex flex-col min-h-[calc(100vh-80px)] mt-20">
                  <SiteNewsBanner />
                  <main className="flex-grow">{children}</main>
                  <Footer /> {/* Re-added Footer */}
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
