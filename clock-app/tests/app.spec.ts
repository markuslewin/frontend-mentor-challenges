import { test, expect, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { createMockResponse as createQuotableResponse } from "../app/mocks/quotable";
import { createMockResponse as createWorldtimeapiResponse } from "../app/mocks/worldtimeapi";
import { createMockResponse as createIpbaseResponse } from "../app/mocks/ipbase";

test.beforeEach(async ({ page, context }) => {
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

  await page.goto("/");
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

  await expect(blockquote).toHaveText(
    /The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value./,
  );
  await expect(blockquote).toHaveText(/Ada Lovelace/);

  await quote.getByRole("button", { name: "get a new quote" }).click();

  await expect(blockquote).toHaveText(new RegExp(content));
  await expect(blockquote).toHaveText(new RegExp(author));
});

test("displays time", async ({ page }) => {
  const time = "19:25";
  const unixtime = new Date(`2024-06-27T${time}`).getTime() / 1000;

  await page.route("https://worldtimeapi.org/api/ip*", async (route) => {
    const response = createWorldtimeapiResponse();
    await route.fulfill({
      json: {
        ...response,
        unixtime,
      },
    });
  });

  const timeRegion = getTimeRegion(page);

  await expect(timeRegion).toHaveText(new RegExp(time));
});

test("greets the user", async ({ page }) => {
  await page.route("https://worldtimeapi.org/api/ip*", async (route) => {
    const response = createWorldtimeapiResponse();
    await route.fulfill({
      json: {
        ...response,
        unixtime: new Date("2024-06-28T08:00").getTime() / 1000,
      },
    });
  });

  const time = getTimeRegion(page);

  await expect(time).toHaveText(/good morning/i);
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
