import { invariant } from "@epic-web/invariant";
import { useState } from "react";

export function useCart() {
  const [_quantity, setQuantity] = useState(0);

  return {
    quantity: _quantity,
    add(quantity: number) {
      invariant(quantity >= 0, "Added quantity must be positive");

      setQuantity(_quantity + quantity);
    },
  };
}

export function useQuantity() {
  const [value, setValue] = useState(0);

  return {
    value,
    increment() {
      setValue(value + 1);
    },
    decrement() {
      setValue(Math.max(0, value - 1));
    },
    reset() {
      setValue(0);
    },
  };
}
