let plugin = require("tailwindcss/plugin");

const rem = (px) => `${px / 16}rem`;
const step = (px) => (px / 4).toString();

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: { font: ["ManropeVariable", "sans-serif"] },
    fontWeight: {
      "extra-bold": 800,
    },
    fontSize: {
      "heading-mobile": rem(11),
      "quote-mobile": rem(24),
      "heading-desktop": rem(13),
      "quote-desktop": rem(28),
    },
    letterSpacing: {
      "heading-mobile": rem(3.46),
      "quote-mobile": rem(-0.26),
      "heading-desktop": rem(4.09),
      "quote-desktop": rem(-0.3),
    },
    lineHeight: {
      "heading-mobile": rem(15),
      "quote-mobile": rem(33),
      "heading-desktop": rem(18),
      "quote-desktop": rem(38),
    },
    colors: {
      "dark-blue": "hsl(218 23% 16%)",
      "dark-grayish-blue": "hsl(217 19% 24%)",
      "grayish-blue": "hsl(217 19% 38%)",
      "light-cyan": "hsl(193 38% 86%)",
      "neon-green": "hsl(150 100% 66%)",
      black: "hsl(0 0% 0% / 10%)",
    },
    boxShadow: {
      layer: `${rem(30)} ${rem(50)} ${rem(80)}`,
      glow: `0 0 ${rem(40)}`,
    },
    extend: {
      maxWidth: {
        [step(540)]: rem(540),
      },
      padding: {
        [step(72)]: rem(72),
        [step(120)]: rem(120),
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("forced-colors", "@media (forced-colors: active)");
    }),
  ],
};
