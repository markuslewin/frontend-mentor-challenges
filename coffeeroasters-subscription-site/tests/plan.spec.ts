import { test, expect, Page, Locator } from "@playwright/test";

function getQuestions(page: Page) {
  return page
    .getByRole("region", { name: "order options" })
    .getByRole("heading")
    .getByRole("button");
}

function getTrigger(locator: Locator | Page, question: string) {
  return locator.getByRole("heading", { name: question }).getByRole("button");
}

async function answer(
  locator: Locator | Page,
  question: string,
  option: string
) {
  const region = locator.getByRole("region", { name: "order options" });

  const trigger = getTrigger(region, question);
  const isOpen = (await trigger.getAttribute("aria-expanded")) === "true";
  if (!isOpen) {
    trigger.click();
  }

  await region
    .getByRole("group", { name: question })
    .getByRole("radio", { name: option })
    .check({ force: true });
}

test("has 5 questions", async ({ page }) => {
  await page.goto("/plan");

  const questions = getQuestions(page);

  await expect(questions).toHaveCount(5);
});

test("first question is open", async ({ page }) => {
  await page.goto("/plan");

  const questions = getQuestions(page);
  const first = questions.first();

  await expect(first).toHaveAttribute("aria-expanded", "true");
  const count = await questions.count();
  for (let i = 1; i < count; ++i) {
    await expect(questions.nth(i)).toHaveAttribute("aria-expanded", "false");
  }
});

test("tracks progress", async ({ page }) => {
  await page.goto("/plan");

  const progressItems = page
    .getByRole("region", { name: "order progress" })
    .getByRole("listitem")
    .getByRole("button");

  await expect(progressItems.first()).toHaveAttribute("aria-current", "step");
  const count = await progressItems.count();
  for (let i = 1; i < count; ++i) {
    await expect(progressItems.nth(i)).not.toHaveAttribute("aria-current");
  }

  await answer(page, "how do you drink your coffee?", "filter");

  await expect(progressItems.first()).not.toHaveAttribute("aria-current");
  await expect(progressItems.nth(1)).toHaveAttribute("aria-current", "step");

  await answer(page, "what type of coffee?", "single origin");

  await expect(progressItems.nth(2)).toHaveAttribute("aria-current", "step");

  await answer(page, "how much would you like?", "250g");

  await expect(progressItems.nth(3)).toHaveAttribute("aria-current", "step");

  await answer(page, "want us to grind them?", "wholebean");

  await expect(progressItems.nth(4)).toHaveAttribute("aria-current", "step");

  await answer(page, "how often should we deliver?", "every week");

  await expect(progressItems.nth(4)).toHaveAttribute("aria-current", "step");
});

test("capsule disables grind option", async ({ page }) => {
  await page.goto("/plan");

  const region = page.getByRole("region", { name: "order options" });
  const grindOptionTrigger = getTrigger(region, "want us to grind them?");
  const grindOptionProgressLink = page
    .getByRole("region", { name: "order progress" })
    .getByRole("button", { name: "grind option" });

  await expect(grindOptionTrigger).toBeEnabled();
  await expect(grindOptionProgressLink).toBeEnabled();

  await answer(page, "how do you drink your coffee?", "capsule");

  await expect(grindOptionTrigger).toBeDisabled();
  await expect(grindOptionProgressLink).toBeDisabled();

  await answer(page, "how do you drink your coffee?", "filter");

  await expect(grindOptionTrigger).toBeEnabled();
  await expect(grindOptionProgressLink).toBeEnabled();
});

test("checkout button gets enabled", async ({ page }) => {
  await page.goto("/plan");

  const checkoutRegion = page.getByRole("region", { name: "checkout" });

  const checkoutButton = checkoutRegion.getByRole("button", {
    name: "create my plan",
  });

  await expect(checkoutButton).toBeDisabled();

  await answer(page, "how often should we deliver?", "every 2 weeks");

  await expect(checkoutButton).toBeDisabled();

  await answer(page, "how do you drink your coffee?", "capsule");
  await answer(page, "what type of coffee?", "decaf");
  await answer(page, "how much would you like?", "500g");
  // No grind option

  await expect(checkoutButton).toBeEnabled();

  await answer(page, "how do you drink your coffee?", "espresso");

  // Grind option now required
  await expect(checkoutButton).toBeDisabled();

  await answer(page, "want us to grind them?", "cafetiére");

  await expect(checkoutButton).toBeEnabled();
});

test("opens checkout dialog", async ({ page }) => {
  await page.goto("/plan");

  await expect(
    page.getByRole("dialog").getByRole("heading", { name: "order summary" })
  ).not.toBeVisible();

  await answer(page, "how do you drink your coffee?", "capsule");
  await answer(page, "what type of coffee?", "decaf");
  await answer(page, "how much would you like?", "500g");
  await answer(page, "how often should we deliver?", "every month");

  await page
    .getByRole("region", { name: "checkout" })
    .getByRole("button", { name: "create my plan" })
    .click();

  await expect(
    page.getByRole("dialog").getByRole("heading", { name: "order summary" })
  ).toBeVisible();

  await page
    .getByRole("dialog")
    .getByRole("button", { name: "checkout" })
    .click();
});

// test.skip("summarizes order", async ({ page }) => {
//   // todo: README
// });

// test.skip("calculates price", async ({ page }) => {
//   // todo: README
// });
