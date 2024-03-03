import {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import {
  Form,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useActionData,
  useFetcher,
} from "@remix-run/react";
import tailwind from "~/tailwind.css?url";
import { Icon, href as iconsHref } from "~/components/ui/icon";
import { getFont, setFont } from "./utils/font.server";
import { FontFormSchema, useFont } from "./utils/font";
import { z } from "zod";
import { ModeFormSchema, useMode } from "./utils/mode";
import { getMode, setMode } from "./utils/mode.server";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { parseWithZod } from "@conform-to/zod";
import { RefObject, useEffect, useRef, useState } from "react";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { ClientHintCheck, getHints } from "./utils/client-hints";

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
    requestInfo: {
      hints: getHints(request),
    },
  };
}

const SearchFormSchema = z.object({
  intent: z.literal("search-word"),
  word: z.string({ required_error: "Whoops, can’t be empty…" }),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: z.discriminatedUnion("intent", [
      FontFormSchema,
      ModeFormSchema,
      SearchFormSchema,
    ]),
  });
  if (submission.status !== "success") {
    return submission.reply();
  }

  switch (submission.value.intent) {
    case "change-font": {
      const { font } = submission.value;
      return json(null, {
        headers: { "set-cookie": await setFont(font) },
      });
    }
    case "change-mode": {
      const { mode } = submission.value;
      return json(null, {
        headers: { "set-cookie": await setMode(mode) },
      });
    }
    case "search-word": {
      const { word } = submission.value;
      return redirect(`/${word}`);
    }
    default:
      throw new Error("Not implemented");
  }
}

export default function App() {
  const fontFetcher = useFetcher({ key: "font" });
  const modeFetcher = useFetcher({ key: "mode" });
  const { font } = useFont();
  const { mode } = useMode();
  const isInitialLoadRef = useRef(true);
  const lastResult = useActionData<typeof action>();
  const [formId, setFormId] = useState(0);
  const [form, fields] = useForm({
    id: `search-form-${formId}`,
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: SearchFormSchema });
    },
  });
  const headerRef = useRef<HTMLElement>(null);
  const resetSearchFormRef = useRef(function resetSearchForm() {
    setFormId((formId) => formId + 1);
  });

  const nextMode = mode === "dark" ? "light" : "dark";

  useEffect(() => {
    isInitialLoadRef.current = false;
  }, []);

  return (
    <html lang="en">
      <head>
        <ClientHintCheck nonce="" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="./assets/images/favicon-32x32.png"
        />
        <Meta />
        <Links />
      </head>
      <body
        className="bg-background font-base text-[0.9375rem] leading-[1.5rem] text-foreground tablet:text-body-m"
        data-mode={mode}
        data-font={font}
      >
        <div className="min-h-screen pb-20 pt-6 tablet:pb-28 tablet:pt-[3.625rem] desktop:pb-32">
          <header ref={headerRef}>
            <div className="flex flex-wrap justify-between gap-4 px-6 center-column tablet:px-10">
              <div>
                <Icon
                  className="size-[2.125rem] text-757575 tablet:size-[2.375rem]"
                  name="logo"
                />
                <p className="sr-only">Dictionary Web App</p>
              </div>
              <div className="flex flex-wrap gap-4 tablet:gap-[1.625rem]">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger className="flex items-center gap-4 text-[0.875rem] font-bold leading-6 tablet:text-[1.125rem]">
                    <span className="sr-only">Font: </span>
                    {{ sans: "Sans Serif", serif: "Serif", mono: "Mono" }[font]}
                    <Icon
                      className="size-[0.875rem] text-A445ED"
                      name="icon-arrow-down"
                    />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="min-w-[11.4375rem] rounded-2xl bg-menu py-2 shadow shadow-menu-shadow"
                      sideOffset={18}
                      align="end"
                    >
                      <DropdownMenu.RadioGroup
                        value={font}
                        onValueChange={(font) => {
                          fontFetcher.submit(
                            { intent: "change-font", font },
                            { method: "post" },
                          );
                        }}
                      >
                        {[
                          { value: "sans", text: "Sans Serif" },
                          { value: "serif", text: "Serif" },
                          { value: "mono", text: "Mono" },
                        ].map((option) => {
                          return (
                            <DropdownMenu.RadioItem
                              className="select-none px-6 py-2 hover:outline-none data-[font=mono]:font-mono data-[font=sans]:font-sans data-[font=serif]:font-serif data-[highlighted]:text-A445ED"
                              key={option.value}
                              value={option.value}
                              data-font={option.value}
                            >
                              {option.text}
                            </DropdownMenu.RadioItem>
                          );
                        })}
                      </DropdownMenu.RadioGroup>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
                <div className="border-l-[1px]"></div>
                <modeFetcher.Form
                  className="flex items-center gap-3 text-757575 tablet:gap-5 dark:text-A445ED"
                  method="post"
                >
                  <input type="hidden" name="mode" value={nextMode} />
                  <button
                    className="h-5 w-10 rounded-full border-[1px] bg-757575 before:block before:h-[0.875rem] before:w-[0.875rem] before:translate-x-[0.125rem] before:rounded-full before:border-t-[0.875rem] before:text-FFFFFF before:transition-all dark:bg-A445ED dark:before:translate-x-[1.375rem]"
                    type="submit"
                    name="intent"
                    value="change-mode"
                  >
                    <span className="sr-only">Switch to {nextMode} mode</span>
                  </button>
                  <div>
                    <Icon
                      className="size-[1.375rem] text-757575 dark:text-A445ED"
                      name="icon-moon"
                    />
                    <p className="sr-only" aria-live="polite">
                      {mode} mode active
                    </p>
                  </div>
                </modeFetcher.Form>
              </div>
            </div>
          </header>
          <main className="mt-6 tablet:mt-[3.25rem]">
            <div className="px-6 center-column tablet:px-10">
              <h1 className="sr-only">Dictionary Web App</h1>
              <Form
                className="group"
                method="post"
                {...getFormProps(form)}
                data-error={!!fields.word.errors?.length}
              >
                <input type="hidden" name="intent" value="search-word" />
                <label className="sr-only" htmlFor={fields.word.id}>
                  Search for a word
                </label>
                <div className="grid grid-cols-[1fr_max-content]">
                  <input
                    className="col-span-full row-start-1 h-12 rounded-2xl border-[1px] border-transparent bg-field px-6 pr-14 text-[1rem] font-bold leading-[1.1875rem] transition-[border-color] placeholder:text-field-placeholder group-data-[error=true]:border-FF5252 hocus:border-A445ED tablet:h-16 tablet:text-[1.25rem] tablet:leading-[1.5rem]"
                    placeholder="Search for any word…"
                    {...getInputProps(fields.word, { type: "text" })}
                  />
                  <button
                    className="col-start-2 row-start-1 px-6"
                    type="submit"
                  >
                    <Icon
                      className="size-[1.125rem] text-A445ED"
                      name="icon-search"
                    />
                    <span className="sr-only">Search</span>
                  </button>
                </div>
                <p
                  className="mt-2 text-heading-s group-data-[error=true]:text-FF5252"
                  id={fields.word.errorId}
                >
                  {fields.word.errors}
                </p>
              </Form>
              <Outlet
                context={
                  {
                    isInitialLoad: isInitialLoadRef.current,
                    headerRef,
                    resetSearchForm: resetSearchFormRef.current,
                  } satisfies OutletContext
                }
              />
            </div>
          </main>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export type OutletContext = {
  isInitialLoad: boolean;
  headerRef: RefObject<HTMLElement>;
  resetSearchForm(): void;
};
