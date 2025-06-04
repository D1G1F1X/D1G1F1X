"use client"

import { createContext, useContext, useReducer, type ReactNode, useEffect } from "react"

// Define the types
export interface Product {
  id: string
  name: string
  price: number
  image?: string
  // Add any other product-specific fields you need
  description?: string
}

export interface ManualCartItem {
  product: Product
  quantity: number
}

interface ManualCartState {
  items: ManualCartItem[]
  isCartLoaded: boolean
}

interface ManualCartContextType extends ManualCartState {
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateItemQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getItemCount: () => number
  getCartTotal: () => number
}

const ManualCartContext = createContext<ManualCartContextType | undefined>(undefined)

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: { productId: string } }
  | { type: "UPDATE_ITEM_QUANTITY"; payload: { productId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_CART_LOADED"; payload: ManualCartItem[] }

const cartReducer = (state: ManualCartState, action: CartAction): ManualCartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex((item) => item.product.id === action.payload.product.id)
      let newItems
      if (existingItemIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + action.payload.quantity } : item,
        )
      } else {
        newItems = [...state.items, { product: action.payload.product, quantity: action.payload.quantity }]
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("manualCartItems", JSON.stringify(newItems))
      }
      return { ...state, items: newItems }
    }
    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.product.id !== action.payload.productId)
      if (typeof window !== "undefined") {
        localStorage.setItem("manualCartItems", JSON.stringify(newItems))
      }
      return { ...state, items: newItems }
    }
    case "UPDATE_ITEM_QUANTITY": {
      const newItems = state.items
        .map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: Math.max(0, action.payload.quantity) } // Prevent negative quantity
            : item,
        )
        .filter((item) => item.quantity > 0) // Remove if quantity is 0
      if (typeof window !== "undefined") {
        localStorage.setItem("manualCartItems", JSON.stringify(newItems))
      }
      return { ...state, items: newItems }
    }
    case "CLEAR_CART": {
      if (typeof window !== "undefined") {
        localStorage.removeItem("manualCartItems")
      }
      return { ...state, items: [] }
    }
    case "SET_CART_LOADED":
      return { ...state, items: action.payload, isCartLoaded: true }
    default:
      return state
  }
}

export const ManualCartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isCartLoaded: false })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedItems = localStorage.getItem("manualCartItems")
      if (storedItems) {
        try {
          const parsedItems = JSON.parse(storedItems) as ManualCartItem[]
          // Basic validation for parsed items
          if (
            Array.isArray(parsedItems) &&
            parsedItems.every((item) => item.product && typeof item.quantity === "number")
          ) {
            dispatch({ type: "SET_CART_LOADED", payload: parsedItems })
          } else {
            console.warn("Invalid cart items found in localStorage. Clearing.")
            localStorage.removeItem("manualCartItems")
            dispatch({ type: "SET_CART_LOADED", payload: [] })
          }
        } catch (error) {
          console.error("Failed to parse cart items from localStorage:", error)
          localStorage.removeItem("manualCartItems")
          dispatch({ type: "SET_CART_LOADED", payload: [] })
        }
      } else {
        dispatch({ type: "SET_CART_LOADED", payload: [] })
      }
    }
  }, [])

  const addItem = (product: Product, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { product, quantity } })
  }

  const removeItem = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId } })
  }

  const updateItemQuantity = (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_ITEM_QUANTITY", payload: { productId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const getItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0)
  }

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  return (
    <ManualCartContext.Provider
      value={{ ...state, addItem, removeItem, updateItemQuantity, clearCart, getItemCount, getCartTotal }}
    >
      {children}
    </ManualCartContext.Provider>
  )
}

export const useManualCart = (): ManualCartContextType => {
  const context = useContext(ManualCartContext)
  if (context === undefined) {
    throw new Error("useManualCart must be used within a ManualCartProvider")
  }
  return context
}
