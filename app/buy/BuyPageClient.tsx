"use client"

import { AlertDescription } from "@/components/ui/alert"

import { Alert } from "@/components/ui/alert"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, ArrowRight, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { submitPaidOrder } from "@/lib/actions/order.actions"
import type { Product } from "@/lib/products"

interface BuyPageClientProps {
  products: Product[]
}

export default function BuyPageClient({ products }: BuyPageClientProps) {
  const [selectedProducts, setSelectedProducts] = useState<Record<string, number>>({})
  const [email, setEmail] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState<boolean | null>(null)
  const [orderMessage, setOrderMessage] = useState<string | null>(null)
  const { toast } = useToast()

  const handleQuantityChange = (productId: string, quantity: number) => {
    setSelectedProducts((prev) => {
      const newQuantity = Math.max(0, quantity)
      if (newQuantity === 0) {
        const newState = { ...prev }
        delete newState[productId]
        return newState
      }
      return { ...prev, [productId]: newQuantity }
    })
  }

  const calculateSubtotal = () => {
    return Object.entries(selectedProducts).reduce((sum, [productId, quantity]) => {
      const product = products.find((p) => p.id === productId)
      return sum + (product ? product.price * quantity : 0)
    }, 0)
  }

  const subtotal = calculateSubtotal()
  const shippingCost = subtotal > 0 ? 10.0 : 0 // Example: $10 shipping if anything is in cart
  const total = subtotal + shippingCost
  const isCartEmpty = Object.keys(selectedProducts).length === 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setOrderSuccess(null)
    setOrderMessage(null)

    if (!agreeToTerms) {
      setOrderMessage("Please agree to the terms of service and privacy policy.")
      setOrderSuccess(false)
      setLoading(false)
      toast({
        title: "Action Required",
        description: "Please agree to the terms of service and privacy policy.",
        variant: "destructive",
      })
      return
    }

    const items = Object.entries(selectedProducts).map(([productId, quantity]) => {
      const product = products.find((p) => p.id === productId)
      return {
        productId,
        name: product?.name || "Unknown Product",
        quantity,
        price: product?.price || 0,
      }
    })

    try {
      const result = await submitPaidOrder({
        customerEmail: email,
        items,
        subtotal,
        shippingCost,
        total,
        status: "Pending Payment", // This would typically be handled by a payment gateway
      })

      if (result.success) {
        setOrderSuccess(true)
        setOrderMessage("Your order has been placed successfully! Redirecting to confirmation...")
        toast({
          title: "Order Placed!",
          description: "Redirecting to order confirmation.",
          variant: "success",
        })
        // Simulate redirect to a confirmation page
        setTimeout(() => {
          window.location.href = `/order-confirmation?orderId=${result.orderId}`
        }, 2000)
      } else {
        setOrderSuccess(false)
        setOrderMessage(result.message || "Failed to place order. Please try again.")
        toast({
          title: "Order Failed",
          description: result.message || "Failed to place order.",
          variant: "destructive",
        })
      }
    } catch (err) {
      console.error("Order submission error:", err)
      setOrderSuccess(false)
      setOrderMessage("An unexpected error occurred. Please try again later.")
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-purple-900 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card>
          <CardHeader className="text-center">
            <ShoppingCart className="mx-auto h-12 w-12 text-purple-600 dark:text-purple-400 mb-4" />
            <CardTitle className="text-3xl font-bold">Shop Numo Oracle</CardTitle>
            <CardDescription>Select your desired products and proceed to checkout.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Selection */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Products</h2>
                <div className="space-y-6">
                  {products.map((product) => (
                    <Card key={product.id} className="flex items-center p-4">
                      <Image
                        src={product.imageUrl || "/placeholder.svg?height=100&width=100"}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="rounded-md object-cover mr-4"
                      />
                      <div className="flex-grow">
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <p className="text-muted-foreground text-sm">{product.description}</p>
                        <p className="font-bold text-lg mt-1">${product.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(product.id, (selectedProducts[product.id] || 0) - 1)}
                          disabled={loading}
                        >
                          -
                        </Button>
                        <Input
                          type="number"
                          value={selectedProducts[product.id] || 0}
                          onChange={(e) => handleQuantityChange(product.id, Number.parseInt(e.target.value) || 0)}
                          className="w-16 text-center"
                          min="0"
                          disabled={loading}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(product.id, (selectedProducts[product.id] || 0) + 1)}
                          disabled={loading}
                        >
                          +
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Order Summary & Checkout */}
              <div className="md:border-l md:pl-8">
                <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span className="font-medium">${shippingCost.toFixed(2)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreeToTerms}
                      onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
                      disabled={loading}
                    />
                    <Label htmlFor="terms">
                      I agree to the{" "}
                      <Link href="/terms-of-service" className="text-blue-600 hover:underline" target="_blank">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy-policy" className="text-blue-600 hover:underline" target="_blank">
                        Privacy Policy
                      </Link>
                      .
                    </Label>
                  </div>

                  {orderMessage && (
                    <Alert variant={orderSuccess ? "default" : "destructive"}>
                      {orderSuccess ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                      <AlertDescription>{orderMessage}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={isCartEmpty || loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Proceed to Checkout
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
