import type React from "react"
import type { Metadata } from "next"
import { Inter, Roboto } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import BugReport from "@/components/bug-report"
import SiteAssistant from "@/components/site-assistant"
import { AuthProvider } from "@/contexts/auth-context"
import { AdminAuthProvider } from "@/contexts/admin-auth-context"
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
import { initializeImagePaths } from "@/lib/card-data-access" // Ensure this is imported

const inter = Inter({ subsets: ["latin"] })
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
})

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

async function setupImagePaths() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ""
    console.log("Attempting to fetch image paths from:", `${baseUrl}/api/admin/card-image-paths`)
    const res = await fetch(`${baseUrl}/api/admin/card-image-paths`, {
      cache: "no-store", // Ensure fresh data on each request
    })
    if (!res.ok) {
      const errorText = await res.text()
      console.error(`Failed to fetch image paths in layout: ${res.status} ${res.statusText} - ${errorText}`)
      return {}
    }
    const data = await res.json()
    console.log("Successfully fetched image paths data. Number of keys:", data ? Object.keys(data).length : 0)
    initializeImagePaths(data) // Initialize the singleton with fetched paths
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
  // Call setupImagePaths to initialize image paths on server-side render
  await setupImagePaths()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/back.jpg" as="image" />
        {/* Preload a few common card images here if needed, or rely on client-side preloading */}
        <link rel="preload" href="/cards/01cauldron-fire.jpg" as="image" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", roboto.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
          <AuthProvider>
            <AdminAuthProvider>
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
