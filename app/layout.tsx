import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ErrorBoundary } from "@/components/error-boundary"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Roboto } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { AuthProvider } from "@/contexts/auth-context"
import { ManualCartProvider } from "@/contexts/manual-cart-context"
import BugReport from "@/components/bug-report"
import SiteAssistant from "@/components/site-assistant"
import DeepOceanWaves from "@/components/deep-ocean-waves"
import StarfieldBackground from "@/components/starfield-background"
import ConstellationBackground from "@/components/constellation-background"
import GeometricOverlay from "@/components/geometric-overlay"

const fontSans = Roboto({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Numoracle - Oracle Cards & Numerology",
  description: "Discover your path with Numoracle oracle cards and numerology tools",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <AuthProvider>
              <ManualCartProvider>
                {/* Animated Backgrounds */}
                <DeepOceanWaves />
                <StarfieldBackground />
                <ConstellationBackground />
                <GeometricOverlay />
                <div className="relative flex min-h-screen flex-col">
                  <Navbar />
                  <main className="flex-1">{children}</main>
                  <Footer />
                  <BugReport />
                  <SiteAssistant />
                </div>
                <Toaster />
              </ManualCartProvider>
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
