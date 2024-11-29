"use client";

import { useState } from "react";
import { type Receipt, type Items } from "~/app/_utils/cart";
import { CheckoutForm } from "~/app/checkout/_components/checkout-form";
import { ReceiptDialog } from "~/app/checkout/_components/receipt-dialog";

interface CheckoutProps {
  cartItems: Items;
}

export const Checkout = ({ cartItems }: CheckoutProps) => {
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  return (
    <>
      <CheckoutForm
        cartItems={cartItems}
        onCheckout={(receipt) => {
          setReceipt(receipt);
        }}
      />
      {receipt ? <ReceiptDialog isOpen={true} receipt={receipt} /> : null}
    </>
  );
};