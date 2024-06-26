import {
  formatTime,
  getGreeting,
  getIsNighttime,
  greeting,
} from "#app/utils/time";
import { expect, test } from "vitest";

test.each([
  ["2024-06-17T04:59:59", true],
  ["2024-06-17T05:00:00", false],
  ["2024-06-17T16:54:58.537", false],
  ["2024-06-17T17:59:59", false],
  ["2024-06-17T18:00:00", true],
])("calculates nighttime: %s -> %s", (iso, expected) => {
  const date = new Date(iso);

  expect(getIsNighttime(date)).toBe(expected);
});

test.each([
  ["2024-06-17T04:59:59", greeting.evening],
  ["2024-06-17T05:00:00", greeting.morning],
  ["2024-06-17T11:59:59", greeting.morning],
  ["2024-06-17T12:00:00", greeting.afternoon],
  ["2024-06-17T16:54:58.537", greeting.afternoon],
  ["2024-06-17T17:59:59", greeting.afternoon],
  ["2024-06-17T18:00:00", greeting.evening],
])("calculates greeting: %s -> %s", (iso, expected) => {
  const date = new Date(iso);

  expect(getGreeting(date)).toBe(expected);
});

test.each([
  ["2024-06-17T04:59:59", "04:59"],
  ["2024-06-17T05:00:00", "05:00"],
  ["2024-06-17T11:59:59", "11:59"],
  ["2024-06-17T12:00:00", "12:00"],
  ["2024-06-17T16:54:58.537", "16:54"],
  ["2024-06-17T17:59:59", "17:59"],
  ["2024-06-17T18:00:00", "18:00"],
])("formats time: %s -> %s", (iso, expected) => {
  const date = new Date(iso);

  expect(formatTime(date)).toBe(expected);
});
