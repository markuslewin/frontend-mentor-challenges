import * as Collapsible from "@radix-ui/react-collapsible";
import { Slot } from "@radix-ui/react-slot";
import {
  MutableRefObject,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useRef,
} from "react";
import { flushSync } from "react-dom";

const ReplyContext = createContext<{
  isReplying: boolean;
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  onIsReplyingChange(value: boolean): void;
} | null>(null);

function useReply() {
  const value = useContext(ReplyContext);
  if (!value) {
    throw new Error("useReply must be used inside ReplyContext");
  }

  return value;
}

export function Root({
  isReplying,
  children,
  onIsReplyingChange,
}: {
  isReplying: boolean;
  onIsReplyingChange(value: boolean): void;
  children: ReactNode;
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <ReplyContext.Provider
      value={{
        isReplying,
        textareaRef,
        onIsReplyingChange,
      }}
    >
      <Collapsible.Root open={isReplying}>{children}</Collapsible.Root>
    </ReplyContext.Provider>
  );
}

export function Trigger({ children }: { children: ReactNode }) {
  const { isReplying, textareaRef, onIsReplyingChange } = useReply();

  return (
    <Collapsible.Trigger
      className="grid grid-cols-[max-content_1fr] gap-2 items-center font-medium text-moderate-blue hocus:text-light-grayish-blue transition-colors"
      onClick={() => {
        if (isReplying) {
          onIsReplyingChange(false);
        } else {
          flushSync(() => {
            onIsReplyingChange(true);
          });
          const $textarea = textareaRef.current;
          if (!$textarea) return;

          $textarea.focus();
          const length = $textarea.value.length;
          $textarea.setSelectionRange(length, length);
        }
      }}
    >
      {children}
    </Collapsible.Trigger>
  );
}

export function Content({ children }: { children: ReactNode }) {
  return <Collapsible.Content className="mt-2">{children}</Collapsible.Content>;
}

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  { asChild: boolean; children: ReactNode }
>(({ asChild, ...props }, ref) => {
  const { textareaRef } = useReply();

  // Not actually needed right now, but cool pattern
  // https://github.com/radix-ui/primitives/blob/main/packages/react/compose-refs/src/composeRefs.tsx
  function composedRef(node: HTMLTextAreaElement | null) {
    if (typeof ref === "function") {
      ref(node);
    } else if (ref !== null && ref !== undefined) {
      ref.current = node;
    }

    textareaRef.current = node;
  }

  const Comp = asChild ? Slot : "textarea";
  return <Comp {...props} ref={composedRef} />;
});
