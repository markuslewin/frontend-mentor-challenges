import { delay, http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

export const handlers = [
  http.get("https://api.quotable.io/quotes/random", async () => {
    const content = faker.lorem.paragraph();
    const author = faker.person.fullName();

    await delay();

    return HttpResponse.json([
      {
        content,
        author,
      },
    ]);
  }),
];
