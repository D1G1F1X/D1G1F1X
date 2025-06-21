"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Package, Truck, CreditCard } from "lucide-react"
import type { OrderItem } from "@/app/manual-checkout/actions"

interface OrderSummaryProps {
  items: OrderItem[]
  customerInfo?: {
    name: string
    email: string
    phone?: string
  }
  shippingAddress?: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
}

export default function OrderSummary({ items, customerInfo, shippingAddress }: OrderSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 9.99 // Free shipping over $50
  const tax = subtotal * 0.08 // 8% tax estimate
  const total = subtotal + shipping + tax

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Order Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item.id} className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-medium text-sm">{item.name}</h4>
                {item.description && <p className="text-xs text-muted-foreground">{item.description}</p>}
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    Qty: {item.quantity}
                  </Badge>
                  <span className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</span>
                </div>
              </div>
              <div className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Pricing Breakdown */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              <Truck className="h-3 w-3" />
              Shipping
              {shipping === 0 && (
                <Badge variant="secondary" className="text-xs ml-1">
                  FREE
                </Badge>
              )}
            </span>
            <span>${shipping.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax (estimated)</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <Separator />

          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span className="text-purple-600">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Customer Info */}
        {customerInfo && (
          <>
            <Separator />
            <div className="space-y-2">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <Package className="h-4 w-4" />
                Customer Details
              </h4>
              <div className="text-sm space-y-1">
                <p>{customerInfo.name}</p>
                <p className="text-muted-foreground">{customerInfo.email}</p>
                {customerInfo.phone && <p className="text-muted-foreground">{customerInfo.phone}</p>}
              </div>
            </div>
          </>
        )}

        {/* Shipping Address */}
        {shippingAddress && (
          <>
            <Separator />
            <div className="space-y-2">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Shipping Address
              </h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>{shippingAddress.street}</p>
                <p>
                  {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
                </p>
                <p>{shippingAddress.country}</p>
              </div>
            </div>
          </>
        )}

        {/* Payment Info */}
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-start gap-2">
            <CreditCard className="h-4 w-4 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900">Payment Instructions</p>
              <p className="text-blue-700 mt-1">
                We'll contact you within 24 hours with secure payment instructions and shipping details.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
