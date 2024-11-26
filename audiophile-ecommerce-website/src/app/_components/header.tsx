"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import Logo from "~/app/_assets/logo.svg";
import IconCart from "~/app/_assets/icon-cart.svg";
import IconHamburger from "~/app/_assets/icon-hamburger.svg";
import { NavLink } from "~/app/_components/nav-link";
import { currency } from "~/app/_utils/format";
import { QuantitySelect } from "~/app/_components/quantity-select";

export function Header() {
  const headerNavLabelId = useId();
  const [isCartExpanded, setIsCartExpanded] = useState(false);
  const cartTriggerRef = useRef<HTMLButtonElement>(null);
  const cartContentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const hasBorder = ["/", "/headphones", "/speakers", "/earphones"].includes(
    pathname,
  );

  // Click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        e.target instanceof Node &&
        !cartContentRef.current!.contains(e.target)
      ) {
        setIsCartExpanded(false);
      }
    }

    if (isCartExpanded) {
      document.addEventListener("click", handleClick);
    }
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isCartExpanded]);

  // Focus outside
  useEffect(() => {
    function handleFocusin(e: FocusEvent) {
      if (
        e.target !== cartTriggerRef.current &&
        e.target instanceof Node &&
        !cartContentRef.current!.contains(e.target)
      ) {
        setIsCartExpanded(false);
      }
    }

    if (isCartExpanded) {
      document.addEventListener("focusin", handleFocusin);
    }
    return () => {
      document.removeEventListener("focusin", handleFocusin);
    };
  }, [isCartExpanded]);

  return (
    <header
      className={[
        "bg-000000 text-FFFFFF",
        isCartExpanded ? "sticky top-0 z-10" : "",
      ].join(" ")}
    >
      <div className="center">
        <div className="tablet:layout grid grid-cols-[1fr_auto_1fr] items-center py-8 desktop:grid-cols-[1fr_auto_1fr] desktop:pb-9">
          <Link
            className="order-2 tablet:col-[3/span_20] tablet:justify-self-start desktop:order-1 desktop:col-[auto]"
            href="/"
          >
            <Logo className="h-[1.5625rem] w-[8.9375rem]" />
            <span className="sr-only">Audiophile</span>
          </Link>
          <nav
            className="order-1 grid justify-self-start desktop:order-2"
            aria-labelledby={headerNavLabelId}
          >
            <h2 className="sr-only" id={headerNavLabelId}>
              Header navigation
            </h2>
            <button className="desktop:hidden">
              <IconHamburger className="h-[0.9375rem] w-4" />
              <span className="sr-only">Menu</span>
            </button>
            <ul
              className="hidden desktop:flex desktop:gap-[2.125rem]"
              role="list"
            >
              {[
                { name: "Home", href: "/" },
                { name: "Headphones", href: "/headphones" },
                { name: "Speakers", href: "/speakers" },
                { name: "Earphones", href: "/earphones" },
              ].map((link, i) => {
                return (
                  <li className="text-sub-title uppercase" key={i}>
                    <NavLink
                      className="transition-colors hocus:text-D87D4A"
                      href={link.href}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
          <p className="order-3 grid justify-end">
            <button
              className="transition-colors clickable-12 hocus:text-D87D4A"
              ref={cartTriggerRef}
              type="button"
              aria-expanded={isCartExpanded}
              onClick={() => {
                setIsCartExpanded(!isCartExpanded);
              }}
            >
              <IconCart className="h-5 w-[1.4375rem]" />
              <span className="sr-only">Cart</span>
            </button>
          </p>
          {isCartExpanded ? (
            <div className="fixed inset-0 top-[5.625rem] z-10 overflow-y-auto bg-000000/40 py-6 desktop:top-[6.0625rem] desktop:py-8">
              <div className="center">
                <div className="grid tablet:grid-cols-[minmax(auto,23.5625rem)] tablet:justify-end">
                  <div
                    className={
                      "rounded bg-FFFFFF px-7 py-8 text-000000/50 tablet:p-8"
                    }
                    ref={cartContentRef}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setIsCartExpanded(false);
                        cartTriggerRef.current!.focus();
                      }
                    }}
                  >
                    <div className="flex flex-wrap justify-between">
                      <h2 className="text-[1.125rem] font-bold tracking-[0.08125rem] text-000000">
                        Cart (3<span className="sr-only"> items</span>)
                      </h2>
                      <button className="underline transition-colors hocus:text-D87D4A">
                        Remove all
                      </button>
                    </div>
                    <ul className="mt-8 grid gap-6" role="list">
                      {[
                        {
                          name: "XX99 MK II",
                          slug: "xx99-mark-two-headphones",
                          price: 2999,
                          quantity: 1,
                        },
                        {
                          name: "XX99 MK II",
                          slug: "xx99-mark-two-headphones",
                          price: 2999,
                          quantity: 1,
                        },
                      ].map((item, i) => {
                        return (
                          <li
                            className="grid grid-cols-[auto_1fr] items-center gap-4 font-bold"
                            key={i}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-000000">{item.name}</h3>
                                <p>{currency(item.price)}</p>
                              </div>
                              <QuantitySelect size="small" />
                            </div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              className="order-first size-16 rounded object-cover"
                              alt=""
                              width={150}
                              height={150}
                              src={`/assets/cart/image-${item.slug}.jpg`}
                            />
                          </li>
                        );
                      })}
                    </ul>
                    <p className="mt-8 flex flex-wrap justify-between uppercase">
                      Total<span className="sr-only">: </span>
                      <strong className="text-[1.125rem] text-000000">
                        {currency(5396)}
                      </strong>
                    </p>
                    <p className="mt-6">
                      <Link
                        className="button-primary w-full"
                        href={"/checkout"}
                        onClick={() => {
                          setIsCartExpanded(false);
                        }}
                      >
                        Checkout
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {hasBorder ? (
        <div className="tablet:center">
          <div className="border-t-[0.0625rem] border-FFFFFF/10 desktop:border-FFFFFF/20" />
        </div>
      ) : null}
    </header>
  );
}
