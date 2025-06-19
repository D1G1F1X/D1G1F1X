import { getCookie, setCookie, deleteCookie } from "cookies-next"

export interface UserProfile {
  fullName?: string
  currentName?: string
  nicknames?: string
  birthDate?: string
  birthPlace?: string
  email?: string
  preferredSpread?: string
  lastUsed?: string
  // Numerology specific data
  lastCalculation?: {
    lifePathNumber?: number
    destinyNumber?: number
    soulNumber?: number
    personalityNumber?: number
    birthDayNumber?: number
    expressionNumber?: number
    maturityNumber?: number
    challengeNumbers?: number[]
    pinnacleNumbers?: number[]
    calculatedAt?: string
  }
  // Session management
  activeSession?: {
    sessionId: string
    isComplete: boolean
    timestamp: string
  }
}

export interface UserPreferences {
  saveReadings?: boolean
  emailNotifications?: boolean
  theme?: "light" | "dark"
  language?: string
  autoSaveEnabled?: boolean
  reportPreferences?: {
    includeTimeline?: boolean
    includeCompatibility?: boolean
    detailLevel?: "basic" | "comprehensive"
  }
}

class UserDataService {
  private readonly PROFILE_COOKIE = "numo_user_profile"
  private readonly PREFERENCES_COOKIE = "numo_user_preferences"
  private readonly CONSENT_COOKIE = "numo_privacy_consent"
  private readonly SESSION_COOKIE = "numo_active_session"
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

  // Save user profile data with optimized updates
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
    deleteCookie(this.SESSION_COOKIE)
  }

  // Update last used timestamp
  updateLastUsed(): void {
    if (typeof window === "undefined" || !this.hasConsent()) return

    const profile = this.getUserProfile()
    if (profile) {
      this.saveUserProfile({ lastUsed: new Date().toISOString() })
    }
  }

  // Save numerology calculation results with session management
  saveNumerologyCalculation(calculationData: Partial<UserProfile["lastCalculation"]>): void {
    if (typeof window === "undefined" || !this.hasConsent()) return

    const profile = this.getUserProfile() || {}
    const sessionId = this.generateSessionId()

    const updatedProfile = {
      ...profile,
      lastCalculation: {
        ...profile.lastCalculation,
        ...calculationData,
        calculatedAt: new Date().toISOString(),
      },
      activeSession: {
        sessionId,
        isComplete: true,
        timestamp: new Date().toISOString(),
      },
      lastUsed: new Date().toISOString(),
    }

    setCookie(this.PROFILE_COOKIE, JSON.stringify(updatedProfile), {
      maxAge: this.COOKIE_EXPIRY * 24 * 60 * 60,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })

    // Save session reference
    setCookie(this.SESSION_COOKIE, sessionId, {
      maxAge: this.COOKIE_EXPIRY * 24 * 60 * 60,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  }

  // Get last numerology calculation
  getLastCalculation(): UserProfile["lastCalculation"] | null {
    if (typeof window === "undefined" || !this.hasConsent()) return null

    const profile = this.getUserProfile()
    return profile?.lastCalculation || null
  }

  // Check if there's an active session
  hasActiveSession(): boolean {
    if (typeof window === "undefined" || !this.hasConsent()) return false

    const profile = this.getUserProfile()
    const sessionCookie = getCookie(this.SESSION_COOKIE)

    return !!(profile?.activeSession?.isComplete && sessionCookie === profile.activeSession.sessionId)
  }

  // Get active session data
  getActiveSession(): UserProfile["activeSession"] | null {
    if (typeof window === "undefined" || !this.hasConsent()) return null

    const profile = this.getUserProfile()
    return profile?.activeSession || null
  }

  // Generate unique session ID
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Get complete calculation session data
  getCompleteSession(): {
    userData: {
      fullName?: string
      currentName?: string
      nicknames?: string
      birthDate?: string
    }
    calculation: UserProfile["lastCalculation"]
    session: UserProfile["activeSession"]
  } | null {
    if (typeof window === "undefined" || !this.hasConsent()) return null

    const profile = this.getUserProfile()
    if (!profile || !this.hasActiveSession()) return null

    return {
      userData: {
        fullName: profile.fullName,
        currentName: profile.currentName,
        nicknames: profile.nicknames,
        birthDate: profile.birthDate,
      },
      calculation: profile.lastCalculation || null,
      session: profile.activeSession || null,
    }
  }

  // Validate session integrity
  validateSession(): boolean {
    if (typeof window === "undefined" || !this.hasConsent()) return false

    const session = this.getCompleteSession()
    if (!session) return false

    // Check if we have minimum required data
    const hasRequiredData = !!(
      session.userData.fullName &&
      session.userData.birthDate &&
      session.calculation?.lifePathNumber &&
      session.session?.isComplete
    )

    return hasRequiredData
  }

  // Auto-save form data (debounced)
  private autoSaveTimeout: NodeJS.Timeout | null = null

  autoSaveFormData(formData: Partial<UserProfile>, debounceMs = 1000): void {
    if (typeof window === "undefined" || !this.hasConsent()) return

    // Clear existing timeout
    if (this.autoSaveTimeout) {
      clearTimeout(this.autoSaveTimeout)
    }

    // Set new timeout for debounced save
    this.autoSaveTimeout = setTimeout(() => {
      this.saveUserProfile(formData)
    }, debounceMs)
  }
}

export const userDataService = new UserDataService()
