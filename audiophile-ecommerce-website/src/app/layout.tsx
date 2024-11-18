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
        <footer className="bg-101010 text-FFFFFF">
          <Link href="/">
            <Logo className="h-[1.5625rem] w-[8.9375rem]" />
            <span className="sr-only">Audiophile</span>
          </Link>
          <nav>
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
          <p>
            Audiophile is an all in one stop to fulfill your audio needs.
            We&apos;re a small team of music lovers and sound specialists who
            are devoted to helping you get the most out of personal audio. Come
            and visit our demo facility - we’re open 7 days a week.
          </p>
          <p className="font-bold">Copyright 2021. All Rights Reserved</p>
          <ul role="list">
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
                  <a className="transition-colors hocus:text-D87D4A" href="#">
                    <social.Icon className="w-6" />
                    <span className="sr-only">{social.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </footer>
      </body>
    </html>
  );
}
