import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./landing/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",
        card: "#FFFFFF",
        surface: "#FFFFFF",
        borderbg: "#FFFFFF",
        primary: "#0A66C2",
        "primary-dark": "#004182",
        hot: "#0A66C2",
        headline: "#111827",
        body: "#475569",
        muted: "#94A3B8",
        border: "#E5E7EB",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(0, 0, 0, 0.02), 0 10px 40px rgba(0, 0, 0, 0.05)",
      },
      backgroundImage: {
        "dot-grid": "none",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "smooth-blink": "smooth-blink 0.8s ease-in-out infinite",
        "apple-fade-blur": "apple-fade-blur 3s ease-in-out infinite",
        "soft-bg": "soft-bg-cycle 20s ease-in-out infinite",
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
        "apple-fade-blur": {
          "0%, 15%": { opacity: "0", filter: "blur(10px)", transform: "translateY(5px)" },
          "25%, 85%": { opacity: "1", filter: "blur(0)", transform: "translateY(0)" },
          "95%, 100%": { opacity: "0", filter: "blur(5px)", transform: "translateY(-2px)" },
        },
        "soft-bg-cycle": {
          "0%, 100%": { "background-color": "#FEF9C3" },
          "33%": { "background-color": "#E0F2FE" },
          "66%": { "background-color": "#DCFCE7" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
