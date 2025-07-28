"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useManualCart } from "@/contexts/manual-cart-context"
import { useRouter } from "next/navigation"
import { Loader2, CreditCard, Package, MapPin, User, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { submitPaidOrder } from "@/lib/actions/order.actions"

export default function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useManualCart()
  const { toast } = useToast()
  const router = useRouter()

  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  useEffect(() => {
    if (cartItems.length === 0 && !isProcessing) {
      toast({
        title: "Your cart is empty!",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      })
      router.push("/buy")
    }
  }, [cartItems, isProcessing, router, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const orderDetails = {
        customerInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country,
        },
        paymentInfo: {
          cardNumber: formData.cardNumber,
          expiryDate: formData.expiryDate,
          cvv: formData.cvv,
        },
        items: cartItems.map((item) => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: getTotalPrice(),
      }

      const result = await submitPaidOrder(orderDetails)

      if (result.success) {
        toast({
          title: "Order Placed Successfully!",
          description: `Your order #${result.orderId} has been placed. A confirmation email will be sent shortly.`,
          variant: "default",
        })
        clearCart()
        router.push(`/order-confirmation?orderId=${result.orderId}`)
      } else {
        toast({
          title: "Order Failed",
          description: result.message || "There was an error processing your order. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      console.error("Checkout submission error:", error)
      toast({
        title: "Order Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (cartItems.length === 0 && !isProcessing) {
    return null // Or a loading spinner, or redirect immediately
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <Image
        src="/checkout-page-background.png"
        alt="Checkout Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0 opacity-30"
      />
      <div className="absolute inset-0 bg-black/50 z-10" />

      <Card className="relative z-20 w-full max-w-4xl p-6 md:p-8 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary-foreground">Secure Checkout</CardTitle>
          <CardDescription className="text-muted-foreground">Complete your purchase with confidence.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Customer Information */}
              <Card className="bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary-foreground">
                    <User className="h-5 w-5" /> Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" value={formData.fullName} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={formData.email} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card className="bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary-foreground">
                    <MapPin className="h-5 w-5" /> Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" value={formData.address} onChange={handleInputChange} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" value={formData.city} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province</Label>
                      <Input id="state" value={formData.state} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zip">Zip/Postal Code</Label>
                      <Input id="zip" value={formData.zip} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" value={formData.country} onChange={handleInputChange} required />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Information */}
            <Card className="bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary-foreground">
                  <CreditCard className="h-5 w-5" /> Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" value={formData.cardNumber} onChange={handleInputChange} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date (MM/YY)</Label>
                    <Input id="expiryDate" value={formData.expiryDate} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" value={formData.cvv} onChange={handleInputChange} required />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary-foreground">
                  <Package className="h-5 w-5" /> Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <p className="text-muted-foreground">
                      {item.name} x {item.quantity}
                    </p>
                    <p className="font-medium text-primary-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center text-lg font-bold text-primary-foreground">
                  <span>Total:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing Order...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </Button>
                <Link href="/buy" className="w-full">
                  <Button variant="outline" className="w-full bg-transparent">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Continue Shopping
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
