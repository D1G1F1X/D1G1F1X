"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  onRatingChange?: (rating: number) => void
  size?: "sm" | "md" | "lg"
  editable?: boolean
  className?: string
}

export function StarRating({ rating, onRatingChange, size = "md", editable = false, className }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)

  const handleMouseEnter = (index: number) => {
    if (!editable) return
    setHoverRating(index)
  }

  const handleMouseLeave = () => {
    if (!editable) return
    setHoverRating(0)
  }

  const handleClick = (index: number) => {
    if (!editable || !onRatingChange) return
    onRatingChange(index)
  }

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  return (
    <div className={cn("flex", className)}>
      {[1, 2, 3, 4, 5].map((index) => {
        const filled = index <= (hoverRating || rating)

        return (
          <Star
            key={index}
            className={cn(
              sizeClasses[size],
              "cursor-pointer transition-colors",
              filled ? "text-yellow-500 fill-yellow-500" : "text-gray-400",
              editable && "hover:text-yellow-400",
            )}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
          />
        )
      })}
    </div>
  )
}
