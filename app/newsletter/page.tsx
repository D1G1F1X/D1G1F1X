import { NewsletterSignup } from "@/components/newsletter-signup"
import Image from "next/image"

export default function NewsletterPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <Image
        src="/mystical-insight-hero.png"
        alt="Newsletter Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0 opacity-30"
      />
      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="relative z-20 w-full max-w-md">
        <NewsletterSignup />
      </div>
    </div>
  )
}
