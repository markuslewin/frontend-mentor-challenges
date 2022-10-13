const plugin = require("tailwindcss/plugin");

const configFromTokens = require("./css-utils/config-from-tokens");
const customPropertiesFromTheme = require("./css-utils/custom-properties-from-theme");
const pxToRem = require("./css-utils/px-to-rem");
// const pxsToRemScale = require("./css-utils/pxs-to-rem-scale");
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
  const variableFonts = ["Inter"];
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
      // spacing: pxsToRemScale(63, 71),
    },
  },
  // Disables Tailwind's reset etc
  corePlugins: {
    preflight: false,
  },
  plugins: [
    require("tailwindcss-logical"),
    customPropertiesFromTheme({ colors: "color" }),
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
    }),
  ],
};
