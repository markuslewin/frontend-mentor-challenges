import { useAppContext } from "../App";
import Editor from "../components/editor";

export default function DocumentIndexRoute() {
  const { doc, content, handleContentChange } = useAppContext();

  return <Editor doc={doc} content={content} onChange={handleContentChange} />;
}
