"use client"

import type React from "react"
import { useState } from "react"

interface State {
  success: boolean
  message: string
}

interface Props {
  priceId: string
}

export default function ManualCheckoutForm({ priceId }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [state, setState] = useState<{ success: boolean; message: string } | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/manual-checkout", {
        method: "POST",
        body: formData,
      })
      const json = await res.json()
      setState(json)
    } catch (err) {
      setState({ success: false, message: "Something went wrong. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
      <input type="hidden" name="priceId" value={priceId} />
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="name"
            id="name"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="mt-1">
          <input
            type="email"
            name="email"
            id="email"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <div className="mt-1">
          <select
            id="country"
            name="country"
            autoComplete="country-name"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            required
          >
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>

      {state?.success === true ? (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Order placed successfully</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>{state?.message}</p>
              </div>
            </div>
          </div>
        </div>
      ) : state?.success === false ? (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">There was an error placing your order</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{state?.message}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </form>
  )
}
