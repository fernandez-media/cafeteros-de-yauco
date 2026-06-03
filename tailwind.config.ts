import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#FFD700",
        "gold-dim": "#b8960a",
        charcoal: "#2C2C2C",
        "bg-primary": "#111111",
        "bg-card": "#1a1a1a",
        "bg-card-hover": "#222222",
      },
      fontFamily: {
        display: ["Barlow Condensed", "sans-serif"],
        body: ["Barlow", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        "card-sm": "10px",
      },
    },
  },
  plugins: [],
} satisfies Config;
