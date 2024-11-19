"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId } from "react";
import Logo from "~/app/_assets/logo.svg";
import IconCart from "~/app/_assets/icon-cart.svg";
import IconHamburger from "~/app/_assets/icon-hamburger.svg";
import { NavLink } from "~/app/_components/nav-link";

export function Header() {
  const headerNavLabelId = useId();
  const pathname = usePathname();

  const hasBorder = ["/", "/headphones", "/speakers", "/earphones"].includes(
    pathname,
  );

  return (
    <header className="bg-000000 text-FFFFFF">
      <div className="center">
        <div className="tablet:layout grid grid-cols-[1fr_auto_1fr] items-center py-8 desktop:grid-cols-[1fr_auto_1fr] desktop:pb-9">
          <Link
            className="order-2 tablet:col-[3/span_20] desktop:order-1 desktop:col-[auto]"
            href="/"
          >
            <Logo className="h-[1.5625rem] w-[8.9375rem]" />
            <span className="sr-only">Audiophile</span>
          </Link>
          <nav
            className="order-1 grid desktop:order-2"
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
            <button>
              <IconCart className="h-5 w-[1.4375rem]" />
              <span className="sr-only">Cart</span>
            </button>
          </p>
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
