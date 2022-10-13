module.exports = {
  plugins: [
    require("postcss-import-ext-glob"),
    require("postcss-import"),
    require("./css-utils/font-loader"),
    require("tailwindcss"),
    require("autoprefixer"),
    require("cssnano"),
  ],
};
