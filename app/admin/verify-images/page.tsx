import { CardImageVerifier } from "@/components/card-image-verifier"

export default function VerifyImagesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Verify Card Images</h1>
      <CardImageVerifier />
    </div>
  )
}
