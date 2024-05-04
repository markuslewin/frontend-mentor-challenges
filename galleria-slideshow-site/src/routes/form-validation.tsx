import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { z } from "zod";
import { Input } from "../components/input";
import { Button } from "../components/button";

const FavoriteColorSchema = z.object({
  color: z
    .string({ required_error: "Color is required" })
    .refine((val) => val.toLowerCase() === "blue", {
      message: 'Color must be "blue"',
    }),
});

export function FormValidation() {
  const outputRef = useRef<HTMLParagraphElement>(null);
  const [favoriteColor, setFavoriteColor] = useState("");
  const [form, fields] = useForm({
    constraint: getZodConstraint(FavoriteColorSchema),
    shouldValidate: "onBlur",
    // shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: FavoriteColorSchema });
    },
    onSubmit(event, { submission }) {
      event.preventDefault();

      if (submission?.status !== "success") return;

      flushSync(() => {
        setFavoriteColor(submission.value.color);
      });
      outputRef.current?.focus();
    },
  });

  return (
    <>
      <h1 className="text-heading-l">Form validation</h1>
      <p className="mt-8">This form is validated with Conform and Zod.</p>
      <form className="mt-8 max-w-sm" {...getFormProps(form)}>
        <div>
          <label className="block" htmlFor={fields.color.id}>
            Favorite color:
          </label>
          <Input {...getInputProps(fields.color, { type: "text" })} />
          <p className="mt-1 text-red-500" id={fields.color.errorId}>
            {fields.color.errors}
          </p>
        </div>
        <Button type="submit">Submit</Button>
      </form>
      <p className="mt-6" ref={outputRef} tabIndex={-1}>
        {favoriteColor
          ? `Your favorite color is ${favoriteColor.toLowerCase()}!`
          : null}
      </p>
    </>
  );
}
