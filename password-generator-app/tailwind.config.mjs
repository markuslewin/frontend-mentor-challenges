function rem(px) {
  return `${px / 16}rem`;
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      red: "hsl(0 91% 63%)",
      orange: "hsl(13 95% 66%)",
      yellow: "hsl(42	91% 68%)",
      "neon-green": "hsl(127 100% 82%)",
      "almost-white": "hsl(252 11%	91%)",
      grey: "hsl(251	9%	53%)",
      "dark-grey": "hsl(248	10% 15%)",
      "very-dark-grey": "hsl(248	15% 11%)",
    },
    fontFamily: {
      base: "'JetBrains Mono Variable', monospace",
    },
    fontSize: {
      "heading-l": [rem(32), { lineHeight: rem(43) }],
      "heading-m": [rem(24), { lineHeight: rem(31) }],
      body: [rem(18), { lineHeight: rem(23) }],
    },
    extend: {},
  },
  plugins: [],
};
