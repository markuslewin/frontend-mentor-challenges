import products from "~/app/_data/data.json";

export type Products = typeof products;
export type Product = Products[number];

export const getProductById = (id: Product["id"]) => {
  return products.find((p) => p.id === id);
};
