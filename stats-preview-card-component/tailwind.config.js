const plugin = require("tailwindcss/plugin");

const pxToRem = require("./css-utils/px-to-rem");
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
    extend: {},
  },
  variants: {},
  plugins: [
    plugin(({ addComponents, theme }) => {
      const prefixByProperty = {
        colors: "color",
        fontSize: "size",
      };

      for (const [property, prefix] of Object.entries(prefixByProperty)) {
        addComponents({
          ":root": Object.fromEntries(
            Object.entries(theme(property)).map(([name, value]) => [
              `--${prefix}-${name}`,
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
  ],
};
