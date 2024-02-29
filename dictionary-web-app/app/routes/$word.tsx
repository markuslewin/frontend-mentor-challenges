import { invariantResponse } from "@epic-web/invariant";
import { LoaderFunctionArgs } from "@remix-run/node";
import {
  useLoaderData,
  useNavigation,
  useOutletContext,
} from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Title, WordDefinition } from "~/components/WordDefinition";
import { MainLayout } from "../components/MainLayout";
import { OutletContext as RootOutletContext } from "../root";

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
  const { isInitialLoad } = useOutletContext<RootOutletContext>();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const searchFormRef = useRef<HTMLFormElement>(null);
  const [id, setFormId] = useState(0);
  const formId = `search-form-${id}`;

  useEffect(() => {
    const $title = titleRef.current;
    const $searchForm = searchFormRef.current;

    if (
      navigation.state !== "idle" ||
      !$title ||
      !$searchForm ||
      isInitialLoad
    ) {
      return;
    }

    $title.focus();
    // Reset Conform form
    setFormId((id) => id + 1);
  }, [isInitialLoad, navigation.state]);

  switch (data.type) {
    case "definition":
      return (
        <MainLayout searchFormRef={searchFormRef} formId={formId}>
          <WordDefinition definition={data.definition}>
            <Title ref={titleRef} tabIndex={-1}>
              {data.definition.word}
            </Title>
          </WordDefinition>
        </MainLayout>
      );
    case "error":
      return (
        <MainLayout searchFormRef={searchFormRef} formId={formId}>
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
        </MainLayout>
      );
    default:
      throw new Error("Unexpected data type");
  }
}