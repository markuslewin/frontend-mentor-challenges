import { cookies } from "next/headers";
import { CheckoutForm } from "~/app/_components/checkout-form";
import { GoBack } from "~/app/_components/go-back";
import { cartKey, getAvailableItems, getCart } from "~/app/_utils/cart";

export default async function CheckoutPage() {
  // todo: Get from layout somehow?
  const cookieStore = await cookies();
  const cart = getCart(cookieStore.get(cartKey)?.value);
  const cartItems = getAvailableItems(cart);

  return (
    <>
      <GoBack />
      <CheckoutForm cartItems={cartItems} />
    </>
  );
}
