"use client";

import { type FieldError, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "~/app/_components/icon";
import { type ComponentPropsWithoutRef, useId } from "react";

const requiredMessage = "Can't be empty";

const schema = z.object({
  name: z.string().min(1, requiredMessage),
  email: z.string().min(1, requiredMessage).email({
    message: "Please use a valid email address",
  }),
  phone: z.string().min(1, requiredMessage),
  message: z.string().min(1, requiredMessage),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      className="mt-12 tablet:mt-10 desktop:col-start-3 desktop:mt-0"
      noValidate
      onSubmit={handleSubmit((data) => {
        console.log("Successfully submitted data: ", data);
      })}
    >
      <div className="grid gap-6">
        <Input label="Name" inputProps={register("name")} error={errors.name} />
        <Input
          label="Email Address"
          inputProps={register("email")}
          error={errors.email}
        />
        <Input
          label="Phone"
          inputProps={register("phone")}
          error={errors.phone}
        />
        <Textarea
          label="Your Message"
          textareaProps={register("message")}
          error={errors.message}
        />
      </div>
      <p className="mt-10 grid justify-center tablet:mt-6 tablet:justify-end">
        <button className="button" type="submit">
          Submit
        </button>
      </p>
    </form>
  );
}

interface InputProps {
  label: string;
  error: FieldError | undefined;
  inputProps: ComponentPropsWithoutRef<"input">;
}

function Input({ error, inputProps, label }: InputProps) {
  const inputId = useId();
  const errorId = useId();

  return (
    <div className="textbox relative">
      <label className="sr-only" htmlFor={inputId}>
        {label}
      </label>
      <input
        className="textbox__input peer"
        id={inputId}
        type="text"
        placeholder={label}
        required
        aria-invalid={!!error}
        aria-describedby={errorId}
        {...inputProps}
      />
      <p
        className={[
          "textbox__error",
          !!error ? "opacity-100" : "opacity-0",
        ].join(" ")}
        id={errorId}
      >
        {error ? (
          <>
            {error.message} <Icon className="size-5" name="icon-error" />
          </>
        ) : null}
      </p>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 border-t-[0.1875rem] opacity-0 transition-opacity peer-hocus:opacity-100" />
    </div>
  );
}

interface TextareaProps {
  label: string;
  error: FieldError | undefined;
  textareaProps: ComponentPropsWithoutRef<"textarea">;
}

function Textarea({ error, textareaProps, label }: TextareaProps) {
  const textareaId = useId();
  const errorId = useId();

  return (
    <div className="textbox relative">
      <label className="sr-only" htmlFor={textareaId}>
        {label}
      </label>
      <textarea
        className="textbox__input peer min-h-[6.375rem]"
        id={textareaId}
        placeholder={label}
        required
        aria-invalid={!!error}
        aria-describedby={errorId}
        {...textareaProps}
      />
      <p
        className={[
          "textbox__error",
          !!error ? "opacity-100" : "opacity-0",
        ].join(" ")}
        id={errorId}
      >
        {error ? (
          <>
            {error.message} <Icon className="size-5" name="icon-error" />
          </>
        ) : null}
      </p>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 border-t-[0.1875rem] opacity-0 transition-opacity peer-hocus:opacity-100" />
    </div>
  );
}
