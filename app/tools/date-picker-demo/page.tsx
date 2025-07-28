import { DatePickerShowcase } from "@/components/date-picker-showcase"

export default function DatePickerDemoPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Modern Date Picker Components</h1>
      <p className="text-center text-gray-400 mb-8">
        Intuitive and visually appealing date selection for the Numoracle platform
      </p>
      <DatePickerShowcase />
    </div>
  )
}
