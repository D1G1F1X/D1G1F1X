"use client"

interface TallyFormEmbedProps {
  formId: string // e.g., "m6G65e"
  className?: string
}

export default function TallyFormEmbed({ formId, className = "" }: TallyFormEmbedProps) {
  // Using the provided embed URL parameters.
  // Note: transparentBackground=1 is removed, allowing Tally's native background to show.
  // hideTitle=1 is kept, as the Tally form itself seems to have its own title/intro text.
  const tallyEmbedUrl = `https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&dynamicHeight=1`

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
        // Removed explicit bg-white, allowing Tally's native dark background to appear
        className="rounded-lg shadow-lg min-h-[550px] sm:min-h-[600px]"
      ></iframe>
    </div>
  )
}
