import { micromark } from "micromark";
import { forwardRef, useMemo, useState } from "react";

const Editor = forwardRef<HTMLTextAreaElement, { initialContent: string }>(
  ({ initialContent }, ref) => {
    const [content, setContent] = useState(initialContent);
    const markdown = useMemo(() => {
      return micromark(content);
    }, [content]);

    return (
      <div className="grid tablet:grid-cols-2 grid-rows-[max-content_1fr]">
        <div className="grid grid-cols-[1fr_max-content] items-center">
          <h3>Markdown</h3>
          <button className="tablet:hidden">
            <img alt="Show preview" src="/assets/icon-show-preview.svg" />
          </button>
        </div>
        <label className="col-start-1 grid">
          <span className="sr-only">Markdown</span>
          <textarea
            className="resize-none"
            ref={ref}
            name="markdown"
            value={content}
            onChange={(ev) => {
              setContent(ev.target.value);
            }}
          />
        </label>
        <div className="hidden tablet:grid col-start-2 row-start-1 grid-cols-[1fr_max-content] items-center">
          <h3>Preview</h3>
          <button>
            <img alt="Show preview" src="/assets/icon-show-preview.svg" />
          </button>
          <button className="hidden">
            <img alt="Hide preview" src="/assets/icon-hide-preview.svg" />
          </button>
        </div>
        <div
          className="hidden tablet:block"
          dangerouslySetInnerHTML={{
            __html: markdown,
          }}
        />
      </div>
    );
  }
);

export default Editor;
