const plugin = require("tailwindcss/plugin");

const configFromTokens = require("./css-utils/config-from-tokens");
const customPropertiesFromTheme = require("./css-utils/custom-properties-from-theme");
const pxToRem = require("./css-utils/px-to-rem");
const pxsToRemScale = require("./css-utils/pxs-to-rem-scale");
const valueMap = require("./css-utils/value-map");

const colorTokens = require("./design-tokens/colors.json");
const fontTokens = require("./design-tokens/fonts.json");
const textSizeTokens = require("./design-tokens/text-sizes.json");

const colors = configFromTokens(colorTokens);
const fontSize = valueMap(configFromTokens(textSizeTokens), (size) => {
  return `${pxToRem(size)}rem`;
});
const fontFamily = valueMap(configFromTokens(fontTokens), (fonts) => {
  // Fontsource appends "Variable" to the name of variable fonts
  const variableFonts = ["Lexend Deca", "Big Shoulders Display"];
  return fonts.map((font) =>
    variableFonts.includes(font) ? `${font}Variable` : font
  );
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    colors,
    fontFamily,
    fontSize,
    extend: {
      fontSize: pxsToRemScale(40),
      lineHeight: pxsToRemScale(25, 48),
      spacing: pxsToRemScale(88, 171),
      width: pxsToRemScale(500, 920),
    },
  },
  // Disables Tailwind's reset etc
  corePlugins: {
    preflight: false,
  },
  plugins: [
    require("tailwindcss-logical"),
    customPropertiesFromTheme({
      colors: "color",
      fontFamily: "font",
      fontSize: "fs",
      lineHeight: "leading",
      spacing: "space",
      width: "size",
    }),
    // Custom utility classes
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "flow-space": (value) => {
            return { "--flow-space": value };
          },
        },
        { values: theme("spacing") }
      );
      matchUtilities(
        {
          "card-color": (value) => {
            return { "--card-color": value };
          },
        },
        { values: theme("colors") }
      );
    }),
  ],
};
