import { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import tailwind from "~/tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwind },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="./assets/images/favicon-32x32.png"
        />
        <title>Frontend Mentor | Dictionary web app</title>
        <Meta />
        <Links />
      </head>
      <body
        className="font-base bg-background text-foreground tablet:text-body-m tablet:pb-28 desktop:pb-32 tablet:pt-[3.625rem] pb-20 pt-6 text-[0.9375rem] leading-[1.5rem]"
        data-mode="dark"
      >
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
