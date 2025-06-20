import NextImage from "next/image"

type EnhancedCardImageProps = {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

/**
 * EnhancedCardImage – thin wrapper around next/image so other
 * components can import either the named or default export.
 */
export function EnhancedCardImage({ src, alt, width = 500, height = 300, className }: EnhancedCardImageProps) {
  return <NextImage src={src} alt={alt} width={width} height={height} className={className} />
}

/* ------------------------------------------------------------------
   Legacy aliases / convenience exports – do NOT remove without
   updating all import sites. This keeps previous default-import
   behaviour intact while satisfying the named-export requirement.
-------------------------------------------------------------------*/

export const EnhancedCardImageHandler = EnhancedCardImage
export default EnhancedCardImage
