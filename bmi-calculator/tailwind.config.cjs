const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

const rem = (px) => `${px / 16}rem`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    screens: {
      tablet: "40em",
      desktop: "64em",
    },
    maxWidth: {
      outer: rem(1392),
      inner: rem(1160),
      "hero-decoration": rem(978),
      "section-text": rem(465),
      none: "none",
      full: "100%",
    },
    borderWidth: {
      1: "1px",
    },
    colors: {
      blue: "hsl(227 92% 58%)",
      gunmetal: "hsl(215 31% 21%)",
      "dark-electric-blue": "hsl(215 17% 45%)",
      borders: "hsl(200 24% 88%)",
      "pure-white": "hsl(0 0% 100%)",
      "gradient-1-from": "hsl(184 95% 92% / 0%)",
      "gradient-1-to": "hsl(216 95% 92%)",
      "gradient-result-via": "hsl(227 95% 63%)",
      "gradient-result-to": "hsl(227 100% 67%)",
      // other
      inherit: "inherit",
      transparent: "transparent",
      highlight: "Highlight",
    },
    fontFamily: {
      inter: '"Inter Variable", sans-serif',
    },
    fontWeight: {
      regular: 400,
      "semi-bold": 600,
    },
    boxShadow: {
      "layer-1": `${rem(16)} ${rem(32)} ${rem(56)} hsl(211 40% 69% / 25%)`,
    },
    borderRadius: {
      3: rem(12),
      4: rem(16),
      9: rem(36),
      full: defaultTheme.borderRadius.full,
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
    extend: {
      height: {
        "hero-decoration": rem(640),
        "hero-decoration-desktop": rem(737),
      },
      opacity: {
        15: "0.15",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("forced-colors", "@media (forced-colors: active)");
    }),
  ],
};
