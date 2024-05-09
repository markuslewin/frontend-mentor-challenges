import {
  ActionFunctionArgs,
  Form,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import { getMessage, updateMessage } from "../utils/messages";
import { invariantResponse } from "@epic-web/invariant";
import { Input } from "../components/input";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { z } from "zod";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Button } from "../components/button";
import { AnnouncementHandle } from "../components/route-announcer";

type LoaderData = ReturnType<typeof loader>;

const UpdateMessageSchema = z.object({
  id: z.string(),
  text: z.string(),
});

export const handle = {
  announcement(data) {
    return `Update message "${data.message.text}"`;
  },
} satisfies AnnouncementHandle<LoaderData>;

export function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  invariantResponse(typeof id === "string", "ID must be a string");

  const message = getMessage(id);
  invariantResponse(message, "Message not found", { status: 404 });

  return { message };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const result = parseWithZod(formData, { schema: UpdateMessageSchema });
  if (result.status !== "success") return result.reply();

  updateMessage(result.value.id, result.value);

  return redirect("/nested-routes");
}

export function NestedRoutesUpdate() {
  const { message } = useLoaderData() as LoaderData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lastResult = useActionData() as any;
  const [form, fields] = useForm({
    constraint: getZodConstraint(UpdateMessageSchema),
    lastResult,
    defaultValue: message,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: UpdateMessageSchema });
    },
  });

  return (
    <>
      <h2 className="text-heading-m">Update</h2>
      <Form className="mt-8 max-w-sm" {...getFormProps(form)} method="post">
        <input {...getInputProps(fields.id, { type: "hidden" })} />
        <div>
          <label htmlFor={fields.text.id}>Text: </label>
          <Input {...getInputProps(fields.text, { type: "text" })} />
          <p className="mt-1 text-red-500" id={fields.text.errorId}>
            {fields.text.errors}
          </p>
        </div>
        <Button type="submit">Update message</Button>
      </Form>
    </>
  );
}
