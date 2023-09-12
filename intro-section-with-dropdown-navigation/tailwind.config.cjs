const { screens } = require("./src/utils/screens");

const rem = (px) => `${px / 16}rem`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens,
    colors: {
      "pure-white": "hsl(0 0% 100%)",
      "almost-white": "hsl(0 0% 98%)",
      "medium-gray": "hsl(0 0% 41%)",
      "almost-black": "hsl(0 0% 8%)",
    },
    boxShadow: {
      "layer-1": `0 ${rem(10)} ${rem(40)} hsl(0 0% 0% / 14.91%)`,
    },
    fontFamily: {
      base: "'Epilogue Variable', sans-serif",
    },
    fontWeight: {
      medium: 500,
      bold: 700,
    },
    fontSize: ({ theme }) => ({
      "heading-l": [
        rem(36),
        {
          fontWeight: theme("fontWeight.bold"),
          letterSpacing: rem(-0.5),
          lineHeight: rem(42),
        },
      ],
      "heading-l-desktop": [
        rem(80),
        {
          fontWeight: theme("fontWeight.bold"),
          letterSpacing: rem(-1.11),
          lineHeight: rem(80),
        },
      ],
      "body-m": [
        rem(16),
        {
          fontWeight: theme("fontWeight.medium"),
          lineHeight: rem(26),
        },
      ],
      "body-m-desktop": [
        rem(18),
        {
          fontWeight: theme("fontWeight.medium"),
          lineHeight: rem(28),
        },
      ],
      "body-s": [
        rem(14),
        {
          fontWeight: theme("fontWeight.medium"),
          lineHeight: rem(16),
        },
      ],
      button: [
        rem(16),
        {
          fontWeight: theme("fontWeight.bold"),
          letterSpacing: rem(-0.22),
          lineHeight: rem(26),
        },
      ],
      "button-desktop": [
        rem(18),
        {
          fontWeight: theme("fontWeight.bold"),
          letterSpacing: rem(-0.25),
          lineHeight: rem(28),
        },
      ],
      nav: [
        rem(16),
        {
          fontWeight: theme("fontWeight.medium"),
          lineHeight: rem(26),
        },
      ],
      "nav-desktop": [
        rem(14),
        {
          fontWeight: theme("fontWeight.medium"),
          lineHeight: rem(16),
        },
      ],
    }),
    extend: {},
  },
  plugins: [],
};
