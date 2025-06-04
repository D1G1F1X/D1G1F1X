// Membership types and verification utilities

export type MembershipType = "free" | "regular" | "premium"

export interface MembershipStatus {
  type: MembershipType
  verified: boolean
  purchaseInfo?: {
    productType?: "app" | "card" | "subscription"
    purchaseDate?: string
    expiryDate?: string
    productId?: string
  }
}

// Mock verification function - in a real app, this would check against a database or API
export async function verifyPurchase(purchaseId: string): Promise<boolean> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // For demo purposes, consider any non-empty ID as valid
  return !!purchaseId
}

// Mock function to get membership status - in a real app, this would check user's account
export async function getMembershipStatus(userId?: string): Promise<MembershipStatus> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // If no user ID, return free membership
  if (!userId) {
    return {
      type: "free",
      verified: true,
    }
  }

  // Mock different membership types based on user ID pattern
  // In a real app, this would check against a database
  if (userId.includes("premium")) {
    return {
      type: "premium",
      verified: true,
      purchaseInfo: {
        productType: "subscription",
        purchaseDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        expiryDate: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000).toISOString(),
      },
    }
  } else if (userId.includes("app") || userId.includes("card")) {
    return {
      type: "regular",
      verified: true,
      purchaseInfo: {
        productType: userId.includes("app") ? "app" : "card",
        purchaseDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        productId: userId.includes("app") ? "com.numoracle.app" : "numo-oracle-card-deck",
      },
    }
  }

  // Default to free membership
  return {
    type: "free",
    verified: true,
  }
}

// Check if a membership type has premium features
export function hasPremiumAccess(membershipType: MembershipType): boolean {
  return membershipType === "premium" || membershipType === "regular"
}
