import "~/styles/globals.css";
import { type Metadata } from "next";
import { Manrope } from "next/font/google";
import Link from "next/link";
import { NavLink } from "~/app/_components/nav-link";
import Logo from "~/app/_assets/logo.svg";
import IconCart from "~/app/_assets/icon-cart.svg";
import IconFacebook from "~/app/_assets/icon-facebook.svg";
import IconInstagram from "~/app/_assets/icon-instagram.svg";
import IconTwitter from "~/app/_assets/icon-twitter.svg";
import { useId } from "react";

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
  const headerNavLabelId = useId();
  const footerNavLabelId = useId();

  return (
    <html lang="en" className={`${manrope.className}`}>
      <body>
        <header>
          <Link href="/">
            <Logo className="h-[1.5625rem] w-[8.9375rem]" />
            <span className="sr-only">Audiophile</span>
          </Link>
          <nav aria-labelledby={headerNavLabelId}>
            <h2 className="sr-only" id={headerNavLabelId}>
              Header navigation
            </h2>
            <ul role="list">
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
          <button>
            <IconCart className="h-5 w-[1.4375rem]" />
            <span className="sr-only">Cart</span>
          </button>
        </header>
        <main>{children}</main>
        <footer className="center mt-32 bg-101010 pb-10 text-FFFFFF/50 tablet:mt-24 desktop:mt-[12.5rem] desktop:pb-12">
          <div>
            <div className="grid grid-cols-[minmax(0,6.3125rem)] justify-center tablet:justify-start">
              <div className="border-t-[0.25rem] text-D87D4A" />
            </div>
            <div className="mt-12 tablet:mt-14 desktop:mt-[4.4375rem]">
              <div className="flex flex-col items-center gap-12 text-FFFFFF tablet:items-start tablet:gap-8 desktop:flex-row desktop:items-center desktop:justify-between">
                <Link href="/">
                  <Logo className="h-[1.5625rem] w-[8.9375rem]" />
                  <span className="sr-only">Audiophile</span>
                </Link>
                <nav aria-labelledby={footerNavLabelId}>
                  <h2 className="sr-only" id={footerNavLabelId}>
                    Footer navigation
                  </h2>
                  <ul
                    className="flex flex-col flex-wrap items-center gap-4 tablet:flex-row tablet:gap-[2.125rem]"
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
              </div>
              <div className="desktop:layout mt-12 text-center tablet:mt-8 tablet:grid tablet:items-center tablet:gap-y-20 tablet:text-start desktop:mt-9 desktop:items-end desktop:gap-y-14">
                <p className="tablet:col-span-2 desktop:col-span-11">
                  Audiophile is an all in one stop to fulfill your audio needs.
                  We&apos;re a small team of music lovers and sound specialists
                  who are devoted to helping you get the most out of personal
                  audio. Come and visit our demo facility - we’re open 7 days a
                  week.
                </p>
                <p className="mt-12 font-bold tablet:row-start-2 tablet:mt-0 desktop:col-span-11">
                  Copyright 2021. All Rights Reserved
                </p>
                <ul
                  className="mt-12 flex flex-wrap items-center justify-center gap-4 tablet:row-start-2 tablet:mt-0 tablet:justify-self-end desktop:col-span-11 desktop:col-start-13 desktop:row-start-1 desktop:mb-2"
                  role="list"
                >
                  {[
                    {
                      name: "Facebook",
                      Icon: IconFacebook,
                    },
                    {
                      name: "Twitter",
                      Icon: IconTwitter,
                    },
                    {
                      name: "Instagram",
                      Icon: IconInstagram,
                    },
                  ].map((social, i) => {
                    return (
                      <li key={i}>
                        <a
                          className="text-FFFFFF transition-colors hocus:text-D87D4A"
                          href="#"
                        >
                          <social.Icon className="w-6" />
                          <span className="sr-only">{social.name}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
