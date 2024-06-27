import { delay, http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

export function createMockResponse() {
  return {
    abbreviation: faker.string.alpha({ length: 3, casing: "upper" }),
    timezone: faker.location.timeZone(),
    day_of_week: faker.number.int({ max: 7 }),
    day_of_year: faker.number.int({ max: 365 }),
    unixtime: faker.date.recent().getTime() / 1000,
    week_number: faker.number.int({ max: 52 }),
  };
}

export const handlers = [
  http.get("https://worldtimeapi.org/api/ip", async () => {
    await delay();

    return HttpResponse.json(createMockResponse());
  }),
];
