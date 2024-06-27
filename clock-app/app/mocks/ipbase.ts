import { delay, http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

export function createMockResponse() {
  return {
    data: {
      location: {
        country: {
          name: faker.location.country(),
        },
        city: {
          name: faker.location.city(),
        },
      },
    },
  };
}

export const handlers = [
  http.get("https://api.ipbase.com/v2/info", async () => {
    await delay();

    return HttpResponse.json(createMockResponse());
  }),
];
