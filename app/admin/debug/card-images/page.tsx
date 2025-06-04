"use client"

import { useState, useEffect } from "react"
import { CardImageVerifier } from "@/components/card-image-verifier"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OptimizedImage from "@/components/optimized-image"

export default function CardImagesDebugPage() {
  const [cardIds, setCardIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [testCardId, setTestCardId] = useState("01cauldron-fire")

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch("/api/card-directory")
        if (response.ok) {
          const data = await response.json()
          setCardIds(Object.keys(data))
        }
      } catch (error) {
        console.error("Error fetching card data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCardData()
  }, [])

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Card Images Debug</h1>

      <Tabs defaultValue="verify">
        <TabsList>
          <TabsTrigger value="verify">Verify Images</TabsTrigger>
          <TabsTrigger value="test">Test Image</TabsTrigger>
        </TabsList>

        <TabsContent value="verify" className="space-y-6">
          {loading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <CardImageVerifier cardIds={cardIds} />
          )}
        </TabsContent>

        <TabsContent value="test" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Test Card Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Input
                  value={testCardId}
                  onChange={(e) => setTestCardId(e.target.value)}
                  placeholder="Enter card ID (e.g., 01cauldron-fire)"
                />
                <Button onClick={() => setTestCardId(testCardId)}>Test</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Image Preview:</h3>
                  <div className="relative aspect-[2/3] w-full max-w-[280px] rounded-lg overflow-hidden border border-gray-700">
                    <OptimizedImage
                      src={`/cards/${testCardId}.jpg`}
                      alt={`Card: ${testCardId}`}
                      width={280}
                      height={420}
                      className="object-cover w-full h-full"
                      fallbackSrc={`/placeholder.svg?height=280&width=180&query=${testCardId} card`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Image Details:</h3>
                  <div className="bg-black/20 p-3 rounded-md text-xs font-mono">
                    <p>Card ID: {testCardId}</p>
                    <p>Image Path: /cards/{testCardId}.jpg</p>
                    <p>Full URL: {`${process.env.NEXT_PUBLIC_APP_URL || ""}/cards/${testCardId}.jpg`}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
