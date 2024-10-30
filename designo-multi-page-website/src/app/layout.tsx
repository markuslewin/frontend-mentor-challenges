import "~/styles/globals.css";

import { Jost } from "next/font/google";
import { type Metadata } from "next";

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jost.variable}`}>
      <body>{children}</body>
    </html>
  );
}
