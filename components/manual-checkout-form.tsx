"use client"

import { useState, useEffect } from "react"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Minus, ShoppingCart, AlertCircle, CheckCircle } from "lucide-react"
import { useManualCart, type Product } from "@/contexts/manual-cart-context"
import { submitManualOrder, type OrderItem } from "@/app/manual-checkout/actions"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Sample products for the manual checkout
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "novice-deck",
    name: "NUMO Oracle Novice Deck",
    price: 29.99,
    description: "Perfect starter deck for beginners",
    image: "/images/products/novice-deck.png",
  },
  {
    id: "standard-deck",
    name: "NUMO Oracle Standard Deck",
    price: 49.99,
    description: "Complete deck with guidebook",
    image: "/images/products/standard-deck.png",
  },
  {
    id: "deluxe-deck",
    name: "NUMO Oracle Deluxe Deck",
    price: 89.99,
    description: "Premium deck with accessories",
    image: "/images/products/deluxe-deck.png",
  },
  {
    id: "guidebook",
    name: "NUMO Oracle Guidebook",
    price: 19.99,
    description: "Comprehensive guide to oracle reading",
    image: "/images/products/guidebook.png",
  },
  {
    id: "reading-cloth",
    name: "Sacred Reading Cloth",
    price: 24.99,
    description: "Mystical cloth for card readings",
    image: "/images/products/reading-cloth.png",
  },
]

