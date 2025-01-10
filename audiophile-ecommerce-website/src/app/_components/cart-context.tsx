"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useOptimistic,
} from "react";
import { type Item, type Items } from "~/app/_utils/cart";
import { type Product } from "~/app/_utils/product";

type OptimisticItemsAction =
  | {
      type: "quantity";
      data: {
        id: Item["id"];
        quantity: number;
      };
    }
  | { type: "add"; data: Product & { quantity: number } }
  | {
      type: "remove-all";
    };

const CartContext = createContext<{
  items: Items;
  optimisticCartDispatch: (action: OptimisticItemsAction) => void;
} | null>(null);

interface CartProviderProps {
  children: ReactNode;
  items: Items;
}

export const CartProvider = ({ children, items }: CartProviderProps) => {
  // todo: Should probably optimistically update `Cart`, and derive `Items` from that
  const [optimisticItems, optimisticCartDispatch] = useOptimistic<
    Items,
    OptimisticItemsAction
  >(items, (items, action) => {
    if (action.type === "add") {
      const item = items.find((item) => item.id === action.data.id);
      return item
        ? items.map((i) => {
            if (i.id === action.data.id) {
              return { ...i, quantity: i.quantity + action.data.quantity };
            } else {
              return i;
            }
          })
        : [...items, action.data];
    } else if (action.type === "quantity") {
      return items.map((item) => {
        if (item.id === action.data.id) {
          return { ...item, quantity: action.data.quantity };
        } else {
          return item;
        }
      });
    } else if (action.type === "remove-all") {
      return [];
    } else {
      throw new Error("Invalid action");
    }
  });

  return (
    <CartContext.Provider
      value={{ items: optimisticItems, optimisticCartDispatch }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const value = useContext(CartContext);
  if (value === null) {
    throw new Error("`useCart` must be used inside of an `CartProvider`");
  }

  return value;
};
