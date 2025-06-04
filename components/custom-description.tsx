"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface CustomDescriptionProps {
  children: React.ReactNode
  className?: string
}

export function CustomDescription({ children, className }: CustomDescriptionProps) {
  return <div className={cn("text-sm text-gray-400", className)}>{children}</div>
}
