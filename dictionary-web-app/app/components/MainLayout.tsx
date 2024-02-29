import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Form, useActionData } from "@remix-run/react";
import { ReactNode, RefObject } from "react";
import { Icon } from "./ui/icon";
import { z } from "zod";
import { action as rootAction } from "../root";
import { parseWithZod } from "@conform-to/zod";

export const SearchFormSchema = z.object({
  intent: z.literal("search-word"),
  word: z.string({ required_error: "Whoops, can’t be empty…" }),
});

export function MainLayout({
  searchFormRef,
  formId,
  children,
}: {
  searchFormRef?: RefObject<HTMLFormElement>;
  formId?: string;
  children: ReactNode;
}) {
  // todo: Incorrect?
  const lastResult = useActionData<typeof rootAction>();
  const [form, fields] = useForm({
    id: `search-form-${formId}`,
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: SearchFormSchema });
    },
  });

  return (
    <main className="mt-6 tablet:mt-[3.25rem]">
      <div className="px-6 center-column tablet:px-10">
        <h1 className="sr-only">Dictionary Web App</h1>
        <Form
          className="group"
          action="/"
          method="post"
          ref={searchFormRef}
          {...getFormProps(form)}
          data-error={!!fields.word.errors?.length}
        >
          <input type="hidden" name="intent" value="search-word" />
          <label className="sr-only" htmlFor={fields.word.id}>
            Search for a word
          </label>
          <div className="grid grid-cols-[1fr_max-content]">
            <input
              className="col-span-full row-start-1 h-12 rounded-2xl border-[1px] border-transparent bg-field px-6 pr-14 text-[1rem] font-bold leading-[1.1875rem] transition-colors placeholder:text-field-placeholder group-data-[error=true]:border-FF5252 hocus:border-A445ED tablet:h-16 tablet:text-[1.25rem] tablet:leading-[1.5rem]"
              placeholder="Search for any word…"
              {...getInputProps(fields.word, { type: "text" })}
            />
            <button className="col-start-2 row-start-1 px-6" type="submit">
              <Icon className="size-4 text-A445ED" name="icon-search" />
              <span className="sr-only">Search</span>
            </button>
          </div>
          <p
            className="mt-2 text-heading-s group-data-[error=true]:text-FF5252"
            id={fields.word.errorId}
          >
            {fields.word.errors}
          </p>
        </Form>
        {children}
      </div>
    </main>
  );
}
