import * as Popover from "@radix-ui/react-popover";
import "./cart.css";
import { primaryImage } from "../utils/product-images/images";
import { PrimaryButton } from "./buttons";
import { Icon } from "./icon";
import { useRef } from "react";
import { flushSync } from "react-dom";

export const Root = Popover.Root;

export const Trigger = Popover.Trigger;

export function Portal({
  quantity,
  onRemove,
}: {
  quantity: number;
  onRemove(): void;
}) {
  const headerRef = useRef<HTMLElement>(null);
  const emptyMessageRef = useRef<HTMLParagraphElement>(null);

  return (
    <Popover.Portal>
      <Popover.Content
        className="cart__content"
        sideOffset={30}
        collisionPadding={8}
        onOpenAutoFocus={(event) => {
          if (!headerRef.current) {
            return;
          }
          headerRef.current.focus();
          event.preventDefault();
        }}
      >
        <article>
          <header className="cart__header" ref={headerRef} tabIndex={-1}>
            {/* todo: Heading? */}
            <p>Cart</p>
          </header>
          <div className="cart__main" data-empty={!quantity}>
            {quantity ? (
              <>
                <ul>
                  <li className="cart__item">
                    <img
                      className="cart__thumbnail"
                      alt=""
                      width={primaryImage.width}
                      height={primaryImage.height}
                      src={primaryImage.src}
                    />
                    <div>
                      {/* todo: Heading? */}
                      <p>Fall Limited Edition Sneakers</p>
                      <p>
                        $125.00 x {quantity}{" "}
                        <span className="sr-only">for a total price of </span>
                        <strong className="text-very-dark-blue">$375.00</strong>
                      </p>
                    </div>
                    <p className="cart__delete">
                      <button
                        type="button"
                        onClick={() => {
                          flushSync(() => {
                            onRemove();
                          });
                          emptyMessageRef.current?.focus();
                        }}
                      >
                        <Icon className="w-[0.875rem] h-4" name="icon-delete" />
                        <span className="sr-only">Remove item from cart</span>
                      </button>
                    </p>
                  </li>
                </ul>
                <PrimaryButton className="mt-6" asChild>
                  <a href="#">Checkout</a>
                </PrimaryButton>
              </>
            ) : (
              <p ref={emptyMessageRef} tabIndex={-1}>
                Your cart is empty.
              </p>
            )}
          </div>
        </article>
      </Popover.Content>
    </Popover.Portal>
  );
}
