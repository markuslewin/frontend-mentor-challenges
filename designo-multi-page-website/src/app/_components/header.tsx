"use client";

import Link from "next/link";
import * as Collapsible from "@radix-ui/react-collapsible";
import Image from "next/image";
import logoDark from "~/app/_assets/logo-dark.png";
import { useEffect, useId, useRef, useState } from "react";
import { invariant } from "@epic-web/invariant";
import { Icon } from "~/app/_components/icon";

const navLinks: { name: string; href: string }[] = [
  { name: "Our company", href: "/about" },
  { name: "Locations", href: "/locations" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const headerNavLabelId = useId();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const linksRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleFocusOutside(e: FocusEvent) {
      invariant(e.target instanceof Node, "Invalid target type");
      invariant(linksRef.current, "Empty `containerRef`");

      if (!linksRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("focusin", handleFocusOutside);
    }
    return () => {
      document.removeEventListener("focusin", handleFocusOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      invariant(e.target instanceof Node, "Invalid target type");
      invariant(linksRef.current, "Empty `containerRef`");

      if (!linksRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header
      className={isMenuOpen ? "sticky inset-0 z-10 bg-white tablet:static" : ""}
    >
      <div className="center flex items-center justify-between py-9 tablet:flex-wrap tablet:py-16">
        <Link href="/">
          <Image
            className="h-[1.6875rem] w-auto"
            alt="Designo"
            src={logoDark}
          />
        </Link>
        <nav aria-describedby={headerNavLabelId}>
          <h2 className="sr-only" id={headerNavLabelId}>
            Header navigation
          </h2>
          {/* Tablet+ */}
          <ul className="hidden items-center gap-10 tablet:flex" role="list">
            {navLinks.map((link) => {
              return (
                <li key={link.href}>
                  <Link
                    className="text-[0.875rem] uppercase leading-none tracking-[0.125rem] hocus:underline"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          {/* Mobile */}
          <Collapsible.Root
            className="tablet:hidden"
            open={isMenuOpen}
            onOpenChange={setIsMenuOpen}
          >
            <Collapsible.Trigger className="outline-offset-8 clickable-12">
              {isMenuOpen ? (
                <Icon className="size-5" name="icon-close" />
              ) : (
                <Icon className="h-5 w-6" name="icon-hamburger" />
              )}
              <span className="sr-only">Menu</span>
            </Collapsible.Trigger>
            <Collapsible.Content className="fixed inset-0 top-[6.1875rem] overflow-y-auto bg-[hsl(0_0%_0%/0.5)]">
              <ul
                className="grid bg-black px-6 py-8 text-[1.5rem] leading-[1.5625rem] tracking-[0.125rem] text-white"
                ref={linksRef}
                role="list"
              >
                {navLinks.map((link) => {
                  return (
                    <li className="grid" key={link.href}>
                      <Link
                        className="py-4 uppercase"
                        href={link.href}
                        onClick={() => {
                          setIsMenuOpen(false);
                        }}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Collapsible.Content>
          </Collapsible.Root>
        </nav>
      </div>
    </header>
  );
}
