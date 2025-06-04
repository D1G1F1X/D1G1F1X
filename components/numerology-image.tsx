"use client"

import { useState } from "react"
import Image from "next/image"

interface NumerologyImageProps {
  number: number
  title: string
  className?: string
}

export default function NumerologyImage({ number, title, className = "object-cover" }: NumerologyImageProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(`/numerology-${number}.png`)

  const handleError = () => {
    setImgSrc(`/placeholder.svg?height=400&width=300&query=numerology ${number} ${title}`)
  }

  return (
    <Image
      src={imgSrc || `/placeholder.svg?height=400&width=300&query=numerology ${number}`}
      alt={`Life Path ${number}`}
      fill
      className={className}
      onError={handleError}
    />
  )
}
