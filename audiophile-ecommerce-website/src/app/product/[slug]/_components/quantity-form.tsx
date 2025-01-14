"use client";

import { startTransition } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useCart } from "~/app/_components/cart-context";
import { QuantitySelect } from "~/app/_components/quantity-select";
import { type Product } from "~/app/_utils/product";
import { idKey, quantityKey } from "~/app/_utils/schema";
import { addToCart } from "~/app/actions";

const addToCartSchema = z.object({
  [quantityKey]: z.coerce.number(),
});

interface QuantityFormProps {
  product: Product;
}

export const QuantityForm = ({ product }: QuantityFormProps) => {
  // todo: Should we reset after submit?
  // const quantitySelectRef = useRef<QuantitySelectRef>(null);
  const { optimisticCartDispatch } = useCart();

  return (
    <form
      className={[
        "mt-8 flex flex-wrap gap-4 transition-opacity desktop:mt-12",
      ].join(" ")}
      onSubmit={(e) => {
        e.preventDefault();

        startTransition(async () => {
          const formData = new FormData(e.currentTarget);
          const result = addToCartSchema.parse(Object.fromEntries(formData));
          optimisticCartDispatch({
            type: "add",
            data: { ...product, quantity: result[quantityKey] },
          });
          toast.promise(addToCart(formData), {
            loading: `Adding ${product.name} to the cart...`,
            success: `Added ${product.name} to the cart!`,
            error: `Failed to add ${product.name} to the cart.`,
          });
          // quantitySelectRef.current!.reset();
        });
      }}
    >
      <input type="hidden" name={idKey} value={product.id} />
      <QuantitySelect
        // ref={quantitySelectRef}
        size="large"
        name={quantityKey}
        min={1}
      />
      <button className="button-primary" type="submit">
        Add to cart
      </button>
    </form>
  );
};
