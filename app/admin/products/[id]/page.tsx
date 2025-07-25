import EditProductClientPage from "./EditProductClientPage"

export const metadata = {
  title: "Edit Product - Admin",
  description: "Edit an existing product.",
}

export default function EditProductPage({ params }: { params: { id: string } }) {
  return <EditProductClientPage params={params} />
}
