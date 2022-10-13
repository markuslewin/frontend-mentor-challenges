const pxToRem = require("./px-to-rem");

function pxsToRemScale(...pxs) {
  return Object.fromEntries(
    Array.from(pxs).map((px) => [px / 4, `${pxToRem(px)}rem`])
  );
}

module.exports = pxsToRemScale;
