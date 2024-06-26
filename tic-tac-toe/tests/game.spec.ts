import { test, expect } from "@playwright/test";

test("x starts", async ({ page }) => {
  await page.goto("/");

  // https://github.com/microsoft/playwright/issues/12267
  // https://github.com/microsoft/playwright/issues/13470
  await page.getByRole("radio", { name: /x/i }).click({ force: true });
  await page.getByRole("button", { name: /vs player/i }).click();

  await expect(page.getByText(/x's turn/i)).toBeVisible();

  await page.goto("/");

  await page.getByRole("radio", { name: /o/i }).click({ force: true });
  await page.getByRole("button", { name: /vs player/i }).click();

  await expect(page.getByText(/x's turn/i)).toBeVisible();
});

test("place mark", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: /vs player/i }).click();

  const position = page
    .getByRole("grid", { name: /game/i })
    .getByRole("button")
    .first();
  await position.click();

  await expect(position).toHaveText(/x/i);
  await expect(position).toBeDisabled();
});

test("player 1 win", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("radio", { name: /x/i }).click({ force: true });
  await page.getByRole("button", { name: /vs player/i }).click();

  // XXX
  // OO-
  // ---
  const cells = page.getByRole("grid", { name: "game" }).getByRole("button");
  for (const index of [0, 3, 1, 4, 2]) {
    await cells.nth(index).click();
  }

  await expect(
    page.getByRole("heading", { name: "player 1 wins" })
  ).toBeVisible();
  await expect(page.getByText("x takes the round")).toBeVisible();

  await page.getByRole("button", { name: "next" }).click();
  await expect(
    page
      .getByRole("list", { name: "score" })
      .getByRole("listitem")
      .filter({ hasText: "p1" })
      .getByRole("strong")
  ).toHaveText("1");
});

test("player 2 win", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("radio", { name: /x/i }).click({ force: true });
  await page.getByRole("button", { name: /vs player/i }).click();

  // XXO
  // XO-
  // O--
  const cells = page.getByRole("grid", { name: "game" }).getByRole("button");
  for (const index of [0, 2, 1, 4, 3, 6]) {
    await cells.nth(index).click();
  }

  await expect(
    page.getByRole("heading", { name: "player 2 wins" })
  ).toBeVisible();
  await expect(page.getByText("o takes the round")).toBeVisible();

  await page.getByRole("button", { name: "next" }).click();
  await expect(
    page
      .getByRole("list", { name: "score" })
      .getByRole("listitem")
      .filter({ hasText: "p2" })
      .getByRole("strong")
  ).toHaveText("1");
});

test("tie", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("radio", { name: /x/i }).click({ force: true });
  await page.getByRole("button", { name: /vs player/i }).click();

  // XOX
  // OOX
  // XXO
  const cells = page.getByRole("grid", { name: "game" }).getByRole("button");
  for (const index of [0, 1, 2, 3, 5, 4, 6, 8, 7]) {
    await cells.nth(index).click();
  }

  await expect(page.getByRole("heading", { name: "round tied" })).toBeVisible();

  await page.getByRole("button", { name: "next" }).click();
  await expect(
    page
      .getByRole("list", { name: "score" })
      .getByRole("listitem")
      .filter({ hasText: "ties" })
      .getByRole("strong")
  ).toHaveText("1");
});

test("quit", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("radio", { name: /x/i }).click({ force: true });
  await page.getByRole("button", { name: /vs player/i }).click();
  // XOX
  // OOX
  // XXO
  const cells = page.getByRole("grid", { name: "game" }).getByRole("button");
  for (const index of [0, 1, 2, 3, 5, 4, 6, 8, 7]) {
    await cells.nth(index).click();
  }

  await page.getByRole("button", { name: "quit" }).click();

  await expect(
    page.getByRole("button", { name: "new game" }).first()
  ).toBeVisible();
});

test("next round", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("radio", { name: /x/i }).click({ force: true });
  await page.getByRole("button", { name: /vs player/i }).click();
  // XOX
  // OOX
  // XXO
  const cells = page.getByRole("grid", { name: "game" }).getByRole("button");
  for (const index of [0, 1, 2, 3, 5, 4, 6, 8, 7]) {
    await cells.nth(index).click();
  }

  await page.getByRole("button", { name: "next round" }).click();

  await expect(
    page
      .getByRole("grid", { name: "game" })
      .getByRole("button", { name: "blank" })
  ).toHaveCount(9);
});

test("restart", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("radio", { name: /x/i }).click({ force: true });
  await page.getByRole("button", { name: /vs player/i }).click();
  await page
    .getByRole("grid", { name: "game" })
    .getByRole("button")
    .first()
    .click();

  const availablePositions = page
    .getByRole("grid", { name: "game" })
    .getByRole("button", { name: "blank" });
  await expect(availablePositions).toHaveCount(8);

  await page.getByRole("button", { name: "restart" }).click();
  await page.getByRole("button", { name: "yes" }).click();

  await expect(availablePositions).toHaveCount(9);
  await expect(page.getByText("x's turn")).toBeVisible();
});

test("preserves state between navigations", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("radio", { name: /x/i }).click({ force: true });
  await page.getByRole("button", { name: /vs player/i }).click();

  // ---
  // -X-
  // ---
  const position = page
    .getByRole("grid", { name: "game" })
    .getByRole("button")
    .nth(4);
  position.click();
  await expect(position).toHaveText(/x/i);

  await page.goto("/");
  await page.goto("/play");

  await expect(position).toHaveText(/x/i);
  await expect(
    page
      .getByRole("grid", { name: "game" })
      .getByRole("button", { name: "blank" })
  ).toHaveCount(8);
});

test("can't mark already marked position", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("radio", { name: /x/i }).click({ force: true });
  await page.getByRole("button", { name: /vs player/i }).click();

  const position = page
    .getByRole("grid", { name: "game" })
    .getByRole("button")
    .first();
  await position.click();

  await expect(position).toHaveText(/x/i);

  // Force click on disabled button
  await position.click({ force: true });

  await expect(position).toHaveText(/x/i);
});

test("displays turn", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("radio", { name: /x/i }).click({ force: true });
  await page.getByRole("button", { name: /vs player/i }).click();

  await expect(page.getByText("x's turn")).toBeVisible();

  const cells = page.getByRole("grid", { name: "game" }).getByRole("button");
  await cells.nth(0).click();

  await expect(page.getByText("o's turn")).toBeVisible();

  await cells.nth(1).click();

  await expect(page.getByText("x's turn")).toBeVisible();
});
