import "~/styles/globals.css";

import { Jost } from "next/font/google";
import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import logoDark from "~/app/_assets/logo-dark.png";
import logoLight from "~/app/_assets/logo-light.png";
import { Icon } from "~/app/_components/icon";
import { preload } from "react-dom";
import { useId, type ReactNode } from "react";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "Frontend Mentor | Designo Agency Website Challenge",
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
  const footerNavLabelId = useId();

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
        <main>{children}</main>
        <footer className="bg-black pb-16 pt-64 text-white/50 tablet:pb-20 tablet:pt-40 desktop:pt-36">
          <div className="center">
            <div className="flex flex-col flex-wrap items-center justify-between tablet:flex-row">
              <Link href="/">
                <Image className="h-6 w-auto" alt="Designo" src={logoLight} />
              </Link>
              <div className="mt-8 self-stretch border-t-[0.0625rem] text-white/10 tablet:hidden" />
              <nav
                className="mt-8 tablet:mt-0"
                aria-describedby={footerNavLabelId}
              >
                <h2 className="sr-only" id={footerNavLabelId}>
                  Footer navigation
                </h2>
                <ul
                  className="flex flex-col flex-wrap items-center gap-8 tablet:flex-row tablet:gap-10"
                  role="list"
                >
                  {navLinks.map((link) => {
                    return (
                      <li key={link.href}>
                        <Link
                          className="text-[0.875rem] uppercase leading-none tracking-[0.125rem] text-white hocus:underline"
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
            <div className="hidden border-t-[0.0625rem] text-white/10 tablet:mt-10 tablet:block" />
            <h2 className="sr-only">Contact information</h2>
            <h3 className="sr-only">Address</h3>
            <div className="mt-10 grid gap-10 tablet:mt-8 tablet:grid-cols-[233fr_273fr_minmax(max-content,184fr)] tablet:gap-0 desktop:grid-cols-[380fr_546fr_minmax(max-content,185fr)]">
              <p className="text-center tablet:text-start">
                <strong>Designo Central Office</strong>
                <br />
                3886 Wellington Street
                <br />
                Toronto, Ontario M9C 3J5
              </p>
              <div className="text-center tablet:text-start">
                <h3 className="font-bold">Contact Us (Central Office)</h3>
                <p>
                  P<span className="sr-only">hone</span> :{" "}
                  <a href="tel:+1 253-863-8967">+1 253-863-8967</a>
                </p>
                <p>
                  M<span className="sr-only">ail</span> :{" "}
                  <a href="mailto:contact@designo.co">contact@designo.co</a>
                </p>
              </div>
              <h2 className="sr-only">Social media</h2>
              <ul
                className="cluster justify-center gap-4 tablet:place-self-end"
                role="list"
              >
                <li>
                  <SocialMediaLink>
                    <Icon className="size-6" name="icon-facebook" />
                    <span className="sr-only">Facebook</span>
                  </SocialMediaLink>
                </li>
                <li>
                  <SocialMediaLink>
                    <Icon className="size-6" name="icon-youtube" />
                    <span className="sr-only">YouTube</span>
                  </SocialMediaLink>
                </li>
                <li>
                  <SocialMediaLink>
                    <Icon className="h-5 w-6" name="icon-twitter" />
                    <span className="sr-only">Twitter</span>
                  </SocialMediaLink>
                </li>
                <li>
                  <SocialMediaLink>
                    <Icon className="size-6" name="icon-pinterest" />
                    <span className="sr-only">Pinterest</span>
                  </SocialMediaLink>
                </li>
                <li>
                  <SocialMediaLink>
                    <Icon className="size-6" name="icon-instagram" />
                    <span className="sr-only">Instagram</span>
                  </SocialMediaLink>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

interface SocialMediaLinkProps {
  children: ReactNode;
}

function SocialMediaLink({ children }: SocialMediaLinkProps) {
  return (
    <Link
      className="text-peach transition-colors hocus:text-light-peach"
      href="#"
    >
      {children}
    </Link>
  );
}
