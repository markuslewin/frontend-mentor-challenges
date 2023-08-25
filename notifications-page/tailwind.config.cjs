const plugin = require("tailwindcss/plugin");

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
      // primary
      red: "hsl(1 90% 64%)",
      blue: "hsl(219 85% 26%)",
      // neutral
      white: "hsl(0 0% 100%)",
      "very-light-grayish-blue": "hsl(210 60% 98%)",
      "light-grayish-blue-1": "hsl(211 68% 94%)",
      "light-grayish-blue-2": "hsl(205 33% 90%)",
      "grayish-blue": "hsl(219 14% 63%)",
      "dark-grayish-blue": "hsl(219 12% 42%)",
      "very-dark-blue": "hsl(224 21% 14%)",
    },
    fontFamily: { body: "'Plus Jakarta Sans Variable', sans-serif" },
    fontWeight: {
      medium: 500,
      "extra-bold": 800,
    },
    fontSize: ({ theme }) => ({
      body: [
        rem(14),
        { fontWeight: theme("fontWeight.medium"), lineHeight: rem(18) },
      ],
      "body-desktop": [
        rem(16),
        { fontWeight: theme("fontWeight.medium"), lineHeight: rem(20) },
      ],
      header: [
        rem(20),
        { fontWeight: theme("fontWeight.extra-bold"), lineHeight: rem(25) },
      ],
      "header-desktop": [
        rem(24),
        { fontWeight: theme("fontWeight.extra-bold"), lineHeight: rem(30) },
      ],
    }),
    extend: {},
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("hocus", ["&:hover", "&:focus-visible"]);
      addVariant("forced-colors", "@media (forced-colors: active)");
    }),
  ],
};
