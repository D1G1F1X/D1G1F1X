"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LazyImage } from "@/components/lazy-image"
import { BlurImage } from "@/components/blur-image"
import Image from "next/image"

export default function LazyLoadingDemo() {
  const [loadingStrategy, setLoadingStrategy] = useState<"lazy" | "eager" | "progressive">("lazy")

  // Sample images for testing
  const images = [
    {
      src: "/cards/rooted-wisdom.png",
      alt: "Rooted Wisdom",
      description: "Standard lazy loading with intersection observer",
    },
    {
      src: "/cards/water-wisdom.png",
      alt: "Water Wisdom",
      description: "Blur-up technique with low-quality image placeholder",
    },
    {
      src: "/cards/fiery-blade-oracle.png",
      alt: "Fiery Blade Oracle",
      description: "Progressive loading from placeholder to full image",
    },
    {
      src: "/cards/spirit-stone-oracle.png",
      alt: "Spirit Stone Oracle",
      description: "Default Next.js Image with native lazy loading",
    },
    {
      src: "/cards/Whispers-of-the-Zephyr-Spear.png",
      alt: "Whispers of the Zephyr Spear",
      description: "LazyImage with custom threshold and root margin",
    },
    {
      src: "/cards/fiery-brew.png",
      alt: "Fiery Brew",
      description: "BlurImage with automatic placeholder generation",
    },
    {
      src: "/cards/Water-Stone-Oracle.png",
      alt: "Water Stone Oracle",
      description: "LazyImage with progressive loading strategy",
    },
    {
      src: "/cards/spirit-spear-oracle.png",
      alt: "Spirit Spear Oracle",
      description: "LazyImage with eager loading strategy",
    },
    {
      src: "/cards/Whispers-of-the-Zephyr-Blade.png",
      alt: "Whispers of the Zephyr Blade",
      description: "LazyImage with custom placeholder",
    },
    {
      src: "/cards/earth-stone-oracle.png",
      alt: "Earth Stone Oracle",
      description: "BlurImage with high quality setting",
    },
    {
      src: "/cards/47spear-fire.jpg",
      alt: "Spear of Fire IV",
      description: "LazyImage with standard settings",
    },
    {
      src: "/cards/52sword-water.jpg",
      alt: "Sword of Water V",
      description: "LazyImage with standard settings",
    },
  ]

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Image Lazy Loading Demo</h1>
      <p className="text-muted-foreground mb-8">
        This page demonstrates different image loading strategies to improve performance. Scroll down to see lazy
        loading in action.
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Loading Strategy</h2>
        <Tabs value={loadingStrategy} onValueChange={(value) => setLoadingStrategy(value as any)}>
          <TabsList>
            <TabsTrigger value="lazy">Lazy</TabsTrigger>
            <TabsTrigger value="eager">Eager</TabsTrigger>
            <TabsTrigger value="progressive">Progressive</TabsTrigger>
          </TabsList>
          <TabsContent value="lazy" className="mt-2">
            <p className="text-sm text-muted-foreground">
              Images load only when they enter the viewport, using Intersection Observer API.
            </p>
          </TabsContent>
          <TabsContent value="eager" className="mt-2">
            <p className="text-sm text-muted-foreground">
              Images load immediately when the page loads, regardless of viewport position.
            </p>
          </TabsContent>
          <TabsContent value="progressive" className="mt-2">
            <p className="text-sm text-muted-foreground">
              Images first load a low-quality placeholder, then the full image when in viewport.
            </p>
          </TabsContent>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {images.map((image, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Image {index + 1}</CardTitle>
              <CardDescription>{image.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-muted rounded-md overflow-hidden">
                <LazyImage
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  loadingStrategy={loadingStrategy}
                  threshold={0.1}
                  rootMargin="200px"
                  placeholderSrc="/placeholder.svg"
                />
              </div>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">{image.alt}</CardFooter>
          </Card>
        ))}
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Comparison</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Next.js Image</CardTitle>
              <CardDescription>Default Next.js Image component</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-muted rounded-md overflow-hidden">
                <Image src="/cards/rooted-wisdom.png" alt="Next.js Image" fill className="object-cover" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>LazyImage</CardTitle>
              <CardDescription>Custom lazy loading with Intersection Observer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-muted rounded-md overflow-hidden">
                <LazyImage
                  src="/cards/water-wisdom.png"
                  alt="LazyImage"
                  fill
                  className="object-cover"
                  loadingStrategy={loadingStrategy}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>BlurImage</CardTitle>
              <CardDescription>Blur-up technique with low-quality placeholder</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-muted rounded-md overflow-hidden">
                <BlurImage src="/cards/fiery-blade-oracle.png" alt="BlurImage" fill className="object-cover" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Performance Metrics</h2>
        <p className="text-muted-foreground">
          Implementing lazy loading can significantly improve your site's performance:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Reduces initial page load time by up to 40%</li>
          <li>Decreases bandwidth usage for users who don't scroll through all content</li>
          <li>Improves Core Web Vitals scores, particularly LCP (Largest Contentful Paint)</li>
          <li>Enhances user experience with smoother scrolling and faster interactions</li>
          <li>Reduces server load and CDN costs by only serving images when needed</li>
        </ul>
      </div>
    </div>
  )
}
