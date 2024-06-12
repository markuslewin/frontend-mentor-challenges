import { cx } from "class-variance-authority";
import {
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useId,
} from "react";
import { Icon } from "./icon";
import { Checkbox } from "./checkbox";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TodoProps {
  completed: boolean;
  id: string;
  text: string;
  onCompletedChange(completed: boolean): void;
  onDelete(): void;
}

export function Todo({
  completed,
  id,
  text,
  onCompletedChange,
  onDelete,
}: TodoProps) {
  const {
    attributes: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      role,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      tabIndex,
      ...attributes
    },
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id, attributes: { role: "", tabIndex: undefined } });

  return (
    <Root completed={completed} text={text}>
      <Item
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
        }}
      >
        <p>
          <TodoCheckbox
            onChange={() => {
              onCompletedChange(!completed);
            }}
          />
        </p>
        <p>
          <Text ref={setActivatorNodeRef} {...attributes} {...listeners} />
        </p>
        <p>
          <Delete
            onClick={() => {
              onDelete();
            }}
          />
        </p>
      </Item>
    </Root>
  );
}

interface TodoPresentationProps {
  completed: boolean;
  text: string;
}

export function TodoPresentation({ completed, text }: TodoPresentationProps) {
  return (
    <Root completed={completed} text={text}>
      <Item className="bg-todo">
        <p>
          <TodoCheckbox readOnly />
        </p>
        <p>
          <Text />
        </p>
        <p>
          <Delete />
        </p>
      </Item>
    </Root>
  );
}

const context = createContext<{
  completed: boolean;
  text: string;
  textId: string;
} | null>(null);

function useTodoContext() {
  const value = useContext(context);
  if (value === null)
    throw new Error("Todo context must be used inside todo context provider");

  return value;
}

interface RootProps {
  children: ReactNode;
  completed: boolean;
  text: string;
}

function Root({ children, completed, text }: RootProps) {
  const textId = useId();

  return (
    <context.Provider value={{ completed, text, textId }}>
      {children}
    </context.Provider>
  );
}

interface ItemProps extends HTMLAttributes<HTMLLIElement> {}

const Item = forwardRef<HTMLLIElement, ItemProps>(
  ({ className, ...props }, ref) => {
    const { completed } = useTodoContext();

    return (
      <li
        {...props}
        className={cx(
          "group text-todo-foreground text-fs-todo first-of-type:border-0 border-t border-todo-border py-4 px-5 grid grid-cols-[auto_1fr_auto] items-center gap-3 tablet:py-5 tablet:px-6 tablet:gap-6",
          completed ? "text-todo-foreground-fade" : "",
          className
        )}
        ref={ref}
      />
    );
  }
);

interface TodoCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

function TodoCheckbox(props: TodoCheckboxProps) {
  const { textId, completed } = useTodoContext();

  return (
    <Checkbox
      {...props}
      className="border-todo-border checked:border-todo-border/0"
      checked={completed}
      aria-labelledby={textId}
    />
  );
}

interface TextProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "children"> {}

const Text = forwardRef<HTMLButtonElement, TextProps>((props, ref) => {
  const { completed, text, textId } = useTodoContext();

  return (
    <button
      {...props}
      className={cx("text-start touch-none", completed ? "line-through" : "")}
      ref={ref}
      id={textId}
      type="button"
    >
      {text}
    </button>
  );
});

interface DeleteProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "children"> {}

function Delete(props: DeleteProps) {
  const { text } = useTodoContext();

  return (
    <button
      {...props}
      className="text-todo-foreground block clickable-12 outline-offset-8 transition-opacity tablet:opacity-0 tablet:hocus:opacity-100 tablet:group-hover:opacity-100"
      type="button"
    >
      <Icon className="size-3 tablet:size-[1.125rem]" name="icon-cross" />
      <span className="sr-only">Delete todo "{text}"</span>
    </button>
  );
}
