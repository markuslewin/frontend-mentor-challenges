"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { addToCartSchema, checkoutSchema } from "~/app/_utils/schema";

export async function addToCart(formData: FormData) {
  const submission = parseWithZod(formData, { schema: addToCartSchema });
  if (submission.status !== "success") {
    throw new Error(JSON.stringify(submission.error));
  }

  // todo: Add to cart
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log("Success:", submission.value);
}

export async function checkout(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: checkoutSchema });
  if (submission.status !== "success") {
    return submission.reply();
  }

  console.log("Success:", submission.value);

  // todo: Success dialog
  redirect("/");
}
