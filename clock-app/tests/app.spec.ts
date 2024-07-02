import { test, expect, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { createMockResponse as createQuotableResponse } from "../app/mocks/quotable";
import { createMockResponse as createWorldtimeapiResponse } from "../app/mocks/worldtimeapi";
import { createMockResponse as createIpbaseResponse } from "../app/mocks/ipbase";

test.beforeEach(async ({ context }) => {
  await context.route(
    "https://api.quotable.io/quotes/random*",
    async (route) => {
      const json = createQuotableResponse();
      await route.fulfill({
        json,
      });
    },
  );
  await context.route("https://worldtimeapi.org/api/ip*", async (route) => {
    const json = createWorldtimeapiResponse();
    await route.fulfill({
      json,
    });
  });
  await context.route("https://api.ipbase.com/v2/info*", async (route) => {
    const json = createIpbaseResponse();
    await route.fulfill({
      json,
    });
  });
});

test("displays quotes", async ({ page }) => {
  const content = faker.lorem.paragraph();
  const author = faker.person.fullName();

  await page.route("https://api.quotable.io/quotes/random*", async (route) => {
    await route.fulfill({
      json: [
        {
          content,
          author,
        },
      ],
    });
  });

  const quote = page.getByRole("region", { name: "quote" });
  const blockquote = quote.getByRole("blockquote");

  await page.goto("/");

  await expect(blockquote).toHaveText(
    /The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value./,
  );
  await expect(blockquote).toHaveText(/Ada Lovelace/);

  await quote.getByRole("button", { name: "get a new quote" }).click();

  await expect(blockquote).toHaveText(new RegExp(content));
  await expect(blockquote).toHaveText(new RegExp(author));
});

test("displays time", async ({ page }) => {
  const timeRegion = getTimeRegion(page);

  await page.clock.install({ time: "2024-07-02T13:00" });
  await page.goto("/");

  await expect(timeRegion).toHaveText(/13:00/);

  await page.clock.fastForward("02:00");

  await expect(timeRegion).toHaveText(/13:02/);
});

test("greets the user", async ({ page }) => {
  const time = getTimeRegion(page);

  await page.clock.install({ time: "2024-07-02T08:00" });
  await page.goto("/");

  await expect(time).toHaveText(/good morning/i);

  await page.clock.fastForward("08:00:00");

  await expect(time).toHaveText(/good afternoon/i);

  await page.clock.fastForward("08:00:00");

  await expect(time).toHaveText(/good evening/i);
});

test("displays additional date and time information", async ({ page }) => {
  const response = createWorldtimeapiResponse();

  await page.route("https://worldtimeapi.org/api/ip*", async (route) => {
    await route.fulfill({
      json: response,
    });
  });

  const time = getTimeRegion(page);
  const additional = page.getByRole("region", {
    name: "additional information",
  });
  const moreButton = time.getByRole("button", { name: "more" });
  const lessButton = time.getByRole("button", { name: "less" });

  await page.goto("/");

  await expect(additional).not.toBeAttached();

  await moreButton.click();

  await expect(additional).toBeAttached();
  await expect(moreButton).not.toBeAttached();
  await expect(lessButton).toBeAttached();
  await expect(additional).toHaveText(new RegExp(response.timezone));
  await expect(additional).toHaveText(
    new RegExp(response.day_of_year.toString()),
  );
  await expect(additional).toHaveText(
    new RegExp(response.day_of_week.toString()),
  );
  await expect(additional).toHaveText(
    new RegExp(response.week_number.toString()),
  );

  await lessButton.click();

  await expect(additional).not.toBeAttached();
});

function getTimeRegion(page: Page) {
  return page.getByRole("region", { name: "time" });
}
