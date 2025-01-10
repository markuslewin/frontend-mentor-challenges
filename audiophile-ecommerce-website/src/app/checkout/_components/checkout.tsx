"use client";

import { useState } from "react";
import { useCart } from "~/app/_components/cart-context";
import { type Receipt, getProductImage } from "~/app/_utils/cart";
import { CheckoutForm } from "~/app/checkout/_components/checkout-form";
import { ReceiptDialog } from "~/app/checkout/_components/receipt-dialog";

export const Checkout = () => {
  const { items } = useCart();
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  return (
    <>
      <CheckoutForm
        items={
          // Hold old cart while showing receipt
          receipt
            ? receipt.products
            : items.map((i) => ({ ...i, image: getProductImage(i.slug) }))
        }
        onCheckout={(receipt) => {
          setReceipt(receipt);
        }}
      />
      {receipt ? <ReceiptDialog isOpen={true} receipt={receipt} /> : null}
    </>
  );
};
