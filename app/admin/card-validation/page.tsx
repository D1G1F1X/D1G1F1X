import { CardDataValidator } from "@/components/admin/card-data-validator"

export default function CardValidationPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Oracle Card Data Validation</h1>
      <CardDataValidator />
    </div>
  )
}
