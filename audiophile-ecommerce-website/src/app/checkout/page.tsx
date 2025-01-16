import { type Metadata } from "next";
import { GoBack } from "~/app/_components/go-back";
import { Checkout } from "~/app/checkout/_components/checkout";

export const metadata: Metadata = {
  title: "Checkout",
};

export default async function CheckoutPage() {
  return (
    <>
      <GoBack className="center mt-4 tablet:mt-12 desktop:mt-20" />
      <Checkout />
    </>
  );
}
