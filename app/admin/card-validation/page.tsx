import { CardDataValidator } from "@/components/admin/card-data-validator"

export default function AdminCardValidationPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Card Data Validation</h1>
      <CardDataValidator />
    </div>
  )
}
