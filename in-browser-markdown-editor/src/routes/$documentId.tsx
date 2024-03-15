import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router-dom";
import App from "../App";
import { invariant } from "@epic-web/invariant";
import { getDocuments, saveDocument, templates } from "../utils/documents";
import { z } from "zod";

export async function loader({ params }: LoaderFunctionArgs) {
  const { documentId } = params;

  const docs = getDocuments();

  if (documentId === undefined) {
    if (docs.length) {
      return redirect(`/${docs[0].id}`);
    }
    return { docs, doc: templates.welcome };
  }

  const doc = docs.find((d) => {
    return d.id === documentId;
  });
  invariant(doc, "Document not found");

  return { docs, doc };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  switch (intent) {
    case "save-document": {
      const updates = z
        .object({
          id: z.string().optional(),
          name: z.string(),
          content: z.string(),
        })
        .parse(Object.fromEntries(formData));
      const doc = saveDocument(updates);
      return redirect(`/${doc.id}`);
    }
  }
}

export default function DocumentRoute() {
  const { docs, doc } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  > extends infer MaybeData
    ? MaybeData extends Response
      ? never
      : MaybeData
    : never;

  return <App docs={docs} doc={doc} />;
}
