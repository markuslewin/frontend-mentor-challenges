import { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import tailwind from "~/tailwind.css?url";
import { href as iconsHref } from "~/components/ui/icon";

export const links: LinksFunction = () => [
  // Preload svg sprite as a resource to avoid render blocking
  { rel: "preload", href: iconsHref, as: "image" },
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
        className="bg-background font-base text-[0.9375rem] leading-[1.5rem] text-foreground tablet:text-body-m"
        data-mode="dark"
      >
        <div className="min-h-screen pb-20 pt-6 tablet:pb-28 tablet:pt-[3.625rem] desktop:pb-32">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
