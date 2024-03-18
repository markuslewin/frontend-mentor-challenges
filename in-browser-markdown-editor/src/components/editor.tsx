import { micromark } from "micromark";
import { forwardRef, useMemo, useState } from "react";
import Icon from "./icon";

const Editor = forwardRef<HTMLTextAreaElement, { initialContent: string }>(
  ({ initialContent }, ref) => {
    const [content, setContent] = useState(initialContent);
    const markdown = useMemo(() => {
      return micromark(content);
    }, [content]);

    return (
      <div className="grid tablet:grid-cols-2 grid-rows-[max-content_1fr]">
        <div className="bg-editor-header text-editor-header-foreground grid grid-cols-[1fr_max-content] items-center text-heading-s uppercase py-3 px-4">
          <h3>Markdown</h3>
          <button className="tablet:hidden hocus:text-editor-header-preview-hover transition-colors">
            <Icon className="size-4" name="icon-show-preview" />
            <span className="sr-only">Show preview</span>
          </button>
        </div>
        <label className="col-start-1 grid">
          <span className="sr-only">Markdown</span>
          <textarea
            className="bg-content text-content-foreground text-markdown-code font-roboto-mono p-4 tablet:pt-2 resize-none"
            ref={ref}
            name="markdown"
            value={content}
            onChange={(ev) => {
              setContent(ev.target.value);
            }}
          />
        </label>
        <div className="bg-editor-header text-editor-header-foreground hidden tablet:grid col-start-2 row-start-1 grid-cols-[1fr_max-content] items-center text-heading-s uppercase py-3 px-4">
          <h3>Preview</h3>
          <button className="hocus:text-editor-header-preview-hover transition-colors">
            {/* todo: https://www.radix-ui.com/primitives/docs/components/toggle ? */}
            <Icon className="size-4" name="icon-show-preview" />
            <span className="sr-only">Show preview</span>
          </button>
        </div>
        <div
          className="preview hidden tablet:block w-full max-w-[45rem] mx-auto"
          dangerouslySetInnerHTML={{
            __html: markdown,
          }}
        />
      </div>
    );
  }
);

export default Editor;
