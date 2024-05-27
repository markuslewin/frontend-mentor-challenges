import { useState } from "react";

export function useQuestions() {
  const [questions, setQuestions] = useState({
    preferences: {
      label: "Preferences",
      headingId: "preferences",
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
      open: false,
    },
    "bean-type": {
      label: "Bean type",
      headingId: "bean-type",
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
      open: false,
    },
    quantity: {
      label: "Quantity",
      headingId: "quantity",
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
      open: false,
    },
    "grind-option": {
      label: "Grind option",
      headingId: "grind-option",
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
      open: false,
    },
    deliveries: {
      label: "Deliveries",
      headingId: "deliveries",
      heading: "How often should we deliver?",
      options: [
        {
          id: "every-week",
          label: "Every week",
          description:
            "$14.00 per shipment. Includes free first-class shipping.",
        },
        {
          id: "every-2-weeks",
          label: "Every 2 weeks",
          description: "$17.25 per shipment. Includes free priority shipping.",
        },
        {
          id: "every-month",
          label: "Every month",
          description: "$22.50 per shipment. Includes free priority shipping.",
        },
      ],
      open: false,
    },
  } as const);

  return {
    data: questions,
    open(id: keyof typeof questions, next: boolean) {
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
