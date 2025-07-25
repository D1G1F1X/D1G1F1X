// Simple authentication utility that doesn't rely on React context

// Check if the user is authenticated
export function isAuthenticated(): boolean {
  // Check both cookie and localStorage for redundancy
  const hasCookie = document.cookie.includes("admin_session=logged_in")
  const hasLocalStorage = localStorage.getItem("admin_authenticated") === "true"

  console.log("Auth check - Cookie:", hasCookie, "LocalStorage:", hasLocalStorage)

  return hasCookie || hasLocalStorage
}

// Set authentication
export function setAuthenticated(value: boolean): void {
  if (value) {
    // Set both cookie and localStorage
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 1) // 1 day expiry

    document.cookie = `admin_session=logged_in; path=/; expires=${expiryDate.toUTCString()}; SameSite=Lax`
    localStorage.setItem("admin_authenticated", "true")

    console.log("Auth set to TRUE")
  } else {
    // Clear both cookie and localStorage
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    localStorage.removeItem("admin_authenticated")

    console.log("Auth set to FALSE")
  }
}

// Login function
export function login(username: string, password: string): boolean {
  // For demo purposes, hardcode the check
  if (username === "admin" && password === "numoracle") {
    setAuthenticated(true)
    return true
  }
  return false
}

// Alias for login
export const loginAdmin = login

// Placeholder for verifyAdminCredentials
export function verifyAdminCredentials(username: string, password: string): boolean {
  // In a real application, this would involve hashing passwords and checking against a secure store.
  // For demo purposes, it's a direct comparison.
  return username === "admin" && password === "numoracle"
}

// Logout function
export function logout(): void {
  setAuthenticated(false)
}
