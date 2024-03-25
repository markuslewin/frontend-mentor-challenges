import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpritePreload } from "@/components/icon";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frontend Mentor | Tic Tac Toe",
  description: "Play tic-tac-toe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <SpritePreload />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
