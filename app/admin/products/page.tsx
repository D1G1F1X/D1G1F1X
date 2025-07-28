import { DataTable } from "./data-table"
import { columns } from "./columns"

async function getProducts(): Promise<any[]> {
  // Replace with your actual API call to fetch products
  // This is mock data for demonstration purposes
  return [
    {
      id: "prod001",
      name: "Deluxe Oracle Deck",
      category: "Oracle Decks",
      price: 79.99,
      stock: 150,
      isActive: true,
    },
    {
      id: "prod002",
      name: "Beginner's Guidebook",
      category: "Guidebooks",
      price: 29.99,
      stock: 300,
      isActive: true,
    },
    {
      id: "prod003",
      name: "Elemental Dice Set",
      category: "Tools",
      price: 19.99,
      stock: 50,
      isActive: true,
    },
    {
      id: "prod004",
      name: "Personalized Numerology Report",
      category: "Reports",
      price: 49.99,
      stock: 999, // Digital product, high stock
      isActive: true,
    },
    {
      id: "prod005",
      name: "Advanced Spread Cloth",
      category: "Merchandise",
      price: 35.0,
      stock: 75,
      isActive: false, // Out of stock or inactive
    },
  ]
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">Manage your product catalog.</p>
        </div>
      </div>
      <DataTable data={products} columns={columns} />
    </div>
  )
}
