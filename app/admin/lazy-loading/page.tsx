import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Loader2, ImageIcon } from "lucide-react"
import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import components with lazy loading
const LazyImage = dynamic(() => import("@/components/lazy-image").then((mod) => mod.LazyImage), {
  loading: () => <Loader2 className="h-8 w-8 animate-spin text-primary" />,
  ssr: false, // Ensure it's client-side rendered
})

const OptimizedImage = dynamic(() => import("@/components/optimized-image").then((mod) => mod.OptimizedImage), {
  loading: () => <Loader2 className="h-8 w-8 animate-spin text-primary" />,
  ssr: false,
})

const ResponsiveImage = dynamic(() => import("@/components/responsive-image").then((mod) => mod.ResponsiveImage), {
  loading: () => <Loader2 className="h-8 w-8 animate-spin text-primary" />,
  ssr: false,
})

const UnifiedImage = dynamic(() => import("@/components/unified-image").then((mod) => mod.UnifiedImage), {
  loading: () => <Loader2 className="h-8 w-8 animate-spin text-primary" />,
  ssr: false,
})

export default function LazyLoadingPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lazy Loading & Image Performance</h1>
          <p className="text-muted-foreground">
            Demonstrate and test different image loading and optimization techniques.
          </p>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" /> LazyImage (Intersection Observer)
            </CardTitle>
            <CardDescription>
              Images load only when they enter the viewport using Intersection Observer.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="h-48 bg-muted flex items-center justify-center text-muted-foreground">
              Scroll down to load
            </div>
            <div className="h-48 bg-muted flex items-center justify-center text-muted-foreground">
              Scroll down to load
            </div>
            {/* Placeholder images */}
            <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
              <LazyImage
                src="/public/images/about/goddess-danu.png"
                alt="Goddess Danu"
                width={300}
                height={450}
                className="rounded-md object-cover w-full h-auto"
              />
            </Suspense>
            <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
              <LazyImage
                src="/public/images/tools/card-simulator.png"
                alt="Card Simulator"
                width={300}
                height={450}
                className="rounded-md object-cover w-full h-auto"
              />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" /> OptimizedImage (Next.js Image Component)
            </CardTitle>
            <CardDescription>
              Leverages Next.js Image component for automatic optimization (resizing, WebP conversion).
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
              <OptimizedImage
                src="/public/images/blog/life-path.png"
                alt="Life Path"
                width={300}
                height={200}
                className="rounded-md object-cover w-full h-auto"
              />
            </Suspense>
            <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
              <OptimizedImage
                src="/public/images/products/adept-deck.png"
                alt="Adept Deck"
                width={300}
                height={200}
                className="rounded-md object-cover w-full h-auto"
              />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" /> ResponsiveImage (Srcset)
            </CardTitle>
            <CardDescription>Uses `srcset` to serve different image sizes based on screen resolution.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
              <ResponsiveImage
                src="/public/images/testimonials/user-avatar-1.png"
                alt="User Avatar"
                baseSize={100}
                className="rounded-full object-cover w-24 h-24 mx-auto"
              />
            </Suspense>
            <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
              <ResponsiveImage
                src="/public/images/testimonials/user-avatar-2.png"
                alt="User Avatar"
                baseSize={100}
                className="rounded-full object-cover w-24 h-24 mx-auto"
              />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" /> UnifiedImage (Fallback & Error Handling)
            </CardTitle>
            <CardDescription>
              Component that includes robust error handling and fallback mechanisms for images.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
              <UnifiedImage
                src="/non-existent-image.png" // This will intentionally fail
                alt="Failing Image"
                fallbackText="Image Unavailable"
                width={200}
                height={150}
                className="rounded-md object-cover w-full h-auto"
              />
            </Suspense>
            <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
              <UnifiedImage
                src="/public/numo-color-emblem.png"
                alt="NUMO Emblem"
                fallbackText="Emblem"
                width={200}
                height={150}
                className="rounded-md object-cover w-full h-auto"
              />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
