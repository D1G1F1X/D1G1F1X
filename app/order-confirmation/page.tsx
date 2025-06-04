"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const paypalOrderId = searchParams.get("paypal_order_id")
  const localOrderId = searchParams.get("local_order_id") // From your backend

  return (
    <div className="container mx-auto p-4 max-w-2xl text-center">
      <Card className="mt-10">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-3xl">Thank You for Your Order!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">Your payment was successful and your order has been placed.</p>
          {paypalOrderId && (
            <p>
              Your PayPal Transaction ID is: <span className="font-semibold">{paypalOrderId}</span>
            </p>
          )}
          {localOrderId && (
            <p>
              Your Order ID is: <span className="font-semibold">{localOrderId}</span>
            </p>
          )}
          <p>We will process your order shortly. You should receive an email confirmation soon.</p>
          <div className="mt-6">
            <Button asChild>
              <Link href="/buy">Continue Shopping</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
