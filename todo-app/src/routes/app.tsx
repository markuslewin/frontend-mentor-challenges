import { useSearchParams } from "react-router-dom";
// @ts-expect-error Seach params
import bgDesktopLight from "../assets/bg-desktop-light.jpg?as=metadata";
// @ts-expect-error Seach params
import bgMobileLight from "../assets/bg-mobile-light.jpg?as=metadata";
import { screens } from "../utils/screens";
import { InputHTMLAttributes, ReactNode, useId } from "react";
import { Icon } from "../components/icon";
import { cx } from "class-variance-authority";

function useTheme() {
  return { theme: "light" as const };
}

function useTodos() {
  return {
    items: [
      { id: 1, text: "Complete online JavaScript course", completed: true },
      { id: 2, text: "Jog around the park 3x", completed: false },
      { id: 3, text: "10 minutes meditation", completed: false },
      { id: 4, text: "Read for 1 hour", completed: false },
      { id: 5, text: "Pick up groceries", completed: false },
      { id: 6, text: "Complete Todo App on Frontend Mentor", completed: false },
    ],
  };
}

export function App() {
  const newHeadingId = useId();
  const todosHeadingId = useId();
  const todosOptionsHeadingId = useId();
  const { theme } = useTheme();
  const todos = useTodos();

  const nextTheme = theme === "light" ? "dark" : "light";
  const itemsLeft = 5;

  return (
    <>
      <picture>
        <source
          media={`(min-width: ${screens.tablet})`}
          width={bgDesktopLight.width}
          height={bgDesktopLight.height}
          srcSet={bgDesktopLight.src}
        />
        <img
          className="bg-header relative -z-10 -mb-[9.5rem] w-full h-52 object-cover tablet:-mb-[13.875rem] tablet:h-[18.75rem]"
          alt=""
          width={bgMobileLight.width}
          height={bgMobileLight.height}
          src={bgMobileLight.src}
        />
      </picture>
      <div className="box-content mx-auto max-w-[33.75rem] px-6 tablet:px-10">
        <header className="text-header-foreground flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-heading uppercase">Todo</h1>
          <p>
            <button type="button" className="clickable-12 outline-offset-8">
              <Icon
                className="size-5 tablet:size-[1.625rem]"
                name={theme === "light" ? "icon-moon" : "icon-sun"}
              />
              <span className="sr-only">Switch to {nextTheme} mode</span>
            </button>
          </p>
          <p className="sr-only" aria-live="polite">
            {theme} mode enabled.
          </p>
        </header>
        <main>
          <section
            className="isolate mt-10 grid grid-cols-[auto_1fr] items-center"
            aria-labelledby={newHeadingId}
          >
            <h2 className="sr-only" id={newHeadingId}>
              New todo
            </h2>
            <p className="col-start-1 row-start-1 z-10 ml-5 tablet:ml-6">
              <label>
                <span className="sr-only">Toggle all todos</span>
                <Checkbox className="border-new-border checked:border-new-border/0" />
              </label>
            </p>
            <p className="col-span-full row-start-1">
              <label>
                <span className="sr-only">Create a new todo</span>
                <input
                  className="bg-new text-new-foreground text-fs-todo w-full rounded py-5 pl-[3.25rem] pr-5 placeholder:text-new-foreground-placeholder tablet:py-[1.4375rem] tablet:pl-[4.5rem] tablet:pr-6"
                  type="text"
                  placeholder="Create a new todo…"
                  autoComplete="off"
                />
              </label>
            </p>
          </section>
          <section aria-labelledby={todosHeadingId}>
            <h2 id={todosHeadingId}>Todos</h2>
            <ol>
              {todos.items.map((todo) => (
                <Todo key={todo.id} {...todo} />
              ))}
            </ol>
            <section aria-labelledby={todosOptionsHeadingId}>
              <h3 id={todosOptionsHeadingId}>Todos options</h3>
              <h4>Todos left</h4>
              <p>{itemsLeft} items left</p>
              <h4>Filter todos</h4>
              <ul>
                <li>
                  <Filter value="">All</Filter>
                </li>
                <li>
                  <Filter value="active">Active</Filter>
                </li>
                <li>
                  <Filter value="completed">Completed</Filter>
                </li>
              </ul>
              <h4>Clear completed todos</h4>
              <p>
                <button type="button">Clear completed</button>
              </p>
            </section>
          </section>
          <h2>Reordering todos</h2>
          <p>Drag and drop to reorder list</p>
        </main>
      </div>
    </>
  );
}

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <span className="isolate text-checkbox-foreground grid place-items-center">
      <input
        type="checkbox"
        {...props}
        className={cx(
          "peer bg-origin-border bg-[transparent] col-start-1 row-start-1 appearance-none border rounded-full size-5 clickable-10 checked:bg-checkbox tablet:size-6",
          className
        )}
      />
      <Icon
        className="col-start-1 row-start-1 z-10 w-auto h-[0.4375rem] hidden peer-checked:block tablet:h-[0.5625rem]"
        name="icon-check"
        width="11"
        height="9"
      />
    </span>
  );
}

function Todo({ completed, text }: { text: string; completed: boolean }) {
  const textId = useId();

  return (
    <li>
      <p>
        <Checkbox defaultChecked={completed} aria-labelledby={textId} />
      </p>
      <p>
        <button id={textId} type="button">
          {text}
        </button>
      </p>
      <p>
        <button>
          <Icon className="size-3 tablet:size-[1.125rem]" name="icon-cross" />
          <span>Delete todo "{text}"</span>
        </button>
      </p>
    </li>
  );
}

interface FilterProps {
  children: ReactNode;
  value: "" | "active" | "completed";
}

function Filter({ children, value }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const state = searchParams.get("state") ?? "";

  return (
    <button
      type="button"
      onClick={() => {
        setSearchParams(
          value
            ? {
                state: value,
              }
            : {}
        );
      }}
      aria-current={state === value ? "true" : "false"}
    >
      {children}
    </button>
  );
}
