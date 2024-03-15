import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router-dom";
import App from "../App";
import { invariant } from "@epic-web/invariant";
import {
  createDocument,
  deleteDocument,
  getDocuments,
  templates,
  updateDocument,
} from "../utils/documents";
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
  const payload = Object.fromEntries(formData);

  switch (payload.intent) {
    case "new-document": {
      const doc = createDocument(templates.new);
      return redirect(`/${doc.id}`);
    }
    case "save-document": {
      const data = z
        .union([
          z.object({
            id: z.string(),
            name: z.string().optional(),
            content: z.string().optional(),
          }),
          z.object({
            name: z.string(),
            content: z.string(),
          }),
        ])
        .parse(payload);
      const doc = "id" in data ? updateDocument(data) : createDocument(data);
      return redirect(`/${doc.id}`);
    }
    case "delete-document": {
      const data = z
        .object({
          id: z.string(),
        })
        .parse(payload);
      deleteDocument(data.id);
      return redirect("/");
    }
    default:
      throw new Error("Invalid intent");
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
