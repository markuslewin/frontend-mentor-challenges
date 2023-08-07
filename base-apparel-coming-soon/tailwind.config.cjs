const plugin = require("tailwindcss/plugin");
const { screens } = require("./src/utils/screens");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens,
    colors: {
      // primary
      "desaturated-red": "hsl(0 36% 70%)",
      "soft-red": "hsl(0 93% 68%)",
      // neutral
      "dark-grayish-red": "hsl(0 6% 24%)",
      // gradient
      "gradient-1-from": "hsl(0 0% 100%)",
      "gradient-1-to": "hsl(0 100% 98%)",
      "gradient-2-from": "hsl(0 80% 86%)",
      "gradient-2-to": "hsl(0 74% 74%)",
      // other
      white: "hsl(0 0% 100%)",
    },
    gridTemplateColumns: {
      single: "minmax(0, 90rem)",
    },
    fontFamily: {
      josefin: "Josefin Sans Variable, sans-serif",
    },
    lineHeight: {
      "heading-strong-desktop": "4.4375rem",
    },
    fontWeight: {
      light: 300,
      regular: 400,
      "semi-bold": 600,
    },
    fontSize: ({ theme }) => ({
      heading: [
        "2.5rem",
        {
          fontWeight: theme("fontWeight.light"),
          letterSpacing: "0.676875rem",
          lineHeight: "2.625rem",
        },
      ],
      "heading-desktop": [
        "4rem",
        {
          fontWeight: theme("fontWeight.light"),
          letterSpacing: "1.0825rem",
          lineHeight: "4rem",
        },
      ],
      body: [
        "0.875rem",
        {
          fontWeight: theme("fontWeight.regular"),
          lineHeight: "1.375rem",
        },
      ],
      "body-desktop": [
        "1rem",
        {
          fontWeight: theme("fontWeight.regular"),
          lineHeight: "1.75rem",
        },
      ],
      input: [
        "0.875rem",
        {
          fontWeight: theme("fontWeight.regular"),
          lineHeight: "1.75rem",
        },
      ],
      "input-desktop": [
        "1rem",
        {
          fontWeight: theme("fontWeight.regular"),
          lineHeight: "1.75rem",
        },
      ],
      error: [
        "0.8125rem",
        {
          fontWeight: theme("fontWeight.regular"),
          lineHeight: "0.8125rem",
        },
      ],
      "error-desktop": [
        "0.8125rem",
        {
          fontWeight: theme("fontWeight.regular"),
          lineHeight: "1.75rem",
        },
      ],
    }),
    extend: {
      aria: {
        invalid: 'invalid="true"',
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("forced-colors", "@media (forced-colors: active)");
    }),
  ],
};
