const plugin = require("tailwindcss/plugin");

function pxToRem(px) {
  return `${px / 16}rem`;
}

function remScaleFromPxs(...pxs) {
  return Object.fromEntries(Array.from(pxs).map((px) => [px / 4, pxToRem(px)]));
}

module.exports = {
  content: ["./src/*.{html,js}"],
  theme: {
    screens: {
      sm: "40em",
    },
    colors: {
      "pure-white": "hsl(0, 0%, 100%)",
      cream: "hsl(30, 38%, 92%)",
      "aurometal-saurus": "hsl(228, 12%, 48%)",
      "deep-aquamarine": "hsl(158, 36%, 37%)",
      "deep-aquamarine-hover": "hsl(157, 43%, 18%)",
      gunmetal: "hsl(212, 21%, 14%)",
    },
    fontFamily: {
      fraunces: "FrauncesVariable, serif",
      montserrat: "MontserratVariable, sans-serif",
    },
    fontSize: {
      large: pxToRem(32),
      medium: pxToRem(14),
      small: pxToRem(13),
      "extra-small": pxToRem(12),
    },
    fontWeight: {
      medium: 500,
      bold: 700,
    },
    lineHeight: {
      large: pxToRem(32),
      medium: pxToRem(23),
      small: pxToRem(17),
      "extra-small": pxToRem(15),
    },
    borderRadius: {
      small: pxToRem(8),
      large: pxToRem(10),
    },
    extend: {
      spacing: remScaleFromPxs(15, 19, 29, 30),
      maxWidth: remScaleFromPxs(600),
      minHeight: remScaleFromPxs(48),
    },
  },
  variants: {},
  plugins: [
    require("tailwindcss-logical"),
    plugin(function ({ addUtilities, theme }) {
      addUtilities({
        ".text-style-display": {
          fontFamily: theme("fontFamily.fraunces"),
          fontWeight: theme("fontWeight.bold"),
          fontSize: theme("fontSize.large"),
          lineHeight: theme("lineHeight.large"),
        },
        ".text-style-body": {
          fontFamily: theme("fontFamily.montserrat"),
          fontWeight: theme("fontWeight.medium"),
          fontSize: theme("fontSize.medium"),
          lineHeight: theme("lineHeight.medium"),
        },
        ".text-style-button-text": {
          fontFamily: theme("fontFamily.montserrat"),
          fontWeight: theme("fontWeight.bold"),
          fontSize: theme("fontSize.medium"),
          lineHeight: theme("lineHeight.small"),
        },
        ".text-style-overline": {
          fontFamily: theme("fontFamily.montserrat"),
          fontWeight: theme("fontWeight.medium"),
          fontSize: theme("fontSize.extra-small"),
          lineHeight: theme("lineHeight.extra-small"),
          letterSpacing: pxToRem(5),
        },
      });
    }),
  ],
};
