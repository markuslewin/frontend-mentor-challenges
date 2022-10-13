# Remix CUBE

`npx create-remix@latest --template markuslewin/remix-cube`

A template for building React websites using the Remix framework and the CUBE methodology.

Heavily influenced by "[Build Excellent Websites](https://buildexcellentwebsit.es/)" ([talk](https://www.youtube.com/watch?v=5uhIiI9Ld5M), [source code](https://glitch.com/edit/#!/build-excellent-websites)) and the [Remix Docs](https://remix.run/docs).

## Resources

- [Remix Docs](https://remix.run/docs)
- [CUBE CSS](https://cube.fyi/)
- [Tailwind](https://tailwindcss.com/)
- [Every Layout](https://every-layout.dev/)
- [Fontsource](https://fontsource.org/)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Adding assets

### Fonts

Fonts are imported in `styles/global/fonts.css`. The PostCSS build step is responsible for copying the font files into `public` and rebasing the `url` declarations of the bundled output.

Example:

1. `npm i @fontsource/inter`
2. In `styles/global/fonts.css`, `@import "@fontsource/inter/variable-full.css";`

### SVGs as components

SVG files added to the `svgs` folder will be converted in the build step and stored as React components inside `app/svgs`.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`
