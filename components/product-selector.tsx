"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus } from "lucide-react"
import Image from "next/image"

interface Product {
  id: string
  name: string
  price: number
  description: string
  image?: string
  features?: string[]
  popular?: boolean
}

const PRODUCTS: Product[] = [
  {
    id: "novice-deck",
    name: "Novice Deck",
    price: 29.99,
    description: "Perfect for beginners starting their numerology journey",
    image: "/images/products/novice-deck.png",
    features: ["55 Oracle Cards", "Basic Guidebook", "Quick Reference Sheet"],
  },
  {
    id: "standard-deck",
    name: "Standard Deck",
    price: 49.99,
    description: "Complete oracle card set for regular practice",
    image: "/images/products/standard-deck.png",
    features: ["110 Oracle Cards", "Comprehensive Guidebook", "Reading Cloth", "Storage Box"],
    popular: true,
  },
  {
    id: "deluxe-deck",
    name: "Deluxe Deck",
    price: 79.99,
    description: "Premium edition with exclusive extras",
    image: "/images/products/deluxe-deck.png",
    features: ["110 Premium Cards", "Hardcover Guidebook", "Silk Reading Cloth", "Wooden Storage Box", "Crystal Set"],
  },
  {
    id: "adept-deck",
    name: "Adept Deck",
    price: 99.99,
    description: "Advanced practitioner set with master-level content",
    image: "/images/products/adept-deck.png",
    features: ["165 Master Cards", "Advanced Guidebook", "Premium Accessories", "Exclusive Content"],
  },
  {
    id: "guidebook",
    name: "Standalone Guidebook",
    price: 19.99,
    description: "Comprehensive guide to numerology and card reading",
    image: "/images/products/guidebook.png",
    features: ["200+ Pages", "Full-Color Illustrations", "Advanced Techniques", "Reference Tables"],
  },
  {
    id: "reading-cloth",
    name: "Sacred Reading Cloth",
    price: 24.99,
    description: "Beautiful cloth for creating sacred reading space",
    image: "/images/products/reading-cloth.png",
    features: ["Premium Fabric", "Sacred Geometry Design", '24" x 24" Size', "Care Instructions"],
  },
]

interface ProductSelectorProps {
  onProductSelect: (product: Product) => void
  selectedProducts: string[]
}

export default function ProductSelector({ onProductSelect, selectedProducts }: ProductSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {PRODUCTS.map((product) => (
        <Card key={product.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
          {product.popular && <Badge className="absolute top-2 right-2 z-10 bg-purple-600">Most Popular</Badge>}

          <CardHeader className="pb-2">
            <div className="aspect-square relative mb-2 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg?height=200&width=200"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <CardTitle className="text-lg">{product.name}</CardTitle>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-purple-600">${product.price}</span>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">{product.description}</p>

            {product.features && (
              <ul className="text-sm space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            <Button
              onClick={() => onProductSelect(product)}
              className="w-full"
              variant={selectedProducts.includes(product.id) ? "secondary" : "default"}
            >
              {selectedProducts.includes(product.id) ? (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Added to Order
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Order
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
