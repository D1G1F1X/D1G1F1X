"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Package, Mail, Calendar, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface OrderDetails {
  id: string
  amount_total: number
  currency: string
  customer_email: string
  payment_status: string
  created: number
  line_items?: {
    data: Array<{
      description: string
      quantity: number
      amount_total: number
    }>
  }
}

interface OrderConfirmationClientProps {
  sessionId?: string
}

export default function OrderConfirmationClient({ sessionId }: OrderConfirmationClientProps) {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID provided')
      setLoading(false)
      return
    }

    // In a real application, you would fetch order details from your backend
    // For now, we'll simulate the order details
    const simulateOrderDetails = () => {
      setTimeout(() => {
        setOrderDetails({
          id: sessionId,
          amount_total: 2500, // $25.00 in cents
          currency: 'usd',
          customer_email: 'customer@example.com',
          payment_status: 'paid',
          created: Date.now() / 1000,
          line_items: {
            data: [
              {
                description: 'The Novice Oracle Deck',
                quantity: 1,
                amount_total: 2500,
              }
            ]
          }
        })
        setLoading(false)
      }, 1000)
    }

    simulateOrderDetails()
  }, [sessionId])

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-white">Loading your order details...</p>
      </div>
    )
  }

  if (error || !orderDetails) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Order Not Found</h2>
            <p className="text-gray-600 mb-6">
              {error || 'We could not find your order details. Please contact support if you need assistance.'}
            </p>
            <Link href="/buy">
              <Button>Return to Shop</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100)
  }

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-center text-green-700 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-center text-green-600">
            Thank you for your purchase. Your order has been successfully processed.
          </p>
        </CardContent>
      </Card>

      {/* Order Details */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="font-mono text-sm">{orderDetails.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-purple-600">
                {formatAmount(orderDetails.amount_total, orderDetails.currency)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Payment Status</p>
              <p className="text-green-600 font-semibold capitalize">
                {orderDetails.payment_status}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Order Date</p>
              <p>{formatDate(orderDetails.created)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p>{orderDetails.customer_email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Confirmation</p>
              <p className="text-sm">
                A confirmation email has been sent to your email address.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      {orderDetails.line_items && (
        <Card>
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
            <CardDescription>Items included in your order</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orderDetails.line_items.data.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{item.description}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">
                    {formatAmount(item.amount_total, orderDetails.currency)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
          <CardDescription>Here's what happens after your order</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-purple-600 text-sm font-bold">1</span>
              </div>
              <div>
                <p className="font-medium">Order Processing</p>
                <p className="text-sm text-gray-600">
                  Your order is being prepared for shipment. You'll receive tracking information via email.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-purple-600 text-sm font-bold">2</span>
              </div>
              <div>
                <p className="font-medium">Digital Access</p>
                <p className="text-sm text-gray-600">
                  If your order includes digital products, you'll receive access instructions via email.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-purple-600 text-sm font-bold">3</span>
              </div>
              <div>
                <p className="font-medium">Begin Your Journey</p>
                <p className="text-sm text-gray-600">
                  Explore our tools and resources to start your mystical journey with NUMO Oracle.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/tools">
          <Button className="w-full sm:w-auto">
            <ExternalLink className="mr-2 h-4 w-4" />
            Explore Tools
          </Button>
        </Link>
        <Link href="/library">
          <Button variant="outline" className="w-full sm:w-auto">
            <Package className="mr-2 h-4 w-4" />
            View Library
          </Button>
        </Link>
        <Link href="/buy">
          <Button variant="outline" className="w-full sm:w-auto">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  )
}