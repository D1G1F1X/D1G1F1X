"use client"

import type React from "react"

import { useState } from "react"

// Define types for toast state
export type ToastProps = {
  id?: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
  duration?: number
}

export type Toast = ToastProps & {
  id: string
  open: boolean
}

interface ToastState {
  toasts: Toast[]
}

// Create a simple toast hook
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({ ...props }: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = {
      ...props,
      id,
      open: true,
    }

    setToasts((prevToasts) => [...prevToasts, newToast])

    // For now, we'll just use browser alert as a simple fallback
    // In a real implementation, this would be handled by the toast UI
    console.log("Toast:", props)
    alert(`${props.title}: ${props.description}`)

    return id
  }

  const dismiss = (toastId?: string) => {
    setToasts((prevToasts) =>
      prevToasts.map((toast) => (toast.id === toastId || toastId === undefined ? { ...toast, open: false } : toast)),
    )
  }

  return {
    toast,
    dismiss,
    toasts,
  }
}

// For backward compatibility and convenience
export function toast(props: ToastProps) {
  console.log("Toast:", props)
  alert(`${props.title}: ${props.description}`)
}
