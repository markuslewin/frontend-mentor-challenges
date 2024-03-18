import { useEffect, useRef, useState } from "react";
import { useMode } from "./utils/mode";
import * as Dialog from "@radix-ui/react-dialog";
import { Link, useSubmit } from "react-router-dom";
import { Doc, Docs, Template, isDoc } from "./utils/documents";
import { invariant } from "@epic-web/invariant";
import Editor from "./components/editor";
import Icon from "./components/icon";

function App({ docs, doc }: { docs: Docs; doc: Doc | Template }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const submit = useSubmit();
  const { mode, selectMode } = useMode();

  useEffect(() => {
    document.body.dataset.mode = mode;
  }, [mode]);

  return (
    <>
      <header className="bg-header text-header-foreground text-heading-m grid grid-cols-[max-content_1fr]">
        <h1 className="sr-only">Markdown app</h1>
        <Dialog.Root>
          <Dialog.Trigger className="bg-menu-trigger text-menu-trigger-foreground hocus:bg-menu-trigger-hover transition-colors size-14 tablet:size-[4.5rem] grid place-items-center">
            <Icon
              className="size-[1.4375rem] tablet:size-[1.875rem]"
              name="icon-menu"
            />
            <span className="sr-only">Open menu</span>
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
              <button
                onClick={() => {
                  submit({ intent: "new-document" }, { method: "post" });
                }}
              >
                <span aria-hidden="true">+ </span>New document
              </button>
              <ul>
                {docs.map((doc) => {
                  const createdAt = new Date(doc.createdAt);
                  return (
                    <li key={doc.id}>
                      <img alt="" src="/assets/icon-document.svg" />
                      <Link to={`/${doc.id}`}>{doc.name}</Link>
                      <p>
                        <time dateTime={createdAt.toISOString()}>
                          {createdAt.toLocaleDateString(undefined, {
                            dateStyle: "long",
                          })}
                        </time>
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
        <div className="flex gap-2 justify-between p-2 pl-6 tablet:p-4 tablet:pl-6">
          <div className="flex items-center gap-6 grow">
            <p className="hidden desktop:block">
              <Icon className="w-[8.125rem] h-3" name="logo" />
              <span className="sr-only">Markdown</span>
            </p>
            <div className="text-header-separator hidden desktop:block border-r-[1px] pl-[0.375rem] h-full"></div>
            <h2 className="sr-only">Options</h2>
            <label className="grid grid-cols-[max-content_1fr] gap-4 items-center grow max-w-[26.875rem]">
              <Icon className="size-4" name="icon-document" />
              <div className="grid gap-[0.1875rem]">
                <span className="text-header-muted text-body-s capitalize sr-only tablet:not-sr-only">
                  Document name
                </span>
                <input
                  className="bg-name-field text-name-field-foreground caret-name-field-caret border-b-[1px] border-transparent hocus:border-current transition-colors focus-visible:outline-none w-full"
                  key={isDoc(doc) ? doc.id : null}
                  ref={nameRef}
                  name="document-name"
                  defaultValue={doc.name}
                />
              </div>
            </label>
          </div>
          <ul className="flex gap-3">
            <li>
              <Dialog.Root
                open={deleteDialogOpen}
                onOpenChange={(open) => {
                  setDeleteDialogOpen(isDoc(doc) ? open : false);
                }}
              >
                <Dialog.Trigger
                  className="bg-delete-button text-delete-button-foreground hocus:text-delete-button-hover transition-colors size-10 grid place-items-center"
                  aria-disabled={!isDoc(doc)}
                >
                  <Icon className="size-5" name="icon-delete" />
                  <span className="sr-only">Delete document</span>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="bg-body-overlay fixed inset-0 overflow-y-auto grid place-items-center p-4">
                    <Dialog.Content
                      className="bg-alert text-alert-foreground font-roboto-slab text-preview-paragraph rounded p-6 w-full max-w-[21.4375rem]"
                      onOpenAutoFocus={(ev) => {
                        ev.preventDefault();
                        invariant(headingRef.current, "No heading element");
                        headingRef.current.focus();
                      }}
                    >
                      <Dialog.Title
                        className="text-preview-h4 text-alert-heading"
                        ref={headingRef}
                        tabIndex={-1}
                      >
                        Delete this document?
                      </Dialog.Title>
                      <Dialog.Description className="mt-4">
                        Are you sure you want to delete the ‘{doc.name}’
                        document and its contents? This action cannot be
                        reversed.
                      </Dialog.Description>
                      <Dialog.Close
                        className="mt-4 bg-confirm-button text-confirm-button-foreground hocus:bg-confirm-button-hover transition-colors py-[0.6875rem] px-4 block w-full rounded capitalize font-roboto text-heading-m"
                        onClick={() => {
                          // todo: Wait for RR to signal success
                          invariant(isDoc(doc), "Must be a document");
                          submit(
                            { intent: "delete-document", id: doc.id },
                            { method: "post" }
                          );
                        }}
                      >
                        Confirm & delete
                      </Dialog.Close>
                    </Dialog.Content>
                  </Dialog.Overlay>
                </Dialog.Portal>
              </Dialog.Root>
            </li>
            <li>
              <button
                className="bg-save-button hocus:bg-save-button-hover transition-colors text-save-button-foreground desktop:px-4 desktop:py-[0.6875rem] grid place-items-center size-10 rounded desktop:size-auto desktop:flex desktop:gap-2 capitalize"
                onClick={() => {
                  invariant(nameRef.current, "No name element");
                  invariant(contentRef.current, "No content element");
                  submit(
                    {
                      intent: "save-document",
                      ...(isDoc(doc) ? { id: doc.id } : {}),
                      name: nameRef.current.value,
                      content: contentRef.current.value,
                    },
                    { method: "post" }
                  );
                }}
              >
                <Icon className="size-4" name="icon-save" />
                <span className="sr-only desktop:not-sr-only">
                  Save changes
                </span>
              </button>
            </li>
          </ul>
        </div>
      </header>
      <main className="grid">
        <h2 className="sr-only">Document</h2>
        <Editor
          key={isDoc(doc) ? doc.id : null}
          ref={contentRef}
          initialContent={doc.content}
        />
      </main>
    </>
  );
}

export default App;
