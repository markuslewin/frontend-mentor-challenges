import { cookies } from "next/headers";
import { GoBack } from "~/app/_components/go-back";
import { cartKey, getItemsBeingPurchased, getCart } from "~/app/_utils/cart";
import { Checkout } from "~/app/checkout/_components/checkout";

export default async function CheckoutPage() {
  // todo: Get from layout somehow?
  const cookieStore = await cookies();
  const cart = getCart(cookieStore.get(cartKey)?.value);
  const cartItems = getItemsBeingPurchased(cart);

  return (
    <>
      <GoBack />
      <Checkout cartItems={cartItems} />
    </>
  );
}
