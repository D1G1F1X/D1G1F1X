import { Suspense } from "react"
import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import OrderConfirmationClient from "./OrderConfirmationClient"

export const metadata: Metadata = {
  title: "Order Confirmation | NUMO Oracle",
  description: "Your order has been confirmed. Thank you for your purchase!",
  keywords: "order confirmation, purchase complete, oracle cards, numerology products",
  openGraph: {
    title: "Order Confirmation | NUMO Oracle",
    description: "Your mystical journey begins now. Thank you for your purchase!",
    type: "website",
  },
}

interface OrderConfirmationPageProps {
  searchParams: {
    session_id?: string
  }
}

export default function OrderConfirmationPage({ searchParams }: OrderConfirmationPageProps) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <HeroSection
        title="Order Confirmed"
        description="Thank you for your purchase! Your mystical journey begins now."
        backgroundImage="/order-confirmation-background.png"
      />
      <Suspense
        fallback={
          <div className="container mx-auto py-20">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              <span className="ml-3 text-white">Loading order details...</span>
            </div>
          </div>
        }
      >
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <OrderConfirmationClient sessionId={searchParams.session_id} />
          </div>
        </div>
      </Suspense>
    </div>
  )
}