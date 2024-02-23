import type { MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Fragment, useId } from "react";

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
        <img alt="Dictionary Web App" src="/assets/images/logo.svg" />
        {/* todo: role="menu" */}
        {/* todo: useFetcher */}
        <img alt="" src="/assets/images/icon-arrow-down.svg" />
        {/* todo: useFetcher */}
        <Form>
          <button type="submit" name="theme" value="light">
            Switch to light mode
          </button>
          <img alt="Dark mode active" src="/assets/images/icon-moon.svg" />
        </Form>
      </header>
      <main>
        <h1>Dictionary Web App</h1>
        <Form>
          <label htmlFor={inputWordId}>Search for a word</label>
          <input type="text" name="word" id={inputWordId} />
          <img alt="" src="/assets/images/icon-search.svg" />
          <button type="submit">Search</button>
        </Form>
        <article>
          <h2>{definition.word}</h2>
          <p>{definition.phonetic?.text}</p>
          {/* todo: <audio />? */}
          <img alt="Play phonetic" src="/assets/images/icon-play.svg" />
          {definition.meanings.map((meaning, i) => {
            return (
              <Fragment key={i}>
                <h3>{meaning.partOfSpeech}</h3>
                <h4>Meaning</h4>
                {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
                <ul role="list">
                  {meaning.definitions.map((definition, i) => {
                    return (
                      <li key={i}>
                        <p>{definition.definition}</p>
                        {definition.example ? (
                          <p>
                            Example: <q>{definition.example}</q>
                          </p>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
                {meaning.synonyms.length ? (
                  <>
                    <h4>Synonyms</h4>
                    {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
                    <ul role="list">
                      {meaning.synonyms.map((synonym, i) => {
                        return <li key={i}>{synonym}</li>;
                      })}
                    </ul>
                  </>
                ) : null}
              </Fragment>
            );
          })}
          <footer>
            <h3>Source</h3>
            {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
            <ul role="list">
              {definition.sourceUrls.map((sourceUrl, i) => {
                return (
                  <li key={i}>
                    <a href={sourceUrl}>{sourceUrl}</a>
                  </li>
                );
              })}
            </ul>
          </footer>
        </article>
      </main>
    </>
  );
}
