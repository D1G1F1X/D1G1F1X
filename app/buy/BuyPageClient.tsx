"use client" // This page now renders client components and uses Link

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SalesInquiryForm } from "@/components/sales-inquiry-form" // Corrected: Named import
import { ShoppingBag, Info } from "lucide-react"
// import type { Metadata } from "next"; // Metadata needs to be handled differently for client components

// export const metadata: Metadata = { // Cannot export metadata from a Client Component directly
//   title: "The NUMO Oracle Card Deck | Shop & Inquire",
//   description:
//     "Purchase the NUMO Oracle Card Deck and accessories by Kraftwerk Numerology, or submit an inquiry for custom orders.",
// };

// Sample product data (replace with your actual data source)
const products = [
  {
    id: "novice-oracle-deck",
    name: "The Novice Oracle Deck",
    description:
      "Begin your journey with this essential 78-card deck, beautifully illustrated to introduce the core wisdom of the Numo Oracle.",
    price: 25.0,
    image: "/images/products/novice-deck-symbols.jpg",
    features: ["78 Full-Color Cards", "Durable Card Stock", "Includes Quick Start Guide"],
  },
  {
    id: "adepts-oracle-deck",
    name: "The Adepts Oracle Deck",
    description:
      "Deepen your practice with the Adept's 100-card Oracle system, featuring advanced elemental and archetypal cards for profound insights.",
    price: 22.0, // Updated price
    image: "/images/products/01cauldron-fire.jpg",
    features: ["100 Premium Cards", "Enhanced Artwork", "Expanded Symbology"],
  },
  {
    id: "elemental-dice-set",
    name: "10-Sided Elemental Oracle Dice Set",
    description:
      "A unique set of 10-sided dice, each representing an elemental influence to complement your readings or for quick guidance.",
    price: 11.0,
    image: "/images/tools/elemental-dice.png", // Using existing relevant image
    features: ["Set of 5 Custom Dice", "Engraved Elemental Symbols", "Portable Divination Tool"],
  },
  {
    id: "numo-spread-cloth",
    name: "Numo Oracle Spread Cloth with Guide",
    description:
      "A beautifully designed spread cloth featuring sacred Numo symbols, complete with a guide to enhance your reading experience.",
    price: 11.0,
    image: "/images/products/reading-cloth.png",
    features: ["High-Quality Fabric", "Symbolic Print", "Includes Layout Guide"],
  },
  {
    id: "digital-app-access",
    name: "Numo Oracle Digital App",
    description:
      "Access the full Numo Oracle system on the go. Features card meanings, digital spreads, reading logs, and more. Coming Soon!",
    price: 11.0,
    image: "/images/products/digital-app.png",
    features: ["Full Card Database", "Interactive Spreads", "Personal Journal"],
    status: "coming-soon", // Added status for special handling
  },
]

export default function BuyPageClient() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="py-12 bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-yellow-300 mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold">Numo Oracle Shop</h1>
        <p className="text-xl text-purple-200 mt-2 max-w-2xl mx-auto">
          Discover the tools to unlock your inner wisdom and navigate your path.
        </p>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section id="products" className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-10 text-purple-400">Our Offerings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card
                key={product.id}
                className={`bg-gray-800 border-gray-700 shadow-xl flex flex-col overflow-hidden transition-shadow duration-300 ${
                  product.status === "coming-soon"
                    ? "opacity-70" // Example: reduce opacity
                    : "hover:shadow-purple-500/30"
                }`}
              >
                <CardHeader className="p-0">
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg?width=400&height=250&query=oracle+product"}
                      alt={product.name}
                      width={400}
                      height={250}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <CardTitle className="text-xl font-semibold text-purple-300 mb-2 flex items-center justify-between">
                    {product.name}
                    {product.status === "coming-soon" && (
                      <span className="ml-2 text-xs bg-yellow-500 text-black font-bold py-0.5 px-2 rounded-full">
                        SOON
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-sm mb-4 flex-grow">
                    {product.description}
                  </CardDescription>
                  {product.features && product.features.length > 0 && (
                    <ul className="text-xs text-gray-500 space-y-1 mb-4 list-disc list-inside">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  )}
                  <p className="text-2xl font-bold text-yellow-400 mb-auto">${product.price.toFixed(2)}</p>
                </CardContent>
                <CardFooter className="p-6 bg-gray-800/50 border-t border-gray-700/50">
                  {product.status === "coming-soon" ? (
                    <Button
                      disabled
                      className="w-full bg-gray-600 hover:bg-gray-600 text-gray-400 cursor-not-allowed flex items-center justify-center"
                    >
                      <Info className="mr-2 h-4 w-4" />
                      Coming Soon - ${product.price.toFixed(2)}
                    </Button>
                  ) : (
                    <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      <Link
                        href={`/manual-checkout?productId=${encodeURIComponent(product.id)}&productName=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.image)}`}
                      >
                        Buy Now
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section id="custom-orders" className="py-16 bg-gray-800/50 rounded-lg shadow-xl border border-gray-700">
          <div className="container mx-auto px-6 text-center">
            <Info className="mx-auto h-12 w-12 text-purple-400 mb-4" />
            <h2 className="text-3xl font-semibold mb-6 text-purple-300">Custom Orders & Bulk Inquiries</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Looking for something specific, a bulk order for your group, or wholesale options? Fill out the form
              below, and we'll get back to you to discuss your needs.
            </p>
            <div className="max-w-lg mx-auto">
              <SalesInquiryForm /> {/* This should now work */}
            </div>
          </div>
        </section>
      </main>

      <footer className="text-center py-8 mt-12 border-t border-gray-700">
        <p className="text-gray-500">&copy; {new Date().getFullYear()} Numo Oracle. All rights reserved.</p>
      </footer>
    </div>
  )
}
