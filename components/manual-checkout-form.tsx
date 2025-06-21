"use client"

import { useState, useEffect } from "react"
import { useActionState } from "react"
import { submitManualOrder } from "@/app/manual-checkout/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, ShoppingCart, AlertCircle, CheckCircle, Mail, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface OrderItem {
  id: string
  productId?: string
  name: string
  quantity: number
  price: number
  description?: string
}

const PREDEFINED_PRODUCTS = [
  { id: "novice-deck", name: "Novice Oracle Deck", price: 29.99, description: "Perfect for beginners" },
  { id: "standard-deck", name: "Standard Oracle Deck", price: 49.99, description: "Complete oracle card set" },
  { id: "deluxe-deck", name: "Deluxe Oracle Deck", price: 79.99, description: "Premium cards with guidebook" },
  { id: "crystal-set", name: "Crystal Enhancement Set", price: 34.99, description: "Mystical crystals for readings" },
  { id: "reading-cloth", name: "Sacred Reading Cloth", price: 24.99, description: "Blessed cloth for card spreads" },
  { id: "guidebook", name: "Complete Numerology Guide", price: 19.99, description: "Comprehensive learning resource" },
]

const initialState = {
  message: "",
  success: false,
  errors: null,
  fieldErrors: null,
  itemErrors: null,
  orderId: null,
  emailStatus: undefined,
}

