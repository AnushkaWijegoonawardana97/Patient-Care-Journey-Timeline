/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "bg-secondary-success",
    "text-secondary-success",
    "bg-secondary-emphasis",
    "text-secondary-emphasis",
    "bg-secondary-accent",
    "text-secondary-accent",
    "hover:bg-secondary-emphasis",
    "hover:text-secondary-emphasis",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"GeneralSans Variable"', "sans-serif"],
      },
      colors: {
        // Primary colors (based on #21404b)
        primary: {
          DEFAULT: "#21404b",
          base: "#21404b",
          hover: "#1a333b",
          light: "#e8f0f2",
          dark: "#0f1f25",
        },
        // Secondary colors (Success/Progress)
        secondary: {
          DEFAULT: "#10B981",
          success: "#10B981",
          accent: "#6EE7B7",
          light: "#DCFCE7",
          emphasis: "#047857",
        },
        // Tertiary colors
        tertiary: {
          info: "#BFDBFE",
          warning: "#F59E0B",
          error: "#EF4444",
          neutral: "#9CA3AF",
        },
        // Typography colors - with dark mode support
        text: {
          primary: "#111827",
          secondary: "#6B7280",
          disabled: "#9CA3AF",
          onPrimary: "#FFFFFF",
        },
        // Shadcn UI colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
