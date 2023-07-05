import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  // Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "~/styles/global.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <title>
          Frontend Mentor | Huddle landing page with single introductory section
        </title>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        {/* <Scripts /> */}
        <LiveReload />
      </body>
    </html>
  );
}
