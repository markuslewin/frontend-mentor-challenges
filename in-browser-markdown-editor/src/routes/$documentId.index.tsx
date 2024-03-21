import { useDoc } from "../App";
import Editor from "../components/editor";
import { isDoc } from "../utils/documents";

export default function DocumentIndexRoute() {
  const { doc, contentRef } = useDoc();

  return <Editor key={isDoc(doc) ? doc.id : null} ref={contentRef} doc={doc} />;
}
