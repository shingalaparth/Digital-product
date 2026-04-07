import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./landing/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        card: "#0D1117",
        surface: "#161B22",
        borderbg: "#21262D",
        primary: "#22C55E",
        "primary-dark": "#16A34A",
        hot: "#FACC15",
        headline: "#FFFFFF",
        body: "#C9D1D9",
        muted: "#8B949E",
        border: "#30363D",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(34, 197, 94, 0.3), 0 12px 40px rgba(34, 197, 94, 0.15)",
      },
      backgroundImage: {
        "dot-grid": "radial-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "smooth-blink": "smooth-blink 0.8s ease-in-out infinite",
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
      },
    },
  },
  plugins: [],
};

export default config;
