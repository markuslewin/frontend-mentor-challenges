import "~/styles/globals.css";
import { Jost } from "next/font/google";
import { type Metadata } from "next";
import { preload } from "react-dom";
import { Header } from "~/app/_components/header";

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  preload("/sprite.svg", {
    as: "image",
    type: "image/svg+xml",
  });

  return (
    <html lang="en" className={`${jost.variable}`}>
      <body className="grid min-h-screen grid-rows-[auto_1fr_auto]">
        <Header />
        {children}
      </body>
    </html>
  );
}
