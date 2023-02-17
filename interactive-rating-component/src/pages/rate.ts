import { APIRoute } from "astro";

export const post: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const rating = formData.get("rating");
  // todo: validate, persist
  if (!true) {
    // todo: handle error
  }
  return redirect(`thank-you/${rating}`, 303);
};