export default function ManualCheckoutForm() {
  const [state, formAction, isPending] = useActionState(submitManualOrder, initialState)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { id: crypto.randomUUID(), name: "", quantity: 1, price: 0 },
  ])
  const [showSuccess, setShowSuccess] = useState(false)

  // Calculate total
  const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Handle success state
  useEffect(() => {
    if (state.success && state.orderId) {
      setShowSuccess(true)
      // Reset form after successful submission
      setOrderItems([{ id: crypto.randomUUID(), name: "", quantity: 1, price: 0 }])
    }
  }, [state.success, state.orderId])

  const addOrderItem = () => {
    if (orderItems.length < 20) {
      // Limit to 20 items
      setOrderItems([...orderItems, { id: crypto.randomUUID(), name: "", quantity: 1, price: 0 }])
    }
  }

  const removeOrderItem = (id: string) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter((item) => item.id !== id))
    }
  }

  const updateOrderItem = (id: string, field: keyof OrderItem, value: string | number) => {
    setOrderItems(orderItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const selectPredefinedProduct = (itemId: string, product: (typeof PREDEFINED_PRODUCTS)[0]) => {
    updateOrderItem(itemId, "productId", product.id)
    updateOrderItem(itemId, "name", product.name)
    updateOrderItem(itemId, "price", product.price)
    updateOrderItem(itemId, "description", product.description)
  }

  const getItemError = (itemIndex: number, field: keyof OrderItem) => {
    return state.itemErrors?.find((error) => error.index === itemIndex && error.field === field)?.message
  }

  if (showSuccess && state.success) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="bg-gray-900/50 backdrop-blur-sm border-green-500/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <CardTitle className="text-2xl text-white">Order Submitted Successfully!</CardTitle>
            <CardDescription className="text-gray-300">
              Your order has been received and confirmation emails have been sent.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h3 className="text-green-400 font-semibold mb-2">What happens next?</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>We'll contact you within 24 hours with secure payment instructions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Once payment is received, we'll prepare your mystical items</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>You'll receive tracking information when your order ships</span>
                </li>
              </ul>
            </div>

            {state.emailStatus && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4" />
                  <span className="text-gray-300">Email Status:</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    {state.emailStatus.customerEmailSent ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-400" />
                    )}
                    <span className="text-gray-300">
                      Customer confirmation: {state.emailStatus.customerEmailSent ? "Sent" : "Pending"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {state.emailStatus.adminEmailSent ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-400" />
                    )}
                    <span className="text-gray-300">
                      Admin notification: {state.emailStatus.adminEmailSent ? "Sent" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Button onClick={() => setShowSuccess(false)} variant="outline" className="flex-1">
                Place Another Order
              </Button>
              <Button onClick={() => (window.location.href = "/")} className="flex-1">
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gray-900/50 backdrop-blur-sm border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            Manual Order Checkout
          </CardTitle>
          <CardDescription className="text-gray-300">
            Complete your order details below. We'll contact you within 24 hours with secure payment instructions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Security Notice */}
          <Alert className="mb-6 bg-blue-500/10 border-blue-500/20">
            <Shield className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-300">
              <strong>Secure Processing:</strong> Your information is encrypted and secure. We never store payment
              details and will contact you with safe payment options.
            </AlertDescription>
          </Alert>

          {/* Error Messages */}
          {!state.success && state.message && (
            <Alert className="mb-6 bg-red-500/10 border-red-500/20">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-300">{state.message}</AlertDescription>
            </Alert>
          )}

          <form action={formAction} className="space-y-8">
            {/* Honeypot field for spam protection */}
            <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName" className="text-gray-300">
                    Full Name *
                  </Label>
                  <Input
                    id="customerName"
                    name="customerName"
                    required
                    className="bg-gray-800/50 border-gray-600 text-white"
                    placeholder="Enter your full name"
                  />
                  {state.fieldErrors?.customerName && (
                    <p className="text-red-400 text-sm mt-1">{state.fieldErrors.customerName[0]}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="customerEmail" className="text-gray-300">
                    Email Address *
                  </Label>
                  <Input
                    id="customerEmail"
                    name="customerEmail"
                    type="email"
                    required
                    className="bg-gray-800/50 border-gray-600 text-white"
                    placeholder="your.email@example.com"
                  />
                  {state.fieldErrors?.customerEmail && (
                    <p className="text-red-400 text-sm mt-1">{state.fieldErrors.customerEmail[0]}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="customerPhone" className="text-gray-300">
                    Phone Number (Optional)
                  </Label>
                  <Input
                    id="customerPhone"
                    name="customerPhone"
                    type="tel"
                    className="bg-gray-800/50 border-gray-600 text-white"
                    placeholder="+1 (555) 123-4567"
                  />
                  {state.fieldErrors?.customerPhone && (
                    <p className="text-red-400 text-sm mt-1">{state.fieldErrors.customerPhone[0]}</p>
                  )}
                </div>
              </div>
            </div>

            <Separator className="bg-gray-700" />

            {/* Shipping Address */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Shipping Address</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="shippingAddressStreet" className="text-gray-300">
                    Street Address *
                  </Label>
                  <Input
                    id="shippingAddressStreet"
                    name="shippingAddressStreet"
                    required
                    className="bg-gray-800/50 border-gray-600 text-white"
                    placeholder="123 Main Street, Apt 4B"
                  />
                  {state.fieldErrors?.shippingAddressStreet && (
                    <p className="text-red-400 text-sm mt-1">{state.fieldErrors.shippingAddressStreet[0]}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="shippingAddressCity" className="text-gray-300">
                      City *
                    </Label>
                    <Input
                      id="shippingAddressCity"
                      name="shippingAddressCity"
                      required
                      className="bg-gray-800/50 border-gray-600 text-white"
                      placeholder="New York"
                    />
                    {state.fieldErrors?.shippingAddressCity && (
                      <p className="text-red-400 text-sm mt-1">{state.fieldErrors.shippingAddressCity[0]}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="shippingAddressState" className="text-gray-300">
                      State/Province *
                    </Label>
                    <Input
                      id="shippingAddressState"
                      name="shippingAddressState"
                      required
                      className="bg-gray-800/50 border-gray-600 text-white"
                      placeholder="NY"
                    />
                    {state.fieldErrors?.shippingAddressState && (
                      <p className="text-red-400 text-sm mt-1">{state.fieldErrors.shippingAddressState[0]}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="shippingAddressZip" className="text-gray-300">
                      ZIP/Postal Code *
                    </Label>
                    <Input
                      id="shippingAddressZip"
                      name="shippingAddressZip"
                      required
                      className="bg-gray-800/50 border-gray-600 text-white"
                      placeholder="10001"
                    />
                    {state.fieldErrors?.shippingAddressZip && (
                      <p className="text-red-400 text-sm mt-1">{state.fieldErrors.shippingAddressZip[0]}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="shippingAddressCountry" className="text-gray-300">
                    Country *
                  </Label>
                  <Input
                    id="shippingAddressCountry"
                    name="shippingAddressCountry"
                    required
                    className="bg-gray-800/50 border-gray-600 text-white"
                    placeholder="United States"
                  />
                  {state.fieldErrors?.shippingAddressCountry && (
                    <p className="text-red-400 text-sm mt-1">{state.fieldErrors.shippingAddressCountry[0]}</p>
                  )}
                </div>
              </div>
            </div>

            <Separator className="bg-gray-700" />

            {/* Order Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Order Items</h3>
                <Button
                  type="button"
                  onClick={addOrderItem}
                  disabled={orderItems.length >= 20}
                  variant="outline"
                  size="sm"
                  className="text-purple-400 border-purple-400 hover:bg-purple-400/10"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Item
                </Button>
              </div>

              <div className="space-y-4">
                {orderItems.map((item, index) => (
                  <Card key={item.id} className="bg-gray-800/30 border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="text-white font-medium">Item #{index + 1}</h4>
                        {orderItems.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removeOrderItem(item.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:bg-red-400/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      {/* Quick Select Predefined Products */}
                      <div className="mb-4">
                        <Label className="text-gray-300 text-sm">Quick Select:</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {PREDEFINED_PRODUCTS.map((product) => (
                            <Button
                              key={product.id}
                              type="button"
                              onClick={() => selectPredefinedProduct(item.id, product)}
                              variant="outline"
                              size="sm"
                              className={cn(
                                "text-xs",
                                item.productId === product.id
                                  ? "bg-purple-500/20 border-purple-400 text-purple-300"
                                  : "border-gray-600 text-gray-400 hover:border-purple-400",
                              )}
                            >
                              {product.name} - ${product.price}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                          <Label className="text-gray-300">Product Name *</Label>
                          <Input
                            value={item.name}
                            onChange={(e) => updateOrderItem(item.id, "name", e.target.value)}
                            className="bg-gray-700/50 border-gray-600 text-white"
                            placeholder="Enter product name"
                          />
                          {getItemError(index, "name") && (
                            <p className="text-red-400 text-sm mt-1">{getItemError(index, "name")}</p>
                          )}
                        </div>
                        <div>
                          <Label className="text-gray-300">Quantity *</Label>
                          <Input
                            type="number"
                            min="1"
                            max="99"
                            value={item.quantity}
                            onChange={(e) => updateOrderItem(item.id, "quantity", Number.parseInt(e.target.value) || 1)}
                            className="bg-gray-700/50 border-gray-600 text-white"
                          />
                          {getItemError(index, "quantity") && (
                            <p className="text-red-400 text-sm mt-1">{getItemError(index, "quantity")}</p>
                          )}
                        </div>
                        <div>
                          <Label className="text-gray-300">Price ($) *</Label>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            max="9999.99"
                            value={item.price}
                            onChange={(e) => updateOrderItem(item.id, "price", Number.parseFloat(e.target.value) || 0)}
                            className="bg-gray-700/50 border-gray-600 text-white"
                          />
                          {getItemError(index, "price") && (
                            <p className="text-red-400 text-sm mt-1">{getItemError(index, "price")}</p>
                          )}
                        </div>
                      </div>

                      <div className="mt-4">
                        <Label className="text-gray-300">Description (Optional)</Label>
                        <Input
                          value={item.description || ""}
                          onChange={(e) => updateOrderItem(item.id, "description", e.target.value)}
                          className="bg-gray-700/50 border-gray-600 text-white"
                          placeholder="Additional details about this item"
                        />
                      </div>

                      <div className="mt-4 flex justify-between items-center text-sm">
                        <span className="text-gray-400">Item Total:</span>
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                          ${(item.price * item.quantity).toFixed(2)}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Total */}
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-white">Order Total:</span>
                  <span className="text-2xl font-bold text-purple-400">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {state.fieldErrors?.orderItems && (
                <p className="text-red-400 text-sm">{state.fieldErrors.orderItems[0]}</p>
              )}
            </div>

            <Separator className="bg-gray-700" />

            {/* Order Notes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Order Notes (Optional)</h3>
              <Textarea
                name="notes"
                className="bg-gray-800/50 border-gray-600 text-white"
                placeholder="Any special instructions or notes for your order..."
                rows={4}
              />
              {state.fieldErrors?.notes && <p className="text-red-400 text-sm">{state.fieldErrors.notes[0]}</p>}
            </div>

            {/* Hidden field for order items */}
            <input type="hidden" name="orderItems" value={JSON.stringify(orderItems)} />

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                disabled={isPending || totalAmount === 0}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 text-lg"
              >
                {isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Order...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Submit Order - ${totalAmount.toFixed(2)}
                  </>
                )}
              </Button>
              <p className="text-gray-400 text-sm text-center mt-2">
                We'll contact you within 24 hours with secure payment instructions
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
