import { CheckoutForm } from "~/app/_components/checkout-form";
import { GoBack } from "~/app/_components/go-back";

export default async function CheckoutPage() {
  return (
    <>
      {/* todo: Fix */}
      <GoBack href="#" />
      <CheckoutForm />
    </>
  );
}

// <!-- Cart Modal -->
// Cart(3)
// Remove All

// XX99 MK II x1
// $2,999

// XX59 x2
// $899

// YX1 x1
// $599

// Total $5,396

// Checkout
// <!-- Cart modal end -->

// <!-- Success Modal -->
// Thank you for your order
// You will receive an email confirmation shortly.

// XX99 MK II x 1
// $2,999
// and 2 other item(s)

// Grand total
// $5,526

// Back to home
// <!-- End success modal -->
