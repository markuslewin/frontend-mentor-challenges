import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

const validEmail = "john@mail.com";
const invalidEmail = "john#mail.com";
const messages = {
  empty: "Oops! Please add your email",
  notFormattedCorrectly: "Oops! Please check your email",
};

test.describe("base", () => {
  test.use({ javaScriptEnabled: false });

  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(/pod request access landing page/i);
  });

  test("doesn't focus input on initial load", async ({ page }) => {
    const input = page.getByLabel("email");

    await expect(input).not.toBeFocused();
  });

  test("displays the correct error message when empty", async ({ page }) => {
    const input = page.getByLabel("email");
    await expect(input).toBeEmpty();

    await page.getByRole("button", { name: /request access/i }).click();

    await expect(page.getByText(messages.empty)).toBeAttached();
    await expect(input).toBeEmpty();
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toBeFocused();
  });

  test("displays the correct error message when not formatted correctly", async ({
    page,
  }) => {
    const input = page.getByLabel("email");

    await input.fill(invalidEmail);
    await input.press("Enter");

    await expect(page.getByText(messages.notFormattedCorrectly)).toBeAttached();
    await expect(input).toHaveValue(invalidEmail);
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toBeFocused();
  });
});

test.describe("enhancements", () => {
  test("shows feedback as user types", async ({ page }) => {
    const input = page.getByLabel("email");
    const feedback = page.locator("#email-description");

    await input.fill(invalidEmail);

    await expect(feedback).toBeEmpty();

    await input.press("Tab");

    await expect(feedback).not.toBeEmpty();

    await input.fill(invalidEmail);

    await expect(feedback).not.toBeEmpty();

    await input.fill(validEmail);

    await expect(feedback).toBeEmpty();
  });

  test("shows live feedback after submit", async ({ page }) => {
    const input = page.getByLabel("email");
    const feedback = page.locator("#email-description");

    await input.fill(invalidEmail);

    await expect(feedback).toBeEmpty();

    await input.press("Enter");

    await expect(feedback).not.toBeEmpty();

    await input.fill(invalidEmail);

    await expect(feedback).not.toBeEmpty();

    await input.fill(validEmail);

    await expect(feedback).toBeEmpty();
  });
});
