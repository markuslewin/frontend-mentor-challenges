import {
  ReactNode,
  TextareaHTMLAttributes,
  createContext,
  forwardRef,
  useContext,
  useId,
  useState,
} from "react";
import { Avatar } from "./avatar";
import { invariant } from "@epic-web/invariant";
import { useUser } from "../utils/user";
import { z } from "zod";
import { Textarea } from "./textarea";
import { Button } from "./button";

const CreateMessageContext = createContext<{
  textareaId: string;
  textareaKey: string;
  commentingAsId: string;
  resetForm(): void;
} | null>(null);

function useCreateMessage() {
  const value = useContext(CreateMessageContext);
  invariant(value, "useCreateMessage must be used inside CreateMessageContext");

  return value;
}

function CreateMessageProvider({ children }: { children: ReactNode }) {
  const commentingAsId = useId();
  const textareaId = useId();
  const [textareaKey, setTextareaKey] = useState(Math.random().toString());

  return (
    <CreateMessageContext.Provider
      value={{
        textareaId,
        textareaKey,
        commentingAsId,
        resetForm() {
          setTextareaKey(Math.random().toString());
        },
      }}
    >
      {children}
    </CreateMessageContext.Provider>
  );
}

export const CreateMessageSchema = z.object({
  content: z.string().refine((val) => val.trim().length > 0),
});

export function Root({ children }: { children: ReactNode }) {
  return <CreateMessageProvider>{children}</CreateMessageProvider>;
}

export function Form({
  children,
  onCreateMessage,
}: {
  children: ReactNode;
  onCreateMessage(data: z.infer<typeof CreateMessageSchema>): void;
}) {
  const { resetForm } = useCreateMessage();

  return (
    <form
      className="grid grid-cols-[max-content_1fr] items-center gap-4 bg-white rounded-lg shape-p-4 shape-border-[1px] border-transparent tablet:grid-cols-[max-content_1fr_max-content] tablet:items-start tablet:shape-p-6"
      method="post"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const result = CreateMessageSchema.safeParse(
          Object.fromEntries(formData)
        );
        // todo: Don't abort?
        if (!result.success) return;

        resetForm();
        onCreateMessage(result.data);
      }}
    >
      {children}
    </form>
  );
}

export function TextareaContainer({ children }: { children: ReactNode }) {
  return (
    <div className="col-span-full tablet:col-start-2 tablet:col-span-1">
      {children}
    </div>
  );
}

export function Label({ children }: { children: ReactNode }) {
  const { textareaId } = useCreateMessage();

  return (
    <label className="sr-only" htmlFor={textareaId}>
      {children}
    </label>
  );
}

const CreateMessageTextarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>((props, ref) => {
  const { textareaId, textareaKey, commentingAsId } = useCreateMessage();

  return (
    <Textarea
      ref={ref}
      key={textareaKey}
      name="content"
      id={textareaId}
      aria-describedby={commentingAsId}
      {...props}
    />
  );
});

export { CreateMessageTextarea as Textarea };

export function CommentingAs() {
  const { commentingAsId } = useCreateMessage();
  const { user } = useUser();

  return (
    <p
      className="row-start-2 tablet:col-start-1 tablet:row-start-1"
      id={commentingAsId}
    >
      <span className="sr-only">Commenting as </span>
      <Avatar
        className="tablet:mt-1 tablet:size-10"
        alt={user.username}
        image={user.image}
      />
    </p>
  );
}

export function Create({ children }: { children: ReactNode }) {
  return (
    <p className="row-start-2 grid justify-end tablet:col-start-3 tablet:row-start-1">
      <Button type="submit">{children}</Button>
    </p>
  );
}
