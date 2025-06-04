"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface JsonEditorProps {
  value: string
  onChange: (value: string) => void
  isLoading?: boolean
}

export function JsonEditor({ value, onChange, isLoading = false }: JsonEditorProps) {
  const [editorValue, setEditorValue] = useState(value)

  useEffect(() => {
    setEditorValue(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setEditorValue(newValue)
    onChange(newValue)
  }

  if (isLoading) {
    return <Skeleton className="h-[600px] w-full" />
  }

  return (
    <div className="relative">
      <textarea
        value={editorValue}
        onChange={handleChange}
        className="w-full h-[600px] font-mono text-sm p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        spellCheck="false"
        placeholder="Enter card data in JSON format..."
      />
      <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
        {editorValue ? `${editorValue.length} characters` : "0 characters"}
      </div>
    </div>
  )
}
