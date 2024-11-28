import { z } from "zod";
import { getProductById, type Product } from "~/app/_utils/product";

export const cartSchema = z.array(
  z.object({
    id: z.number(),
    quantity: z.number(),
  }),
);

type SerializableCart = z.infer<typeof cartSchema>;
export type Cart = Map<Product["id"], { quantity: number }>;

export const cartKey = "cart";

export const getCart = (cookie: string | undefined) => {
  let cart: Cart;
  try {
    if (!cookie) {
      throw new Error("No cookie");
    }
    cart = new Map(
      cartSchema
        .parse(JSON.parse(cookie))
        .map((item) => [item.id, { quantity: item.quantity }]),
    );
  } catch {
    cart = new Map();
  }

  return cart;
};

export const addToCart = (id: Product["id"], quantity: number, cart: Cart) => {
  const entry = cart.get(id);
  if (entry) {
    cart.set(id, { quantity: entry.quantity + quantity });
  } else {
    cart.set(id, { quantity });
  }
};

export const serializeCart = (cart: Cart) => {
  return JSON.stringify(
    [...cart].map(([id, entry]) => {
      return {
        id,
        quantity: entry.quantity,
      };
    }) satisfies SerializableCart,
  );
};

export interface Item extends Product {
  quantity: number;
}
export type Items = Item[];

export const getAvailableItems = (cart: Cart) => {
  const items: Item[] = [];
  cart.forEach((entry, id) => {
    const product = getProductById(id);
    if (product) {
      items.push({ ...product, quantity: entry.quantity });
    } else {
      console.warn(`Product not found: ${id}`);
    }
  });
  return items;
};

export const getTotal = (items: Items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};
