import { cva } from "class-variance-authority";
import { useId } from "react";
import { Icon } from "./icon";
import { Checkbox } from "./checkbox";

const todoVariants = cva(
  "group first-of-type:border-0 border-t border-todo-border py-4 px-5 grid grid-cols-[auto_1fr_auto] items-center gap-3 tablet:py-5 tablet:px-6 tablet:gap-6",
  {
    variants: { completed: { true: "text-todo-foreground-fade line-through" } },
  }
);

interface TodoProps {
  text: string;
  completed: boolean;
  onCompletedChange(completed: boolean): void;
}

export function Todo({ completed, text, onCompletedChange }: TodoProps) {
  const textId = useId();

  return (
    <li className={todoVariants({ completed })}>
      <p>
        <Checkbox
          className="border-todo-border checked:border-todo-border/0"
          defaultChecked={completed}
          aria-labelledby={textId}
          onChange={() => {
            onCompletedChange(!completed);
          }}
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
