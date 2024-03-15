import { micromark } from "micromark";
import { forwardRef, useMemo, useState } from "react";

const Editor = forwardRef<HTMLTextAreaElement, { initialContent: string }>(
  ({ initialContent }, ref) => {
    const [content, setContent] = useState(initialContent);
    const markdown = useMemo(() => {
      return micromark(content);
    }, [content]);

    return (
      <>
        <div>
          <h3>Markdown</h3>
          <button>
            <img alt="Show preview" src="/assets/icon-show-preview.svg" />
          </button>
        </div>
        <label>
          <span>Markdown</span>
          <textarea
            ref={ref}
            name="markdown"
            value={content}
            onChange={(ev) => {
              setContent(ev.target.value);
            }}
          />
        </label>
        <div>
          <h3>Preview</h3>
          <button>
            <img alt="Show preview" src="/assets/icon-show-preview.svg" />
          </button>
          <button>
            <img alt="Hide preview" src="/assets/icon-hide-preview.svg" />
          </button>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: markdown,
          }}
        />
      </>
    );
  }
);

export default Editor;
