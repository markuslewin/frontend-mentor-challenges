const slugify = require("./slugify");

function hasVariableFont(font) {
  try {
    require.resolve(`@fontsource/${slugify(font)}/variable-full.css`);
    return true;
  } catch {
    return false;
  }
}

module.exports = hasVariableFont;
