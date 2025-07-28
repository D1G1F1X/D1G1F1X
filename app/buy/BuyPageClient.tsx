"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { ShoppingCart, Loader2, AlertCircle } from "lucide-react"
import { getAllProducts } from "@/lib/products" // Assuming this function exists
import type { Product } from "@/types/products" // Assuming Product type is defined
import { useManualCart } from "@/contexts/manual-cart-context"
import Link from "next/link"

export function BuyPageClient() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addToCart, cartItems } = useManualCart()
  const { toast } = useToast()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts()
        setProducts(fetchedProducts)
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
    addToCart(product)
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
      action: (
        <Link href="/manual-checkout">
          <Button variant="secondary" className="whitespace-nowrap">
            View Cart
          </Button>
        </Link>
      ),
    })
  }

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
        <p className="ml-4 text-lg text-gray-400">Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center text-red-500">
        <AlertCircle className="mr-2 h-6 w-6" />
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <h1 className="mb-8 text-center text-4xl font-bold text-gray-50">Our Products</h1>
      <p className="mb-12 text-center text-lg text-gray-300">
        Explore our range of mystical tools and resources to deepen your spiritual journey.
      </p>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
          >
            <div className="relative h-48 w-full">
              <Image
                src={product.imageUrl || "/placeholder.svg?height=192&width=384&query=product"}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.stock === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-lg font-bold text-red-400">
                  Out of Stock
                </div>
              )}
            </div>
            <CardHeader className="flex-grow">
              <CardTitle className="text-xl font-semibold text-gray-50">{product.name}</CardTitle>
              <CardDescription className="text-gray-400">{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">${product.price.toFixed(2)}</div>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button className="w-full" onClick={() => handleAddToCart(product)} disabled={product.stock === 0}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
