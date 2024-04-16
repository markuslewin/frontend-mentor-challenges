import * as Toggle from "@radix-ui/react-toggle";
import { ReactNode } from "react";
import { Icon } from "./icon";
import { DeleteMessage } from "./delete-dialog";

export function Meta({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-baseline gap-y-1 gap-x-4 flex-wrap">
      {children}
    </span>
  );
}

export function Author({ children }: { children: ReactNode }) {
  return (
    <span className="text-heading-m text-dark-blue flex flex-wrap gap-x-2">
      {children}
    </span>
  );
}

export function You() {
  return (
    <span className="leading-[0.9375rem] text-[0.8125rem] lowercase shape-py-[0.125rem] shape-px-[0.375rem] shape-border-[1px] border-transparent rounded-sm bg-moderate-blue text-white">
      <span className="sr-only"> (</span>You
      <span className="sr-only">)</span>
    </span>
  );
}

export function Score({
  score,
  state,
  onToggleUpvote,
  onToggleDownvote,
}: {
  score: number;
  state: "upvoted" | "downvoted" | "none";
  onToggleUpvote(): void;
  onToggleDownvote(): void;
}) {
  return (
    <div className="h-10 min-w-[6.25rem] px-3 border-[1px] border-transparent grid grid-cols-[max-content_1fr_max-content] items-center text-center font-medium rounded-[0.625rem] bg-very-light-gray text-moderate-blue tablet:h-[6.25rem] tablet:px-0 tablet:min-w-10 tablet:grid-cols-none">
      <div>
        <Toggle.Root
          className="clickable outline-offset-8 text-light-grayish-blue hocus:text-moderate-blue data-[state=on]:text-moderate-blue transition-colors"
          pressed={state === "upvoted"}
          onClick={onToggleUpvote}
        >
          <Icon className="size-[0.625rem]" name="plus" />
          <span className="sr-only">Upvote</span>
        </Toggle.Root>
      </div>
      <p data-testid="score">
        {score}
        <span className="sr-only"> points</span>
      </p>
      <div>
        <Toggle.Root
          className="clickable outline-offset-8 text-light-grayish-blue hocus:text-moderate-blue data-[state=on]:text-moderate-blue transition-colors"
          pressed={state === "downvoted"}
          onClick={onToggleDownvote}
        >
          <Icon className="size-[0.625rem]" name="minus" />
          <span className="sr-only">Downvote</span>
        </Toggle.Root>
      </div>
    </div>
  );
}

export function Mutate({
  isEditing,
  onDelete,
  onIsEditingChange,
}: {
  isEditing: boolean;
  onDelete(): void;
  onIsEditingChange(isEditing: boolean): void;
}) {
  return (
    <ul
      className="flex flex-wrap justify-end gap-y-1 gap-x-4 tablet:gap-y-1 tablet:gap-x-6"
      role="list"
    >
      <li>
        <DeleteMessage
          className="grid grid-cols-[max-content_1fr] gap-2 items-baseline font-medium text-soft-red hocus:text-pale-red transition-colors"
          onDelete={() => {
            onDelete();
          }}
        >
          <Icon className="size-[0.875rem]" name="delete" /> Delete
        </DeleteMessage>
      </li>
      <li>
        <Toggle.Root
          className="grid grid-cols-[max-content_1fr] gap-2 items-baseline font-medium text-moderate-blue hocus:text-light-grayish-blue transition-colors"
          pressed={isEditing}
          onClick={() => {
            onIsEditingChange(!isEditing);
          }}
        >
          <Icon className="size-[0.875rem]" name="edit" /> Edit
        </Toggle.Root>
      </li>
    </ul>
  );
}
