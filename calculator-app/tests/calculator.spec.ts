import { test, expect } from "@playwright/test";

// Checks wiring. Calculator core is tested with unit tests.

test("buttons work", async ({ page }) => {
  const display = page.getByRole("status", { name: "screen" });

  await page.goto("/");

  await page.getByRole("button", { name: "1" }).click();

  await expect(display).toHaveText("1");

  await page.getByRole("button", { name: "2" }).click();

  await expect(display).toHaveText("12");

  await page.getByRole("button", { name: "3" }).click();

  await expect(display).toHaveText("123");

  await page.getByRole("button", { name: "4" }).click();

  await expect(display).toHaveText("1234");

  await page.getByRole("button", { name: "5" }).click();

  await expect(display).toHaveText("12345");

  await page.getByRole("button", { name: "6" }).click();

  await expect(display).toHaveText("123456");

  await page.getByRole("button", { name: "7" }).click();

  await expect(display).toHaveText("1234567");

  await page.getByRole("button", { name: "8" }).click();

  await expect(display).toHaveText("12345678");

  await page.getByRole("button", { name: "9" }).click();

  await expect(display).toHaveText("123456789");

  await page.getByRole("button", { name: "decimal separator" }).click();

  await expect(display).toHaveText("123456789.");

  await page.getByRole("button", { name: "0" }).click();

  await expect(display).toHaveText("123456789.0");

  await page.getByRole("button", { name: "delete" }).click();

  await expect(display).toHaveText("123456789.");

  await page.getByRole("button", { name: "reset" }).click();

  await expect(display).toHaveText("0");

  await page.getByRole("button", { name: "1" }).click();
  await page.getByRole("button", { name: "add" }).click();
  await page.getByRole("button", { name: "2" }).click();
  await page.getByRole("button", { name: "equals" }).click();

  await expect(display).toHaveText("3");

  await page.getByRole("button", { name: "3" }).click();
  await page.getByRole("button", { name: "subtract" }).click();
  await page.getByRole("button", { name: "4" }).click();
  await page.getByRole("button", { name: "equals" }).click();

  await expect(display).toHaveText("-1");

  await page.getByRole("button", { name: "5" }).click();
  await page.getByRole("button", { name: "multiply" }).click();
  await page.getByRole("button", { name: "6" }).click();
  await page.getByRole("button", { name: "equals" }).click();

  await expect(display).toHaveText("30");

  await page.getByRole("button", { name: "8" }).click();
  await page.getByRole("button", { name: "divide" }).click();
  await page.getByRole("button", { name: "1" }).click();
  await page.getByRole("button", { name: "6" }).click();
  await page.getByRole("button", { name: "equals" }).click();

  await expect(display).toHaveText("0.5");
});
