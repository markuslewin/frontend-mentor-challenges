import type { Config } from "tailwindcss";

function rem(px: number) {
  return `${px / 16}rem`;
}

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "light-blue": "hsl(178 60% 48%)",
      "light-blue-hover": "hsl(178 75% 65%)",
      "light-yellow": "hsl(39 88% 58%)",
      "light-yellow-hover": "hsl(39 100% 69%)",
      "dark-navy": "hsl(202 32% 15%)",
      "semi-dark-navy": "hsl(199 35% 19%)",
      silver: "hsl(198 23% 72%)",
      "silver-hover": "hsl(197 33% 89%)",
    },
    fontSize: {
      "heading-l": [
        rem(40),
        { fontWeight: 700, letterSpacing: rem(2.5), lineHeight: rem(50) },
      ],
      "heading-m": [
        rem(24),
        { fontWeight: 700, letterSpacing: rem(1.5), lineHeight: rem(30) },
      ],
      "heading-s": [
        rem(20),
        { fontWeight: 700, letterSpacing: rem(1.25), lineHeight: rem(25) },
      ],
      "heading-xs": [
        rem(16),
        { fontWeight: 700, letterSpacing: rem(1), lineHeight: rem(20) },
      ],
      body: [
        rem(14),
        { fontWeight: 500, letterSpacing: rem(0.8), lineHeight: rem(18) },
      ],
    },
    extend: {},
  },
  plugins: [],
};
export default config;
