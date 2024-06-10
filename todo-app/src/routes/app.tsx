import { useSearchParams } from "react-router-dom";
// @ts-expect-error Seach params
import bgDesktopLight from "../assets/bg-desktop-light.jpg?as=metadata";
// @ts-expect-error Seach params
import bgMobileLight from "../assets/bg-mobile-light.jpg?as=metadata";
import { screens } from "../utils/screens";
import { InputHTMLAttributes, ReactNode, useId } from "react";
import { Icon } from "../components/icon";
import { cva, cx } from "class-variance-authority";
import { useMedia } from "../utils/use-media";

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
  const todosOptionsFiltersHeadingId = useId();
  const tabletMatches = useMedia(`(min-width: ${screens.tablet})`);
  const { theme } = useTheme();
  const todos = useTodos();

  const nextTheme = theme === "light" ? "dark" : "light";
  const itemsLeft = 5;

  return (
    <div className="min-h-screen pb-20">
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
                  className="bg-new text-new-foreground text-fs-todo w-full rounded py-5 pl-[3.25rem] pr-5 shadow shadow-shadow/50 placeholder:text-new-foreground-placeholder tablet:py-[1.4375rem] tablet:pl-[4.5rem] tablet:pr-6"
                  type="text"
                  placeholder="Create a new todo…"
                  autoComplete="off"
                />
              </label>
            </p>
          </section>
          <section
            className="bg-todo mt-4 rounded shadow shadow-shadow/50 tablet:mt-6"
            aria-labelledby={todosHeadingId}
          >
            <h2 className="sr-only" id={todosHeadingId}>
              Todos
            </h2>
            <ol className="text-todo-foreground text-fs-todo" role="list">
              {todos.items.map((todo) => (
                <Todo key={todo.id} {...todo} />
              ))}
            </ol>
            <section
              className="text-clear text-filter-foreground border-t border-todo-border pt-4 px-5 pb-5 flex flex-wrap justify-between gap-4 tablet:px-6 tablet:grid tablet:grid-cols-3 tablet:gap-0"
              aria-labelledby={todosOptionsHeadingId}
            >
              <h3 className="sr-only" id={todosOptionsHeadingId}>
                Todos options
              </h3>
              <h4 className="sr-only">Todos left</h4>
              <p>{itemsLeft} items left</p>
              {tabletMatches ? (
                <>
                  <h4 className="sr-only">Filter todos</h4>
                  <Filters />
                </>
              ) : null}
              <h4 className="sr-only">Clear completed todos</h4>
              <p className="flex justify-end">
                <button
                  className="hocus:text-filter-foreground-hover"
                  type="button"
                >
                  Clear completed
                </button>
              </p>
            </section>
          </section>
          {!tabletMatches ? (
            <section
              className="bg-todo mt-4 rounded pt-4 px-5 pb-5 shadow shadow-shadow/50"
              aria-labelledby={todosOptionsFiltersHeadingId}
            >
              <h4 className="sr-only" id={todosOptionsFiltersHeadingId}>
                Filter todos
              </h4>
              <Filters />
            </section>
          ) : null}
          <h2 className="sr-only">Reordering todos</h2>
          <p className="text-center mt-10 tablet:mt-12">
            Drag and drop to reorder list
          </p>
        </main>
      </div>
    </div>
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
        className="col-start-1 row-start-1 pointer-events-none z-10 w-auto h-[0.4375rem] hidden peer-checked:block tablet:h-[0.5625rem]"
        name="icon-check"
        width="11"
        height="9"
      />
    </span>
  );
}

const todoVariants = cva(
  "group first-of-type:border-0 border-t border-todo-border py-4 px-5 grid grid-cols-[auto_1fr_auto] items-center gap-3 tablet:py-5 tablet:px-6 tablet:gap-6",
  {
    variants: { completed: { true: "text-todo-foreground-fade line-through" } },
  }
);

function Todo({ completed, text }: { text: string; completed: boolean }) {
  const textId = useId();

  return (
    <li className={todoVariants({ completed })}>
      <p>
        <Checkbox
          className="border-todo-border checked:border-todo-border/0"
          defaultChecked={completed}
          aria-labelledby={textId}
        />
      </p>
      <p className="[text-decoration-line:inherit]">
        <button
          className="[text-decoration-line:inherit] text-start"
          id={textId}
          type="button"
        >
          {text}
        </button>
      </p>
      <p>
        <button className="text-todo-foreground block clickable-12 outline-offset-8 transition-opacity tablet:opacity-0 tablet:hocus:opacity-100 tablet:group-hover:opacity-100">
          <Icon className="size-3 tablet:size-[1.125rem]" name="icon-cross" />
          <span className="sr-only">Delete todo "{text}"</span>
        </button>
      </p>
    </li>
  );
}

function Filters() {
  return (
    <ul className="text-filter flex justify-center gap-5" role="list">
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
  );
}

interface FilterProps {
  children: ReactNode;
  value: "" | "active" | "completed";
}

const filterVariants = cva(
  "transition-colors hocus:text-filter-foreground-hover",
  {
    variants: { isCurrent: { true: "text-filter-foreground-active" } },
  }
);

function Filter({ children, value }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const state = searchParams.get("state") ?? "";
  const isCurrent = state === value;

  return (
    <button
      className={filterVariants({ isCurrent })}
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
      aria-current={isCurrent ? "true" : "false"}
    >
      {children}
    </button>
  );
}
