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
  useContext,
} from "react";
import { getTotals, type Receipt } from "~/app/_utils/cart";
import { currency } from "~/app/_utils/format";
import { checkoutSchema, type PaymentMethod } from "~/app/_utils/schema";
import { checkout } from "~/app/actions";
import * as Item from "~/app/checkout/_components/item";
import IconCashOnDelivery from "~/app/checkout/_assets/icon-cash-on-delivery.svg";

interface CheckoutFormProps {
  items: {
    id: number;
    shortName: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  onCheckout: (receipt: Receipt) => void;
}

export function CheckoutForm({ items, onCheckout }: CheckoutFormProps) {
  const [form, fields] = useForm({
    constraint: getZodConstraint(checkoutSchema),
    defaultValue: {
      paymentDetails: {
        paymentMethod: "e-money" satisfies PaymentMethod,
      },
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: checkoutSchema });
    },
    onSubmit: (evt, context) => {
      evt.preventDefault();

      if (items.length) {
        // todo: Fix API
        checkout(null, context.formData)
          .then((receipt) => {
            onCheckout(receipt);
          })
          .catch((err) => {
            // todo: Error UI
            console.error(err);
          });
      } else {
        // todo: Some nice UX for when the cart is empty
      }
    },
  });

  const billingDetails = fields.billingDetails.getFieldset();
  const shippingInfo = fields.shippingInfo.getFieldset();
  const paymentDetails = fields.paymentDetails.getFieldset();

  const { total, shipping, vat, grandTotal } = getTotals(items);

  return (
    <div className="center mt-6 desktop:mt-[2.375rem]">
      <form
        {...getFormProps(form)}
        className="desktop:layout grid gap-8 desktop:items-start desktop:gap-0"
      >
        <div className="rounded bg-FFFFFF px-6 py-8 tablet:px-7 tablet:py-8 desktop:col-[1/span_15] desktop:p-12 desktop:pt-14">
          <h1 className="text-[1.75rem] font-bold leading-[2.375rem] tracking-[0.0625rem] text-000000 tablet:text-h3">
            Checkout
          </h1>
          <h2 className="sr-only">Form</h2>
          <h3 className="mt-8 text-sub-title leading-[1.5625rem] text-D87D4A tablet:mt-10">
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
              <Input
                options={{ type: "tel" }}
                placeholder="+1 (202) 555-0136"
              />
              <ErrorMessage />
            </Control>
          </div>
          <div className="mt-8 tablet:mt-[3.3125rem]">
            <h3 className="text-sub-title leading-[1.5625rem] text-D87D4A">
              Shipping info
            </h3>
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
            <h3 className="text-sub-title leading-[1.5625rem] text-D87D4A">
              Payment details
            </h3>
            <fieldset
              {...getFieldsetProps(paymentDetails.paymentMethod)}
              className="mt-4 grid gap-x-4 tablet:grid-cols-2"
            >
              <legend className="sr-only">Payment method</legend>
              <p
                className="text-[0.75rem] font-bold leading-[1rem] -tracking-[0.013125rem] text-000000"
                aria-hidden="true"
              >
                Payment method
              </p>
              <div className="mt-4 grid gap-4 tablet:mt-0">
                {getCollectionProps(paymentDetails.paymentMethod, {
                  type: "radio",
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
                      <label
                        className="grid grid-cols-[auto_1fr] items-center gap-4"
                        key={props.id}
                      >
                        <input {...props} className="peer sr-only" />
                        <span className="col-span-full row-start-1 h-14 rounded border-[0.0625rem] text-CFCFCF transition-colors peer-checked:text-D87D4A peer-hover:text-D87D4A" />
                        <span className="col-start-1 row-start-1 ml-4 inline-grid size-5 place-content-center rounded-full border-[0.0625rem] border-CFCFCF text-D87D4A before:inline-block before:size-[0.625rem] before:rounded-inherit before:border-t-[0.625rem] before:opacity-0 before:transition-opacity peer-checked:before:opacity-100 peer-focus-visible:outline" />
                        <span className="col-start-2 row-start-1 text-[0.875rem] font-bold leading-[1.1875rem] -tracking-[0.015625rem] text-000000">
                          {props.value === "e-money"
                            ? "e-Money"
                            : props.value === "cash-on-delivery"
                              ? "Cash on Delivery"
                              : null}
                        </span>
                      </label>
                    );
                  },
                )}
              </div>
            </fieldset>
            {paymentDetails.paymentMethod.value === "e-money" ? (
              <div className="mt-8 grid gap-x-4 gap-y-6 tablet:mt-6 tablet:grid-cols-2">
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
            ) : null}
          </div>
          {paymentDetails.paymentMethod.value === "cash-on-delivery" ? (
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              <IconCashOnDelivery className="mt-[0.8125rem] size-12" />
              <p
                className="grow basis-64"
                data-testid="cash-on-delivery-instructions"
              >
                The ‘Cash on Delivery’ option enables you to pay in cash when
                our delivery courier arrives at your residence. Just make sure
                your address is correct so that your order will not be
                cancelled.
              </p>
            </div>
          ) : null}
        </div>
        <div
          className="rounded bg-FFFFFF px-6 py-8 text-000000/50 tablet:p-8 desktop:col-[17/span_7]"
          data-testid="summary"
        >
          <h2 className="text-[1.125rem] font-bold leading-[1.5625rem] tracking-[0.08125rem] text-000000 tablet:text-h6">
            Summary
          </h2>
          {items.length ? (
            <ul className="mt-8 grid gap-6" role="list">
              {items.map((item) => {
                return (
                  <Item.Root
                    key={item.id}
                    price={item.price}
                    quantity={item.quantity}
                    image={item.image}
                  >
                    <Item.Heading>{item.shortName}</Item.Heading>
                  </Item.Root>
                );
              })}
            </ul>
          ) : null}
          <div className="mt-8 grid gap-2">
            <p className="flex flex-wrap items-center justify-between gap-4">
              <span className="uppercase">
                Total<span className="sr-only">:</span>
              </span>{" "}
              <strong className="text-[1.125rem] text-000000">
                {currency(total)}
              </strong>
            </p>
            <p className="flex flex-wrap items-center justify-between gap-4">
              <span className="uppercase">
                Shipping<span className="sr-only">:</span>
              </span>{" "}
              <strong className="text-[1.125rem] text-000000">
                {currency(shipping)}
              </strong>
            </p>
            <p className="flex flex-wrap items-center justify-between gap-4">
              <span className="uppercase">
                VAT (included)<span className="sr-only">:</span>
              </span>{" "}
              <strong className="text-[1.125rem] text-000000">
                {currency(vat)}
              </strong>
            </p>
          </div>
          <p className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <span className="uppercase">
              Grand total<span className="sr-only">:</span>
            </span>{" "}
            <strong className="text-[1.125rem] text-D87D4A">
              {currency(grandTotal)}
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
      className="peer col-span-full row-start-2 h-14 w-full rounded border-[0.0625rem] border-CFCFCF px-[1.4375rem] text-[0.875rem] font-bold leading-[1.1875rem] -tracking-[0.015625rem] text-000000 transition-colors placeholder:text-000000/40 aria-invalid:border-[0.125rem] aria-invalid:border-CD2C2C aria-invalid:px-[1.375rem] hocus:border-D87D4A"
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
        "text-[0.75rem] leading-[1rem] -tracking-[0.013125rem] text-CD2C2C opacity-0 transition-opacity peer-aria-invalid:opacity-100"
      }
      id={meta.errorId}
    >
      {meta.errors ? meta.errors.join(", ") : null}
    </p>
  );
}
