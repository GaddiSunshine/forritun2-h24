import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark:background": "var(--background)",
        "dark:foreground": "var(--foreground)",
        "light:background": "var(--background)",
        "light:foreground": "var(--foreground)",
      },
      keyframes: {
        wiggle: {
          "0%": { transform: "rotate(0)" },
          "20%": { transform: "rotate(-5deg)" },
          "40%": { transform: "rotate(0)" },
          "60%": { transform: "rotate(5deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
