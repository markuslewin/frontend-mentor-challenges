// @ts-expect-error Seach params
import bgDesktopLight from "../assets/bg-desktop-light.jpg?as=metadata";
// @ts-expect-error Seach params
import bgMobileLight from "../assets/bg-mobile-light.jpg?as=metadata";
// @ts-expect-error Seach params
import bgDesktopDark from "../assets/bg-desktop-dark.jpg?as=metadata";
// @ts-expect-error Seach params
import bgMobileDark from "../assets/bg-mobile-dark.jpg?as=metadata";
import { screens } from "../utils/screens";
import { HTMLAttributes, ReactNode, useId, useState } from "react";
import { Icon } from "../components/icon";
import { cx } from "class-variance-authority";
import { useMedia } from "../utils/use-media";
import { useTheme } from "../utils/theme";
import { z } from "zod";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { useTodos } from "../utils/todos";
import { Checkbox } from "../components/checkbox";
import { Todo } from "../components/todo";
import { type Filter, useFilter, createFilterParams } from "../utils/filter";
import { Todos } from "../components/todos";
import { Link } from "react-router-dom";

const addTodoSchema = z.object({
  text: z.string().trim().min(1),
});

export function App() {
  const { filter } = useFilter();
  const newHeadingId = useId();
  const todosHeadingId = useId();
  const todosOptionsHeadingId = useId();
  const todosOptionsFiltersHeadingId = useId();
  const tabletMatches = useMedia(`(min-width: ${screens.tablet})`);
  const { theme, setTheme } = useTheme();
  const todos = useTodos();
  const [addTodoValue, setAddTodoValue] = useState("");
  const [form, fields] = useForm({
    constraint: getZodConstraint(addTodoSchema),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: addTodoSchema });
    },
    onSubmit(e, { submission }) {
      e.preventDefault();

      if (submission?.status !== "success") return;

      todos.addTodo(submission.value.text);
      setAddTodoValue("");
    },
  });

  const nextTheme = theme === "light" ? "dark" : "light";

  const heroDesktop = theme === "light" ? bgDesktopLight : bgDesktopDark;
  const heroMobile = theme === "light" ? bgMobileLight : bgMobileDark;

  const isCompleted =
    !!todos.items.length && todos.items.every((todo) => todo.completed);
  const filteredTodos = todos.items.filter((todo) =>
    filter === "active"
      ? !todo.completed
      : filter === "completed"
        ? todo.completed
        : true
  );
  const itemsLeft = todos.items.filter((todo) => !todo.completed).length;

  return (
    <div className="min-h-screen pb-20">
      <picture>
        <source
          media={`(min-width: ${screens.tablet})`}
          width={heroDesktop.width}
          height={heroDesktop.height}
          srcSet={heroDesktop.src}
        />
        <img
          className="bg-header relative -z-10 -mb-[9.5rem] w-full h-52 object-cover tablet:-mb-[13.875rem] tablet:h-[18.75rem]"
          alt=""
          width={heroMobile.width}
          height={heroMobile.height}
          src={heroMobile.src}
        />
      </picture>
      <div className="box-content mx-auto max-w-[33.75rem] px-6 tablet:px-10">
        <header className="text-header-foreground flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-heading uppercase">Todo</h1>
          <p>
            <button
              className="clickable-12 outline-offset-8"
              type="button"
              onClick={() => {
                setTheme(nextTheme);
              }}
            >
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
                <Checkbox
                  className="border-new-border checked:border-new-border/0"
                  checked={isCompleted}
                  onChange={() => {
                    todos.toggleTodos();
                  }}
                />
              </label>
            </p>
            <form
              className="col-span-full row-start-1"
              method="post"
              {...getFormProps(form)}
            >
              <label>
                <span className="sr-only">Create a new todo</span>
                <input
                  className="bg-new text-new-foreground caret-new-caret text-fs-todo w-full rounded py-5 pl-[3.25rem] pr-5 shadow shadow-shadow/50 placeholder:text-new-foreground-placeholder tablet:py-[1.4375rem] tablet:pl-[4.5rem] tablet:pr-6"
                  placeholder="Create a new todo…"
                  autoComplete="off"
                  value={addTodoValue}
                  onChange={(e) => {
                    setAddTodoValue(e.target.value);
                  }}
                  {...getInputProps(fields.text, { type: "text" })}
                />
              </label>
            </form>
          </section>
          <section
            className="bg-todo mt-4 rounded shadow shadow-shadow/50 tablet:mt-6"
            aria-labelledby={todosHeadingId}
          >
            <h2 className="sr-only" id={todosHeadingId}>
              Todos
            </h2>
            <Todos
              items={todos.items}
              aria-labelledby={todosHeadingId}
              onReorder={(from, to) => {
                todos.reorder(from, to);
              }}
            >
              {filteredTodos.map((todo) => (
                <Todo
                  key={todo.id}
                  {...todo}
                  onCompletedChange={(completed) => {
                    todos.toggleTodo(todo.id, completed);
                  }}
                  onDelete={() => {
                    todos.deleteTodo(todo.id);
                  }}
                />
              ))}
            </Todos>
            <section
              className="text-clear text-filter-foreground pt-4 px-5 pb-5 flex flex-wrap justify-between gap-4 tablet:px-6 tablet:grid tablet:grid-cols-3 tablet:gap-0"
              aria-labelledby={todosOptionsHeadingId}
            >
              <h3 className="sr-only" id={todosOptionsHeadingId}>
                Todos options
              </h3>
              <h4 className="sr-only">Items left</h4>
              <p>
                <span data-testid="items-left">{itemsLeft}</span> items left
              </p>
              {tabletMatches ? (
                <>
                  <h4 className="sr-only" id={todosOptionsFiltersHeadingId}>
                    Filter todos
                  </h4>
                  <Filters aria-labelledby={todosOptionsFiltersHeadingId} />
                </>
              ) : null}
              <h4 className="sr-only">Clear completed todos</h4>
              <p className="flex justify-end">
                <button
                  className="transition-colors hocus:text-filter-foreground-hover"
                  type="button"
                  onClick={() => {
                    todos.clearCompleted();
                  }}
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
              <Filters aria-labelledby={todosOptionsFiltersHeadingId} />
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

interface FiltersProps extends HTMLAttributes<HTMLUListElement> {}

function Filters(props: FiltersProps) {
  return (
    <ul
      className="text-filter flex justify-center gap-5"
      role="list"
      {...props}
    >
      <li>
        <Filter value={null}>All</Filter>
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
  value: Filter | null;
}

function Filter({ children, value }: FilterProps) {
  const { filter } = useFilter();

  const isCurrent = filter === value;

  return (
    <Link
      className={cx(
        "transition-colors hocus:text-filter-foreground-hover",
        isCurrent ? "text-filter-foreground-active" : ""
      )}
      to={`/?${createFilterParams(value)}`}
      replace
      aria-current={isCurrent ? "true" : "false"}
    >
      {children}
    </Link>
  );
}
