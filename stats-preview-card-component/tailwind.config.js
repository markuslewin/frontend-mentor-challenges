const plugin = require("tailwindcss/plugin");

const pxToRem = require("./css-utils/px-to-rem");
const remScaleFromPxs = require("./css-utils/rem-scale-from-pxs");
const tokensToTailwind = require("./css-utils/tokens-to-tailwind");
const hasVariableFont = require("./css-utils/has-variable-font");

const colorTokens = require("./design-tokens/colors.json");
const fontTokens = require("./design-tokens/fonts.json");
const textSizeTokens = require("./design-tokens/text-sizes.json");

const colors = tokensToTailwind(colorTokens);
const fontFamily = tokensToTailwind(
  fontTokens.map(({ value, ...token }) => ({
    ...token,
    value: value.map((font) =>
      hasVariableFont(font) ? `${font}Variable` : font
    ),
  }))
);
const fontSize = tokensToTailwind(
  textSizeTokens.map(({ value, ...token }) => ({
    ...token,
    value: `${pxToRem(value)}rem`,
  }))
);

module.exports = {
  content: ["./src/*.{html,js}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    colors,
    fontFamily,
    fontSize,
    extend: {
      width: remScaleFromPxs(1110),
      spacing: remScaleFromPxs(25, 59, 60, 71, 72, 88),
      lineHeight: remScaleFromPxs(25, 29, 44),
      letterSpacing: remScaleFromPxs(1),
    },
  },
  variants: {},
  plugins: [
    require("tailwindcss-logical"),
    // create custom properties
    plugin(({ addComponents, theme }) => {
      const prefixByProperty = {
        borderRadius: "rounded",
        colors: "color",
        fontSize: "size",
        letterSpacing: "tracking",
        lineHeight: "leading",
        spacing: "space",
        fontWeight: "weight",
        width: "is",
      };

      function toCustomPropertyName(string) {
        return string.replace(".", "_").replace("/", "-");
      }

      for (const [property, prefix] of Object.entries(prefixByProperty)) {
        addComponents({
          ":root": Object.fromEntries(
            Object.entries(theme(property)).map(([name, value]) => [
              `--${prefix}-${toCustomPropertyName(name)}`,
              value,
            ])
          ),
        });
      }
      addComponents({
        ":root": Object.fromEntries(
          Object.entries(theme("fontFamily")).map(([name, value]) => [
            `--font-${name}`,
            value.join(", "),
          ])
        ),
      });
    }),
    // create utilities for css components
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "cluster-space": (value) => ({
            gap: value,
          }),
        },
        {
          values: theme("spacing"),
        }
      );
    }),
  ],
};
