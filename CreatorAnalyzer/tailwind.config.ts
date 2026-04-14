import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./landing/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "375px",
      },
      colors: {
        bg: "#FAF8F8",           // warm cream page background
        card: "#FFFFFF",          // pure white cards
        surface: "#F9FAFB",       // clean neutral surface
        borderbg: "#F1F5F9",      // clean border background
        primary: "#FF5F26",       // vibrant orange-red (from button)
        "primary-dark": "#E04E1B",// darker version for hover
        hot: "#FD356E",           // vibrant pink-red highlight (from button)
        headline: "#0F0E0C",      // near-black for all headings
        body: "#374151",          // neutral dark gray for body text
        muted: "#6B7280",         // neutral muted gray for secondary text
        border: "#E5E7EB",        // light neutral border
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(232, 108, 44, 0.2), 0 8px 32px rgba(232, 108, 44, 0.10)",
        card: "0 1px 3px rgba(15, 14, 12, 0.06), 0 4px 16px rgba(15, 14, 12, 0.04)",
        soft: "0 2px 8px rgba(15, 14, 12, 0.08)",
      },
      backgroundImage: {
        "dot-grid": "radial-gradient(rgba(232, 108, 44, 0.15) 1px, transparent 1px)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "smooth-blink": "smooth-blink 0.8s ease-in-out infinite",
        "fade-up": "fadeUp 0.5s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "smooth-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
