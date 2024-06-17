import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/my react template/i);
});

test("receives data from function", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByTestId("server-message")).toHaveText("Hello, world!");
});

test("has api endpoint landmark", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("region", { name: "api endpoint" }),
  ).toBeAttached();
});

test("runs tests in test node env", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByTestId("node-env")).toHaveText("test");
});
