import { DataTable } from "./data-table"
import { columns } from "./columns"

async function getOrders(): Promise<any[]> {
  // Replace with your actual API call to fetch orders
  // This is mock data for demonstration purposes
  return [
    {
      id: "ORD1001",
      customerName: "John Doe",
      orderDate: "2024-07-20T10:00:00Z",
      status: "Processing",
      totalAmount: 59.99,
    },
    {
      id: "ORD1002",
      customerName: "Jane Smith",
      orderDate: "2024-07-19T14:30:00Z",
      status: "Shipped",
      totalAmount: 120.0,
    },
    {
      id: "ORD1003",
      customerName: "Alice Johnson",
      orderDate: "2024-07-18T09:15:00Z",
      status: "Delivered",
      totalAmount: 35.5,
    },
    {
      id: "ORD1004",
      customerName: "Bob Brown",
      orderDate: "2024-07-17T11:45:00Z",
      status: "Processing",
      totalAmount: 85.2,
    },
    {
      id: "ORD1005",
      customerName: "Charlie Davis",
      orderDate: "2024-07-16T16:00:00Z",
      status: "Cancelled",
      totalAmount: 25.0,
    },
  ]
}

export default async function OrdersPage() {
  const orders = await getOrders()

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
          <p className="text-muted-foreground">Manage customer orders and track their status.</p>
        </div>
      </div>
      <DataTable data={orders} columns={columns} />
    </div>
  )
}
