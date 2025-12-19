"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import StripeCheckoutButton from "@/components/stripe-payment-form"
import { useAuth } from "@/contexts/auth-context"
import { Sparkles, Lock, Heart, Star, CheckCircle } from "lucide-react"
import { availableProducts } from "@/lib/products"

const PRIVATE_READING_PRICE_KEY = "privateReadingPrice"

export default function PrivateReadingClient() {
  const { user } = useAuth()
  const [cancelUrl, setCancelUrl] = useState<string | undefined>(undefined)
  const [successUrl, setSuccessUrl] = useState<string | undefined>(undefined)
  const [mounted, setMounted] = useState(false)
  
  // Get default price from products (same on server and client to avoid hydration mismatch)
  const privateReadingProduct = availableProducts.find((p) => p.id === "private-reading")
  const defaultPrice = privateReadingProduct?.price || 500
  
  // Start with default price to match server render
  const [price, setPrice] = useState(defaultPrice)

  // Set URLs and load price from localStorage after mount (client-side only)
  useEffect(() => {
    setMounted(true)
    
    if (typeof window !== "undefined") {
      setCancelUrl(`${window.location.origin}/private-reading`)
      setSuccessUrl(`${window.location.origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`)
      
      // Load saved price from localStorage after mount
      const saved = localStorage.getItem(PRIVATE_READING_PRICE_KEY)
      if (saved) {
        const parsed = parseFloat(saved)
        if (!isNaN(parsed) && parsed > 0) {
          setPrice(parsed)
        }
      }
    }
  }, [])

  // Save price to localStorage when it changes
  const handlePriceChange = (newPrice: number) => {
    setPrice(newPrice)
    if (typeof window !== "undefined") {
      localStorage.setItem(PRIVATE_READING_PRICE_KEY, newPrice.toString())
    }
  }

  const privateReadingItem = {
    id: privateReadingProduct?.id || "private-reading",
    name: privateReadingProduct?.name || "Private Reading Session",
    description:
      privateReadingProduct?.description ||
      "A personalized, one-on-one reading session with our expert readers. This private session is tailored to your specific questions and needs, providing deep insights and guidance.",
    price: price,
    quantity: 1,
    image: privateReadingProduct?.image || "/images/products/ai-fallback-oracle-product.png",
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Private Reading Experience</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Get personalized guidance from our expert readers in a private, confidential session.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Features Card */}
        <Card className="bg-gray-800/70 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-300 flex items-center gap-2">
              <Sparkles className="h-6 w-6" />
              What's Included
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-white mb-1">Personalized Session</h4>
                <p className="text-sm text-gray-400">
                  One-on-one consultation tailored to your specific questions and concerns
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-white mb-1">Expert Reader</h4>
                <p className="text-sm text-gray-400">
                  Work with our experienced and certified readers
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-white mb-1">Confidential & Private</h4>
                <p className="text-sm text-gray-400">
                  Your session is completely private and confidential
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-white mb-1">Detailed Insights</h4>
                <p className="text-sm text-gray-400">
                  Receive comprehensive guidance and actionable insights
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits Card */}
        <Card className="bg-gray-800/70 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-300 flex items-center gap-2">
              <Heart className="h-6 w-6" />
              Why Choose Private Reading
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Star className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-white mb-1">Focused Attention</h4>
                <p className="text-sm text-gray-400">
                  Get undivided attention with no time constraints
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-white mb-1">Complete Privacy</h4>
                <p className="text-sm text-gray-400">
                  Your questions and readings remain completely confidential
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-white mb-1">Customized Experience</h4>
                <p className="text-sm text-gray-400">
                  Reading tailored specifically to your unique situation
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Heart className="h-5 w-5 text-pink-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-white mb-1">Follow-up Support</h4>
                <p className="text-sm text-gray-400">
                  Opportunity to ask clarifying questions and get additional guidance
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Purchase Card */}
      <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-white mb-2">Private Reading Session</CardTitle>
          <CardDescription className="text-lg text-gray-300">
            {privateReadingItem.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="inline-block bg-purple-600/20 border border-purple-500/50 rounded-lg px-6 py-4">
              <p className="text-sm text-gray-400 mb-1">Price</p>
              <p className="text-4xl font-bold text-white">${privateReadingItem.price.toFixed(2)}</p>
            </div>
            
            {/* Price Editor - Simple input box */}
            <div className="max-w-xs mx-auto">
              <Label htmlFor="price-input" className="text-sm text-gray-400 mb-2 block">
                Edit Price ($)
              </Label>
              <Input
                id="price-input"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => {
                  const newPrice = parseFloat(e.target.value) || 0
                  handlePriceChange(newPrice)
                }}
                className="bg-gray-800/50 border-gray-600 text-white text-center text-lg font-semibold"
              />
            </div>
          </div>

          {user && (
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <p className="text-sm text-gray-400 mb-2">Purchasing as:</p>
              <p className="text-white font-medium">{user.email}</p>
            </div>
          )}

          <div className="space-y-3">
            <StripeCheckoutButton
              items={[privateReadingItem]}
              customerEmail={user?.email}
              className="w-full"
              cancelUrl={cancelUrl}
              successUrl={successUrl}
            >
              Purchase Private Reading - ${privateReadingItem.price.toFixed(2)}
            </StripeCheckoutButton>
          </div>

          <div className="text-center text-sm text-gray-400 space-y-2">
            <p>🔒 Secure payment processed by Stripe</p>
            <p>After purchase, you'll receive an email with instructions to schedule your reading</p>
          </div>
        </CardContent>
      </Card>

      {/* Additional Info */}
      <div className="mt-12 bg-gray-800/30 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">How It Works</h3>
        <ol className="space-y-3 text-gray-300">
          <li className="flex gap-3">
            <span className="font-bold text-purple-400">1.</span>
            <span>Complete your purchase securely through Stripe</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-purple-400">2.</span>
            <span>You'll receive a confirmation email with your order details</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-purple-400">3.</span>
            <span>Our team will contact you within 24-48 hours to schedule your reading</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-purple-400">4.</span>
            <span>Enjoy your personalized private reading session</span>
          </li>
        </ol>
      </div>
    </div>
  )
}


