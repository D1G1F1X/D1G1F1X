"use client"

import type React from "react"

import { useEffect, useRef, useState, useTransition } from "react"
import { useFormState } from "react-dom"

interface SalesInquiryFormProps {
  productId: string
}

interface SalesInquiryState {
  message: string | null
  success: boolean | null
}

const initialState: SalesInquiryState = {
  message: null,
  success: null,
}

async function submitSalesInquiry(prevState: SalesInquiryState, formData: FormData): Promise<SalesInquiryState> {
  "use server"

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string
  const productId = formData.get("productId") as string

  if (!name || !email || !message) {
    return {
      message: "Please fill in all fields.",
      success: false,
    }
  }

  try {
    // Simulate sending the inquiry
    console.log("Sending sales inquiry:", { name, email, message, productId })
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network request

    return {
      message: "Inquiry sent successfully!",
      success: true,
    }
  } catch (error: any) {
    console.error("Error sending inquiry:", error)
    return {
      message: "Failed to send inquiry. Please try again.",
      success: false,
    }
  }
}

const SalesInquiryForm: React.FC<SalesInquiryFormProps> = ({ productId }) => {
  const [state, formAction] = useFormState(submitSalesInquiry, initialState)

  return (
    <form action={formAction} className="mt-4">
      {state?.message && (
        <div
          className={`p-2 rounded-md mb-2 ${state.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {state.message}
        </div>
      )}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mt-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mt-2">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <input type="hidden" name="productId" value={productId} />
      <button
        type="submit"
        className="mt-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Submit Inquiry
      </button>
    </form>
  )
}

interface BuyPageClientProps {
  productId: string
  initialQuantity: number
  price: number
}

async function handleAddToCart(prevState: any, formData: FormData) {
  "use server"

  const productId = formData.get("productId")
  const quantity = formData.get("quantity")

  if (!productId || !quantity) {
    return {
      message: "Missing product ID or quantity",
    }
  }

  try {
    // Simulate adding to cart
    console.log(`Adding ${quantity} of product ${productId} to cart`)
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network request

    return {
      message: `Added ${quantity} of product ${productId} to cart!`,
    }
  } catch (error: any) {
    console.error("Error adding to cart:", error)
    return {
      message: "Failed to add to cart. Please try again.",
    }
  }
}

const BuyPageClient: React.FC<BuyPageClientProps> = ({ productId, initialQuantity, price }) => {
  const [quantity, setQuantity] = useState(initialQuantity)
  const [isPending, startTransition] = useTransition()
  const [addToCartState, addToCartAction] = useFormState(handleAddToCart, null)
  const quantityInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (quantityInputRef.current) {
      quantityInputRef.current.value = String(quantity)
    }
  }, [quantity])

  const incrementQuantity = () => {
    startTransition(() => {
      setQuantity((prevQuantity) => prevQuantity + 1)
    })
  }

  const decrementQuantity = () => {
    startTransition(() => {
      setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1))
    })
  }

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(event.target.value)
    if (!isNaN(newValue) && newValue > 0) {
      startTransition(() => {
        setQuantity(newValue)
      })
    }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Buy Now</h2>
      <p>Price: ${price}</p>
      <div className="flex items-center mb-4">
        <label htmlFor="quantity" className="mr-2">
          Quantity:
        </label>
        <div className="flex items-center">
          <button
            onClick={decrementQuantity}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l"
          >
            -
          </button>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="shadow appearance-none border rounded w-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ref={quantityInputRef}
          />
          <button
            onClick={incrementQuantity}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r"
          >
            +
          </button>
        </div>
      </div>

      {addToCartState?.message && (
        <div className="mb-4 p-2 rounded-md bg-green-100 text-green-800">{addToCartState.message}</div>
      )}

      <form action={addToCartAction}>
        <input type="hidden" name="productId" value={productId} />
        <input type="hidden" name="quantity" value={quantity} />
        <button
          type="submit"
          disabled={isPending}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isPending ? "Adding to Cart..." : "Add to Cart"}
        </button>
      </form>

      <SalesInquiryForm productId={productId} />
    </div>
  )
}

export default BuyPageClient
