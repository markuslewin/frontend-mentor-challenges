import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://api.quotable.io/quotes/random", () => {
    return HttpResponse.json([
      {
        content: "This is the content of a mock quote",
        author: "The Author",
      },
    ]);
  }),
];
