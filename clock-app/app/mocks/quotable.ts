import { delay, http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

export function createMockResponse() {
  return [
    {
      content: faker.lorem.paragraph(),
      author: faker.person.fullName(),
    },
  ];
}

export const handlers = [
  http.get("https://api.quotable.io/quotes/random", async () => {
    await delay();

    return HttpResponse.json(createMockResponse());
  }),
];