export default function ManualCheckoutForm() {
  const { items, addItem, removeItem, updateItemQuantity, clearCart, getCartTotal, isCartLoaded } = useManualCart()
  const [selectedProduct, setSelectedProduct] = useState<string>("")
  const [customItemName, setCustomItemName] = useState("")
  const [customItemPrice, setCustomItemPrice] = useState("")
  const [itemQuantity, setItemQuantity] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)

  const [state, formAction, isPending] = useActionState(submitManualOrder, {
    message: "",
    success: false,
    errors: null,
    fieldErrors: null,
    itemErrors: null,
    orderId: null,
  })

  // Show success message and clear cart on successful submission
  useEffect(() => {
    if (state.success && state.orderId) {
      setShowSuccess(true)
      clearCart()
      // Auto-hide success message after 10 seconds
      const timer = setTimeout(() => setShowSuccess(false), 10000)
      return () => clearTimeout(timer)
    }
  }, [state.success, state.orderId, clearCart])

  const addProductToCart = () => {
    if (selectedProduct) {
      const product = SAMPLE_PRODUCTS.find((p) => p.id === selectedProduct)
      if (product) {
        addItem(product, itemQuantity)
        setSelectedProduct("")
        setItemQuantity(1)
      }
    }
  }

  const addCustomItemToCart = () => {
    if (customItemName && customItemPrice) {
      const customProduct: Product = {
        id: `custom-${Date.now()}`,
        name: customItemName,
        price: Number.parseFloat(customItemPrice),
        description: "Custom item",
      }
      addItem(customProduct, itemQuantity)
      setCustomItemName("")
      setCustomItemPrice("")
      setItemQuantity(1)
    }
  }

  const handleSubmit = (formData: FormData) => {
    // Add order items to form data
    const orderItems: OrderItem[] = items.map((item) => ({
      id: item.product.id,
      productId: item.product.id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    }))

    formData.set("orderItems", JSON.stringify(orderItems))
    formAction(formData)
  }

  if (!isCartLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading checkout...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {showSuccess && (
        <Alert className="border-green-500 bg-green-50 text-green-800">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Order submitted successfully!</strong> Order ID: {state.orderId}. We will contact you shortly to
            process your order.
          </AlertDescription>
        </Alert>
      )}

      {state.message && !state.success && (
        <Alert className="border-red-500 bg-red-50 text-red-800">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Order Items Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Order Items
              </CardTitle>
              <CardDescription>Add products to your manual order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Predefined Product */}
              <div className="space-y-4">
                <h4 className="font-medium">Add Product</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="product-select">Product</Label>
                    <select
                      id="product-select"
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white"
                    >
                      <option value="">Select a product...</option>
                      {SAMPLE_PRODUCTS.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} - ${product.price}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="product-quantity">Quantity</Label>
                    <Input
                      id="product-quantity"
                      type="number"
                      min="1"
                      value={itemQuantity}
                      onChange={(e) => setItemQuantity(Number.parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button type="button" onClick={addProductToCart} disabled={!selectedProduct} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Add Custom Item */}
              <div className="space-y-4">
                <h4 className="font-medium">Add Custom Item</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="custom-name">Item Name</Label>
                    <Input
                      id="custom-name"
                      value={customItemName}
                      onChange={(e) => setCustomItemName(e.target.value)}
                      placeholder="Custom item name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="custom-price">Price ($)</Label>
                    <Input
                      id="custom-price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={customItemPrice}
                      onChange={(e) => setCustomItemPrice(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="custom-quantity">Quantity</Label>
                    <Input
                      id="custom-quantity"
                      type="number"
                      min="1"
                      value={itemQuantity}
                      onChange={(e) => setItemQuantity(Number.parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      onClick={addCustomItemToCart}
                      disabled={!customItemName || !customItemPrice}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Cart Items */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Cart Items ({items.length})</h4>
                  {items.length > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-700"
                    >
                      Clear All
                    </Button>
                  )}
                </div>

                {items.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No items in cart. Add some products above.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {items.map((item, index) => (
                      <div
                        key={`${item.product.id}-${index}`}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <h5 className="font-medium">{item.product.name}</h5>
                          <p className="text-sm text-gray-600">${item.product.price.toFixed(2)} each</p>
                          {state.itemErrors
                            ?.filter((error) => error.index === index)
                            .map((error, errorIndex) => (
                              <p key={errorIndex} className="text-sm text-red-600 mt-1">
                                {error.field}: {error.message}
                              </p>
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => updateItemQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => updateItemQuantity(item.product.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Badge variant="secondary">${(item.product.price * item.quantity).toFixed(2)}</Badge>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(item.product.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-4 border-t">
                      <span className="font-medium">Total:</span>
                      <span className="text-xl font-bold">${getCartTotal().toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Information Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <CardDescription>Enter customer details and shipping information</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={handleSubmit} className="space-y-6">
                {/* Customer Details */}
                <div className="space-y-4">
                  <h4 className="font-medium">Customer Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="customerName">Full Name *</Label>
                      <Input
                        id="customerName"
                        name="customerName"
                        required
                        className={state.fieldErrors?.customerName ? "border-red-500" : ""}
                      />
                      {state.fieldErrors?.customerName && (
                        <p className="text-sm text-red-600 mt-1">{state.fieldErrors.customerName[0]}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="customerEmail">Email Address *</Label>
                      <Input
                        id="customerEmail"
                        name="customerEmail"
                        type="email"
                        required
                        className={state.fieldErrors?.customerEmail ? "border-red-500" : ""}
                      />
                      {state.fieldErrors?.customerEmail && (
                        <p className="text-sm text-red-600 mt-1">{state.fieldErrors.customerEmail[0]}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="customerPhone">Phone Number</Label>
                    <Input
                      id="customerPhone"
                      name="customerPhone"
                      type="tel"
                      className={state.fieldErrors?.customerPhone ? "border-red-500" : ""}
                    />
                    {state.fieldErrors?.customerPhone && (
                      <p className="text-sm text-red-600 mt-1">{state.fieldErrors.customerPhone[0]}</p>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Shipping Address */}
                <div className="space-y-4">
                  <h4 className="font-medium">Shipping Address</h4>
                  <div>
                    <Label htmlFor="shippingAddressStreet">Street Address *</Label>
                    <Input
                      id="shippingAddressStreet"
                      name="shippingAddressStreet"
                      required
                      className={state.fieldErrors?.shippingAddressStreet ? "border-red-500" : ""}
                    />
                    {state.fieldErrors?.shippingAddressStreet && (
                      <p className="text-sm text-red-600 mt-1">{state.fieldErrors.shippingAddressStreet[0]}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shippingAddressCity">City *</Label>
                      <Input
                        id="shippingAddressCity"
                        name="shippingAddressCity"
                        required
                        className={state.fieldErrors?.shippingAddressCity ? "border-red-500" : ""}
                      />
                      {state.fieldErrors?.shippingAddressCity && (
                        <p className="text-sm text-red-600 mt-1">{state.fieldErrors.shippingAddressCity[0]}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="shippingAddressState">State/Province *</Label>
                      <Input
                        id="shippingAddressState"
                        name="shippingAddressState"
                        required
                        className={state.fieldErrors?.shippingAddressState ? "border-red-500" : ""}
                      />
                      {state.fieldErrors?.shippingAddressState && (
                        <p className="text-sm text-red-600 mt-1">{state.fieldErrors.shippingAddressState[0]}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shippingAddressZip">ZIP/Postal Code *</Label>
                      <Input
                        id="shippingAddressZip"
                        name="shippingAddressZip"
                        required
                        className={state.fieldErrors?.shippingAddressZip ? "border-red-500" : ""}
                      />
                      {state.fieldErrors?.shippingAddressZip && (
                        <p className="text-sm text-red-600 mt-1">{state.fieldErrors.shippingAddressZip[0]}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="shippingAddressCountry">Country *</Label>
                      <Input
                        id="shippingAddressCountry"
                        name="shippingAddressCountry"
                        required
                        defaultValue="United States"
                        className={state.fieldErrors?.shippingAddressCountry ? "border-red-500" : ""}
                      />
                      {state.fieldErrors?.shippingAddressCountry && (
                        <p className="text-sm text-red-600 mt-1">{state.fieldErrors.shippingAddressCountry[0]}</p>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Order Notes */}
                <div>
                  <Label htmlFor="notes">Order Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Any special instructions or notes for this order..."
                    rows={3}
                    className={state.fieldErrors?.notes ? "border-red-500" : ""}
                  />
                  {state.fieldErrors?.notes && (
                    <p className="text-sm text-red-600 mt-1">{state.fieldErrors.notes[0]}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button type="submit" disabled={isPending || items.length === 0} className="w-full" size="lg">
                    {isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing Order...
                      </>
                    ) : (
                      <>Submit Manual Order (${getCartTotal().toFixed(2)})</>
                    )}
                  </Button>
                  {items.length === 0 && (
                    <p className="text-sm text-gray-500 text-center mt-2">
                      Please add at least one item to submit an order
                    </p>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
