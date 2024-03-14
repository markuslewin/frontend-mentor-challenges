import { useMemo, useState } from "react";
import documents from "./data/data.json";
import { micromark } from "micromark";

function App() {
  const [content, setContent] = useState(documents[1].content);
  const markdown = useMemo(() => {
    return micromark(content);
  }, [content]);

  return (
    <>
      <header>
        <div>
          <h1>
            <img alt="Markdown" src="/assets/logo.svg" />
          </h1>
          <button>
            <img alt="Open menu" src="/assets/icon-menu.svg" />
            <img alt="Close menu" src="/assets/icon-close.svg" />
          </button>
          {/* https://www.radix-ui.com/primitives/docs/components/dialog */}
          <div>
            <h2>My documents</h2>
            <button>
              <span aria-hidden="true">+ </span>New document
            </button>
            <ul>
              {documents
                .map((document, i) => {
                  return { ...document, id: i };
                })
                .map((document) => {
                  // todo: Parse and format dates from `document.createdAt`
                  const dateTime = "2022-01-04";
                  const text = "01 April 2022";
                  return (
                    <li key={document.id}>
                      <img alt="" src="/assets/icon-document.svg" />
                      <a href="#">{document.name}</a>
                      <p>
                        <time dateTime={dateTime}>{text}</time>
                      </p>
                    </li>
                  );
                })}
            </ul>
            <h2>Switch mode</h2>
            <form>
              <button type="submit">
                <img alt="" src="/assets/icon-dark-mode.svg" />
                <span>Switch to dark mode</span>
                <img alt="" src="/assets/icon-light-mode.svg" />
              </button>
              <p>
                <output>
                  <span>Light mode is now active</span>
                </output>
              </p>
            </form>
          </div>
        </div>
        <div>
          <h2>Options</h2>
          <label>
            <img alt="" src="/assets/icon-document.svg" />
            <div>
              <span>Document name</span>
              <input
                name="document-name"
                defaultValue="welcome-to-markdown.md"
              />
            </div>
          </label>
        </div>
        <div>
          <ul>
            <li>
              <button>
                <img alt="Delete document" src="/assets/icon-delete.svg" />
              </button>
              {/* https://www.radix-ui.com/primitives/docs/components/alert-dialog */}
              <div>
                <h2>Delete this document?</h2>
                <p>
                  Are you sure you want to delete the ‘welcome.md’ document and
                  its contents? This action cannot be reversed.
                </p>
                <button>Confirm & delete</button>
              </div>
            </li>
            <li>
              <button>
                <img alt="" src="/assets/icon-save.svg" />
                <span>Save changes</span>
              </button>
            </li>
          </ul>
        </div>
      </header>
      <main>
        <h2>Document</h2>
        <div>
          <h3>Markdown</h3>
          <button>
            <img alt="Show preview" src="/assets/icon-show-preview.svg" />
          </button>
        </div>
        <label>
          <span>Markdown</span>
          <textarea
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
      </main>
    </>
  );
}

export default App;
