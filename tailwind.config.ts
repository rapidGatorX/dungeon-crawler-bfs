import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
        dungeon: {
          primary: "#2C3E50",
          secondary: "#E74C3C",
          accent: "#F1C40F",
          chamber: "#34495E",
          visited: "#27AE60",
        },
      },
      keyframes: {
        "jump": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow": {
          "0%, 100%": { filter: "brightness(100%)" },
          "50%": { filter: "brightness(150%)" },
        },
        "return-to-top": {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-50vh)" },
          "100%": { transform: "translateY(-100vh)" },
        },
      },
      animation: {
        "jump": "jump 0.5s ease-in-out",
        "glow": "glow 2s ease-in-out infinite",
        "return-to-top": "return-to-top 2s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
