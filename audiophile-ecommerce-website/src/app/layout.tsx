import "~/styles/globals.css";

import { type Metadata } from "next";
import { Manrope } from "next/font/google";
import Link from "next/link";
import { NavLink } from "~/app/_components/nav-link";
import Logo from "~/app/_assets/logo.svg";
import IconCart from "~/app/_assets/icon-cart.svg";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Audiophile e-commerce website",
  description: "Bringing you the best audio gear",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/assets/favicon-32x32.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.className}`}>
      <body>
        <header>
          <Link href="/">
            <Logo className="h-[1.5625rem] w-[8.9375rem]" />
            <span className="sr-only">Audiophile</span>
          </Link>
          <nav>
            <ul>
              {[
                { name: "Home", href: "/" },
                { name: "Headphones", href: "/headphones" },
                { name: "Speakers", href: "/speakers" },
                { name: "Earphones", href: "/earphones" },
              ].map((link, i) => {
                return (
                  <li key={i}>
                    <NavLink href={link.href}>{link.name}</NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
          <button>
            <IconCart className="h-5 w-[1.4375rem]" />
            <span className="sr-only">Cart</span>
          </button>
        </header>
        <main>{children}</main>
        <footer></footer>
      </body>
    </html>
  );
}
