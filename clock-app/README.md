# My React template

This is my React template I use for building tiny demo apps. The template is an extension of Vite's `react-ts` template.

## Getting started

The template can be downloaded with [`degit`](https://github.com/Rich-Harris/degit).

```bash
$PROJECT_NAME="my-app"
npx degit markuslewin/my-react-template $PROJECT_NAME
```

The project is set up to be hosted at Netlify. The `dev` script uses [Netlify Dev](https://docs.netlify.com/cli/local-development/) to serve requests locally.

```bash
cd $PROJECT_NAME
npm i
npm run dev
```

To enable CI/CD, the project must be a Git repository hosted at GitHub.

```bash
git init
git add .
git commit -m "Initialize react template"
gh repo create --private --source . --push
```

If you're initializing the project in a monorepo, use Netlify UI to set up the build. Set the base path or the package path to the root of the project, as seen in the [recommended monorepo setup](https://docs.netlify.com/configure-builds/monorepos/#recommended-monorepo-setup).

If the repository root and the project root are the same, the CI/CD can be set up from the command-line.

```bash
npx netlify init
```

## Features

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/en/main)
- Validation with [Zod](https://zod.dev/)
- Form validation with [Conform](https://conform.guide/)
- [@epic-web/invariant](https://github.com/epicweb-dev/invariant)
- [Playwright](https://playwright.dev/)

## Server runtime

This template produces static files to be hosted on a static file server. Sometimes a server runtime is required - when bypassing restrictive CORS policies of a remote API, for example. For these scenarios, serverless functions can be created in `/netlify/functions`.

## Adding fonts

[Fontsource](https://fontsource.org/)

## Adding SVG icons

Add SVG icons to `/svg-icons`.

- [Use svg sprite icons in React](https://www.jacobparis.com/content/svg-icons)
- [Icons | The Epic Stack](https://github.com/epicweb-dev/epic-stack/blob/main/docs/icons.md)

## Adding accessible components

[Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction)
