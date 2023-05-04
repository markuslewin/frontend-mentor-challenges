import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

const invalidEmail = "abc";
const messages = {
  empty: "Oops! Please add your email",
  notFormattedCorrectly: "Oops! Please check your email",
};

test.describe("enhanced", () => {
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(/pod request access landing page/i);
  });

  test("displays the correct error message when empty", async ({ page }) => {
    const input = page.getByLabel("email");
    await expect(input).toBeEmpty();

    page.getByRole("button", { name: /request access/i }).click();

    await expect(page.getByText(messages.empty)).toBeAttached();
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toBeFocused();
  });

  test("displays the correct error message when not formatted correctly", async ({
    page,
  }) => {
    const input = page.getByLabel("email");

    input.fill(invalidEmail);
    input.press("Enter");

    await expect(page.getByText(messages.notFormattedCorrectly)).toBeAttached();
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toBeFocused();
  });
});

test.describe("no javascript", () => {
  test.use({ javaScriptEnabled: false });

  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(/pod request access landing page/i);
  });

  test("displays the correct error message when empty", async ({ page }) => {
    const input = page.getByLabel("email");
    await expect(input).toBeEmpty();

    page.getByRole("button", { name: /request access/i }).click();

    await expect(page.getByText(messages.empty)).toBeAttached();
    await expect(input).toHaveAttribute("aria-invalid", "true");
  });

  test("displays the correct error message when not formatted correctly", async ({
    page,
  }) => {
    const input = page.getByLabel("email");

    input.fill(invalidEmail);
    input.press("Enter");

    await expect(page.getByText(messages.notFormattedCorrectly)).toBeAttached();
    await expect(input).toHaveAttribute("aria-invalid", "true");
  });
});
