import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { z } from "zod";
// @ts-expect-error Search params
import tabletImg from "#app/assets/nattu-adnan-vvHRdOwqHcg-unsplash.jpg?format=webp&w=768&as=metadata";
// @ts-expect-error Search params
import mobileImg from "#app/assets/nattu-adnan-vvHRdOwqHcg-unsplash.jpg?format=webp&w=300&as=metadata";
import * as Landmark from "#app/components/landmark";
import { Button } from "#app/components/button";
import { AnnouncementHandle } from "#app/components/route-announcer";
import { screens } from "#app/utils/screens";
import { Input } from "#app/components/input";
import { Picture, Source, Image } from "#app/components/picture";

export const handle = {
  announcement() {
    return "Home";
  },
} satisfies AnnouncementHandle;

const FavoriteColorSchema = z.object({
  color: z
    .string({ required_error: "Color is required" })
    .refine((val) => val.toLowerCase() === "blue", {
      message: 'Color must be "blue"',
    }),
});

export function Home() {
  return (
    <>
      <h1 className="text-heading-l">My React template</h1>
      <p className="mt-8">This is my React template.</p>
      <h2 className="mt-24 text-heading-m">Node environment</h2>
      <NodeEnvironment />
      <h2 className="mt-24 text-heading-m">Form validation</h2>
      <FormValidation />
      <h2 className="mt-24 text-heading-m">Optimized image</h2>
      <OptimizedImage />
      <Landmark.Root>
        <Landmark.Label>
          <h2 className="mt-24 text-heading-m">API endpoint</h2>
        </Landmark.Label>
        <ApiEndpoint />
      </Landmark.Root>
    </>
  );
}

function NodeEnvironment() {
  return (
    <p className="mt-8">
      The current node environment is:{" "}
      <strong data-testid="node-env">{process.env.NODE_ENV}</strong>.
    </p>
  );
}

function FormValidation() {
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
      <p className="mt-8">This form is validated with Conform and Zod.</p>
      <form className="mt-8 max-w-sm" {...getFormProps(form)}>
        <div>
          <label className="block" htmlFor={fields.color.id}>
            Favorite color:
          </label>
          <Input {...getInputProps(fields.color, { type: "text" })} />
          <p className="mt-1 text-error-foreground" id={fields.color.errorId}>
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

function OptimizedImage() {
  return (
    <>
      <p className="mt-8">
        The original image was <strong>3.5 MB</strong>, but the following image
        is <strong>163 kB</strong>.
      </p>
      <Picture>
        <Source media={`(min-width: ${screens.tablet})`} image={tabletImg} />
        <Image
          className="mt-6 w-full bg-[hsl(189_90%_31%)]"
          alt="The optimized image"
          image={mobileImg}
        />
      </Picture>
    </>
  );
}

function ApiEndpoint() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    fetch("/.netlify/functions/message")
      .then((response) => response.text())
      .then((text) => {
        if (ignore) return;

        setMessage(text);
      });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <p className="mt-8">The server says:</p>
      <pre className="mt-4" data-testid="server-message">
        {message === null ? "Loading..." : message}
      </pre>
    </>
  );
}
