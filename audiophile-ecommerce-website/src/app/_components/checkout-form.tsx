// todo: Fix
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

"use client";

import {
  type FieldMetadata,
  getCollectionProps,
  getFieldsetProps,
  getFormProps,
  getInputProps,
  useForm,
} from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import {
  type ComponentPropsWithoutRef,
  createContext,
  useActionState,
  useContext,
} from "react";
import { currency } from "~/app/_utils/format";
import { checkoutSchema, type PaymentMethod } from "~/app/_utils/schema";
import { checkout } from "~/app/actions";

export function CheckoutForm() {
  const [lastResult, action] = useActionState(checkout, undefined);
  const [form, fields] = useForm({
    constraint: getZodConstraint(checkoutSchema),
    defaultValue: {
      paymentDetails: {
        paymentMethod: "e-money" satisfies PaymentMethod,
      },
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: checkoutSchema });
    },
  });

  const billingDetails = fields.billingDetails.getFieldset();
  const shippingInfo = fields.shippingInfo.getFieldset();
  const paymentDetails = fields.paymentDetails.getFieldset();

  return (
    <div className="center mt-6 desktop:mt-[2.375rem]">
      <form
        {...getFormProps(form)}
        className="desktop:layout grid gap-8 desktop:items-start desktop:gap-0"
        action={action}
      >
        <div className="rounded bg-FFFFFF px-6 py-8 tablet:p-8 desktop:col-[1/span_15] desktop:p-12 desktop:pt-14">
          <h1 className="text-h3 text-000000">Checkout</h1>
          <h2 className="sr-only">Form</h2>
          <h3 className="mt-8 text-sub-title text-D87D4A tablet:mt-10">
            Billing details
          </h3>
          <div className="mt-4 grid gap-x-4 gap-y-6 tablet:grid-cols-2">
            <Control meta={billingDetails.name}>
              <Label>Name</Label>
              <Input options={{ type: "text" }} placeholder="Alexei Ward" />
              <ErrorMessage />
            </Control>
            <Control meta={billingDetails.emailAddress}>
              <Label>Email Address</Label>
              <Input
                options={{ type: "email" }}
                placeholder="alexei@mail.com"
              />
              <ErrorMessage />
            </Control>
            <Control meta={billingDetails.phoneNumber}>
              <Label>Phone Number</Label>
              <Input options={{ type: "tel" }} placeholder="alexei@mail.com" />
              <ErrorMessage />
            </Control>
          </div>
          <div className="mt-8 tablet:mt-[3.3125rem]">
            <h3 className="text-sub-title text-D87D4A">Shipping info</h3>
            <div className="mt-4 grid gap-x-4 gap-y-6 tablet:grid-cols-2">
              <Control
                className="tablet:col-span-2"
                meta={shippingInfo.address}
              >
                <Label>Address</Label>
                <Input
                  options={{ type: "text" }}
                  placeholder="1137 Williams Avenue"
                />
                <ErrorMessage />
              </Control>
              <Control meta={shippingInfo.zipCode}>
                <Label>ZIP Code</Label>
                <Input options={{ type: "text" }} placeholder="10001" />
                <ErrorMessage />
              </Control>
              <Control meta={shippingInfo.city}>
                <Label>City</Label>
                <Input options={{ type: "text" }} placeholder="New York" />
                <ErrorMessage />
              </Control>
              <Control meta={shippingInfo.country}>
                <Label>Country</Label>
                <Input options={{ type: "text" }} placeholder="United States" />
                <ErrorMessage />
              </Control>
            </div>
          </div>
          <div className="mt-8 tablet:mt-[3.8125rem]">
            <h3 className="text-sub-title text-D87D4A">Payment details</h3>
            <fieldset {...getFieldsetProps(paymentDetails.paymentMethod)}>
              <legend>Payment method</legend>
              {getCollectionProps(paymentDetails.paymentMethod, {
                type: "radio",
                // todo: Get from schema
                options: [
                  "e-money",
                  "cash-on-delivery",
                ] satisfies PaymentMethod[],
              }).map(
                ({
                  // Not allowed to spread key into JSX
                  key: _key,
                  ...props
                }) => {
                  return (
                    <label key={props.id}>
                      <input {...props} className="peer" />
                      <span>
                        {props.value === "e-money"
                          ? "e-Money"
                          : props.value === "cash-on-delivery"
                            ? "Cash on Delivery"
                            : undefined}
                      </span>
                    </label>
                  );
                },
              )}
            </fieldset>
            {/* todo: If e-money */}
            <div className="mt-4 grid gap-x-4 gap-y-6 tablet:grid-cols-2">
              <Control meta={paymentDetails.eMoneyNumber}>
                <Label>e-Money Number</Label>
                <Input options={{ type: "text" }} placeholder="238521993" />
                <ErrorMessage />
              </Control>
              <Control meta={paymentDetails.eMoneyPin}>
                <Label>e-Money PIN</Label>
                <Input options={{ type: "text" }} placeholder="6891" />
                <ErrorMessage />
              </Control>
            </div>
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
              The ‘Cash on Delivery’ option enables you to pay in cash when our
              delivery courier arrives at your residence. Just make sure your
              address is correct so that your order will not be cancelled.
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
          <p className="mt-8">
            <button className="button-primary w-full" type="submit">
              Continue & pay
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

const ControlContext = createContext<{ meta: FieldMetadata } | null>(null);

function useControlContext() {
  const value = useContext(ControlContext);
  if (value === null) {
    throw new Error("`useControlContext` must be used inside `Control`");
  }

  return value;
}

interface ControlProps extends ComponentPropsWithoutRef<"div"> {
  meta: FieldMetadata;
}

function Control({ className = "", ...props }: ControlProps) {
  return (
    <ControlContext.Provider value={{ meta: props.meta }}>
      <div
        className={`${className} grid grid-cols-[1fr_auto] gap-[0.5625rem]`}
        {...props}
      />
    </ControlContext.Provider>
  );
}

type LabelProps = ComponentPropsWithoutRef<"label">;

function Label(props: LabelProps) {
  const { meta } = useControlContext();

  return (
    <label
      className={[
        "text-[0.75rem] font-bold leading-[1rem] -tracking-[0.013125rem] text-000000 transition-colors",
        meta.errors ? "text-CD2C2C" : "",
      ].join(" ")}
      htmlFor={meta.id}
      {...props}
    />
  );
}

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  options: Parameters<typeof getInputProps>[1];
}

function Input(props: InputProps) {
  const { meta } = useControlContext();

  return (
    <input
      className="aria-invalid:border-CD2C2C aria-invalid:px-[1.375rem] aria-invalid:border-[0.125rem] peer col-span-full row-start-2 h-14 w-full rounded border-[0.0625rem] border-[hsl(0_0%_81%)] px-[1.4375rem] text-[0.875rem] font-bold leading-[1.1875rem] -tracking-[0.015625rem] text-000000 transition-colors placeholder:text-000000/40 hocus:border-D87D4A"
      {...getInputProps(meta, props.options)}
      {...props}
    />
  );
}

function ErrorMessage() {
  const { meta } = useControlContext();

  return (
    <p
      className={
        "text-CD2C2C peer-aria-invalid:opacity-100 text-[0.75rem] leading-[1rem] -tracking-[0.013125rem] opacity-0 transition-opacity"
      }
      id={meta.errorId}
    >
      {meta.errors ? meta.errors.join(", ") : null}
    </p>
  );
}
