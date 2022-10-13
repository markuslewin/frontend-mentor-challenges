const slugify = require("slugify");

function configFromTokens(tokenType) {
  return Object.fromEntries(
    Object.entries(tokenType.items).map(([name, properties]) => [
      slugify(name, { lower: true }),
      properties.value,
    ])
  );
}

module.exports = configFromTokens;
