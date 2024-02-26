import { invariant } from "@epic-web/invariant";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export function loader({ params }: LoaderFunctionArgs) {
  const { word } = params;
  invariant(word, "Invalid word");
  return { word };
}

export default function Word() {
  const { word } = useLoaderData<typeof loader>();
  return (
    <>
      <h1>
        todo: Fetch data for <code>{word}</code>
      </h1>
    </>
  );
}
