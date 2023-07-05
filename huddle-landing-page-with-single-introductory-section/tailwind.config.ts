import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      tablet: "40em",
      desktop: "64em",
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
