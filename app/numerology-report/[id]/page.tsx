import NumerologyReportClientPage from "./NumerologyReportClientPage"

export const metadata = {
  title: "Numerology Report",
  description: "View your personalized numerology report.",
}

export default function NumerologyReportPage({ params }: { params: { id: string } }) {
  return <NumerologyReportClientPage />
}
