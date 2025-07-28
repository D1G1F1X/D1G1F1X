import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/auth-context"
import { AdminAuthProvider } from "@/contexts/admin-auth-context"
import { ManualCartProvider } from "@/contexts/manual-cart-context"
import { initializeImagePaths } from "@/lib/card-data-access" // Import the initializer

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Numoracle",
  description: "Discover your path with Numoracle",
    generator: 'v0.dev'
}

// Fetch image paths on the server side and initialize the singleton
async function setupImagePaths() {
  try {
    // Use NEXT_PUBLIC_APP_URL for client-side fetch, or relative path for server-side
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ""
    const res = await fetch(`${baseUrl}/api/admin/card-image-paths`, {
      cache: "no-store", // Ensure fresh data, or consider revalidate tag
    })
    if (!res.ok) {
      console.error(`Failed to fetch image paths in layout: ${res.statusText}`)
      return {}
    }
    const data = await res.json()
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
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <AdminAuthProvider>
              <ManualCartProvider>{children}</ManualCartProvider>
            </AdminAuthProvider>
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
