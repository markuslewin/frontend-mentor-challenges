import { useCallback, useRef, useSyncExternalStore } from "react";

export type CalculatorNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Operator = "+" | "-" | "/" | "x";

export class Calculator {
  private state:
    | "operand1.new"
    | "operand1.append"
    | "operand2.new"
    | "operand2.append";
  private operand1: string;
  private operand2: string;
  private operator: Operator | null;
  private _display: string;
  private _listeners: (() => void)[];

  constructor() {
    this.state = "operand1.new";
    this.operand1 = "";
    this.operand2 = "";
    this.operator = null;
    this._display = "0";
    this._listeners = [];
  }

  get display() {
    return this._display;
  }

  subscribe(listener: () => void) {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter((l) => l !== listener);
    };
  }

  private _setDisplay(value: string) {
    this._display = value;
    for (const listener of this._listeners) {
      listener();
    }
  }

  private get _operation() {
    if (this.operator === null) {
      return null;
    }
    return (
      {
        "+"(a, b) {
          return `${a + b}`;
        },
        "-"(a, b) {
          return `${a - b}`;
        },
        "/"(a, b) {
          if (b === 0) {
            if (a === 0) return "Result is undefined";
            return "Cannot divide by zero";
          }
          return `${a / b}`;
        },
        x(a, b) {
          return `${a * b}`;
        },
      } satisfies { [O in Operator]: (a: number, b: number) => string }
    )[this.operator];
  }

  private _reset() {
    this.state = "operand1.new";
    this.operand1 = "";
    this.operand2 = "";
    this.operator = null;
  }

  reset() {
    this._reset();
    this._setDisplay("0");
  }

  typeNumber(number: CalculatorNumber) {
    switch (this.state) {
      case "operand1.new":
        if (number === 0) break;

        this.operand1 = number.toString();
        this._setDisplay(this.operand1);
        this.state = "operand1.append";
        break;
      case "operand1.append":
        if (number === 0 && this.operand1 === "0") break;

        this.operand1 += number;
        this._setDisplay(this.operand1);
        break;
      case "operand2.new":
        this.operand2 = number.toString();
        this._setDisplay(this.operand2);
        this.state = "operand2.append";
        break;
      case "operand2.append":
        if (number === 0 && this.operand2 === "0") break;

        // todo: Merge `*.new` and `*.append` states?
        this.operand2 =
          this.operand2 === "0" ? number.toString() : this.operand2 + number;
        this._setDisplay(this.operand2);
        break;
    }
  }

  typeDecimal() {
    switch (this.state) {
      case "operand1.new":
        this.operand1 = "0.";
        this._setDisplay(this.operand1);
        this.state = "operand1.append";
        break;
      case "operand1.append":
        if (this.operand1.includes(".")) {
          break;
        }
        this.operand1 += ".";
        this._setDisplay(this.operand1);
        break;
      case "operand2.new":
        this.operand2 = "0.";
        this._setDisplay(this.operand2);
        this.state = "operand2.append";
        break;
      case "operand2.append":
        if (this.operand2.includes(".")) {
          break;
        }
        this.operand2 += ".";
        this._setDisplay(this.operand2);
        break;
    }
  }

  typeOperator(operator: Operator) {
    // todo: Always write from display to operand1 here
    if (this.operand1 === "") {
      this.operand1 = "0";
    }
    if (this.state === "operand2.append") {
      const result = this.calculate();
      if (
        result === "Cannot divide by zero" ||
        result === "Result is undefined"
      ) {
        this._setDisplay(result);
        this._reset();
        return;
      }

      this._setDisplay(result);
      this.operand1 = result;
      this.operand2 = result;
    }
    this.operator = operator;
    this.state = "operand2.new";
  }

  private calculate() {
    const operation = this._operation;
    if (operation === null) {
      // todo: Make operands numbers
      // todo: Return `result.type`
      if (this.operand1 === "") return "0";
      return this.operand1;
    }

    const operand1 = parseFloat(this.operand1);
    const operand2 =
      this.operand2 === "" ? operand1 : parseFloat(this.operand2);
    return operation(operand1, operand2);
  }

  equals() {
    const result = this.calculate();
    // todo: Check `result.type`
    if (
      result === "Cannot divide by zero" ||
      result === "Result is undefined"
    ) {
      this._setDisplay(result);
      this._reset();
      return;
    }

    this._setDisplay(result);
    this.operand1 = result;
    this.state = "operand1.new";
  }

  delete() {
    switch (this.state) {
      case "operand1.append": {
        const next = this.operand1.slice(0, this.operand1.length - 1);
        if (next === "") {
          this._setDisplay("0");
          this.operand1 = "0";
          this.state = "operand1.new";
          break;
        }
        this._setDisplay(next);
        this.operand1 = next;
        break;
      }
      case "operand2.append": {
        const next = this.operand2.slice(0, this.operand2.length - 1);
        if (next === "") {
          this._setDisplay("0");
          this.operand2 = "0";
          this.state = "operand2.new";
          break;
        }
        this._setDisplay(next);
        this.operand2 = next;
        break;
      }
    }
  }
}

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
