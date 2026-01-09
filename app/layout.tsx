import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Lexend } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import FloatingContactButton from "@/components/floating-contact-button"

// Load Inter font for body text
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

// Load Lexend font for headings and logo
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-lexend",
})

export const metadata: Metadata = {
  title: "Lumen Helix Solutions | Tech Consulting Firm",
  description:
    "Lumen Helix Solutions is a tech consulting firm that merges strategic insight with practical implementation, offering AI strategy & fusion, web development, graphic design, marketing strategy, and tech consulting services.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${lexend.variable} font-sans`}>
        <AnimatedBackground />
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <FloatingContactButton />
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
