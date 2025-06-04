import NewsletterSignup from "@/components/newsletter-signup"
import { Card, CardContent } from "@/components/ui/card"

export default function NewsletterPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Subscribe to Our Newsletter</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-black/40 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">What You'll Receive</h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>Monthly compilations of our weekly blog posts</li>
                <li>Exclusive numerology insights and interpretations</li>
                <li>Special offers and discounts on premium products</li>
                <li>Early access to new oracle card interpretations</li>
                <li>Seasonal reading guides and spiritual practices</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Why Subscribe</h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>Stay connected with the NUMO Oracle community</li>
                <li>Deepen your understanding of numerology</li>
                <li>Learn how to integrate oracle readings into daily life</li>
                <li>Receive curated content delivered directly to your inbox</li>
                <li>Never miss important updates and new features</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <NewsletterSignup />
        </div>
      </div>
    </div>
  )
}
