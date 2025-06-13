import { CardDataValidator } from "@/components/admin/card-data-validator"

export default function CardValidationPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Card Data Validation</h1>
      <CardDataValidator />
    </div>
  )
}
