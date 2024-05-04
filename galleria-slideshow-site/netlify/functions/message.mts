import type { Context } from "@netlify/functions";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async (req: Request, context: Context) => {
  return new Response("Hello, world!");
};
