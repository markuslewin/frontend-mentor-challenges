import products from "~/app/_data/data.json";

export type Products = typeof products;
export type Product = Products[number];

export const getProductById = (id: Product["id"]) => {
  return products.find((p) => p.id === id);
};

export const getProductBySlug = (slug: Product["slug"]) => {
  return products.find((p) => p.slug === slug);
};

export const categories = [...new Set(products.map((p) => p.category))];
