import { expect, test } from "vitest";
import { Calculator, CalculatorNumber, Operator } from "./calculator";

function runSequence(calculator: Calculator, sequence: string) {
  for (const char of sequence) {
    if ("0123456789".includes(char)) {
      calculator.typeNumber(parseInt(char, 10) as CalculatorNumber);
    } else if ("+-/x".includes(char)) {
      calculator.typeOperator(char as Operator);
    } else if (char === ".") {
      calculator.typeDecimal();
    } else if (char === "=") {
      calculator.equals();
    }
  }
}

test("starts at 0", () => {
  const calculator = new Calculator();

  expect(calculator.display).toBe("0");
});

test.each([
  ["1+1+", "2"],
  ["1+1+=", "4"],
  ["1+2+3+", "6"],
  ["1+2+3+=", "12"],
  ["1-1-", "0"],
  ["1-1-=", "0"],
  ["1-1-1-=", "0"],
])("Chain operators: %s -> %s", (sequence, expected) => {
  const calculator = new Calculator();

  runSequence(calculator, sequence);

  expect(calculator.display).toBe(expected);
});

test.each([
  [".", "0."],
  ["..", "0."],
  ["1.", "1."],
  ["1.2", "1.2"],
  ["1.2.", "1.2"],
  ["1.2+1=", "2.2"],
  ["1+1=.", "0."],
])("Decimals: %s -> %s", (sequence, expected) => {
  const calculator = new Calculator();

  runSequence(calculator, sequence);

  expect(calculator.display).toBe(expected);
});

test.each([
  ["1", "1"],
  ["1=", "1"],
  ["1+=", "2"],
  ["1+1=", "2"],
  ["1+1==", "3"],
  ["1+2", "2"],
  ["1+2=", "3"],
  ["1+2==", "5"],
  ["1+1=3", "3"],
  ["1+1=3=", "4"],
  ["1+1=3=+", "4"],
  ["1+1=3+5", "5"],
  ["1+1=3+5=", "8"],
  ["1+1=3+5==", "13"],
  ["10", "10"],
  ["10+10", "10"],
  ["10+10=", "20"],
])("Addition: %s -> %s", (sequence, expected) => {
  const calculator = new Calculator();

  runSequence(calculator, sequence);

  expect(calculator.display).toBe(expected);
});

test.each([
  ["1-1=", "0"],
  ["1-2=", "-1"],
  ["123-321=", "-198"],
])("Subtraction: %s -> %s", (sequence, expected) => {
  const calculator = new Calculator();

  runSequence(calculator, sequence);

  expect(calculator.display).toBe(expected);
});
