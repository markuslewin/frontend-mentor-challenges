import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
} from "react-router-dom";
import { z } from "zod";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { createMessage } from "../utils/messages";

const AddMessageSchema = z.object({
  text: z.string(),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const result = parseWithZod(formData, { schema: AddMessageSchema });
  if (result.status !== "success") return result.reply();

  createMessage(result.value);

  return redirect("/nested-routes");
}

export function NestedRoutesCreate() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lastResult = useActionData() as any;
  const [form, fields] = useForm({
    constraint: getZodConstraint(AddMessageSchema),
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: AddMessageSchema });
    },
  });

  return (
    <>
      <h2 className="text-heading-m">Add a message</h2>
      <Form className="mt-8 max-w-sm" {...getFormProps(form)} method="post">
        <div>
          <label htmlFor={fields.text.id}>Text:</label>
          <Input {...getInputProps(fields.text, { type: "text" })} />
          <p className="mt-1 text-red-500" id={fields.text.errorId}>
            {fields.text.errors}
          </p>
        </div>
        <Button type="submit">Add message</Button>
      </Form>
    </>
  );
}
