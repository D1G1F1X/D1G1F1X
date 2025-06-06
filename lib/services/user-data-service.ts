import { getCookie, setCookie, deleteCookie } from "cookies-next"

export interface UserProfile {
  fullName?: string
  birthDate?: string
  birthPlace?: string
  email?: string
  preferredSpread?: string
  lastUsed?: string
}

export interface UserPreferences {
  saveReadings?: boolean
  emailNotifications?: boolean
  theme?: "light" | "dark"
  language?: string
}

class UserDataService {
  private readonly PROFILE_COOKIE = "numo_user_profile"
  private readonly PREFERENCES_COOKIE = "numo_user_preferences"
  private readonly CONSENT_COOKIE = "numo_privacy_consent"
  private readonly COOKIE_EXPIRY = 30 // days

  // Check if user has given consent for data storage
  hasConsent(): boolean {
    if (typeof window === "undefined") return false
    return getCookie(this.CONSENT_COOKIE) === "true"
  }

  // Set user consent
  setConsent(consent: boolean): void {
    if (typeof window === "undefined") return

    if (consent) {
      setCookie(this.CONSENT_COOKIE, "true", {
        maxAge: this.COOKIE_EXPIRY * 24 * 60 * 60,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    } else {
      this.clearAllData()
    }
  }

  // Get user profile data
  getUserProfile(): UserProfile | null {
    if (typeof window === "undefined" || !this.hasConsent()) return null

    try {
      const profileData = getCookie(this.PROFILE_COOKIE)
      return profileData ? JSON.parse(profileData as string) : null
    } catch (error) {
      console.error("Error parsing user profile:", error)
      return null
    }
  }

  // Save user profile data
  saveUserProfile(profile: Partial<UserProfile>): void {
    if (typeof window === "undefined" || !this.hasConsent()) return

    const existingProfile = this.getUserProfile() || {}
    const updatedProfile = {
      ...existingProfile,
      ...profile,
      lastUsed: new Date().toISOString(),
    }

    setCookie(this.PROFILE_COOKIE, JSON.stringify(updatedProfile), {
      maxAge: this.COOKIE_EXPIRY * 24 * 60 * 60,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  }

  // Get user preferences
  getUserPreferences(): UserPreferences | null {
    if (typeof window === "undefined" || !this.hasConsent()) return null

    try {
      const prefsData = getCookie(this.PREFERENCES_COOKIE)
      return prefsData ? JSON.parse(prefsData as string) : null
    } catch (error) {
      console.error("Error parsing user preferences:", error)
      return null
    }
  }

  // Save user preferences
  saveUserPreferences(preferences: Partial<UserPreferences>): void {
    if (typeof window === "undefined" || !this.hasConsent()) return

    const existingPrefs = this.getUserPreferences() || {}
    const updatedPrefs = { ...existingPrefs, ...preferences }

    setCookie(this.PREFERENCES_COOKIE, JSON.stringify(updatedPrefs), {
      maxAge: this.COOKIE_EXPIRY * 24 * 60 * 60,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  }

  // Clear all user data
  clearAllData(): void {
    if (typeof window === "undefined") return

    deleteCookie(this.PROFILE_COOKIE)
    deleteCookie(this.PREFERENCES_COOKIE)
    deleteCookie(this.CONSENT_COOKIE)
  }

  // Update last used timestamp
  updateLastUsed(): void {
    if (typeof window === "undefined" || !this.hasConsent()) return

    const profile = this.getUserProfile()
    if (profile) {
      this.saveUserProfile({ lastUsed: new Date().toISOString() })
    }
  }
}

export const userDataService = new UserDataService()
