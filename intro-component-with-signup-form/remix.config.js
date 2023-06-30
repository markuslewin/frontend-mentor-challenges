const baseConfig =
  process.env.NODE_ENV === "production"
    ? // when running the Netify CLI or building on Netlify, we want to use
      {
        server: "./server.js",
        serverBuildPath: ".netlify/functions-internal/server.js",
      }
    : // otherwise support running remix dev, i.e. no custom server
      undefined;

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  ...baseConfig,
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "cjs",
  devServerPort: 8002,
  future: {
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true,
    v2_meta: true,
    v2_headers: true,
    v2_routeConvention: true,
  },
};
