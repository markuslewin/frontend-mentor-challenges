import { type Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GoBack } from "~/app/_components/go-back";
import { cartKey, getItemsBeingPurchased, getCart } from "~/app/_utils/cart";
import { Checkout } from "~/app/checkout/_components/checkout";

export const metadata: Metadata = {
  title: "Checkout",
};

export default async function CheckoutPage() {
  // todo: Get from layout somehow?
  const cookieStore = await cookies();
  const cart = getCart(cookieStore.get(cartKey)?.value);
  const cartItems = getItemsBeingPurchased(cart);

  if (cartItems.length) {
    return (
      <>
        <GoBack />
        <Checkout cartItems={cartItems} />
      </>
    );
  } else {
    redirect("/");
  }
}
