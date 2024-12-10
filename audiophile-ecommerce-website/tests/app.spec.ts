import { test, expect, type Page } from "@playwright/test";

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

test("can navigate via header", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("banner")
    .getByRole("navigation")
    .getByRole("link", { name: "speakers" })
    .click();

  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(
    /speakers/i,
  );

  await page
    .getByRole("banner")
    .getByRole("navigation")
    .getByRole("link", { name: "home" })
    .click();

  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(
    /home/i,
  );
});

test("mobile has nav menu", async ({ page }) => {
  const menuButton = getMenuButton(page);

  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");

  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await expect(
    page.getByRole("banner").getByRole("navigation").getByRole("link"),
  ).toHaveCount(0);

  await menuButton.click();

  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("banner").getByRole("navigation").getByRole("link"),
  ).not.toHaveCount(0);
});

test("mobile can navigate via menu", async ({ page }) => {
  const menuButton = getMenuButton(page);

  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");
  await menuButton.click();
  await page
    .getByRole("banner")
    .getByRole("navigation")
    .getByRole("link", { name: "headphones" })
    .click();

  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(
    /headphones/i,
  );
});

test("cart expands", async ({ page }) => {
  const cartButton = getCartButton(page);

  await page.goto("/");

  await expect(cartButton).toHaveAttribute("aria-expanded", "false");
  await expect(
    page.getByRole("banner").getByRole("heading", { name: "cart" }),
  ).not.toBeAttached();

  await cartButton.click();

  await expect(cartButton).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("banner").getByRole("heading", { name: "cart" }),
  ).toBeAttached();
});

test("cart inits in empty state", async ({ page }) => {
  const cartButton = getCartButton(page);

  await page.goto("/");
  await cartButton.click();

  await expect(page.getByRole("banner")).toContainText(/the cart is empty/i);
});

test("cart counts product types", async ({ page }) => {
  const cartButton = getCartButton(page);

  await page.goto("/");
  await cartButton.click();

  await expect(
    page.getByRole("banner").getByRole("heading", { name: "cart" }),
  ).toContainText(/0/i);

  await page.goto("/product/zx9-speaker");
  await page.getByRole("button", { name: "increment" }).click();
  await page.getByRole("button", { name: "add to cart" }).click();
  await cartButton.click();

  await expect(
    page.getByRole("banner").getByRole("heading", { name: "cart" }),
  ).toContainText(/1/i);

  await page.goto("/product/yx1-earphones");
  await page.getByRole("button", { name: "increment" }).click();
  await page.getByRole("button", { name: "add to cart" }).click();
  await cartButton.click();

  await expect(
    page.getByRole("banner").getByRole("heading", { name: "cart" }),
  ).toContainText(/2/i);
});

test("cart lists products", async ({ page }) => {
  const cartButton = getCartButton(page);

  await page.goto("/product/zx9-speaker");
  await page.getByRole("button", { name: "add to cart" }).click();
  // todo: Fix race condition instead
  await page
    .getByRole("button", { name: "add to cart", disabled: false })
    .waitFor();
  await page.goto("/product/xx59-headphones");
  await page.getByRole("button", { name: "add to cart" }).click();
  await cartButton.click();

  await expect(
    page.getByTestId("cart").getByRole("list").getByRole("listitem"),
  ).toContainText([/zx9/i, /xx59/i]);
});

test("cart resets", async ({ page }) => {
  const cartButton = getCartButton(page);

  await page.goto("/product/zx9-speaker");
  await page.getByRole("button", { name: "add to cart" }).click();
  await cartButton.click();
  await page
    .getByRole("banner")
    .getByRole("button", { name: "remove" })
    .click();

  await expect(
    page.getByRole("banner").getByRole("heading", { name: "cart" }),
  ).toContainText(/0/i);
  await expect(page.getByRole("banner")).toContainText(/the cart is empty/i);
});

test("cart updates product quantity", async ({ page }) => {
  const cartButton = getCartButton(page);
  const productItem = page.getByTestId("cart").getByRole("listitem");

  await page.goto("/product/zx9-speaker");
  await page.getByRole("button", { name: "add to cart" }).click();
  await cartButton.click();

  await expect(productItem.getByTestId("quantity")).toHaveText(/1/i);

  await productItem.getByRole("button", { name: "increment" }).click();
  await productItem.getByRole("button", { name: "increment" }).click();

  await expect(productItem.getByTestId("quantity")).toHaveText(/3/i);

  await productItem.getByRole("button", { name: "decrement" }).click();

  await expect(productItem.getByTestId("quantity")).toHaveText(/2/i);
});

test("adds quantity of product to cart", async ({ page }) => {
  const cartButton = getCartButton(page);
  const productItem = page.getByTestId("cart").getByRole("listitem");
  const quantityText = page.getByRole("main").getByTestId("quantity");
  const decrementButton = page
    .getByRole("main")
    .getByRole("button", { name: "decrement" });
  const incrementButton = page
    .getByRole("main")
    .getByRole("button", { name: "increment" });

  await page.goto("/product/zx9-speaker");
  await cartButton.click();

  await expect(productItem).not.toBeAttached();
  await expect(quantityText).toHaveText(/1/i);

  await cartButton.click();
  // Force disabled button click
  await decrementButton.click({ force: true }); // Still 1
  await incrementButton.click(); // 2
  await incrementButton.click(); // 3

  await expect(quantityText).toHaveText(/3/i);

  await page.getByRole("button", { name: "add to cart" }).click();

  await expect(quantityText).toHaveText(/1/i);

  await cartButton.click();

  await expect(productItem.getByTestId("quantity")).toHaveText(/3/i);

  await cartButton.click();
  await incrementButton.click();
  await incrementButton.click();
  await incrementButton.click();
  await incrementButton.click();
  await decrementButton.click();

  await expect(quantityText).toHaveText(/4/i);

  await page.getByRole("button", { name: "add to cart" }).click();
  await cartButton.click();
  await page
    .getByRole("button", { name: "add to cart", disabled: false })
    .waitFor();

  await expect(productItem.getByTestId("quantity")).toHaveText(/7/i);
});

function getMenuButton(page: Page) {
  return page
    .getByRole("banner")
    .getByRole("navigation")
    .getByRole("button", { name: "menu" });
}

function getCartButton(page: Page) {
  return page.getByRole("banner").getByRole("button", { name: "cart" });
}

// todo: checkout | validates form
// todo: checkout | changes payment method instructions
// todo: checkout | displays receipt
// todo: checkout | empty cart state after checkout
// todo: cart | resets after purchase
