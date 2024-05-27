import { useState } from "react";

export function useQuestions() {
  const [questions, setQuestions] = useState({
    preferences: {
      headingId: "preferences",
      label: "Preferences",
      open: false,
    },
    "bean-type": {
      headingId: "bean-type",
      label: "Bean type",
      open: false,
    },
    quantity: {
      headingId: "quantity",
      label: "Quantity",
      open: false,
    },
    "grind-option": {
      headingId: "grind-option",
      label: "Grind option",
      open: false,
    },
    deliveries: {
      headingId: "deliveries",
      label: "Deliveries",
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
