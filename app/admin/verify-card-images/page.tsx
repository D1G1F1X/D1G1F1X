import CardImageVerifier from "@/components/card-image-verifier"

export default function VerifyCardImagesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Verify Card Images</h1>
      <p className="text-gray-300 mb-8">
        Use this tool to verify that all card images are loading correctly. This helps identify any missing or
        incorrectly named image files.
      </p>

      <CardImageVerifier />
    </div>
  )
}
