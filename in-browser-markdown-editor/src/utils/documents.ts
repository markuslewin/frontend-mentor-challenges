import { z } from "zod";
import data from "../data/data.json";
import { createId } from "@paralleldrive/cuid2";
import { invariant } from "@epic-web/invariant";

const documentsKey = "documents";

export const DocSchema = z.object({
  id: z.string(),
  name: z.string(),
  content: z.string(),
  createdAt: z.number(),
});

const DocsSchema = z.array(DocSchema);

export type Doc = z.infer<typeof DocSchema>;
export type Docs = z.infer<typeof DocsSchema>;
export type Template = Omit<Doc, "id" | "createdAt">;

export function isDoc(doc: Doc | Template): doc is Doc {
  return "id" in doc && "createdAt" in doc;
}

const [_new, welcome] = data;

export const templates = {
  new: {
    name: _new.name,
    content: _new.content,
  },
  welcome: {
    name: welcome.name,
    content: welcome.content,
  },
};

export function getDocuments() {
  const rawDocs = localStorage.getItem(documentsKey);
  if (!rawDocs) {
    return [];
  }

  const result = DocsSchema.safeParse(JSON.parse(rawDocs));
  return result.success ? result.data : [];
}

function setDocuments(docs: Docs) {
  localStorage.setItem(documentsKey, JSON.stringify(docs));
}

export function createDocument({
  content,
  name,
}: Omit<Doc, "id" | "createdAt">) {
  const doc = {
    id: createId(),
    name,
    content,
    createdAt: Date.now(),
  };
  const docs = getDocuments();
  setDocuments([...docs, doc]);
  return doc;
}

export function updateDocument({
  id,
  content,
  name,
}: Partial<Omit<Doc, "createdAt">> & {
  id: Doc["id"];
}) {
  const docs = getDocuments();
  const old = docs.find((d) => {
    return d.id === id;
  });
  invariant(old, "Document not found");
  const doc = {
    ...old,
    ...(content === undefined ? {} : { content }),
    ...(name === undefined ? {} : { name }),
  };
  const nextDocs = docs.map((d) => {
    return d.id === doc.id ? doc : d;
  });
  setDocuments(nextDocs);
  return doc;
}

export function deleteDocument(id: Doc["id"]) {
  const docs = getDocuments();
  const nextDocs = docs.filter((d) => {
    return d.id !== id;
  });

  setDocuments(nextDocs);
}
