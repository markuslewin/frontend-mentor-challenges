import { test, expect, type Page } from "@playwright/test";
import { type Cart, type CartKey, type SerializeCart } from "~/app/_utils/cart";
import { type Checkout } from "~/app/_utils/schema";

// todo: These should be imported from the `cart.ts` module, but it indirectly imports JSON data, which isn't supported in Playwright
const cartKey: CartKey = "cart";
export const serializeCart: SerializeCart = (cart) => {
  return JSON.stringify(
    [...cart].map(([id, entry]) => {
      return {
        id,
        quantity: entry.quantity,
      };
    }),
  );
};

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

  // Not resetting anymore
  // await expect(quantityText).toHaveText(/1/i);

  await cartButton.click();

  await expect(productItem.getByTestId("quantity")).toHaveText(/3/i);

  await cartButton.click();
  await decrementButton.click(); // 2
  await decrementButton.click(); // 1
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

test("can navigate to checkout via cart", async ({ page }) => {
  const cartButton = getCartButton(page);

  await setCart(page, new Map([[3, { quantity: 1 }]]));
  await page.goto("/");
  await cartButton.click();
  await page
    .getByRole("banner")
    .getByRole("link", { name: "checkout" })
    .click();

  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(
    /checkout/i,
  );
});

test("checkout displays cart items", async ({ page }) => {
  await setCart(
    page,
    new Map([
      [5, { quantity: 2 }],
      [3, { quantity: 1 }],
    ]),
  );
  await page.goto("/checkout");

  await expect(page.getByTestId("summary").getByRole("listitem")).toContainText(
    [/zx7/i, /xx99 mk i/i],
  );
});

test("checkout displays payment method fields", async ({ page }) => {
  await page.goto("/checkout");

  await expect(page.getByRole("radio", { name: "e-money" })).toBeChecked();
  await expect(
    page.getByRole("textbox", { name: "e-money number" }),
  ).toBeAttached();
  await expect(
    page.getByRole("textbox", { name: "e-money pin" }),
  ).toBeAttached();
  await expect(
    page.getByTestId("cash-on-delivery-instructions"),
  ).not.toBeAttached();

  // Force click on label of `sr-only` input
  await page
    .getByRole("radio", { name: "cash on delivery" })
    .click({ force: true });

  await expect(
    page.getByRole("textbox", { name: "e-money number" }),
  ).not.toBeAttached();
  await expect(
    page.getByRole("textbox", { name: "e-money pin" }),
  ).not.toBeAttached();
  await expect(
    page.getByTestId("cash-on-delivery-instructions"),
  ).toBeAttached();

  await page.getByRole("radio", { name: "e-money" }).click({ force: true });

  await expect(
    page.getByRole("textbox", { name: "e-money number" }),
  ).toBeAttached();
  await expect(
    page.getByRole("textbox", { name: "e-money pin" }),
  ).toBeAttached();
  await expect(
    page.getByTestId("cash-on-delivery-instructions"),
  ).not.toBeAttached();
});

test("checkout validates form", async ({ page }) => {
  await page.goto("/checkout");
  await page
    .getByRole("button", {
      name: "pay",
    })
    .click();

  await expect(
    page.getByRole("textbox").and(page.locator("[aria-invalid=true]")),
  ).toHaveCount(9);
  for (const textbox of await page
    .getByRole("textbox")
    .and(page.locator("[aria-invalid=true]"))
    .all()) {
    await expect(textbox).toHaveAccessibleDescription(/required/i);
  }

  await page
    .getByRole("textbox", {
      name: "email",
    })
    .fill("markus");
  await page
    .getByRole("button", {
      name: "pay",
    })
    .click();

  await expect(
    page.getByRole("textbox").and(page.locator("[aria-invalid=true]")),
  ).toHaveCount(9);
  await expect(
    page.getByRole("textbox", {
      name: "email",
    }),
  ).toHaveAccessibleDescription(/wrong format/i);
});

test("checkout displays receipt", async ({ page }) => {
  const receiptDialog = page.getByRole("alertdialog", { name: "thank you" });

  await setCart(page, new Map([[1, { quantity: 1 }]]));
  await page.goto("/checkout");
  await fillCheckoutForm(page, {
    billingDetails: {
      emailAddress: "some@email.com",
      name: "a name",
      phoneNumber: "123",
    },
    paymentDetails: {
      paymentMethod: "e-money",
      eMoneyNumber: "123123",
      eMoneyPin: "1234",
    },
    shippingInfo: {
      address: "an address",
      city: "a city",
      country: "a country",
      zipCode: "a zip code",
    },
  });
  await page.getByRole("button", { name: "pay" }).click();

  await expect(receiptDialog).toBeAttached();
});

test("receipt button navigates to home", async ({ page }) => {
  const receiptDialog = getReceiptDialog(page);

  await setCart(page, new Map([[1, { quantity: 1 }]]));
  await page.goto("/checkout");
  await fillCheckoutForm(page, {
    billingDetails: {
      emailAddress: "some@email.com",
      name: "a name",
      phoneNumber: "123",
    },
    paymentDetails: {
      paymentMethod: "cash-on-delivery",
    },
    shippingInfo: {
      address: "an address",
      city: "a city",
      country: "a country",
      zipCode: "a zip code",
    },
  });
  await page.getByRole("button", { name: "pay" }).click();
  await receiptDialog.getByRole("link", { name: "back" }).click();

  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(
    /home/i,
  );
});

