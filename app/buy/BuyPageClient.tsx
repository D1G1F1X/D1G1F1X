"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Loader2, ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useManualCart } from "@/contexts/manual-cart-context"
import Link from "next/link"
import { getProducts } from "@/lib/products" // Assuming this fetches product data

interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  isActive: boolean
}

export function BuyPageClient() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addItem, cartItems } = useManualCart()
  const { toast } = useToast()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts()
        setProducts(fetchedProducts.filter((p) => p.isActive)) // Only show active products
      } catch (err) {
        setError("Failed to load products. Please try again later.")
        console.error("Error fetching products:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleAddToCart = (product: Product) => {
    addItem(product)
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
      action: (
        <Link href="/checkout">
          <Button variant="outline" className="whitespace-nowrap bg-transparent">
            View Cart <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      ),
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg text-muted-foreground">Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-center text-red-500">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary-foreground mb-4">Our Sacred Offerings</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of NUMO Oracle decks, guidebooks, and tools designed to deepen your spiritual journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card
            key={product.id}
            className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-60 w-full">
              <Image
                src={product.imageUrl || "/placeholder.svg?height=240&width=360&text=Product Image"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader className="flex-grow">
              <CardTitle className="text-2xl font-bold text-primary-foreground">{product.name}</CardTitle>
              <CardDescription className="text-muted-foreground line-clamp-3">{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="flex justify-end p-4">
              <Button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Separator className="my-12" />

      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-primary-foreground">Ready to Checkout?</h2>
        <p className="text-lg text-muted-foreground">Proceed to your cart to complete your purchase.</p>
        <Link href="/checkout">
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
            Go to Checkout <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
