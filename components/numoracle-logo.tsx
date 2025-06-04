import Link from "next/link"
import Image from "next/image"

interface NumoracleLogoProps {
  size?: "sm" | "md" | "lg"
  asLink?: boolean
  variant?: "full" | "icon" | "text"
}

export default function NumoracleLogo({ size = "md", asLink = true, variant = "full" }: NumoracleLogoProps) {
  const heights = {
    sm: "h-8",
    md: "h-10 md:h-12",
    lg: "h-12 md:h-16",
  }

  const widths = {
    sm: "w-auto",
    md: "w-auto",
    lg: "w-auto",
  }

  let logoSrc = "/toplogowicon.gif" // Default full logo with website
  let logoAlt = "NUMOracle"

  if (variant === "icon") {
    logoSrc = "/numero-logo-500x500.png" // Just the circular emblem
    logoAlt = "NUMOracle Icon"
  } else if (variant === "text") {
    logoSrc = "/numoracle.gif" // Just the text logo
    logoAlt = "NUMOracle Text"
  }

  const Logo = (
    <div className={`relative ${heights[size]} ${widths[size]}`}>
      <Image
        src={logoSrc || "/placeholder.svg"}
        alt={logoAlt}
        height={size === "sm" ? 32 : size === "md" ? 48 : 64}
        width={size === "sm" ? 160 : size === "md" ? 240 : 320}
        className="h-full w-auto"
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
