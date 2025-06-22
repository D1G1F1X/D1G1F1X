import type React from "react"
import { Inter, Cinzel, Montserrat } from "next/font/google" // Added Cinzel and Montserrat
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

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-serif" }) // Defined Cinzel font variable
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-body" }) // Defined Montserrat font variable

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          cinzel.variable, // Applied Cinzel font variable
          montserrat.variable, // Applied Montserrat font variable
        )}
      >
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

export const metadata = {
      generator: 'v0.dev'
    };
