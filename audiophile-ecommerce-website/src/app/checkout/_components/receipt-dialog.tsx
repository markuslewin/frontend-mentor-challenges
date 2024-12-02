import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { motion } from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { type Receipt } from "~/app/_utils/cart";
import { currency } from "~/app/_utils/format";
import IconOrderConfirmation from "~/app/checkout/_assets/icon-order-confirmation.svg";
import * as Item from "~/app/checkout/_components/item";

interface ReceiptDialog {
  isOpen: boolean;
  onIsOpenChange: (isOpen: boolean) => void;
  receipt: Receipt;
}

export const ReceiptDialog = ({
  isOpen,
  receipt,
  onIsOpenChange,
}: ReceiptDialog) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [areProductsExpanded, setAreProductsExpanded] = useState(false);

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={onIsOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 grid grid-cols-[minmax(auto,33.75rem)] items-center justify-center overflow-y-auto bg-000000/40 p-6">
          <AlertDialog.Content
            className="rounded bg-FFFFFF p-8 text-000000/50 tablet:p-12"
            onOpenAutoFocus={(e) => {
              e.preventDefault();
              titleRef.current!.focus();
            }}
          >
            <IconOrderConfirmation className="size-16" />
            <AlertDialog.Title
              className="mt-6 max-w-72 text-h3 text-000000 tablet:mt-8"
              ref={titleRef}
              tabIndex={-1}
            >
              <span className="block">Thank you</span> for your order
            </AlertDialog.Title>
            <AlertDialog.Description className="mt-4 tablet:mt-6">
              You will receive an email confirmation shortly.
            </AlertDialog.Description>
            <div className="mt-6 grid overflow-hidden rounded tablet:mt-8 tablet:grid-cols-[246fr_198fr]">
              <div className="bg-F1F1F1 p-6">
                <h3 className="sr-only">Products</h3>
                <ul className="grid gap-4" role="list">
                  {receipt.products
                    .slice(0, areProductsExpanded ? undefined : 1)
                    .map((product, i) => {
                      return (
                        <Item.Root
                          key={i}
                          price={product.price}
                          quantity={product.quantity}
                          image={product.image}
                        >
                          <Item.Heading asChild>
                            <h4>{product.shortName}</h4>
                          </Item.Heading>
                        </Item.Root>
                      );
                    })}
                </ul>
                {receipt.products.length > 1 ? (
                  <p className="mt-3 flex justify-center border-t-[0.0625rem] border-[hsl(0_0%_0%/0.08)] text-[0.75rem] font-bold leading-[1rem] -tracking-[0.013125rem]">
                    <button
                      className="mt-3 transition-colors hocus:text-D87D4A"
                      type="button"
                      onClick={() => {
                        setAreProductsExpanded(!areProductsExpanded);
                      }}
                      aria-expanded={areProductsExpanded}
                    >
                      {areProductsExpanded ? (
                        <>View less</>
                      ) : (
                        <>and {receipt.products.length - 1} other item(s)</>
                      )}
                    </button>
                  </p>
                ) : null}
              </div>
              <div className="tablet: grid items-end bg-000000 px-6 pb-5 pt-4 text-FFFFFF/50 tablet:px-8 tablet:py-10">
                <div>
                  <h3>Grand total</h3>
                  <p className="mt-2">
                    <strong className="text-[1.125rem] text-FFFFFF">
                      {currency(receipt.totals.grandTotal)}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-6 tablet:mt-11">
              <Link className="button-primary w-full" href={"/"}>
                Back to home
              </Link>
            </p>
          </AlertDialog.Content>
        </AlertDialog.Overlay>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
