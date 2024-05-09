import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useLoaderData,
} from "react-router-dom";
import { deleteMessage, getMessages } from "../utils/messages";
import { Icon } from "../components/icon";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { z } from "zod";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { AnnouncementHandle } from "../components/route-announcer";

const DeleteMessageSchema = z.object({
  id: z.string(),
});

export const handle = {
  announcement() {
    return "Messages";
  },
} satisfies AnnouncementHandle;

export function loader() {
  const messages = getMessages() ?? [];

  return {
    messages,
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const result = parseWithZod(formData, { schema: DeleteMessageSchema });
  if (result.status !== "success") return result.reply();

  deleteMessage(result.value.id);

  return redirect("/nested-routes");
}

export function NestedRoutesIndex() {
  const { messages } = useLoaderData() as ReturnType<typeof loader>;

  return (
    <>
      <h2 className="text-heading-m">Messages</h2>
      <ul className="mt-8">
        {messages.map((message) => (
          <li
            className="mt-4 grid grid-cols-[max-content_1fr] items-center gap-2"
            key={message.id}
          >
            <Delete id={message.id} />
            <Link
              className="underline underline-offset-4 hocus:no-underline"
              to={`/nested-routes/update/${message.id}`}
            >
              {message.text}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function Delete({ id }: { id: string }) {
  const [form, fields] = useForm({
    constraint: getZodConstraint(DeleteMessageSchema),
    defaultValue: { id },
  });

  return (
    <Form {...getFormProps(form)} method="post">
      <input {...getInputProps(fields.id, { type: "hidden" })} />
      <button
        className="size-10 grid place-items-center text-red-500 hocus:text-red-200 transition-colors"
        type="submit"
      >
        <Icon className="size-5" name="trash" />
        <span className="sr-only">Delete message</span>
      </button>
    </Form>
  );
}
