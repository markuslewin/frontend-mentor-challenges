"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type ComponentPropsWithRef,
  startTransition,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import Logo from "~/app/_assets/logo.svg";
import IconCart from "~/app/_assets/icon-cart.svg";
import IconHamburger from "~/app/_assets/icon-hamburger.svg";
import { NavLink } from "~/app/_components/nav-link";
import { currency } from "~/app/_utils/format";
import { QuantitySelect } from "~/app/_components/quantity-select";
import { Categories } from "~/app/_components/categories";
import { getTotals } from "~/app/_utils/cart";
import { removeAllItemsFromCart, setCart } from "~/app/actions";
import { getProductImage } from "~/app/_utils/cart";
import { media } from "~/app/_utils/screens";
import { useCart } from "~/app/_components/cart-context";

export function Header() {
  const headerNavLabelId = useId();
  const { items: cartItems, optimisticCartDispatch } = useCart();
  const {
    // Stable reference for dep array
    setIsExpanded: setMenuIsExpanded,
    ...menu
  } = useDisclosure();
  const cartLabelId = useId();
  const cartDescId = useId();
  const cart = useDisclosure();
  const pathname = usePathname();

  useEffect(() => {
    const mql = matchMedia(media.desktop);
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setMenuIsExpanded(false);
      }
    };

    mql.addEventListener("change", handleChange);
    return () => {
      // todo: Necessary to remove?
      mql.removeEventListener("change", handleChange);
    };
  }, [setMenuIsExpanded]);

  const isHome = pathname === "/";
  const hasBorder = ["/", "/headphones", "/speakers", "/earphones"].includes(
    pathname,
  );

  const totals = getTotals(cartItems);

  const isDisclosureExpanded = menu.isExpanded || cart.isExpanded;

  return (
    <>
      {isDisclosureExpanded ? (
        <motion.div
          className="fixed inset-0 z-10 bg-000000/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        />
      ) : null}
      <header
        className={[
          "z-10 grid h-[5.625rem] grid-rows-[1fr_auto] text-FFFFFF desktop:h-[6.0625rem]",
          isHome ? "absolute inset-x-0 top-0 z-10" : "relative bg-000000",
        ].join(" ")}
      >
        <div className="center">
          <div className="tablet:layout grid grid-cols-[1fr_auto_1fr] items-center desktop:grid-cols-[1fr_auto_1fr]">
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
              <div className="desktop:hidden">
                <button
                  className="transition-colors clickable-12 hocus:text-D87D4A"
                  {...menu.triggerProps}
                >
                  <IconHamburger className="h-[0.9375rem] w-4" />
                  <span className="sr-only">Menu</span>
                </button>
                {menu.isExpanded ? (
                  <div className="absolute inset-x-0 top-full">
                    <motion.div
                      className="rounded-b bg-FFFFFF pb-9 pt-8 text-000000/50 tablet:pb-[4.1875rem] tablet:pt-14"
                      style={{
                        originY: 0,
                        transformPerspective: 2000,
                      }}
                      transition={{ duration: 0.2 }}
                      initial={{
                        opacity: 0,
                        scale: 0.95,
                        rotateX: -10,
                      }}
                      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                      {...menu.contentProps}
                    >
                      <Categories
                        headingLevel={3}
                        onSelect={() => {
                          setMenuIsExpanded(false);
                        }}
                      />
                    </motion.div>
                  </div>
                ) : null}
              </div>
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
                    <li
                      className="text-sub-title uppercase leading-[1.5625rem] tracking-[0.125rem]"
                      key={i}
                    >
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
                {...cart.triggerProps}
                className="relative isolate transition-colors clickable-12 hocus:text-D87D4A"
                aria-labelledby={cartLabelId}
                aria-describedby={cartDescId}
              >
                <IconCart className="h-5 w-[1.4375rem]" />
                <span className="sr-only" id={cartLabelId}>
                  Cart
                </span>
                {cartItems.length ? (
                  <span
                    className="absolute -right-3 -top-3 rounded-full bg-D87D4A px-2 text-[0.8125rem] leading-tight text-FFFFFF"
                    id={cartDescId}
                  >
                    {cartItems.length}
                    <span className="sr-only">
                      {" "}
                      item{cartItems.length > 1 ? <>s</> : null}
                    </span>
                  </span>
                ) : null}
              </button>
            </p>
            {cart.isExpanded ? (
              <div className="absolute inset-x-0 top-[calc(100%+1.5rem)] desktop:top-[calc(100%+2rem)]">
                <div className="center">
                  <div className="grid tablet:grid-cols-[minmax(auto,23.5625rem)] tablet:justify-end">
                    <LayoutGroup>
                      <motion.div
                        className={
                          "rounded bg-FFFFFF px-7 py-8 text-000000/50 tablet:p-8"
                        }
                        style={{
                          originY: 0,
                          transformPerspective: 2000,
                        }}
                        initial={{
                          opacity: 0,
                          scale: 0.95,
                          rotateX: -10,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          rotateX: 0,
                          transition: { duration: 0.2 },
                        }}
                        layout
                        transition={{
                          duration: cartLayoutDuration,
                        }}
                        {...cart.contentProps}
                        data-testid="cart"
                      >
                        <motion.div
                          className="flex flex-wrap justify-between"
                          layout
                        >
                          <h2 className="text-[1.125rem] font-bold tracking-[0.08125rem] text-000000">
                            Cart ({cartItems.length}
                            <span className="sr-only"> items</span>)
                          </h2>
                          {cartItems.length > 0 ? (
                            <button
                              className="underline transition-colors hocus:text-D87D4A"
                              type="button"
                              onClick={() => {
                                startTransition(async () => {
                                  optimisticCartDispatch({
                                    type: "remove-all",
                                  });
                                  await removeAllItemsFromCart();
                                });
                              }}
                            >
                              Remove all
                            </button>
                          ) : null}
                        </motion.div>
                        {cartItems.length > 0 ? (
                          <>
                            <ul className="mt-8 grid gap-6" role="list">
                              <AnimatePresence initial={false}>
                                {cartItems.map((item) => {
                                  return (
                                    <motion.li
                                      className="grid grid-cols-[auto_1fr] items-center gap-4 font-bold"
                                      key={item.id}
                                      layout
                                      initial={{ opacity: 0, scale: 0.95 }}
                                      animate={{
                                        opacity: 1,
                                        scale: 1,
                                      }}
                                      exit={{ opacity: 0, scale: 0.95 }}
                                      transition={{
                                        duration: cartLayoutDuration,
                                      }}
                                    >
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <h3 className="text-000000">
                                            {item.shortName}
                                          </h3>
                                          <p>{currency(item.price)}</p>
                                        </div>
                                        <QuantitySelect
                                          size="small"
                                          value={item.quantity}
                                          onChange={(value) => {
                                            startTransition(async () => {
                                              optimisticCartDispatch({
                                                type: "quantity",
                                                data: {
                                                  id: item.id,
                                                  quantity: value,
                                                },
                                              });
                                              await setCart(
                                                new Map(
                                                  cartItems.map((i) => {
                                                    if (i.id === item.id) {
                                                      return [
                                                        i.id,
                                                        { quantity: value },
                                                      ];
                                                    } else {
                                                      return [
                                                        i.id,
                                                        {
                                                          quantity: i.quantity,
                                                        },
                                                      ];
                                                    }
                                                  }),
                                                ),
                                              );
                                            });
                                          }}
                                        />
                                      </div>
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img
                                        className="order-first size-16 rounded object-cover"
                                        alt=""
                                        width={150}
                                        height={150}
                                        src={getProductImage(item.slug)}
                                      />
                                    </motion.li>
                                  );
                                })}
                              </AnimatePresence>
                            </ul>
                            <motion.p
                              className="mt-8 flex flex-wrap justify-between uppercase"
                              layout
                              transition={{
                                duration: cartLayoutDuration,
                              }}
                            >
                              Total<span className="sr-only">: </span>
                              <strong className="text-[1.125rem] text-000000">
                                {currency(totals.total)}
                              </strong>
                            </motion.p>
                            <motion.p
                              className="mt-6"
                              layout
                              transition={{
                                duration: cartLayoutDuration,
                              }}
                            >
                              <Link
                                className="button-primary w-full"
                                href={"/checkout"}
                                onClick={() => {
                                  cart.setIsExpanded(false);
                                }}
                              >
                                Checkout
                              </Link>
                            </motion.p>
                          </>
                        ) : (
                          <motion.p className="mt-4" layout>
                            The cart is empty.
                          </motion.p>
                        )}
                      </motion.div>
                    </LayoutGroup>
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
    </>
  );
}

function useDisclosure() {
  const [isExpanded, setIsExpanded] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        e.target instanceof Node &&
        // Ignore clicks on removed targets, e.g. when the user removes an item in the cart disclosure.
        e.target.isConnected &&
        !contentRef.current!.contains(e.target)
      ) {
        setIsExpanded(false);
      }
    }

    if (isExpanded) {
      document.addEventListener("click", handleClick);
    }
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isExpanded]);

  // Focus outside
  useEffect(() => {
    function handleFocusin(e: FocusEvent) {
      if (
        e.target !== triggerRef.current &&
        e.target instanceof Node &&
        !contentRef.current!.contains(e.target)
      ) {
        setIsExpanded(false);
      }
    }

    if (isExpanded) {
      document.addEventListener("focusin", handleFocusin);
    }
    return () => {
      document.removeEventListener("focusin", handleFocusin);
    };
  }, [isExpanded]);

  return {
    triggerProps: {
      ref: triggerRef,
      type: "button",
      "aria-expanded": isExpanded,
      onClick() {
        setIsExpanded(!isExpanded);
      },
    } satisfies ComponentPropsWithRef<"button">,
    contentProps: {
      ref: contentRef,
      onKeyDown(e) {
        if (e.key === "Escape") {
          setIsExpanded(false);
          triggerRef.current!.focus();
        }
      },
    } satisfies ComponentPropsWithRef<"div">,
    isExpanded,
    setIsExpanded,
  };
}

const cartLayoutDuration = 0.3;
