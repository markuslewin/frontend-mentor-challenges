import plugin from "tailwindcss/plugin";

function rem(px) {
  return `${px / 16}rem`;
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      tablet: "40em",
      desktop: "64em",
    },
    colors: {
      transparent: "transparent",
      // Primary
      "moderate-blue": "hsl(238 40% 52%)",
      "soft-red": "hsl(358 79% 66%)",
      "light-grayish-blue": "hsl(239 57% 85%)",
      "pale-red": "hsl(357 100% 86%)",
      // Neutral
      "dark-blue": "hsl(212 24% 26%)",
      "grayish-blue": "hsl(211 10% 45%)",
      "light-gray": "hsl(223 19% 93%)",
      "very-light-gray": "hsl(228 33% 97%)",
      white: "hsl(0 0% 100%)",
    },
    fontFamily: {
      base: "'Rubik Variable', sans-serif",
    },
    fontSize: {
      "heading-l": [rem(24), { fontWeight: 500, lineHeight: rem(28) }],
      "heading-m": [rem(16), { fontWeight: 500, lineHeight: rem(19) }],
      body: [rem(16), { lineHeight: rem(24) }],
    },
    extend: {},
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("hocus", ["&:hover", "&:focus-visible"]);
    }),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "shape-p": (padding) => {
            return {
              padding: `calc(${padding} - var(--shape-border-width, 0px))`,
              borderWidth: "var(--shape-border-width)",
            };
          },
        },
        { values: theme("size") }
      );
      matchUtilities(
        {
          "shape-py": (padding) => {
            return {
              "padding-top": `calc(${padding} - var(--shape-border-width, 0px))`,
              "padding-bottom": `calc(${padding} - var(--shape-border-width, 0px))`,
              borderWidth: "var(--shape-border-width)",
            };
          },
        },
        { values: theme("size") }
      );
      matchUtilities(
        {
          "shape-px": (padding) => {
            return {
              "padding-left": `calc(${padding} - var(--shape-border-width, 0px))`,
              "padding-right": `calc(${padding} - var(--shape-border-width, 0px))`,
              borderWidth: "var(--shape-border-width)",
            };
          },
        },
        { values: theme("size") }
      );
      matchUtilities(
        {
          "shape-border": (borderWidth) => {
            return {
              "--shape-border-width": borderWidth,
            };
          },
        },
        { values: theme("borderWidth") }
      );
    }),
  ],
};
