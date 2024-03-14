import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import App from "../App";
import documents from "../data/data.json";
import { invariant } from "@epic-web/invariant";

export async function loader({ params }: LoaderFunctionArgs) {
  const { document } = params;

  if (document === undefined) {
    return { doc: documents[1] };
  }

  const doc = documents.find(
    (d) => d.name.toLowerCase() === document.toLowerCase()
  );
  invariant(doc, "Document not found");

  return { doc };
}

export default function DocumentRoute() {
  const { doc } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return <App doc={doc} />;
}
