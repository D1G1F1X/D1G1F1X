"use server"

// Simple in-memory database for demo purposes
let siteSettings = {
  siteTitle: "NUMOracle",
  siteDescription: "Discover the wisdom of numbers with NUMOracle",
  logoUrl: "/numoracle-icon-logo.png",
  primaryColor: "#6366f1",
  secondaryColor: "#8b5cf6",
  contactEmail: "contact@numoracle.com",
  socialLinks: {
    facebook: "https://facebook.com/numoracle",
    twitter: "https://twitter.com/numoracle",
    instagram: "https://instagram.com/numoracle",
  },
  footerText: "© 2023 NUMOracle. All rights reserved.",
}

export async function getSiteSettings() {
  return siteSettings
}

export async function updateSiteSettings(newSettings: Partial<typeof siteSettings>) {
  siteSettings = {
    ...siteSettings,
    ...newSettings,
  }

  return siteSettings
}
