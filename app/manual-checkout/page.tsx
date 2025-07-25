import type { Metadata } from "next"
import ManualCheckoutForm from "@/components/manual-checkout-form"

export const metadata: Metadata = {
  title: "Manual Checkout",
  description: "Create and submit manual orders for customers.",
}

export default function ManualCheckoutPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-purple-900 p-4">
      <ManualCheckoutForm />
    </div>
  )
}
