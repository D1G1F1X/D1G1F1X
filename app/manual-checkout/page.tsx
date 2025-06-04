"use client"

import Link from "next/link"
import { useEffect, useState, Suspense, useId } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { submitManualOrder } from "./actions"
import type { OrderItem } from "./actions"
import { useFormStatus } from "react-dom"
import { useActionState } from "react"
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  ShoppingCart,
  User,
  Mail,
  Phone,
  Home,
  Send,
  PlusCircle,
  Trash2,
  Package,
  ListPlus,
} from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { buyPageDropdownProducts } from "@/lib/products"

const initialFormState = {
  message: "",
  success: false,
  fieldErrors: null,
  itemErrors: null,
  orderId: null,
}

// Extend OrderItem for client-side state to include if it's a custom item
interface ClientOrderItem extends OrderItem {
  isCustom: boolean
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting Order...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" /> Submit Manual Order
        </>
      )}
    </Button>
  )
}

function ManualCheckoutFormContent() {
  const [items, setItems] = useState<ClientOrderItem[]>([])
  const [total, setTotal] = useState(0)
  const [formState, formAction] = useActionState(submitManualOrder, initialFormState)
  const formId = useId()

  useEffect(() => {
    const newTotal = items.reduce((acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0)
    setTotal(newTotal)
  }, [items])

  const handleAddItem = () => {
    setItems([...items, { id: uuidv4(), productId: undefined, name: "", quantity: 1, price: 0, isCustom: true }])
  }

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleItemChange = (
    id: string,
    field: keyof Omit<ClientOrderItem, "id" | "isCustom">,
    value: string | number,
  ) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }
          return updatedItem
        }
        return item
      }),
    )
  }

  const handleProductSelect = (itemId: string, selectedProductId: string) => {
    const product = buyPageDropdownProducts.find((p) => p.id === selectedProductId)
    if (product) {
      setItems(
        items.map((item) =>
          item.id === itemId
            ? { ...item, productId: product.id, name: product.name, price: product.price, isCustom: false }
            : item,
        ),
      )
    } else {
      setItems(
        items.map((item) =>
          item.id === itemId
            ? {
                ...item,
                productId: undefined,
                name: item.isCustom ? item.name : "",
                price: item.isCustom ? item.price : 0,
                isCustom: true,
              }
            : item,
        ),
      )
    }
  }

  const getItemError = (itemId: string, field: keyof OrderItem) => {
    if (!formState.itemErrors) return null
    const itemIndex = items.findIndex((i) => i.id === itemId)
    if (itemIndex === -1) return null
    const error = formState.itemErrors.find((err) => err.index === itemIndex && err.field === field)
    return error ? error.message : null
  }

  if (formState.success && formState.orderId) {
    return (
      <div className="text-center py-10">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-semibold text-white mb-2">Order Submitted Successfully!</h2>
        <p className="text-gray-300 mb-4">
          Your order (ID: {formState.orderId}) has been received. We will contact you shortly with payment and shipping
          details.
        </p>
        <Button
          asChild
          variant="outline"
          className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
        >
          <Link href="/buy">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="bg-gray-800 border-gray-700 shadow-xl md:col-span-2">
        <CardHeader>
          <CardTitle className="text-xl text-purple-400 flex items-center justify-between">
            <div className="flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5" /> Order Items
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleAddItem}
              className="text-purple-400 border-purple-500 hover:bg-purple-500 hover:text-white"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Item
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {items.length === 0 && (
            <p className="text-gray-400 text-center py-4">No items added yet. Click "Add Item" to start.</p>
          )}
          {items.map((item) => (
            <div key={item.id} className="p-4 rounded-md border border-gray-700 bg-gray-750 space-y-3 relative">
              <button
                type="button"
                onClick={() => handleRemoveItem(item.id)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-400 p-1"
                aria-label="Remove item"
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr] gap-x-4 gap-y-3 items-end">
                <div>
                  <Label
                    htmlFor={`${formId}-itemSelect-${item.id}`}
                    className="text-gray-300 text-sm flex items-center"
                  >
                    <ListPlus className="h-4 w-4 mr-1 text-gray-400" /> Select Product
                  </Label>
                  <Select
                    value={item.productId || "custom"}
                    onValueChange={(value) => handleProductSelect(item.id, value)}
                  >
                    <SelectTrigger
                      id={`${formId}-itemSelect-${item.id}`}
                      className="bg-gray-700 border-gray-600 text-white"
                    >
                      <SelectValue placeholder="Select a product or add custom" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 text-white border-gray-600">
                      <SelectItem value="custom" className="hover:bg-gray-600 focus:bg-gray-600">
                        -- Add Custom Item --
                      </SelectItem>
                      {buyPageDropdownProducts.map((product) => (
                        <SelectItem key={product.id} value={product.id} className="hover:bg-gray-600 focus:bg-gray-600">
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor={`${formId}-itemName-${item.id}`} className="text-gray-300 text-sm">
                    Item Name/Description
                  </Label>
                  <Input
                    id={`${formId}-itemName-${item.id}`}
                    value={item.name}
                    onChange={(e) => handleItemChange(item.id, "name", e.target.value)}
                    placeholder="e.g. Novice Oracle Deck"
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                    readOnly={!item.isCustom && !!item.productId}
                  />
                  {getItemError(item.id, "name") && (
                    <p className="text-red-400 text-xs mt-1">{getItemError(item.id, "name")}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor={`${formId}-itemQuantity-${item.id}`} className="text-gray-300 text-sm">
                    Quantity
                  </Label>
                  <Input
                    id={`${formId}-itemQuantity-${item.id}`}
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, "quantity", e.target.value)}
                    min="1"
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                  />
                  {getItemError(item.id, "quantity") && (
                    <p className="text-red-400 text-xs mt-1">{getItemError(item.id, "quantity")}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor={`${formId}-itemPrice-${item.id}`} className="text-gray-300 text-sm">
                    Unit Price ($)
                  </Label>
                  <Input
                    id={`${formId}-itemPrice-${item.id}`}
                    type="number"
                    value={item.price}
                    onChange={(e) => handleItemChange(item.id, "price", e.target.value)}
                    min="0"
                    step="0.01"
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                    readOnly={!item.isCustom && !!item.productId}
                  />
                  {getItemError(item.id, "price") && (
                    <p className="text-red-400 text-xs mt-1">{getItemError(item.id, "price")}</p>
                  )}
                </div>
              </div>
              <div className="text-right text-gray-300 font-medium pt-2">
                Item Total: ${((Number(item.price) || 0) * (Number(item.quantity) || 0)).toFixed(2)}
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="border-t border-gray-700 pt-4 flex justify-end">
          <div className="text-xl font-semibold text-white">Grand Total: ${total.toFixed(2)}</div>
        </CardFooter>
        {formState.errors?.orderItems && (
          <div className="px-6 pb-4 text-red-400 text-sm">{formState.errors.orderItems[0]}</div>
        )}
      </Card>

      <Card className="bg-gray-800 border-gray-700 shadow-xl md:col-span-2">
        <CardHeader>
          <CardTitle className="text-xl text-purple-400 flex items-center">
            <Package className="mr-2 h-5 w-5" /> Customer & Shipping
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <input type="hidden" name="orderItems" value={JSON.stringify(items.map(({ isCustom, ...rest }) => rest))} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="customerName" className="flex items-center text-gray-300">
                  <User className="mr-2 h-4 w-4 text-gray-400" /> Full Name
                </Label>
                <Input
                  id="customerName"
                  name="customerName"
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                  placeholder="e.g. Jane Doe"
                />
                {formState.fieldErrors?.customerName && (
                  <p className="text-red-400 text-xs mt-1">{formState.fieldErrors.customerName[0]}</p>
                )}
              </div>
              <div>
                <Label htmlFor="customerEmail" className="flex items-center text-gray-300">
                  <Mail className="mr-2 h-4 w-4 text-gray-400" /> Email
                </Label>
                <Input
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                  placeholder="e.g. jane.doe@example.com"
                />
                {formState.fieldErrors?.customerEmail && (
                  <p className="text-red-400 text-xs mt-1">{formState.fieldErrors.customerEmail[0]}</p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="customerPhone" className="flex items-center text-gray-300">
                <Phone className="mr-2 h-4 w-4 text-gray-400" /> Phone (Optional)
              </Label>
              <Input
                id="customerPhone"
                name="customerPhone"
                type="tel"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                placeholder="e.g. (555) 123-4567"
              />
            </div>
            <div className="pt-4 border-t border-gray-600">
              <h3 className="text-lg font-medium text-purple-300 mb-2">Shipping Address</h3>
              <div>
                <Label htmlFor="shippingAddressStreet" className="flex items-center text-gray-300">
                  <Home className="mr-2 h-4 w-4 text-gray-400" /> Street Address
                </Label>
                <Input
                  id="shippingAddressStreet"
                  name="shippingAddressStreet"
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                  placeholder="e.g. 123 Oracle Lane"
                />
                {formState.fieldErrors?.shippingAddressStreet && (
                  <p className="text-red-400 text-xs mt-1">{formState.fieldErrors.shippingAddressStreet[0]}</p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="shippingAddressCity" className="text-gray-300">
                    City
                  </Label>
                  <Input
                    id="shippingAddressCity"
                    name="shippingAddressCity"
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                    placeholder="e.g. Mystic Springs"
                  />
                  {formState.fieldErrors?.shippingAddressCity && (
                    <p className="text-red-400 text-xs mt-1">{formState.fieldErrors.shippingAddressCity[0]}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="shippingAddressState" className="text-gray-300">
                    State/Province
                  </Label>
                  <Input
                    id="shippingAddressState"
                    name="shippingAddressState"
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                    placeholder="e.g. CA"
                  />
                  {formState.fieldErrors?.shippingAddressState && (
                    <p className="text-red-400 text-xs mt-1">{formState.fieldErrors.shippingAddressState[0]}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="shippingAddressZip" className="text-gray-300">
                    ZIP/Postal Code
                  </Label>
                  <Input
                    id="shippingAddressZip"
                    name="shippingAddressZip"
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                    placeholder="e.g. 90210"
                  />
                  {formState.fieldErrors?.shippingAddressZip && (
                    <p className="text-red-400 text-xs mt-1">{formState.fieldErrors.shippingAddressZip[0]}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="shippingAddressCountry" className="text-gray-300">
                    Country
                  </Label>
                  <Input
                    id="shippingAddressCountry"
                    name="shippingAddressCountry"
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                    placeholder="e.g. USA"
                  />
                  {formState.fieldErrors?.shippingAddressCountry && (
                    <p className="text-red-400 text-xs mt-1">{formState.fieldErrors.shippingAddressCountry[0]}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="notes" className="text-gray-300">
                Order Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                name="notes"
                rows={3}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-500"
                placeholder="Any special instructions or notes for your order?"
              />
            </div>
            {formState.message && !formState.success && (
              <div className="mt-4 p-3 rounded-md bg-red-900 text-red-200 border border-red-700 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>{formState.message}</span>
              </div>
            )}
            <CardFooter className="p-0 pt-6">
              <SubmitButton />
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ManualCheckoutPage() {
  return (
    <main className="container mx-auto px-4 py-12 bg-gray-900 text-white min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-400">Manual Order Request</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mt-2">
          Build your order below. We will contact you to arrange payment and confirm shipping.
        </p>
      </div>
      <Suspense
        fallback={
          <div className="text-center text-white py-10">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-purple-400" />
            <p className="mt-2">Loading...</p>
          </div>
        }
      >
        <ManualCheckoutFormContent />
      </Suspense>
    </main>
  )
}
