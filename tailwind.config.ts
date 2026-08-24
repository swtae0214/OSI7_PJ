import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/domains/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        layer7: "#EF4444", // Application (Red)
        layer6: "#F97316", // Presentation (Orange)
        layer5: "#F59E0B", // Session (Amber)
        layer4: "#10B981", // Transport (Emerald)
        layer3: "#06B6D4", // Network (Cyan)
        layer2: "#3B82F6", // Data Link (Blue)
        layer1: "#8B5CF6", // Physical (Purple)
      },
      keyframes: {
        pulseSlow: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.02)" },
        },
        packetFlow: {
          "0%": { transform: "translateX(0%)", opacity: "0.2" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0.2" },
        },
      },
      animation: {
        pulseSlow: "pulseSlow 3s ease-in-out infinite",
        packetFlow: "packetFlow 1.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
