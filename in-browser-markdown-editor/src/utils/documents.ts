import { z } from "zod";
import data from "../data/data.json";
import { createId } from "@paralleldrive/cuid2";

const documentsKey = "documents";

export const DocSchema = z.object({
  // todo: Not optional
  createdAt: z.string().optional(),
  id: z.string(),
  name: z.string(),
  content: z.string(),
});

const DocsSchema = z.array(DocSchema);

export type Doc = z.infer<typeof DocSchema>;
export type Docs = z.infer<typeof DocsSchema>;
export type Template = Omit<Doc, "id">;

export function isDoc(doc: Doc | Template): doc is Doc {
  return "id" in doc;
}

const [_new, welcome] = data;

export const templates = {
  new: _new,
  welcome,
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

export function saveDocument(updates: Doc | Template) {
  const id = isDoc(updates) ? updates.id : createId();
  const doc = {
    ...updates,
    id,
  };

  const docs = getDocuments();
  const exists = docs.some((d) => {
    return d.id === id;
  });

  const nextDocs = exists
    ? docs.map((d) => {
        return d.id === doc.id ? { ...d, ...doc } : d;
      })
    : [...docs, doc];

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
