import { invariantResponse } from "@epic-web/invariant";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  useLoaderData,
  useNavigation,
  useOutletContext,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import { z } from "zod";
import { Title, WordDefinition } from "~/components/WordDefinition";
import { OutletContext as RootOutletContext } from "../root";

export const meta: MetaFunction = ({ data }) => {
  const result = z
    .object({
      type: z.literal("definition"),
      definition: z.object({
        word: z.string(),
      }),
    })
    .safeParse(data);

  return result.success
    ? [
        {
          title: `Frontend Mentor | Dictionary web app | ${result.data.definition.word}`,
        },
        {
          name: "description",
          content: `Read definitions for the word "${result.data.definition.word}"`,
        },
      ]
    : [
        { title: "Frontend Mentor | Dictionary web app" },
        { name: "description", content: "A dictionary web app" },
      ];
};

// We don't know a lot
const DefinitionsSchema = z.array(
  z
    .object({
      word: z.string(),
      phonetic: z.string(),
      phonetics: z.array(
        z.object({ text: z.string(), audio: z.string() }).partial(),
      ),
      meanings: z.array(
        z
          .object({
            partOfSpeech: z.string(),
            definitions: z.array(
              z
                .object({
                  definition: z.string(),
                  synonyms: z.array(z.string()),
                  antonyms: z.array(z.string()),
                  example: z.string(),
                })
                .partial(),
            ),
            synonyms: z.array(z.string()),
            antonyms: z.array(z.string()),
          })
          .partial(),
      ),
      sourceUrls: z.array(z.string()),
    })
    .partial(),
);

const DefinitionsErrorSchema = z.object({
  title: z.string(),
  message: z.string(),
  resolution: z.string(),
});

export async function loader({ params }: LoaderFunctionArgs) {
  const { word } = params;
  invariantResponse(word, "Invalid word");

  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
  );
  if (!response.ok) {
    const json = await response.json().catch(() => {
      throw new Response("Failed to parse error", { status: 500 });
    });

    const result = DefinitionsErrorSchema.safeParse(json);
    invariantResponse(result.success, "Unexpected response error", {
      status: 500,
    });

    const { message, resolution, title } = result.data;

    return {
      type: "error",
      title: title,
      message: message,
      resolution: resolution,
    } as const;
  }

  const json = await response.json().catch(() => {
    throw new Response("Failed to parse response", { status: 500 });
  });

  const result = DefinitionsSchema.safeParse(json);
  invariantResponse(result.success, "Unexpected shape of response", {
    status: 500,
  });
  const definition = result.data[0];
  if (!definition) {
    // Copied from the API
    return {
      type: "error",
      title: "No Definitions Found",
      message:
        "Sorry pal, we couldn't find definitions for the word you were looking for.",
      resolution:
        "You can try the search again at later time or head to the web instead.",
    } as const;
  }

  const rootPhonetic = { text: definition.phonetic };
  const audioPhonetic = definition.phonetics?.find((p) => p.audio);
  const firstSubPhonetic = definition.phonetics?.at(0);
  // Prioritize phonetics with audio
  const phonetic = audioPhonetic ?? rootPhonetic ?? firstSubPhonetic;

  return {
    type: "definition",
    definition: { ...definition, phonetic },
  } as const;
}

export default function Word() {
  const data = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const { isInitialLoad, headerRef, resetSearchForm } =
    useOutletContext<RootOutletContext>();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const $title = titleRef.current;
    const $header = headerRef.current;

    if (
      !$title ||
      !$header ||
      navigation.state !== "idle" ||
      isInitialLoad ||
      $header.contains(document.activeElement)
    ) {
      return;
    }

    $title.focus();
    resetSearchForm();
  }, [headerRef, isInitialLoad, navigation.state, resetSearchForm]);

  switch (data.type) {
    case "definition":
      return (
        <WordDefinition definition={data.definition}>
          <Title ref={titleRef} tabIndex={-1}>
            {data.definition.word}
          </Title>
        </WordDefinition>
      );
    case "error":
      return (
        <div className="text-center">
          <h2
            className="mt-32 text-[1.25rem] font-bold leading-[1.5rem]"
            ref={titleRef}
            tabIndex={-1}
          >
            <span className="mb-11 block text-[4rem] leading-none">😕</span>
            {data.title}
          </h2>
          <p className="mt-6 text-757575">
            {data.message} {data.resolution}
          </p>
        </div>
      );
    default:
      throw new Error("Unexpected data type");
  }
}
