/** @type {import('tailwindcss').Config} */
module.exports = {
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))", // Can be overridden by custom-error
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "custom-green-icon-bg": "#38A169",
        "custom-green-active-bg": "#E0F2E0",

        "custom-button-primary": "#66CE93",
        "custom-button-primary-hover": "#3DBD74", // A slightly darker shade for hover
        "custom-status-success": "#22C55E",
        "custom-status-success-bg": "#CBF6DB", // Light bg for success status text
        "custom-status-error": "#EF4444",
        "custom-status-error-bg": "#FCDEDE", // Light bg for error status text

        "custom-sidebar-bg": "#F7F7F7", // Sidebar specific bg

        // Dark theme specific colors
        "dark-sidebar-bg": "#1F2937",
        "dark-header-bg": "#1F2937",
        "dark-header-border": "#374151",
        "dark-sidebar-foreground": "#D1D5DB",
        "dark-sidebar-muted-foreground": "#9CA3AF",
        "dark-active-bg": "#2F855A", // Dark active for sidebar
        "dark-hover-bg": "#374151",
        "dark-card-bg": "#111827",
        "dark-button-bg": "#48BB78", // Can be overridden by custom-button-primary for dark if needed
        "dark-button-text": "#1F2937",
        "dark-border": "#374151",
        "dark-background": "#030712", // Dark main background (e.g. gray-950)
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
