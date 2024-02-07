import type { APIRoute } from "astro";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const POST: APIRoute = async ({ request }) => {
  await sleep(3000);
  console.log(Object.fromEntries(await request.formData()));
  /*
    todo:
    1. parse/validate
    2. set cookie
  */
  return new Response(
    JSON.stringify({
      message: "Success",
    })
  );
};
