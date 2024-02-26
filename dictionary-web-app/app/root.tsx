import {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs,
  json,
} from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import tailwind from "~/tailwind.css?url";
import { href as iconsHref } from "~/components/ui/icon";
import { getFont, setFont } from "./utils/font.server";
import { invariantResponse } from "@epic-web/invariant";
import { FontFormSchema, useFont } from "./utils/font";
import { z } from "zod";
import { ModeFormSchema, useMode } from "./utils/mode";
import { getMode, setMode } from "./utils/mode.server";

export const links: LinksFunction = () => [
  // Preload svg sprite as a resource to avoid render blocking
  { rel: "preload", href: iconsHref, as: "image" },
  { rel: "stylesheet", href: tailwind },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const [font, mode] = await Promise.all([getFont(request), getMode(request)]);
  return {
    font,
    mode,
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const result = z
    .discriminatedUnion("intent", [FontFormSchema, ModeFormSchema])
    .safeParse(Object.fromEntries(formData));
  invariantResponse(result.success, "Invalid value");

  let setCookie: string;
  let value: string;
  switch (result.data.intent) {
    case "change-font":
      setCookie = await setFont(result.data.font);
      value = result.data.font;
      break;
    case "change-mode":
      setCookie = await setMode(result.data.mode);
      value = result.data.mode;
      break;
    default:
      throw new Error("Not implemented");
  }

  return json(value, {
    headers: { "set-cookie": setCookie },
  });
}

export default function App() {
  const { font } = useFont();
  const { mode } = useMode();

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
        data-mode={mode}
        data-font={font}
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
