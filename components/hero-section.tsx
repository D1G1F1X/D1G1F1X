import Image from "next/image"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  title: string
  description: string
  backgroundImage: string
  className?: string
}

export default function HeroSection({ title, description, backgroundImage, className }: HeroSectionProps) {
  return (
    <section className={cn("relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden", className)}>
      <Image
        src={backgroundImage || "/placeholder.svg"}
        alt={title}
        fill
        priority
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
      />
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center p-4">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">{title}</h1>
          <p className="text-lg md:text-xl text-gray-200 drop-shadow-md">{description}</p>
        </div>
      </div>
    </section>
  )
}
