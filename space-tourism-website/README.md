# My React template

This is my React template I use for building tiny demo apps. The template is an extension of Vite's `react-ts` template.

## Getting started

The template can be downloaded with [`degit`](https://github.com/Rich-Harris/degit).

```bash
$PROJECT_NAME="my-app"
npx degit markuslewin/my-react-template $PROJECT_NAME
```

The project is set up to be hosted in Azure with Azure Static Web Apps (including a dynamic API with Azure Functions). The `dev` script uses [SWA CLI](https://azure.github.io/static-web-apps-cli/) to serve requests locally.

```bash
cd $PROJECT_NAME
npm i
npm run dev
```

To use GitHub Actions for CI/CD, a GitHub repository must exist.

```bash
git init
git add .
git commit -m "Initialize react template"
gh repo create --private --source . --push
```

To deploy to Azure, a resource group must exist.

```bash
$RESOURCE_GROUP="my-resource-group"
az group create --name $RESOURCE_GROUP --location westeurope
```

Set up the GitHub repository to deploy to Azure from the main branch.

```bash
$REPOSITORY_URL="https://github.com/markuslewin/$PROJECT_NAME"
$BASE_DIRECTORY="/"
$APP_LOCATION="$BASE_DIRECTORY"
$API_LOCATION="${BASE_DIRECTORY}api"
$OUTPUT_LOCATION="${BASE_DIRECTORY}dist"
az staticwebapp create --name $PROJECT_NAME --resource-group $RESOURCE_GROUP --location westeurope --sku Free --source $REPOSITORY_URL --branch main --app-location $APP_LOCATION --api-location $API_LOCATION --output-location $OUTPUT_LOCATION --login-with-github
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

## Adding fonts

[Fontsource](https://fontsource.org/)

## Adding SVG icons

Add SVG icons to `/svg-icons`.

- [Use svg sprite icons in React](https://www.jacobparis.com/content/svg-icons)
- [Icons | The Epic Stack](https://github.com/epicweb-dev/epic-stack/blob/main/docs/icons.md)

## Adding accessible components

[Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction)
