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
    } else if (char === "r") {
      calculator.reset();
    } else if (char === "d") {
      calculator.delete();
    }
  }
}

test("starts at 0", () => {
  const calculator = new Calculator();

  expect(calculator.display).toBe("0");
});

test.each([
  ["00", "0"],
  ["00.", "0."],
  ["00.0", "0.0"],
  ["00.00", "0.00"],
  ["1+0", "0"],
  ["1+00", "0"],
  ["1+00.0", "0.0"],
  ["01", "1"],
  ["1+01", "1"],
  ["0.+", "0"],
])("Zero handling: %s -> %s", (sequence, expected) => {
  const calculator = new Calculator();

  runSequence(calculator, sequence);

  expect(calculator.display).toBe(expected);
});

test.each([
  ["9r", "0"],
  ["9+9r", "0"],
  ["9+9=r", "0"],
  ["9+9+r", "0"],
  ["9+9r8-7=", "1"],
])("Reset: %s -> %s", (sequence, expected) => {
  const calculator = new Calculator();

  runSequence(calculator, sequence);

  expect(calculator.display).toBe(expected);
});

test.each([
  ["d", "0"],
  ["7d", "0"],
  ["77d", "7"],
  ["123d", "12"],
  ["7+d", "7"],
  ["7+4d", "0"],
  ["7+44d", "4"],
  ["7+123d", "12"],
  ["7+4d1=", "8"],
  ["7+4d1=d", "8"],
  ["4+5=", "9"],
  ["6.d", "6"],
  ["6.1d", "6."],
  ["6.12d", "6.1"],
  ["1+6.d", "6"],
  ["1+6.1d", "6."],
  ["1+6.12d", "6.1"],
])("Delete: %s -> %s", (sequence, expected) => {
  const calculator = new Calculator();

  runSequence(calculator, sequence);

  expect(calculator.display).toBe(expected);
});

test.each([
  ["1+1+", "2"],
  ["1+1+=", "4"],
  ["1+2+3+", "6"],
  ["1+2+3+=", "12"],
  ["++1+", "1"],
  ["++1+2+", "3"],
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
  ["-1-1=", "-2"],
  ["1-1=", "0"],
  ["1-2=", "-1"],
  ["123-321=", "-198"],
])("Subtraction: %s -> %s", (sequence, expected) => {
  const calculator = new Calculator();

  runSequence(calculator, sequence);

  expect(calculator.display).toBe(expected);
});

test.each([
  ["1=", "1"],
  ["1==", "1"],
])("Equals: %s -> %s", (sequence, expected) => {
  const calculator = new Calculator();

  runSequence(calculator, sequence);

  expect(calculator.display).toBe(expected);
});

test.each([
  ["3/1=", "3"],
  ["3/2=", "1.5"],
  ["0/0=", "Result is undefined"],
  ["0/0==", "0"],
  ["3/0=", "Cannot divide by zero"],
  ["3/0==", "0"],
  ["3/0=100=", "100"],
  ["3/0-100=", "100"],
])("Division: %s -> %s", (sequence, expected) => {
  const calculator = new Calculator();

  runSequence(calculator, sequence);

  expect(calculator.display).toBe(expected);
});

// todo: Error state
test.skip.each([
  ["0/0=", "Result is undefined"],
  ["0/0=1", "1"],
  ["0/0/", "Result is undefined"],
  ["0/0//", "Result is undefined"],
  ["0/0+", "Result is undefined"],
  ["0/0++", "Result is undefined"],
  ["0/0/1", "1"],
  ["1/0=", "Cannot divide by zero"],
  ["1/0=1", "1"],
  ["1/0/", "Cannot divide by zero"],
  ["1/0//", "Cannot divide by zero"],
  ["1/0/1", "1"],
])("Error state: %s -> %s", (sequence, expected) => {
  const calculator = new Calculator();

  runSequence(calculator, sequence);

  expect(calculator.display).toBe(expected);
});
