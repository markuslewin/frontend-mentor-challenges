import { GoBack } from "~/app/_components/go-back";
import { currency } from "~/app/_utils/format";

export default async function CheckoutPage() {
  return (
    <>
      {/* todo: Fix */}
      <GoBack href="#" />
      <div className="center mt-6 desktop:mt-[2.375rem]">
        <div className="desktop:layout grid gap-8 desktop:items-start desktop:gap-0">
          <div className="rounded bg-FFFFFF px-6 py-8 tablet:p-8 desktop:col-[1/span_15] desktop:p-12 desktop:pt-14">
            <h1 className="text-h3 text-000000">Checkout</h1>
            <h2 className="sr-only">Form</h2>
            <h3 className="mt-8 text-sub-title text-D87D4A tablet:mt-10">
              Billing details
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6">
              <div className="grid gap-[0.5625rem]">
                <label className="text-[0.75rem] font-bold leading-[1rem] -tracking-[0.013125rem] text-000000">
                  Name
                </label>
                <input
                  className="h-14 w-full rounded border-[0.0625rem] border-[hsl(0_0%_81%)] px-[1.4375rem] text-[0.875rem] font-bold leading-[1.1875rem] -tracking-[0.015625rem] text-000000 transition-colors placeholder:text-000000/40 hocus:border-D87D4A"
                  type="text"
                  placeholder="Alexei Ward"
                />
              </div>
              <div>
                <label>Email address</label>
                <input />
              </div>
              <div>
                <label>Phone number</label>
                <input />
              </div>
            </div>
            <h3>Shipping info</h3>
            <div>
              <label>Address</label>
              <input />
            </div>
            <div>
              <label>ZIP code</label>
              <input />
            </div>
            <div>
              <label>City</label>
              <input />
            </div>
            <div>
              <label>Country</label>
              <input />
            </div>
            <h3>Payment details</h3>
            <fieldset>
              <legend>Payment method</legend>
              <label>e-Money</label>
              <input type="radio" name="payment-method" value="e-money" />
              <label>Cash on delivery</label>
              <input
                type="radio"
                name="payment-method"
                value="cash-on-delivery"
              />
            </fieldset>
            {/* todo: If e-money */}
            <div>
              <label>e-Money number</label>
              <input />
            </div>
            <div>
              <label>e-money PIN</label>
              <input />
            </div>
            {/* todo: If cash-on-delivery */}
            <div className="grid grid-cols-[auto_1fr] items-center gap-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="size-12"
                alt=""
                width="48"
                height="48"
                src="/assets/checkout/icon-cash-on-delivery.svg"
              />
              <p>
                The ‘Cash on Delivery’ option enables you to pay in cash when
                our delivery courier arrives at your residence. Just make sure
                your address is correct so that your order will not be
                cancelled.
              </p>
            </div>
          </div>
          <div className="rounded bg-FFFFFF px-6 py-8 text-000000/50 tablet:p-8 desktop:col-[17/span_7]">
            <h2 className="text-h6 text-000000">Summary</h2>
            <ul className="mt-8 grid gap-6" role="list">
              {[
                {
                  name: "XX99 MK II",
                  slug: "xx99-mark-two-headphones",
                  price: 2999,
                  quantity: 1,
                },
                {
                  name: "XX99 MK II",
                  slug: "xx99-mark-two-headphones",
                  price: 2999,
                  quantity: 1,
                },
              ].map((item, i) => {
                return (
                  <li
                    className="grid grid-cols-[auto_1fr] items-center gap-4 font-bold"
                    key={i}
                  >
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-000000">{item.name}</h3>
                        <p>x{item.quantity}</p>
                      </div>
                      <p>{currency(item.price)}</p>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="order-first size-16 rounded object-cover"
                      alt=""
                      width={150}
                      height={150}
                      src={`/assets/cart/image-${item.slug}.jpg`}
                    />
                  </li>
                );
              })}
            </ul>
            <div className="mt-8 grid gap-2">
              <p className="flex flex-wrap items-center justify-between gap-4">
                <span className="uppercase">
                  Total<span className="sr-only">:</span>
                </span>{" "}
                <strong className="text-[1.125rem] text-000000">
                  {currency(5396)}
                </strong>
              </p>
              <p className="flex flex-wrap items-center justify-between gap-4">
                <span className="uppercase">
                  Shipping<span className="sr-only">:</span>
                </span>{" "}
                <strong className="text-[1.125rem] text-000000">
                  {currency(50)}
                </strong>
              </p>
              <p className="flex flex-wrap items-center justify-between gap-4">
                <span className="uppercase">
                  VAT (included)<span className="sr-only">:</span>
                </span>{" "}
                <strong className="text-[1.125rem] text-000000">
                  {currency(1079)}
                </strong>
              </p>
            </div>
            <p className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <span className="uppercase">
                Grand total<span className="sr-only">:</span>
              </span>{" "}
              <strong className="text-[1.125rem] text-000000">
                {currency(5446)}
              </strong>
            </p>
            <form className="mt-8">
              <button className="button-primary w-full" type="submit">
                Continue & pay
              </button>
            </form>
          </div>
        </div>
      </div>
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
