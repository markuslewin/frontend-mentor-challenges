"use client";

import { useState } from "react";
import { type Receipt, type Items } from "~/app/_utils/cart";
import { CheckoutForm } from "~/app/checkout/_components/checkout-form";
import { ReceiptDialog } from "~/app/checkout/_components/receipt-dialog";

interface CheckoutProps {
  cartItems: Items;
}

export const Checkout = ({ cartItems: initialCartItems }: CheckoutProps) => {
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  // Hold old cart while showing receipt
  const [cartItems] = useState(initialCartItems);
  const [tmp, setTmp] = useState(false);

  return (
    <>
      <button
        className="bg-000000 text-FFFFFF"
        type="button"
        onClick={() => {
          setTmp(!tmp);
        }}
      >
        Toggle
      </button>
      <CheckoutForm
        cartItems={cartItems}
        onCheckout={(receipt) => {
          setReceipt(receipt);
        }}
      />
      {receipt ? (
        <ReceiptDialog
          isOpen={true}
          receipt={receipt}
          onIsOpenChange={() => {
            console.log();
          }}
        />
      ) : null}
      {tmp ? (
        <ReceiptDialog
          isOpen={tmp}
          onIsOpenChange={setTmp}
          receipt={{
            products: [],
            totals: { grandTotal: 0, shipping: 0, total: 0, vat: 0 },
          }}
        />
      ) : null}
    </>
  );
};
