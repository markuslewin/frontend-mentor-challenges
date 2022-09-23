const slugify = require("./slugify");

function tokensToTailwind(tokens) {
  return Object.fromEntries(
    tokens.map((token) => [slugify(token.name), token.value])
  );
}

module.exports = tokensToTailwind;
