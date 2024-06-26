import { test, expect, Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("displays quotes", async ({ page }) => {
  const quote = page.getByRole("region", { name: "quote" });
  const blockquote = quote.getByRole("blockquote");

  await expect(blockquote).toHaveText(
    /The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value./,
  );
  await expect(blockquote).toHaveText(/Ada Lovelace/);

  await quote.getByRole("button", { name: "get a new quote" }).click();

  await expect(blockquote).toHaveText(/this is the content of a mock quote/i);
  await expect(blockquote).toHaveText(/the author/i);
});

test.skip("displays time", async ({ page }) => {
  const time = getTimeRegion(page);

  await expect(time).toHaveText("11:37");
});

test.skip("good morning in the morning", async ({ page }) => {
  const time = getTimeRegion(page);

  await expect(time).toHaveText("good morning");
});

test.skip("good afternoon in the afternoon", async ({ page }) => {
  const time = getTimeRegion(page);

  await expect(time).toHaveText("good afternoon");
});

test.skip("good evening in the evening", async ({ page }) => {
  const time = getTimeRegion(page);

  await expect(time).toHaveText("good evening");
});

test.skip("displays additional date and time information", async ({ page }) => {
  const time = getTimeRegion(page);
  const additional = page.getByRole("region", {
    name: "additional information",
  });
  const moreButton = time.getByRole("button", { name: "more" });
  const lessButton = time.getByRole("button", { name: "less" });

  await expect(additional).not.toBeAttached();

  await moreButton.click();

  await expect(additional).toBeAttached();
  await expect(moreButton).not.toBeAttached();
  await expect(lessButton).toBeAttached();
  await expect(additional).toHaveText("europe/london");
  await expect(additional).toHaveText("295");
  await expect(additional).toHaveText("5");
  await expect(additional).toHaveText("42");

  await lessButton.click();

  await expect(additional).not.toBeAttached();
});

function getTimeRegion(page: Page) {
  return page.getByRole("region", { name: "time" });
}
