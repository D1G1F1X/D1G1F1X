import OrderDetailsClientPage from "./OrderDetailsClientPage"

export const metadata = {
  title: "Order Details - Admin",
  description: "View and manage details of a specific order.",
}

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  return <OrderDetailsClientPage params={params} />
}