test("receipt displays bought products", async ({ page }) => {
  const receiptDialog = getReceiptDialog(page);

  await setCart(
    page,
    new Map([
      [1, { quantity: 10 }],
      [5, { quantity: 20 }],
      [6, { quantity: 30 }],
    ]),
  );
  await page.goto("/checkout");
  await fillCheckoutForm(page, {
    billingDetails: {
      emailAddress: "some@email.com",
      name: "a name",
      phoneNumber: "123",
    },
    paymentDetails: {
      paymentMethod: "cash-on-delivery",
    },
    shippingInfo: {
      address: "an address",
      city: "a city",
      country: "a country",
      zipCode: "a zip code",
    },
  });
  await page.getByRole("button", { name: "pay" }).click();

  await expect(receiptDialog.getByRole("listitem")).toContainText([/yx1/i]);
  await expect(receiptDialog.getByRole("listitem")).toContainText([/x10/i]);

  await page.getByRole("button", { name: "2 other", expanded: false }).click();

  await expect(receiptDialog.getByRole("listitem")).toContainText([
    /yx1/i,
    /zx7/i,
    /zx9/i,
  ]);
  await expect(receiptDialog.getByRole("listitem")).toContainText([
    /x10/i,
    /x20/i,
    /x30/i,
  ]);

  await page.getByRole("button", { name: "view less", expanded: true }).click();

  await expect(receiptDialog.getByRole("listitem")).toContainText([/yx1/i]);
  await expect(receiptDialog.getByRole("listitem")).toContainText([/x10/i]);
});

test("checkout clears cart", async ({ page }) => {
  const cartButton = getCartButton(page);
  const receiptDialog = getReceiptDialog(page);

  await setCart(page, new Map([[1, { quantity: 1 }]]));
  await page.goto("/checkout");
  await fillCheckoutForm(page, {
    billingDetails: {
      emailAddress: "some@email.com",
      name: "a name",
      phoneNumber: "123",
    },
    paymentDetails: {
      paymentMethod: "cash-on-delivery",
    },
    shippingInfo: {
      address: "an address",
      city: "a city",
      country: "a country",
      zipCode: "a zip code",
    },
  });
  await page.getByRole("button", { name: "pay" }).click();
  await receiptDialog.waitFor();
  await page.goto("/");
  await cartButton.click();

  await expect(
    page.getByRole("banner").getByRole("heading", { name: "cart" }),
  ).toContainText(/0/i);
});

test("checkout summary is in sync with cart", async ({ page }) => {
  const cartButton = getCartButton(page);
  const productItem = page.getByTestId("cart").getByRole("listitem");

  await setCart(page, new Map([[1, { quantity: 1 }]]));
  await page.goto("/checkout");
  await cartButton.click();
  await productItem.getByRole("button", { name: "increment" }).click();
  await cartButton.click();

  await expect(
    page.getByTestId("summary").getByRole("listitem").getByTestId("quantity"),
  ).toHaveText(["2"]);
});

// todo: Test prices by mocking product data

function getMenuButton(page: Page) {
  return page
    .getByRole("banner")
    .getByRole("navigation")
    .getByRole("button", { name: "menu" });
}

function getCartButton(page: Page) {
  return page.getByRole("banner").getByRole("button", { name: "cart" });
}

function getReceiptDialog(page: Page) {
  return page.getByRole("alertdialog", { name: "thank you" });
}

async function setCart(page: Page, cart: Cart) {
  await page.context().addCookies([
    {
      name: cartKey,
      value: serializeCart(cart),
      domain: "localhost",
      path: "/",
    },
  ]);
}

async function fillCheckoutForm(page: Page, data: Checkout) {
  await page
    .getByRole("textbox", { name: "name" })
    .fill(data.billingDetails.name);
  await page
    .getByRole("textbox", { name: "email" })
    .fill(data.billingDetails.emailAddress);
  await page
    .getByRole("textbox", { name: "phone" })
    .fill(data.billingDetails.phoneNumber);
  await page
    .getByRole("textbox", {
      // Resolve conflict with "Email Address"
      name: /^address/i,
    })
    .fill(data.shippingInfo.address);
  await page
    .getByRole("textbox", { name: "zip" })
    .fill(data.shippingInfo.zipCode);
  await page
    .getByRole("textbox", { name: "city" })
    .fill(data.shippingInfo.city);
  await page
    .getByRole("textbox", { name: "country" })
    .fill(data.shippingInfo.country);
  if (data.paymentDetails.paymentMethod === "e-money") {
    await page.getByRole("radio", { name: "e-money" }).check({ force: true });
    await page
      .getByRole("textbox", { name: "e-money number" })
      .fill(data.paymentDetails.eMoneyNumber);
    await page
      .getByRole("textbox", { name: "e-money pin" })
      .fill(data.paymentDetails.eMoneyPin);
  } else if (data.paymentDetails.paymentMethod === "cash-on-delivery") {
    await page
      .getByRole("radio", { name: "cash on delivery" })
      .check({ force: true });
  }
}
