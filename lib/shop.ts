"use server"

// Simple in-memory database for demo purposes
let products = [
  {
    id: "1",
    name: "Numerology Reading",
    description: "Personalized numerology reading based on your birth date and name.",
    price: 49.99,
    inventory: 999,
    category: "services",
    imageUrl: "/numerology-symbols.png",
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Numerology Oracle Cards",
    description: "A deck of 78 oracle cards with numerology symbols and meanings.",
    price: 29.99,
    inventory: 50,
    category: "products",
    imageUrl: "/mystical-oracle-spread.png",
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

let categories = [
  {
    id: "1",
    name: "Services",
    slug: "services",
  },
  {
    id: "2",
    name: "Products",
    slug: "products",
  },
]

const orders = [
  {
    id: "1",
    customerId: "1",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    items: [
      {
        productId: "1",
        name: "Numerology Reading",
        price: 49.99,
        quantity: 1,
      },
    ],
    total: 49.99,
    status: "completed",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const customers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "555-123-4567",
    address: "123 Main St, Anytown, USA",
    createdAt: new Date().toISOString(),
  },
]

export async function getProducts() {
  return products
}

export async function getProduct(id: string) {
  return products.find((p) => p.id === id)
}

export async function createProduct(productData: {
  name: string
  description: string
  price: number
  inventory: number
  category: string
  imageUrl: string
  isPublished: boolean
}) {
  const id = crypto.randomUUID()
  const now = new Date().toISOString()

  const newProduct = {
    id,
    ...productData,
    createdAt: now,
    updatedAt: now,
  }

  products.push(newProduct)
  return newProduct
}

export async function updateProduct(
  id: string,
  productData: Partial<{
    name: string
    description: string
    price: number
    inventory: number
    category: string
    imageUrl: string
    isPublished: boolean
  }>,
) {
  const productIndex = products.findIndex((p) => p.id === id)

  if (productIndex === -1) {
    throw new Error("Product not found")
  }

  products[productIndex] = {
    ...products[productIndex],
    ...productData,
    updatedAt: new Date().toISOString(),
  }

  return products[productIndex]
}

export async function deleteProduct(id: string) {
  const initialLength = products.length
  products = products.filter((p) => p.id !== id)

  return products.length !== initialLength
}

export async function getCategories() {
  return categories
}

export async function createCategory(categoryData: {
  name: string
  slug: string
}) {
  const id = crypto.randomUUID()

  const newCategory = {
    id,
    ...categoryData,
  }

  categories.push(newCategory)
  return newCategory
}

export async function updateCategory(
  id: string,
  categoryData: Partial<{
    name: string
    slug: string
  }>,
) {
  const categoryIndex = categories.findIndex((c) => c.id === id)

  if (categoryIndex === -1) {
    throw new Error("Category not found")
  }

  categories[categoryIndex] = {
    ...categories[categoryIndex],
    ...categoryData,
  }

  return categories[categoryIndex]
}

export async function deleteCategory(id: string) {
  const initialLength = categories.length
  categories = categories.filter((c) => c.id !== id)

  return categories.length !== initialLength
}

export async function getOrders() {
  return orders
}

export async function getOrder(id: string) {
  return orders.find((o) => o.id === id)
}

export async function updateOrderStatus(id: string, status: string) {
  const orderIndex = orders.findIndex((o) => o.id === id)

  if (orderIndex === -1) {
    throw new Error("Order not found")
  }

  orders[orderIndex] = {
    ...orders[orderIndex],
    status,
    updatedAt: new Date().toISOString(),
  }

  return orders[orderIndex]
}

export async function getCustomers() {
  return customers
}

export async function getCustomer(id: string) {
  return customers.find((c) => c.id === id)
}
