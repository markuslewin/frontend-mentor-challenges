import { useSyncExternalStore, useRef, useCallback, ReactNode } from "react";
import { ButtonProps } from "../../components/button";
import { CellProps } from "../../components/grid";
import { Calculator, CalculatorNumber, Operator } from "./core";

type Subscribe = Parameters<typeof useSyncExternalStore>[0];

export function useCalculator() {
  const calculatorRef = useRef(new Calculator());
  const subscribe = useCallback<Subscribe>((callback) => {
    return calculatorRef.current.subscribe(callback);
  }, []);
  const display = useSyncExternalStore(
    subscribe,
    () => calculatorRef.current.display
  );

  return {
    display,
    buttons: getCalculatorButtons(calculatorRef.current),
    typeDecimal() {
      calculatorRef.current.typeDecimal();
    },
    typeNumber(number: CalculatorNumber) {
      calculatorRef.current.typeNumber(number);
    },
    typeOperator(operator: Operator) {
      calculatorRef.current.typeOperator(operator);
    },
    equals() {
      calculatorRef.current.equals();
    },
    reset() {
      calculatorRef.current.reset();
    },
    delete() {
      calculatorRef.current.delete();
    },
  };
}

function getCalculatorButtons(calculator: Calculator): {
  label: ReactNode;
  name?: ReactNode;
  span?: CellProps["span"];
  textTransform?: ButtonProps["textTransform"];
  variant?: ButtonProps["variant"];
  onClick(): void;
}[][] {
  return [
    [
      {
        label: 7,
        onClick() {
          calculator.typeNumber(7);
        },
      },
      {
        label: 8,
        onClick() {
          calculator.typeNumber(8);
        },
      },
      {
        label: 9,
        onClick() {
          calculator.typeNumber(9);
        },
      },
      {
        label: "del",
        name: "Delete",
        textTransform: "uppercase" as const,
        variant: "destructive",
        onClick() {
          calculator.delete();
        },
      },
    ],
    [
      {
        label: 4,
        onClick() {
          calculator.typeNumber(4);
        },
      },
      {
        label: 5,
        onClick() {
          calculator.typeNumber(5);
        },
      },
      {
        label: 6,
        onClick() {
          calculator.typeNumber(6);
        },
      },
      {
        label: "+",
        name: "Add",
        onClick() {
          calculator.typeOperator("+");
        },
      },
    ],
    [
      {
        label: 1,
        onClick() {
          calculator.typeNumber(1);
        },
      },
      {
        label: 2,
        onClick() {
          calculator.typeNumber(2);
        },
      },
      {
        label: 3,
        onClick() {
          calculator.typeNumber(3);
        },
      },
      {
        label: "-",
        name: "Subtract",
        onClick() {
          calculator.typeOperator("-");
        },
      },
    ],
    [
      {
        label: ".",
        name: "Decimal separator",
        onClick() {
          calculator.typeDecimal();
        },
      },
      {
        label: 0,
        onClick() {
          calculator.typeNumber(0);
        },
      },
      {
        label: "/",
        name: "Divide",
        onClick() {
          calculator.typeOperator("/");
        },
      },
      {
        label: "x",
        name: "Multiply",
        onClick() {
          calculator.typeOperator("x");
        },
      },
    ],
    [
      {
        label: "Reset",
        textTransform: "uppercase" as const,
        variant: "destructive",
        span: 2,
        onClick() {
          calculator.reset();
        },
      },
      {
        label: "=",
        name: "Equals",
        variant: "equals",
        span: 2,
        onClick() {
          calculator.typeNumber(0);
        },
      },
    ],
  ];
}
