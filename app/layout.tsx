import type React from "react"
import { Roboto } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { ErrorBoundary } from "@/components/error-boundary"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ManualCartProvider } from "@/contexts/manual-cart-context"
import BugReport from "@/components/bug-report"
import SiteAssistant from "@/components/site-assistant"
import DeepOceanWaves from "@/components/deep-ocean-waves"
import StarfieldBackground from "@/components/starfield-background"
import ConstellationBackground from "@/components/constellation-background"
import GeometricOverlay from "@/components/geometric-overlay"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", roboto.variable)}>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <AuthProvider>
              <ManualCartProvider>
                {/* Animated Backgrounds */}
                <Suspense fallback={null}>
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
                </Suspense>
              </ManualCartProvider>
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
