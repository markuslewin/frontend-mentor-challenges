"use client";

import { forwardRef, useImperativeHandle, useState } from "react";

export interface QuantitySelectRef {
  reset: () => void;
}

export interface QuantitySelectProps {
  size: "small" | "large";
  name?: string;
  defaultValue?: number;
  value?: number;
  min?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
}

export const QuantitySelect = forwardRef<
  QuantitySelectRef,
  QuantitySelectProps
>(
  (
    {
      size,
      name,
      defaultValue,
      value: controlledValue,
      min = 0,
      disabled,
      onChange,
    },
    ref,
  ) => {
    const initialValue = defaultValue ?? min;
    const [uncontrolledValue, setUncontrolledValue] = useState(initialValue);
    const setValue = (value: number) => {
      setUncontrolledValue(value);
      onChange?.(value);
    };

    useImperativeHandle(ref, () => {
      return {
        reset: () => {
          setUncontrolledValue(initialValue);
        },
      };
    });

    const value = controlledValue ?? uncontrolledValue;
    const canIncrement = !disabled;
    const canDecrement = !disabled && value > min;

    return (
      <fieldset className="grid">
        <legend className="sr-only">Select quantity</legend>
        <input type="hidden" name={name} value={value} />
        <div
          className={[
            "inline-grid bg-F1F1F1 text-sub-title text-000000/25",
            size === "small" ? "h-8 min-w-24 grid-cols-[2rem_1fr_2rem]" : "",
            size === "large"
              ? "h-12 min-w-[7.5rem] grid-cols-[3rem_1fr_3rem]"
              : "",
          ].join(" ")}
        >
          <p className="self-center text-center text-000000" aria-live="polite">
            <span className="sr-only">Quantity: </span> {value}
          </p>
          <button
            className="order-first outline-offset-0 transition-colors hocus:text-D87D4A"
            type="button"
            aria-disabled={!canDecrement}
            onClick={() => {
              if (canDecrement) {
                setValue(value - 1);
              }
            }}
          >
            <span aria-hidden="true">-</span>
            <span className="sr-only">Decrement quantity</span>
          </button>
          <button
            className="outline-offset-0 transition-colors hocus:text-D87D4A"
            type="button"
            aria-disabled={!canIncrement}
            onClick={() => {
              if (canIncrement) {
                setValue(value + 1);
              }
            }}
          >
            <span aria-hidden="true">+</span>
            <span className="sr-only">Increment quantity</span>
          </button>
        </div>
      </fieldset>
    );
  },
);
QuantitySelect.displayName = "QuantitySelect";
