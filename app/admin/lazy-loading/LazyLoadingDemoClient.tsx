"use client"

import { useState, Suspense, lazy } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2, ImageIcon, Text } from "lucide-react"
import Image from "next/image"

// Dynamically import the HeavyComponent
const HeavyComponent = lazy(() => import("./HeavyComponent")) // Assuming HeavyComponent is in a separate file

// Simulate a large image that might be lazy-loaded
const LargeImage = ({ src, alt }: { src: string; alt: string }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative w-full h-64 bg-gray-200 rounded-md overflow-hidden">
      {!loaded && (
        <Skeleton className="absolute inset-0 w-full h-full flex items-center justify-center">
          <ImageIcon className="h-8 w-8 text-gray-400 animate-pulse" />
        </Skeleton>
      )}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        layout="fill"
        objectFit="cover"
        onLoad={() => setLoaded(true)}
        className={loaded ? "opacity-100 transition-opacity duration-500" : "opacity-0"}
      />
    </div>
  )
}

// Dummy HeavyComponent for demonstration if not creating a separate file
/*function DummyHeavyComponent() {
  const [data, setData] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setData("This is content from a lazily loaded heavy component!")
      setLoading(false)
    }, 2000) // Simulate data fetching or heavy computation
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading Heavy Component...
      </div>
    )
  }

  return (
    <Card className="bg-blue-100 border-blue-300">
      <CardHeader>
        <CardTitle className="text-blue-800">Heavy Component Loaded!</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-blue-700">{data}</p>
      </CardContent>
    </Card>
  )
}*/

export function LazyLoadingDemoClient() {
  const [showHeavyComponent, setShowHeavyComponent] = useState(false)

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Lazy Loading Demo</h1>
      <p className="text-muted-foreground mb-8">
        This page demonstrates lazy loading of components and images to improve initial page load performance.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Text className="h-5 w-5" /> Lazy Load Component
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Click the button to load a component that simulates heavy initialization.</p>
            <Button onClick={() => setShowHeavyComponent(true)} disabled={showHeavyComponent}>
              {showHeavyComponent ? "Component Loaded" : "Load Heavy Component"}
            </Button>
            <div className="mt-4">
              {showHeavyComponent && (
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center h-32">
                      <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading Heavy Component...
                    </div>
                  }
                >
                  <HeavyComponent />
                </Suspense>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" /> Lazy Load Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Scroll down to see a large image load lazily as it enters the viewport.</p>
            <div className="h-40 bg-gray-100 flex items-center justify-center text-muted-foreground rounded-md">
              Scroll down to load image
            </div>
            <div className="mt-8">
              <LargeImage src="/images/hero/mystical-blog-background.png" alt="Mystical Background" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
