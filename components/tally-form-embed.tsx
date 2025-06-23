"use client"

interface TallyFormEmbedProps {
  formId: string // e.g., "m6G65e"
  className?: string
}

export default function TallyFormEmbed({ formId, className = "" }: TallyFormEmbedProps) {
  // Using the exact embed URL you provided: only the base form ID
  const tallyEmbedUrl = `https://tally.so/embed/${formId}`

  return (
    <div className={`w-full ${className}`}>
      <iframe
        src={tallyEmbedUrl}
        width="100%"
        height="600" // Initial height, Tally's dynamicHeight should adjust this if configured in Tally
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Tally Web Project Intake Questionnaire"
        // No custom background or styling here, allowing Tally's native theme to show
        className="rounded-lg shadow-lg min-h-[550px] sm:min-h-[600px]"
      ></iframe>
    </div>
  )
}
