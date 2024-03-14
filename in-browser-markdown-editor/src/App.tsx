import { useMemo, useRef, useState } from "react";
import documents from "./data/data.json";
import { micromark } from "micromark";
import { useMode } from "./utils/mode";
import * as Dialog from "@radix-ui/react-dialog";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

function App() {
  const { mode, selectMode } = useMode();
  const [content, setContent] = useState(documents[1].content);
  const markdown = useMemo(() => {
    return micromark(content);
  }, [content]);
  const headingRef = useRef<HTMLHeadingElement>(null);

  return (
    <>
      <header>
        <div>
          <h1>
            <img alt="Markdown" src="/assets/logo.svg" />
          </h1>
          <Dialog.Root>
            <Dialog.Trigger>
              <img alt="Open menu" src="/assets/icon-menu.svg" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay />
              <Dialog.Content>
                <Dialog.Close>
                  <img alt="Close menu" src="/assets/icon-close.svg" />
                </Dialog.Close>
                <Dialog.Title>Documents and mode</Dialog.Title>
                <Dialog.Description>
                  Browse documents and switch mode.
                </Dialog.Description>
                <h3>My documents</h3>
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
                <h3>Switch mode</h3>
                <form
                  onSubmit={(ev) => {
                    ev.preventDefault();
                    selectMode(mode === "light" ? "dark" : "light");
                  }}
                >
                  <button type="submit">
                    <img alt="" src="/assets/icon-dark-mode.svg" />
                    <span>
                      Switch to {mode === "light" ? "dark" : "light"} mode
                    </span>
                    <img alt="" src="/assets/icon-light-mode.svg" />
                  </button>
                  <p>
                    <output>
                      <span>
                        {mode === "light" ? "Light" : "Dark"} mode is now active
                      </span>
                    </output>
                  </p>
                </form>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
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
              <AlertDialog.Root>
                <AlertDialog.Trigger>
                  <img alt="Delete document" src="/assets/icon-delete.svg" />
                </AlertDialog.Trigger>
                <AlertDialog.Portal>
                  <AlertDialog.Overlay />
                  <AlertDialog.Content
                    onOpenAutoFocus={(ev) => {
                      ev.preventDefault();
                      if (!headingRef.current) {
                        throw new Error("Alert dialog heading not found");
                      }
                      headingRef.current.focus();
                    }}
                  >
                    <AlertDialog.Title ref={headingRef} tabIndex={-1}>
                      Delete this document?
                    </AlertDialog.Title>
                    <AlertDialog.Description>
                      Are you sure you want to delete the ‘welcome.md’ document
                      and its contents? This action cannot be reversed.
                    </AlertDialog.Description>
                    <AlertDialog.Action
                      onClick={() => {
                        console.log("TODO: Delete document");
                      }}
                    >
                      Confirm & delete
                    </AlertDialog.Action>
                  </AlertDialog.Content>
                </AlertDialog.Portal>
              </AlertDialog.Root>
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
