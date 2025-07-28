// This file is a placeholder for user-data-service.ts
// Ensure it does NOT import server-only modules or access server-only environment variables.

export interface UserProfile {
  fullName?: string
  preferredSpread?: string
  birthDate?: string
  birthTime?: string
  birthPlace?: string
  readingsCount?: number
  lastUsed?: string
  createdAt?: string
  isMember?: boolean
}

class UserDataService {
  private storageKey = "numoUserProfile"
  private consentKey = "cardSimulatorConsent"

  public hasConsent(): boolean {
    if (typeof window === "undefined") return false // Server-side, no consent
    return localStorage.getItem(this.consentKey) === "true"
  }

  public setConsent(consent: boolean): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.consentKey, String(consent))
    if (!consent) {
      this.clearAllData()
    }
  }

  public getUserProfile(): UserProfile | null {
    if (typeof window === "undefined") return null
    try {
      const data = localStorage.getItem(this.storageKey)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error("Error parsing user profile from localStorage:", error)
      return null
    }
  }

  public saveUserProfile(profile: Partial<UserProfile>): void {
    if (typeof window === "undefined") return
    if (!this.hasConsent()) {
      console.warn("Cannot save user profile: consent not given.")
      return
    }
    const currentProfile = this.getUserProfile() || {}
    const updatedProfile = {
      ...currentProfile,
      ...profile,
      lastUsed: new Date().toISOString(),
      createdAt: currentProfile.createdAt || new Date().toISOString(),
      readingsCount: (currentProfile.readingsCount || 0) + (profile.readingsCount ? profile.readingsCount : 0), // Increment if a new reading is explicitly counted
    }
    localStorage.setItem(this.storageKey, JSON.stringify(updatedProfile))
  }

  public updateLastUsed(): void {
    if (typeof window === "undefined") return
    if (!this.hasConsent()) return
    this.saveUserProfile({ lastUsed: new Date().toISOString() })
  }

  public incrementReadingCount(): void {
    if (typeof window === "undefined") return
    if (!this.hasConsent()) return
    const currentProfile = this.getUserProfile() || {}
    this.saveUserProfile({ readingsCount: (currentProfile.readingsCount || 0) + 1 })
  }

  public clearAllData(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(this.storageKey)
    localStorage.removeItem(this.consentKey)
    localStorage.removeItem("numoReadings") // Clear saved readings too
  }
}

export const userDataService = new UserDataService()
