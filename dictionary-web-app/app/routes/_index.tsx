import type { MetaFunction } from "@remix-run/node";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import { Fragment, useId } from "react";
import { Icon } from "../components/ui/icon";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useFont } from "../utils/font";
import { useMode } from "../utils/mode";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const response = (await import("~/data/keyboard.json")).default;
  const definition = response[0];
  // Prioritize phonetics with audio
  const phonetic = definition.phonetics.some((p) => p.audio)
    ? definition.phonetics.find((p) => p.audio)
    : definition.phonetics[0];
  return {
    definition: {
      word: definition.word,
      phonetic: phonetic
        ? {
            text: phonetic.text,
            audio: phonetic.audio,
          }
        : null,
      meanings: definition.meanings.map((meaning) => {
        return {
          partOfSpeech: meaning.partOfSpeech,
          definitions: meaning.definitions.map((definition) => {
            return {
              definition: definition.definition,
              synonyms: definition.synonyms,
              antonyms: definition.antonyms,
              example: (definition as { example: string | undefined }).example,
            };
          }),
          synonyms: meaning.synonyms,
          antonyms: meaning.antonyms,
        };
      }),
      sourceUrls: definition.sourceUrls,
    },
  };
}

export default function Index() {
  const { definition } = useLoaderData<typeof loader>();
  const fontFetcher = useFetcher({ key: "font" });
  const modeFetcher = useFetcher({ key: "mode" });
  const inputWordId = useId();
  const { font } = useFont();
  const { mode } = useMode();

  const nextMode = mode === "dark" ? "light" : "dark";

  return (
    <>
      <header>
        <div className="flex flex-wrap justify-between gap-4 px-6 center-column tablet:px-10">
          <div>
            <Icon
              className="h-8 w-7 text-757575 tablet:h-9 tablet:w-8"
              name="logo"
            />
            <p className="sr-only">Dictionary Web App</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="flex items-center gap-4 text-[0.875rem] font-bold leading-6 tablet:text-[1.125rem]">
                <span className="sr-only">Font: </span>
                {{ sans: "Sans Serif", serif: "Serif", mono: "Mono" }[font]}
                <img
                  className="text-A445ED"
                  alt=""
                  src="/assets/images/icon-arrow-down.svg"
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="min-w-[11.4375rem] rounded-2xl bg-menu py-2 shadow shadow-menu-shadow"
                  sideOffset={18}
                  align="end"
                >
                  <DropdownMenu.RadioGroup
                    value="serif"
                    onValueChange={(font) => {
                      fontFetcher.submit(
                        { intent: "change-font", font },
                        { action: "/", method: "post" },
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
              action="/"
              method="post"
            >
              <input type="hidden" name="mode" value={nextMode} />
              <button
                className="before:text-FFFFFF h-5 w-10 rounded-full border-[1px] bg-757575 before:block before:h-[0.875rem] before:w-[0.875rem] before:translate-x-[0.125rem] before:rounded-full before:border-t-[0.875rem] before:transition-all dark:bg-A445ED dark:before:translate-x-[1.375rem]"
                type="submit"
                name="intent"
                value="change-mode"
              >
                <span className="sr-only">Switch to {nextMode} mode</span>
              </button>
              <div>
                <Icon
                  className="size-5 text-757575 dark:text-A445ED"
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
          <Form>
            <label className="sr-only" htmlFor={inputWordId}>
              Search for a word
            </label>
            <div className="grid grid-cols-[1fr_max-content]">
              <input
                className="border-transparent col-span-full row-start-1 h-12 rounded-2xl border-2 bg-field px-6 pr-14 text-[1rem] font-bold leading-[1.1875rem] tablet:h-16 tablet:text-[1.25rem] tablet:leading-[1.5rem]"
                type="text"
                name="word"
                id={inputWordId}
              />
              <button className="col-start-2 row-start-1 px-6" type="submit">
                <Icon className="size-4 text-A445ED" name="icon-search" />
                <span className="sr-only">Search</span>
              </button>
            </div>
          </Form>
          <article className="mt-6 tablet:mt-11">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-[2rem] leading-[2.4375rem] tablet:text-heading-l">
                  {definition.word}
                </h2>
                <p className="mt-2 text-body-m text-A445ED tablet:text-heading-m">
                  {definition.phonetic?.text}
                </p>
              </div>
              {/* todo: <audio />? */}
              {/* todo: colors */}
              <img alt="Play phonetic" src="/assets/images/icon-play.svg" />
            </div>
            {definition.meanings.map((meaning, i) => {
              return (
                <Fragment key={i}>
                  <h3 className="mt-8 text-[1.125rem] font-bold italic leading-[1.375rem] tablet:mt-10 tablet:text-[1.5rem] tablet:leading-[1.8125rem]">
                    {meaning.partOfSpeech}
                  </h3>
                  <h4 className="mt-8 text-[1rem] leading-[1.1875rem] text-757575 tablet:mt-10 tablet:text-heading-s">
                    Meaning
                  </h4>
                  {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
                  <ul className="mt-4 tablet:mt-6" role="list">
                    {meaning.definitions.map((definition, i) => {
                      return (
                        <li
                          className="mt-3 grid grid-cols-[max-content_1fr] gap-5 before:mt-[0.625rem] before:inline-block before:h-[0.3125rem] before:w-[0.3125rem] before:rounded-full before:border-t-[0.3125rem] before:text-[hsl(274_82%_50%)] first:mt-0"
                          key={i}
                        >
                          <div>
                            <p>{definition.definition}</p>
                            {definition.example ? (
                              <>
                                <hr className="sr-only" />
                                <p className="mt-3">
                                  <span className="sr-only">Example: </span>
                                  <q className="text-757575">
                                    {definition.example}
                                  </q>
                                </p>
                              </>
                            ) : null}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  {meaning.synonyms.length ? (
                    <div className="mt-6 grid grid-cols-[max-content_1fr] items-baseline gap-6 tablet:mt-10 desktop:mt-16">
                      <h4 className="text-[1rem] leading-[1.1875rem] text-757575 tablet:text-heading-s">
                        Synonyms
                      </h4>
                      {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
                      <ul className="flex flex-wrap gap-4" role="list">
                        {meaning.synonyms.map((synonym, i) => {
                          return (
                            <li key={i}>
                              {/* todo: to where? */}
                              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                              <a className="font-bold text-A445ED" href="#">
                                {synonym}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : null}
                </Fragment>
              );
            })}
            <footer className="mt-8 pt-6 text-body-s tablet:mt-10 tablet:grid tablet:grid-cols-[max-content_1fr] tablet:gap-5 tablet:pt-5">
              <h3 className="text-757575 underline">Source</h3>
              {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
              <ul role="list">
                {definition.sourceUrls.map((sourceUrl, i) => {
                  return (
                    <li className="mt-2 tablet:first:mt-0" key={i}>
                      <a
                        className="flex gap-2 underline"
                        href={sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {sourceUrl}
                        <img
                          className="text-757575"
                          alt=""
                          src="/assets/images/icon-new-window.svg"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </footer>
          </article>
        </div>
      </main>
    </>
  );
}
