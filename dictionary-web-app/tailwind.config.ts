import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      base: "var(--font)",
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
