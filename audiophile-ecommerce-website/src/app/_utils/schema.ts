import { z } from "zod";

export const quantityKey = "quantity";

export const addToCartSchema = z.object({
  [quantityKey]: z.number(),
});

export const checkoutSchema = z.object({
  billingDetails: z.object({
    name: z.string(),
    emailAddress: z.string().email({ message: "Wrong format" }),
    phoneNumber: z.string(),
  }),
  shippingInfo: z.object({
    address: z.string(),
    zipCode: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  paymentDetails: z.discriminatedUnion("paymentMethod", [
    z.object({
      paymentMethod: z.literal("e-money"),
      eMoneyNumber: z.string(),
      eMoneyPin: z.string(),
    }),
    z.object({
      paymentMethod: z.literal("cash-on-delivery"),
    }),
  ]),
});

export type Checkout = z.infer<typeof checkoutSchema>;
export type PaymentMethod = Checkout["paymentDetails"]["paymentMethod"];
