import { useState } from "react";

function getRowCol(index: number) {
  return {
    row: Math.floor(index / 3),
    col: index % 3,
  };
}

// todo: Round to bounds
function round() {}

export function useCursor() {
  const [value, setValue] = useState(0);
  const { row } = getRowCol(value);

  return {
    value,
    up() {
      const nextValue = value - 3;
      const next = getRowCol(nextValue);
      if (next.row >= 0) {
        setValue(nextValue);
        return nextValue;
      }
      return value;
    },
    right() {
      const nextValue = value + 1;
      const next = getRowCol(nextValue);
      if (next.row === row) {
        setValue(nextValue);
        return nextValue;
      }
      return value;
    },
    down() {
      const nextValue = value + 3;
      const next = getRowCol(nextValue);
      if (next.row < 3) {
        setValue(nextValue);
        return nextValue;
      }
      return value;
    },
    left() {
      const nextValue = value - 1;
      const next = getRowCol(nextValue);
      if (next.row === row) {
        setValue(nextValue);
        return nextValue;
      }
      return value;
    },
  };
}
