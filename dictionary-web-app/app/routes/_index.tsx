import type { MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Fragment, useId } from "react";
import { Icon } from "../components/ui/icon";

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
  const inputWordId = useId();

  return (
    <>
      <header>
        <div className="center-column tablet:px-10 flex flex-wrap justify-between gap-4 px-6">
          <Icon
            className="text-757575 tablet:w-8 tablet:h-9 h-8 w-7"
            alt="Dictionary Web App"
            name="logo"
          />
          <div className="flex flex-wrap items-center gap-4">
            {/* todo: role="menu" */}
            {/* todo: useFetcher */}
            <img
              className="text-A445ED"
              alt=""
              src="/assets/images/icon-arrow-down.svg"
            />
            <div className="h-full border-l-[1px]"></div>
            {/* todo: useFetcher */}
            <Form className="text-757575 dark:text-A445ED">
              <button type="submit" name="mode" value="light">
                <span className="sr-only">Switch to light mode</span>
              </button>
              <img alt="Dark mode active" src="/assets/images/icon-moon.svg" />
            </Form>
          </div>
        </div>
      </header>
      <main className="tablet:mt-[3.25rem] mt-6">
        <div className="center-column tablet:px-10 px-6">
          <h1 className="sr-only">Dictionary Web App</h1>
          <Form>
            <label className="sr-only" htmlFor={inputWordId}>
              Search for a word
            </label>
            <div className="grid grid-cols-[1fr_max-content]">
              <input
                className="bg-field col-span-full row-start-1"
                type="text"
                name="word"
                id={inputWordId}
              />
              <button className="col-start-2 row-start-1" type="submit">
                <img
                  className="text-A445ED"
                  alt="Search"
                  src="/assets/images/icon-search.svg"
                />
              </button>
            </div>
          </Form>
          <article className="tablet:mt-11 mt-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="tablet:text-heading-l text-[2rem] leading-[2.4375rem]">
                  {definition.word}
                </h2>
                <p className="text-body-m tablet:text-heading-m text-A445ED mt-2">
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
                  <h3 className="tablet:mt-10 tablet:text-[1.5rem] tablet:leading-[1.8125rem] mt-8 text-[1.125rem] font-bold italic leading-[1.375rem]">
                    {meaning.partOfSpeech}
                  </h3>
                  <h4 className="tablet:mt-10 text-757575 tablet:text-heading-s mt-8 text-[1rem] leading-[1.1875rem]">
                    Meaning
                  </h4>
                  {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
                  <ul className="tablet:mt-6 mt-4" role="list">
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
                    <div className="tablet:mt-10 desktop:mt-16 mt-6 grid grid-cols-[max-content_1fr] items-baseline gap-6">
                      <h4 className="text-757575 tablet:text-heading-s text-[1rem] leading-[1.1875rem]">
                        Synonyms
                      </h4>
                      {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
                      <ul className="flex flex-wrap gap-4" role="list">
                        {meaning.synonyms.map((synonym, i) => {
                          return (
                            <li key={i}>
                              {/* todo: to where? */}
                              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                              <a className="text-A445ED font-bold" href="#">
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
            <footer className="text-body-s tablet:mt-10 tablet:pt-5 tablet:grid tablet:grid-cols-[max-content_1fr] tablet:gap-5 mt-8 pt-6">
              <h3 className="text-757575 underline">Source</h3>
              {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
              <ul role="list">
                {definition.sourceUrls.map((sourceUrl, i) => {
                  return (
                    <li className="tablet:first:mt-0 mt-2" key={i}>
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
