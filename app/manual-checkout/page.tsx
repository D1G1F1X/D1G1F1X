import { Suspense } from "react"
import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import ManualCheckoutForm from "@/components/manual-checkout-form"

export const metadata: Metadata = {
  title: "Manual Checkout | NUMO Oracle - Secure Order Processing",
  description:
    "Complete your NUMO Oracle order with our secure manual checkout process. We'll contact you with payment instructions within 24 hours.",
  keywords: "manual checkout, oracle cards, numerology products, secure ordering, payment processing",
  openGraph: {
    title: "Manual Checkout | NUMO Oracle",
    description: "Complete your mystical order securely with our manual checkout process.",
    type: "website",
  },
}

interface ManualCheckoutPageProps {
  searchParams: {
    productId?: string
    productName?: string
    price?: string
    image?: string
  }
}

export default function ManualCheckoutPage({ searchParams }: ManualCheckoutPageProps) {
  // Parse initial data from URL parameters
  const initialData = {
    productId: searchParams.productId || "",
    productName: searchParams.productName || "",
    price: searchParams.price ? parseFloat(searchParams.price) : 0,
    image: searchParams.image || "",
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <HeroSection
        title="Secure Manual Checkout"
        description="Complete your order and we'll contact you with payment instructions within 24 hours"
        backgroundImage="/manual-checkout-background.png"
      />
      <Suspense
        fallback={
          <div className="container mx-auto py-20">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              <span className="ml-3 text-white">Loading secure checkout...</span>
            </div>
          </div>
        }
      >
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Complete Your Order</h2>
              <p className="text-gray-300">
                Fill out the form below with your details and product selections. We'll process your order and contact
                you with payment instructions.
              </p>
            </div>
            <ManualCheckoutForm initialData={initialData} />
          </div>
        </div>
      </Suspense>
    </div>
  )
}
