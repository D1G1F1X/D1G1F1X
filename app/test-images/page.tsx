"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestImagesPage() {
  const images = [
    {
      category: "Tools",
      items: [
        { path: "/images/tools/card-simulator.png", name: "Card Simulator" },
        { path: "/images/tools/numerology-calculator.png", name: "Numerology Calculator" },
        { path: "/images/tools/card-directory.png", name: "Card Directory" },
        { path: "/images/tools/elemental-dice.png", name: "Elemental Dice" },
      ],
    },
    {
      category: "Blog",
      items: [
        { path: "/images/blog/elements-numerology.png", name: "Elements in Numerology" },
        { path: "/images/blog/sacred-geometry.png", name: "Sacred Geometry" },
        { path: "/images/blog/tarot-numerology.png", name: "Tarot & Numerology" },
        { path: "/images/blog/life-path.png", name: "Life Path" },
        { path: "/images/blog/cauldron-symbolism.png", name: "Cauldron Symbolism" },
      ],
    },
    {
      category: "Products",
      items: [
        { path: "/images/products/standard-deck.png", name: "Standard Deck" },
        { path: "/images/products/deluxe-deck.png", name: "Deluxe Deck" },
        { path: "/images/products/digital-app.png", name: "Digital App" },
        { path: "/images/products/reading-cloth.png", name: "Reading Cloth" },
        { path: "/images/products/guidebook.png", name: "Guidebook" },
        { path: "/images/products/crystal-set.png", name: "Crystal Set" },
      ],
    },
    {
      category: "About",
      items: [{ path: "/images/about/goddess-danu.png", name: "Goddess Danu" }],
    },
    {
      category: "Hero",
      items: [{ path: "/images/hero/oracle-cards-spread.png", name: "Oracle Cards Spread" }],
    },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Image Test Page</h1>

      {images.map((category) => (
        <Card key={category.category} className="mb-8">
          <CardHeader>
            <CardTitle>{category.category} Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map((image) => (
                <div key={image.path} className="space-y-2">
                  <p className="text-sm font-medium">{image.name}</p>
                  <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={image.path || "/placeholder.svg"}
                      alt={image.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        console.error(`Failed to load: ${image.path}`)
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">{image.path}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
