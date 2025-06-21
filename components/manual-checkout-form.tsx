"use client"

import { useState, useTransition } from "react"
import { useActionState } from "react"
import { submitManualOrder, type OrderItem } from "@/app/manual-checkout/actions"
import { useManualCart } from "@/contexts/manual-cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Minus, CreditCard, Truck, Shield, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const initialState = {
  message: "",
  success: false,
  errors: null,
  fieldErrors: null,
  itemErrors: null,
  orderId: null,
  orderNumber: null,
}

export default function ManualCheckoutForm() {
  const { items, updateItemQuantity, removeItem, clearCart, getCartTotal, getItemCount } = useManualCart()
  const [state, formAction] = useActionState(submitManualOrder, initialState)
  const [isPending, startTransition] = useTransition()
  const [paymentMethod, setPaymentMethod] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  // Calculate order totals
  const subtotal = getCartTotal()
  const taxRate = 0.08
  const taxAmount = subtotal * taxRate
  const shippingCost = subtotal > 100 ? 0 : 15
  const totalAmount = subtotal + taxAmount + shippingCost

  const handleSubmit = async (formData: FormData) => {
    if (items.length === 0) {
      alert("Please add items to your cart before checkout")
      return
    }

    if (!termsAccepted || !privacyAccepted) {
      alert("Please accept the terms and conditions and privacy policy")
      return
    }

    // Add cart items to form data
    const orderItems: OrderItem[] = items.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      description: item.product.description || "",
      quantity: item.quantity,
      price: item.product.price,
      image: item.product.image,
    }))

    formData.append("orderItems", JSON.stringify(orderItems))
    formData.append("paymentMethod", paymentMethod)
    formData.append("termsAccepted", termsAccepted ? "on" : "off")
    formData.append("privacyAccepted", privacyAccepted ? "on" : "off")

    startTransition(() => {
      formAction(formData)
    })
  }

  // If order was successful, show confirmation
  if (state.success && state.orderNumber) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-800">Order Confirmed!</CardTitle>
            <CardDescription className="text-green-600">
              Thank you for your order. We'll process it shortly.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-sm text-gray-600">Order Number</p>
              <p className="text-lg font-mono font-semibold">{state.orderNumber}</p>
            </div>
            <p className="text-sm text-gray-600">{state.message}</p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => (window.location.href = "/")}>Continue Shopping</Button>
              <Button variant="outline" onClick={() => window.print()}>
                Print Receipt
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Manual Checkout</h1>
        <p className="text-gray-300">Complete your order with our secure checkout process</p>
      </div>

      {state.message && !state.success && (
        <Alert variant="destructive">
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Your cart is empty</p>
            ) : (
              <>
                {items.map((item, index) => (
                  <div
                    key={`${item.product.id}-${index}`}
                    className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg"
                  >
                    {item.product.image && (
                      <img
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{item.product.name}</h4>
                      {item.product.description && <p className="text-gray-400 text-sm">{item.product.description}</p>}
                      <p className="text-green-400 font-semibold">${item.product.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateItemQuantity(item.product.id, item.quantity - 1)}
                        disabled={isPending}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-white w-8 text-center">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateItemQuantity(item.product.id, item.quantity + 1)}
                        disabled={isPending}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeItem(item.product.id)}
                        disabled={isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <Separator className="bg-gray-700" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal ({getItemCount()} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax (8%)</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <Separator className="bg-gray-700" />
                  <div className="flex justify-between text-lg font-semibold text-white">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                {subtotal > 100 && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Truck className="w-4 h-4 mr-1" />
                    Free Shipping Qualified!
                  </Badge>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Checkout Form */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Secure Checkout
            </CardTitle>
            <CardDescription className="text-gray-300">Your information is encrypted and secure</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handleSubmit} className="space-y-6">
              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Customer Information</h3>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="customerName" className="text-gray-300">
                      Full Name *
                    </Label>
                    <Input
                      id="customerName"
                      name="customerName"
                      required
                      className="bg-gray-800 border-gray-600 text-white"
                      disabled={isPending}
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
                      className="bg-gray-800 border-gray-600 text-white"
                      disabled={isPending}
                    />
                    {state.fieldErrors?.customerEmail && (
                      <p className="text-red-400 text-sm mt-1">{state.fieldErrors.customerEmail[0]}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="customerPhone" className="text-gray-300">
                      Phone Number
                    </Label>
                    <Input
                      id="customerPhone"
                      name="customerPhone"
                      type="tel"
                      className="bg-gray-800 border-gray-600 text-white"
                      disabled={isPending}
                    />
                    {state.fieldErrors?.customerPhone && (
                      <p className="text-red-400 text-sm mt-1">{state.fieldErrors.customerPhone[0]}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Shipping Address</h3>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="street" className="text-gray-300">
                      Street Address *
                    </Label>
                    <Input
                      id="street"
                      name="street"
                      required
                      className="bg-gray-800 border-gray-600 text-white"
                      disabled={isPending}
                    />
                    {state.fieldErrors?.street && (
                      <p className="text-red-400 text-sm mt-1">{state.fieldErrors.street[0]}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-gray-300">
                        City *
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        required
                        className="bg-gray-800 border-gray-600 text-white"
                        disabled={isPending}
                      />
                      {state.fieldErrors?.city && (
                        <p className="text-red-400 text-sm mt-1">{state.fieldErrors.city[0]}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="state" className="text-gray-300">
                        State/Province *
                      </Label>
                      <Input
                        id="state"
                        name="state"
                        required
                        className="bg-gray-800 border-gray-600 text-white"
                        disabled={isPending}
                      />
                      {state.fieldErrors?.state && (
                        <p className="text-red-400 text-sm mt-1">{state.fieldErrors.state[0]}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zipCode" className="text-gray-300">
                        ZIP/Postal Code *
                      </Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        required
                        className="bg-gray-800 border-gray-600 text-white"
                        disabled={isPending}
                      />
                      {state.fieldErrors?.zipCode && (
                        <p className="text-red-400 text-sm mt-1">{state.fieldErrors.zipCode[0]}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="country" className="text-gray-300">
                        Country *
                      </Label>
                      <Select name="country" disabled={isPending}>
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="US">United States</SelectItem>
                          <SelectItem value="CA">Canada</SelectItem>
                          <SelectItem value="UK">United Kingdom</SelectItem>
                          <SelectItem value="AU">Australia</SelectItem>
                          <SelectItem value="DE">Germany</SelectItem>
                          <SelectItem value="FR">France</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {state.fieldErrors?.country && (
                        <p className="text-red-400 text-sm mt-1">{state.fieldErrors.country[0]}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Payment Method</h3>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "credit_card", label: "Credit Card", icon: "💳" },
                    { value: "paypal", label: "PayPal", icon: "🅿️" },
                    { value: "bank_transfer", label: "Bank Transfer", icon: "🏦" },
                    { value: "cash_on_delivery", label: "Cash on Delivery", icon: "💵" },
                  ].map((method) => (
                    <div
                      key={method.value}
                      className={cn(
                        "p-4 border rounded-lg cursor-pointer transition-colors",
                        paymentMethod === method.value
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-gray-600 bg-gray-800/50 hover:border-gray-500",
                      )}
                      onClick={() => setPaymentMethod(method.value)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{method.icon}</span>
                        <span className="text-white font-medium">{method.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {state.fieldErrors?.paymentMethod && (
                  <p className="text-red-400 text-sm">{state.fieldErrors.paymentMethod[0]}</p>
                )}
              </div>

              {/* Order Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-gray-300">
                  Order Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Any special instructions or notes for your order..."
                  className="bg-gray-800 border-gray-600 text-white"
                  disabled={isPending}
                />
                {state.fieldErrors?.notes && <p className="text-red-400 text-sm">{state.fieldErrors.notes[0]}</p>}
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="termsAccepted"
                    checked={termsAccepted}
                    onCheckedChange={setTermsAccepted}
                    disabled={isPending}
                  />
                  <Label htmlFor="termsAccepted" className="text-gray-300 text-sm leading-relaxed">
                    I agree to the{" "}
                    <a
                      href="/terms-of-service"
                      className="text-blue-400 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Terms of Service
                    </a>{" "}
                    and understand the order processing policies.
                  </Label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="privacyAccepted"
                    checked={privacyAccepted}
                    onCheckedChange={setPrivacyAccepted}
                    disabled={isPending}
                  />
                  <Label htmlFor="privacyAccepted" className="text-gray-300 text-sm leading-relaxed">
                    I agree to the{" "}
                    <a
                      href="/privacy-policy"
                      className="text-blue-400 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Privacy Policy
                    </a>{" "}
                    and consent to the processing of my personal data.
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isPending || items.length === 0 || !termsAccepted || !privacyAccepted || !paymentMethod}
              >
                {isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Processing Order...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Place Secure Order - ${totalAmount.toFixed(2)}
                  </>
                )}
              </Button>

              {/* Security Notice */}
              <div className="text-center text-xs text-gray-400">
                <Shield className="w-4 h-4 inline mr-1" />
                Your payment information is encrypted and secure. We never store credit card details.
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
