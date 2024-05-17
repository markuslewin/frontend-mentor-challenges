import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/my react template/i);
});

test("receives data from function", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "API endpoint" }).click();

  await expect(page.getByText(/hello, world/i)).toBeVisible();
});
