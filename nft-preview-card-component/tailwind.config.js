const plugin = require("tailwindcss/plugin");

function pxToRem(px) {
  return `${px / 16}rem`;
}

module.exports = {
  content: ["./src/*.{html,js}"],
  theme: {
    colors: {
      "soft-blue": "hsl(215, 51%, 70%)",
      cyan: "hsl(178, 100%, 50%)",
      "very-dark-blue-main-bg": "hsl(217, 54%, 11%)",
      "very-dark-blue-card-bg": "hsl(216, 50%, 16%)",
      "very-dark-blue-line": "hsl(215, 32%, 27%)",
      white: "hsl(0, 0%, 100%)",
    },
    fontFamily: {
      outfit: "OutfitVariable, sans-serif",
    },
    fontSize: {
      sm: pxToRem(16),
      base: pxToRem(18),
      xl: pxToRem(22),
    },
    lineHeight: {
      sm: pxToRem(20),
      base: pxToRem(26),
      xl: pxToRem(28),
    },
    extend: {},
  },
  variants: {},
  plugins: [
    require("tailwindcss-logical"),
    plugin(function ({ addUtilities, theme }) {
      addUtilities({
        ".text-style-heading": {
          fontFamily: theme("fontFamily.outfit"),
          fontWeight: theme("fontWeight.semibold"),
          fontSize: theme("fontSize.xl"),
          lineHeight: theme("lineHeight.xl"),
        },
        ".text-style-body": {
          fontFamily: theme("fontFamily.outfit"),
          fontWeight: theme("fontWeight.light"),
          fontSize: theme("fontSize.base"),
          lineHeight: theme("lineHeight.base"),
        },
        ".text-style-caption": {
          fontFamily: theme("fontFamily.outfit"),
          fontWeight: theme("fontWeight.normal"),
          fontSize: theme("fontSize.sm"),
          lineHeight: theme("lineHeight.sm"),
        },
      });
    }),
  ],
};
