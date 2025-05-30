import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        lexend: ["var(--font-lexend)"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // New futuristic color palette
        primary: {
          DEFAULT: "#3B82F6", // Bright blue
          foreground: "#FFFFFF",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        secondary: {
          DEFAULT: "#8B5CF6", // Purple
          foreground: "#FFFFFF",
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
        },
        accent: {
          DEFAULT: "#06B6D4", // Cyan
          foreground: "#FFFFFF",
          50: "#ECFEFF",
          100: "#CFFAFE",
          200: "#A5F3FC",
          300: "#67E8F9",
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#0891B2",
          700: "#0E7490",
          800: "#155E75",
          900: "#164E63",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Keep teal for compatibility with existing code
        teal: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e",
        },
        // Adding gray scale for prose text visibility
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        white: "#FFFFFF", // Ensure white is explicitly defined
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite",
      },
      typography: (theme: any) => ({
        DEFAULT: {
          // For light mode, if used
          css: {
            color: theme("colors.gray.700"),
            a: {
              color: theme("colors.primary.600"),
              "&:hover": {
                color: theme("colors.primary.700"),
              },
            },
            h1: { color: theme("colors.gray.900") },
            h2: { color: theme("colors.gray.800") },
            h3: { color: theme("colors.gray.800") },
            h4: { color: theme("colors.gray.800") },
            strong: { color: theme("colors.gray.900") },
            code: {
              color: theme("colors.secondary.700"),
              backgroundColor: theme("colors.gray.100"),
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
              fontWeight: "500",
            },
            pre: {
              backgroundColor: theme("colors.gray.800"),
              color: theme("colors.gray.200"),
            },
            blockquote: {
              color: theme("colors.gray.600"),
              borderLeftColor: theme("colors.gray.300"),
            },
          },
        },
        invert: {
          // For .prose-invert, used in dark mode blog posts
          css: {
            "--tw-prose-body": theme("colors.white"), // Main body text to white
            "--tw-prose-headings": theme("colors.white"), // All headings to white
            "--tw-prose-lead": theme("colors.gray.100"), // Lead text slightly off-white for subtle differentiation if desired, or white
            "--tw-prose-links": theme("colors.primary.300"), // Keep links colored for affordance
            "--tw-prose-bold": theme("colors.white"), // Bold text to white
            "--tw-prose-counters": theme("colors.gray.200"), // Counters lighter
            "--tw-prose-bullets": theme("colors.gray.200"), // Bullets lighter
            "--tw-prose-hr": theme("colors.gray.700"),
            "--tw-prose-quotes": theme("colors.gray.100"), // Quotes lighter
            "--tw-prose-quote-borders": theme("colors.gray.600"),
            "--tw-prose-captions": theme("colors.gray.200"), // Captions lighter
            "--tw-prose-code": theme("colors.secondary.300"), // Inline code text
            "--tw-prose-pre-code": theme("colors.gray.100"), // Text in code blocks
            "--tw-prose-pre-bg": theme("colors.gray.800"),
            "--tw-prose-th-borders": theme("colors.gray.500"),
            "--tw-prose-td-borders": theme("colors.gray.700"),

            // Direct overrides for maximum clarity
            p: { color: theme("colors.white") },
            h1: { color: theme("colors.white") },
            h2: { color: theme("colors.white") },
            h3: { color: theme("colors.white") },
            h4: { color: theme("colors.white") },
            h5: { color: theme("colors.white") },
            h6: { color: theme("colors.white") },
            strong: { color: theme("colors.white") },
            figcaption: { color: theme("colors.gray.200") }, // Captions for figures
            blockquote: {
              color: theme("colors.gray.100"),
              borderLeftColor: theme("colors.gray.600"),
            },
            "ul > li::before": {
              backgroundColor: theme("colors.gray.200"),
            },
            "ol > li::before": {
              color: theme("colors.gray.200"),
            },
            a: {
              color: theme("colors.primary.300"),
              textDecoration: "underline",
              textDecorationColor: theme("colors.primary.300/60"),
              transition: "color 0.2s ease-in-out, text-decoration-color 0.2s ease-in-out",
              "&:hover": {
                color: theme("colors.primary.200"),
                textDecorationColor: theme("colors.primary.200/80"),
              },
            },
            code: {
              color: theme("colors.secondary.300"),
              backgroundColor: theme("colors.gray.700"),
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
              fontWeight: "500",
            },
            "a code": {
              color: "inherit",
              backgroundColor: theme("colors.gray.700"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config

export default config
