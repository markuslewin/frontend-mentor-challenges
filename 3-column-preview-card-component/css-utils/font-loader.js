const path = require("path");
const fs = require("fs");

const fontsDirectory = "fonts";

// Loads fonts declared in the CSS into `public`
const fontLoader = require("postcss-url")({
  url: (asset, dir, options, decl) => {
    if (decl.parent?.name === "font-face" && decl.prop === "src") {
      const targetPath = path.join("public", fontsDirectory);
      const basename = path.basename(asset.absolutePath);
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath);
      }
      fs.copyFileSync(asset.absolutePath, path.join(targetPath, basename));
      return `/${fontsDirectory}/${basename}`;
    } else {
      return undefined;
    }
  },
});

module.exports = fontLoader;
