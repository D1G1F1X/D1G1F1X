"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useTransition } from "react"
import { ShoppingBag, Info, AlertCircle, CheckCircle } from "lucide-react"

import { submitSalesInquiry, type SalesInquiryState } from "./actions"

const products = [
  {
    id: "novice-oracle-deck",
    name: "The Novice Oracle Deck",
    description:
      "Begin your journey with this larger-format deck, featuring 25 beautifully illustrated cards with keywords printed directly on them to help you learn the NUMO Oracle system.",
    price: 25.0,
    image: "/images/products/novice-deck-symbols.jpg",
    features: [
      "25 Full-Color Cards in Larger Format",
      "Keywords Printed on Cards for Easy Learning",
      "Durable Premium Card Stock",
      "Includes Premium Website Access",
      "Perfect for Beginners",
    ],
    status: "available",
  },
  {
    id: "adepts-oracle-deck",
    name: "The Adepts Oracle Deck",
    description:
      "For the experienced practitioner, this standard-sized 25-card deck offers a more compact and refined experience without printed keywords for a cleaner aesthetic.",
    price: 22.0,
    image: "/images/products/01cauldron-fire.jpg",
    features: [
      "25 Premium Cards in Standard Size",
      "Clean Design Without Printed Keywords",
      "Durable Premium Card Stock",
      "Includes Premium Website Access",
      "Ideal for Experienced Readers",
    ],
    status: "available",
  },
  {
    id: "elemental-dice-set",
    name: "10-Sided Elemental Oracle Dice Set",
    description:
      "A unique set of 10-sided dice, each representing an elemental influence to complement your readings or for quick guidance.",
    price: 11.0,
    image: "/images/tools/elemental-dice.png",
    features: ["Set of 5 Custom Dice", "Engraved Elemental Symbols", "Portable Divination Tool"],
    status: "coming-soon",
  },
  {
    id: "numo-spread-cloth",
    name: "Numo Oracle Spread Cloth with Guide",
    description:
      "A beautifully designed spread cloth featuring sacred Numo symbols, complete with a guide to enhance your reading experience.",
    price: 11.0,
    image: "/images/products/speardcloth01.jpg.jpg",
    features: ["High-Quality Fabric", "Symbolic Print", "Includes Layout Guide"],
    status: "available",
  },
]

function SalesInquiryFormComponent() {
  const [formState, setFormState] = useState<SalesInquiryState>({
    message: "",
    success: false,
    fieldErrors: {},
  })
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const result = await submitSalesInquiry(formState, formData)
        setFormState(result)
      } catch (error) {
        setFormState({
          message: "An error occurred while submitting your inquiry.",
          success: false,
          fieldErrors: {},
        })
      }
    })
  }

  return (
    <form action={handleSubmit} className="space-y-4 text-left">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        />
        {formState?.fieldErrors?.name && <p className="text-red-400 text-xs mt-1">{formState.fieldErrors.name[0]}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        />
        {formState?.fieldErrors?.email && <p className="text-red-400 text-xs mt-1">{formState.fieldErrors.email[0]}</p>}
      </div>
      <div>
        <label htmlFor="product_interest" className="block text-sm font-medium text-gray-300">
          Product of Interest
        </label>
        <select
          name="product_interest"
          id="product_interest"
          required
          className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        >
          <option value="">Select a product</option>
          {products
            .filter((p) => p.status === "available")
            .map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          <option value="custom-request">Custom Request / Bulk Order</option>
        </select>
        {formState?.fieldErrors?.product_interest && (
          <p className="text-red-400 text-xs mt-1">{formState.fieldErrors.product_interest[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-300">
          Quantity
        </label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          defaultValue="1"
          min="1"
          required
          className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        />
        {formState?.fieldErrors?.quantity && (
          <p className="text-red-400 text-xs mt-1">{formState.fieldErrors.quantity[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-300">
          Notes / Specifications
        </label>
        <textarea
          name="notes"
          id="notes"
          rows={3}
          className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        ></textarea>
      </div>

      {formState?.message && (
        <div
          className={`p-3 rounded-md text-sm flex items-center ${formState.success ? "bg-green-800 border-green-600 text-green-200" : "bg-red-800 border-red-600 text-red-200"}`}
        >
          {formState.success ? <CheckCircle className="h-5 w-5 mr-2" /> : <AlertCircle className="h-5 w-5 mr-2" />}
          {formState.message}
        </div>
      )}

      <Button type="submit" disabled={isPending} className="w-full bg-purple-600 hover:bg-purple-700">
        {isPending ? "Submitting..." : "Submit Inquiry"}
      </Button>
    </form>
  )
}

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

          {/* Deck Comparison Section */}
          <div className="mb-12 bg-gray-800/70 p-6 rounded-lg border border-purple-500/30">
            <h3 className="text-2xl font-medium text-center mb-6 text-purple-300">Comparing Our Oracle Decks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-5 rounded-lg">
                <h4 className="text-xl font-semibold text-yellow-300 mb-3">Novice Oracle Deck</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Larger format cards for easier handling</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Keywords printed directly on cards</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Ideal for beginners learning the system</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>$25 - slightly higher price point</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 p-5 rounded-lg">
                <h4 className="text-xl font-semibold text-green-300 mb-3">Adepts Oracle Deck</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>Standard size for experienced readers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>Clean design without printed keywords</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>More minimalist aesthetic</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>$22 - more affordable option</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 text-center text-gray-400 text-sm">
              <p>Both decks include 25 cards on premium card stock and come with access to our online resources.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card
                key={product.id}
                className={`bg-gray-800 border-gray-700 shadow-xl flex flex-col overflow-hidden transition-shadow duration-300 ${
                  product.status === "coming-soon" ? "opacity-70" : "hover:shadow-purple-500/30"
                }`}
              >
                <CardHeader className="p-0">
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={product.image || "/images/products/ai-fallback-oracle-product.png"}
                      alt={product.name}
                      width={400}
                      height={250}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.srcset = "/images/products/ai-fallback-oracle-product.png"
                        target.src = "/images/products/ai-fallback-oracle-product.png"
                      }}
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
                        href={`/manual-checkout?productId=${encodeURIComponent(product.id)}&productName=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.image || "/images/products/ai-fallback-oracle-product.png")}`}
                      >
                        Buy Now / Manual Order
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
              <SalesInquiryFormComponent />
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
