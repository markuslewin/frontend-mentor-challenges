import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Title, WordDefinition } from "../components/WordDefinition";
import keyboardDefinitions from "~/data/keyboard.json";

export const meta: MetaFunction = () => {
  return [
    { title: "Frontend Mentor | Dictionary web app" },
    { name: "description", content: "A dictionary web app" },
  ];
};

export async function loader() {
  const definition = keyboardDefinitions[0];
  return {
    definition: {
      word: definition.word,
      phonetic: definition.phonetics[2],
      meanings: definition.meanings.map((meaning) => {
        return {
          partOfSpeech: meaning.partOfSpeech,
          definitions: meaning.definitions.map((definition) => {
            return {
              definition: definition.definition,
              example: (definition as { example: string | undefined }).example,
            };
          }),
          synonyms: meaning.synonyms as string[],
          antonyms: meaning.antonyms as string[],
        };
      }),
      sourceUrls: definition.sourceUrls,
    },
  };
}

export default function Index() {
  const { definition } = useLoaderData<typeof loader>();

  return (
    <WordDefinition definition={definition}>
      <Title>{definition.word}</Title>
    </WordDefinition>
  );
}
