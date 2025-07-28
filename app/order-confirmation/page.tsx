"use client"

import { CardFooter } from "@/components/ui/card"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Loader2, Home, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getOrderById } from "@/lib/services/order-service"

interface OrderItem {
  productId: string
  name: string
  quantity: number
  price: number
}

interface OrderDetails {
  id: string
  customerInfo: {
    fullName: string
    email: string
  }
  shippingAddress: {
    address: string
    city: string
    state: string
    zip: string
    country: string
  }
  items: OrderItem[]
  totalAmount: number
  orderDate: string
}

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setError("No order ID provided.")
        setLoading(false)
        return
      }
      try {
        const order = await getOrderById(orderId)
        if (order) {
          setOrderDetails(order)
        } else {
          setError("Order not found.")
        }
      } catch (err) {
        console.error("Failed to fetch order details:", err)
        setError("Failed to load order details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId])

  if (loading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <Image
          src="/order-confirmation-background.png"
          alt="Order Confirmation Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="z-0 opacity-30"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Card className="relative z-20 w-full max-w-md p-6 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl font-bold text-primary-foreground">Loading Order Details...</CardTitle>
          <CardDescription className="text-muted-foreground">
            Please wait while we retrieve your order information.
          </CardDescription>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <Image
          src="/order-confirmation-background.png"
          alt="Order Confirmation Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="z-0 opacity-30"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Card className="relative z-20 w-full max-w-md p-6 text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <CardTitle className="text-2xl font-bold text-primary-foreground">Error</CardTitle>
          <CardDescription className="text-muted-foreground">{error}</CardDescription>
          <Button asChild className="mt-6">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" /> Go to Homepage
            </Link>
          </Button>
        </Card>
      </div>
    )
  }

  if (!orderDetails) {
    return (
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <Image
          src="/order-confirmation-background.png"
          alt="Order Confirmation Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="z-0 opacity-30"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Card className="relative z-20 w-full max-w-md p-6 text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <CardTitle className="text-2xl font-bold text-primary-foreground">Order Not Found</CardTitle>
          <CardDescription className="text-muted-foreground">The order details could not be retrieved.</CardDescription>
          <Button asChild className="mt-6">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" /> Go to Homepage
            </Link>
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <Image
        src="/order-confirmation-background.png"
        alt="Order Confirmation Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0 opacity-30"
      />
      <div className="absolute inset-0 bg-black/50 z-10" />

      <Card className="relative z-20 w-full max-w-2xl p-6 md:p-8 shadow-lg text-center">
        <CardHeader>
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold text-primary-foreground">Order Confirmed!</CardTitle>
          <CardDescription className="text-muted-foreground">
            Thank you for your purchase. Your order has been successfully placed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-lg font-semibold text-primary-foreground">
            Order ID: <span className="text-green-400">{orderDetails.id}</span>
          </div>
          <div className="text-muted-foreground">
            <p>A confirmation email has been sent to {orderDetails.customerInfo.email}.</p>
            <p>Order Date: {new Date(orderDetails.orderDate).toLocaleDateString()}</p>
          </div>

          <Separator />

          <div className="text-left space-y-4">
            <h3 className="text-xl font-semibold text-primary-foreground">Order Summary</h3>
            {orderDetails.items.map((item) => (
              <div key={item.productId} className="flex justify-between items-center text-muted-foreground">
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between items-center text-lg font-bold text-primary-foreground pt-2 border-t border-dashed border-muted">
              <span>Total:</span>
              <span>${orderDetails.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <Separator />

          <div className="text-left space-y-2 text-muted-foreground">
            <h3 className="text-xl font-semibold text-primary-foreground">Shipping Address</h3>
            <p>{orderDetails.customerInfo.fullName}</p>
            <p>{orderDetails.shippingAddress.address}</p>
            <p>
              {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}{" "}
              {orderDetails.shippingAddress.zip}
            </p>
            <p>{orderDetails.shippingAddress.country}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
            <Link href="/user/dashboard">
              <ShoppingCart className="mr-2 h-4 w-4" /> View My Orders
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full bg-transparent">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" /> Back to Homepage
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

import { AlertCircle, XCircle } from "lucide-react"
