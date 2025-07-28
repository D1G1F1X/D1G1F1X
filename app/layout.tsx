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
import { AdminAuthProvider } from "@/contexts/admin-auth-context" // Ensure AdminAuthProvider is imported
import { ManualCartProvider } from "@/contexts/manual-cart-context"
import ConstellationBackground from "@/components/constellation-background"
import DeepOceanWaves from "@/components/deep-ocean-waves"
import GeometricOverlay from "@/components/geometric-overlay"
import ElementalEffects from "@/components/elemental-effects"
import StarfieldBackground from "@/components/starfield-background"
import { ErrorBoundary } from "@/components/error-boundary"
import SiteNewsBanner from "@/components/site-news-banner"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"
import { initializeImagePaths } from "@/lib/card-data-access" // Import the initializer

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
    console.log("Attempting to fetch image paths from:", `${baseUrl}/api/admin/card-image-paths`)
    const res = await fetch(`${baseUrl}/api/admin/card-image-paths`, {
      cache: "no-store", // Ensure fresh data
    })
    if (!res.ok) {
      const errorText = await res.text()
      console.error(`Failed to fetch image paths in layout: ${res.status} ${res.statusText} - ${errorText}`)
      return {}
    }
    const data = await res.json()
    console.log("Successfully fetched image paths data:", data ? Object.keys(data).length : 0, "keys")
    initializeImagePaths(data) // Initialize the singleton
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
            <AdminAuthProvider>
              {" "}
              {/* Ensure AdminAuthProvider wraps content */}
              <ManualCartProvider>
                <ErrorBoundary>
                  <Suspense fallback={null}>
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
            </AdminAuthProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
