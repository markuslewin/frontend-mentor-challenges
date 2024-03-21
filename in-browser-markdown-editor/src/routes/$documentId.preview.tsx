import { Link } from "react-router-dom";
import { useAppContext } from "../App";
import Preview from "../components/preview";
import { isDoc } from "../utils/documents";
import Icon from "../components/icon";

export default function DocumentPreviewRoute() {
  const { doc, content } = useAppContext();

  return (
    <div className="grid grid-rows-[max-content_1fr]">
      <div className="bg-editor-header text-editor-header-foreground grid grid-cols-[1fr_max-content] items-center text-heading-s uppercase py-3 px-4">
        <h3>Preview</h3>
        <Link
          to={isDoc(doc) ? `/${doc.id}` : "/"}
          className="hocus:text-editor-header-preview-hover transition-colors"
        >
          <Icon className="size-4" name="icon-hide-preview" />
          <span className="sr-only">Document editor</span>
        </Link>
      </div>
      <Preview content={content} />
    </div>
  );
}
