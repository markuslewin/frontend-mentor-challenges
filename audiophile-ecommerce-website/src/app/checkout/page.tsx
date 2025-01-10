import { type Metadata } from "next";
import { GoBack } from "~/app/_components/go-back";
import { Checkout } from "~/app/checkout/_components/checkout";

export const metadata: Metadata = {
  title: "Checkout",
};

export default async function CheckoutPage() {
  return (
    <>
      <GoBack />
      <Checkout />
    </>
  );
}
