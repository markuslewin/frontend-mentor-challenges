"use server";

import { parseWithZod } from "@conform-to/zod";
import { cookies } from "next/headers";
import {
  cartKey,
  getCart,
  addToCart as _addToCart,
  serializeCart,
  type Cart,
  getTotal,
  type Receipt,
  getProductImage,
} from "~/app/_utils/cart";
import { getProductById } from "~/app/_utils/product";
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

export async function removeAllItemsFromCart() {
  (await cookies()).delete(cartKey);
}

export async function setCart(cart: Cart) {
  (await cookies()).set(cartKey, serializeCart(cart));
}

export async function checkout(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: checkoutSchema });
  if (submission.status !== "success") {
    throw new Error(JSON.stringify(submission.error));
  }

  const cookieStore = await cookies();
  // todo: Should get user submitted cart from `formData`
  const cart = getCart(cookieStore.get(cartKey)?.value);
  const products: Receipt["products"] = [];
  cart.forEach((entry, id) => {
    const product = getProductById(id);
    if (product) {
      products.push({
        name: product.name,
        price: product.price,
        quantity: entry.quantity,
        image: getProductImage(product.slug),
      });
    } else {
      throw new Error(`Invalid product: ${id}`);
    }
  });

  const total = getTotal(products);

  console.log("Success:", { submission: submission.value, products });
  cookieStore.delete(cartKey);

  return { total, products } satisfies Receipt;
}
