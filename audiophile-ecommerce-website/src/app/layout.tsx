import "~/styles/globals.css";
import { type Metadata } from "next";
import { Header } from "~/app/_components/header";
import { cookies } from "next/headers";
import { cartKey, getCart, getItemsBeingPurchased } from "~/app/_utils/cart";
import { Footer } from "~/app/_components/footer";
import { CartProvider } from "~/app/_components/cart-context";
import { Toaster } from "sonner";
import { manrope } from "~/app/_utils/fonts";
import { MotionConfig } from "motion/react";

export const metadata: Metadata = {
  title: {
    template: "%s | Audiophile",
    default: "Audiophile",
  },
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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const cart = getCart(cookieStore.get(cartKey)?.value);
  const cartItems = getItemsBeingPurchased(cart);

  return (
    <MotionConfig reducedMotion="user">
      <html lang="en" className={`${manrope.className}`}>
        <body className="grid min-h-screen grid-rows-[auto_1fr_auto]">
          <CartProvider items={cartItems}>
            <Header />
            <main>{children}</main>
            <Footer />
          </CartProvider>
          <Toaster
            toastOptions={{
              className: `${manrope.className} text-000000 bg-F1F1F1`,
            }}
          />
        </body>
      </html>
    </MotionConfig>
  );
}
