"use client"

import type React from "react"
import { useState, useTransition } from "react"
import { Plus, Trash2, ShoppingCart, User, MapPin, FileText, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { submitManualOrder } from "@/app/manual-checkout/actions"

export interface OrderItem {
  id: string
  productId?: string
  name: string
  quantity: number
  price: number
  description?: string
}

// Predefined products for easy selection
const PREDEFINED_PRODUCTS = [
  { id: "novice-deck", name: "Novice Deck", price: 29.99, description: "Perfect for beginners" },
  { id: "standard-deck", name: "Standard Deck", price: 49.99, description: "Complete oracle card set" },
  { id: "deluxe-deck", name: "Deluxe Deck", price: 79.99, description: "Premium edition with extras" },
  { id: "adept-deck", name: "Adept Deck", price: 99.99, description: "Advanced practitioner set" },
  { id: "guidebook", name: "Guidebook", price: 19.99, description: "Comprehensive guide" },
  { id: "reading-cloth", name: "Reading Cloth", price: 24.99, description: "Sacred reading surface" },
  { id: "crystal-set", name: "Crystal Set", price: 34.99, description: "Complementary crystals" },
  { id: "custom-item", name: "Custom Item", price: 0, description: "Specify custom product" },
]

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Netherlands",
  "Belgium",
  "Switzerland",
  "Austria",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Ireland",
  "Portugal",
  "Other",
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

const ManualCheckoutForm: React.FC = () => {
  const [state, setState] = useState(initialState)
  const [isPending, startTransition] = useTransition()
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Form state
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    {
      id: crypto.randomUUID(),
      productId: "",
      name: "",
      quantity: 1,
      price: 0,
      description: "",
    },
  ])

  // Add new order item
  const addOrderItem = () => {
    setOrderItems([
      ...orderItems,
      {
        id: crypto.randomUUID(),
        productId: "",
        name: "",
        quantity: 1,
        price: 0,
        description: "",
      },
    ])
  }

  // Remove order item
  const removeOrderItem = (id: string) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter((item) => item.id !== id))
    }
  }

  // Update order item
  const updateOrderItem = (id: string, field: keyof OrderItem, value: string | number) => {
    setOrderItems(
      orderItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }

          // Auto-fill from predefined products
          if (field === "productId" && value) {
            const product = PREDEFINED_PRODUCTS.find((p) => p.id === value)
            if (product && product.id !== "custom-item") {
              updatedItem.name = product.name
              updatedItem.price = product.price
              updatedItem.description = product.description
            } else if (product?.id === "custom-item") {
              updatedItem.name = ""
              updatedItem.price = 0
              updatedItem.description = ""
            }
          }

          return updatedItem
        }
        return item
      }),
    )
  }

  // Calculate total
  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // Get field error
  const getFieldError = (fieldName: string) => {
    return state.fieldErrors?.[fieldName]?.[0]
  }

  // Get item error
  const getItemError = (itemIndex: number, field: keyof OrderItem) => {
    return state.itemErrors?.find((error) => error.index === itemIndex && error.field === field)?.message
  }

  // Validate form before submission
  const validateForm = () => {
    const errors: string[] = []

    // Validate order items
    if (orderItems.length === 0) {
      errors.push("At least one order item is required")
    }

    orderItems.forEach((item, index) => {
      if (!item.name.trim()) {
        errors.push(`Item ${index + 1}: Product name is required`)
      }
      if (item.quantity <= 0) {
        errors.push(`Item ${index + 1}: Quantity must be greater than 0`)
      }
      if (item.price < 0) {
        errors.push(`Item ${index + 1}: Price cannot be negative`)
      }
    })

    return errors
  }

  const handleSubmit = async (formData: FormData) => {
    // Reset state
    setState(initialState)
    setIsSubmitted(false)

    // Validate form
    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      setState({
        ...initialState,
        success: false,
        message: "Please fix the following errors:",
        errors: { validation: validationErrors },
      })
      return
    }

    startTransition(async () => {
      try {
        // Add order items to form data
        formData.set("orderItems", JSON.stringify(orderItems))

        // Add honeypot field check
        const honeypot = formData.get("website") as string
        if (honeypot && honeypot.length > 0) {
          setState({
            ...initialState,
            success: false,
            message: "Submission rejected. Please try again.",
          })
          return
        }

        const result = await submitManualOrder(state, formData)
        setState(result)

        if (result.success) {
          setIsSubmitted(true)
          // Reset form on success
          setOrderItems([
            {
              id: crypto.randomUUID(),
              productId: "",
              name: "",
              quantity: 1,
              price: 0,
              description: "",
            },
          ])
        }
      } catch (error) {
        console.error("Form submission error:", error)
        setState({
          ...initialState,
          success: false,
          message: "An unexpected error occurred. Please try again.",
        })
      }
    })
  }

  if (isSubmitted && state.success) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-800 mb-4">Order Submitted Successfully!</h2>
          <p className="text-green-700 mb-6">{state.message}</p>

          {state.orderId && (
            <div className="bg-white rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">Order Reference:</p>
              <p className="font-mono text-lg font-semibold text-gray-800">{state.orderId}</p>
            </div>
          )}

          {state.emailStatus && (
            <div className="text-sm text-gray-600 mb-6">
              <p>✅ Customer confirmation: {state.emailStatus.customerEmailSent ? "Sent" : "Failed"}</p>
              <p>✅ Admin notification: {state.emailStatus.adminEmailSent ? "Sent" : "Failed"}</p>
              {state.emailStatus.emailErrors && state.emailStatus.emailErrors.length > 0 && (
                <p className="text-orange-600 mt-2">Note: Some email notifications may be delayed</p>
              )}
            </div>
          )}

          <Button
            onClick={() => {
              setIsSubmitted(false)
              setState(initialState)
            }}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Submit Another Order
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Error Messages */}
      {!state.success && state.message && (
        <Alert className="border-red-500 bg-red-50 text-red-800">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="font-medium">{state.message}</div>
            {state.errors?.validation && (
              <ul className="mt-2 list-disc list-inside text-sm">
                {state.errors.validation.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
          </AlertDescription>
        </Alert>
      )}

      <form action={handleSubmit} className="space-y-8">
        {/* Honeypot field for spam protection */}
        <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Full Name *</Label>
                <Input
                  id="customerName"
                  name="customerName"
                  type="text"
                  required
                  placeholder="Enter your full name"
                  className={getFieldError("customerName") ? "border-red-500" : ""}
                />
                {getFieldError("customerName") && (
                  <p className="text-sm text-red-600">{getFieldError("customerName")}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerEmail">Email Address *</Label>
                <Input
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  className={getFieldError("customerEmail") ? "border-red-500" : ""}
                />
                {getFieldError("customerEmail") && (
                  <p className="text-sm text-red-600">{getFieldError("customerEmail")}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerPhone">Phone Number (Optional)</Label>
              <Input
                id="customerPhone"
                name="customerPhone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                className={getFieldError("customerPhone") ? "border-red-500" : ""}
              />
              {getFieldError("customerPhone") && (
                <p className="text-sm text-red-600">{getFieldError("customerPhone")}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shippingAddressStreet">Street Address *</Label>
              <Input
                id="shippingAddressStreet"
                name="shippingAddressStreet"
                type="text"
                required
                placeholder="123 Main Street, Apt 4B"
                className={getFieldError("shippingAddressStreet") ? "border-red-500" : ""}
              />
              {getFieldError("shippingAddressStreet") && (
                <p className="text-sm text-red-600">{getFieldError("shippingAddressStreet")}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shippingAddressCity">City *</Label>
                <Input
                  id="shippingAddressCity"
                  name="shippingAddressCity"
                  type="text"
                  required
                  placeholder="New York"
                  className={getFieldError("shippingAddressCity") ? "border-red-500" : ""}
                />
                {getFieldError("shippingAddressCity") && (
                  <p className="text-sm text-red-600">{getFieldError("shippingAddressCity")}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="shippingAddressState">State/Province *</Label>
                <Input
                  id="shippingAddressState"
                  name="shippingAddressState"
                  type="text"
                  required
                  placeholder="NY"
                  className={getFieldError("shippingAddressState") ? "border-red-500" : ""}
                />
                {getFieldError("shippingAddressState") && (
                  <p className="text-sm text-red-600">{getFieldError("shippingAddressState")}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shippingAddressZip">ZIP/Postal Code *</Label>
                <Input
                  id="shippingAddressZip"
                  name="shippingAddressZip"
                  type="text"
                  required
                  placeholder="10001"
                  className={getFieldError("shippingAddressZip") ? "border-red-500" : ""}
                />
                {getFieldError("shippingAddressZip") && (
                  <p className="text-sm text-red-600">{getFieldError("shippingAddressZip")}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="shippingAddressCountry">Country *</Label>
                <Select name="shippingAddressCountry" required>
                  <SelectTrigger className={getFieldError("shippingAddressCountry") ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {getFieldError("shippingAddressCountry") && (
                  <p className="text-sm text-red-600">{getFieldError("shippingAddressCountry")}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Order Items
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {orderItems.map((item, index) => (
              <div key={item.id} className="border rounded-lg p-4 space-y-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-lg">Item {index + 1}</h4>
                  {orderItems.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeOrderItem(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Product Selection</Label>
                    <Select
                      value={item.productId || ""}
                      onValueChange={(value) => updateOrderItem(item.id, "productId", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product or choose custom" />
                      </SelectTrigger>
                      <SelectContent>
                        {PREDEFINED_PRODUCTS.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name} {product.price > 0 && `- $${product.price}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Product Name *</Label>
                    <Input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateOrderItem(item.id, "name", e.target.value)}
                      placeholder="Enter product name"
                      required
                      className={getItemError(index, "name") ? "border-red-500" : ""}
                    />
                    {getItemError(index, "name") && (
                      <p className="text-sm text-red-600">{getItemError(index, "name")}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Quantity *</Label>
                    <Input
                      type="number"
                      min="1"
                      max="99"
                      value={item.quantity}
                      onChange={(e) => updateOrderItem(item.id, "quantity", Number.parseInt(e.target.value) || 1)}
                      required
                      className={getItemError(index, "quantity") ? "border-red-500" : ""}
                    />
                    {getItemError(index, "quantity") && (
                      <p className="text-sm text-red-600">{getItemError(index, "quantity")}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Price (USD) *</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      max="9999.99"
                      value={item.price}
                      onChange={(e) => updateOrderItem(item.id, "price", Number.parseFloat(e.target.value) || 0)}
                      required
                      className={getItemError(index, "price") ? "border-red-500" : ""}
                    />
                    {getItemError(index, "price") && (
                      <p className="text-sm text-red-600">{getItemError(index, "price")}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description (Optional)</Label>
                  <Textarea
                    value={item.description || ""}
                    onChange={(e) => updateOrderItem(item.id, "description", e.target.value)}
                    placeholder="Additional details about this item"
                    rows={2}
                  />
                </div>

                <div className="text-right bg-white rounded p-3">
                  <p className="text-sm text-muted-foreground">
                    Subtotal: <span className="font-medium text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                  </p>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-4">
              <Button type="button" variant="outline" onClick={addOrderItem} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Another Item
              </Button>

              <div className="text-right">
                <p className="text-xl font-bold">
                  Total: <span className="text-purple-600">${calculateTotal().toFixed(2)}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Additional Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="notes">Special Instructions (Optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Any special instructions, gift messages, or additional information..."
                rows={4}
                maxLength={1000}
                className={getFieldError("notes") ? "border-red-500" : ""}
              />
              {getFieldError("notes") && <p className="text-sm text-red-600">{getFieldError("notes")}</p>}
              <p className="text-sm text-muted-foreground">Maximum 1000 characters</p>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Submit Button */}
        <div className="flex flex-col items-center space-y-4">
          <Button
            type="submit"
            size="lg"
            disabled={isPending || orderItems.length === 0 || calculateTotal() === 0}
            className="w-full md:w-auto px-8 py-3 text-lg bg-purple-600 hover:bg-purple-700"
          >
            {isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing Order...
              </>
            ) : (
              <>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Submit Order (${calculateTotal().toFixed(2)})
              </>
            )}
          </Button>

          <p className="text-sm text-muted-foreground text-center max-w-md">
            By submitting this order, you agree to our terms of service. We'll contact you within 24 hours with payment
            instructions and shipping details.
          </p>
        </div>
      </form>
    </div>
  )
}

export default ManualCheckoutForm
