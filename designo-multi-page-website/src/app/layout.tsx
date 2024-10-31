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
          <Link href="/">
            <Image alt="Designo" src={logoDark} />
          </Link>
          <nav aria-describedby={headerNavLabelId}>
            <h2 id={headerNavLabelId}>Header navigation</h2>
            {/* todo: Mobile menu */}
            {/* <button>Menu</button> */}
            <ul role="list">
              {navLinks.map((link) => {
                return (
                  <li key={link.href}>
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <Link href="/">
            <Image alt="Designo" src={logoLight} />
          </Link>
          <nav aria-describedby={footerNavLabelId}>
            <h2 id={footerNavLabelId}>Footer navigation</h2>
            <ul role="list">
              {navLinks.map((link) => {
                return (
                  <li key={link.href}>
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <h2>Contact information</h2>
          <h3>Address</h3>
          <p>
            <strong>Designo Central Office</strong>
            <br />
            3886 Wellington Street
            <br />
            Toronto, Ontario M9C 3J5
          </p>
          <div>
            <h3>Contact Us (Central Office)</h3>
            <p>
              P<span>hone</span> :{" "}
              <a href="tel:+1 253-863-8967">+1 253-863-8967</a>
            </p>
            <p>
              M<span>ail</span> :{" "}
              <a href="mailto:contact@designo.co">contact@designo.co</a>
            </p>
          </div>
          <h2>Social media</h2>
          <ul role="list">
            <li>
              <SocialMediaLink>
                <Icon name="icon-facebook" />
                <span>Facebook</span>
              </SocialMediaLink>
            </li>
            <li>
              <SocialMediaLink>
                <Icon name="icon-youtube" />
                <span>YouTube</span>
              </SocialMediaLink>
            </li>
            <li>
              <SocialMediaLink>
                <Icon name="icon-twitter" />
                <span>Twitter</span>
              </SocialMediaLink>
            </li>
            <li>
              <SocialMediaLink>
                <Icon name="icon-pinterest" />
                <span>Pinterest</span>
              </SocialMediaLink>
            </li>
            <li>
              <SocialMediaLink>
                <Icon name="icon-instagram" />
                <span>Instagram</span>
              </SocialMediaLink>
            </li>
          </ul>
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
