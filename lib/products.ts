export interface Product {
  id: string
  name: string
  price: number
  image?: string
  description?: string
  category?: string
  isSelectable?: boolean // To control if it appears in dropdowns
}

export const availableProducts: Product[] = [
  {
    id: "novice-oracle-deck",
    name: "The Novice Oracle Deck",
    price: 25,
    image: "/images/products/novice-deck-symbols.jpg",
    description: "A beginner-friendly oracle deck.",
    isSelectable: true,
  },
  {
    id: "adepts-oracle-deck",
    name: "The Adepts Oracle Deck",
    price: 22,
    image: "/images/products/01cauldron-fire.jpg",
    description: "An advanced oracle deck for seasoned readers.",
    isSelectable: true,
  },
  {
    id: "elemental-dice-set",
    name: "10-sided Elemental Oracle Dice Set",
    price: 11,
    image: "/images/tools/generated/elemental-dice-feature.png",
    description: "A set of elemental dice for divination.",
    isSelectable: true,
  },
  {
    id: "numo-spread-cloth",
    name: "Numo Oracle Spread Cloth with Guide",
    price: 11,
    image: "/images/products/speardcloth01.jpg.jpg",
    description: "A beautiful spread cloth with an accompanying guide.",
    isSelectable: true,
  },
  {
    id: "standard-deck",
    name: "Numo Oracle Standard Deck",
    price: 33,
    image: "/images/products/standard-deck.png",
    description: "The foundational Numo Oracle deck.",
    isSelectable: true,
  },
  {
    id: "deluxe-deck",
    name: "Numo Oracle Deluxe Deck",
    price: 55,
    image: "/images/products/deluxe-deck.png",
    description: "A premium version of the Numo Oracle deck with enhanced features.",
    isSelectable: true,
  },
  {
    id: "guidebook",
    name: "Numo Oracle Guidebook",
    price: 15,
    image: "/images/products/guidebook.png",
    description: "A comprehensive guidebook to the Numo Oracle system.",
    isSelectable: true,
  },
  {
    id: "crystal-set",
    name: "Elemental Crystal Set",
    price: 20,
    image: "/images/products/crystal-set.png",
    description: "A set of crystals aligned with elemental energies.",
    isSelectable: true,
  },
]

// General list of selectable products (all products marked isSelectable and not "Coming Soon")
export const selectableProducts = availableProducts.filter((p) => p.isSelectable && p.category !== "Coming Soon")

// Specific list of products for the dropdown, based on what's on the /buy page
const buyPageProductIds = ["novice-oracle-deck", "adepts-oracle-deck", "elemental-dice-set", "numo-spread-cloth"]

export const buyPageDropdownProducts = availableProducts.filter(
  (p) => buyPageProductIds.includes(p.id) && p.isSelectable && p.category !== "Coming Soon",
)
