export type ElementType = "fire" | "water" | "earth" | "air" | "spirit"

export interface DiceResult {
  element: ElementType
  value: number | null
}
