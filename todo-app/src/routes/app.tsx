import { useSearchParams } from "react-router-dom";
// @ts-expect-error Seach params
import bgDesktopLight from "../assets/bg-desktop-light.jpg?as=metadata";
// @ts-expect-error Seach params
import bgMobileLight from "../assets/bg-mobile-light.jpg?as=metadata";
import { screens } from "../utils/screens";
import { InputHTMLAttributes, ReactNode, useId } from "react";
import { Icon } from "../components/icon";

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
          alt=""
          width={bgMobileLight.width}
          height={bgMobileLight.height}
          src={bgMobileLight.src}
        />
      </picture>
      <header>
        <h1 className="uppercase">Todo</h1>
        <p>
          <button>
            <Icon name={theme === "light" ? "icon-moon" : "icon-sun"} /> Switch
            to {nextTheme} mode
          </button>
        </p>
        <p aria-live="polite">{theme} mode enabled.</p>
      </header>
      <main>
        <section aria-labelledby={newHeadingId}>
          <h2 id={newHeadingId}>New todo</h2>
          <p>
            <label>
              <span>Toggle all todos</span>
              <Checkbox />
            </label>
          </p>
          <p>
            <label>
              <span>Create a new todo</span>
              <input
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
    </>
  );
}

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

function Checkbox(props: CheckboxProps) {
  return (
    <div>
      <input
        className="peer bg-[transparent] text-new-border appearance-none border rounded-full size-5 tablet:size-6"
        type="checkbox"
        {...props}
      />
      <Icon className="hidden peer-checked:block" name="icon-check" />
    </div>
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
