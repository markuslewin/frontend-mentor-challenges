import { getIsNighttime } from "#app/utils/time.js";
import { expect, test } from "vitest";

test.each([
  ["2024-06-17T04:59:59", true],
  ["2024-06-17T05:00:00", false],
  ["2024-06-17T16:54:58.537", false],
  ["2024-06-17T17:59:59", false],
  ["2024-06-17T18:00:00", true],
  ["2024-06-17T08:57:55-07:00", false],
])("calculates nighttime: %s -> %s", (iso, expected) => {
  const date = new Date(iso);

  expect(getIsNighttime(date)).toBe(expected);
});
