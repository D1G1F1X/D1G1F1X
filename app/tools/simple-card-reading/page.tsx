import type { Metadata } from "next"
import { SimpleCardDealer } from "@/components/simple-card-dealer"

export const metadata: Metadata = {
  title: "Simple Card Reading | Numoracle",
  description: "Get a simple card reading with the Numoracle deck",
}

export default function SimpleCardReadingPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Simple Card Reading</h1>
        <p className="text-center mb-8 text-muted-foreground">Draw cards for a quick reading with the Numoracle deck</p>

        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-purple-500/20">
          <SimpleCardDealer />
        </div>
      </div>
    </div>
  )
}
