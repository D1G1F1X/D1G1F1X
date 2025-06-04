"use client"

import Link from "next/link"
import Image from "next/image"

interface NumoLogoProps {
  size?: "sm" | "md" | "lg"
  asLink?: boolean
  variant?: "full" | "square"
}

const logoSizes = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12",
}

export default function NumoLogo({ size = "md", asLink = true, variant = "full" }: NumoLogoProps) {
  const sizeClass = logoSizes[size] || logoSizes.md

  const logoContent = (
    <div className={`${sizeClass} relative`}>
      {variant === "full" ? (
        <Image
          src="/logotop800x198.png"
          alt="NUMO"
          height={size === "sm" ? 32 : size === "md" ? 40 : 48}
          width={size === "sm" ? 128 : size === "md" ? 160 : 192}
          className="h-full w-auto"
          priority
        />
      ) : (
        <Image
          src="/numero-logo-500x500.png"
          alt="NUMO"
          height={size === "sm" ? 32 : size === "md" ? 40 : 48}
          width={size === "sm" ? 32 : size === "md" ? 40 : 48}
          className="h-full w-auto"
          priority
        />
      )}
    </div>
  )

  if (asLink) {
    return <Link href="/">{logoContent}</Link>
  }

  return <>{logoContent}</>
}
