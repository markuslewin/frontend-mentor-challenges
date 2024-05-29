import { useState } from "react";
import { useLocation } from "react-router-dom";
import { z } from "zod";

const headingIdSchema = z.enum([
  "preferences",
  "bean-type",
  "quantity",
  "grind-option",
  "deliveries",
]);

type HeadingId = z.infer<typeof headingIdSchema>;

const preferencesHeadingId: HeadingId = "preferences";
const beanTypeHeadingId: HeadingId = "bean-type";
const quantityHeadingId: HeadingId = "quantity";
const grindOptionHeadingId: HeadingId = "grind-option";
const deliveriesHeadingId: HeadingId = "deliveries";

const idByHeadingId = {
  [preferencesHeadingId]: "preferences",
  [beanTypeHeadingId]: "bean-type",
  [quantityHeadingId]: "quantity",
  [grindOptionHeadingId]: "grind-option",
  [deliveriesHeadingId]: "deliveries",
} as const;

const shipmentPrice = {
  // Not sure what to do with `none`
  none: {
    "every-week": 7.2,
    "every-2-weeks": 9.6,
    "every-month": 12,
  },
  "250g": {
    "every-week": 7.2,
    "every-2-weeks": 9.6,
    "every-month": 12,
  },
  "500g": {
    "every-week": 13,
    "every-2-weeks": 17.5,
    "every-month": 22,
  },
  "1000g": {
    "every-week": 22,
    "every-2-weeks": 32,
    "every-month": 42,
  },
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "narrowSymbol",
});

// todo: Move form state into hook?
export function useQuestions({
  selectedQuantity,
}: {
  selectedQuantity: "250g" | "500g" | "1000g" | null;
}) {
  const location = useLocation();

  const hash = location.hash.replace(/^#/, "");
  const result = headingIdSchema.safeParse(hash);
  const initiallyOpenQuestionId = result.success
    ? idByHeadingId[result.data]
    : "preferences";

  const [questions, setQuestions] = useState({
    preferences: {
      label: "Preferences",
      headingId: preferencesHeadingId,
      heading: "How do you drink your coffee?",
      options: [
        {
          id: "capsule",
          label: "Capsule",
          description: "Compatible with Nespresso systems and similar brewers",
        },
        {
          id: "filter",
          label: "Filter",
          description:
            "For pour over or drip methods like Aeropress, Chemex, and V60",
        },
        {
          id: "espresso",
          label: "Espresso",
          description:
            "Dense and finely ground beans for an intense, flavorful experience",
        },
      ],
      open: initiallyOpenQuestionId === "preferences",
    },
    "bean-type": {
      label: "Bean type",
      headingId: beanTypeHeadingId,
      heading: "What type of coffee?",
      options: [
        {
          id: "single-origin",
          label: "Single origin",
          description:
            "Distinct, high quality coffee from a specific family-owned farm",
        },
        {
          id: "decaf",
          label: "Decaf",
          description:
            "Just like regular coffee, except the caffeine has been removed",
        },
        {
          id: "blended",
          label: "Blended",
          description:
            "Combination of two or three dark roasted beans of organic coffees",
        },
      ],
      open: initiallyOpenQuestionId === "bean-type",
    },
    quantity: {
      label: "Quantity",
      headingId: quantityHeadingId,
      heading: "How much would you like?",
      options: [
        {
          id: "250g",
          label: "250g",
          description:
            "Perfect for the solo drinker. Yields about 12 delicious cups.",
        },
        {
          id: "500g",
          label: "500g",
          description:
            "Perfect option for a couple. Yields about 40 delectable cups.",
        },
        {
          id: "1000g",
          label: "1000g",
          description:
            "Perfect for offices and events. Yields about 90 delightful cups.",
        },
      ],
      open: initiallyOpenQuestionId === "quantity",
    },
    "grind-option": {
      label: "Grind option",
      headingId: grindOptionHeadingId,
      heading: "Want us to grind them?",
      options: [
        {
          id: "wholebean",
          label: "Wholebean",
          description: "Best choice if you cherish the full sensory experience",
        },
        {
          id: "filter",
          label: "Filter",
          description:
            "For drip or pour-over coffee methods such as V60 or Aeropress",
        },
        {
          id: "cafetiére",
          label: "Cafetiére",
          description:
            "Course ground beans specially suited for french press coffee",
        },
      ],
      open: initiallyOpenQuestionId === "grind-option",
    },
    deliveries: {
      label: "Deliveries",
      headingId: deliveriesHeadingId,
      heading: "How often should we deliver?",
      options: [
        {
          id: "every-week",
          label: "Every week",
        },
        {
          id: "every-2-weeks",
          label: "Every 2 weeks",
        },
        {
          id: "every-month",
          label: "Every month",
        },
      ],
      open: initiallyOpenQuestionId === "deliveries",
    },
  } as const);

  const deliveriesDescriptions = {
    "every-week": `${currencyFormatter.format(shipmentPrice[selectedQuantity ?? "none"]["every-week"])} per shipment. Includes free first-class shipping.`,
    "every-2-weeks": `${currencyFormatter.format(shipmentPrice[selectedQuantity ?? "none"]["every-2-weeks"])} per shipment. Includes free priority shipping.`,
    "every-month": `${currencyFormatter.format(shipmentPrice[selectedQuantity ?? "none"]["every-month"])} per shipment. Includes free priority shipping.`,
  };

  const derivedQuestions = {
    ...questions,
    deliveries: {
      ...questions.deliveries,
      options: questions.deliveries.options.map((option) => {
        return { ...option, description: deliveriesDescriptions[option.id] };
      }),
    },
  };

  return {
    data: derivedQuestions,
    setOpen(id: keyof typeof questions, next: boolean) {
      setQuestions({
        ...questions,
        [id]: {
          ...questions[id],
          open: next,
        },
      });
    },
  };
}
