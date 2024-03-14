import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router-dom";
import App from "../App";
import { invariant } from "@epic-web/invariant";
import {
  DocSchema,
  getDocuments,
  saveDocument,
  templates,
} from "../utils/documents";

export async function loader({ params }: LoaderFunctionArgs) {
  const { document: name } = params;

  const docs = getDocuments();

  if (name === undefined) {
    return { docs, doc: docs.length ? docs[0] : templates.welcome };
  }

  const doc = docs.find((d) => d.name.toLowerCase() === name.toLowerCase());
  invariant(doc, "Document not found");

  return { docs, doc };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  switch (intent) {
    case "save-document": {
      const doc = DocSchema.parse(Object.fromEntries(formData));
      const newDoc = saveDocument(doc);
      return redirect(`/${newDoc.name}`);
    }
  }
}

export default function DocumentRoute() {
  const { docs, doc } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return <App docs={docs} doc={doc} />;
}
