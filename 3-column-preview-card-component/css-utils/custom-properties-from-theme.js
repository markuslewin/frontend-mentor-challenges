const plugin = require("tailwindcss/plugin");

const customPropertiesFromTheme = plugin.withOptions(function (
  prefixByProperty = {}
) {
  return function ({ addComponents, theme }) {
    addComponents({
      ":root": Object.fromEntries(
        Object.entries(prefixByProperty).flatMap(([property, prefix]) => {
          const values = theme(property);
          if (values === undefined) {
            console.warn(
              `Could not find values for property '${property}' in theme`
            );
            return [];
          }
          return Object.entries(values).flatMap(([name, valueOrValues]) => {
            if (Array.isArray(valueOrValues)) {
              return [[`--${prefix}-${name}`, valueOrValues.join(", ")]];
            }
            if (typeof valueOrValues === "object") {
              return Object.entries(valueOrValues).map(([suffix, value]) => {
                return [`--${prefix}-${name}-${suffix}`, value];
              });
            }
            return [[`--${prefix}-${name}`, valueOrValues]];
          });
        })
      ),
    });
  };
});

module.exports = customPropertiesFromTheme;
