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
        height={1100}
        title="Tally Web Project Intake Questionnaire"
        className="rounded-lg shadow-lg min-h-[1050px] sm:min-h-[1100px]"
        style={{ display: 'block', border: 'none' }}
      ></iframe>
    </div>
  )
}
