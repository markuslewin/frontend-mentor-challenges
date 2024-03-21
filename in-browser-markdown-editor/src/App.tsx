import { useEffect, useRef, useState } from "react";
import { useMode } from "./utils/mode";
import * as Dialog from "@radix-ui/react-dialog";
import { Link, useSubmit } from "react-router-dom";
import { Doc, Docs, Template, isDoc } from "./utils/documents";
import { invariant } from "@epic-web/invariant";
import Editor from "./components/editor";
import Icon from "./components/icon";
import {
  animated,
  useChain,
  useSpring,
  useSpringRef,
  useTransition,
} from "@react-spring/web";

function App({ docs, doc }: { docs: Docs; doc: Doc | Template }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const appSlideRef = useSpringRef();
  const appSlideStyle = useSpring({
    ref: appSlideRef,
    from: {
      transform: "translateX(0rem)",
    },
    to: {
      transform: drawerOpen ? "translateX(15.625rem)" : "translateX(0rem)",
    },
    onStart() {
      if (drawerOpen) {
        document.documentElement.dataset.drawerState = "open";
      }
    },
    onResolve() {
      if (drawerOpen) {
        return;
      }
      document.documentElement.dataset.drawerState = "closed";
    },
  });
  const drawerSlideRef = useSpringRef();
  const drawerSlideTransitions = useTransition(drawerOpen, {
    ref: drawerSlideRef,
    from: { transform: "translateX(-15.625rem)" },
    enter: { transform: "translateX(0rem)" },
    leave: { transform: "translateX(-15.625rem)" },
  });
  useChain([drawerSlideRef, appSlideRef], [0, 0]);
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
    <animated.div
      className="grid grid-rows-[max-content_1fr] min-h-screen"
      style={appSlideStyle}
    >
      <header className="bg-header text-header-foreground text-heading-m grid grid-cols-[max-content_1fr]">
        <h1 className="sr-only">Markdown app</h1>
        <Dialog.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
          <Dialog.Trigger className="bg-menu-trigger text-menu-trigger-foreground hocus:bg-menu-trigger-hover transition-colors size-14 tablet:size-[4.5rem] grid place-items-center">
            <Icon
              className="size-[1.4375rem] tablet:size-[1.875rem]"
              name="icon-menu"
            />
            <span className="sr-only">Open menu</span>
          </Dialog.Trigger>
          {drawerSlideTransitions((styles, item) => {
            return item ? (
              <Dialog.Portal forceMount>
                {/* <Dialog.Overlay /> */}
                <Dialog.Content
                  className="fixed top-0 bottom-0 left-0 w-[15.625rem]"
                  asChild
                >
                  <animated.div style={styles}>
                    <Dialog.Close className="absolute top-0 right-0 translate-x-full bg-menu-trigger text-menu-trigger-foreground hocus:bg-menu-trigger-hover size-14 tablet:size-[4.5rem] grid place-items-center transition-colors">
                      <Icon
                        className="size-[1.125rem] tablet:size-[1.4375rem]"
                        name="icon-close"
                      />
                      <span className="sr-only">Close menu</span>
                    </Dialog.Close>
                    <div className="w-full h-full bg-sidebar text-sidebar-foreground text-heading-m overflow-y-auto px-6 pt-7 pb-8 grid grid-rows-[1fr_max-content] gap-8">
                      <div>
                        <Dialog.Title className="sr-only">
                          Documents and mode
                        </Dialog.Title>
                        <Dialog.Description className="sr-only">
                          Browse documents and switch mode.
                        </Dialog.Description>
                        <p className="desktop:hidden">
                          <Icon className="w-[8.125rem] h-3" name="logo" />
                          <span className="sr-only">Markdown</span>
                        </p>
                        <h3 className="text-sidebar-muted text-heading-s uppercase mt-7 desktop:mt-0">
                          My documents
                        </h3>
                        <button
                          className="mt-7 bg-primary-button text-primary-button-foreground hocus:bg-primary-button-hover py-[0.6875rem] px-4 rounded w-full transition-colors"
                          onClick={() => {
                            submit(
                              { intent: "new-document" },
                              { method: "post" }
                            );
                          }}
                        >
                          <span aria-hidden="true">+ </span>New document
                        </button>
                        <ul className="mt-6">
                          {docs.map((doc) => {
                            const createdAt = new Date(doc.createdAt);
                            return (
                              <li
                                className="first:mt-0 mt-6 grid grid-cols-[max-content_1fr] items-center gap-4"
                                key={doc.id}
                              >
                                <Icon className="size-4" name="icon-document" />
                                <div className="flex flex-col-reverse gap-1">
                                  <Link
                                    className="hocus:text-sidebar-active transition-colors"
                                    to={`/${doc.id}`}
                                  >
                                    {doc.name}
                                  </Link>
                                  <p className="text-sidebar-muted text-body-s">
                                    <time dateTime={createdAt.toISOString()}>
                                      {createdAt.toLocaleDateString(undefined, {
                                        dateStyle: "long",
                                      })}
                                    </time>
                                  </p>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div>
                        <h3 className="sr-only">Switch mode</h3>
                        <form
                          onSubmit={(ev) => {
                            ev.preventDefault();
                            selectMode(mode === "light" ? "dark" : "light");
                          }}
                        >
                          <button
                            className="grid grid-cols-[max-content_max-content_max-content] items-center gap-3"
                            type="submit"
                          >
                            <Icon
                              className="size-[1.0625rem] text-sidebar-inactive dark:text-[inherit] transition-colors"
                              name="icon-dark-mode"
                            />
                            <span className="grid items-center w-12 h-6 rounded-full bg-sidebar-toggle text-sidebar-toggle-foreground before:block before:w-3 before:h-3 before:border-t-[0.75rem] before:rounded-full dark:before:translate-x-[0.375rem] before:translate-x-[1.875rem] before:transition-transform"></span>
                            <Icon
                              className="size-[1.125rem] dark:text-sidebar-inactive transition-colors"
                              name="icon-light-mode"
                            />
                            <span className="sr-only">
                              Switch to {mode === "light" ? "dark" : "light"}{" "}
                              mode
                            </span>
                          </button>
                          <p className="sr-only">
                            <output>
                              <span>
                                {mode === "light" ? "Light" : "Dark"} mode is
                                now active
                              </span>
                            </output>
                          </p>
                        </form>
                      </div>
                    </div>
                  </animated.div>
                </Dialog.Content>
              </Dialog.Portal>
            ) : null;
          })}
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
                        className="mt-4 bg-primary-button text-primary-button-foreground hocus:bg-primary-button-hover transition-colors py-[0.6875rem] px-4 block w-full rounded capitalize font-roboto text-heading-m"
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
                className="bg-primary-button hocus:bg-primary-button-hover transition-colors text-primary-button-foreground desktop:px-4 desktop:py-[0.6875rem] grid place-items-center size-10 rounded desktop:size-auto desktop:flex desktop:gap-2 capitalize"
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
    </animated.div>
  );
}

export default App;
