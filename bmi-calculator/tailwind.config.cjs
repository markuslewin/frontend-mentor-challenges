const rem = (px) => `${px / 16}rem`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      tablet: "40em",
      desktop: "64em",
    },
    colors: {
      blue: "hsl(227 92% 58%)",
      gunmetal: "hsl(215 31% 21%)",
      "dark-electric-blue": "hsl(215 17% 45%)",
      borders: "hsl(200 24% 88%)",
      "pure-white": "hsl(0 0% 100%)",
    },
    fontFamily: {
      inter: '"Inter Variable", sans-serif',
    },
    fontWeight: {
      regular: 400,
      "semi-bold": 600,
    },
    fontSize: ({ theme }) => ({
      "heading-xl": [
        rem(64),
        {
          fontWeight: theme("fontWeight.semi-bold"),
          letterSpacing: "-0.05em",
          lineHeight: "110%",
        },
      ],
      "heading-l": [
        rem(48),
        {
          fontWeight: theme("fontWeight.semi-bold"),
          letterSpacing: "-0.05em",
          lineHeight: "110%",
        },
      ],
      // not in design system
      "heading-l-m": [
        rem(32),
        {
          fontWeight: theme("fontWeight.semi-bold"),
          letterSpacing: "-0.05em",
          lineHeight: "110%",
        },
      ],
      "heading-m": [
        rem(24),
        {
          fontWeight: theme("fontWeight.semi-bold"),
          letterSpacing: "-0.05em",
          lineHeight: "110%",
        },
      ],
      "heading-s": [
        rem(20),
        {
          fontWeight: theme("fontWeight.semi-bold"),
          letterSpacing: "-0.05em",
          lineHeight: "110%",
        },
      ],
      "body-m": [
        rem(16),
        {
          fontWeight: theme("fontWeight.regular"),
          lineHeight: "150%",
        },
      ],
      "body-m-bold": [
        rem(16),
        {
          fontWeight: theme("fontWeight.semi-bold"),
          lineHeight: "150%",
        },
      ],
      "body-s": [
        rem(14),
        {
          fontWeight: theme("fontWeight.regular"),
          lineHeight: "150%",
        },
      ],
    }),
    extend: {},
  },
  plugins: [],
};
