import TallyFormEmbed from "@/components/tally-form-embed"

const TALLY_FORM_ID = "m6G65e"

export default function EmailFormTab() {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">Send Us a Detailed Message</h3>
        <p className="text-gray-300">
          Fill out the form below with your inquiry details. We'll get back to you within 24 hours.
        </p>
      </div>
      <TallyFormEmbed formId={TALLY_FORM_ID} />
    </div>
  )
}
