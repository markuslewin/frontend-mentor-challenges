import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Fragment } from "react";

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

  return (
    <>
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
    </>
  );
}
