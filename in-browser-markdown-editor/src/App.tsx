import { useRef } from "react";
import { useMode } from "./utils/mode";
import * as Dialog from "@radix-ui/react-dialog";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Link, useSubmit } from "react-router-dom";
import { Doc, Docs } from "./utils/documents";
import { invariant } from "@epic-web/invariant";
import Editor from "./components/editor";

function App({ docs, doc }: { docs: Docs; doc: Doc }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const submit = useSubmit();
  const { mode, selectMode } = useMode();

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
                  {docs.map((doc) => {
                    // todo: Parse and format dates from `document.createdAt`
                    const dateTime = "2022-01-04";
                    const text = "01 April 2022";
                    return (
                      <li key={doc.name}>
                        <img alt="" src="/assets/icon-document.svg" />
                        <Link to={`/${doc.name}`}>{doc.name}</Link>
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
                key={doc.name}
                ref={nameRef}
                name="document-name"
                defaultValue={doc.name}
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
              <button
                onClick={() => {
                  invariant(nameRef.current, "No name element");
                  invariant(contentRef.current, "No content element");
                  submit(
                    {
                      name: nameRef.current.value,
                      content: contentRef.current.value,
                      intent: "save-document",
                    },
                    { method: "post" }
                  );
                }}
              >
                <img alt="" src="/assets/icon-save.svg" />
                <span>Save changes</span>
              </button>
            </li>
          </ul>
        </div>
      </header>
      <main>
        <h2>Document</h2>
        <Editor key={doc.name} ref={contentRef} initialContent={doc.content} />
      </main>
    </>
  );
}

export default App;
