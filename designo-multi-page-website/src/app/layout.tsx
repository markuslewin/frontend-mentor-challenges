import "~/styles/globals.css";

import { Jost } from "next/font/google";
import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import logoDark from "~/app/_assets/logo-dark.png";
import { preload } from "react-dom";
import { useId } from "react";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Designo",
    default: "Designo",
  },
  description: "Award-winning custom designs and digital branding solutions",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/assets/favicon-32x32.png",
    },
  ],
};

const navLinks: { name: string; href: string }[] = [
  { name: "Our company", href: "/about" },
  { name: "Locations", href: "/locations" },
  { name: "Contact", href: "/contact" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headerNavLabelId = useId();

  preload("/sprite.svg", {
    as: "image",
    type: "image/svg+xml",
  });

  return (
    <html lang="en" className={`${jost.variable}`}>
      <body className="grid min-h-screen grid-rows-[auto_1fr_auto]">
        <header>
          <div className="center flex flex-wrap items-center justify-between py-9 tablet:py-16">
            <Link href="/">
              <Image className="h-6 w-auto" alt="Designo" src={logoDark} />
            </Link>
            <nav aria-describedby={headerNavLabelId}>
              <h2 className="sr-only" id={headerNavLabelId}>
                Header navigation
              </h2>
              {/* todo: Mobile menu */}
              {/* <button>Menu</button> */}
              <ul
                className="hidden flex-wrap items-center gap-10 tablet:flex"
                role="list"
              >
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
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
