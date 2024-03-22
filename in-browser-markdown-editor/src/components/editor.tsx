import Icon from "./icon";
import { Link } from "react-router-dom";
import { Doc, Template, isDoc } from "../utils/documents";
import Preview from "./preview";

export default function Editor({
  doc,
  content,
  onChange,
}: {
  doc: Doc | Template;
  content: string;
  onChange(content: string): void;
}) {
  return (
    <div className="grid tablet:grid-cols-2 grid-rows-[max-content_1fr]">
      <div className="bg-editor-header text-editor-header-foreground grid grid-cols-[1fr_max-content] items-center text-heading-s uppercase py-3 px-4">
        <h3>Markdown</h3>
        <Link
          to={isDoc(doc) ? `/${doc.id}/preview` : "/preview"}
          className="tablet:hidden hocus:text-editor-header-preview-hover transition-colors clickable"
        >
          <Icon className="size-4" name="icon-show-preview" />
          <span className="sr-only">Document preview</span>
        </Link>
      </div>
      <label className="col-start-1 grid">
        <span className="sr-only">Markdown</span>
        <textarea
          className="bg-content text-content-foreground text-markdown-code font-roboto-mono p-4 tablet:pt-2 resize-none"
          name="markdown"
          value={content}
          onChange={(ev) => {
            onChange(ev.target.value);
          }}
        />
      </label>
      <div className="bg-editor-header text-editor-header-foreground hidden tablet:grid col-start-2 row-start-1 grid-cols-[1fr_max-content] items-center text-heading-s uppercase py-3 px-4 border-l-[1px] border-editor-separator">
        <h3>Preview</h3>
        <Link
          to={isDoc(doc) ? `/${doc.id}/preview` : "/preview"}
          className="hocus:text-editor-header-preview-hover transition-colors clickable"
        >
          <Icon className="size-4" name="icon-show-preview" />
          <span className="sr-only">Document preview</span>
        </Link>
      </div>
      <div className="hidden tablet:block border-l-[1px] border-editor-separator">
        <Preview content={content} />
      </div>
    </div>
  );
}
