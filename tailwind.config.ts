import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sistema neutro profesional
        primary: {
          DEFAULT: "#111827", // Gray-900
          foreground: "#FFFFFF",
          hover: "#1F2937",
          active: "#030712",
        },
        background: "#F5F5F7", // Apple-style gray
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#111827",
        },
        border: "#E5E7EB", // Gray-200
        muted: {
          DEFAULT: "#F9FAFB",
          foreground: "#6B7280", // Gray-500
        },
        accent: "#2563EB", // Blue-600 (solo acentos)
        success: "#059669", // Emerald-600
        warning: "#D97706", // Amber-600
        destructive: "#DC2626", // Red-600

        // Colores semánticos de badges
        semantic: {
          red: "#EF4444",
          "red-light": "#FEF2F2",
          amber: "#F59E0B",
          "amber-light": "#FFFBEB",
          indigo: "#6366F1",
          "indigo-light": "#EEF2FF",
          teal: "#0D9488",
          "teal-light": "#F0FDFA",
          purple: "#8B5CF6",
          "purple-light": "#F5F3FF",
          blue: "#3B82F6",
          "blue-light": "#EFF6FF",
          green: "#22C55E",
          "green-light": "#F0FDF4",
        },
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "8px",
        md: "8px",
        lg: "12px",
        xl: "14px",
        "2xl": "16px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        xs: "0 1px 2px rgba(0, 0, 0, 0.04)",
        sm: "0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)",
        md: "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
        lg: "0 8px 24px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.05)",
        xl: "0 16px 48px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
