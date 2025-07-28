// This file is used for client-side configuration that might be dynamic
// or need to be accessed by client components.
// For example, feature flags, API base URLs, etc.

const userConfig = {
  // Example: Feature flag for a new dashboard layout
  enableNewDashboardLayout: true,

  // Example: API base URL (if different from current origin)
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",

  // Example: User-specific settings that might be loaded from a database
  // This would typically be fetched on the client side after authentication
  // and stored in a context or state management solution.
  // For now, it's a placeholder.
  userSettings: {
    theme: "dark",
    notifications: true,
    preferredLanguage: "en",
  },
}

export default userConfig
