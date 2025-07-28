import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ShoppingCart, CreditCard, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CheckoutPage() {
  // Mock cart items
  const cartItems = [
    {
      id: "prod1",
      name: "Deluxe Oracle Deck",
      quantity: 1,
      price: 49.99,
      imageUrl: "/images/products/deluxe-deck.png",
    },
    { id: "prod2", name: "Numerology Report", quantity: 1, price: 19.99, imageUrl: "/images/products/digital-app.png" },
  ]
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.0
  const taxRate = 0.08
  const tax = subtotal * taxRate
  const total = subtotal + shipping + tax

  return (
    <div
      className="relative min-h-screen bg-cover bg-center py-12"
      style={{ backgroundImage: "url('/checkout-page-background.png')" }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <div className="relative z-10 container mx-auto px-4">
        <Card className="max-w-4xl mx-auto bg-gray-900/90 text-gray-50 border-gray-700 shadow-lg">
          <CardHeader className="text-center">
            <ShoppingCart className="mx-auto h-12 w-12 text-purple-400 mb-2" />
            <CardTitle className="text-3xl font-bold">Checkout</CardTitle>
            <CardDescription className="text-gray-300">Complete your purchase.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-8 md:grid-cols-2">
            {/* Order Summary */}
            <div>
              <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-2 border-t border-gray-700 pt-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax ({taxRate * 100}%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-purple-400">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment and Shipping */}
            <div>
              <h2 className="mb-4 text-xl font-semibold">Shipping & Payment</h2>
              <form className="space-y-4">
                {/* Shipping Address */}
                <div>
                  <h3 className="mb-2 text-lg font-medium">Shipping Address</h3>
                  <div className="grid gap-3">
                    <Input placeholder="Full Name" />
                    <Input placeholder="Address Line 1" />
                    <Input placeholder="Address Line 2 (Optional)" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder="City" />
                      <Input placeholder="State / Province" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder="Zip / Postal Code" />
                      <Input placeholder="Country" />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="pt-4">
                  <h3 className="mb-2 text-lg font-medium">Payment Information</h3>
                  <div className="grid gap-3">
                    <Input placeholder="Card Number" />
                    <div className="grid grid-cols-3 gap-3">
                      <Input placeholder="MM/YY" />
                      <Input placeholder="CVC" />
                      <Input placeholder="Zip Code" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="save-card" />
                      <Label htmlFor="save-card">Save card for future purchases</Label>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  <CreditCard className="mr-2 h-5 w-5" /> Pay Now (${total.toFixed(2)})
                </Button>
              </form>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pt-6">
            <Link href="/buy" passHref>
              <Button variant="link" className="text-gray-400 hover:text-gray-200">
                <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
