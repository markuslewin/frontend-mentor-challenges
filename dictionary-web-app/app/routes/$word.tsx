import { invariantResponse } from "@epic-web/invariant";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { z } from "zod";

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

export async function loader({ params }: LoaderFunctionArgs) {
  const { word } = params;
  invariantResponse(word, "Invalid word");

  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`,
  );
  if (response.status === 404) {
    // "Not found" screen
    return null;
  }
  invariantResponse(response.status !== 429, "Too many requests", {
    status: 429,
  });
  invariantResponse(response.ok, "Invalid response", { status: 500 });

  let json;
  try {
    json = await response.json();
  } catch {
    throw new Response("Failed to parse response", { status: 500 });
  }

  const result = DefinitionsSchema.safeParse(json);
  invariantResponse(result.success, "Invalid shape of response", {
    status: 500,
  });
  const definition = result.data[0];
  if (!definition) {
    // "Not found" screen
    return null;
  }

  return { definition };
}

export default function Word() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      {data ? (
        <pre>{JSON.stringify(data.definition, undefined, "\t")}</pre>
      ) : (
        <p>Not found</p>
      )}
    </>
  );
}
