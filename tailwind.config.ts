import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "spin": "spin var(--animation-duration, 1s) linear infinite",
        "wiggle": "wiggle var(--animation-duration, 500ms) ease-in-out infinite",
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(calc(-1 * var(--wiggle-angle, 3deg)))' },
          '50%': { transform: 'rotate(calc(var(--wiggle-angle, 3deg)))' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
