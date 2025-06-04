import Image from "next/image"
import Link from "next/link"

interface NumoEmblemLogoProps {
  variant?: "emblem-only" | "with-text" | "text-only"
  size?: "sm" | "md" | "lg"
  asLink?: boolean
  className?: string
}

export default function NumoEmblemLogo({
  variant = "emblem-only",
  size = "md",
  asLink = true,
  className = "",
}: NumoEmblemLogoProps) {
  const sizes = {
    sm: { height: 40, width: variant === "emblem-only" ? 40 : 120 },
    md: { height: 60, width: variant === "emblem-only" ? 60 : 180 },
    lg: { height: 80, width: variant === "emblem-only" ? 80 : 240 },
  }

  let src = "/numo-color-emblem.png"
  if (variant === "with-text") {
    src = "/numo-logo-with-emblem.png"
  } else if (variant === "text-only") {
    src = "/numo-text-white.png"
  }

  const Logo = (
    <div className={`relative ${className}`}>
      <Image
        src={src || "/placeholder.svg"}
        alt="NUMO Oracle"
        height={sizes[size].height}
        width={sizes[size].width}
        className="h-auto w-auto"
        priority
      />
    </div>
  )

  if (asLink) {
    return (
      <Link href="/" className="flex items-center">
        {Logo}
      </Link>
    )
  }

  return Logo
}
