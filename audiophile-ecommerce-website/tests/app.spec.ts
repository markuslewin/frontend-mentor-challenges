import { test, expect } from "@playwright/test";

test("has home title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/audiophile/i);
});

test("has category title", async ({ page }) => {
  await page.goto("/headphones");

  await expect(page).toHaveTitle(/headphones/i);
});

test("has product title", async ({ page }) => {
  await page.goto("/product/xx99-mark-two-headphones");

  await expect(page).toHaveTitle(/xx99 mark ii headphones/i);
});

test("has checkout title", async ({ page }) => {
  await page.goto("/checkout");

  await expect(page).toHaveTitle(/checkout/i);
});
