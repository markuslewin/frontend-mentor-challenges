"use client";

import { useRef, useTransition } from "react";
import {
  QuantitySelect,
  type QuantitySelectRef,
} from "~/app/_components/quantity-select";
import { type Product } from "~/app/_utils/product";
import { idKey, quantityKey } from "~/app/_utils/schema";
import { addToCart } from "~/app/actions";

interface QuantityFormProps {
  productId: Product["id"];
}

export const QuantityForm = ({ productId }: QuantityFormProps) => {
  const quantitySelectRef = useRef<QuantitySelectRef>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className={[
        "mt-8 flex flex-wrap gap-4 transition-opacity desktop:mt-12",
        isPending ? "opacity-50" : "",
      ].join(" ")}
      onSubmit={(e) => {
        e.preventDefault();

        if (!isPending) {
          startTransition(async () => {
            await addToCart(new FormData(e.currentTarget));
            quantitySelectRef.current!.reset();
          });
        }
      }}
    >
      <input type="hidden" name={idKey} value={productId} />
      <QuantitySelect
        ref={quantitySelectRef}
        size="large"
        name={quantityKey}
        min={1}
        disabled={isPending}
      />
      <button
        className="button-primary"
        type="submit"
        aria-disabled={isPending}
      >
        Add to cart
      </button>
    </form>
  );
};
