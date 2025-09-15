import type React from "react"
import Script from "next/script"
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
        <Script id="suppress-resizeobserver-error" strategy="beforeInteractive">
          {`
            (function(){
              var re = /ResizeObserver loop (limit exceeded|completed with undelivered notifications)/i;
              function shouldIgnore(ev){
                try {
                  var msg = (ev && (ev.message || (ev.error && ev.error.message))) || '';
                  return re.test(msg);
                } catch(_) { return false; }
              }
              window.addEventListener('error', function(ev){
                if (shouldIgnore(ev)) {
                  ev.preventDefault && ev.preventDefault();
                  return true;
                }
              }, true);
              window.addEventListener('unhandledrejection', function(ev){
                var reason = ev && ev.reason;
                var msg = typeof reason === 'string' ? reason : (reason && reason.message) || '';
                if (re.test(msg)) {
                  ev.preventDefault && ev.preventDefault();
                  return true;
                }
              });
            })();
          `}
        </Script>
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
