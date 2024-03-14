import { z } from "zod";
import data from "../data/data.json";

const documentsKey = "documents";

export const DocSchema = z.object({
  // todo: Not optional
  createdAt: z.string().optional(),
  name: z.string(),
  content: z.string(),
});

const DocsSchema = z.array(DocSchema);

export type Doc = z.infer<typeof DocSchema>;

export type Docs = z.infer<typeof DocsSchema>;

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

export function saveDocument(newDoc: z.infer<typeof DocSchema>) {
  const docs = getDocuments();
  // todo: Compare IDs
  const oldDoc = docs.find(
    (doc) => doc.name.toLowerCase() === newDoc.name.toLowerCase()
  );
  const nextDocs = oldDoc
    ? docs.map((doc) => {
        return doc.name.toLowerCase() === newDoc.name.toLowerCase()
          ? { ...doc, ...newDoc }
          : doc;
      })
    : [...docs, newDoc];

  localStorage.setItem(documentsKey, JSON.stringify(nextDocs));
  return newDoc;
}
