"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { checkoutSchema } from "~/app/_utils/schema";

export async function checkout(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: checkoutSchema });
  if (submission.status !== "success") {
    return submission.reply();
  }

  console.log("Success:", submission.value);

  // todo: Success dialog
  redirect("/");
}
