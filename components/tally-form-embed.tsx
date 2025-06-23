"use client"

interface TallyFormEmbedProps {
  formId: string // e.g., "m6G65e"
  className?: string
}

export default function TallyFormEmbed({ formId, className = "" }: TallyFormEmbedProps) {
  // The Tally embed URL with parameters to ensure it integrates cleanly
  // transparentBackground=1 is crucial for the form to potentially inherit parent background,
  // but the form itself seems to have a white background as per your screenshot.
  const tallyEmbedUrl = `https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`

  return (
    <div className={`w-full ${className}`}>
      <iframe
        src={tallyEmbedUrl}
        width="100%"
        height="600" // Initial height, Tally's dynamicHeight should adjust this
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Tally Intake Form"
        // Apply minimal styling to the iframe itself, allowing Tally's internal styles to dominate
        className="rounded-lg shadow-lg min-h-[550px] sm:min-h-[600px] bg-white" // Explicitly set white background for iframe
      ></iframe>
    </div>
  )
}
