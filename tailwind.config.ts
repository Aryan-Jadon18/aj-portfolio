import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          0: "#000308",
          1: "#050a14",
          2: "#0a1628",
        },
        txt: {
          0: "#e8f1ff",
          1: "#aab8cc",
          2: "#6b7a90",
          3: "#3a475a",
        },
        cyan: {
          DEFAULT: "#00d4ff",
          soft: "#4de1ff",
        },
        blue: { brand: "#0099ff" },
        violet: { brand: "#7c5cff" },
        pink: { brand: "#ff5cf0" },
        green: { brand: "#00ffa3" },
        amber: { brand: "#ffb13d" },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "14px",
        pill: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
