import CardImageVerifier from "@/components/card-image-verifier"

export default function VerifyCardImagesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Card Image Verification</h1>
      <p className="text-gray-400 mb-8">
        This tool checks all card images to ensure they load correctly. It helps identify any missing or problematic
        images.
      </p>

      <CardImageVerifier />
    </div>
  )
}
