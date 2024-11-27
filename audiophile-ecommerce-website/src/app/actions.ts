"use server";

import { parseWithZod } from "@conform-to/zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  cartKey,
  getCart,
  addToCart as _addToCart,
  serializeCart,
} from "~/app/_utils/cart";
import {
  addToCartSchema,
  checkoutSchema,
  idKey,
  quantityKey,
} from "~/app/_utils/schema";

export async function addToCart(formData: FormData) {
  const submission = parseWithZod(formData, { schema: addToCartSchema });
  if (submission.status !== "success") {
    throw new Error(JSON.stringify(submission.error));
  }

  const cookieStore = await cookies();
  const cart = getCart(cookieStore.get(cartKey)?.value);
  _addToCart(submission.value[idKey], submission.value[quantityKey], cart);
  // todo: Options
  cookieStore.set(cartKey, serializeCart(cart));
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
